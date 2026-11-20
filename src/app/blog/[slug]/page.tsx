import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { posts } from '@/content/posts'
import { services } from '@/content/services'
import { team } from '@/content/team'
import { formatDate } from '@/lib/format'
import { PageHero } from '@/components/kit/PageHero'
import { CtaPanel } from '@/components/kit/CtaPanel'
import { InlineText } from '@/components/InlineText'
import { JsonLd } from '@/components/JsonLd'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = posts.find((x) => x.slug === slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: { type: 'article', publishedTime: p.published, modifiedTime: p.updated },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const p = posts.find((x) => x.slug === slug)
  if (!p) notFound()
  const reviewer = team.find((t) => t.name === p.reviewedBy)
  const related = services.filter((s) => p.services.includes(s.slug))

  return (
    <article>
      <PageHero
        id="post-title"
        eyebrow="Guide"
        title={p.title}
        intro={p.description}
        crumbs={[{ name: 'Guides', path: '/blogs/' }, { name: p.title, path: `/blog/${p.slug}/` }]}
      >
        <p className="m-0 text-sm text-ink-muted">
          By the 3s-Soft team · reviewed by{' '}
          <Link className="font-semibold text-ink hover:text-green-700" href="/about-us/">{reviewer?.name}</Link>
          {' '}· updated <time dateTime={p.updated}>{formatDate(p.updated)}</time>
        </p>
      </PageHero>

      <div className="container-site section grid gap-12 lg:grid-cols-[minmax(0,68ch)_1fr]">
        <div className="flex flex-col gap-10 text-lg leading-8">
          {p.sections.map((s) => {
            const id = s.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
            return (
            <section key={s.heading} aria-labelledby={id}>
              <h2 id={id} className="ds-display mb-3 text-[26px] leading-8 font-bold">{s.heading}</h2>
              {s.paragraphs.map((para) => <p key={para} className="mb-4"><InlineText text={para} /></p>)}
              {s.list && (
                <ul className="mb-4 flex flex-col gap-2 pl-5">
                  {s.list.map((li) => <li key={li}><InlineText text={li} /></li>)}
                </ul>
              )}
            </section>
            )
          })}
        </div>
        <aside aria-label="Related services" className="flex flex-col gap-4 self-start rounded-[var(--radius-lg)] border border-line bg-surface-0 p-6 lg:sticky lg:top-24">
          <h2 className="m-0 text-lg font-bold">Related services</h2>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {related.map((s) => (
              <li key={s.slug}><Link className="inline-flex min-h-11 items-center font-semibold text-green-700 hover:text-green-800" href={`/services/${s.slug}/`}>{s.title} →</Link></li>
            ))}
          </ul>
          <Link className="ds-btn ds-btn--primary" href="/free-listing-audit/">Get a free audit</Link>
        </aside>
      </div>

      <CtaPanel id="post-cta" title="Want us to do this for your store?" text="Send five product links and get a free audit with the fixes that matter most." />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.description,
          datePublished: p.published,
          dateModified: p.updated,
          mainEntityOfPage: `https://3s-soft.com/blog/${p.slug}/`,
          author: { '@type': 'Organization', name: '3s-Soft', url: 'https://3s-soft.com' },
          reviewedBy: { '@type': 'Person', name: p.reviewedBy },
          publisher: { '@type': 'Organization', name: '3s-Soft', logo: { '@type': 'ImageObject', url: 'https://3s-soft.com/assets/brand/3s-soft-icon-512.png' } },
        }}
      />
    </article>
  )
}
