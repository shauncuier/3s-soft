/** Share-card (Open Graph) images: one 1200x630 PNG per service and guide, drawn by scripts/build-og.ts. */
export type OgKind = 'service' | 'post'

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

export function ogImage(kind: OgKind, slug: string, alt: string) {
  return { url: `/og/${kind}-${slug}.png`, width: OG_WIDTH, height: OG_HEIGHT, alt }
}

/** Greedy word wrap: each line stays within maxChars unless one word alone is longer. */
export function wrapTitle(text: string, maxChars: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word
    if (next.length <= maxChars || !line) line = next
    else {
      lines.push(line)
      line = word
    }
  }
  if (line) lines.push(line)
  return lines
}
