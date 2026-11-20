import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs'

type Props = {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  crumbs?: Crumb[]
  /** CTAs, chips or a proof row under the intro. */
  children?: ReactNode
  /** Optional right-hand column (a form card, an image). */
  aside?: ReactNode
  id?: string
}

/** Shared hero for every inner page: breadcrumbs, eyebrow, left-aligned headline, intro, actions. */
export function PageHero({ eyebrow, title, intro, crumbs, children, aside, id = 'page-title' }: Props) {
  return (
    <section aria-labelledby={id} className="border-b border-line bg-surface-0 pt-8 pb-12 md:pt-10 md:pb-16">
      <div className={`container-site ${aside ? 'grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16' : ''}`}>
        <div className="motion-rise flex min-w-0 max-w-3xl flex-col gap-5">
          {crumbs && <Breadcrumbs items={crumbs} />}
          <p className="m-0 font-mono text-xs font-medium tracking-[0.12em] text-green-700 uppercase">{eyebrow}</p>
          <h1 id={id} className="page-title m-0">{title}</h1>
          {intro && <p className="prose-measure m-0 text-lg leading-8 text-ink-muted">{intro}</p>}
          {children && <div className="mt-2 flex flex-col gap-4">{children}</div>}
        </div>
        {aside && <div className="motion-rise" style={{ ['--delay' as string]: '120ms' }}>{aside}</div>}
      </div>
    </section>
  )
}
