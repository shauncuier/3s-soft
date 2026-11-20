import type { Metadata } from 'next'
import { Star } from 'lucide-react'
import { reviews, upworkJobs } from '@/content/reviews'
import { services } from '@/content/services'
import { fiverrBreakdown, getProof } from '@/content/proof'
import { site } from '@/content/site'
import { formatCheckedOn } from '@/lib/format'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ReviewCard } from '@/components/ReviewCard'
import { ProofBar } from '@/components/ProofBar'
import { CtaGroup } from '@/components/CtaGroup'

export const metadata: Metadata = {
  title: { absolute: '3s-Soft Reviews on Fiverr and Upwork | 3s-Soft' },
  description: 'Real buyer reviews of 3s-Soft from Fiverr (5.0 from 465 reviews) and Upwork (Top Rated, 100% Job Success), copied word for word with links.',
  alternates: { canonical: '/reviews/' },
}

export default function ReviewsPage() {
  const total = Object.values(fiverrBreakdown).reduce((a, b) => a + b, 0)
  const checked = formatCheckedOn(getProof('fiverr-reviews').checkedOn)
  const fiverr = reviews.filter((r) => r.platform === 'fiverr')
  const upwork = reviews.filter((r) => r.platform === 'upwork')

  return (
    <>
      <section aria-labelledby="reviews-title" className="border-b border-line bg-surface-0">
        <div className="container-site flex flex-col gap-6 py-10 md:py-16">
          <Breadcrumbs items={[{ name: 'Reviews', path: '/reviews/' }]} />
          <h1 id="reviews-title" className="hero-display m-0 !text-[40px] md:!text-[60px]">What buyers say about 3s-Soft</h1>
          <p className="prose-measure m-0 text-lg text-ink-muted">
            Reviews from two marketplaces, copied word for word, each linked to the original. Anyone can check the full history on our public profiles.
          </p>
          <nav aria-label="Jump to platform" className="flex flex-wrap gap-3">
            <a href="#fiverr" className="ds-btn ds-btn--secondary rounded-full"><Star size={18} className="fill-[var(--star)] text-[var(--star)]" aria-hidden="true" /> Fiverr · 5.0 from 465</a>
            <a href="#upwork" className="ds-btn ds-btn--secondary rounded-full">Upwork · Top Rated, 100% Job Success</a>
          </nav>
        </div>
      </section>

      {/* Fiverr */}
      <section aria-labelledby="fiverr" className="section">
        <div className="container-site flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="m-0 font-mono text-xs font-medium tracking-[0.12em] text-green-700 uppercase">On Fiverr since 2015</p>
            <h2 id="fiverr" className="ds-display m-0 text-[32px] leading-[38px] font-extrabold md:text-[40px]">Fiverr reviews</h2>
            <ProofBar ids={['fiverr-rating', 'fiverr-reviews', 'fiverr-five-star', 'fiverr-since']} label="Fiverr track record" />
          </div>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <h3 className="mb-4 text-xl font-bold">Rating breakdown</h3>
              <table className="w-full max-w-sm border-collapse text-left">
                <caption className="mb-2 text-left text-sm text-ink-muted">{total} reviews on Fiverr, checked {checked}</caption>
                <thead><tr><th scope="col" className="py-2">Stars</th><th scope="col" className="py-2 text-right">Reviews</th></tr></thead>
                <tbody className="tabular-nums">
                  {([5, 4, 3, 2, 1] as const).map((s) => (
                    <tr key={s} className="border-t border-line">
                      <th scope="row" className="py-2 font-semibold">{s} star{s > 1 ? 's' : ''}</th>
                      <td className="py-2 text-right">{fiverrBreakdown[s]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm">
                <a className="inline-flex min-h-11 items-center font-semibold text-green-700 underline underline-offset-2" href={site.fiverrUrl} target="_blank" rel="noopener">Read all {total} reviews on Fiverr ↗</a>
              </p>
            </div>
            <div className="flex flex-col gap-10">
              {services.map((s) => {
                const list = fiverr.filter((r) => r.serviceSlugs[0] === s.slug)
                if (list.length === 0) return null
                return (
                  <div key={s.slug}>
                    <h3 className="ds-display mb-4 text-[22px] font-bold">{s.title}</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {list.map((r) => <ReviewCard key={r.id} review={r} />)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Upwork */}
      <section aria-labelledby="upwork" className="section border-t border-line bg-surface-0">
        <div className="container-site flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="m-0 font-mono text-xs font-medium tracking-[0.12em] text-green-700 uppercase">Top Rated on Upwork</p>
            <h2 id="upwork" className="ds-display m-0 text-[32px] leading-[38px] font-extrabold md:text-[40px]">Upwork reviews</h2>
            <ProofBar ids={['upwork-badge', 'upwork-jss', 'upwork-jobs']} label="Upwork track record" />
          </div>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-6">
              <h3 className="m-0 text-xl font-bold">Client feedback</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {upwork.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>
              <p className="m-0 text-sm text-ink-muted">
                Upwork shows full feedback text publicly for some jobs only.{' '}
                <a className="font-semibold text-green-700 underline underline-offset-2" href={site.upworkUrl} target="_blank" rel="noopener">See the full work history on Upwork ↗</a>
              </p>
            </div>
            <div>
              <h3 className="mt-0 mb-4 text-xl font-bold">Recent 5-star jobs</h3>
              <ul className="m-0 flex list-none flex-col p-0">
                {upworkJobs.map((j) => (
                  <li key={j.title} className="flex items-start justify-between gap-4 border-t border-line py-3">
                    <span>
                      <span className="block font-semibold">{j.title}</span>
                      <span className="text-sm text-ink-muted">{j.period}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1 font-bold tabular-nums" aria-label={`Rated ${j.rating.toFixed(1)} out of 5`}>
                      <Star size={16} className="fill-[var(--star)] text-[var(--star)]" aria-hidden="true" /> {j.rating.toFixed(1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="reviews-cta" className="section bg-green-100">
        <div className="container-site flex flex-col gap-6">
          <h2 id="reviews-cta" className="ds-display m-0 text-[32px] leading-[38px] font-extrabold">Start with a free audit</h2>
          <CtaGroup showMarketplaces />
        </div>
      </section>
    </>
  )
}
