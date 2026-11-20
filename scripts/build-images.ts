/** Makes an 800px-wide copy of every large .webp under public/assets for phones (used by <Img> srcset). */
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'
import { smallVariant } from '../src/components/Img'

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const f = join(dir, n)
    return statSync(f).isDirectory() ? walk(f) : [f]
  })
}

let made = 0
for (const file of walk('public/assets')) {
  if (!file.endsWith('.webp') || file.endsWith('-640w.webp') || file.endsWith('-800w.webp')) continue
  const { width = 0 } = await sharp(file).metadata()
  const out = smallVariant(file.replace(/\\/g, '/'), width)
  if (!out || (existsSync(out) && statSync(out).mtimeMs >= statSync(file).mtimeMs)) continue
  await sharp(file).resize({ width: 800 }).webp({ quality: 78 }).toFile(out)
  made++
}
console.log(`Image variants: ${made} new 800px files.`)
