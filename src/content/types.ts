/** A verifiable number shown on the site. Every value links to a public source. */
export type ProofItem = {
  id: string
  value: string
  label: string
  sourceUrl: string
  /** YYYY-MM-DD the value was last checked against the source. */
  checkedOn: string
}

export type ServiceSlug =
  | 'ecommerce-product-listing'
  | 'amazon-a-plus-content'
  | 'shopify-store-management'
  | 'lead-generation'
  | 'virtual-assistant'

/** A real buyer review, quoted verbatim (only trimming with "…" is allowed). */
export type Review = {
  id: string
  platform: 'fiverr' | 'upwork'
  user: string
  country?: string
  text: string
  gig: string
  /** Human-readable age as shown by the platform on `checkedOn`, e.g. "2 months ago". */
  date: string
  rating: number
  serviceSlugs: ServiceSlug[]
  sourceUrl: string
  checkedOn: string
}

export type ImageRef = { src: string; alt: string; width: number; height: number }

export type WorkCategory = 'amazon' | 'shopify' | 'multi-marketplace' | 'lead-gen' | 'web'

export type WorkFrontmatter = {
  slug: string
  title: string
  /** What the page shows: the real name only if publicNameApproved, otherwise a description. */
  clientLabel: string
  clientRealName?: string
  publicNameApproved: boolean
  category: WorkCategory
  services: ServiceSlug[]
  summary: string
  deliverables: string[]
  images: ImageRef[]
  sourceUrl?: string
  reviewIds?: string[]
  /** YYYY or YYYY-MM when known from the source; omit when unknown. */
  date?: string
}

export type WorkItem =
  | (WorkFrontmatter & { external?: false })
  | { external: true; slug: string; title: string; clientLabel: string; summary: string; url: string; category: 'web'; image?: ImageRef }

/** Short card data for a service; the full Service type arrives with the service pages. */
export type ServiceCardData = {
  slug: ServiceSlug
  title: string
  summary: string
  deliverables: string[]
  platforms: string[]
}

export type SiteConfig = {
  name: '3s-Soft'
  legalName: string
  url: 'https://3s-soft.com'
  email: string
  phone: string
  phoneHref: string
  whatsapp: string
  bookingUrl: string
  fiverrUrl: string
  upworkUrl: string
  upworkAgencyUrl: string
  wordpressPluginUrl: string
  amazonSpnAplusUrl: string
  amazonSpnCatalogUrl: string
  ukUrl: 'https://3s-soft.co.uk'
  netUrl: 'https://3s-soft.net'
  founder: { name: string; url: string; linkedin: string; github: string }
  socials: { label: string; url: string }[]
  address: { city: 'Chittagong'; country: 'Bangladesh' }
  foundingYear: 2015
}
