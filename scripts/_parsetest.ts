import { readFileSync } from 'node:fs'
import { readLet, asDict, asArray, textOf } from './typst'

const common = asDict(readLet(readFileSync('/tmp/cv-resume/data/common.typ', 'utf8'), 'common'), 'common')
const locale = asDict(readLet(readFileSync('/tmp/cv-resume/locales/en.typ', 'utf8'), 'locale'), 'locale')
console.log('person', textOf(locale.person), 'email', common.email)
console.log('links', JSON.stringify(common.links))
const cv = asDict(locale.cv, 'cv')
for (const section of asArray(cv.sections, 'sections')) {
  const s = asDict(section, 'section')
  console.log('-', textOf(s.title), s.kind, (s.records ?? s.items) ? asArray((s.records ?? s.items)!, 'records').length : 0)
}
const skills = asArray(asDict(asArray(cv.sections, 's').at(-1)!, 'last').items, 'skills')
console.log('skills', JSON.stringify(skills.slice(0,2)))
