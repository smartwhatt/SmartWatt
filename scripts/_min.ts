import { readLet } from './typst'
const cases = [
  '#let x = (url: "https://a.b/c", label: [ok])',
  '#let x = ((url: "https://a.b/c", label: [ok]),)',
  '#let x = (email: "a@b.c", links: ((url: "https://a", label: [x]),))',
]
for (const c of cases) {
  try { console.log('OK', JSON.stringify(readLet(c, 'x'))) }
  catch (e) { console.log('FAIL', (e as Error).message, '\nSRC', c) }
}
