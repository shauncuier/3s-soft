/**
 * Post-build gate over every HTML page in out/: banned claims, placeholder links,
 * heading structure, image alt text and canonical tags. Exits 1 on any problem.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

export const BANNED = [
  '500+', '98%', '24/7', 'Guaranteed', 'Top Rated Plus', 'lorem', '>0+<',
  'RetailMax', 'DataDriven', 'MediCare', 'PropertyHub', 'TastyBites', 'StyleVogue', 'FitLife', 'TechVenture',
  'HomeGoods', 'GreenEnergy', 'Luxe Beauty', 'EduTech',
  'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Thompson', 'Lisa Wang', 'Robert Kim',
  'sj_marketing', 'mchen_eco', 'avoid fees', 'platform fees', 'cal.com/3s-soft-uk',
]

type Page = { path: string; html: string }

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return name === '_next' ? [] : htmlFiles(full)
    return name.endsWith('.html') ? [full] : []
  })
}

/** Strips scripts and JSON-LD so banned-word checks look at what visitors read and crawlers index as text. */
function visible(html: string) {
  return html.replace(/<script[\s\S]*?<\/script>/g, '')
}

export function checkOutput(dir: string | null, pages?: Page[]): string[] {
  const list: Page[] = pages ?? htmlFiles(dir!).map((f) => ({ path: relative(dir!, f).replace(/\\/g, '/'), html: readFileSync(f, 'utf8') }))
  const problems: string[] = []
  for (const { path, html } of list) {
    const text = visible(html)
    for (const b of BANNED) if (text.includes(b)) problems.push(`${path}: banned "${b}"`)
    if (/href="#"/.test(html)) problems.push(`${path}: href="#" placeholder link`)
    const h1 = (text.match(/<h1[\s>]/g) ?? []).length
    if (h1 !== 1) problems.push(`${path}: ${h1} <h1> elements (want 1)`)
    for (const img of html.match(/<img\b[^>]*>/g) ?? []) if (!/\balt=/.test(img)) problems.push(`${path}: <img> without alt`)
    const isNotFound = path === '404.html' || path.startsWith('404/') || path.startsWith('_not-found')
    if (!isNotFound && !/<link rel="canonical"/.test(html)) problems.push(`${path}: no canonical tag`)
  }
  return problems
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isMain) {
  const problems = checkOutput('out')
  if (problems.length) {
    console.error(`Output gate failed (${problems.length}):`)
    for (const p of problems) console.error(`  - ${p}`)
    process.exit(1)
  }
  console.log('Output gate passed.')
}
