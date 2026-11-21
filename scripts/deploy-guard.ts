/** Staging must tell search engines not to index; live must be indexable. Anything else is the wrong build. */
export function buildMatchesTarget(indexHtml: string, target: 'staging' | 'live'): boolean {
  const robots = indexHtml.match(/<meta name="robots" content="([^"]*)"/)?.[1]
  if (!robots) return false
  const noindex = /\bnoindex\b/.test(robots)
  return target === 'staging' ? noindex : !noindex && /\bindex\b/.test(robots)
}
