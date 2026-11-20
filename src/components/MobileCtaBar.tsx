'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/content/site'
import { AUDIT_HREF, NO_CTA_BAR } from '@/content/nav'
import { TrackedLink } from './TrackedLink'

export function MobileCtaBar() {
  const pathname = usePathname() ?? '/'
  const hidden = NO_CTA_BAR.includes(pathname)

  useEffect(() => {
    document.documentElement.classList.toggle('has-cta-bar', !hidden)
  }, [hidden])

  if (hidden) return null

  return (
    <div className="ds-ctabar fixed inset-x-0 bottom-0 md:hidden" data-testid="mobile-cta-bar">
      <TrackedLink className="ds-btn ds-btn--secondary" href={whatsappLink()} event="whatsapp_click" external>
        <MessageCircle aria-hidden="true" /> WhatsApp
      </TrackedLink>
      <Link className="ds-btn ds-btn--primary" href={AUDIT_HREF}>Free audit</Link>
    </div>
  )
}
