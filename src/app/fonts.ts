import { Archivo, Public_Sans } from 'next/font/google'

// display 'optional': a font that arrives after first paint is not swapped in, so there is no full-page relayout.
// Weight axis only: the width axis nearly tripled the file (90 KB) and delayed first paint on slow phones.
export const display = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'optional',
})

export const body = Public_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'optional',
})

// Monospace labels use the system monospace font (tokens.css): no extra download on the critical path.
