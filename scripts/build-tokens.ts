/**
 * Turns design-system/project/tokens.json (the design system's single source)
 * into src/styles/tokens.css. Runs before every build.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

type Themed = string | Record<string, string>
type Token = { name: string; value: Themed }
type Tokens = {
  color: { themes: { id: string }[]; tokens: Token[] }
  shadow?: { tokens: Token[] }
  [family: string]: unknown
}

const THEMED_FAMILIES = ['color', 'shadow'] as const
const SKIP = new Set(['name', 'version', 'type', ...THEMED_FAMILIES])

function themedValue(value: Themed, theme: string, first: string): string {
  return typeof value === 'string' ? value : (value[theme] ?? value[first])
}

function declarations(tokens: Token[], theme: string, first: string): string {
  return tokens.map((t) => `  --${t.name}: ${themedValue(t.value, theme, first)};`).join('\n')
}

export function renderTokensCss(json: unknown): string {
  const tokens = json as Tokens
  const [light, dark] = tokens.color.themes.map((t) => t.id)
  const themed: Token[] = [...tokens.color.tokens, ...(tokens.shadow?.tokens ?? [])]

  const plain: Token[] = []
  for (const [family, block] of Object.entries(tokens)) {
    if (SKIP.has(family)) continue
    const list = (block as { tokens?: Token[] })?.tokens
    if (Array.isArray(list)) plain.push(...list)
  }

  const lightBlock = declarations(themed, light, light)
  const darkBlock = declarations(themed, dark, light)

  return [
    '/* Generated from design-system/project/tokens.json by scripts/build-tokens.ts. Do not edit. */',
    `:root {\n${lightBlock}\n${plain.map((t) => `  --${t.name}: ${t.value as string};`).join('\n')}\n  color-scheme: light;\n}`,
    `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${darkBlock.replace(/^/gm, '  ')}\n    color-scheme: dark;\n  }\n}`,
    `:root[data-theme="dark"] {\n${darkBlock}\n  color-scheme: dark;\n}`,
    '',
  ].join('\n\n')
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const json = JSON.parse(readFileSync(resolve(root, 'design-system/project/tokens.json'), 'utf8'))
  mkdirSync(resolve(root, 'src/styles'), { recursive: true })
  writeFileSync(resolve(root, 'src/styles/tokens.css'), renderTokensCss(json))
  console.log('Wrote src/styles/tokens.css')
}
