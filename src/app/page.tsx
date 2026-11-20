import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CtaGroup } from '@/components/CtaGroup'
import { ProofBar } from '@/components/ProofBar'
import { ServiceCard } from '@/components/ServiceCard'
import { WorkCard } from '@/components/WorkCard'
import { ReviewCard } from '@/components/ReviewCard'
import { Faq } from '@/components/Faq'
import { SectionHeading } from '@/components/SectionHeading'
import { reviews } from '@/content/reviews'
import {
  homeMeta, hero, homeProofIds, serviceCards, webTeaser, selectedWork, process, homeReviewIds, homeFaq, finalCta,
} from '@/content/home'

export const metadata: Metadata = {
  title: { absolute: homeMeta.title },
  description: homeMeta.description,
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const homeReviews = homeReviewIds.map((id) => reviews.find((r) => r.id === id)!).filter(Boolean)

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="border-b border-line bg-surface-0">
        <div className="container-site grid gap-10 py-12 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <p className="m-0 text-xs font-bold tracking-[0.08em] text-green-700 uppercase">{hero.eyebrow}</p>
            <h1 id="hero-title" className="ds-display m-0 text-[40px] leading-[44px] font-extrabold tracking-[-0.02em] md:text-[56px] md:leading-[60px]">
              {hero.title}
            </h1>
            <p className="prose-measure m-0 text-lg leading-7 text-ink-muted">{hero.sub}</p>
            <CtaGroup showMarketplaces />
          </div>
          <ProofBar ids={homeProofIds} />
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services" className="section">
        <div className="container-site">
          <SectionHeading id="services" title="What we handle for sellers" intro="Hand us one job or the whole catalogue." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((s) => <ServiceCard key={s.slug} service={s} />)}
            <a className="ds-service justify-between border-dashed" href={webTeaser.href}>
              <div className="flex flex-col gap-3">
                <h3 className="ds-service__title">{webTeaser.title}</h3>
                <p className="ds-service__text">{webTeaser.text}</p>
              </div>
              <span className="ds-service__more inline-flex items-center gap-1">Visit 3s-soft.net <ArrowUpRight size={18} aria-hidden="true" /></span>
            </a>
          </div>
        </div>
      </section>

      {/* Work */}
      <section aria-labelledby="work" className="section border-y border-line bg-surface-0">
        <div className="container-site">
          <SectionHeading id="work" title="Recent work you can check" intro="Each case study links to the live listing or a public source." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedWork.map((w) => <WorkCard key={w.slug} item={w} />)}
          </div>
          <p className="mt-8"><Link className="ds-btn ds-btn--secondary" href="/portfolio/">See all work</Link></p>
        </div>
      </section>

      {/* Reviews */}
      <section aria-labelledby="reviews" className="section">
        <div className="container-site">
          <SectionHeading id="reviews" title="What sellers say" intro="Copied word for word from Fiverr and Upwork. Each review links to the original." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homeReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
          <p className="mt-8"><Link className="ds-btn ds-btn--secondary" href="/reviews/">Read more reviews</Link></p>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process" className="section border-y border-line bg-surface-0">
        <div className="container-site">
          <SectionHeading id="process" title="How a project runs" />
          <ol className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3">
                <span className="ds-display flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-lg font-extrabold text-green-700" aria-hidden="true">{i + 1}</span>
                <h3 className="m-0 text-lg font-bold">{step.title}</h3>
                <p className="m-0 text-ink-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="section">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_2fr]">
          <SectionHeading id="faq" title="Questions sellers ask" />
          <Faq items={homeFaq} />
        </div>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="final-cta" className="section bg-green-100">
        <div className="container-site flex flex-col gap-6">
          <h2 id="final-cta" className="ds-display m-0 max-w-[20ch] text-[32px] leading-[38px] font-extrabold md:text-[40px] md:leading-[44px]">{finalCta.title}</h2>
          <p className="prose-measure m-0 text-lg">{finalCta.text}</p>
          <CtaGroup showMarketplaces />
        </div>
      </section>
    </>
  )
}
