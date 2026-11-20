import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { site, whatsappLink } from '@/content/site'
import { AUDIT_HREF } from '@/content/nav'

/** Dark closing panel used at the end of every page. */
export function CtaPanel({ title, text, id = 'closing-cta' }: { title: string; text: string; id?: string }) {
  return (
    <section aria-labelledby={id} className="section">
      <div className="container-site">
        <div className="grid gap-8 rounded-[var(--radius-lg,24px)] bg-ink px-6 py-12 text-surface-0 md:px-14 md:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div className="flex flex-col gap-4">
            <h2 id={id} className="ds-display m-0 max-w-[22ch] text-[30px] leading-[36px] font-bold tracking-[-0.01em] md:text-[40px] md:leading-[46px]">{title}</h2>
            <p className="m-0 max-w-[60ch] text-lg opacity-85">{text}</p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link className="ds-btn ds-btn--primary" href={AUDIT_HREF}>Get a free 5-product audit <ArrowRight size={18} aria-hidden="true" /></Link>
              <a className="ds-btn ds-btn--secondary" href={whatsappLink()} target="_blank" rel="noopener">WhatsApp us</a>
            </div>
            <p className="m-0 text-sm opacity-85">
              <a className="font-semibold underline underline-offset-2" href={site.bookingUrl} target="_blank" rel="noopener">Book a 15-min call</a>
              {' · '}Also available on{' '}
              <a className="font-semibold underline underline-offset-2" href={site.fiverrUrl} target="_blank" rel="noopener" translate="no">Fiverr</a> &amp;{' '}
              <a className="font-semibold underline underline-offset-2" href={site.upworkAgencyUrl} target="_blank" rel="noopener" translate="no">Upwork</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
