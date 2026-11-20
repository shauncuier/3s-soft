import { parseInline } from '@/lib/inline'

test('plain text stays one text token', () => {
  expect(parseInline('Just text.')).toEqual([{ type: 'text', value: 'Just text.' }])
})

test('markdown-style links become link tokens', () => {
  expect(parseInline('See [our listing service](/services/ecommerce-product-listing/) today.')).toEqual([
    { type: 'text', value: 'See ' },
    { type: 'link', text: 'our listing service', href: '/services/ecommerce-product-listing/' },
    { type: 'text', value: ' today.' },
  ])
})

test('external links are marked external', () => {
  const [, link] = parseInline('Read [Amazon’s policy](https://sellercentral.amazon.com/help).')
  expect(link).toEqual({ type: 'link', text: 'Amazon’s policy', href: 'https://sellercentral.amazon.com/help', external: true })
})
