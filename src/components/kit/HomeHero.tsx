import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Star } from 'lucide-react'
import { CtaGroup } from '@/components/CtaGroup'
import { site } from '@/content/site'
import { getProof } from '@/content/proof'

const marketplaces = ['Amazon', 'Walmart', 'Shopify', 'Etsy', 'eBay']

/** Homepage hero: copy and actions on the left, a real case-study screenshot on the right. */
export function HomeHero() {
  const rating = getProof('fiverr-rating').value
  const count = getProof('fiverr-reviews').value
  const since = getProof('fiverr-since').value
  const jss = getProof('upwork-jss').value

  return (
    <section aria-labelledby="hero-title" className="border-b border-line bg-surface-0 pt-10 pb-14 md:pt-16 md:pb-20">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <div className="motion-rise flex min-w-0 flex-col gap-6">
          <a
            className="inline-flex min-h-9 items-center gap-2 self-start rounded-full border border-line bg-surface-100 px-3.5 py-1 text-sm font-semibold hover:border-green-700"
            href={site.amazonSpnAplusUrl}
            target="_blank"
            rel="noopener"
          >
            <BadgeCheck size={16} className="text-green-700" aria-hidden="true" /> Amazon SPN provider · A+ Content &amp; Cataloguing ↗
          </a>

          <h1 id="hero-title" className="page-title home-title m-0">
            Amazon, Shopify &amp; marketplace listings, done right
          </h1>

          <p className="prose-measure m-0 text-lg leading-8 text-ink-muted md:text-xl md:leading-9">
            We write, upload and maintain product listings for{' '}
            <span translate="no">{marketplaces.slice(0, -1).join(', ')}</span> and <span translate="no">{marketplaces.at(-1)}</span>{' '}
            sellers. Fixed quote and delivery date before work starts.
          </p>

          <CtaGroup />

          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0 text-sm text-ink-muted" aria-label="Track record">
            <li>
              <a className="inline-flex min-h-11 items-center gap-1.5 hover:text-green-700" href={site.fiverrUrl} target="_blank" rel="noopener">
                <Star size={16} className="fill-[var(--star)] text-[var(--star)]" aria-hidden="true" />
                <strong className="text-ink">{rating}</strong> from {count} Fiverr reviews ↗
              </a>
            </li>
            <li>
              <a className="inline-flex min-h-11 items-center gap-1 hover:text-green-700" href={site.upworkUrl} target="_blank" rel="noopener">
                Upwork Top Rated, <strong className="text-ink">{jss}</strong> Job Success ↗
              </a>
            </li>
            <li className="inline-flex min-h-11 items-center">Selling online since {since}</li>
          </ul>
        </div>

        <figure className="motion-rise m-0 flex min-w-0 flex-col gap-3" style={{ ['--delay' as string]: '120ms' }}>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-200 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-1.5 border-b border-line bg-surface-100 px-4 py-2.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--line)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--line)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--line)]" />
              <span className="ml-3 truncate font-mono text-xs text-ink-muted">amazon.com · Ivan Troy brand store</span>
            </div>
            <Image
              src="/assets/work/ivan-troy-brand-story-hero.webp"
              alt="Ivan Troy Amazon Brand Story we designed, with the line Designed in LA. Made in Italy. above tiles for belts, men’s shoes and women’s accessories"
              width={1200}
              height={675}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-2 text-sm text-ink-muted">
            <span>Amazon Brand Story and A+ Content for a six-colour belt range.</span>
            <Link className="inline-flex min-h-11 items-center gap-1 font-semibold text-green-700 hover:underline" href="/portfolio/ivan-troy-amazon-a-plus/">
              Read the case study <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
