import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { HomeHero } from '@/components/kit/HomeHero'
import { CompareSection } from '@/components/kit/CompareSection'
import { ReviewGrid } from '@/components/kit/ReviewGrid'
import { CtaPanel } from '@/components/kit/CtaPanel'
import { ProofBar } from '@/components/ProofBar'
import { ServiceCard } from '@/components/ServiceCard'
import { WorkCard } from '@/components/WorkCard'
import { Faq } from '@/components/Faq'
import { SectionHeading } from '@/components/SectionHeading'
import { reviews } from '@/content/reviews'
import {
  homeMeta, homeProofIds, serviceCards, webTeaser, selectedWork, builtSites, process, homeReviewIds, homeFaq, finalCta,
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
      <HomeHero />

      {/* Proof row directly under the hero */}
      <section aria-label="Track record" className="pt-10 md:pt-14">
        <div className="container-site">
          <ProofBar ids={homeProofIds} />
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services" className="section defer-render">
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

      <CompareSection />

      {/* Case studies */}
      <section aria-labelledby="work" className="section defer-render border-y border-line bg-surface-0">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="work" title="Case studies you can check" intro="Each case study links to the live listing or a public source." />
            <Link className="mb-8 inline-flex min-h-11 items-center gap-1 font-semibold text-green-700 hover:underline md:mb-10" href="/portfolio/">
              See all work <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedWork.map((w) => <WorkCard key={w.slug} item={w} />)}
          </div>
        </div>
      </section>

      {/* Websites from the web studio */}
      <section aria-labelledby="websites" className="section defer-render">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              id="websites"
              title="Websites built by our web studio"
              intro="Store, booking and community sites are handled by our web development studio, 3s-soft.net."
            />
            <a className="mb-8 inline-flex min-h-11 items-center gap-1 font-semibold text-green-700 hover:underline md:mb-10" href={webTeaser.href}>
              More on 3s-soft.net <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {builtSites.map((w) => <WorkCard key={w.slug} item={w} />)}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section aria-labelledby="reviews" className="section defer-render border-y border-line bg-surface-0">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="reviews" title="What sellers say" intro="Copied word for word from Fiverr and Upwork. Each review links to the original." />
            <Link className="mb-8 inline-flex min-h-11 items-center gap-1 font-semibold text-green-700 hover:underline md:mb-10" href="/reviews/">
              All reviews <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ReviewGrid reviews={homeReviews} />
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process" className="section defer-render">
        <div className="container-site">
          <SectionHeading id="process" title="How a project runs" />
          <ol className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface-0 p-6">
                <span className="font-mono text-sm font-medium text-green-700" aria-hidden="true">0{i + 1}</span>
                <h3 className="m-0 text-lg font-bold">{step.title}</h3>
                <p className="m-0 text-ink-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="section defer-render border-t border-line">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_2fr]">
          <SectionHeading id="faq" title="Questions sellers ask" />
          <Faq items={homeFaq} />
        </div>
      </section>

      <CtaPanel id="final-cta" title={finalCta.title} text={finalCta.text} />
    </>
  )
}
