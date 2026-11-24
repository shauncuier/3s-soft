import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { pageSources, pageLastModified } from '@/lib/lastmod'
import { siteRoutes } from '@/lib/seo'
import { posts } from '@/content/posts'
import sitemap from '@/app/sitemap'

const today = new Date().toISOString().slice(0, 10)

test('every non-guide route maps to source files that exist', () => {
  for (const route of siteRoutes().filter((r) => !r.startsWith('/blog/'))) {
    const files = pageSources(route)
    expect(files.length, route).toBeGreaterThan(0)
    for (const f of files) expect(existsSync(f), `${route}: ${f}`).toBe(true)
  }
})

test('a page date is the newest commit date of its source files', () => {
  const files = pageSources('/cookies/')
  const newest = execSync(`git log -1 --format=%cs -- ${files.join(' ')}`, { encoding: 'utf8' }).trim()
  expect(pageLastModified('/cookies/')).toBe(newest)
})

test('a guide uses the updated date shown on the guide itself', () => {
  for (const p of posts) expect(pageLastModified(`/blog/${p.slug}/`)).toBe(p.updated)
})

test('sitemap lastmod is per page, a real date and never in the future', () => {
  const entries = sitemap()
  for (const e of entries) {
    expect(String(e.lastModified)).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(String(e.lastModified) <= today, e.url).toBe(true)
  }
  expect(new Set(entries.map((e) => e.lastModified)).size).toBeGreaterThan(1)
})
