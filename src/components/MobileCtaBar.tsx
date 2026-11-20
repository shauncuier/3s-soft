import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/content/site'
import { AUDIT_HREF } from '@/content/nav'
import { TrackedLink } from './TrackedLink'

/** Sticky phone bar. Hidden by CSS on pages that render <NoCtaBar /> (the form pages). */
export function MobileCtaBar() {
  return (
    <div className="ds-ctabar fixed inset-x-0 bottom-0 md:hidden" data-cta-bar data-testid="mobile-cta-bar">
      <TrackedLink className="ds-btn ds-btn--secondary" href={whatsappLink()} event="whatsapp_click" external>
        <MessageCircle aria-hidden="true" /> WhatsApp
      </TrackedLink>
      <a className="ds-btn ds-btn--primary" href={AUDIT_HREF}>Free audit</a>
    </div>
  )
}

/** Marker for pages where the form is the action: hides the phone CTA bar and its spacing. */
export function NoCtaBar() {
  return <span data-no-cta-bar hidden />
}
