import { buildMatchesTarget } from '../../scripts/deploy-guard'

const page = (robots: string) => `<html><head><meta name="robots" content="${robots}"/></head></html>`

test('staging only accepts a noindex build', () => {
  expect(buildMatchesTarget(page('noindex, nofollow'), 'staging')).toBe(true)
  expect(buildMatchesTarget(page('index, follow, max-image-preview:large'), 'staging')).toBe(false)
})

test('live only accepts an indexable build', () => {
  expect(buildMatchesTarget(page('index, follow, max-image-preview:large'), 'live')).toBe(true)
  expect(buildMatchesTarget(page('noindex, nofollow'), 'live')).toBe(false)
})

test('a page without a robots tag is never deployed', () => {
  expect(buildMatchesTarget('<html></html>', 'live')).toBe(false)
  expect(buildMatchesTarget('<html></html>', 'staging')).toBe(false)
})
