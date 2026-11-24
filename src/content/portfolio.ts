import type { CaseStudy, WorkItem } from './types'
import { site } from './site'

/**
 * Real case studies only. Client names appear only when publicNameApproved is true
 * (names the owner already published on 3s-soft.co.uk, Fiverr or the previous site).
 * Copy is original wording; facts come from the owner's own case studies and Seller Central screenshots.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'm-and-a-global-amazon-toner-catalogue',
    metaTitle: 'M & A Global: 2,451 Amazon Toner Listings Live',
    title: 'From an at-risk Amazon account to 2,451 live toner listings',
    metaDescription: 'Case study: account recovery, a 2,460-listing Amazon toner catalogue built from one cost sheet with 0 upload errors, clean main photos, verified compatibility images and a PPC plan for M & A Global.',
    clientLabel: 'M & A Global · US toner cartridge seller', clientRealName: 'M & A Global', publicNameApproved: true,
    location: 'United States',
    category: 'amazon', services: ['ecommerce-product-listing', 'virtual-assistant', 'amazon-a-plus-content'],
    date: '2026-11',
    summary: 'Account recovery, 2,460 listings built from one cost sheet with 0 upload errors, a clean main photo for every SKU and 800 verified images for the top 100.',
    brief:
      'M & A Global sells compatible and remanufactured toner cartridges on Amazon in the US. They had a 2,468-row supplier cost sheet, Amazon’s blank category template and about 2,200 small supplier photos, and nothing in between: no titles, bullets, keywords or usable images. The account itself was “At Risk”, held about 5,000 junk listings, and Amazon blocked new listings.',
    challenge:
      'For toner, three details decide whether a buyer keeps the cartridge: which printers it fits, its page yield and its colour. A mistake in any of them means a return. The catalogue covered printers from 15 brands, the supplier photos were 450 to 850 px with a caption stamped on each, and 274 SKUs had no photo at all.',
    approach: [
      'Cleared the account first: deleted every old listing, got the Office Products category approved, and rebuilt from scratch. Account Health now shows “Healthy”.',
      'Documented Amazon’s current listing rules, then generated every listing from the data inside an exact copy of Amazon’s own template: a 75-character title, a highlight with the compatible printers and yield, five bullets, a description and backend keywords.',
      'Checked every upload with a separate audit script: required fields, 112 dropdown columns, UPC check digits, text limits, banned words and brand names. The final file passed with 0 errors and 0 warnings, across 28 versioned releases.',
      'Cleaned all supplier photos (stamp removed, white background, 1600 px). Review caught a bug in our own first pass, so 601 photos were re-made, plus wrong-colour and original-logo photos from the supplier. Missing photos went from 274 to 0.',
      'Ranked the top 100 SKUs by Amazon demand, opened 423 competitor pages to confirm price and pack size, and built a repricing file that never drops below break-even.',
      'Built a PPC launch plan: 4,057 real Amazon searches turned into 1,705 keywords across four campaigns, with negative keywords and a 60-day playbook.',
      'Made eight secondary images for each top-100 SKU (800 in total). All 696 printer-model entries were checked against the supplier guide or the manufacturer’s site, which also caught five live listings with wrong compatibility or part numbers.',
    ],
    deliverables: [
      'Account clean-up and Office Products approval',
      '2,460 listings, 0 upload errors',
      'A 1600 px main photo for every SKU',
      'Competitor research and a repricing file for the top 100',
      'PPC campaigns as an Amazon Ads bulk file',
      '800 secondary images with verified printer compatibility',
    ],
    takeaways: [
      'Listing the whole catalogue properly pays: the first orders came from long-tail cartridges, not only the top 100.',
      'An audit script that is separate from the build script catches what the build gets wrong, before Amazon does.',
      'For compatible parts, a checked printer list on the image prevents returns better than any headline.',
    ],
    results: [
      { value: '2,451', label: 'active listings on Amazon' },
      { value: '0', label: 'errors in the final upload audit' },
      { value: 'Healthy', label: 'account health, up from “At Risk”' },
      { value: '274 → 0', label: 'SKUs without a main photo' },
      { value: '800', label: 'secondary images for the top 100' },
      { value: '713', label: 'printer models confirmed on the images' },
      { value: '1,705', label: 'PPC keywords from 4,057 real searches' },
      { value: '3 days', label: 'from launch to the first order' },
    ],
    video: {
      src: '/assets/work/m-and-a-global-toner-catalogue.mp4',
      poster: '/assets/work/toner-video-poster.webp',
      title: 'The project in three minutes',
      duration: '3:20',
      transcript: [
        'Before any listing work, the account itself was in trouble. It held about five thousand junk listings, its status was at risk, and Amazon blocked new listings. We deleted everything, got the Office Products category approved, and rebuilt the catalog properly. Today the account is healthy.',
        'The client had a cost sheet with almost two and a half thousand cartridges, small supplier photos with a caption stamped on every one, and no listing copy at all. For toner, the details that matter are which printers it fits, its yield and its colour.',
        'We researched Amazon’s current rules first, then generated every listing from the data, inside an exact copy of Amazon’s own template. A separate audit script checked every field before each upload. The final file passed with zero errors.',
        'Every supplier photo was cleaned: the caption stamp removed, the cartridge placed on pure white, and upscaled to sixteen hundred pixels so Amazon’s zoom works.',
        'Review caught a bug in our first cleanup pass, which erased parts of light-coloured cartridges. We fixed it and re-made six hundred photos. We also removed wrong-colour and logo photos, and filled every missing photo, from two hundred and seventy-four down to zero.',
        'With no sales history yet, we ranked by Amazon demand and picked the top one hundred. We opened four hundred and twenty-three competitor pages to confirm price and pack size, because a cheap-looking listing is often a two-pack. Then we built a repricing file that never goes below break-even.',
        'For advertising, we pulled over four thousand real Amazon searches and turned them into one thousand seven hundred keywords, with bids tiered by demand, negative keywords, and a sixty-day playbook to cut waste.',
        'Then the best sellers got a full image set. Eight images each: yield, compatible printers, installation, specs, and four lifestyle scenes. Eight hundred images in total.',
        'Each product photo was cut out automatically and placed into four AI-generated scenes. The infographics are templates filled straight from the listing data, so one fix updates all one hundred products.',
        'Compatibility is where toner returns come from, so every printer model was checked against the supplier’s guide or the manufacturer’s own website. Only confirmed models made it onto the images.',
        'That check found five live listings with wrong data, including HP cartridges listing Canon printers. We fixed them with a partial update that changed only the copy, and left prices alone.',
        'And it works. Two thousand four hundred and fifty-one listings are live with a healthy account. The first order came in three days after launch, and six orders arrived in the first two weeks, several from business buyers, many of them on long-tail products.',
        'In three weeks: two thousand four hundred and sixty listings with zero errors, a clean photo for every one, eight hundred verified images, and an ad campaign ready to launch.',
        'If you sell on Amazon and your catalog needs the same care, let’s talk.',
      ],
    },
    images: [
      { src: '/assets/work/toner-tn760-image-set.webp', alt: 'The eight secondary images made for one toner listing: page yield, compatible printers, home office, installation steps, small business, specifications, student and clean prints', width: 2100, height: 1060 },
      { src: '/assets/work/toner-supplier-photo-to-main-image.webp', alt: 'Supplier photo of a cyan toner cartridge with a colour icon and caption, next to the final clean main image on white', width: 1112, height: 620, caption: 'Supplier photo (left) and the final 1600 px main image.' },
      { src: '/assets/work/toner-photo-qa-bug-and-fix.webp', alt: 'Three versions of a light-coloured cartridge: the supplier photo, our first cleanup that erased part of the bottle, and the fixed image', width: 1656, height: 620, caption: 'Our own bug, caught in review: the first cleanup erased parts of light cartridges. 601 photos were re-made.' },
      { src: '/assets/work/toner-photo-qa-rejects.webp', alt: 'Two rejected supplier photos: a magenta cartridge on a yellow SKU, and a cartridge showing the original manufacturer’s logo', width: 1112, height: 620, caption: 'Supplier errors held back: wrong colour, original-brand logo.' },
      { src: '/assets/work/toner-manufacturer-photo-cutout.webp', alt: 'A manufacturer studio photo of a toner cartridge on grey, and the same cartridge cut out to pure white', width: 1112, height: 620, caption: 'Missing photos filled from the manufacturer’s studio shots, cut out to white.' },
      { src: '/assets/work/toner-cutout-to-lifestyle-scene.webp', alt: 'A listing main photo, the automatic cut-out on a transparent background, and the final home office scene with the cartridge in front of a printer', width: 1920, height: 710, caption: 'Each SKU’s own photo is cut out and placed into one of four reusable scenes.' },
      { src: '/assets/work/toner-compatibility-images-24-skus.webp', alt: 'A grid of 24 compatibility images, each listing the confirmed printer models for one cartridge', width: 1884, height: 1260, caption: 'Compatibility images for 24 of the top 100 SKUs, filled from verified data.' },
      { src: '/assets/work/toner-hp-12a-compatibility-fixed.webp', alt: 'Compatibility image for the HP Q2612A (12A) replacement listing 17 confirmed HP LaserJet models', width: 1000, height: 1000, caption: 'HP 12A after the fix: one wrong model replaced by 17 confirmed HP LaserJet models.' },
      { src: '/assets/work/toner-seller-central-2451-active.webp', alt: 'Seller Central Manage All Inventory showing 2,451 listings, all active and merchant fulfilled', width: 1891, height: 712, caption: 'Seller Central: 2,451 active listings.' },
      { src: '/assets/work/toner-account-health-healthy.webp', alt: 'Seller Central header for M & A Global LLC showing Account Health: Healthy', width: 780, height: 56, caption: 'Account Health: Healthy.' },
      { src: '/assets/work/toner-first-orders-redacted.webp', alt: 'Seller Central orders list with five shipped orders for compatible toner cartridges; customer names and order IDs are blurred', width: 1196, height: 1180, caption: 'First orders, customer names and order IDs blurred: 6 orders worth $426.81 in the first two weeks, the first three days after launch.' },
    ],
  },
  {
    slug: 'ivan-troy-amazon-a-plus',
    metaTitle: 'Ivan Troy: Amazon A+ Content & Brand Story',
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
      { src: '/assets/work/ivan-troy-brand-story-hero.webp', alt: 'Ivan Troy Amazon Brand Story with the line Designed in LA. Made in Italy. above tiles for belts, men’s shoes and women’s accessories', width: 1200, height: 675 },
      { src: '/assets/work/ivan-troy-a-plus-black.webp', alt: 'A+ Content page for the black Ivo belt with annotated buckle, embossing and width callouts, a size chart and a comparison chart', width: 645, height: 2000 },
      { src: '/assets/work/ivan-troy-a-plus-cognac.webp', alt: 'A+ Content page for the cognac Ivo belt using the same module layout with colour-specific photos and copy', width: 645, height: 2000 },
    ],
    liveUrl: 'https://www.amazon.com/dp/B0DQ3P7237', liveLabel: 'See the listing on Amazon',
    sourceUrl: 'https://3s-soft.co.uk/work/ivan-troy-amazon-a-plus',
  },
  {
    slug: 'montique-amazon-store',
    metaTitle: 'MONTIQUE: 895 Amazon Listings with Variations',
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
    metaTitle: 'Stahl-Design-Tebart: Amazon.de A+ Content',
    title: 'A+ Content for WSS door locks and 2D hinges on Amazon.de',
    metaDescription: 'Case study: German A+ Content for Stahl-Design-Tebart’s WSS tubular-frame mortise locks and 2D aluminium door hinges on Amazon.de, in desktop and mobile versions.',
    clientLabel: 'Stahl-Design-Tebart · German door hardware seller', clientRealName: 'Stahl-Design-Tebart', publicNameApproved: true,
    category: 'amazon', services: ['amazon-a-plus-content'],
    summary: 'German A+ module sets for ten WSS products, turning catalogue tables into spec panels and diagrams a buyer can read on a phone.',
    brief:
      'Stahl-Design-Tebart sells WSS door hardware on Amazon.de: stainless-steel tubular-frame mortise locks (Serie 200) and two-part 2D aluminium door hinges. The buyers are fitters and property owners who need the exact variant for their door.',
    challenge:
      'Each lock comes with several backsets (24 to 45 mm), a flat or U-shaped faceplate, and in DIN left or right versions. That detail sat in catalogue tables, which are hard to read on Amazon and harder still on a phone.',
    approach: [
      'Designed A+ module sets in German for ten products, each with a desktop and a mobile version.',
      'Turned the catalogue tables into short spec panels: backset, faceplate type and faceplate length at a glance.',
      'Drew a DIN left and right diagram so buyers can match the lock to the way their door opens.',
      'For the hinges, showed the 2D adjustment (height and side) as a simple diagram beside the product.',
      'Revised a set of modules after the client’s corrections.',
    ],
    deliverables: ['A+ module sets for 10 products, in German', 'Desktop and mobile versions of every module', 'Spec panels built from the WSS catalogue', 'DIN direction and 2D adjustment diagrams'],
    takeaways: [
      'Technical buyers choose faster when the variants are laid out as a panel, not a table.',
      'One clear diagram can answer what several paragraphs of copy could not.',
    ],
    images: [
      { src: '/assets/work/stahl-wss-lock-a-plus-hero.webp', alt: 'German A+ banner for the WSS stainless-steel tubular-frame mortise lock: precise, secure and long-lasting', width: 1446, height: 600 },
      { src: '/assets/work/stahl-wss-lock-features.webp', alt: 'A+ module listing the lock’s key specs with icons: backset 24 to 45 mm, flat or U faceplate, faceplate length 270 or 268 mm', width: 1446, height: 600 },
      { src: '/assets/work/stahl-wss-lock-din-direction.webp', alt: 'A+ module with four door diagrams showing the DIN left and DIN right versions of the WSS mortise lock, next to a technical data panel', width: 1440, height: 600 },
      { src: '/assets/work/stahl-wss-hinge-2d-adjustment.webp', alt: 'A+ module for the WSS 2D aluminium door hinge with a diagram of its height and side adjustment', width: 1446, height: 600 },
      { src: '/assets/work/stahl-wss-hinge-a-plus-hero.webp', alt: 'A+ banner for the two-part WSS 2D aluminium door hinge beside its dimension table', width: 1446, height: 600 },
    ],
  },
  {
    slug: 'party-supplies-amazon-catalogue',
    metaTitle: '145-Product Amazon Party Supplies Catalogue',
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
    metaTitle: 'Tailwater Supply: Brand Site for an Amazon Seller',
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
  {
    slug: 'praktan-sabujian-parishad',
    metaTitle: 'Praktan Sabujian Parishad: Alumni Website & Logo',
    title: 'A new identity and alumni platform for a 50-year-old school',
    metaDescription: 'Case study: a redesigned logo and a Next.js alumni platform with a member directory and event sign-up for Sabuj Shikshayatan’s former students.',
    clientLabel: 'Praktan Sabujian Parishad · school alumni association', clientRealName: 'Praktan Sabujian Parishad', publicNameApproved: true,
    location: 'Sitakunda, Chattogram, Bangladesh',
    category: 'web', services: [],
    summary: 'A redesigned logo for the alumni association of Sabuj Shikshayatan Government High School, and a Bangla-first website where former students find their batchmates and sign up for the Golden Jubilee.',
    brief:
      'Sabuj Shikshayatan Government High School in Sitakunda has taught students since the 1970s, and its former students formed Praktan Sabujian Parishad in 2015. Ahead of the school’s Golden Jubilee in December 2026, the association needed a logo that could carry the celebration and a website to bring alumni back together.',
    challenge:
      'The old logo used a purple ring, a stock landscape photo and a gear, and it did not show the school itself. The association also had no shared place to list members by batch, publish news or take sign-ups for events.',
    approach: [
      'Redrew the emblem in the school’s green with gold rings and laurel leaves, kept the flame, book and the motto “জ্ঞানই শক্তি”, and replaced the stock photo with the real school building.',
      'Moved the school name to the outer ring and the association’s name to a ribbon, so the logo reads clearly at small sizes and on banners.',
      'Built a Bangla-first Next.js website with sign-in, a batch-by-batch member directory, committee pages, news and an events page with registration for the Golden Jubilee.',
    ],
    deliverables: ['Logo redesign in full colour', 'Next.js website, Bangla and English', 'Member directory and sign-up', 'Event registration for the Golden Jubilee'],
    takeaways: [
      'Using the real school building instead of a stock photo gives alumni something they recognise at a glance.',
      'A batch-by-batch directory gives former students a reason to sign up and invite their classmates.',
    ],
    images: [
      { src: '/assets/work/exsabujian-website.webp', alt: 'Praktan Sabujian Parishad home page with the headline Connecting Generations of Sabuj Shikshayatan and a Golden Jubilee registration card', width: 1200, height: 750 },
    ],
    beforeAfter: {
      heading: 'The logo, before and after',
      before: { src: '/assets/work/exsabujian-logo-old.webp', alt: 'Old logo: a purple ring with a stock hillside photo, a gear, an open book and the letters SSHS', width: 750, height: 741 },
      after: { src: '/assets/work/exsabujian-logo-new.webp', alt: 'New logo: a green and gold seal with the real school building, a pen-nib flame, an open book, laurel leaves and a green ribbon with the association’s name', width: 800, height: 800 },
      caption: 'Same symbols, rebuilt around the real school building and the school’s own green.',
    },
    liveUrl: 'https://www.exsabujian.org/', liveLabel: 'Visit exsabujian.org',
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
