import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { services } from '@/content/services'
import { serviceCards, webTeaser } from '@/content/home'
import { reviews } from '@/content/reviews'
import { ServiceCard } from '@/components/ServiceCard'
import { CtaGroup } from '@/components/CtaGroup'
import { PageHero } from '@/components/kit/PageHero'
import { ReviewGrid } from '@/components/kit/ReviewGrid'
import { CtaPanel } from '@/components/kit/CtaPanel'
import { SectionHeading } from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: { absolute: 'eCommerce Listing & Marketplace Services | 3s-Soft' },
  description:
    'Amazon listings, A+ Content, Shopify product management, B2B lead generation and catalogue support for online sellers. Fixed quotes before work starts.',
  alternates: { canonical: '/services/' },
}

export default function ServicesPage() {
  const cards = services.map((s) => serviceCards.find((c) => c.slug === s.slug)!).filter(Boolean)
  return (
    <>
      <PageHero
        eyebrow="Five services, one team"
        title="eCommerce services for marketplace sellers"
        intro="Pick one job or combine them into a monthly plan. Every service runs on the same promise: a fixed quote and a delivery date before work starts."
        crumbs={[{ name: 'Services', path: '/services/' }]}
      >
        <CtaGroup showMarketplaces />
      </PageHero>

      <section aria-label="All services" className="section">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => <ServiceCard key={c.slug} service={c} headingLevel={2} />)}
          <a className="ds-service justify-between border-dashed" href={webTeaser.href}>
            <div className="flex flex-col gap-3">
              <h2 className="ds-service__title">{webTeaser.title}</h2>
              <p className="ds-service__text">{webTeaser.text}</p>
            </div>
            <span className="ds-service__more inline-flex items-center gap-1">Visit 3s-soft.net <ArrowUpRight size={18} aria-hidden="true" /></span>
          </a>
        </div>
      </section>

      <section aria-labelledby="services-reviews" className="section border-y border-line bg-surface-0">
        <div className="container-site">
          <SectionHeading id="services-reviews" title="What sellers say" intro="Copied word for word from Fiverr and Upwork. Each review links to the original." />
          <ReviewGrid reviews={reviews.slice(0, 6)} />
        </div>
      </section>

      <CtaPanel title="Not sure which service you need?" text="Send us five products. The free audit shows what to fix first, and you keep the notes whether or not you hire us." />
    </>
  )
}
