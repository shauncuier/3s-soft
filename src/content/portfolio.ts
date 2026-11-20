import type { CaseStudy, WorkItem } from './types'
import { site } from './site'

/**
 * Real case studies only. Client names appear only when publicNameApproved is true
 * (names the owner already published on 3s-soft.co.uk, Fiverr or the previous site).
 * Copy is original wording; facts come from the owner's own case studies and Seller Central screenshots.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'ivan-troy-amazon-a-plus',
    title: 'Brand Story and A+ Content for a six-colour belt range',
    metaDescription: 'Case study: an Amazon Brand Story and six A+ Content pages for Ivan Troy’s Italian leather belt range, with a size guide and comparison chart.',
    clientLabel: 'Ivan Troy · Amazon fashion brand', clientRealName: 'Ivan Troy', publicNameApproved: true,
    location: 'Los Angeles, United States',
    category: 'amazon', services: ['amazon-a-plus-content'],
    summary: 'A brand-level Brand Story and a full A+ set for the Ivo croco-embossed belt in six colours, with a shared size guide and comparison chart.',
    brief:
      'Ivan Troy designs leather belts, shoes and bags in Los Angeles and has them made in Italy. The Ivo belt sells on Amazon in six croco-embossed colours, and each colour is its own listing. We wrote and designed one Brand Story for every listing and a complete A+ page for each colour.',
    challenge:
      'Six near-identical listings had no shared brand presence and did not explain the leather, the embossing or where the belts are made. Buyers kept asking about belt sizing and Italian shoe sizes, and the listings gave no answer.',
    approach: [
      'Brand Story: a “Designed in LA. Made in Italy.” hero, a brand card, category tiles for belts, men’s shoes and women’s accessories, and a Q&A on origin, belt sizing, EU-to-US shoe sizes and leather care.',
      'One A+ layout for all six colours: a colour hero, an annotated product shot (embossed pattern, polished buckle, 35 mm width, made by hand in Italy), a detail close-up and two styling ideas.',
      'A “one belt, six shades” range module, a waist-to-belt size chart and a comparison chart that lists leather, buckle, width, sizes and origin for every colour.',
      'Headlines, styling notes and photography change per colour, while the structure stays the same so new colours can launch quickly.',
    ],
    deliverables: ['Brand Story module set with Q&A', 'Six A+ Content pages, one per colour', 'Size guide module', 'Six-way comparison chart', 'Copy and image direction'],
    takeaways: [
      'One A+ structure shared across variants makes a scattered range read as a single brand.',
      'Answering sizing and care questions inside the listing deals with the most common reasons buyers hesitate.',
    ],
    images: [
      { src: '/assets/work/ivan-troy-amazon-brand-story.webp', alt: 'Ivan Troy Amazon Brand Story with the line Designed in LA. Made in Italy. above tiles for belts, men’s shoes and women’s accessories', width: 1200, height: 1095 },
      { src: '/assets/work/ivan-troy-a-plus-black.webp', alt: 'A+ Content page for the black Ivo belt with annotated buckle, embossing and width callouts, a size chart and a comparison chart', width: 645, height: 2000 },
      { src: '/assets/work/ivan-troy-a-plus-cognac.webp', alt: 'A+ Content page for the cognac Ivo belt using the same module layout with colour-specific photos and copy', width: 645, height: 2000 },
    ],
    liveUrl: 'https://www.amazon.com/dp/B0DQ3P7237', liveLabel: 'See the listing on Amazon',
    sourceUrl: 'https://3s-soft.co.uk/work/ivan-troy-amazon-a-plus',
  },
  {
    slug: 'montique-amazon-store',
    title: '895 products and their variations added to an Amazon store',
    metaDescription: 'Case study: 895 MONTIQUE menswear listings created on Amazon, each a parent product with 20 to 42 size and colour variations.',
    clientLabel: 'MONTIQUE · Amazon menswear brand', clientRealName: 'MONTIQUE', publicNameApproved: true,
    category: 'amazon', services: ['ecommerce-product-listing', 'virtual-assistant'],
    summary: 'Parent and child listings for two-piece walking suits, each with 20 to 42 size and colour variations, keyword-written and checked in Seller Central.',
    brief:
      'MONTIQUE sells men’s two-piece walking suits on Amazon. Every style comes in many sizes and colours, so each product has to be a parent listing with its own variation family. We added and optimised the range in their Seller Central account.',
    challenge:
      'A large catalogue had to go live quickly without splitting variations across separate pages, and every title needed to stay readable while carrying the style number and the search terms buyers use.',
    approach: [
      'Built each style as a parent product with child variations by size and colour, from 20 to 42 children per parent.',
      'Wrote titles in one pattern: brand, product type, key feature and style number, so the range is easy to search and to manage.',
      'Checked every family in Manage Inventory after upload and fixed any child that failed to attach to its parent.',
    ],
    deliverables: ['895 parent listings with variation families', 'Keyword-written titles and bullets', 'Variation setup by size and colour', 'Post-upload inventory checks'],
    takeaways: [
      'Correct parent-child setup keeps reviews and sales together on one page per style.',
      'A fixed title pattern makes a large catalogue faster to update later.',
    ],
    images: [
      { src: '/assets/work/montique-amazon-store.webp', alt: 'Amazon Seller Central inventory showing 895 MONTIQUE walking-suit listings, each a parent with 20 to 42 variations', width: 1200, height: 606 },
    ],
    sourceUrl: site.fiverrUrl, date: '2023-07',
  },
  {
    slug: 'stahl-design-tebart-amazon-listing-optimization',
    title: 'Aluminium door hinge listings localised for Amazon.de',
    metaDescription: 'Case study: Amazon.de listings for Stahl-Design-Tebart’s aluminium door hinges, with German search terms, technical bullets and A+ graphics.',
    clientLabel: 'Stahl-Design-Tebart · German hardware maker', clientRealName: 'Stahl-Design-Tebart', publicNameApproved: true,
    category: 'amazon', services: ['ecommerce-product-listing', 'amazon-a-plus-content'],
    summary: 'German search terms used by contractors, technical bullets, and A+ graphics that explain the hinge’s 2D adjustment.',
    brief:
      'Stahl-Design-Tebart makes industrial-grade aluminium door hinges and sells them on Amazon.de. The listings had generic German translations and low-resolution images, so buyers did not understand what made the hinge different.',
    challenge:
      'The copy missed the hardware-store terms German contractors search with, and the hinge’s two-way adjustment, its main selling point, was hard to see in the original photos.',
    approach: [
      'Researched the German search terms used for door hinges in home improvement and trade searches.',
      'Rewrote titles and bullets around load, material, finish and the 2D adjustment, in German.',
      'Designed A+ graphics that show how the adjustment works step by step.',
    ],
    deliverables: ['German keyword research', 'Localised titles and bullet points', 'Backend search terms', 'A+ graphics for the adjustment feature'],
    takeaways: [
      'Technical products sell on Amazon when the listing uses the buyer’s trade vocabulary.',
      'One clear diagram can answer what several paragraphs of copy could not.',
    ],
    images: [],
  },
  {
    slug: 'party-supplies-amazon-catalogue',
    title: 'A 145-product party supplies catalogue with variations',
    metaDescription: 'Case study: 145 themed party supply products listed on Amazon US with variation families, UPCs and long-tail titles for party searches.',
    clientLabel: 'US party supplies seller on Amazon', publicNameApproved: false,
    category: 'amazon', services: ['ecommerce-product-listing', 'virtual-assistant'],
    summary: 'Themed party supply sets listed with UPCs, variations and long-tail titles for gift and party searches.',
    brief:
      'A US seller of themed party supplies (chip bags, confetti, juice pouch labels) needed a growing catalogue listed on Amazon, with each theme sold in several pack options.',
    challenge:
      'Party buyers search by theme and occasion, such as “video game birthday party” or “baby shower”, so generic titles were invisible. Each theme also needed its pack sizes grouped as variations.',
    approach: [
      'Grouped each theme’s pack sizes into variation families so one page carries all the options.',
      'Wrote long-tail titles that name the theme, the occasion and the pack count.',
      'Set up UPCs, prices and shipping for each child product.',
    ],
    deliverables: ['145 products in themed variation families', 'Long-tail titles for occasion searches', 'UPC, price and shipping setup'],
    takeaways: [
      'For gift and party products, the occasion is often the buyer’s first search word.',
    ],
    images: [
      { src: '/assets/work/amazon-listing-optimization-fiverr.webp', alt: 'Amazon Seller Central inventory of a US party supplies store with 145 products and themed variation families', width: 1200, height: 565 },
    ],
    sourceUrl: site.fiverrUrl, date: '2023-06',
  },
  {
    slug: 'tailwater-supply',
    title: 'A catalogue-first brand site for an Amazon and Walmart seller',
    metaDescription: 'Case study: a WordPress brand site for Tailwater Supply that organises a fly-fishing range and sends buyers to its Amazon and Walmart listings.',
    clientLabel: 'Tailwater Supply Co. · fly-fishing brand', clientRealName: 'Tailwater Supply Company', publicNameApproved: true,
    location: 'United States',
    category: 'multi-marketplace', services: ['ecommerce-product-listing', 'shopify-store-management'],
    summary: 'A brand home where anglers choose the right fly before buying it on Amazon or Walmart, built from the same product data as the marketplace listings.',
    brief:
      'Tailwater Supply sells hand-tied trout flies through Amazon and Walmart. On a marketplace the brand is one listing among thousands, so we built a website that organises the whole range, helps anglers choose and sends each sale to Amazon or Walmart.',
    challenge:
      'Every product existed only as a marketplace listing. There was nowhere to explain what each fly imitates or when it fishes well, and nothing returning customers could search for by name.',
    approach: [
      'Six fly categories, with each pattern showing hook sizes, pack counts, colours and links to its Amazon and Walmart listings.',
      'Filters for the insect a fly imitates, the water type and the target species, plus a month-by-month hatch chart.',
      'A custom WordPress theme with structured product fields that mirror the marketplace data, so both channels stay consistent.',
    ],
    deliverables: ['Brand website with catalogue, filters and hatch chart', 'Product template linked to marketplace listings', 'Journal and founder page', 'Wholesale enquiry page'],
    takeaways: [
      'A brand site does not need its own checkout to be useful: it can organise the range and send ready buyers to the marketplace.',
      'Keeping product data structured on the website makes the marketplace listings easier to keep accurate.',
    ],
    images: [
      { src: '/assets/work/tailwater-supply-home.webp', alt: 'Tailwater Supply home page with hand-tied trout flies over a river photograph', width: 1200, height: 750 },
      { src: '/assets/work/tailwater-supply-mobile.webp', alt: 'Tailwater Supply website on a phone showing the fly catalogue', width: 390, height: 844 },
    ],
    liveUrl: 'https://tailwatersupply.com/', liveLabel: 'Visit tailwatersupply.com',
    sourceUrl: 'https://3s-soft.co.uk/work/tailwater-supply',
  },
]

/** Web work shown as outbound cards. Full case studies belong on 3s-soft.net. */
export const externalWork: WorkItem[] = [
  {
    external: true, slug: 'price-stock-sync', title: 'A WooCommerce plugin that syncs supplier prices and stock',
    clientLabel: 'Our own product · WordPress.org', summary: 'Keeps a WooCommerce store in step with the Dropshipzone supplier API: prices, stock, orders and tracking.',
    url: site.wordpressPluginUrl, category: 'web',
    image: { src: '/assets/work/price-stock-sync.svg', alt: 'Diagram of a supplier catalogue syncing prices and stock into a WooCommerce store', width: 1440, height: 900 },
  },
  {
    external: true, slug: 'bhela-houseboat', title: 'A booking site with an instant price calculator',
    clientLabel: 'Bhela Houseboat · Tanguar Haor, Bangladesh',
    summary: 'A Bangla-first WordPress site for a six-cabin family houseboat. Guests pick a date and group size and see an estimated price before they book.',
    url: 'https://bhelahouseboat.com/', category: 'web',
    image: { src: '/assets/work/bhela-houseboat-website.webp', alt: 'Bhela Houseboat home page with a houseboat on Tanguar Haor and an instant rate calculator for date and guests', width: 1200, height: 750 },
  },
  {
    external: true, slug: 'candy-tourism', title: 'A tour catalogue with custom trip requests',
    clientLabel: 'Candy Tourism Bangladesh · travel agency',
    summary: 'A custom WordPress theme listing group tours to Saint Martin, Sajek and Tanguar Haor, with a form for travellers to request their own trip plan.',
    url: 'https://candytourismbd.com/', category: 'web',
    image: { src: '/assets/work/candy-tourism-website.webp', alt: 'Candy Tourism Bangladesh home page with a fishing boat on the beach and buttons to browse trips or plan a custom trip', width: 1200, height: 750 },
  },
]

externalWork.push({
  external: true, slug: 'exsabujian', title: 'An alumni platform with member sign-in and event registration',
  clientLabel: 'Praktan Sabujian Parishad · school alumni association',
  summary: 'A Next.js site for Sabuj Shikshayatan’s former students: a batch-by-batch member directory, verified sign-ups and registration for the school’s Golden Jubilee.',
  url: 'https://www.exsabujian.org/', category: 'web',
  image: { src: '/assets/work/exsabujian-website.webp', alt: 'Praktan Sabujian Parishad home page with the headline Connecting Generations of Sabuj Shikshayatan and a Golden Jubilee registration card', width: 1200, height: 750 },
})

export function getAllWork(): WorkItem[] {
  return [...caseStudies, ...externalWork]
}

export function getCaseStudy(slug: string): CaseStudy {
  const c = caseStudies.find((x) => x.slug === slug)
  if (!c) throw new Error(`Unknown case study: ${slug}`)
  return c
}

export function getExternal(slug: string): WorkItem {
  const w = externalWork.find((x) => x.slug === slug)
  if (!w) throw new Error(`Unknown external work: ${slug}`)
  return w
}
