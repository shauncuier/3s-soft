import { Breadcrumbs } from './Breadcrumbs'
import { InlineText } from './InlineText'
import { formatDate } from '@/lib/format'

export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] }

export function LegalPage({ title, path, updated, intro, sections }: { title: string; path: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <article className="section">
      <div className="container-site flex max-w-3xl flex-col gap-6">
        <Breadcrumbs items={[{ name: title, path }]} />
        <h1 className="page-title m-0">{title}</h1>
        <p className="m-0 text-sm text-ink-muted">Last updated <time dateTime={updated}>{formatDate(updated)}</time></p>
        <p className="m-0 text-lg"><InlineText text={intro} /></p>
        {sections.map((s) => (
          <section key={s.heading} className="flex flex-col gap-3">
            <h2 className="m-0 text-2xl font-bold">{s.heading}</h2>
            {s.paragraphs.map((p) => <p key={p} className="m-0 leading-7"><InlineText text={p} /></p>)}
            {s.list && <ul className="m-0 flex flex-col gap-2 pl-5 leading-7">{s.list.map((l) => <li key={l}><InlineText text={l} /></li>)}</ul>}
          </section>
        ))}
      </div>
    </article>
  )
}
