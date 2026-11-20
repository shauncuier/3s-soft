import type { Metadata } from 'next'
import { CalendarDays, Mail, MessageCircle, Phone, MapPin } from 'lucide-react'
import { LeadForm } from '@/components/LeadForm'
import { NoCtaBar } from '@/components/MobileCtaBar'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TrackedLink } from '@/components/TrackedLink'
import { site, whatsappLink } from '@/content/site'
import { getProof } from '@/content/proof'

export const metadata: Metadata = {
  title: 'Contact 3s-Soft',
  description: 'Message 3s-Soft on WhatsApp, book a 15-minute call or send a project brief. eCommerce listing and catalogue work for Amazon, Shopify and Walmart sellers.',
  alternates: { canonical: '/contact/' },
}

export default function ContactPage() {
  const response = getProof('fiverr-response').value.replace('~', 'about ')
  return (
    <section aria-labelledby="contact-title">
      <NoCtaBar />
      <div className="container-site grid gap-12 py-10 md:py-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <Breadcrumbs items={[{ name: 'Contact', path: '/contact/' }]} />
          <h1 id="contact-title" className="page-title m-0">Let’s talk about your catalogue</h1>
          <p className="prose-measure m-0 text-lg text-ink-muted">
            Tell us what you sell and where. You get a fixed quote before any work starts. On Fiverr our average reply time is {response}.
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            <li>
              <TrackedLink className="flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-surface-0 px-4 font-semibold hover:border-green-700" href={whatsappLink()} event="whatsapp_click" external>
                <MessageCircle className="text-green-700" aria-hidden="true" /> WhatsApp: {site.phone}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink className="flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-surface-0 px-4 font-semibold hover:border-green-700" href={site.bookingUrl} event="book_call_click" external>
                <CalendarDays className="text-green-700" aria-hidden="true" /> Book a 15-minute video call
              </TrackedLink>
            </li>
            <li className="flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-surface-0 px-4">
              <Mail className="text-green-700" aria-hidden="true" />
              <span>Email: <a className="font-semibold select-all hover:text-green-700" href={`mailto:${site.email}`}>{site.email}</a></span>
            </li>
            <li className="flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-surface-0 px-4">
              <Phone className="text-green-700" aria-hidden="true" />
              <span>Phone: <a className="font-semibold hover:text-green-700" href={site.phoneHref}>{site.phone}</a></span>
            </li>
            <li className="flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-surface-0 px-4">
              <MapPin className="text-green-700" aria-hidden="true" />
              <span>{site.address.city}, {site.address.country}. UK clients: <a className="font-semibold text-green-700 underline underline-offset-2" href={site.ukUrl}>3s-soft.co.uk</a></span>
            </li>
          </ul>
          <p className="m-0 text-sm text-ink-muted">
            Also available on{' '}
            <TrackedLink className="font-semibold underline underline-offset-2" href={site.fiverrUrl} event="fiverr_click" external translate="no">Fiverr</TrackedLink> &amp;{' '}
            <TrackedLink className="font-semibold underline underline-offset-2" href={site.upworkAgencyUrl} event="upwork_click" external translate="no">Upwork</TrackedLink>
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-line bg-surface-0 p-6 shadow-[var(--shadow-card)] md:p-8">
          <h2 className="ds-display mt-0 mb-1 text-2xl font-bold">Send a project brief</h2>
          <p className="mt-0 mb-6 text-ink-muted">We reply by email.</p>
          <LeadForm kind="contact" />
        </div>
      </div>
    </section>
  )
}
