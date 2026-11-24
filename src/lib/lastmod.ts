import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'
import { posts } from '@/content/posts'

/** Content files a page is built from, besides its own page.tsx. */
const CONTENT: Record<string, string[]> = {
  '/': ['src/content/home.ts', 'src/content/proof.ts', 'src/content/reviews.ts'],
  '/services/': ['src/content/services.ts'],
  '/portfolio/': ['src/content/portfolio.ts'],
  '/reviews/': ['src/content/reviews.ts', 'src/content/proof.ts'],
  '/about-us/': ['src/content/team.ts'],
  '/team/': ['src/content/team.ts'],
  '/blogs/': ['src/content/posts.ts'],
}

/** The source files whose last change is the page's real last-modified date. */
export function pageSources(route: string): string[] {
  const service = route.match(/^\/services\/[^/]+\/$/)
  if (service) return ['src/app/services/[slug]/page.tsx', 'src/content/services.ts']
  if (/^\/portfolio\/[^/]+\/$/.test(route)) return ['src/app/portfolio/[slug]/page.tsx', 'src/content/portfolio.ts']
  return [`src/app${route}page.tsx`, ...(CONTENT[route] ?? [])]
}

function gitDate(files: string[]): string | null {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], { encoding: 'utf8' }).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null
  } catch {
    return null
  }
}

/** YYYY-MM-DD. Guides use the "updated" date printed on the guide; other pages use git history, then file times. */
export function pageLastModified(route: string): string {
  const post = posts.find((p) => route === `/blog/${p.slug}/`)
  if (post) return post.updated
  const files = pageSources(route)
  return gitDate(files) ?? new Date(Math.max(...files.map((f) => statSync(f).mtimeMs))).toISOString().slice(0, 10)
}
