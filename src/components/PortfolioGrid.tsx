import type { ReactNode } from 'react'
import type { WorkCategory } from '@/content/types'

const FILTERS: { id: 'all' | WorkCategory; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'amazon', label: 'Amazon' },
  { id: 'multi-marketplace', label: 'Multi-marketplace' },
  { id: 'web', label: 'Web development' },
]

/** Filter buttons over static cards (wired by src/client/filter.ts). Every card stays in the HTML; the filter lives in the URL hash. */
export function PortfolioGrid({ items }: { items: { category: WorkCategory; key: string; node: ReactNode }[] }) {
  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter work" className="flex flex-wrap gap-2" data-filter-group>
        {FILTERS.map((f) => (
          <button key={f.id} type="button" data-filter={f.id} className={`ds-chip ${f.id === 'all' ? 'ds-chip--active' : ''}`} aria-pressed={f.id === 'all'}>
            {f.label}
          </button>
        ))}
      </div>
      <p className="m-0 text-sm text-ink-muted" aria-live="polite" data-filter-count>Showing {items.length} of {items.length} projects</p>
      <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <li key={i.key} data-category={i.category} className="flex">
            {i.node}
          </li>
        ))}
      </ul>
    </div>
  )
}
