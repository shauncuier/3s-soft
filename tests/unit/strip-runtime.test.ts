import { stripRuntime } from '../../scripts/strip-runtime'

const sample = `<!DOCTYPE html><html><head>
<link rel="stylesheet" href="/_next/static/chunks/24-abc.css" data-precedence="next"/>
<link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/turbopack-x.js"/>
<link rel="modulepreload" href="/_next/static/chunks/y.js"/>
<script src="/_next/static/chunks/a.js" async=""></script>
<script type="application/ld+json">{"@type":"Organization"}</script>
</head><body><h1>Hi</h1>
<script data-site-loader="" data-src="/assets/site.js">addEventListener("load",function(){})</script>
<script>(self.__next_f=self.__next_f||[]).push([0])</script><script>self.__next_f.push([1,"x"])</script>
<script>$RC=function(){}</script>
<script id="_R_">(globalThis["TURBOPACK"]||[]).push({"otherChunks":["static/chunks/a.js"]})</script>
</body></html>`

test('removes every Next.js runtime script, preload and RSC payload', () => {
  const out = stripRuntime(sample, 'abc123')
  expect(out).not.toMatch(/_next\/static\/chunks\/[^"]*\.js/)
  expect(out).not.toContain('__next_f')
  expect(out).not.toContain('$RC')
  expect(out).not.toContain('modulepreload')
  expect(out).not.toContain('TURBOPACK')
})

test('keeps styles, JSON-LD and the site script with a cache-busting version', () => {
  const out = stripRuntime(sample, 'abc123')
  expect(out).toContain('/_next/static/chunks/24-abc.css')
  expect(out).toContain('<script type="application/ld+json">{"@type":"Organization"}</script>')
  expect(out).toContain('<script data-site-loader="" data-src="/assets/site.js?v=abc123">addEventListener("load",function(){})</script>')
  expect(out).toContain('<h1>Hi</h1>')
})
