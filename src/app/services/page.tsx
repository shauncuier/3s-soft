import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { services } from '@/content/services'
import { serviceCards, webTeaser } from '@/content/home'
import { ServiceCard } from '@/components/ServiceCard'
import { CtaGroup } from '@/components/CtaGroup'
import { Breadcrumbs } from '@/components/Breadcrumbs'

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
      <section aria-labelledby="services-title" className="border-b border-line bg-surface-0">
        <div className="container-site flex flex-col gap-6 py-10 md:py-16">
          <Breadcrumbs items={[{ name: 'Services', path: '/services/' }]} />
          <h1 id="services-title" className="ds-display m-0 text-[36px] leading-[42px] font-extrabold md:text-[48px] md:leading-[52px]">
            eCommerce services for marketplace sellers
          </h1>
          <p className="prose-measure m-0 text-lg text-ink-muted">
            Five services for sellers on Amazon, Walmart, Shopify, Etsy and eBay. Pick one job or combine them into a monthly plan.
          </p>
          <CtaGroup />
        </div>
      </section>
      <section aria-label="All services" className="section">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => <ServiceCard key={c.slug} service={c} />)}
          <a className="ds-service justify-between border-dashed" href={webTeaser.href}>
            <div className="flex flex-col gap-3">
              <h2 className="ds-service__title">{webTeaser.title}</h2>
              <p className="ds-service__text">{webTeaser.text}</p>
            </div>
            <span className="ds-service__more inline-flex items-center gap-1">Visit 3s-soft.net <ArrowUpRight size={18} aria-hidden="true" /></span>
          </a>
        </div>
      </section>
    </>
  )
}
