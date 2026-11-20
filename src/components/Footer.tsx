import Link from 'next/link'
import { site } from '@/content/site'
import { mainNav, AUDIT_HREF } from '@/content/nav'

const serviceLinks = [
  { label: 'Amazon & marketplace listings', href: '/services/ecommerce-product-listing/' },
  { label: 'Amazon A+ Content', href: '/services/amazon-a-plus-content/' },
  { label: 'Shopify store management', href: '/services/shopify-store-management/' },
  { label: 'B2B lead generation', href: '/services/lead-generation/' },
  { label: 'Catalogue & data management', href: '/services/virtual-assistant/' },
]

const proofLinks = [
  { label: 'Fiverr profile', href: site.fiverrUrl },
  { label: 'Upwork agency', href: site.upworkAgencyUrl },
  { label: 'WordPress.org plugin', href: site.wordpressPluginUrl },
  { label: 'Amazon SPN listing', href: site.amazonSpnAplusUrl },
]

const legal = [
  { label: 'Privacy policy', href: '/privacy-policy/' },
  { label: 'Terms of service', href: '/terms-of-service/' },
  { label: 'Cookie policy', href: '/cookies/' },
]

export function Footer() {
  const year = 2026
  return (
    <footer className="border-t border-line bg-surface-0">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <p className="ds-display text-xl font-extrabold" translate="no">3s-Soft</p>
          <p className="text-sm text-ink-muted">
            eCommerce operations for Amazon, Shopify, Walmart, Etsy and eBay sellers. Based in {site.address.city}, {site.address.country}, working with sellers worldwide since {site.foundingYear}.
          </p>
          <p className="text-sm">
            <a className="font-semibold hover:text-green-700" href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            <a className="hover:text-green-700" href={site.phoneHref}>{site.phone}</a>
          </p>
          <Link className="ds-btn ds-btn--primary self-start" href={AUDIT_HREF}>Get a free audit</Link>
        </div>

        <nav aria-label="Services">
          <h2 className="mb-3 text-sm font-bold">Services</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {serviceLinks.map((l) => (
              <li key={l.href}><Link className="hover:text-green-700" href={l.href}>{l.label}</Link></li>
            ))}
            <li><a className="hover:text-green-700" href={site.netUrl}>Web development: 3s-soft.net</a></li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="mb-3 text-sm font-bold">Company</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {mainNav.map((l) => (
              <li key={l.href}><Link className="hover:text-green-700" href={l.href}>{l.label}</Link></li>
            ))}
            <li><Link className="hover:text-green-700" href="/team/">Team</Link></li>
            <li><Link className="hover:text-green-700" href="/blogs/">Guides</Link></li>
            <li><a className="hover:text-green-700" href={site.ukUrl}>UK clients: 3s-soft.co.uk</a></li>
          </ul>
        </nav>

        <nav aria-label="Proof and profiles">
          <h2 className="mb-3 text-sm font-bold">Check our track record</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {proofLinks.map((l) => (
              <li key={l.href}><a className="hover:text-green-700" href={l.href} target="_blank" rel="noopener">{l.label} ↗</a></li>
            ))}
            {site.socials.map((s) => (
              <li key={s.url}><a className="hover:text-green-700" href={s.url} target="_blank" rel="noopener">{s.label} ↗</a></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} 3s-Soft. All rights reserved.</p>
          <ul className="flex flex-wrap gap-4">
            {legal.map((l) => (
              <li key={l.href}><Link className="hover:text-green-700" href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
