/**
 * Next 16 static export writes per-segment prefetch payloads as folders
 * (__next.portfolio/__PAGE__.txt) while the client router requests the flat form
 * (__next.portfolio.__PAGE__.txt). Copy each nested payload to its flat name so
 * client navigation prefetch works on any static host (cPanel/Apache, serve).
 */
import { copyFileSync, readdirSync, statSync } from 'node:fs'
import { join, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Lists __next.*\/…\/*.txt files that live inside a nested __next.* folder. */
export function nestedPayloads(dir: string): string[] {
  const out: string[] = []
  const walk = (d: string, insideNext: boolean) => {
    for (const name of readdirSync(d)) {
      if (name === '_next') continue
      const full = join(d, name)
      if (statSync(full).isDirectory()) walk(full, insideNext || name.startsWith('__next.'))
      else if (insideNext && name.endsWith('.txt')) out.push(full.split(sep).join('/'))
    }
  }
  walk(dir, false)
  return out
}

/** out/a/__next.a/b/__PAGE__.txt → out/a/__next.a.b.__PAGE__.txt */
export function flatName(file: string): string {
  const parts = file.split('/')
  const i = parts.findIndex((p) => p.startsWith('__next.'))
  return [...parts.slice(0, i), parts.slice(i).join('.')].join('/')
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isMain) {
  const files = nestedPayloads('out')
  for (const f of files) copyFileSync(f, flatName(f))
  console.log(`Flattened ${files.length} prefetch payloads.`)
}
