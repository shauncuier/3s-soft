import { proof, getProof, validateProof } from '@/content/proof'
import { reviews, validateReviews, reviewsFor } from '@/content/reviews'
import { site } from '@/content/site'

test('every proof item is sourced', () => {
  expect(validateProof(proof)).toEqual([])
})

test('every review is sourced', () => {
  expect(validateReviews(reviews)).toEqual([])
})

test('rejects missing checkedOn', () => {
  expect(validateProof([{ id: 'x', value: '1', label: 'x', sourceUrl: 'https://a.b', checkedOn: '' }])).toHaveLength(1)
})

test('rejects non-https source', () => {
  expect(validateProof([{ id: 'x', value: '1', label: 'x', sourceUrl: 'http://a.b', checkedOn: '2026-11-20' }])).toHaveLength(1)
})

test('rejects duplicate proof ids', () => {
  const item = { id: 'x', value: '1', label: 'x', sourceUrl: 'https://a.b', checkedOn: '2026-11-20' }
  expect(validateProof([item, item])).toHaveLength(1)
})

test('core facts match spec', () => {
  expect(getProof('fiverr-reviews').value).toBe('465')
  expect(getProof('fiverr-rating').value).toBe('5.0')
  expect(getProof('upwork-badge').value).toBe('Top Rated')
  expect(getProof('fiverr-since').value).toBe('2015')
})

test('getProof throws on unknown id', () => {
  expect(() => getProof('nope')).toThrow()
})

test('no banned reviewer names', () => {
  const users = reviews.map((r) => r.user)
  for (const fake of ['sj_marketing', 'mchen_eco', 'emily_growth', 'david_thompson', 'lisa_w_startup', 'robert_kim_sh']) {
    expect(users).not.toContain(fake)
  }
})

test('reviewsFor filters by service slug', () => {
  const listing = reviewsFor('ecommerce-product-listing')
  expect(listing.length).toBeGreaterThan(0)
  expect(listing.every((r) => r.serviceSlugs.includes('ecommerce-product-listing'))).toBe(true)
})

test('upwork jobs are real, sourced and top-rated only', async () => {
  const { upworkJobs } = await import('@/content/reviews')
  expect(upworkJobs.length).toBeGreaterThanOrEqual(5)
  for (const j of upworkJobs) {
    expect(j.rating).toBeGreaterThanOrEqual(4.9)
    expect(j.sourceUrl).toBe(site.upworkUrl)
    expect(j.period).toMatch(/\d{4}/)
  }
})

test('both platforms have verbatim reviews', () => {
  expect(reviews.some((r) => r.platform === 'upwork')).toBe(true)
  expect(reviews.some((r) => r.platform === 'fiverr')).toBe(true)
})

test('site contacts match spec', () => {
  expect(site.url).toBe('https://3s-soft.com')
  expect(site.whatsapp).toBe('https://wa.me/8801835927634')
  expect(site.email).toBe('info@3s-soft.com')
  expect(site.fiverrUrl).toBe('https://www.fiverr.com/jashedulislam')
  expect(site.bookingUrl).toBe('https://cal.com/3s-soft/15min')
})
