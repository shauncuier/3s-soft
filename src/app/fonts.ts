import { Archivo, Public_Sans, JetBrains_Mono } from 'next/font/google'

export const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
})

export const body = Public_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})
