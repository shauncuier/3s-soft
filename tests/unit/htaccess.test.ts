import { redirects, renderHtaccess } from '@/content/redirects'
import { siteRoutes } from '@/lib/seo'

const ht = renderHtaccess(redirects)

/** Applies the generated RedirectMatch rules to a path, the way Apache would (first match wins). */
function resolve(path: string): string | null {
  for (const line of ht.split('\n')) {
    const m = line.match(/^RedirectMatch 301 (\S+) (\S+)$/)
    if (m && new RegExp(m[1]).test(path)) return m[2]
  }
  return null
}

test('forces HTTPS and the bare domain', () => {
  expect(ht).toMatch(/RewriteCond %\{HTTPS\} off \[OR\]/)
  expect(ht).toMatch(/RewriteCond %\{HTTP_HOST\} \^www\\\. \[NC\]/)
  expect(ht).toContain('RewriteRule ^ https://3s-soft.com%{REQUEST_URI} [L,R=301]')
})

test('serves the static 404 page', () => {
  expect(ht).toContain('ErrorDocument 404 /404.html')
})

test('old service URLs redirect with or without a trailing slash', () => {
  expect(resolve('/services/graphic-design')).toBe('/services/amazon-a-plus-content/')
  expect(resolve('/services/graphic-design/')).toBe('/services/amazon-a-plus-content/')
  expect(resolve('/services/web-development-mern/')).toBe('https://3s-soft.net/services/')
})

test('fake case studies and dropped posts redirect', () => {
  expect(resolve('/portfolio/ecommerce-platform-retailmax')).toBe('/portfolio/')
  expect(resolve('/blog/best-software-company-in-chittagong-3s-soft/')).toBe('/about-us/')
})

test('old app routes go somewhere useful', () => {
  expect(resolve('/login')).toBe('/contact/')
  expect(resolve('/register/')).toBe('/contact/')
  expect(resolve('/dashboard/profile')).toBe('/')
  expect(resolve('/dashboard')).toBe('/')
})

test('no redirect ever catches a live page', () => {
  for (const route of siteRoutes()) expect(resolve(route)).toBeNull()
})

test('hashed assets cache for a year, HTML never caches', () => {
  expect(ht).toMatch(/_next\/static[\s\S]*max-age=31536000, immutable/)
  expect(ht).toContain('<FilesMatch "\\.(html|xml|txt)$">\n    Header set Cache-Control "no-cache"')
})

test('every redirect target is absolute https or a trailing-slash path', () => {
  for (const r of redirects) expect(r.to).toMatch(/^(https:\/\/.+|\/.*\/)$|^\/$/)
})
