import { SITE_LOADER } from '@/lib/site-loader'

test('the loader adds the site script only after the page has loaded', () => {
  document.body.innerHTML = '<script data-site-loader data-src="/assets/site.js?v=1"></script>'
  const s = document.querySelector('script')!
  Object.defineProperty(document, 'currentScript', { value: s, configurable: true })
  vi.useFakeTimers()
  new Function(SITE_LOADER)()
  expect(document.querySelectorAll('script[src]')).toHaveLength(0)
  window.dispatchEvent(new Event('load'))
  vi.runAllTimers()
  expect(document.querySelector('script[src]')!.getAttribute('src')).toBe('/assets/site.js?v=1')
  vi.useRealTimers()
})
