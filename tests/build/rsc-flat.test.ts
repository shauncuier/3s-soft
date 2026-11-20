import { existsSync } from 'node:fs'
import { flatName, nestedPayloads } from '../../scripts/flatten-rsc'

test('maps nested segment payloads to the flat names the client requests', () => {
  expect(flatName('out/portfolio/__next.portfolio/__PAGE__.txt')).toBe('out/portfolio/__next.portfolio.__PAGE__.txt')
  expect(flatName('out/blog/x/__next.blog/$d$slug/__PAGE__.txt')).toBe('out/blog/x/__next.blog.$d$slug.__PAGE__.txt')
})

test('every nested payload in the export has its flat copy', () => {
  const nested = nestedPayloads('out')
  expect(nested.length).toBeGreaterThan(10)
  for (const f of nested) expect(existsSync(flatName(f))).toBe(true)
})
