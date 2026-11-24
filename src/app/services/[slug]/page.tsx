import type { Metadata } from 'next'
import { ogImage } from '@/lib/og'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { posts } from '@/content/posts'
import { services, getService } from '@/content/services'
import { reviewsFor } from '@/content/reviews'
import type { ServiceSlug } from '@/content/types'
import { workFor } from '@/lib/work'
import { CtaGroup } from '@/components/CtaGroup'
import { ProofBar } from '@/components/ProofBar'
import { ReviewCard } from '@/components/ReviewCard'
import { WorkCard } from '@/components/WorkCard'
import { Faq } from '@/components/Faq'
import { JsonLd } from '@/components/JsonLd'
import { serviceJsonLd } from '@/lib/seo'
import { SectionHeading } from '@/components/SectionHeading'
import { PageHero } from '@/components/kit/PageHero'
import { CtaPanel } from '@/components/kit/CtaPanel'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

function find(slug: string) {
  return services.find((s) => s.slug === slug) ? getService(slug as ServiceSlug) : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = find((await params).slug)
  if (!s) return {}
  return {
    title: { absolute: s.metaTitle },
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}/` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: `/services/${s.slug}/`, images: [ogImage('service', s.slug, s.h1)] },
    twitter: { card: 'summary_large_image', images: [ogImage('service', s.slug, s.h1).url] },
  }
}

export default async function ServicePage({ params }: Props) {
  const s = find((await params).slug)
  if (!s) notFound()
  const reviews = reviewsFor(s.slug).slice(0, 3)
  const work = workFor(s.slug)
  const guides = posts.filter((p) => p.services.includes(s.slug))

  return (
    <>
      <PageHero
        id="service-title"
        eyebrow={s.shortTitle}
        title={s.h1}
        intro={s.summary}
        crumbs={[{ name: 'Services', path: '/services/' }, { name: s.title, path: `/services/${s.slug}/` }]}
      >
        <CtaGroup showMarketplaces />
      </PageHero>

      <section aria-labelledby="problems" className="section">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="problems" title="Sound familiar?" />
            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {s.problems.map((p) => (
                <li key={p} className="rounded-[var(--radius-lg)] border border-line bg-surface-0 p-5 text-lg">{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading id="deliverables" title="What you get" />
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-lg">
                  <CheckCircle2 className="mt-1 shrink-0 text-green-700" size={22} aria-hidden="true" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Platforms">
              {s.platforms.map((p) => <span key={p} className="ds-chip" translate="no">{p}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="proof" className="section border-y border-line bg-surface-0">
        <div className="container-site">
          <SectionHeading id="proof" title="Track record you can check" intro="Every number links to the public profile it comes from." />
          <ProofBar ids={s.proofIds} />
          {reviews.length > 0 && (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
            </div>
          )}
        </div>
      </section>

      {work.length > 0 && (
        <section aria-labelledby="related-work" className="section">
          <div className="container-site">
            <SectionHeading id="related-work" title="Related work" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {work.map((w) => <WorkCard key={w.slug} item={w} />)}
            </div>
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section aria-labelledby="service-guides" className="section border-t border-line">
          <div className="container-site">
            <SectionHeading id="service-guides" title="Guides for this service" intro="Free how-tos written from our own client work." />
            <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <li key={g.slug} className="rounded-[var(--radius-lg)] border border-line bg-surface-0 p-5">
                  <Link className="text-lg font-bold text-ink hover:text-green-700" href={`/blog/${g.slug}/`}>{g.title}</Link>
                  <p className="mt-2 mb-0 text-ink-muted">{g.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="service-faq" className="section border-t border-line">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_2fr]">
          <SectionHeading id="service-faq" title={`${s.shortTitle}: common questions`} />
          <Faq items={s.faq} />
        </div>
      </section>

      <JsonLd data={serviceJsonLd(s)} />

      <CtaPanel id="service-cta" title="Tell us what you sell" text="Send a few product links or a spreadsheet and get a fixed quote before any work starts." />
    </>
  )
}
