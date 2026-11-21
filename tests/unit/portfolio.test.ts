import { existsSync } from 'node:fs'
import { caseStudies, externalWork, getAllWork, getCaseStudy } from '@/content/portfolio'

const FAKE_SLUGS = [
  'ecommerce-platform-retailmax', 'business-analytics-dashboard-datadriven', 'healthcare-portal-medicare',
  'real-estate-platform-propertyhub', 'restaurant-chain-website-tastybites', 'fashion-brand-store-stylevogue',
  'fitness-tracking-app-fitlife', 'corporate-branding-suite-techventure', 'amazon-marketplace-optimization-homegoods',
  'seo-digital-marketing-greenenergy', 'social-media-campaign-luxe-beauty', 'educational-learning-platform-edutech',
]

test('unapproved clients are anonymised', () => {
  for (const c of caseStudies) {
    if (!c.publicNameApproved && c.clientRealName) expect(c.clientLabel).not.toContain(c.clientRealName)
    if (!c.publicNameApproved) expect(JSON.stringify([c.title, c.summary, c.brief, c.challenge, c.approach])).not.toMatch(/Events Done Right/)
  }
})

test('every image has real alt text, dimensions and a file on disk', () => {
  const images = [...caseStudies.flatMap((c) => c.images), ...externalWork.flatMap((w) => (w.external && w.image ? [w.image] : []))]
  expect(images.length).toBeGreaterThan(5)
  for (const img of images) {
    expect(img.alt.length).toBeGreaterThan(10)
    expect(img.width).toBeGreaterThan(0)
    expect(img.height).toBeGreaterThan(0)
    expect(existsSync(`public${img.src}`)).toBe(true)
  }
})

test('none of the fake case studies come back', () => {
  const slugs = getAllWork().map((w) => w.slug)
  for (const fake of FAKE_SLUGS) expect(slugs).not.toContain(fake)
})

test('external work links use https', () => {
  for (const w of externalWork) if (w.external) expect(w.url).toMatch(/^https:\/\//)
})

test('every case study has a brief, challenge, approach and deliverables', () => {
  for (const c of caseStudies) {
    expect(c.brief.length).toBeGreaterThan(80)
    expect(c.challenge.length).toBeGreaterThan(40)
    expect(c.approach.length).toBeGreaterThanOrEqual(2)
    expect(c.deliverables.length).toBeGreaterThanOrEqual(3)
  }
})

test('the alumni platform case study shows the logo before and after', () => {
  const c = getCaseStudy('praktan-sabujian-parishad')
  expect(c.category).toBe('web')
  expect(c.beforeAfter).toBeDefined()
  for (const img of [c.beforeAfter!.before, c.beforeAfter!.after]) {
    expect(existsSync(`public${img.src}`)).toBe(true)
    expect(img.alt.length).toBeGreaterThan(20)
  }
  expect(c.liveUrl).toBe('https://www.exsabujian.org/')
})

test('slugs are unique and getCaseStudy finds each one', () => {
  const slugs = getAllWork().map((w) => w.slug)
  expect(new Set(slugs).size).toBe(slugs.length)
  for (const c of caseStudies) expect(getCaseStudy(c.slug).slug).toBe(c.slug)
})

test('every case study shows at least one real image that exists', () => {
  for (const c of caseStudies) {
    expect(c.images.length, c.slug).toBeGreaterThan(0)
    for (const img of c.images) expect(existsSync(`public${img.src}`), img.src).toBe(true)
  }
})

test('Stahl-Design-Tebart case study describes the WSS locks and 2D hinges shown in its images', () => {
  const c = getCaseStudy('stahl-design-tebart-amazon-listing-optimization')
  expect(c.title).toMatch(/lock/i)
  expect(c.title).toMatch(/hinge/i)
  expect(c.images.length).toBeGreaterThanOrEqual(4)
  expect(c.images.every((i) => i.alt.length > 40)).toBe(true)
})

test('M & A Global toner case study: company named, no personal name, real images, results, video with transcript', () => {
  const c = getCaseStudy('m-and-a-global-amazon-toner-catalogue')
  expect(c.clientRealName).toBe('M & A Global')
  expect(c.publicNameApproved).toBe(true)
  expect(JSON.stringify(c)).not.toMatch(/Karim|Mikahail/i)
  expect(c.images.length).toBeGreaterThanOrEqual(8)
  for (const img of c.images) expect(existsSync(`public${img.src}`), img.src).toBe(true)
  expect(c.results?.find((r) => r.value === '2,451')).toBeTruthy()
  expect(c.video && existsSync(`public${c.video.src}`)).toBe(true)
  expect(c.video!.transcript.length).toBeGreaterThan(5)
})
