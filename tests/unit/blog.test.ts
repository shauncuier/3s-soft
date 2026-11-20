import { posts, getPost } from '@/content/posts'
import { team } from '@/content/team'

const KEPT = [
  'amazon-global-selling-strategies-uk-us',
  'ecommerce-product-optimization-conversions',
  'shopify-scaling-strategies-2026',
  'maximizing-ecommerce-revenue-amazon-shopify-2026',
  'linkedin-lead-generation-b2b-usa',
  'roi-of-virtual-assistants-small-business',
]

test('exactly the six kept posts exist, on their old slugs', () => {
  expect(posts.map((p) => p.slug).sort()).toEqual([...KEPT].sort())
})

test('every reviewer is on the team', () => {
  const names = team.map((t) => t.name)
  for (const p of posts) expect(names).toContain(p.reviewedBy)
})

test('every post links to at least one service page', () => {
  for (const p of posts) expect(JSON.stringify(p.sections)).toMatch(/\/services\/[a-z-]+\//)
})

test('descriptions are SEO-sized', () => {
  for (const p of posts) {
    expect(p.description.length).toBeGreaterThanOrEqual(120)
    expect(p.description.length).toBeLessThanOrEqual(155)
  }
})

test('no banned claims, dashes or React text in the VA post', () => {
  const text = JSON.stringify(posts)
  for (const banned of ['500+', '98%', '24/7', 'Guaranteed', 'Explosive', 'Powerhouse', ' — ', ' – ', 'delve', 'game-changer']) {
    expect(text).not.toContain(banned)
  }
  expect(getPost('roi-of-virtual-assistants-small-business').description).not.toMatch(/React/)
})

test('each post has at least four sections', () => {
  for (const p of posts) expect(p.sections.length).toBeGreaterThanOrEqual(4)
})
