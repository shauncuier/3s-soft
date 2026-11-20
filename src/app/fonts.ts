import { Archivo, Public_Sans } from 'next/font/google'

// Weight axis only: the width axis nearly tripled the file (90 KB) and delayed first paint on slow phones.
export const display = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const body = Public_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// Monospace labels use the system monospace font (tokens.css): no extra download on the critical path.
