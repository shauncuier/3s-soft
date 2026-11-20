import { render, screen, fireEvent } from '@testing-library/react'
import { PageHero } from '@/components/kit/PageHero'
import { CtaPanel } from '@/components/kit/CtaPanel'
import { ReviewGrid } from '@/components/kit/ReviewGrid'
import { RatingBars } from '@/components/kit/RatingBars'
import { HomeHero } from '@/components/kit/HomeHero'
import { BeforeAfter } from '@/components/kit/BeforeAfter'
import { reviews } from '@/content/reviews'
import { getProof } from '@/content/proof'

test('PageHero renders one h1 and breadcrumbs with no decorative motion', () => {
  const { container } = render(
    <PageHero eyebrow="Services" title="eCommerce services" intro="Five services." crumbs={[{ name: 'Services', path: '/services/' }]} />,
  )
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeTruthy()
  expect(container.querySelector('.motion-float, .motion-marquee, svg[aria-hidden="true"].absolute')).toBeNull()
})

test('PageHero puts an aside in a second column', () => {
  render(<PageHero eyebrow="Contact" title="Talk to us" aside={<p>Form here</p>} />)
  expect(screen.getByText('Form here')).toBeTruthy()
})

test('CtaPanel offers the audit and WhatsApp with neutral marketplace wording', () => {
  render(<CtaPanel title="Ready?" text="Free audit." />)
  expect(screen.getByRole('link', { name: /free 5-product audit/i }).getAttribute('href')).toMatch(/free-listing-audit/)
  expect(screen.getByRole('link', { name: /whatsapp/i }).getAttribute('href')).toMatch(/wa\.me/)
  expect(document.body.textContent).toMatch(/Also available on Fiverr & Upwork/)
  expect(document.body.textContent).not.toMatch(/fee/i)
})

test('ReviewGrid shows every review once, static, with no animation controls', () => {
  const { container } = render(<ReviewGrid reviews={reviews.slice(0, 4)} />)
  expect(container.querySelectorAll('blockquote')).toHaveLength(4)
  expect(container.querySelector('[aria-hidden="true"] blockquote')).toBeNull()
  expect(screen.queryByRole('button', { name: /animation/i })).toBeNull()
})

test('RatingBars shows each star count with an accessible table', () => {
  render(<RatingBars breakdown={{ 5: 444, 4: 14, 3: 2, 2: 3, 1: 2 }} />)
  expect(screen.getByRole('table')).toBeTruthy()
  expect(screen.getByText('444')).toBeTruthy()
})

test('HomeHero: one h1, audit CTA, a real screenshot and proof numbers from proof.ts', () => {
  const { container } = render(<HomeHero />)
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('link', { name: /free 5-product audit/i })).toBeTruthy()
  const img = screen.getByRole('img')
  expect(img.getAttribute('alt')?.length).toBeGreaterThan(10)
  expect(document.body.textContent).toContain(getProof('fiverr-reviews').value)
  expect(container.querySelector('.motion-float, .hand')).toBeNull()
})

test('before/after toggle switches the listing card between versions', () => {
  render(<BeforeAfter />)
  const before = screen.getByRole('radio', { name: /supplier data/i })
  const after = screen.getByRole('radio', { name: /3s-Soft listing/i })
  expect(after.getAttribute('aria-checked')).toBe('true')
  fireEvent.click(before)
  expect(before.getAttribute('aria-checked')).toBe('true')
  expect(screen.getByText(/mens walking suit 2pc/)).toBeTruthy()
})

test('before/after arrow keys move between the two versions', () => {
  render(<BeforeAfter />)
  fireEvent.keyDown(screen.getByRole('radio', { name: /3s-Soft listing/i }), { key: 'ArrowLeft' })
  expect(screen.getByRole('radio', { name: /supplier data/i }).getAttribute('aria-checked')).toBe('true')
})
