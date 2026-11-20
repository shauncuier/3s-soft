export type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'link'; text: string; href: string; external?: true }

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

/** Splits text with [label](href) links into tokens. Nothing else is parsed. */
export function parseInline(input: string): InlineToken[] {
  const tokens: InlineToken[] = []
  let last = 0
  for (const m of input.matchAll(LINK)) {
    if (m.index > last) tokens.push({ type: 'text', value: input.slice(last, m.index) })
    const href = m[2]
    tokens.push(href.startsWith('http') ? { type: 'link', text: m[1], href, external: true } : { type: 'link', text: m[1], href })
    last = m.index + m[0].length
  }
  if (last < input.length) tokens.push({ type: 'text', value: input.slice(last) })
  return tokens
}
