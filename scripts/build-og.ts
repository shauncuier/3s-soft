/**
 * Draws a 1200x630 share card for every service page and guide into public/og/,
 * in the same style as public/og/default.png. Skips cards that are already up to date.
 */
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { services } from '../src/content/services'
import { posts } from '../src/content/posts'
import { getProof } from '../src/content/proof'
import { ogImage, wrapTitle, OG_WIDTH, OG_HEIGHT, type OgKind } from '../src/lib/og'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function cardSvg(eyebrow: string, title: string, pill: string) {
  // Fewer, bigger lines for short titles; smaller type when the title is long.
  const big = wrapTitle(title, 20)
  const [size, lines] = big.length <= 3 ? [68, big] : [56, wrapTitle(title, 25)]
  const lineH = Math.round(size * 1.12)
  const top = 150 + Math.max(0, (4 - lines.length) * lineH) / 2
  const text = lines.slice(0, 4).map((l, i) => `<text x="72" y="${top + (i + 1) * lineH}" font-size="${size}">${esc(l)}</text>`).join('')
  const pillY = top + lines.length * lineH + 48
  const pillW = 64 + pill.length * 13
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}">
  <rect width="100%" height="100%" fill="#f5f5f4"/>
  <circle cx="1240" cy="700" r="420" fill="none" stroke="#3f9654" stroke-width="56"/>
  <circle cx="1240" cy="700" r="300" fill="none" stroke="#c4c4c4" stroke-width="44"/>
  <text x="72" y="118" font-family="Arial, sans-serif" font-weight="700" font-size="30" fill="#1f7a3a">${esc(eyebrow)}</text>
  <g font-family="Arial Black, Arial, sans-serif" font-weight="900" fill="#1f1d22">${text}</g>
  <rect x="72" y="${pillY}" width="${pillW}" height="64" rx="32" fill="#ffffff" stroke="#d6d6d3"/>
  <text x="104" y="${pillY + 42}" font-family="Arial, sans-serif" font-weight="700" font-size="26" fill="#1f1d22">${esc(pill)}</text>
</svg>`
}

const rating = getProof('fiverr-rating').value
const count = getProof('fiverr-reviews').value
const pill = `★ ${rating} from ${count} Fiverr reviews`
const logo = await sharp('public/assets/brand/3s-soft-logo.webp').resize({ width: 130 }).png().toBuffer()
const logoMeta = await sharp(logo).metadata()
const logoBox = await sharp({ create: { width: 158, height: 158, channels: 4, background: '#ffffff' } })
  .composite([{ input: logo, top: Math.round((158 - (logoMeta.height ?? 130)) / 2), left: 14 }]).png().toBuffer()

const cards: { kind: OgKind; slug: string; eyebrow: string; title: string }[] = [
  ...services.map((s) => ({ kind: 'service' as const, slug: s.slug, eyebrow: '3s-Soft · Service', title: s.h1 })),
  ...posts.map((p) => ({ kind: 'post' as const, slug: p.slug, eyebrow: '3s-Soft · Guide', title: p.title })),
]

mkdirSync('public/og', { recursive: true })
mkdirSync('node_modules/.cache/og', { recursive: true })
let made = 0
for (const c of cards) {
  const out = `public${ogImage(c.kind, c.slug, c.title).url}`
  const svg = cardSvg(c.eyebrow, c.title, pill)
  const hash = createHash('sha1').update(svg).digest('hex')
  const stamp = `node_modules/.cache/og/${c.kind}-${c.slug}.sha1`
  if (existsSync(out) && existsSync(stamp) && readFileSync(stamp, 'utf8') === hash && statSync(out).size > 0) continue
  await sharp(Buffer.from(svg)).composite([{ input: logoBox, top: 40, left: OG_WIDTH - 158 - 50 }]).png({ compressionLevel: 9 }).toFile(out)
  writeFileSync(stamp, hash)
  made++
}
console.log(`Share cards: ${made} drawn, ${cards.length - made} up to date.`)
