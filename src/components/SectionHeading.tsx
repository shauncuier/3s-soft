import type { ReactNode } from 'react'

export function SectionHeading({ id, title, intro, children }: { id: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:mb-10">
      <h2 id={id} className="ds-display m-0 text-[28px] leading-[34px] font-bold tracking-[-0.01em] md:text-[32px] md:leading-[38px]">
        {title}
      </h2>
      {intro && <p className="prose-measure m-0 text-lg text-ink-muted">{intro}</p>}
      {children}
    </div>
  )
}
