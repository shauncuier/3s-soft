import { readFileSync } from 'node:fs'
import { checkOutput, BANNED } from '../../scripts/check-output'

const home = readFileSync('out/index.html', 'utf8')

test('key facts and CTAs are in the static HTML, not rendered by JS', () => {
  for (const s of ['465', '5.0', 'marketplace listings', 'wa.me/8801835927634', 'fiverr.com/jashedulislam', 'cal.com/3s-soft/15min']) {
    expect(home).toContain(s)
  }
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
