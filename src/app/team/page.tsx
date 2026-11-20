import type { Metadata } from 'next'
import Image from 'next/image'
import { team } from '@/content/team'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaGroup } from '@/components/CtaGroup'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the 3s-Soft team in Chittagong, Bangladesh and our UK director: the people who write, upload and maintain your listings and store data.',
  alternates: { canonical: '/team/' },
}

function initials(name: string) {
  return name.split(' ').filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join('')
}

export default function TeamPage() {
  return (
    <>
      <section aria-labelledby="team-title" className="border-b border-line bg-surface-0">
        <div className="container-site flex flex-col gap-6 py-10 md:py-16">
          <Breadcrumbs items={[{ name: 'Team', path: '/team/' }]} />
          <h1 id="team-title" className="ds-display m-0 text-[36px] leading-[42px] font-extrabold md:text-[48px] md:leading-[52px]">The people behind 3s-Soft</h1>
          <p className="prose-measure m-0 text-lg text-ink-muted">
            A small team in Chittagong, Bangladesh, with a UK director for clients in Britain. The founder leads every project, so you always know who is responsible for your work.
          </p>
        </div>
      </section>
      <section aria-label="Team members" className="section">
        <ul className="container-site m-0 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <li key={m.slug} className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-0">
              <div className="aspect-[4/3] bg-green-100">
                {m.photo ? (
                  <Image src={m.photo.src} alt={m.photo.alt} width={1094} height={800} loading="lazy" className="h-full w-full object-cover object-top" />
                ) : (
                  <div className="flex h-full items-center justify-center" aria-hidden="true">
                    <span className="ds-display text-6xl font-extrabold text-green-700">{initials(m.name)}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <h2 className="m-0 text-xl font-bold">{m.name}</h2>
                <p className="m-0 text-sm font-semibold text-green-700">{m.role}{m.location ? ` · ${m.location}` : ''}</p>
                <p className="m-0 text-ink-muted">{m.bio}</p>
                {m.links.length > 0 && (
                  <ul className="mt-auto flex list-none flex-wrap gap-x-4 p-0 pt-2 text-sm">
                    {m.links.map((l) => (
                      <li key={l.url}><a className="inline-flex min-h-11 items-center font-semibold hover:text-green-700" href={l.url} target="_blank" rel="noopener">{l.label} ↗</a></li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="team-cta" className="section bg-green-100">
        <div className="container-site flex flex-col gap-6">
          <h2 id="team-cta" className="ds-display m-0 text-[32px] leading-[38px] font-extrabold">Talk to the founder</h2>
          <CtaGroup />
        </div>
      </section>
    </>
  )
}
