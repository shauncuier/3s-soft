'use client'

import { useEffect, useState } from 'react'
import { Search, Check } from 'lucide-react'

/** Real buyer searches from our projects: Tailwater, Ivan Troy, MONTIQUE, the party supplies store. */
export const SEARCHES = ['trout flies size 16', 'black leather belt 35mm', 'mens walking suit set', 'video game party chip bags']

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/** Decorative "search bar" inside the hero headline. Types a buyer search, then shows the listing was found. */
export function SearchPill() {
  const [reduced] = useState(prefersReducedMotion)
  const [i, setI] = useState(0)
  const [chars, setChars] = useState(reduced ? SEARCHES[0].length : 0)

  useEffect(() => {
    if (reduced) return
    const word = SEARCHES[i]
    if (chars < word.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 70)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setI((n) => (n + 1) % SEARCHES.length)
      setChars(0)
    }, 2200)
    return () => clearTimeout(t)
  }, [chars, i, reduced])

  const done = chars >= SEARCHES[i].length
  return (
    <span
      aria-hidden="true"
      className="mx-[0.15em] inline-flex h-[2.3em] max-w-full -translate-y-[0.35em] items-center gap-[0.45em] rounded-full border-2 border-ink bg-surface-0 pr-[0.3em] pl-[0.75em] align-middle font-mono text-[0.26em] font-medium tracking-normal text-ink shadow-[0_5px_0_var(--ink)] max-md:mx-auto max-md:my-3 max-md:flex max-md:h-11 max-md:w-fit max-md:translate-y-0 max-md:text-[14px]"
    >
      <Search className="h-[1.1em] w-[1.1em] shrink-0" strokeWidth={2.5} />
      <span className="min-w-[13ch] overflow-hidden text-left whitespace-nowrap">
        {SEARCHES[i].slice(0, chars)}
        {!done && <span className="ml-px inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-ink" />}
      </span>
      <span className={`flex h-[1.7em] w-[1.7em] shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${done ? 'bg-green-700 text-on-green' : 'bg-surface-200 text-ink-muted'}`}>
        <Check className="h-[1em] w-[1em]" strokeWidth={3} />
      </span>
    </span>
  )
}
