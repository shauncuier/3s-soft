import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/content/site'
import { team } from '@/content/team'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaGroup } from '@/components/CtaGroup'
import { ProofBar } from '@/components/ProofBar'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'About 3s-Soft',
  description: '3s-Soft is an eCommerce operations team in Chittagong, Bangladesh, led by Jashedul Islam Shaun. Listings, A+ Content and catalogue work since 2015.',
  alternates: { canonical: '/about-us/' },
}

const record = [
  { label: '5.0 rating from 465 Fiverr reviews, selling since October 2015', href: site.fiverrUrl },
  { label: 'Upwork Top Rated, 100% Job Success, 55 jobs completed', href: site.upworkUrl },
  { label: 'Listed on Amazon’s Service Provider Network for A+ Content', href: site.amazonSpnAplusUrl },
  { label: 'Listed on Amazon’s Service Provider Network for Cataloguing', href: site.amazonSpnCatalogUrl },
  { label: 'Published WooCommerce plugin on WordPress.org', href: site.wordpressPluginUrl },
]

export default function AboutPage() {
  const founder = team.find((t) => t.isFounder)!
  return (
    <>
      <section aria-labelledby="about-title" className="border-b border-line bg-surface-0">
        <div className="container-site flex flex-col gap-6 py-10 md:py-16">
          <Breadcrumbs items={[{ name: 'About', path: '/about-us/' }]} />
          <h1 id="about-title" className="ds-display m-0 max-w-[22ch] text-[36px] leading-[42px] font-extrabold md:text-[48px] md:leading-[52px]">
            An eCommerce operations team, since 2015
          </h1>
          <p className="prose-measure m-0 text-lg text-ink-muted">
            3s-Soft writes, uploads and maintains product listings for online sellers on Amazon, Walmart, Shopify, Etsy and eBay. We work from Chittagong, Bangladesh, with clients in the United States, the United Kingdom, Canada and Europe.
          </p>
        </div>
      </section>

      <section aria-labelledby="story" className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div className="flex flex-col gap-5 text-lg">
            <h2 id="story" className="ds-display m-0 text-[28px] font-bold">How it started</h2>
            <p className="prose-measure m-0">
              Jashedul Islam Shaun started taking product listing and data jobs on Fiverr in October 2015. Since then the account has collected 465 reviews, many from sellers who came back for ongoing work.
            </p>
            <p className="prose-measure m-0">
              Repeat clients and larger catalogues turned the work into a team. Today 3s-Soft covers listings, Amazon A+ Content, Shopify catalogue work, B2B lead lists and ongoing catalogue support. Website builds are handled by our web studio at <a className="font-semibold text-green-700 underline underline-offset-2" href={site.netUrl}>3s-soft.net</a>, and UK clients can work with our UK director through <a className="font-semibold text-green-700 underline underline-offset-2" href={site.ukUrl}>3s-soft.co.uk</a>.
            </p>
            <h2 className="ds-display mt-4 mb-0 text-[28px] font-bold">How we work</h2>
            <ul className="prose-measure m-0 flex flex-col gap-3 pl-5">
              <li>You get a fixed quote and a delivery date before work starts.</li>
              <li>We work inside your accounts with only the access the job needs.</li>
              <li>Every delivery comes with a sheet of what changed, so you can check it.</li>
              <li>The founder reviews client work before it is delivered.</li>
            </ul>
          </div>
          <figure className="m-0 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-0">
            {founder.photo && <Image src={founder.photo.src} alt={founder.photo.alt} width={1094} height={800} className="h-auto w-full" />}
            <figcaption className="flex flex-col gap-1 p-6">
              <span className="text-lg font-bold">{founder.name}</span>
              <span className="text-sm text-ink-muted">Founder, 3s-Soft · {founder.location}</span>
              <span className="mt-2 flex flex-wrap gap-4 text-sm">
                {founder.links.map((l) => <a key={l.url} className="inline-flex min-h-11 items-center font-semibold hover:text-green-700" href={l.url} target="_blank" rel="noopener">{l.label} ↗</a>)}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="record" className="section border-y border-line bg-surface-0">
        <div className="container-site flex flex-col gap-8">
          <h2 id="record" className="ds-display m-0 text-[28px] font-bold">Our track record, with links</h2>
          <ProofBar ids={['fiverr-rating', 'fiverr-reviews', 'upwork-jss', 'amazon-spn', 'fiverr-since']} />
          <ul className="m-0 flex flex-col gap-2 pl-5 text-lg">
            {record.map((r) => (
              <li key={r.href}><a className="hover:text-green-700 underline-offset-2 hover:underline" href={r.href} target="_blank" rel="noopener">{r.label} ↗</a></li>
            ))}
          </ul>
          <p className="m-0"><Link className="ds-btn ds-btn--secondary" href="/team/">Meet the team</Link></p>
        </div>
      </section>

      <section aria-labelledby="about-cta" className="section bg-green-100">
        <div className="container-site flex flex-col gap-6">
          <h2 id="about-cta" className="ds-display m-0 text-[32px] leading-[38px] font-extrabold">Work with us</h2>
          <CtaGroup showMarketplaces />
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          url: 'https://3s-soft.com/about-us/',
          mainEntity: {
            '@type': 'Person',
            name: founder.name,
            jobTitle: 'Founder',
            worksFor: { '@type': 'Organization', name: '3s-Soft', url: site.url },
            sameAs: [site.founder.linkedin, site.founder.github, site.founder.url, site.fiverrUrl, site.upworkUrl],
          },
        }}
      />
    </>
  )
}
