import type { ServiceSlug } from './types'

export type PostSection = { heading: string; paragraphs: string[]; list?: string[] }

export type Post = {
  slug: string
  title: string
  description: string
  reviewedBy: string
  published: string
  updated: string
  services: ServiceSlug[]
  sections: PostSection[]
}

const REVIEWER = 'Jashedul Islam Shaun'
const UPDATED = '2026-11-20'

/**
 * Guides rewritten in Nov 2026 on their original URLs. Written by the 3s-Soft team and reviewed by the founder.
 * Practical advice only; no statistics without a source. Copy checked against the humanizer patterns.
 */
export const posts: Post[] = [
  {
    slug: 'ecommerce-product-optimization-conversions',
    title: 'Product listing optimisation: a checklist for Amazon, Walmart and Shopify',
    description: 'A practical checklist for product titles, bullets, backend search terms, images and variations on Amazon, Walmart and Shopify, from a listing team.',
    reviewedBy: REVIEWER, published: '2026-01-26', updated: UPDATED,
    services: ['ecommerce-product-listing'],
    sections: [
      {
        heading: 'Start with the search terms, not the copy',
        paragraphs: [
          'Before writing anything, list the words a buyer types when looking for the product. Use the marketplace search bar suggestions, the titles of top-selling competitors and the questions in their reviews. Group the terms into the main product name, features, materials, sizes and uses.',
          'Every later step uses that list. A title written before the research usually has to be rewritten.',
        ],
      },
      {
        heading: 'Titles',
        paragraphs: [
          'Amazon caps titles at 200 characters in most categories and rejects titles that repeat a word more than twice or use special characters such as !, $ or ?. Mobile search shows far fewer characters, so put the product type and the most searched feature in the first part.',
          'Walmart and Shopify have their own limits, but the same order works everywhere: brand, product type, key feature, size or quantity, colour.',
        ],
      },
      {
        heading: 'Bullets and descriptions',
        paragraphs: ['Use the five Amazon bullet points to answer the questions buyers actually ask. A good test is to read the bullets aloud to someone who has never seen the product and ask what is still unclear.'],
        list: [
          'One idea per bullet, starting with the benefit and ending with the proof.',
          'Real measurements and materials instead of adjectives.',
          'Sizing, compatibility and care information where returns usually come from.',
        ],
      },
      {
        heading: 'Backend search terms',
        paragraphs: ['Amazon allows 249 bytes of backend search terms on most marketplaces. Use them for synonyms, spelling variants and other-language terms that did not fit in the visible copy. Do not repeat words already in the title, and do not add competitor brand names.'],
      },
      {
        heading: 'Variations',
        paragraphs: [
          'If the same product comes in several sizes or colours, list it as one parent with child variations. Separate listings split reviews and sales history. When we added 895 parent products for [MONTIQUE](/portfolio/montique-amazon-store/), each family had between 20 and 42 children, and checking that every child attached to its parent was part of the job.',
        ],
      },
      {
        heading: 'Images',
        paragraphs: ['Check each marketplace’s image rules before upload: Amazon’s main image needs a pure white background and the product filling most of the frame. Use the other image slots for scale, details, packaging and sizing.'],
      },
      {
        heading: 'Want a second pair of eyes?',
        paragraphs: ['Our [free 5-product listing audit](/free-listing-audit/) runs through this checklist on your own listings. For full rewrites and bulk uploads, see our [Amazon listing optimization service](/services/ecommerce-product-listing/).'],
      },
    ],
  },
  {
    slug: 'amazon-global-selling-strategies-uk-us',
    title: 'Selling on Amazon US and UK: what changes between the two marketplaces',
    description: 'Spelling, sizes, units, pricing and A+ Content all change between Amazon.com and Amazon.co.uk. What to adapt before copying a US listing to the UK.',
    reviewedBy: REVIEWER, published: '2026-03-05', updated: UPDATED,
    services: ['ecommerce-product-listing', 'amazon-a-plus-content'],
    sections: [
      {
        heading: 'A copied listing is a weak listing',
        paragraphs: ['Amazon lets you build offers in other marketplaces from your existing listings, which saves time. But a US listing pasted into Amazon.co.uk often misses what UK buyers search for and leaves out information they expect.'],
      },
      {
        heading: 'Language and spelling',
        paragraphs: ['UK shoppers search for “colour”, “trainers”, “jumper” and “nappies”. A US listing written for “color”, “sneakers”, “sweater” and “diapers” can rank for the wrong words. Rewrite the title, bullets and backend search terms in UK English rather than relying on automatic translation.'],
      },
      {
        heading: 'Sizes, units and measurements',
        list: [
          'Clothing and shoe sizes differ between the US, UK and EU. Add a size chart that converts between them.',
          'Give dimensions and weights in metric first for the UK, with imperial alongside if your buyers expect it.',
          'Check plug types and voltage for anything electrical.',
        ],
        paragraphs: ['Sizing questions are a common reason buyers hesitate. On the [Ivan Troy belt range](/portfolio/ivan-troy-amazon-a-plus/) we added a size guide module that converts waist size to belt size and EU shoe sizes to US sizes.'],
      },
      {
        heading: 'Pricing and VAT',
        paragraphs: ['UK prices on Amazon are shown to shoppers including VAT. Work out your UK price from your landed cost, fees and VAT rather than converting the dollar price.'],
      },
      {
        heading: 'Brand Story and A+ Content',
        paragraphs: ['A+ Content is created per marketplace. Reuse the design, but check that every image with text uses UK spelling and units before you submit it on Amazon.co.uk.'],
      },
      {
        heading: 'Where we can help',
        paragraphs: ['We localise US listings for the UK and the other way round, including [A+ Content](/services/amazon-a-plus-content/). UK businesses can also work with our UK director through [3s-soft.co.uk](https://3s-soft.co.uk).'],
      },
    ],
  },
  {
    slug: 'shopify-scaling-strategies-2026',
    title: 'Shopify catalogue management: keeping products, variants and collections tidy',
    description: 'How to structure Shopify products, options, tags and collections so a growing catalogue stays easy to filter, search and update. Practical steps.',
    reviewedBy: REVIEWER, published: '2025-10-11', updated: UPDATED,
    services: ['shopify-store-management'],
    sections: [
      {
        heading: 'Decide the structure before importing',
        paragraphs: ['Most messy Shopify stores grew one product at a time. Before a large import, write down which products are separate items and which are options of one product. Each Shopify product can have up to three options, such as size, colour and material.'],
      },
      {
        heading: 'Use one naming pattern',
        paragraphs: ['Pick a title pattern and keep it: brand, product type, key feature. Consistent titles make search, sorting and bulk edits much easier, and they carry over cleanly if you also sell on Amazon or eBay.'],
      },
      {
        heading: 'Tags and collections',
        paragraphs: ['Automated collections built on tags or product type update themselves as you add products. That only works if tags are consistent, so keep a short tag list in a shared sheet and use it every time.'],
        list: ['Tags for things customers filter by: material, style, occasion.', 'Product type for the main category.', 'Avoid one-off tags that only one product uses.'],
      },
      {
        heading: 'SEO fields',
        paragraphs: ['Every product has its own page title and meta description. Fill them in for your main products rather than leaving Shopify’s defaults, and give images descriptive alt text.'],
      },
      {
        heading: 'Keep a master product sheet',
        paragraphs: ['A single spreadsheet with SKU, price, stock and copy for every product makes bulk updates safe, and it is the base for syncing to other channels.'],
      },
      {
        heading: 'Need help with the catalogue work?',
        paragraphs: ['See our [Shopify product upload and store management service](/services/shopify-store-management/). For theme and store builds, our web studio is at [3s-soft.net](https://3s-soft.net).'],
      },
    ],
  },
  {
    slug: 'maximizing-ecommerce-revenue-amazon-shopify-2026',
    title: 'Selling the same products on Amazon and Shopify: one catalogue, two channels',
    description: 'Keep products, prices and stock in step between Amazon and Shopify with one master sheet, matching SKUs and a clear routine for updates.',
    reviewedBy: REVIEWER, published: '2025-09-07', updated: UPDATED,
    services: ['ecommerce-product-listing', 'shopify-store-management', 'virtual-assistant'],
    sections: [
      {
        heading: 'One source of truth',
        paragraphs: ['When the same product sells on Amazon and on your own Shopify store, the details drift apart: a price changes in one place, a new colour is added in the other. Keep one master sheet that holds SKU, title, price, stock, images and copy, and update the channels from it.'],
      },
      {
        heading: 'Match SKUs across channels',
        paragraphs: ['Use the same SKU for the same item everywhere. It makes stock syncing apps, reports and supplier orders much simpler, and it lets you find every copy of a product in seconds.'],
      },
      {
        heading: 'Write for each channel, from the same facts',
        paragraphs: ['Amazon copy follows Amazon’s title and bullet rules. Your Shopify page can carry more story, photos and guidance. Both should use the same measurements, materials and claims.'],
      },
      {
        heading: 'Watch your prices',
        paragraphs: ['Amazon checks whether an item is priced noticeably lower elsewhere and can stop showing the Buy Box when it is. Decide your pricing across channels on purpose, and change prices from the master sheet so nothing is missed.'],
      },
      {
        heading: 'A brand site can send sales to Amazon',
        paragraphs: ['Not every brand site needs its own checkout. The [Tailwater Supply](/portfolio/tailwater-supply/) site organises a fly-fishing range and links each product to its Amazon and Walmart listings, built from the same product data as the listings.'],
      },
      {
        heading: 'Getting it set up',
        paragraphs: ['We set up master sheets, [listings](/services/ecommerce-product-listing/) and [Shopify catalogues](/services/shopify-store-management/), and keep them in step on a [monthly support plan](/services/virtual-assistant/).'],
      },
    ],
  },
  {
    slug: 'linkedin-lead-generation-b2b-usa',
    title: 'How we build B2B lead lists from LinkedIn and company websites',
    description: 'The steps we use to build researched B2B prospect lists: defining the target, finding companies, finding decision makers and verifying emails.',
    reviewedBy: REVIEWER, published: '2025-12-27', updated: UPDATED,
    services: ['lead-generation'],
    sections: [
      {
        heading: 'Define who you want to reach',
        paragraphs: ['A useful list starts with a precise target. Write down the countries, industries, company sizes and job titles you sell to, plus anything that rules a company out. The more specific the brief, the fewer wasted contacts.'],
      },
      {
        heading: 'Find the companies first',
        paragraphs: ['We build the company list from business directories, industry associations, LinkedIn company search and the companies’ own websites. Each company is checked against the brief before we look for people.'],
      },
      {
        heading: 'Then find the decision makers',
        paragraphs: ['For each company we look for the people with the job titles in your brief, using LinkedIn and the company website’s team and contact pages. Names and titles are checked against at least one other source where possible.'],
      },
      {
        heading: 'Verify before delivery',
        paragraphs: ['Emails are run through a verification check before the list is delivered, and duplicates against your existing CRM export are removed. The result is a spreadsheet ready to import.'],
        list: ['Name, job title and LinkedIn profile', 'Business email, verified', 'Company name, website, size, industry and location'],
      },
      {
        heading: 'Use the list responsibly',
        paragraphs: ['Cold email rules differ by country. In the US, commercial email must follow CAN-SPAM, including a working unsubscribe link and a real postal address. In the UK and EU, check your obligations under data protection law before contacting anyone.'],
      },
      {
        heading: 'Order a list',
        paragraphs: ['See our [B2B lead generation service](/services/lead-generation/). The same service is available on Fiverr, where our lead generation gig is rated 4.8 from 118 reviews.'],
      },
    ],
  },
  {
    slug: 'roi-of-virtual-assistants-small-business',
    title: 'What an eCommerce virtual assistant can take off a seller’s plate',
    description: 'The routine catalogue, pricing and data tasks an eCommerce virtual assistant can handle for Amazon and Shopify sellers, and how to hand over access safely.',
    reviewedBy: REVIEWER, published: '2026-02-15', updated: UPDATED,
    services: ['virtual-assistant'],
    sections: [
      {
        heading: 'The work that never gets done',
        paragraphs: ['After a store launches, a steady stream of small jobs follows: a supplier changes prices, a size runs out, a listing gets suppressed. Each one takes minutes, but together they take hours a week, and they usually lose out to bigger priorities.'],
      },
      {
        heading: 'Tasks that suit a virtual assistant',
        paragraphs: ['These jobs repeat, follow clear rules and are easy to check afterwards:'],
        list: [
          'Price and stock updates from supplier sheets',
          'Adding new sizes or colours to existing listings',
          'Fixing suppressed or inactive listings',
          'Product data entry from PDFs, catalogues or websites',
          'Competitor and supplier research',
        ],
      },
      {
        heading: 'Hand over access safely',
        paragraphs: ['Never share your own login. Amazon Seller Central lets you add users with only the permissions they need, and Shopify has staff accounts with limited access. Remove access when the work ends.'],
      },
      {
        heading: 'Keep a task log',
        paragraphs: ['Ask for a simple shared log of what was done and when. It lets you check the work quickly and gives the next person a record to follow.'],
      },
      {
        heading: 'How we work',
        paragraphs: ['Our [eCommerce virtual assistant service](/services/virtual-assistant/) runs on a weekly or monthly plan, or as a one-off clean-up job. You can also start with a [free listing audit](/free-listing-audit/).'],
      },
    ],
  },
]

export function getPost(slug: string): Post {
  const p = posts.find((x) => x.slug === slug)
  if (!p) throw new Error(`Unknown post: ${slug}`)
  return p
}
