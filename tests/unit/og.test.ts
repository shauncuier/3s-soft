import { ogImage, wrapTitle } from '../../src/lib/og'

test('a share card path is per kind and slug, sized 1200x630', () => {
  expect(ogImage('service', 'lead-generation', 'B2B lead generation')).toEqual({
    url: '/og/service-lead-generation.png', width: 1200, height: 630, alt: 'B2B lead generation',
  })
  expect(ogImage('post', 'shopify-scaling-strategies-2026', 'x').url).toBe('/og/post-shopify-scaling-strategies-2026.png')
})

test('titles wrap on word boundaries within the line limit', () => {
  expect(wrapTitle('Amazon listing optimization and product upload service', 22)).toEqual([
    'Amazon listing', 'optimization and', 'product upload service',
  ])
  for (const line of wrapTitle('Selling the same products on Amazon and Shopify: one catalogue, two channels', 24)) {
    expect(line.length).toBeLessThanOrEqual(24)
  }
})

test('a single word longer than the limit stays on its own line', () => {
  expect(wrapTitle('Stahl-Design-Tebart-extremely-long', 10)).toEqual(['Stahl-Design-Tebart-extremely-long'])
})
