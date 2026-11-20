import { BeforeAfter } from './BeforeAfter'

export function CompareSection() {
  return (
    <section aria-labelledby="compare-title" className="section defer-render pt-0 md:pt-0">
      <div className="container-site">
        <div className="rounded-[var(--radius-lg)] border border-line bg-surface-100 px-4 py-10 md:px-12 md:py-14">
          <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center gap-3 text-center">
            <p className="m-0 font-mono text-xs font-medium tracking-[0.12em] text-green-700 uppercase">See the difference</p>
            <h2 id="compare-title" className="ds-display m-0 text-[28px] leading-[34px] font-bold tracking-[-0.01em] md:text-[36px] md:leading-[42px]">
              Same product. One listing gets found.
            </h2>
            <p className="m-0 text-lg text-ink-muted">Switch between the raw supplier data and the listing we wrote and structured.</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <BeforeAfter />
          </div>
        </div>
      </div>
    </section>
  )
}
