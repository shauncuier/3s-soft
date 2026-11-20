import type { Metadata } from 'next'
import { reviews } from '@/content/reviews'
import { services } from '@/content/services'
import { fiverrBreakdown, getProof } from '@/content/proof'
import { site } from '@/content/site'
import { formatCheckedOn } from '@/lib/format'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ReviewCard } from '@/components/ReviewCard'
import { ProofBar } from '@/components/ProofBar'
import { CtaGroup } from '@/components/CtaGroup'

export const metadata: Metadata = {
  title: { absolute: '3s-Soft Reviews: 5.0 from 465 Fiverr Reviews | 3s-Soft' },
  description: 'Real buyer reviews of 3s-Soft from Fiverr and Upwork, copied word for word with links to the originals. 444 of 465 Fiverr reviews are five stars.',
  alternates: { canonical: '/reviews/' },
}

export default function ReviewsPage() {
  const total = Object.values(fiverrBreakdown).reduce((a, b) => a + b, 0)
  const checked = formatCheckedOn(getProof('fiverr-reviews').checkedOn)
  return (
    <>
      <section aria-labelledby="reviews-title" className="border-b border-line bg-surface-0">
        <div className="container-site flex flex-col gap-6 py-10 md:py-16">
          <Breadcrumbs items={[{ name: 'Reviews', path: '/reviews/' }]} />
          <h1 id="reviews-title" className="ds-display m-0 text-[36px] leading-[42px] font-extrabold md:text-[48px] md:leading-[52px]">What buyers say about 3s-Soft</h1>
          <p className="prose-measure m-0 text-lg text-ink-muted">
            Every review below is copied word for word from Fiverr or Upwork and links to the original. Anyone can check the full history on our public profiles.
          </p>
          <ProofBar ids={['fiverr-rating', 'fiverr-reviews', 'upwork-badge', 'upwork-jss']} />
        </div>
      </section>

      <section aria-labelledby="breakdown" className="section">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 id="breakdown" className="ds-display mb-4 text-[28px] font-bold">Fiverr rating breakdown</h2>
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
              <a className="font-semibold text-green-700 underline underline-offset-2" href={site.fiverrUrl} target="_blank" rel="noopener">Read all reviews on Fiverr ↗</a>
            </p>
          </div>
          <div className="flex flex-col gap-12">
            {services.map((s) => {
              const list = reviews.filter((r) => r.serviceSlugs[0] === s.slug)
              if (list.length === 0) return null
              return (
                <section key={s.slug} aria-labelledby={`rev-${s.slug}`}>
                  <h2 id={`rev-${s.slug}`} className="ds-display mb-4 text-[24px] font-bold">{s.title}</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {list.map((r) => <ReviewCard key={r.id} review={r} />)}
                  </div>
                </section>
              )
            })}
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
