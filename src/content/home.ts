import type { ServiceCardData, WorkItem } from './types'
import { site } from './site'

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

/** Selected work for the homepage. Full case studies live under /portfolio/. */
export const selectedWork: WorkItem[] = [
  {
    slug: 'ivan-troy-amazon-a-plus', title: 'Brand Story and A+ Content for a six-colour belt range',
    clientLabel: 'Ivan Troy · Amazon fashion brand', clientRealName: 'Ivan Troy', publicNameApproved: true,
    category: 'amazon', services: ['amazon-a-plus-content'],
    summary: 'A brand-level Brand Story and a full A+ set for the Ivo croco-embossed belt in six colours, with a shared size guide and comparison chart.',
    deliverables: ['Brand Story carousel', 'A+ modules', 'Comparison chart'],
    images: [{ src: '/assets/work/ivan-troy-amazon-brand-story.webp', alt: 'Ivan Troy Amazon Brand Story with the line Designed in LA. Made in Italy. above tiles for belts, men’s shoes and women’s accessories', width: 1200, height: 1095 }],
    sourceUrl: 'https://3s-soft.co.uk/work/ivan-troy-amazon-a-plus',
  },
  {
    slug: 'montique-amazon-store', title: '895 products and their variations added to an Amazon store',
    clientLabel: 'MONTIQUE · Amazon menswear brand', clientRealName: 'MONTIQUE', publicNameApproved: true,
    category: 'amazon', services: ['ecommerce-product-listing'],
    summary: 'Parent and child listings for two-piece walking suits, each with 20 to 42 size and colour variations, keyword-written and checked in Seller Central.',
    deliverables: ['Parent/child variation listings', 'Keyword-written titles', 'Inventory checks'],
    images: [{ src: '/assets/work/montique-amazon-store.webp', alt: 'Amazon Seller Central inventory showing 895 MONTIQUE walking-suit listings, each a parent with 20 to 42 variations', width: 1200, height: 606 }],
    sourceUrl: site.fiverrUrl, date: '2023-07',
  },
  {
    slug: 'stahl-design-tebart-amazon-listing-optimization', title: 'Aluminium door hinge listings localised for Amazon.de',
    clientLabel: 'Stahl-Design-Tebart · German hardware maker', clientRealName: 'Stahl-Design-Tebart', publicNameApproved: true,
    category: 'amazon', services: ['ecommerce-product-listing', 'amazon-a-plus-content'],
    summary: 'German search terms used by contractors, technical bullets, and A+ graphics that explain the hinge’s 2D adjustment.',
    deliverables: ['German keyword research', 'Technical bullets', 'A+ graphics'],
    images: [],
  },
  {
    slug: 'party-supplies-amazon-catalogue', title: 'A 145-product party supplies catalogue with variations',
    clientLabel: 'US party supplies seller on Amazon', publicNameApproved: false,
    category: 'amazon', services: ['ecommerce-product-listing', 'virtual-assistant'],
    summary: 'Themed party supply sets listed with UPCs, variations and long-tail titles for gift and party searches.',
    deliverables: ['Variation families', 'Long-tail titles', 'UPC and pricing setup'],
    images: [{ src: '/assets/work/amazon-listing-optimization-fiverr.webp', alt: 'Amazon Seller Central inventory of a US party supplies store with 145 products and themed variation families', width: 1200, height: 565 }],
    sourceUrl: site.fiverrUrl, date: '2023-06',
  },
  {
    slug: 'tailwater-supply', title: 'A catalogue-first brand site for an Amazon and Walmart seller',
    clientLabel: 'Tailwater Supply Co. · fly-fishing brand', clientRealName: 'Tailwater Supply Company', publicNameApproved: true,
    category: 'multi-marketplace', services: ['ecommerce-product-listing', 'shopify-store-management'],
    summary: 'A brand home where anglers choose the right fly before buying it on Amazon or Walmart, built from the same product data as the marketplace listings.',
    deliverables: ['Product catalogue', 'Marketplace links', 'Content and SEO'],
    images: [{ src: '/assets/work/tailwater-supply-home.webp', alt: 'Tailwater Supply home page with hand-tied trout flies over a river photograph', width: 1200, height: 750 }],
    sourceUrl: 'https://3s-soft.co.uk/work/tailwater-supply',
  },
  {
    external: true, slug: 'price-stock-sync', title: 'A WooCommerce plugin that syncs supplier prices and stock',
    clientLabel: 'Our own product · WordPress.org', summary: 'Keeps a WooCommerce store in step with the Dropshipzone supplier API: prices, stock, orders and tracking.',
    url: site.wordpressPluginUrl, category: 'web',
    image: { src: '/assets/work/price-stock-sync.svg', alt: 'Diagram of a supplier catalogue syncing prices and stock into a WooCommerce store', width: 1440, height: 900 },
  },
]

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
