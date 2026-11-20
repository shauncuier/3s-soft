import type { Metadata } from 'next'
import { Img } from '@/components/Img'
import { team } from '@/content/team'
import { PageHero } from '@/components/kit/PageHero'
import { CtaPanel } from '@/components/kit/CtaPanel'

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
      <PageHero
        id="team-title"
        eyebrow="Team"
        title="The people behind 3s-Soft"
        intro="A small team in Chittagong, Bangladesh, with a UK director for clients in Britain. The founder leads every project, so you always know who is responsible for your work."
        crumbs={[{ name: 'Team', path: '/team/' }]}
      />
      <section aria-label="Team members" className="section">
        <ul className="container-site m-0 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <li key={m.slug} className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-0">
              <div className="aspect-[4/3] bg-green-100">
                {m.photo ? (
                  <Img src={m.photo.src} alt={m.photo.alt} width={m.photo.width} height={m.photo.height} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover object-top" />
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
      <CtaPanel id="team-cta" title="Talk to the founder" text="Message us on WhatsApp, book a 15-minute call, or start with a free 5-product audit." />
    </>
  )
}
