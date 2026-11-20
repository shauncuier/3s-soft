import { BeforeAfter } from './BeforeAfter'

export function CompareSection() {
  return (
    <section aria-labelledby="compare-title" className="section pt-0">
      <div className="container-site">
        <div className="rounded-[36px] border border-line bg-surface-200/60 px-4 py-10 md:px-12 md:py-14">
          <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center gap-3 text-center">
            <p className="m-0 font-mono text-xs font-medium tracking-[0.12em] text-green-700 uppercase">See the difference</p>
            <h2 id="compare-title" className="ds-display m-0 text-[30px] leading-[36px] font-extrabold md:text-[42px] md:leading-[48px]">
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
