import { existsSync, readFileSync } from 'node:fs'

test('static export writes index.html', () => {
  expect(existsSync('out/index.html')).toBe(true)
  expect(readFileSync('out/index.html', 'utf8')).toContain('<html lang="en"')
})
