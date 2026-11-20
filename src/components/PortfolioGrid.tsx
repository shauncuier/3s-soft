'use client'

import { useSyncExternalStore, type ReactNode } from 'react'
import type { WorkCategory } from '@/content/types'

const FILTERS: { id: 'all' | WorkCategory; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'amazon', label: 'Amazon' },
  { id: 'multi-marketplace', label: 'Multi-marketplace' },
  { id: 'web', label: 'Web development' },
]

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

function readHash(): string {
  const h = window.location.hash.replace('#', '')
  return FILTERS.some((f) => f.id === h) ? h : 'all'
}

/** Filter buttons over server-rendered cards. Every card stays in the HTML; the filter lives in the URL hash. */
export function PortfolioGrid({ items }: { items: { category: WorkCategory; key: string; node: ReactNode }[] }) {
  const active = useSyncExternalStore(subscribe, readHash, () => 'all')
  const shown = items.filter((i) => active === 'all' || i.category === active)

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter work" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`ds-chip ${active === f.id ? 'ds-chip--active' : ''}`}
            aria-pressed={active === f.id}
            onClick={() => {
              history.replaceState(null, '', f.id === 'all' ? window.location.pathname : `#${f.id}`)
              window.dispatchEvent(new HashChangeEvent('hashchange'))
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="m-0 text-sm text-ink-muted" aria-live="polite">Showing {shown.length} of {items.length} projects</p>
      <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <li key={i.key} hidden={!(active === 'all' || i.category === active)} className="flex">
            {i.node}
          </li>
        ))}
      </ul>
    </div>
  )
}
