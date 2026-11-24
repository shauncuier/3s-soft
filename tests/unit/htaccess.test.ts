import { redirects, renderHtaccess, renderOldUrlsSitemap } from '@/content/redirects'
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

test('forces HTTPS on the same host, so staging stays on staging', () => {
  expect(ht).toContain('RewriteCond %{HTTPS} off\n  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]')
})

test('only www goes to the bare production domain', () => {
  expect(ht).toContain('RewriteCond %{HTTP_HOST} ^www\\.3s-soft\\.com$ [NC]\n  RewriteRule ^ https://3s-soft.com%{REQUEST_URI} [L,R=301]')
})

test('the trailing-slash redirect keeps the requested host', () => {
  expect(ht).toContain('RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1/ [L,R=301]')
  expect(ht).not.toContain('RewriteRule ^(.*)$ https://3s-soft.com')
})

test('old /blog/ index goes to /blogs/', () => {
  expect(resolve('/blog')).toBe('/blogs/')
  expect(resolve('/blog/')).toBe('/blogs/')
  expect(resolve('/blog/some-live-post/')).toBeNull()
})

test('JavaScript is compressed under both MIME names', () => {
  expect(ht).toMatch(/DEFLATE[^\n]*text\/javascript/)
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

describe('old-urls.xml (temporary sitemap so Google recrawls the 301s)', () => {
  const xml = renderOldUrlsSitemap(redirects)
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

  test('is a valid urlset listing every old URL on the live domain', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    for (const r of redirects) expect(locs).toContain(`https://3s-soft.com${r.from}`)
    expect(locs).toContain('https://3s-soft.com/blog')
  })

  test('every listed URL really redirects, and none is a live page', () => {
    const live = new Set(siteRoutes())
    for (const loc of locs) {
      const path = loc.replace('https://3s-soft.com', '')
      expect(resolve(path), path).not.toBeNull()
      expect(live.has(path) || live.has(`${path}/`), path).toBe(false)
    }
  })

  test('lists each URL once and escapes XML', () => {
    expect(new Set(locs).size).toBe(locs.length)
    expect(renderOldUrlsSitemap([{ from: '/a&b', to: '/' }])).toContain('<loc>https://3s-soft.com/a&amp;b</loc>')
  })
})
