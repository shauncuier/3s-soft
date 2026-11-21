import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { checkOutput, BANNED } from '../../scripts/check-output'

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
  const ok = '<html><head><link rel="canonical" href="x"><style>.a{left:98%}</style><script>var a="500+"</script></head><body><h1>Fine</h1></body></html>'
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
