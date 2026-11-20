import { Star } from 'lucide-react'
import { CtaGroup } from '@/components/CtaGroup'
import { site } from '@/content/site'
import { SearchPill } from './SearchPill'

const chips = [
  { label: 'Amazon', tone: 'bg-green-100 text-green-800' },
  { label: 'Walmart', tone: 'bg-[color-mix(in_oklab,var(--star)_22%,var(--surface-0))] text-ink' },
  { label: 'Shopify', tone: 'bg-surface-200 text-ink' },
  { label: 'Etsy', tone: 'bg-[color-mix(in_oklab,var(--star)_22%,var(--surface-0))] text-ink' },
  { label: 'eBay', tone: 'bg-green-100 text-green-800' },
]

/** Two arcs taken from the logo's S: green over charcoal. Decorative. */
function LogoArcs({ side }: { side: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 900"
      className={`pointer-events-none absolute top-0 hidden h-full w-[34vw] max-w-[440px] lg:block ${side === 'left' ? 'left-0' : 'right-0 -scale-x-100'}`}
      fill="none"
    >
      <path d="M-260 -40 A 560 560 0 0 1 300 450" stroke="var(--brand-green)" strokeOpacity="0.22" strokeWidth="28" strokeLinecap="round" />
      <path d="M-300 120 A 520 520 0 0 1 220 640" stroke="var(--brand-charcoal)" strokeOpacity="0.14" strokeWidth="28" strokeLinecap="round" />
      <path d="M-340 280 A 480 480 0 0 1 140 830" stroke="var(--line)" strokeWidth="2" />
    </svg>
  )
}

function Tile({ className, style, children }: { className: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className={`motion-float absolute hidden rounded-2xl border border-line bg-surface-0 px-4 py-3 text-left shadow-[var(--shadow-card)] xl:block ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export function HeroWow() {
  return (
    <section aria-labelledby="hero-title" className="motion-group relative isolate overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      <LogoArcs side="left" />
      <LogoArcs side="right" />

      {/* Floating proof fragments from real projects (decorative; the same facts appear as text below). */}
      <Tile className="top-[12%] left-[6%]" style={{ ['--rot' as string]: '-4deg' }}>
        <p className="m-0 flex items-center gap-1 text-sm font-bold"><Star size={14} className="fill-[var(--star)] text-[var(--star)]" /> 5.0 · 465 reviews</p>
        <p className="m-0 text-xs text-ink-muted">Fiverr, since 2015</p>
      </Tile>
      <Tile className="top-[46%] left-[3%]" style={{ ['--rot' as string]: '3deg', ['--delay' as string]: '-2s' }}>
        <p className="m-0 font-mono text-xs text-ink-muted">ASIN B0DQ3P7237</p>
        <p className="m-0 flex items-center gap-1.5 text-sm font-bold"><span className="h-2 w-2 rounded-full bg-green-700" /> Live on Amazon</p>
      </Tile>
      <Tile className="bottom-[10%] left-[9%]" style={{ ['--rot' as string]: '-2deg', ['--delay' as string]: '-4s' }}>
        <p className="m-0 text-sm font-bold">A+ Content · Brand Story</p>
        <p className="m-0 text-xs text-ink-muted">Amazon SPN provider</p>
      </Tile>
      <Tile className="top-[14%] right-[6%]" style={{ ['--rot' as string]: '4deg', ['--delay' as string]: '-1s' }}>
        <p className="m-0 text-sm font-bold">+42 variations</p>
        <div className="mt-1.5 flex gap-1">{Array.from({ length: 7 }).map((_, i) => <span key={i} className="h-2 w-3 rounded-sm bg-green-700" style={{ opacity: 0.35 + i * 0.09 }} />)}</div>
      </Tile>
      <Tile className="top-[50%] right-[3%]" style={{ ['--rot' as string]: '-3deg', ['--delay' as string]: '-3s' }}>
        <p className="m-0 text-sm font-bold">895 listings</p>
        <p className="m-0 text-xs text-ink-muted">one Seller Central store</p>
      </Tile>
      <Tile className="right-[10%] bottom-[12%]" style={{ ['--rot' as string]: '2deg', ['--delay' as string]: '-5s' }}>
        <p className="m-0 text-sm font-bold">100% Job Success</p>
        <p className="m-0 text-xs text-ink-muted">Upwork Top Rated</p>
      </Tile>

      <div className="container-site relative flex flex-col items-center gap-7 text-center">
        <p className="motion-rise m-0 inline-flex items-center gap-2 rounded-full border border-line bg-surface-0 px-4 py-1.5 text-sm font-semibold shadow-sm">
          <span className="h-2 w-2 rounded-full bg-green-700" aria-hidden="true" /> eCommerce operations team, since 2015
        </p>

        <h1 id="hero-title" className="hero-display motion-rise m-0 max-w-[15ch]" style={{ ['--delay' as string]: '80ms' }}>
          Amazon, Shopify &amp; marketplace listings <SearchPill /> done right
        </h1>

        <p className="motion-rise prose-measure m-0 text-lg leading-8 text-ink-muted md:text-xl" style={{ ['--delay' as string]: '160ms' }}>
          We write, upload and maintain product listings for{' '}
          {chips.map((c, i) => (
            <span key={c.label}>
              <span className={`rounded-md px-1.5 py-0.5 font-semibold ${c.tone}`} translate="no">{c.label}</span>
              {i < chips.length - 2 ? ', ' : i === chips.length - 2 ? ' and ' : ''}
            </span>
          ))}{' '}
          sellers.
        </p>

        <div className="motion-rise relative flex flex-col items-center gap-4" style={{ ['--delay' as string]: '240ms' }}>
          <div className="[&_.ds-btn]:rounded-full [&>div]:items-center [&>div>div]:justify-center">
            <CtaGroup />
          </div>
          <p aria-hidden="true" className="hand absolute top-full left-0 m-0 mt-1 hidden -rotate-3 text-xl text-green-700 md:block">
            Free · no card · no contract
            <svg className="ml-auto block" width="54" height="30" viewBox="0 0 54 30" fill="none"><path d="M2 4c14 2 30 6 44 20m0 0-9-1m9 1-1-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </p>
        </div>

        <ul className="motion-rise m-0 mt-2 flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-2 p-0 text-sm" style={{ ['--delay' as string]: '320ms' }} aria-label="Track record">
          <li><a className="inline-flex min-h-11 items-center gap-1.5 font-semibold hover:text-green-700" href={site.fiverrUrl} target="_blank" rel="noopener"><Star size={16} className="fill-[var(--star)] text-[var(--star)]" aria-hidden="true" /> 5.0 from 465 Fiverr reviews ↗</a></li>
          <li><a className="inline-flex min-h-11 items-center font-semibold hover:text-green-700" href={site.upworkUrl} target="_blank" rel="noopener">Upwork Top Rated, 100% Job Success ↗</a></li>
          <li><a className="inline-flex min-h-11 items-center font-semibold hover:text-green-700" href={site.amazonSpnAplusUrl} target="_blank" rel="noopener">Amazon SPN listed ↗</a></li>
        </ul>
      </div>
    </section>
  )
}
