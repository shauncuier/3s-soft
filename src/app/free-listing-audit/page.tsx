import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { LeadForm } from '@/components/LeadForm'
import { ProofBar } from '@/components/ProofBar'
import { WorkCard } from '@/components/WorkCard'
import { ReviewCard } from '@/components/ReviewCard'
import { Faq } from '@/components/Faq'
import { getCaseStudy } from '@/content/portfolio'
import { reviews } from '@/content/reviews'

export const metadata: Metadata = {
  title: { absolute: 'Free Amazon Listing Audit (5 Products) | 3s-Soft' },
  description:
    'Send one link. We review five of your product listings and email you a short list of fixes for titles, keywords, bullets, images and categories. Free.',
  alternates: { canonical: '/free-listing-audit/' },
}

const checks = [
  'Titles and the search terms they cover',
  'Bullet points and description',
  'Backend search terms on Amazon',
  'Images against the marketplace’s rules',
  'Category and variation setup',
  'One or two ideas from your top competitors',
]

const faq = [
  { q: 'Is it really free?', a: 'Yes. No card and no contract. You keep the notes whether or not you hire us.' },
  { q: 'Do you need access to my account?', a: 'No. We only look at your public listings or storefront.' },
  { q: 'Which marketplaces can you audit?', a: 'Amazon, Walmart, Shopify, Etsy and eBay.' },
  { q: 'What happens after the audit?', a: 'If you want us to make the fixes, we send a fixed quote. If not, that is the end of it.' },
]

export default function FreeAuditPage() {
  const proofReview = reviews.find((r) => r.id === 'cromwelltoby-listings')!
  return (
    <>
      <section aria-labelledby="audit-title" className="relative overflow-hidden">
        <div className="container-site grid gap-12 py-10 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <p className="m-0 inline-flex items-center gap-2 self-start rounded-full border border-line bg-surface-0 px-4 py-1.5 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-green-700" aria-hidden="true" /> Free · 5 products · no card
            </p>
            <h1 id="audit-title" className="hero-display m-0 !text-[44px] md:!text-[68px]">Free 5-product listing audit</h1>
            <p className="prose-measure m-0 text-lg leading-8 text-ink-muted">
              Send one link. We review five of your products and email you a short, specific list of fixes. You keep the notes whether or not you hire us.
            </p>
            <h2 className="m-0 text-xl font-bold">What we check</h2>
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
              {checks.map((c) => (
                <li key={c} className="flex gap-2 text-[17px]"><CheckCircle2 className="mt-0.5 shrink-0 text-green-700" size={20} aria-hidden="true" />{c}</li>
              ))}
            </ul>
            <ReviewCard review={proofReview} />
          </div>
          <div className="rounded-[32px] border border-line bg-surface-0 p-6 shadow-[var(--shadow-card)] md:p-8 lg:sticky lg:top-24">
            <h2 className="ds-display mt-0 mb-1 text-2xl font-extrabold">Request your audit</h2>
            <p className="mt-0 mb-6 text-ink-muted">Takes about a minute.</p>
            <LeadForm kind="audit" />
          </div>
        </div>
      </section>

      <section aria-labelledby="audit-proof" className="section border-y border-line bg-surface-0">
        <div className="container-site flex flex-col gap-8">
          <h2 id="audit-proof" className="ds-display m-0 text-[28px] font-bold">Who will review your listings</h2>
          <ProofBar ids={['fiverr-rating', 'fiverr-reviews', 'gig-listing-rating', 'amazon-spn']} />
          <div className="grid gap-6 md:grid-cols-2">
            <WorkCard item={getCaseStudy('ivan-troy-amazon-a-plus')} />
            <WorkCard item={getCaseStudy('montique-amazon-store')} />
          </div>
        </div>
      </section>

      <section aria-labelledby="audit-faq" className="section">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_2fr]">
          <h2 id="audit-faq" className="ds-display m-0 text-[28px] font-bold">Audit questions</h2>
          <Faq items={faq} />
        </div>
      </section>
    </>
  )
}
