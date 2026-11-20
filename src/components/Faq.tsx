import { JsonLd } from './JsonLd'

export type FaqItem = { q: string; a: string }

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <details key={item.q} className="group rounded-[var(--radius-lg)] border border-line bg-surface-0 px-6 py-1">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-bold">
            {item.q}
            <span aria-hidden="true" className="text-2xl text-green-700 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="prose-measure pb-5 text-ink-muted">{item.a}</p>
        </details>
      ))}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
        }}
      />
    </div>
  )
}
