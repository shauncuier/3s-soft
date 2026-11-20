import type { Metadata } from 'next'
import { getAllWork } from '@/content/portfolio'
import { WorkCard } from '@/components/WorkCard'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { PageHero } from '@/components/kit/PageHero'
import { CtaPanel } from '@/components/kit/CtaPanel'

export const metadata: Metadata = {
  title: { absolute: 'Amazon Listing & eCommerce Case Studies | 3s-Soft' },
  description:
    'Real Amazon listing, A+ Content and catalogue projects for brands like Ivan Troy and MONTIQUE, plus websites built by our web studio. Each links to its source.',
  alternates: { canonical: '/portfolio/' },
}

export default function PortfolioPage() {
  const items = getAllWork().map((w, i) => ({ key: w.slug, category: w.category, node: <WorkCard item={w} priority={i === 0} headingLevel={2} /> }))
  return (
    <>
      <PageHero
        id="work-title"
        eyebrow="Portfolio"
        title="Amazon listing and eCommerce case studies"
        intro="Projects for real brands and sellers. Each one links to the live listing, the live site or the public profile where you can check it."
        crumbs={[{ name: 'Work', path: '/portfolio/' }]}
      />
      <section aria-label="Projects" className="section">
        <div className="container-site">
          <PortfolioGrid items={items} />
        </div>
      </section>
      <CtaPanel id="work-cta" title="Want this for your catalogue?" text="Send five product links. The free audit shows what to fix first, and you keep the notes whether or not you hire us." />
    </>
  )
}
