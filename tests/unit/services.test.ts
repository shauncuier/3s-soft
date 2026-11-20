import { services, getService } from '@/content/services'
import { reviewsFor } from '@/content/reviews'

const SLUGS = ['ecommerce-product-listing', 'amazon-a-plus-content', 'shopify-store-management', 'lead-generation', 'virtual-assistant']

test('exactly the five eCommerce services exist', () => {
  expect(services.map((s) => s.slug).sort()).toEqual([...SLUGS].sort())
})

test.each(SLUGS)('%s has SEO-sized meta title and description', (slug) => {
  const s = getService(slug as never)
  expect(s.metaTitle.length).toBeLessThanOrEqual(60)
  expect(s.metaDescription.length).toBeGreaterThanOrEqual(120)
  expect(s.metaDescription.length).toBeLessThanOrEqual(155)
})

test('primary keywords are unique across services', () => {
  const keys = services.map((s) => s.primaryKeyword)
  expect(new Set(keys).size).toBe(keys.length)
})

test.each(SLUGS)('%s has at least two real reviews', (slug) => {
  expect(reviewsFor(slug as never).length).toBeGreaterThanOrEqual(2)
})

test('no starting prices until the owner approves them', () => {
  expect(services.every((s) => s.startingFrom === undefined)).toBe(true)
})

test('copy avoids banned claims and dashes', () => {
  const text = JSON.stringify(services)
  for (const banned of ['500+', '98%', '24/7', 'Guaranteed', 'guarantee', 'Top Rated Plus', ' — ', ' – ']) {
    expect(text).not.toContain(banned)
  }
})

test('every service proof id exists in proof.ts', async () => {
  const { getProof } = await import('@/content/proof')
  for (const s of services) for (const id of s.proofIds) expect(() => getProof(id)).not.toThrow()
})

test('every service has an H1, deliverables and FAQ', () => {
  for (const s of services) {
    expect(s.h1.length).toBeGreaterThan(10)
    expect(s.deliverables.length).toBeGreaterThanOrEqual(4)
    expect(s.faq.length).toBeGreaterThanOrEqual(3)
  }
})
