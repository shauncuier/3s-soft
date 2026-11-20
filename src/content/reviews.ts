import type { Review, ServiceSlug } from './types'
import { site } from './site'

const CHECKED = '2026-11-20'
const GIG_LISTING = 'https://www.fiverr.com/jashedulislam/upload-products-listing-to-amazon-ebay-etsy-groupon-walmart-usa-europe-ca'
const GIG_LEADS = 'https://www.fiverr.com/jashedulislam/lead-generation-any-country-email-research-data-entry-web-research'
const GIG_HANDMADE = 'https://www.fiverr.com/jashedulislam/do-ecommerce-product-listing-manually'

/**
 * Real buyer reviews, copied verbatim from the public Fiverr gig pages and Upwork profile.
 * Only trimming with "…" is allowed. Never edit wording, spelling or punctuation.
 */
export const reviews: Review[] = [
  {
    id: 'cromwelltoby-website',
    platform: 'fiverr', user: 'cromwelltoby', country: 'United States', rating: 5,
    text: 'He built an excellent transaction capable website via Amazon and Walmart. It turned out great and creates a perfect chassis to build my business on.',
    gig: 'Product Upload', date: '2 months ago', serviceSlugs: ['ecommerce-product-listing', 'shopify-store-management'],
    sourceUrl: GIG_LISTING, checkedOn: CHECKED,
  },
  {
    id: 'cromwelltoby-listings',
    platform: 'fiverr', user: 'cromwelltoby', country: 'United States', rating: 5,
    text: 'He was very quick in getting my listings created for me. I certainly recommend his services as he is skilled and very knowledgeable on Amazon.',
    gig: 'Product Upload', date: '3 months ago', serviceSlugs: ['ecommerce-product-listing'],
    sourceUrl: GIG_LISTING, checkedOn: CHECKED,
  },
  {
    id: 'cromwelltoby-upload',
    platform: 'fiverr', user: 'cromwelltoby', country: 'United States', rating: 5,
    text: 'He worked with my issue of trying to upload product listings to Amazon and it was very helpful',
    gig: 'Product Upload', date: '8 months ago', serviceSlugs: ['ecommerce-product-listing', 'virtual-assistant'],
    sourceUrl: GIG_LISTING, checkedOn: CHECKED,
  },
  {
    id: 'alertme27',
    platform: 'fiverr', user: 'alertme27', country: 'United States', rating: 5,
    text: 'Highly recommend!!! Amazing customer service!!',
    gig: 'Product Upload', date: '5 months ago', serviceSlugs: ['ecommerce-product-listing'],
    sourceUrl: GIG_LISTING, checkedOn: CHECKED,
  },
  {
    id: 'sharecave',
    platform: 'fiverr', user: 'sharecave', country: 'United States', rating: 5,
    text: 'Absolutely outstanding work! I’m genuinely impressed with the quality, professionalism, and attention to detail. The seller created all of my Amazon listings and went far beyond my expectations…',
    gig: 'Amazon listing with SEO', date: '11 months ago', serviceSlugs: ['ecommerce-product-listing', 'amazon-a-plus-content'],
    sourceUrl: GIG_HANDMADE, checkedOn: CHECKED,
  },
  {
    id: 'seo-mayhem',
    platform: 'fiverr', user: 'seo_mayhem', country: 'United States', rating: 5,
    text: 'This guy is great. He is a hard worker and is always determined to get things done.',
    gig: 'Amazon listing with SEO', date: '5 months ago', serviceSlugs: ['ecommerce-product-listing', 'virtual-assistant'],
    sourceUrl: GIG_HANDMADE, checkedOn: CHECKED,
  },
  {
    id: 'garrymackie',
    platform: 'fiverr', user: 'garrymackie', country: 'United Kingdom', rating: 5,
    text: 'Very helpful and very diligent in his approach to the task we gave him.Has a great understanding of what needed to be done and we will be using him agsin',
    gig: 'Amazon listing with SEO', date: '1 year ago', serviceSlugs: ['amazon-a-plus-content', 'virtual-assistant'],
    sourceUrl: GIG_HANDMADE, checkedOn: CHECKED,
  },
  {
    id: 'alexwolfee',
    platform: 'fiverr', user: 'alexwolfee', country: 'United States', rating: 5,
    text: 'Easy to work with. Did a great job.!',
    gig: 'Amazon listing with SEO', date: '10 months ago', serviceSlugs: ['ecommerce-product-listing'],
    sourceUrl: GIG_HANDMADE, checkedOn: CHECKED,
  },
  {
    id: 'summerhillhome',
    platform: 'fiverr', user: 'summerhillhome', country: 'Canada', rating: 5,
    text: 'Happy With the services...highly recommended…',
    gig: 'Amazon listing with SEO', date: '11 months ago', serviceSlugs: ['ecommerce-product-listing'],
    sourceUrl: GIG_HANDMADE, checkedOn: CHECKED,
  },
  {
    id: 'alexandre-bdl',
    platform: 'fiverr', user: 'alexandre_bdl', country: 'France', rating: 5,
    text: 'The service was perfect, with great attention to detail—exactly what I was expecting. I highly recommend it!',
    gig: 'B2B Lead Generation', date: '1 year ago', serviceSlugs: ['lead-generation'],
    sourceUrl: GIG_LEADS, checkedOn: CHECKED,
  },
  {
    id: 'cherrylanchor',
    platform: 'fiverr', user: 'cherrylanchor', country: 'United States', rating: 4.7,
    text: 'Another great project completed. Thank you',
    gig: 'B2B Lead Generation', date: '9 months ago', serviceSlugs: ['lead-generation'],
    sourceUrl: GIG_LEADS, checkedOn: CHECKED,
  },
  {
    id: 'fouad-l',
    platform: 'upwork', user: 'Fouad L.', rating: 5,
    text: 'Excellent work and very professional collaboration. Communication was clear, fast, and efficient throughout the entire project. All mockups were delivered exactly as requested…',
    gig: 'Place pictures into mockups', date: 'Feb 2026', serviceSlugs: ['amazon-a-plus-content', 'shopify-store-management'],
    sourceUrl: site.upworkUrl, checkedOn: CHECKED,
  },
  {
    id: 'arye-g',
    platform: 'upwork', user: 'Arye G.', rating: 5,
    text: 'great work!',
    gig: 'Shopify VA: import products to Shopify', date: 'Aug 2022', serviceSlugs: ['shopify-store-management', 'virtual-assistant'],
    sourceUrl: site.upworkUrl, checkedOn: CHECKED,
  },
]

export type UpworkJob = { title: string; rating: number; period: string; sourceUrl: string; checkedOn: string }

/**
 * Recent Upwork jobs rated 4.9 or 5.0, with titles exactly as the clients wrote them on the public profile.
 * Upwork shows full feedback text publicly for only two of them (Fouad L. and Arye G., in `reviews`).
 */
export const upworkJobs: UpworkJob[] = [
  { title: 'Place pictures into mockups', rating: 5.0, period: 'Sep 2025 – Feb 2026' },
  { title: 'Import Content into Ghost CMS Editor', rating: 5.0, period: 'Jan 2025 – Nov 2025' },
  { title: 'Help with Ebay listing', rating: 5.0, period: 'Aug 2024 – Mar 2025' },
  { title: 'Digital Product Preparation for Educational Platforms', rating: 4.9, period: 'Jan 2025 – Mar 2025' },
  { title: 'Upload Designs to Printful / Set Variants / Import Content', rating: 5.0, period: 'Jun 2023 – Jan 2025' },
  { title: 'Sync Shopify Products to eBay, Pinterest and Etsy', rating: 5.0, period: 'Jul 2023 – Jan 2025' },
  { title: 'Copywriting - Shopify Product Uploader Needed', rating: 5.0, period: 'Dec 2024 – Jan 2025' },
  { title: 'Experienced Shopify VA - Import products to Shopify', rating: 5.0, period: 'Aug 2022' },
].map((j) => ({ ...j, sourceUrl: site.upworkUrl, checkedOn: CHECKED }))

export function reviewsFor(slug: ServiceSlug): Review[] {
  return reviews.filter((r) => r.serviceSlugs.includes(slug))
}

const DATE = /^\d{4}-\d{2}-\d{2}$/

export function validateReviews(items: Review[]): string[] {
  const errors: string[] = []
  const seen = new Set<string>()
  for (const r of items) {
    if (seen.has(r.id)) errors.push(`${r.id}: duplicate id`)
    seen.add(r.id)
    if (!r.text.trim()) errors.push(`${r.id}: empty text`)
    if (r.serviceSlugs.length === 0) errors.push(`${r.id}: needs at least one service`)
    if (!r.sourceUrl.startsWith('https://')) errors.push(`${r.id}: sourceUrl must be https`)
    else if (!DATE.test(r.checkedOn)) errors.push(`${r.id}: checkedOn must be YYYY-MM-DD`)
  }
  return errors
}
