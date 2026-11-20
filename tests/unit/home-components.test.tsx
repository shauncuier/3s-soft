import { render, screen } from '@testing-library/react'
import { ServiceCard } from '@/components/ServiceCard'
import { WorkCard } from '@/components/WorkCard'
import { Faq } from '@/components/Faq'
import { serviceCards, selectedWork, homeFaq, builtSites } from '@/content/home'

test('websites built by the web studio link out to the live sites', () => {
  expect(builtSites.map((s) => (s.external ? s.url : ''))).toEqual(['https://bhelahouseboat.com/', 'https://candytourismbd.com/', 'https://www.exsabujian.org/'])
  for (const site of builtSites) {
    const { unmount } = render(<WorkCard item={site} />)
    const link = screen.getByRole('link')
    expect(link.getAttribute('target')).toBe('_blank')
    expect(screen.getByRole('img').getAttribute('alt')!.length).toBeGreaterThan(20)
    unmount()
  }
})

test('ServiceCard links to its service page and lists at most three deliverables', () => {
  render(<ServiceCard service={serviceCards[0]} />)
  // next/link only appends the trailing slash when next.config (trailingSlash) is loaded, i.e. in the real build.
  expect(screen.getByRole('link').getAttribute('href')).toMatch(/^\/services\/ecommerce-product-listing\/?$/)
  expect(screen.getAllByRole('listitem').length).toBeLessThanOrEqual(3)
})

test('internal WorkCard links to its case study', () => {
  const item = selectedWork.find((w) => !w.external)!
  render(<WorkCard item={item} />)
  expect(screen.getByRole('link').getAttribute('href')).toMatch(new RegExp(`^/portfolio/${item.slug}/?$`))
})

test('external WorkCard opens the outside source in a new tab', () => {
  const item = selectedWork.find((w) => w.external)!
  render(<WorkCard item={item} />)
  const link = screen.getByRole('link')
  expect(link.getAttribute('target')).toBe('_blank')
  expect(link.getAttribute('href')).toMatch(/^https:\/\//)
})

test('unapproved client names never render', () => {
  const item = selectedWork.find((w) => !w.external && !w.publicNameApproved)!
  const { container } = render(<WorkCard item={item} />)
  if (!item.external && item.clientRealName) expect(container.textContent).not.toContain(item.clientRealName)
  expect(container.textContent).toContain(item.clientLabel)
})

test('Faq renders a disclosure per question and FAQPage JSON-LD with the same text', () => {
  const { container } = render(<Faq items={homeFaq} />)
  expect(container.querySelectorAll('details')).toHaveLength(homeFaq.length)
  const ld = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!)
  expect(ld['@type']).toBe('FAQPage')
  expect(ld.mainEntity[0].name).toBe(homeFaq[0].q)
  expect(ld.mainEntity[0].acceptedAnswer.text).toBe(homeFaq[0].a)
})
