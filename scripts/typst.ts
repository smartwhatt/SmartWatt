/**
 * A small reader for the data subset used by smartwhatt/cv-resume's Typst
 * locale files. It understands dictionaries, arrays, strings, numbers,
 * booleans, and content blocks, including `#link("…")[label]` inside content.
 *
 * It is deliberately not a general Typst parser: it fails loudly on shapes
 * the CV repository does not use, so a format change is visible instead of
 * silently producing empty content.
 */

export type Link = { label: string; url: string }

export type Content = {
  kind: 'content'
  text: string
  links: Link[]
}

export type Value =
  | string
  | number
  | boolean
  | Content
  | Value[]
  | { [key: string]: Value }

export function isContent(value: unknown): value is Content {
  return Boolean(value) && typeof value === 'object' && (value as Content).kind === 'content'
}

export function isDict(value: unknown): value is { [key: string]: Value } {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value) && !isContent(value)
}

export function textOf(value: unknown): string {
  if (isContent(value)) return value.text
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) return value.map(textOf).join(' ')
  if (isDict(value)) return Object.values(value).map(textOf).join(' ')
  return ''
}

export function linksOf(value: unknown): Link[] {
  if (isContent(value)) return value.links
  if (Array.isArray(value)) return value.flatMap(linksOf)
  if (isDict(value)) return Object.values(value).flatMap(linksOf)
  return []
}

class Reader {
  src: string
  i: number

  constructor(src: string, i = 0) {
    this.src = src
    this.i = i
  }

  error(message: string): never {
    const line = this.src.slice(0, this.i).split('\n').length
    const column = this.i - this.src.lastIndexOf('\n', this.i - 1)
    throw new Error(`Typst parse error at ${line}:${column}: ${message}\n>>> ${JSON.stringify(this.src.slice(Math.max(0, this.i - 40), this.i + 40))}`)
  }

  skip() {
    for (;;) {
      while (this.i < this.src.length && /\s/.test(this.src[this.i])) this.i++
      if (this.src[this.i] === '/' && this.src[this.i + 1] === '/') {
        while (this.i < this.src.length && this.src[this.i] !== '\n') this.i++
        continue
      }
      if (this.src[this.i] === '/' && this.src[this.i + 1] === '*') {
        const end = this.src.indexOf('*/', this.i + 2)
        this.i = end === -1 ? this.src.length : end + 2
        continue
      }
      return
    }
  }

  peek(offset = 0) {
    return this.src[this.i + offset]
  }

  value(): Value {
    this.skip()
    const ch = this.peek()

    if (ch === '"') return this.string()
    if (ch === '[') return this.content()
    if (ch === '(') return this.parens()
    if (ch === '#') return this.embeddedValue()
    if (ch === '-' || /[0-9]/.test(ch ?? '')) return this.number()

    const ident = this.ident()
    if (ident === 'true') return true
    if (ident === 'false') return false
    if (ident) return ident
    this.error(`unexpected character ${JSON.stringify(ch)}`)
  }

  number(): number | string {
    // Typst numbers may carry a unit, e.g. `0.5em`. Units are not used by the
    // site, so keep them as text instead of failing on the suffix.
    const match = /^-?\d+(\.\d+)?([a-z%]+)?/.exec(this.src.slice(this.i))
    if (!match) this.error('expected a number')
    this.i += match![0].length
    return match![2] ? match![0] : Number(match![0])
  }

  ident(): string {
    const match = /^[A-Za-z_][\w-]*/.exec(this.src.slice(this.i))
    if (!match) return ''
    this.i += match[0].length
    return match[0]
  }

  string(): string {
    if (this.peek() !== '"') this.error('expected a string')
    this.i++
    let out = ''
    while (this.i < this.src.length) {
      const ch = this.src[this.i++]
      if (ch === '"') return out
      if (ch === '\\') {
        const next = this.src[this.i++]
        if (next === 'n') out += '\n'
        else if (next === 't') out += '\t'
        else out += next
        continue
      }
      out += ch
    }
    this.error('unterminated string')
  }

  content(): Content {
    if (this.peek() !== '[') this.error('expected content block')
    this.i++
    let depth = 1
    let text = ''
    const links: Link[] = []

    while (this.i < this.src.length) {
      const ch = this.src[this.i]

      if (ch === '\\') {
        text += this.src[this.i + 1] ?? ''
        this.i += 2
        continue
      }

      if (ch === '[') {
        depth++
        text += ch
        this.i++
        continue
      }

      if (ch === ']') {
        depth--
        if (depth === 0) {
          this.i++
          return { kind: 'content', text: normalize(text), links }
        }
        text += ch
        this.i++
        continue
      }

      if (ch === '#') {
        const embed = this.embedded()
        text += embed.text
        links.push(...embed.links)
        continue
      }

      text += ch
      this.i++
    }

    this.error('unterminated content block')
  }

  /** `#name`, `#name(args)`, `#name(args)[content]`, or `#name[content]`. */
  embedded(): { text: string; links: Link[] } {
    this.i++ // '#'
    const name = this.ident()
    this.skip()

    let args: Value[] = []
    if (this.peek() === '(') {
      const parsed = this.parens()
      args = Array.isArray(parsed) ? parsed : [parsed]
    }

    this.skip()
    let label: Content | null = null
    if (this.peek() === '[') label = this.content()

    if (name === 'link') {
      const url = typeof args[0] === 'string' ? args[0] : textOf(args[0])
      const link: Link = { label: label?.text ?? url, url }
      return { text: label?.text ?? url, links: [link, ...(label?.links ?? [])] }
    }

    // Any other embedded function contributes its content, not its code.
    return { text: label?.text ?? '', links: label?.links ?? [] }
  }

  embeddedValue(): Value {
    const embed = this.embedded()
    return { kind: 'content', text: embed.text, links: embed.links }
  }

  parens(): Value {
    if (this.peek() !== '(') this.error('expected "("')
    this.i++

    const keyed: Array<[string, Value]> = []
    const positional: Value[] = []
    let isDict = false

    for (;;) {
      this.skip()
      if (this.peek() === ')') {
        this.i++
        break
      }

      const save = this.i
      const ident = this.ident()
      this.skip()

      if (ident && this.peek() === ':') {
        isDict = true
        this.i++
        keyed.push([ident, this.value()])
      } else {
        this.i = save
        positional.push(this.value())
      }

      this.skip()
      if (this.peek() === ',') {
        this.i++
        continue
      }
      if (this.peek() === ')') {
        this.i++
        break
      }
      this.error('expected "," or ")"')
    }

    if (isDict) {
      if (positional.length) this.error('mixed dictionary and array values')
      return Object.fromEntries(keyed)
    }

    return positional
  }
}

function normalize(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

/** Read `#let <name> = <value>` from a Typst source file. */
export function readLet(src: string, name: string): Value {
  const match = new RegExp(`#let\\s+${name}\\s*=`).exec(src)
  if (!match) throw new Error(`Could not find "#let ${name} ="`)
  const reader = new Reader(src, match.index + match[0].length)
  return reader.value()
}

export function asDict(value: Value, what: string): { [key: string]: Value } {
  if (!isDict(value)) throw new Error(`Expected ${what} to be a dictionary`)
  return value
}

export function asArray(value: Value, what: string): Value[] {
  if (!Array.isArray(value)) throw new Error(`Expected ${what} to be an array`)
  return value
}
