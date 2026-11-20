import { render } from '@testing-library/react'
import { Img, smallVariant } from '@/components/Img'

test('large webp images offer an 800px version to phones', () => {
  const { container } = render(<Img src="/assets/work/a.webp" alt="Shot of a listing" width={1200} height={675} sizes="100vw" />)
  const img = container.querySelector('img')!
  expect(img.getAttribute('srcset')).toBe('/assets/work/a-800w.webp 800w, /assets/work/a.webp 1200w')
  expect(img.getAttribute('sizes')).toBe('100vw')
  expect(img.getAttribute('loading')).toBe('lazy')
  expect(img.getAttribute('width')).toBe('1200')
})

test('small images and priority images', () => {
  const { container } = render(<Img src="/assets/work/b.webp" alt="Small" width={600} height={600} priority />)
  const img = container.querySelector('img')!
  expect(img.hasAttribute('srcset')).toBe(false)
  expect(img.getAttribute('loading')).toBe('eager')
  expect(img.getAttribute('fetchpriority')).toBe('high')
  expect(img.hasAttribute('decoding')).toBe(false)
})

test('smallVariant names the 800px file only for wide webp images', () => {
  expect(smallVariant('/x/y.webp', 1200)).toBe('/x/y-800w.webp')
  expect(smallVariant('/x/y.webp', 800)).toBeNull()
  expect(smallVariant('/x/y.svg', 1200)).toBeNull()
})
