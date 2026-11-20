import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { display, body } from './fonts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileCtaBar } from '@/components/MobileCtaBar'
import { ConsentBanner } from '@/components/ConsentBanner'
import { JsonLd } from '@/components/JsonLd'
import { orgJsonLd } from '@/lib/seo'
import { getProof } from '@/content/proof'
import { SITE_LOADER } from '@/lib/site-loader'

const noindex = process.env.NEXT_PUBLIC_NOINDEX === '1'

export const metadata: Metadata = {
  metadataBase: new URL('https://3s-soft.com'),
  title: { default: '3s-Soft', template: '%s | 3s-Soft' },
  description: `Product listings, A+ Content and catalogue work for Amazon, Shopify, Walmart, Etsy and eBay sellers. ${getProof('fiverr-rating').value} from ${getProof('fiverr-reviews').value} Fiverr reviews.`,
  applicationName: '3s-Soft',
  authors: [{ name: '3s-Soft', url: 'https://3s-soft.com' }],
  icons: { icon: '/favicon/favicon.ico', apple: '/favicon/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    siteName: '3s-Soft',
    locale: 'en_US',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: '3s-Soft: Amazon, Shopify & marketplace listings done right' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og/default.png'] },
  robots: noindex ? { index: false, follow: false } : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  formatDetection: { telephone: false },
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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="ds-root pb-[calc(88px+env(safe-area-inset-bottom,0px))] md:pb-0">
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        {/* Block layout, not flex: a size change near the bottom (cookie banner spacer) must not re-lay out the whole page. */}
        <main id="main" tabIndex={-1} className="min-h-[60dvh]">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
        <ConsentBanner />
        <JsonLd data={orgJsonLd()} />
        {/* The only client script, added after load. Next's own runtime is stripped after export (scripts/strip-runtime.ts). */}
        <script data-site-loader="" data-src="/assets/site.js" dangerouslySetInnerHTML={{ __html: SITE_LOADER }} />
      </body>
    </html>
  )
}
