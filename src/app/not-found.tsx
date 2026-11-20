import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

const links = [
  { label: 'Amazon & marketplace listings', href: '/services/ecommerce-product-listing/' },
  { label: 'Amazon A+ Content', href: '/services/amazon-a-plus-content/' },
  { label: 'Case studies', href: '/portfolio/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Contact', href: '/contact/' },
]

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="section">
      <div className="container-site flex flex-col items-center gap-6 text-center">
        <p className="m-0 font-mono text-sm text-ink-muted">404</p>
        <h1 id="nf-title" className="page-title m-0">This page has moved or never existed</h1>
        <p className="prose-measure m-0 text-lg text-ink-muted">Our site was rebuilt in November 2026, so some old links point nowhere. Try one of these instead:</p>
        <ul className="m-0 flex list-none flex-wrap justify-center gap-3 p-0">
          {links.map((l) => <li key={l.href}><Link className="ds-btn ds-btn--secondary" href={l.href}>{l.label}</Link></li>)}
        </ul>
        <Link className="ds-btn ds-btn--primary" href="/">Back to the homepage</Link>
      </div>
    </section>
  )
}
