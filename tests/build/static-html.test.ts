import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { checkOutput, BANNED } from '../../scripts/check-output'

const subdirs = (dir: string) => readdirSync(dir).filter((n) => statSync(join(dir, n)).isDirectory())

const home = readFileSync('out/index.html', 'utf8')

test('key facts and CTAs are in the static HTML, not rendered by JS', () => {
  for (const s of ['465', '5.0', 'marketplace listings', 'wa.me/8801835927634', 'fiverr.com/jashedulislam', 'cal.com/3s-soft/listing-call']) {
    expect(home).toContain(s)
  }
})

test('pages ship only the small site script, no framework runtime', () => {
  expect(home).toMatch(/<script data-site-loader="" data-src="\/assets\/site\.js\?v=[0-9a-f]{10}">/)
  expect(home).not.toMatch(/_next\/static\/[^"]*\.js|__next_f/)
  const problems = checkOutput(null, [{ path: 'x/index.html', html: '<html><head><link rel="canonical" href="x"><script src="/_next/static/chunks/a.js"></script></head><body><h1>a</h1></body></html>' }])
  expect(problems.join('\n')).toMatch(/framework JavaScript/)
})

test('the built site passes every output gate', () => {
  expect(checkOutput('out')).toEqual([])
})

test('the gate ignores CSS and scripts, only visible text counts', () => {
  const ok = '<html><head><link rel="canonical" href="x"><meta property="og:image" content="/og/default.png"><style>.a{left:98%}</style><script>var a="500+"</script></head><body><h1>Fine</h1></body></html>'
  expect(checkOutput(null, [{ path: 'ok/index.html', html: ok }])).toEqual([])
})

test('the gate itself catches banned claims and broken patterns', () => {
  expect(BANNED).toContain('500+')
  const bad = '<html><head></head><body><h1>a</h1><h1>b</h1><a href="#">x</a><img src="a.png">500+ projects</body></html>'
  const problems = checkOutput(null, [{ path: 'fake/index.html', html: bad }])
  expect(problems.join('\n')).toMatch(/banned "500\+"/)
  expect(problems.join('\n')).toMatch(/2 <h1>/)
  expect(problems.join('\n')).toMatch(/href="#"/)
  expect(problems.join('\n')).toMatch(/<img> without alt/)
  expect(problems.join('\n')).toMatch(/no canonical/)
})

test('the gate fails a search title over 60 characters, counting entities as one character', () => {
  const head = (title: string) => `<html><head><title>${title}</title><link rel="canonical" href="x"><meta property="og:image" content="/og/a.png"></head><body><h1>a</h1></body></html>`
  const long = 'A'.repeat(51) + ' | 3s-Soft'
  expect(checkOutput(null, [{ path: 'long/index.html', html: head(long) }]).join('\n')).toMatch(/title is 61 characters/)
  const fits = 'M &amp; A Global: 2,451 Amazon toner listings | 3s-Soft'
  expect(checkOutput(null, [{ path: 'fits/index.html', html: head(fits) }])).toEqual([])
})

test('the gate fails an indexable page with no share image, but not a noindex page', () => {
  const page = (robots: string) => `<html><head><title>T</title>${robots}<link rel="canonical" href="x"></head><body><h1>a</h1></body></html>`
  expect(checkOutput(null, [{ path: 'p/index.html', html: page('') }]).join('\n')).toMatch(/no og:image/)
  expect(checkOutput(null, [{ path: 'thank-you/index.html', html: page('<meta name="robots" content="noindex, follow">') }])).toEqual([])
})

test('every guide is linked from its service pages and from other guides, not only from /blogs/', () => {
  const pages = readdirSync('out/blog').map((slug) => slug)
  const all = ['services', 'blog'].flatMap((d) => subdirs(join('out', d)).map((s) => ({ path: `${d}/${s}`, html: readFileSync(join('out', d, s, 'index.html'), 'utf8') })))
  for (const slug of pages) {
    const linkers = all.filter((p) => p.path !== `blog/${slug}` && p.html.includes(`href="/blog/${slug}/"`))
    expect(linkers.map((p) => p.path), slug).toEqual(expect.arrayContaining([expect.stringMatching(/^services\//), expect.stringMatching(/^blog\//)]))
  }
})

test('every service page and guide has its own share card on disk', () => {
  for (const d of ['services', 'blog']) {
    for (const slug of subdirs(join('out', d))) {
      const html = readFileSync(join('out', d, slug, 'index.html'), 'utf8')
      const url = html.match(/<meta property="og:image" content="https:\/\/3s-soft\.com(\/og\/[^"]+)"/)?.[1]
      expect(url, `${d}/${slug}`).toMatch(new RegExp(`/og/(service|post)-${slug}\\.png$`))
      expect(existsSync(join('out', url!))).toBe(true)
    }
  }
})

test('every srcset file referenced by any page exists', () => {
  const walk = (d: string): string[] => readdirSync(d).flatMap((n) => { const f = join(d, n); return statSync(f).isDirectory() ? walk(f) : f.endsWith('.html') ? [f] : [] })
  const missing: string[] = []
  for (const f of walk('out')) {
    for (const m of readFileSync(f, 'utf8').matchAll(/srcSet="([^"]+)"|srcset="([^"]+)"/g)) {
      for (const part of (m[1] ?? m[2]).split(',')) {
        const url = part.trim().split(' ')[0]
        if (url.startsWith('/') && !existsSync(join('out', url))) missing.push(`${f}: ${url}`)
      }
    }
  }
  expect(missing).toEqual([])
})

test('a kill-switch sw.js replaces the old site service worker', () => {
  const sw = readFileSync('out/sw.js', 'utf8')
  expect(sw).toContain('caches.delete')
  expect(sw).toContain('registration.unregister')
  expect(sw).not.toMatch(/importScripts|workbox/i)
})

test('the export ships the mail handler and keeps its helper private', () => {
  expect(existsSync('out/api/lead.php')).toBe(true)
  expect(readFileSync('out/api/lead-lib.php', 'utf8')).toMatch(/if \(!defined\('LEAD_MAILER'\)\)/)
  for (const f of ['out/contact/index.html', 'out/free-listing-audit/index.html']) expect(readFileSync(f, 'utf8')).toContain('action="/api/lead.php"')
})

test('a case study with a video loads nothing until play, and offers a transcript and a results grid', () => {
  const html = readFileSync('out/portfolio/m-and-a-global-amazon-toner-catalogue/index.html', 'utf8')
  expect(html).toMatch(/<video[^>]*preload="none"/)
  expect(html).toMatch(/<summary[^>]*>[^<]*transcript/i)
  expect(html).toContain('2,451')
  expect(html).not.toMatch(/Karim|Mikahail/i)
})

test('the thank-you page exists, is hidden from search engines and left out of the sitemap', () => {
  const html = readFileSync('out/thank-you/index.html', 'utf8')
  expect(html).toMatch(/<meta name="robots" content="noindex/)
  expect(html).toMatch(/<h1[^>]*>[^<]*Thanks/)
  expect(readFileSync('out/sitemap.xml', 'utf8')).not.toContain('/thank-you/')
})
