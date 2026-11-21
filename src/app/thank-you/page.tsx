import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Mail, MessageCircle } from 'lucide-react'
import { PageHero } from '@/components/kit/PageHero'
import { WorkCard } from '@/components/WorkCard'
import { SectionHeading } from '@/components/SectionHeading'
import { TrackedLink } from '@/components/TrackedLink'
import { NoCtaBar } from '@/components/MobileCtaBar'
import { selectedWork } from '@/content/home'
import { site, whatsappLink } from '@/content/site'

/** Where both forms land after a successful send (/thank-you/?form=audit or ?form=contact). Not in the sitemap. */
export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your request reached 3s-Soft. Here is what happens next.',
  alternates: { canonical: '/thank-you/' },
  robots: { index: false, follow: true },
}

const steps = [
  {
    title: 'Check your inbox',
    text: `We reply from ${site.email}. If nothing arrives, check your spam or promotions folder.`,
  },
  {
    title: 'Get your answer',
    text: 'For a free audit, we review five of your products and email you a short list of fixes. For other requests, we reply with questions or a fixed quote before any work starts.',
  },
  {
    title: 'Talk sooner if you like',
    text: 'If it is urgent, message us on WhatsApp or book a 15-minute call. Mention the email you used so we can find your request.',
  },
]

export default function ThankYouPage() {
  return (
    <>
      <NoCtaBar />
      <PageHero
        id="thanks-title"
        eyebrow="Request received"
        title="Thanks, we have your request"
        intro="Your details reached our team. You don’t need to send anything else."
      >
        <div className="flex flex-wrap gap-3">
          <TrackedLink className="ds-btn ds-btn--primary" href={whatsappLink('Hi 3s-Soft, I just sent a request on your website.')} event="whatsapp_click" external>
            <MessageCircle aria-hidden="true" /> WhatsApp us
          </TrackedLink>
          <TrackedLink className="ds-btn ds-btn--secondary" href={site.bookingUrl} event="book_call_click" external>
            <CalendarDays aria-hidden="true" /> Book a 15-min call
          </TrackedLink>
        </div>
      </PageHero>

      <section aria-labelledby="next" className="section">
        <div className="container-site">
          <SectionHeading id="next" title="What happens next" />
          <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface-0 p-6">
                <span className="font-mono text-sm font-medium text-green-700" aria-hidden="true">0{i + 1}</span>
                <h3 className="m-0 text-lg font-bold">{step.title}</h3>
                <p className="m-0 text-ink-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 mb-0 flex items-center gap-2 text-ink-muted">
            <Mail size={18} aria-hidden="true" className="text-green-700" />
            Wrong email address in the form? Write to <a className="font-semibold text-green-700 underline underline-offset-2" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>

      <section aria-labelledby="while-you-wait" className="section border-t border-line bg-surface-0">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="while-you-wait" title="While you wait" intro="Recent work for sellers like you." />
            <Link className="mb-8 inline-flex min-h-11 items-center gap-1 font-semibold text-green-700 hover:underline md:mb-10" href="/reviews/">
              Read seller reviews <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedWork.slice(0, 3).map((w) => <WorkCard key={w.slug} item={w} />)}
          </div>
        </div>
      </section>
    </>
  )
}
