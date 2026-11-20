import Link from 'next/link'
import { JsonLd } from './JsonLd'

export type Crumb = { name: string; path: string }

/** Visible breadcrumbs plus BreadcrumbList JSON-LD. Home is added automatically. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: 'Home', path: '/' }, ...items]
  return (
    <nav aria-label="Breadcrumb">
      <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm text-ink-muted">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i < all.length - 1 ? (
              <>
                <Link className="inline-flex min-h-6 items-center hover:text-green-700" href={c.path}>{c.name}</Link>
                <span aria-hidden="true">/</span>
              </>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `https://3s-soft.com${c.path}` })),
        }}
      />
    </nav>
  )
}
