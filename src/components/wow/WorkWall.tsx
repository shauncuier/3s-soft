import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MotionToggle } from './MotionToggle'

type Shot = { src: string; alt: string; w: number; h: number; label: string }

const ROW_A: Shot[] = [
  { src: '/assets/work/ivan-troy-amazon-brand-story.webp', alt: 'Ivan Troy Amazon Brand Story', w: 1200, h: 1095, label: 'Ivan Troy · A+ Content' },
  { src: '/assets/work/montique-amazon-store.webp', alt: 'MONTIQUE Seller Central inventory', w: 1200, h: 606, label: 'MONTIQUE · 895 listings' },
  { src: '/assets/work/tailwater-supply-home.webp', alt: 'Tailwater Supply website', w: 1200, h: 750, label: 'Tailwater Supply · brand site' },
  { src: '/assets/work/amazon-listing-optimization-fiverr.webp', alt: 'Party supplies Amazon catalogue', w: 1200, h: 565, label: 'Party supplies · 145 products' },
]
const ROW_B: Shot[] = [
  { src: '/assets/work/bhela-houseboat-website.webp', alt: 'Bhela Houseboat booking site', w: 1200, h: 750, label: 'Bhela Houseboat · booking site' },
  { src: '/assets/work/candy-tourism-website.webp', alt: 'Candy Tourism Bangladesh website', w: 1200, h: 750, label: 'Candy Tourism · tour catalogue' },
  { src: '/assets/work/ivan-troy-a-plus-black.webp', alt: 'Ivan Troy A+ Content page', w: 645, h: 2000, label: 'Ivan Troy · six A+ pages' },
  { src: '/assets/work/price-stock-sync.svg', alt: 'Price & Stock Sync plugin diagram', w: 1440, h: 900, label: 'WooCommerce sync plugin' },
]

function Row({ shots, reverse }: { shots: Shot[]; reverse?: boolean }) {
  const cards = (hidden: boolean) =>
    shots.map((s) => (
      <figure key={`${s.src}-${hidden}`} aria-hidden={hidden || undefined} className="m-0 w-[300px] shrink-0 overflow-hidden rounded-[22px] border border-line bg-surface-0 p-2 shadow-[var(--shadow-card)] md:w-[420px]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-surface-200">
          <Image src={s.src} alt={hidden ? '' : s.alt} width={s.w} height={s.h} loading="lazy" sizes="420px" className="h-full w-full object-cover object-top" />
        </div>
        <figcaption className="px-2 pt-2 pb-1 text-sm font-semibold">{s.label}</figcaption>
      </figure>
    ))
  return (
    <div className={`${reverse ? 'motion-marquee-rev' : 'motion-marquee'} flex w-max gap-5 pr-5`} style={{ ['--dur' as string]: reverse ? '70s' : '60s' }}>
      {cards(false)}
      {cards(true)}
    </div>
  )
}

/** Two rows of real work drifting in opposite directions, with a round badge in the middle. */
export function WorkWall() {
  return (
    <section aria-labelledby="wall-title" className="motion-group relative overflow-hidden py-16 md:py-24">
      <div className="container-site mb-10 flex flex-col items-center gap-3 text-center">
        <h2 id="wall-title" className="ds-display m-0 text-[32px] leading-[38px] font-extrabold md:text-[44px] md:leading-[50px]">Real work, live listings</h2>
        <p className="prose-measure m-0 text-lg text-ink-muted">Screenshots from client stores and sites. Every project links to its live listing or source.</p>
        <MotionToggle />
      </div>
      <div className="relative flex flex-col gap-5">
        <Row shots={ROW_A} />
        <Row shots={ROW_B} reverse />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-auto flex h-56 w-56 flex-col items-center justify-center gap-3 rounded-full border-8 border-surface-100 bg-surface-0 p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:h-64 md:w-64">
            <p className="ds-display m-0 text-xl leading-6 font-extrabold md:text-2xl">From listing to sale.</p>
            <Link href="/portfolio/" className="ds-btn ds-btn--primary rounded-full px-5">
              See all work <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
