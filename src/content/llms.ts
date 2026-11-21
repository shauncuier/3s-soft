import { getProof } from './proof'
import { site } from './site'

/** public/llms.txt, built from proof.ts so the numbers never drift. Written by scripts/build-llms.ts. */
export function renderLlms(): string {
  const v = (id: string) => getProof(id).value
  const checked = getProof('fiverr-reviews').checkedOn
  return `# 3s-Soft

> 3s-Soft is an eCommerce operations team in Chittagong, Bangladesh, founded by Jashedul Islam Shaun. It writes, uploads and maintains product listings for sellers on Amazon, Walmart, Shopify, Etsy and eBay, designs Amazon A+ Content and Brand Story modules, builds B2B lead lists and provides ongoing catalogue support. Selling on Fiverr since ${v('fiverr-since')}.

Verifiable facts (checked ${checked}):
- Fiverr: ${v('fiverr-rating')} rating from ${v('fiverr-reviews')} reviews (${v('fiverr-five-star')} five-star): ${site.fiverrUrl}
- Upwork: ${v('upwork-badge')}, ${v('upwork-jss')} Job Success, ${v('upwork-jobs')} jobs completed: ${site.upworkUrl}
- Listed on Amazon's Service Provider Network for A+ Content (Enhanced Brand Content) and Cataloguing
- Published WordPress.org plugin: ${site.wordpressPluginUrl}
- UK arm: ${site.ukUrl} · Web development studio: ${site.netUrl}

## Services
- [Amazon listing optimization and product upload](https://3s-soft.com/services/ecommerce-product-listing/): keyword research, titles, bullets, backend terms, variations, bulk flat-file uploads for Amazon, Walmart, Etsy, eBay and Shopify
- [Amazon A+ Content and Brand Story design](https://3s-soft.com/services/amazon-a-plus-content/)
- [Shopify product upload and store management](https://3s-soft.com/services/shopify-store-management/)
- [B2B lead generation and prospect lists](https://3s-soft.com/services/lead-generation/)
- [eCommerce virtual assistant and catalogue management](https://3s-soft.com/services/virtual-assistant/)
- [Free 5-product listing audit](https://3s-soft.com/free-listing-audit/)

## Case studies
- [Ivan Troy: Brand Story and six A+ Content pages for a belt range](https://3s-soft.com/portfolio/ivan-troy-amazon-a-plus/)
- [MONTIQUE: 895 Amazon listings with variations](https://3s-soft.com/portfolio/montique-amazon-store/)
- [Stahl-Design-Tebart: German A+ Content for WSS door locks and hinges on Amazon.de](https://3s-soft.com/portfolio/stahl-design-tebart-amazon-listing-optimization/)
- [Tailwater Supply: brand site for an Amazon and Walmart seller](https://3s-soft.com/portfolio/tailwater-supply/)

## Company
- [About](https://3s-soft.com/about-us/) · [Team](https://3s-soft.com/team/) · [Reviews](https://3s-soft.com/reviews/) · [Contact](https://3s-soft.com/contact/)
- Email: ${site.email} · WhatsApp: ${site.phone}
`
}
