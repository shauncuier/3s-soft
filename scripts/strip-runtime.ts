/**
 * The site is static: every page is complete HTML at build time. This step removes the
 * Next.js/React client runtime (scripts, preloads, inline RSC payloads, payload .txt files
 * and JS chunks) from out/, so a visit downloads and runs only /assets/site.js.
 */
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_JS = '/assets/site.js'

export function stripRuntime(html: string, version: string): string {
  return html
    // Every script except JSON-LD and our site-script loader: RSC payloads, the Turbopack bootstrap, streaming helpers, framework chunks.
    .replace(/<script\b(?![^>]*\btype="application\/ld\+json")(?![^>]*\bdata-site-loader)[^>]*>[\s\S]*?<\/script>/g, '')
    // Script preloads, whatever the attribute order.
    .replace(/<link\b(?=[^>]*\brel="(?:preload|modulepreload)")(?=[^>]*\.js")[^>]*>/g, '')
    .replace(`data-src="${SITE_JS}"`, `data-src="${SITE_JS}?v=${version}"`)
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? [full + '/', ...walk(full)] : [full]
  })
}

export function run(dir = 'out') {
  const version = createHash('sha256').update(readFileSync(join(dir, SITE_JS))).digest('hex').slice(0, 10)
  let pages = 0
  let removed = 0
  for (const f of walk(dir)) {
    const rel = f.slice(dir.length + 1).split('\\').join('/')
    const base = rel.replace(/\/$/, '').split('/').pop() ?? ''
    if (rel.endsWith('/')) {
      // Per-segment RSC payload folders (__next.portfolio/…) are only for client navigation.
      if (base.startsWith('__next.')) rmSync(f, { recursive: true, force: true })
    } else if (f.endsWith('.html')) {
      writeFileSync(f, stripRuntime(readFileSync(f, 'utf8'), version))
      pages++
    } else if ((rel.startsWith('_next/') && f.endsWith('.js')) || (f.endsWith('.txt') && rel !== 'robots.txt' && rel !== 'llms.txt')) {
      rmSync(f, { force: true })
      removed++
    }
  }
  console.log(`Stripped the client runtime from ${pages} pages; removed ${removed} unused files. site.js v=${version}`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) run()
