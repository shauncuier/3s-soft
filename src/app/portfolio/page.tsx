import type { Metadata } from 'next'
import { getAllWork } from '@/content/portfolio'
import { WorkCard } from '@/components/WorkCard'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaGroup } from '@/components/CtaGroup'

export const metadata: Metadata = {
  title: { absolute: 'Amazon Listing & eCommerce Case Studies | 3s-Soft' },
  description:
    'Real Amazon listing, A+ Content and catalogue projects for brands like Ivan Troy and MONTIQUE, plus websites built by our web studio. Each links to its source.',
  alternates: { canonical: '/portfolio/' },
}

export default function PortfolioPage() {
  const items = getAllWork().map((w) => ({ key: w.slug, category: w.category, node: <WorkCard item={w} /> }))
  return (
    <>
      <section aria-labelledby="work-title" className="border-b border-line bg-surface-0">
        <div className="container-site flex flex-col gap-6 py-10 md:py-16">
          <Breadcrumbs items={[{ name: 'Work', path: '/portfolio/' }]} />
          <h1 id="work-title" className="ds-display m-0 text-[36px] leading-[42px] font-extrabold md:text-[48px] md:leading-[52px]">
            Amazon listing and eCommerce case studies
          </h1>
          <p className="prose-measure m-0 text-lg text-ink-muted">
            Projects for real brands and sellers. Each one links to the live listing, the live site or the public profile where you can check it.
          </p>
        </div>
      </section>
      <section aria-label="Projects" className="section">
        <div className="container-site">
          <PortfolioGrid items={items} />
        </div>
      </section>
      <section aria-labelledby="work-cta" className="section bg-green-100">
        <div className="container-site flex flex-col gap-6">
          <h2 id="work-cta" className="ds-display m-0 text-[32px] leading-[38px] font-extrabold">Want this for your catalogue?</h2>
          <CtaGroup showMarketplaces />
        </div>
      </section>
    </>
  )
}
