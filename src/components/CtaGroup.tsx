import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { site, whatsappLink } from '@/content/site'
import { AUDIT_HREF } from '@/content/nav'
import { TrackedLink } from './TrackedLink'

type Props = {
  variant?: 'primary' | 'compact'
  showMarketplaces?: boolean
}

/** The site's three ways to start: free audit (primary), WhatsApp, a 15-minute call. */
export function CtaGroup({ variant = 'primary', showMarketplaces = false }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Link className="ds-btn ds-btn--primary" href={AUDIT_HREF}>
          Get a free 5-product audit <ArrowRight aria-hidden="true" />
        </Link>
        <TrackedLink className="ds-btn ds-btn--secondary" href={whatsappLink()} event="whatsapp_click" external>
          <MessageCircle aria-hidden="true" /> WhatsApp us
        </TrackedLink>
        {variant === 'primary' && (
          <TrackedLink className="ds-btn ds-btn--quiet" href={site.bookingUrl} event="book_call_click" external>
            Book a 15-min call
          </TrackedLink>
        )}
      </div>
      {showMarketplaces && (
        <p className="text-sm text-ink-muted">
          Also available on{' '}
          <TrackedLink className="underline underline-offset-2 hover:text-green-700" href={site.fiverrUrl} event="fiverr_click" external translate="no">
            Fiverr
          </TrackedLink>{' '}
          &amp;{' '}
          <TrackedLink className="underline underline-offset-2 hover:text-green-700" href={site.upworkAgencyUrl} event="upwork_click" external translate="no">
            Upwork
          </TrackedLink>
        </p>
      )}
    </div>
  )
}
