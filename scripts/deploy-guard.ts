/** Staging must tell search engines not to index; live must be indexable. Anything else is the wrong build. */
export function buildMatchesTarget(indexHtml: string, target: 'staging' | 'live'): boolean {
  const robots = indexHtml.match(/<meta name="robots" content="([^"]*)"/)?.[1]
  if (!robots) return false
  const noindex = /\bnoindex\b/.test(robots)
  return target === 'staging' ? noindex : !noindex && /\bindex\b/.test(robots)
}

/**
 * A zip starts with the local-file header "PK\x03\x04". Git Bash's GNU tar writes a plain tar
 * even when the file is named .zip, and cPanel then "extracts" it to nothing.
 */
export function isZipArchive(bytes: Uint8Array): boolean {
  return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04
}
