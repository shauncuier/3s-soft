import { orgJsonLd, siteRoutes, SITE_URL } from '@/lib/seo'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { metadata as notFoundMeta } from '@/app/not-found'

const OLD_PATHS = ['/login/', '/register/', '/services/graphic-design/', '/portfolio/ecommerce-platform-retailmax/', '/blog/mern-stack-scalable-web-applications-2026/']

test('organisation schema is sourced and has no self-serving ratings', () => {
  const json = JSON.stringify(orgJsonLd())
  expect(json).not.toMatch(/AggregateRating|"Review"/)
  const org = orgJsonLd() as { sameAs: string[]; foundingDate: string; '@type': string[] }
  expect(org.sameAs).toContain('https://www.fiverr.com/jashedulislam')
  expect(org.sameAs).toContain('https://3s-soft.net')
  expect(org.foundingDate).toBe('2015')
  expect(org['@type']).toContain('ProfessionalService')
})

test('site routes cover every page and end with a slash', () => {
  const routes = siteRoutes()
  for (const r of ['/', '/services/', '/services/amazon-a-plus-content/', '/portfolio/montique-amazon-store/', '/blog/shopify-scaling-strategies-2026/', '/reviews/', '/free-listing-audit/', '/privacy-policy/']) {
    expect(routes).toContain(r)
  }
  expect(routes.every((r) => r.endsWith('/'))).toBe(true)
  for (const old of OLD_PATHS) expect(routes).not.toContain(old)
})

test('sitemap lists absolute URLs for every route', () => {
  const urls = sitemap().map((e) => e.url)
  expect(urls).toContain(`${SITE_URL}/`)
  expect(urls.length).toBe(siteRoutes().length)
  expect(urls.every((u) => u.startsWith('https://3s-soft.com/'))).toBe(true)
})

test('robots allows everything and points to the sitemap', () => {
  const r = robots()
  expect(r.sitemap).toBe('https://3s-soft.com/sitemap.xml')
  expect(JSON.stringify(r.rules)).not.toContain('"disallow":"/"')
})

test('404 page is noindex', () => {
  expect((notFoundMeta.robots as { index: boolean }).index).toBe(false)
})

test('the YouTube channel is listed as an official profile', () => {
  expect(orgJsonLd().sameAs).toContain('https://www.youtube.com/@3s-soft')
})
