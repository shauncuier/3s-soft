import Link from 'next/link'

type Version = 'before' | 'after'

const VERSIONS = {
  before: {
    tab: 'Supplier data',
    title: 'mens walking suit 2pc short sleeve stripe set 2312 S-5XL',
    pages: '1 of 20 separate pages',
    swatches: 1,
    keywords: [] as string[],
    facts: ['Each size and colour is its own listing', 'No brand name or style keywords', 'Reviews split across 20 pages'],
  },
  after: {
    tab: '3s-Soft listing',
    title: 'MONTIQUE Striped Pattern Walking Suit 2 Piece Short Sleeve Set, Premium Quality, Versatile Design #2312',
    pages: 'One page, 20 variations',
    swatches: 20,
    keywords: ['walking suit', '2 piece set', 'short sleeve', 'striped'],
    facts: ['One parent listing with every size and colour', 'Brand, product type and style number in a fixed pattern', 'Reviews and sales collect on one page'],
  },
} as const

const SWATCH = ['#24212a', '#585557', '#2f8c44', '#a86a00', '#8c8792']

function Panel({ v }: { v: Version }) {
  const d = VERSIONS[v]
  const isAfter = v === 'after'
  return (
    <div
      data-ba-panel={v}
      hidden={!isAfter}
      className={`grid w-full gap-6 rounded-[var(--radius-lg)] border p-5 md:grid-cols-[180px_1fr] md:p-7 ${isAfter ? 'border-green-700 bg-surface-0 shadow-[var(--shadow-card)]' : 'border-line bg-surface-200'}`}
    >
      <div className={`flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl ${isAfter ? 'bg-green-100' : 'bg-surface-0'}`} aria-hidden="true">
        <span className="ds-display text-4xl font-extrabold text-brand-charcoal">#2312</span>
        <span className="flex max-w-[132px] flex-wrap justify-center gap-1">
          {Array.from({ length: d.swatches }).map((_, i) => (
            <span key={i} className="h-3 w-3 rounded-full border border-surface-0" style={{ background: SWATCH[i % 5] }} />
          ))}
        </span>
      </div>
      <div className="flex min-w-0 flex-col gap-3 text-left">
        <p className="m-0 font-mono text-xs tracking-[0.1em] text-ink-muted uppercase">{d.pages}</p>
        <p className={`m-0 text-lg leading-7 md:text-xl ${isAfter ? 'font-bold text-ink' : 'font-mono text-ink-muted'}`} translate="no">{d.title}</p>
        {d.keywords.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Search terms covered">
            {d.keywords.map((k) => <li key={k} className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">{k}</li>)}
          </ul>
        )}
        <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">
          {d.facts.map((f) => (
            <li key={f} className="flex gap-2">
              <span aria-hidden="true" className={isAfter ? 'font-bold text-green-700' : 'font-bold text-danger'}>{isAfter ? '✓' : '✕'}</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Toggle between raw supplier data and the finished listing (wired by src/client/before-after.ts). A radio group, so arrow keys work. */
export function BeforeAfter() {
  return (
    <figure className="m-0 flex flex-col items-center gap-6" data-ba>
      <div role="radiogroup" aria-label="Compare listing versions" className="inline-flex rounded-full border border-line bg-surface-0 p-1 shadow-sm">
        {(['before', 'after'] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="radio"
            data-value={key}
            aria-checked={key === 'after'}
            tabIndex={key === 'after' ? 0 : -1}
            className={`ba-option ba-option--${key} min-h-11 rounded-full px-5 text-[15px] font-semibold text-ink-muted transition-colors hover:text-ink`}
          >
            {VERSIONS[key].tab}
          </button>
        ))}
      </div>

      <div className="w-full" aria-live="polite">
        <Panel v="before" />
        <Panel v="after" />
      </div>

      <figcaption className="text-center text-sm text-ink-muted">
        Illustration based on the{' '}
        <Link prefetch={false} className="font-semibold text-green-700 underline underline-offset-2" href="/portfolio/montique-amazon-store/">MONTIQUE project</Link>: 895 parent listings with their variations.
      </figcaption>
    </figure>
  )
}
