import type { Metadata } from 'next'
import Link from 'next/link'
import { posts } from '@/content/posts'
import { formatDate } from '@/lib/format'
import { PageHero } from '@/components/kit/PageHero'

export const metadata: Metadata = {
  title: 'Guides for marketplace sellers',
  description: 'Practical guides on Amazon listings, A+ Content, Shopify catalogues, lead lists and catalogue support, written by the 3s-Soft team.',
  alternates: { canonical: '/blogs/' },
}

export default function BlogsPage() {
  const sorted = [...posts].sort((a, b) => b.published.localeCompare(a.published))
  return (
    <>
      <PageHero
        id="blog-title"
        eyebrow="Guides"
        title="Guides for marketplace sellers"
        intro="What we have learned from listing and maintaining catalogues for sellers on Amazon, Walmart, Shopify, Etsy and eBay."
        crumbs={[{ name: 'Guides', path: '/blogs/' }]}
      />
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
