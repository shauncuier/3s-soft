import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { display, body, mono, hand } from './fonts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileCtaBar } from '@/components/MobileCtaBar'
import { ConsentBanner } from '@/components/ConsentBanner'

export const metadata: Metadata = {
  metadataBase: new URL('https://3s-soft.com'),
  title: { default: '3s-Soft', template: '%s | 3s-Soft' },
  icons: { icon: '/favicon/favicon.ico', apple: '/favicon/apple-touch-icon.png' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f6f7' },
    { media: '(prefers-color-scheme: dark)', color: '#141317' },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${hand.variable}`}>
      <body className="ds-root flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
        <ConsentBanner />
      </body>
    </html>
  )
}
