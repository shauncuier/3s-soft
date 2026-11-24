import { buildMatchesTarget, isZipArchive } from '../../scripts/deploy-guard'

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

test('only a real zip is uploaded: a tar archive named .zip extracts to nothing on cPanel', () => {
  expect(isZipArchive(Buffer.from([0x50, 0x4b, 0x03, 0x04, 0x14, 0x00]))).toBe(true)
  const tar = Buffer.alloc(512)
  tar.write('./index.html', 0)
  tar.write('ustar', 257)
  expect(isZipArchive(tar)).toBe(false)
  expect(isZipArchive(Buffer.alloc(0))).toBe(false)
})
