import type { ProofItem } from './types'
import { site } from './site'

const CHECKED = '2026-11-20'

/** The only numbers the site may show. Re-check monthly against the sources. */
export const proof: ProofItem[] = [
  { id: 'fiverr-rating', value: '5.0', label: 'Fiverr rating', sourceUrl: site.fiverrUrl, checkedOn: CHECKED },
  { id: 'fiverr-reviews', value: '465', label: 'Fiverr reviews', sourceUrl: site.fiverrUrl, checkedOn: CHECKED },
  { id: 'fiverr-five-star', value: '444', label: 'five-star reviews', sourceUrl: site.fiverrUrl, checkedOn: CHECKED },
  { id: 'fiverr-since', value: '2015', label: 'Selling on Fiverr since', sourceUrl: site.fiverrUrl, checkedOn: CHECKED },
  { id: 'fiverr-response', value: '~1 hour', label: 'Average response time', sourceUrl: site.fiverrUrl, checkedOn: CHECKED },
  { id: 'gig-listing-rating', value: '4.9', label: 'Product Upload gig, 220 reviews', sourceUrl: 'https://www.fiverr.com/jashedulislam/upload-products-listing-to-amazon-ebay-etsy-groupon-walmart-usa-europe-ca', checkedOn: CHECKED },
  { id: 'gig-handmade-rating', value: '5.0', label: 'Amazon listing with SEO gig, 98 reviews', sourceUrl: 'https://www.fiverr.com/jashedulislam/do-ecommerce-product-listing-manually', checkedOn: CHECKED },
  { id: 'gig-leads-rating', value: '4.8', label: 'B2B Lead Generation gig, 118 reviews', sourceUrl: 'https://www.fiverr.com/jashedulislam/lead-generation-any-country-email-research-data-entry-web-research', checkedOn: CHECKED },
  { id: 'upwork-badge', value: 'Top Rated', label: 'Upwork badge', sourceUrl: site.upworkUrl, checkedOn: CHECKED },
  { id: 'upwork-jss', value: '100%', label: 'Upwork Job Success', sourceUrl: site.upworkUrl, checkedOn: CHECKED },
  { id: 'upwork-jobs', value: '55', label: 'Upwork jobs completed', sourceUrl: site.upworkUrl, checkedOn: CHECKED },
  { id: 'amazon-spn', value: '2', label: 'Amazon SPN listings: A+ Content & Cataloguing', sourceUrl: site.amazonSpnAplusUrl, checkedOn: CHECKED },
  { id: 'wp-plugin', value: '1', label: 'Published WordPress.org plugin', sourceUrl: site.wordpressPluginUrl, checkedOn: CHECKED },
]

/** Fiverr star breakdown from the public profile, for /reviews. */
export const fiverrBreakdown = { 5: 444, 4: 14, 3: 2, 2: 3, 1: 2 } as const

export function getProof(id: string): ProofItem {
  const item = proof.find((p) => p.id === id)
  if (!item) throw new Error(`Unknown proof id: ${id}`)
  return item
}

const DATE = /^\d{4}-\d{2}-\d{2}$/

export function validateProof(items: ProofItem[]): string[] {
  const errors: string[] = []
  const seen = new Set<string>()
  for (const p of items) {
    if (seen.has(p.id)) errors.push(`${p.id}: duplicate id`)
    seen.add(p.id)
    if (!p.value.trim()) errors.push(`${p.id}: empty value`)
    if (!p.sourceUrl.startsWith('https://')) errors.push(`${p.id}: sourceUrl must be https`)
    else if (!DATE.test(p.checkedOn)) errors.push(`${p.id}: checkedOn must be YYYY-MM-DD`)
  }
  return errors
}
