import type { ServiceCardData, WorkItem } from './types'
import { site } from './site'
import { caseStudies, getExternal, getCaseStudy } from './portfolio'

/** Homepage copy. Written from docs/research/keyword-map.md (cluster 1) and checked with the humanizer skill. */
export const homeMeta = {
  title: 'Amazon, Shopify & Marketplace Listing Services | 3s-Soft',
  description:
    'Product listings, A+ Content and catalogue work for Amazon, Shopify, Walmart, Etsy and eBay sellers. 5.0★ from 465 Fiverr reviews. Free 5-product audit.',
}

export const hero = {
  eyebrow: 'eCommerce operations team, since 2015',
  title: 'Amazon, Shopify & marketplace listings done right',
  sub: 'We create, fix and maintain product listings for Amazon, Walmart, Shopify, Etsy and eBay sellers: keyword-researched titles, A+ Content, bulk uploads and catalogue updates. 465 Fiverr reviews average 5.0.',
}

export const homeProofIds = ['fiverr-rating', 'fiverr-reviews', 'upwork-jss', 'amazon-spn', 'fiverr-since']

export const serviceCards: ServiceCardData[] = [
  {
    slug: 'ecommerce-product-listing',
    title: 'Product listing & bulk upload',
    summary: 'New products and variations created, keyword-researched and live on each marketplace.',
    deliverables: ['Titles, bullets, descriptions and backend search terms', 'Variations and flat-file bulk uploads', "Images prepared to each marketplace's rules"],
    platforms: ['Amazon', 'Walmart', 'Shopify', 'Etsy', 'eBay'],
  },
  {
    slug: 'amazon-a-plus-content',
    title: 'Amazon A+ Content',
    summary: "A+ modules and Brand Story designed and published by a provider listed on Amazon's Service Provider Network.",
    deliverables: ['Comparison charts across a product range', 'Brand Story carousel', 'Lifestyle mockups and image modules'],
    platforms: ['Amazon SPN', 'A+ · EBC'],
  },
  {
    slug: 'shopify-store-management',
    title: 'Shopify store management',
    summary: 'Products, variants and collections set up properly, plus Printful and marketplace sync.',
    deliverables: ['Product import and variant setup', 'SEO titles, tags and collections', 'Sync to eBay, Etsy and Pinterest'],
    platforms: ['Shopify', 'WooCommerce', 'Printful'],
  },
  {
    slug: 'lead-generation',
    title: 'B2B lead generation',
    summary: 'Prospect lists built to your criteria, with verified emails.',
    deliverables: ['Decision-maker names and roles', 'Verified business emails', 'Company and LinkedIn details'],
    platforms: ['Any country', 'Any industry'],
  },
  {
    slug: 'virtual-assistant',
    title: 'Catalogue & data management',
    summary: 'Ongoing catalogue work so listings stay accurate after launch.',
    deliverables: ['Price and stock updates', 'Product data entry and clean-up', 'Day-to-day marketplace admin'],
    platforms: ['Amazon', 'Shopify', 'eBay'],
  },
]

export const webTeaser = {
  title: 'Need the store itself built?',
  text: 'Store websites, WooCommerce work and custom web apps are handled by our web development studio, 3s-soft.net.',
  href: site.netUrl,
}

/** Selected work for the homepage: the eCommerce case studies plus our own WooCommerce plugin. */
export const selectedWork: WorkItem[] = [...caseStudies.filter((c) => c.category !== 'web'), getExternal('price-stock-sync')]

/** Client websites built by the web studio (3s-soft.net). Shown on .com as outbound proof. */
export const builtSites: WorkItem[] = [getExternal('bhela-houseboat'), getExternal('candy-tourism'), getCaseStudy('praktan-sabujian-parishad')]

export const process = [
  { title: 'Send your links', text: 'Share your store, ASINs or a spreadsheet. We reply with questions and a fixed quote.' },
  { title: 'Agree the plan', text: 'Scope, deliverables and a delivery date are settled before work starts.' },
  { title: 'Build and check', text: "Listings are written, uploaded and checked against each marketplace's rules." },
  { title: 'Deliver and support', text: "You check the work and we fix anything that's off. We can also stay on for ongoing updates." },
]

export const homeReviewIds = ['cromwelltoby-listings', 'sharecave', 'garrymackie', 'alexandre-bdl', 'fouad-l', 'seo-mayhem']

export const homeFaq = [
  { q: 'Which marketplaces do you work with?', a: 'Amazon, Walmart, Shopify, Etsy, eBay and WooCommerce. Most of our Amazon work is for US and UK sellers.' },
  { q: 'How much does a listing cost?', a: 'It depends on how many products you have and how much research each one needs. Send your list and you get a fixed quote before any work starts. If you prefer ordering on a marketplace, our Fiverr listing gigs start at $10.' },
  { q: 'Do you need access to my Seller Central or Shopify account?', a: 'For uploads, yes. You add us as a user with only the permissions the job needs and remove access when we finish. For copy-only work we send files you upload yourself.' },
  { q: 'How long does it take?', a: 'Most listing jobs take a few days to a week, depending on volume. Large catalogues go out in batches. You get a delivery date before we start.' },
  { q: 'Who will I work with?', a: 'Jashedul Islam Shaun, the founder, leads every project with the 3s-Soft team in Chittagong, Bangladesh. UK businesses can also work with our UK director through 3s-soft.co.uk.' },
  { q: 'Can I hire you through Fiverr or Upwork?', a: 'Yes. Both profiles are linked at the bottom of this page.' },
]

export const finalCta = {
  title: "Send us five products. We'll show you what to fix.",
  text: 'The audit is free, and you keep the notes whether or not you hire us.',
}
