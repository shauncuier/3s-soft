import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { getProof } from '@/content/proof'
import { renderLlms } from '@/content/llms'

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(p) ? [p] : []
  })
}

/** Numbers that change over time live only in src/content/proof.ts. Anywhere else they would go stale. */
const DRIFTING = [/\b465\b/, /\b444\b/, /\b55 jobs\b/, /100% Job Success/, /October 2015/, /\bLevel 2\b/]

test('no proof number is typed outside proof.ts', () => {
  const offenders: string[] = []
  for (const f of files('src')) {
    if (f.replace(/\\/g, '/').endsWith('src/content/proof.ts')) continue
    const text = readFileSync(f, 'utf8')
    for (const re of DRIFTING) if (re.test(text)) offenders.push(`${f}: ${re}`)
  }
  expect(offenders).toEqual([])
})

test('llms.txt is generated from proof.ts and has no unsourced claims', () => {
  const llms = renderLlms()
  expect(llms).toContain(`${getProof('fiverr-rating').value} rating from ${getProof('fiverr-reviews').value} reviews`)
  expect(llms).toContain(getProof('upwork-jss').value)
  expect(llms).not.toMatch(/Level 2|October/)
  expect(readFileSync('public/llms.txt', 'utf8')).toBe(llms)
})
