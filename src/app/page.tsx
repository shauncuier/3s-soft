import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CtaGroup } from '@/components/CtaGroup'
import { HeroWow } from '@/components/wow/HeroWow'
import { CompareSection } from '@/components/wow/CompareSection'
import { Marquee } from '@/components/wow/Marquee'
import { WorkWall } from '@/components/wow/WorkWall'
import { MotionStarter } from '@/components/wow/MotionStarter'
import { ServiceCard } from '@/components/ServiceCard'
import { WorkCard } from '@/components/WorkCard'
import { ReviewCard } from '@/components/ReviewCard'
import { Faq } from '@/components/Faq'
import { SectionHeading } from '@/components/SectionHeading'
import { reviews } from '@/content/reviews'
import { site, whatsappLink } from '@/content/site'
import {
  homeMeta, serviceCards, webTeaser, selectedWork, builtSites, process, homeReviewIds, homeFaq, finalCta,
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
      <MotionStarter />
      <HeroWow />
      <CompareSection />
      <Marquee />

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

      {/* Work wall + case studies */}
      <WorkWall />
      <section aria-labelledby="work" className="section border-y border-line bg-surface-0">
        <div className="container-site">
          <SectionHeading id="work" title="Case studies you can check" intro="Each case study links to the live listing or a public source." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedWork.map((w) => <WorkCard key={w.slug} item={w} />)}
          </div>
          <p className="mt-8"><Link className="ds-btn ds-btn--secondary rounded-full" href="/portfolio/">See all work</Link></p>
        </div>
      </section>

      {/* Websites from the web studio */}
      <section aria-labelledby="websites" className="section">
        <div className="container-site">
          <SectionHeading
            id="websites"
            title="Websites built by our web studio"
            intro="Store, booking and community sites are handled by our web development studio, 3s-soft.net. Three recent client sites:"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {builtSites.map((w) => <WorkCard key={w.slug} item={w} />)}
          </div>
          <p className="mt-8">
            <a className="ds-btn ds-btn--secondary" href={webTeaser.href}>
              More web work on 3s-soft.net <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section aria-labelledby="reviews" className="section border-t border-line">
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

      {/* Final CTA (inverted panel) */}
      <section aria-labelledby="final-cta" className="section">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[40px] bg-ink px-6 py-14 text-surface-0 md:px-16 md:py-20">
            <svg aria-hidden="true" viewBox="0 0 600 600" className="pointer-events-none absolute -right-24 -bottom-40 hidden w-[520px] md:block" fill="none">
              <path d="M40 300 A 260 260 0 0 1 560 300" stroke="var(--brand-green)" strokeWidth="44" strokeLinecap="round" />
              <path d="M120 420 A 180 180 0 0 1 480 420" stroke="var(--surface-0)" strokeOpacity="0.18" strokeWidth="44" strokeLinecap="round" />
            </svg>
            <div className="relative flex max-w-2xl flex-col gap-6">
              <h2 id="final-cta" className="hero-display m-0 max-w-[18ch] !text-[36px] md:!text-[54px]">{finalCta.title}</h2>
              <p className="m-0 text-lg opacity-85">{finalCta.text}</p>
              <div className="flex flex-wrap gap-3">
                <Link className="ds-btn ds-btn--primary rounded-full" href="/free-listing-audit/">Get a free 5-product audit <ArrowUpRight size={18} aria-hidden="true" /></Link>
                <a className="ds-btn ds-btn--secondary rounded-full" href={whatsappLink()} target="_blank" rel="noopener">WhatsApp us</a>
              </div>
              <p className="m-0 text-sm opacity-85">
                Also available on{' '}
                <a className="font-semibold underline underline-offset-2" href={site.fiverrUrl} target="_blank" rel="noopener" translate="no">Fiverr</a> &amp;{' '}
                <a className="font-semibold underline underline-offset-2" href={site.upworkAgencyUrl} target="_blank" rel="noopener" translate="no">Upwork</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
