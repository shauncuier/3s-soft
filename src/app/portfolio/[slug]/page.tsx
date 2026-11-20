import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { caseStudies } from '@/content/portfolio'
import { reviews } from '@/content/reviews'
import { services } from '@/content/services'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaGroup } from '@/components/CtaGroup'
import { ReviewCard } from '@/components/ReviewCard'
import { WorkCard } from '@/components/WorkCard'
import { JsonLd } from '@/components/JsonLd'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = caseStudies.find((x) => x.slug === slug)
  if (!c) return {}
  const name = c.publicNameApproved ? c.clientLabel.split(' · ')[0] : 'Case study'
  return {
    title: `${name}: ${c.title}`,
    description: c.metaDescription,
    alternates: { canonical: `/portfolio/${c.slug}/` },
    openGraph: { type: 'article', images: c.images[0] ? [{ url: c.images[0].src, width: c.images[0].width, height: c.images[0].height, alt: c.images[0].alt }] : undefined },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const c = caseStudies.find((x) => x.slug === slug)
  if (!c) notFound()
  const related = caseStudies.filter((x) => x.slug !== c.slug && x.services.some((s) => c.services.includes(s))).slice(0, 2)
  const relatedReviews = reviews.filter((r) => r.serviceSlugs.some((s) => c.services.includes(s))).slice(0, 2)
  const serviceLinks = services.filter((s) => c.services.includes(s.slug))
  const [hero, ...gallery] = c.images

  return (
    <article>
      <header className="border-b border-line bg-surface-0">
        <div className="container-site flex flex-col gap-6 py-10 md:py-16">
          <Breadcrumbs items={[{ name: 'Work', path: '/portfolio/' }, { name: c.clientLabel.split(' · ')[0], path: `/portfolio/${c.slug}/` }]} />
          <p className="m-0 text-sm font-semibold text-green-700">{c.clientLabel}{c.location ? ` · ${c.location}` : ''}</p>
          <h1 className="ds-display m-0 max-w-[24ch] text-[34px] leading-[40px] font-extrabold md:text-[44px] md:leading-[50px]">{c.title}</h1>
          <p className="prose-measure m-0 text-lg text-ink-muted">{c.summary}</p>
          <div className="flex flex-wrap gap-3">
            {c.liveUrl && (
              <a className="ds-btn ds-btn--secondary" href={c.liveUrl} target="_blank" rel="noopener">
                {c.liveLabel ?? 'See it live'} <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
            {serviceLinks.map((s) => (
              <Link key={s.slug} className="ds-chip" href={`/services/${s.slug}/`}>{s.title}</Link>
            ))}
          </div>
        </div>
      </header>

      {hero && (
        <div className="container-site pt-10">
          <Image src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} priority className="h-auto w-full rounded-[var(--radius-lg)] border border-line" />
        </div>
      )}

      <div className="container-site section grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-10">
          <section aria-labelledby="brief">
            <h2 id="brief" className="ds-display mb-3 text-[26px] font-bold">The brief</h2>
            <p className="prose-measure m-0 text-lg">{c.brief}</p>
          </section>
          <section aria-labelledby="challenge">
            <h2 id="challenge" className="ds-display mb-3 text-[26px] font-bold">What needed to change</h2>
            <p className="prose-measure m-0 text-lg">{c.challenge}</p>
          </section>
          <section aria-labelledby="approach">
            <h2 id="approach" className="ds-display mb-3 text-[26px] font-bold">What we did</h2>
            <ul className="prose-measure m-0 flex flex-col gap-3 pl-5 text-lg">
              {c.approach.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </section>
          {c.beforeAfter && (
            <section aria-labelledby="before-after">
              <h2 id="before-after" className="ds-display mb-4 text-[26px] font-bold">{c.beforeAfter.heading}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {([['Before', c.beforeAfter.before], ['After', c.beforeAfter.after]] as const).map(([label, img]) => (
                  <figure key={label} className={`m-0 flex flex-col gap-3 rounded-[var(--radius-lg)] border p-4 ${label === 'After' ? 'border-green-700 bg-surface-0' : 'border-line bg-surface-200'}`}>
                    <figcaption className={`self-start rounded-full px-3 py-1 text-xs font-bold tracking-[0.08em] uppercase ${label === 'After' ? 'bg-green-100 text-green-800' : 'bg-surface-0 text-ink-muted'}`}>{label}</figcaption>
                    <div className="rounded-[var(--radius-md)] bg-white p-4">
                      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" className="mx-auto h-auto w-full max-w-[360px]" />
                    </div>
                  </figure>
                ))}
              </div>
              <p className="mt-3 mb-0 text-ink-muted">{c.beforeAfter.caption}</p>
            </section>
          )}
          {gallery.length > 0 && (
            <section aria-labelledby="gallery">
              <h2 id="gallery" className="ds-display mb-4 text-[26px] font-bold">The work</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {gallery.map((g) => (
                  <div key={g.src} className="max-h-[720px] overflow-y-auto rounded-[var(--radius-lg)] border border-line bg-surface-0" tabIndex={0} aria-label={g.alt}>
                    <Image src={g.src} alt={g.alt} width={g.width} height={g.height} loading="lazy" className="h-auto w-full" />
                  </div>
                ))}
              </div>
            </section>
          )}
          <section aria-labelledby="takeaways">
            <h2 id="takeaways" className="ds-display mb-3 text-[26px] font-bold">What this shows</h2>
            <ul className="prose-measure m-0 flex flex-col gap-3 pl-5 text-lg">
              {c.takeaways.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </section>
        </div>

        <aside className="flex flex-col gap-6" aria-label="Project details">
          <div className="rounded-[var(--radius-lg)] border border-line bg-surface-0 p-6">
            <h2 className="mb-3 text-lg font-bold">Deliverables</h2>
            <ul className="m-0 flex flex-col gap-2 pl-5">
              {c.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
            {c.sourceUrl && (
              <p className="mt-4 mb-0 text-sm text-ink-muted">
                Source: <a className="font-semibold text-green-700 underline underline-offset-2" href={c.sourceUrl} target="_blank" rel="noopener">{new URL(c.sourceUrl).hostname.replace('www.', '')} ↗</a>
              </p>
            )}
          </div>
          {relatedReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="section border-t border-line">
          <div className="container-site">
            <h2 id="related" className="ds-display mb-6 text-[28px] font-bold">Related work</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((r) => <WorkCard key={r.slug} item={r} />)}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="cs-cta" className="section bg-green-100">
        <div className="container-site flex flex-col gap-6">
          <h2 id="cs-cta" className="ds-display m-0 text-[32px] leading-[38px] font-extrabold">Need something like this?</h2>
          <CtaGroup showMarketplaces />
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: c.title,
          description: c.metaDescription,
          url: `https://3s-soft.com/portfolio/${c.slug}/`,
          creator: { '@type': 'Organization', name: '3s-Soft', url: 'https://3s-soft.com' },
          ...(hero ? { image: `https://3s-soft.com${hero.src}` } : {}),
        }}
      />
    </article>
  )
}
