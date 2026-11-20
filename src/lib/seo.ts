import { site } from '@/content/site'
import { services } from '@/content/services'
import { caseStudies } from '@/content/portfolio'
import { posts } from '@/content/posts'

export const SITE_URL = 'https://3s-soft.com'

const STATIC_ROUTES = [
  '/', '/services/', '/portfolio/', '/reviews/', '/about-us/', '/team/', '/blogs/', '/contact/', '/free-listing-audit/',
  '/privacy-policy/', '/terms-of-service/', '/cookies/',
]

/** Every indexable route, trailing slash included. Single source for the sitemap and tests. */
export function siteRoutes(): string[] {
  return [
    ...STATIC_ROUTES,
    ...services.map((s) => `/services/${s.slug}/`),
    ...caseStudies.map((c) => `/portfolio/${c.slug}/`),
    ...posts.map((p) => `/blog/${p.slug}/`),
  ]
}

/** Site-wide Organization + ProfessionalService entity. No ratings: Google treats self-hosted business reviews as self-serving. */
export function orgJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#org`,
    name: '3s-Soft',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/brand/3s-soft-icon-512.png`,
    image: `${SITE_URL}/og/default.png`,
    description: 'eCommerce operations team writing, uploading and maintaining product listings for Amazon, Walmart, Shopify, Etsy and eBay sellers.',
    email: site.email,
    telephone: site.phone.replace(/\s/g, ''),
    foundingDate: String(site.foundingYear),
    address: { '@type': 'PostalAddress', addressLocality: site.address.city, addressCountry: 'BD' },
    areaServed: ['US', 'GB', 'CA', 'EU'],
    knowsAbout: ['Amazon listing optimization', 'Amazon A+ Content', 'Shopify product management', 'B2B lead generation', 'eCommerce catalogue management'],
    founder: { '@type': 'Person', name: site.founder.name, url: site.founder.url, sameAs: [site.founder.linkedin, site.founder.github] },
    sameAs: [site.fiverrUrl, site.upworkAgencyUrl, site.upworkUrl, ...site.socials.map((s) => s.url), site.ukUrl, site.netUrl, site.wordpressPluginUrl],
  }
}

export function serviceJsonLd(s: { title: string; metaDescription: string; slug: string }): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.metaDescription,
    url: `${SITE_URL}/services/${s.slug}/`,
    provider: { '@id': `${SITE_URL}/#org` },
    areaServed: 'Worldwide',
  }
}
