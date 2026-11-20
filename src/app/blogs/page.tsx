import type { Metadata } from 'next'
import Link from 'next/link'
import { posts } from '@/content/posts'
import { formatDate } from '@/lib/format'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Guides for marketplace sellers',
  description: 'Practical guides on Amazon listings, A+ Content, Shopify catalogues, lead lists and catalogue support, written by the 3s-Soft team.',
  alternates: { canonical: '/blogs/' },
}

export default function BlogsPage() {
  const sorted = [...posts].sort((a, b) => b.published.localeCompare(a.published))
  return (
    <>
      <section aria-labelledby="blog-title" className="border-b border-line bg-surface-0">
        <div className="container-site flex flex-col gap-6 py-10 md:py-16">
          <Breadcrumbs items={[{ name: 'Guides', path: '/blogs/' }]} />
          <h1 id="blog-title" className="ds-display m-0 text-[36px] leading-[42px] font-extrabold md:text-[48px] md:leading-[52px]">Guides for marketplace sellers</h1>
          <p className="prose-measure m-0 text-lg text-ink-muted">What we have learned from listing and maintaining catalogues for sellers on Amazon, Walmart, Shopify, Etsy and eBay.</p>
        </div>
      </section>
      <section aria-label="All guides" className="section">
        <ul className="container-site m-0 grid list-none gap-6 md:grid-cols-2">
          {sorted.map((p) => (
            <li key={p.slug} className="flex">
              <Link href={`/blog/${p.slug}/`} className="ds-service w-full">
                <p className="m-0 font-mono text-xs text-ink-muted">Updated {formatDate(p.updated)}</p>
                <h2 className="ds-service__title">{p.title}</h2>
                <p className="ds-service__text">{p.description}</p>
                <span className="ds-service__more">Read the guide →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
