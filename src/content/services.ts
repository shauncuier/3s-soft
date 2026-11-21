import type { Service, ServiceSlug } from './types'

/**
 * Service pages. One keyword cluster per page (docs/research/keyword-map.md).
 * Copy checked against the humanizer patterns. Facts only from docs/research/real-proof-sources.md.
 */
export const services: Service[] = [
  {
    slug: 'ecommerce-product-listing',
    proofIds: ['gig-listing-rating', 'gig-handmade-rating', 'amazon-spn', 'fiverr-since'],
    title: 'Product listing & bulk upload',
    shortTitle: 'Listings',
    primaryKeyword: 'amazon listing optimization service',
    metaTitle: 'Amazon Listing Optimization & Product Upload | 3s-Soft',
    metaDescription:
      'Keyword-researched titles, bullets and backend terms, variations and bulk flat-file uploads for Amazon, Walmart, Etsy, eBay and Shopify sellers.',
    h1: 'Amazon listing optimization and product upload service',
    summary:
      'We write and upload product listings that follow each marketplace’s rules and use the words your buyers search for. That covers single products, large variation families and catalogues of several hundred SKUs.',
    problems: [
      'New products sit unpublished because flat files keep failing validation.',
      'Listings show up for the wrong searches, or not at all.',
      'Variations are split across separate pages, so reviews and sales are split too.',
    ],
    deliverables: [
      'Keyword research for each product or product family',
      'Titles, bullet points, descriptions and backend search terms',
      'Parent and child variation setup by size, colour or style',
      'Bulk uploads with Amazon flat files and Walmart, Etsy or eBay templates',
      'Image checks against each marketplace’s image rules',
      'A spreadsheet of everything we published, with ASINs or item IDs',
    ],
    platforms: ['Amazon', 'Amazon Handmade', 'Walmart', 'Etsy', 'eBay', 'Shopify'],
    faq: [
      { q: 'Can you fix listings that are already live?', a: 'Yes. Send the ASINs or item links. We rewrite the copy and backend terms, fix broken variations and resubmit them. You see every change in a before-and-after sheet.' },
      { q: 'How many products can you upload?', a: 'Anything from one product to a full catalogue. MONTIQUE’s store, for example, has 895 listings, each with 20 to 42 size and colour variations.' },
      { q: 'Can you write listings in other languages?', a: 'We write in US or UK English, and we have designed German A+ Content for Stahl-Design-Tebart on Amazon.de. Other languages are quoted per project.' },
      { q: 'What do you need from me to start?', a: 'Product data in any form you have it: a spreadsheet, supplier sheet, website links or photos. We turn it into marketplace-ready listings.' },
    ],
    ctaKind: 'audit',
  },
  {
    slug: 'amazon-a-plus-content',
    proofIds: ['amazon-spn', 'fiverr-rating', 'fiverr-reviews', 'upwork-jss'],
    title: 'Amazon A+ Content',
    shortTitle: 'A+ Content',
    primaryKeyword: 'amazon a+ content design service',
    metaTitle: 'Amazon A+ Content & Brand Story Design Service | 3s-Soft',
    metaDescription:
      'A+ modules, comparison charts and Brand Story carousels designed and published by an Amazon SPN-listed provider. See the Ivan Troy belt range.',
    h1: 'Amazon A+ Content and Brand Story design',
    summary:
      'A+ Content is the image-led section under your bullet points. We plan the modules, design the images, write the copy and publish it for brand-registered sellers. 3s-Soft is listed on Amazon’s Service Provider Network for A+ Content.',
    problems: [
      'Buyers ask questions the listing could have answered with one clear image.',
      'Each product in a range has its own A+ design, so the brand looks inconsistent.',
      'You have Brand Registry but the Brand Story slot is still empty.',
    ],
    deliverables: [
      'A module plan built from your product’s selling points and buyer questions',
      'Designed image modules sized to Amazon’s specs',
      'Comparison charts that link every product in a range',
      'Brand Story carousel for the whole brand',
      'Copy written for the image text and alt text',
      'Upload and submission in Seller Central, with fixes if Amazon rejects a module',
    ],
    platforms: ['Amazon A+', 'Brand Story', 'Amazon SPN'],
    faq: [
      { q: 'Do I need Amazon Brand Registry?', a: 'Yes. A+ Content and Brand Story are only available to brand-registered sellers and approved vendors. If you are not registered yet, we can still prepare the content so it is ready to publish.' },
      { q: 'Can you use my existing product photos?', a: 'Usually. We cut out, retouch and place your photos into the modules. If a module needs a lifestyle or infographic image you do not have, we create a mockup from your product shots.' },
      { q: 'How is one A+ design reused across a range?', a: 'We build one layout and change the product-specific modules. Ivan Troy’s Ivo belt, for example, uses one A+ set across six colours with a shared size guide and comparison chart.' },
    ],
    ctaKind: 'call',
  },
  {
    slug: 'shopify-store-management',
    proofIds: ['upwork-badge', 'upwork-jss', 'upwork-jobs', 'fiverr-rating'],
    title: 'Shopify store management',
    shortTitle: 'Shopify',
    primaryKeyword: 'shopify product upload service',
    metaTitle: 'Shopify Product Upload & Store Management Service | 3s-Soft',
    metaDescription:
      'Products, variants, collections and SEO fields set up correctly in your Shopify store, plus Printful setup and sync to eBay, Etsy and Pinterest.',
    h1: 'Shopify product upload and store management',
    summary:
      'We add and maintain products in your Shopify store: imports, variants, collections, tags and SEO fields. We also connect print-on-demand apps and sales channels so the same catalogue sells in more places.',
    problems: [
      'A supplier CSV imports with broken variants and missing images.',
      'Collections and tags are inconsistent, so filters and search miss products.',
      'Products are listed on Shopify but not on eBay, Etsy or Pinterest.',
    ],
    deliverables: [
      'CSV and app-based product imports with images and variants',
      'Product titles, descriptions and SEO title and meta fields',
      'Collections, tags and filters that match how customers browse',
      'Printful and print-on-demand product setup',
      'Channel sync from Shopify to eBay, Etsy and Pinterest',
      'Ongoing product updates on a weekly or monthly plan',
    ],
    platforms: ['Shopify', 'Printful', 'eBay', 'Etsy', 'Pinterest', 'WooCommerce'],
    faq: [
      { q: 'Can you work in my live store without breaking anything?', a: 'Yes. We work with a staff account, test imports on a few products first, and keep a backup CSV of anything we change.' },
      { q: 'Do you build Shopify themes?', a: 'Theme and store builds are handled by our web development studio at 3s-soft.net. This service covers products, catalogue and store admin.' },
      { q: 'Can you keep my Shopify and Amazon listings in step?', a: 'Yes. We can manage both catalogues from one product sheet so prices, stock and copy match across channels.' },
    ],
    ctaKind: 'quote',
  },
  {
    slug: 'lead-generation',
    proofIds: ['gig-leads-rating', 'fiverr-rating', 'fiverr-since', 'fiverr-response'],
    title: 'B2B lead generation',
    shortTitle: 'Lead generation',
    primaryKeyword: 'b2b lead generation service',
    metaTitle: 'B2B Lead Generation & Prospect List Building | 3s-Soft',
    metaDescription:
      'Researched B2B prospect lists with names, roles, company data and verified emails, built to your target criteria. 4.8 from 118 Fiverr reviews.',
    h1: 'B2B lead generation and prospect lists',
    summary:
      'We research the companies and people that match your ideal customer, then deliver a clean spreadsheet with verified contact details. You choose the countries, industries, company sizes and job titles.',
    problems: [
      'Your sales team spends more time searching for contacts than talking to them.',
      'Bought lists bounce, because many of the emails are out of date.',
      'You need a list for a niche that list vendors do not cover.',
    ],
    deliverables: [
      'Prospect research against your ideal customer criteria',
      'Decision-maker names, job titles and LinkedIn profiles',
      'Business emails verified before delivery',
      'Company website, size, industry and location',
      'Duplicate removal against your existing CRM export',
      'Delivery as Google Sheets, Excel or CSV ready for import',
    ],
    platforms: ['LinkedIn', 'Company websites', 'Google Sheets', 'CSV'],
    faq: [
      { q: 'Where do the leads come from?', a: 'From public sources: company websites, LinkedIn and business directories. Every list is researched for your order.' },
      { q: 'Are the emails verified?', a: 'Yes. Emails are verified before delivery.' },
      { q: 'Can you target any country?', a: 'Yes. Recent lists have covered the US and Europe. Tell us the countries, industries and job titles you want.' },
    ],
    ctaKind: 'quote',
  },
  {
    slug: 'virtual-assistant',
    proofIds: ['fiverr-reviews', 'upwork-jobs', 'upwork-jss', 'fiverr-response'],
    title: 'Catalogue & data management',
    shortTitle: 'eCommerce VA',
    primaryKeyword: 'ecommerce virtual assistant',
    metaTitle: 'eCommerce Virtual Assistant & Catalogue Management | 3s-Soft',
    metaDescription:
      'Ongoing catalogue updates, price and stock changes, data entry and marketplace admin for Amazon and Shopify sellers. Weekly or monthly support.',
    h1: 'eCommerce virtual assistant for catalogue and data work',
    summary:
      'After launch, listings need constant small changes: new sizes, price updates, stock fixes, supplier data. We handle that routine work on a weekly or monthly plan so your catalogue stays accurate.',
    problems: [
      'Price and stock changes from suppliers pile up in your inbox.',
      'Product data lives in five spreadsheets that no longer agree.',
      'Small listing fixes never get done because launches come first.',
    ],
    deliverables: [
      'Price, stock and variation updates across your channels',
      'Product data entry and clean-up from supplier sheets or PDFs',
      'New product additions to existing listings and collections',
      'Listing health checks for suppressed or inactive products',
      'Web research for product specs, competitors or suppliers',
      'A shared task log so you see what was done each week',
    ],
    platforms: ['Amazon', 'Shopify', 'eBay', 'Walmart', 'Google Sheets'],
    faq: [
      { q: 'How does a monthly plan work?', a: 'You get a set number of hours or tasks per month and send requests by email or WhatsApp. We log each task and report what was done.' },
      { q: 'Will the same person handle my store each time?', a: 'Yes. Your account stays with the same team member, with Shaun overseeing the work, so you do not have to re-explain your catalogue.' },
      { q: 'Can I start with a one-off job?', a: 'Yes. You can start with one clean-up job and move to a monthly plan later.' },
    ],
    ctaKind: 'quote',
  },
]

export function getService(slug: ServiceSlug): Service {
  const s = services.find((x) => x.slug === slug)
  if (!s) throw new Error(`Unknown service: ${slug}`)
  return s
}
