import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@/components/Header'
import { ConsentBanner } from '@/components/ConsentBanner'
import { ConsentReset } from '@/components/ConsentReset'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { BeforeAfter } from '@/components/kit/BeforeAfter'
import { TrackedLink } from '@/components/TrackedLink'
import { initMenu, initNavCurrent } from '@/client/menu'
import { initConsent } from '@/client/consent'
import { initTracking } from '@/client/track'
import { initFilter } from '@/client/filter'
import { initBeforeAfter } from '@/client/before-after'
import { setConsent } from '@/lib/analytics'

declare global { interface Window { gtag?: (...args: unknown[]) => void } }

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  document.head.innerHTML = ''
  document.documentElement.className = ''
  window.gtag = undefined
  history.replaceState(null, '', '/')
})

test('the components render no React event handlers: markup only', () => {
  const { container } = render(<><Header /><BeforeAfter /></>)
  expect(container.innerHTML).not.toMatch(/on[A-Z][a-z]+=/)
})

test('menu button opens and closes the mobile menu, Escape closes it', () => {
  render(<Header />)
  initMenu(document)
  const button = screen.getByRole('button', { name: /menu/i })
  const menu = document.getElementById('site-menu')!
  expect(menu.hidden).toBe(true)
  fireEvent.click(button)
  expect(button.getAttribute('aria-expanded')).toBe('true')
  expect(menu.hidden).toBe(false)
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(menu.hidden).toBe(true)
  expect(button.getAttribute('aria-expanded')).toBe('false')
})

test('the current section is marked in the navigation', () => {
  history.replaceState(null, '', '/services/amazon-a-plus-content/')
  render(<Header />)
  initNavCurrent(document)
  const current = [...document.querySelectorAll('[aria-current="page"]')].map((a) => a.textContent)
  expect(current).toContain('Services')
  expect(current).not.toContain('Work')
})

test('consent banner is in the HTML but hidden until the script finds no stored choice', () => {
  render(<ConsentBanner />)
  const banner = document.querySelector<HTMLElement>('[data-consent-banner]')!
  expect(banner.hidden).toBe(true)
  initConsent(document)
  expect(screen.getByRole('region', { name: 'Cookie choice' }).hidden).toBe(false)
})

test('the open banner reserves its height without forcing a layout of the page', () => {
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
  let resize: ResizeObserverCallback = () => {}
  ;(window as unknown as { ResizeObserver: unknown }).ResizeObserver = class { constructor(cb: ResizeObserverCallback) { resize = cb } observe() {} disconnect() {} }
  render(<ConsentBanner />)
  initConsent(document)
  expect(rect).not.toHaveBeenCalled()
  resize([{ borderBoxSize: [{ blockSize: 174 }] } as unknown as ResizeObserverEntry], {} as ResizeObserver)
  expect(document.querySelector<HTMLElement>('[data-consent-spacer]')!.style.height).toBe('174px')
  expect(document.documentElement.style.scrollPaddingBottom).toBe('190px')
  fireEvent.click(screen.getByRole('button', { name: 'Decline' }))
  expect(document.querySelector<HTMLElement>('[data-consent-spacer]')!.style.height).toBe('0px')
  rect.mockRestore()
})

test('declining hides the banner, stores the choice and loads no trackers', () => {
  render(<ConsentBanner />)
  initConsent(document)
  fireEvent.click(screen.getByRole('button', { name: 'Decline' }))
  expect(localStorage.getItem('3s-consent')).toBe('denied')
  expect(document.querySelector<HTMLElement>('[data-consent-banner]')!.hidden).toBe(true)
  expect(document.getElementById('ga4')).toBeNull()
})

test('allowing loads Google Analytics', () => {
  render(<ConsentBanner />)
  initConsent(document)
  fireEvent.click(screen.getByRole('button', { name: 'Allow analytics' }))
  expect(document.getElementById('ga4')?.getAttribute('src')).toMatch(/googletagmanager\.com\/gtag\/js\?id=G-/)
})

test('a stored choice keeps the banner hidden; granted loads trackers on arrival', () => {
  setConsent('granted')
  render(<ConsentBanner />)
  initConsent(document)
  expect(document.querySelector<HTMLElement>('[data-consent-banner]')!.hidden).toBe(true)
  expect(document.getElementById('ga4')).not.toBeNull()
})

test('the reset button shows the banner again', () => {
  setConsent('denied')
  render(<><ConsentBanner /><ConsentReset /></>)
  initConsent(document)
  fireEvent.click(screen.getByRole('button', { name: /change my cookie choice/i }))
  expect(document.querySelector<HTMLElement>('[data-consent-banner]')!.hidden).toBe(false)
})

test('UTM tags from the URL are kept for the form', () => {
  history.replaceState(null, '', '/?utm_source=linkedin&utm_campaign=nov')
  render(<ConsentBanner />)
  initConsent(document)
  expect(JSON.parse(sessionStorage.getItem('3s-utm')!)).toEqual({ utm_source: 'linkedin', utm_campaign: 'nov' })
})

test('tracked links send their event only with consent', () => {
  render(<TrackedLink href="https://wa.me/1" event="whatsapp_click" external>WhatsApp</TrackedLink>)
  initTracking(document)
  window.gtag = vi.fn()
  const link = screen.getByRole('link', { name: 'WhatsApp' })
  link.addEventListener('click', (e) => e.preventDefault())
  fireEvent.click(link)
  expect(window.gtag).not.toHaveBeenCalled()
  localStorage.setItem('3s-consent', 'granted')
  fireEvent.click(link)
  expect(window.gtag).toHaveBeenCalledWith('event', 'whatsapp_click', undefined)
  expect(link.getAttribute('target')).toBe('_blank')
})

test('portfolio filter shows one category, updates the count and the hash', () => {
  const items = [
    { key: 'a', category: 'amazon' as const, node: <p>A</p> },
    { key: 'b', category: 'web' as const, node: <p>B</p> },
    { key: 'c', category: 'amazon' as const, node: <p>C</p> },
  ]
  render(<PortfolioGrid items={items} />)
  initFilter(document)
  fireEvent.click(screen.getByRole('button', { name: 'Web development' }))
  expect(screen.getByText('B').closest('li')!.hidden).toBe(false)
  expect(screen.getByText('A').closest('li')!.hidden).toBe(true)
  expect(screen.getByText(/Showing 1 of 3/)).toBeTruthy()
  expect(screen.getByRole('button', { name: 'Web development' }).getAttribute('aria-pressed')).toBe('true')
  expect(window.location.hash).toBe('#web')
  fireEvent.click(screen.getByRole('button', { name: 'All work' }))
  expect(screen.getByText(/Showing 3 of 3/)).toBeTruthy()
})

test('portfolio filter reads the hash on arrival', () => {
  history.replaceState(null, '', '/portfolio/#amazon')
  render(<PortfolioGrid items={[{ key: 'a', category: 'amazon', node: <p>A</p> }, { key: 'b', category: 'web', node: <p>B</p> }]} />)
  initFilter(document)
  expect(screen.getByText('B').closest('li')!.hidden).toBe(true)
})

test('before/after toggle switches versions by click and arrow keys', () => {
  render(<BeforeAfter />)
  initBeforeAfter(document)
  const before = screen.getByRole('radio', { name: /supplier data/i })
  const after = screen.getByRole('radio', { name: /3s-Soft listing/i })
  expect(after.getAttribute('aria-checked')).toBe('true')
  expect(screen.getByText(/mens walking suit 2pc/).closest('[data-ba-panel]')!.hasAttribute('hidden')).toBe(true)
  fireEvent.click(before)
  expect(before.getAttribute('aria-checked')).toBe('true')
  expect(screen.getByText(/mens walking suit 2pc/).closest('[data-ba-panel]')!.hasAttribute('hidden')).toBe(false)
  fireEvent.keyDown(before, { key: 'ArrowRight' })
  expect(after.getAttribute('aria-checked')).toBe('true')
  expect(document.activeElement).toBe(after)
})
