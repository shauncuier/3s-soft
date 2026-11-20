'use client'

import Link from 'next/link'
import { useEffect, useSyncExternalStore } from 'react'
import { getConsent, setConsent, CONSENT_EVENT, GA_ID, readUtm, persistUtm, type Consent } from '@/lib/analytics'

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange)
  return () => window.removeEventListener(CONSENT_EVENT, onChange)
}

/** On the server and before hydration the choice is unknown, so the banner stays out of the static HTML. */
const SERVER_SNAPSHOT = 'pending' as const

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

function loadTrackers() {
  if (document.getElementById('ga4')) return
  const ga = document.createElement('script')
  ga.id = 'ga4'
  ga.async = true
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(ga)
  const w = window as Window & { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  window.gtag = function gtag() {
    w.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { anonymize_ip: true })

  if (CLARITY_ID) {
    const c = document.createElement('script')
    c.async = true
    c.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
    document.head.appendChild(c)
  }
}

/** Asks once for analytics consent. Trackers load only after "Allow analytics". */
export function ConsentBanner() {
  const consent = useSyncExternalStore<Consent | typeof SERVER_SNAPSHOT>(subscribe, getConsent, () => SERVER_SNAPSHOT)

  useEffect(() => {
    persistUtm(readUtm(window.location.search))
  }, [])

  useEffect(() => {
    if (consent === 'granted') loadTrackers()
  }, [consent])

  if (consent !== null) return null

  return (
    <section
      aria-label="Cookie choice"
      className="fixed inset-x-0 bottom-0 border-t border-line bg-surface-0 shadow-[var(--shadow-bar)]"
      style={{ zIndex: 'var(--z-consent)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="container-site flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="prose-measure text-sm">
          We use Google Analytics and Microsoft Clarity to see which pages help sellers. They set cookies, so they only run if you allow them.{' '}
          <Link className="font-semibold text-green-700 underline underline-offset-2" href="/cookies/">Cookie policy</Link>
        </p>
        <div className="flex gap-3">
          <button type="button" className="ds-btn ds-btn--secondary" onClick={() => setConsent('denied')}>Decline</button>
          <button type="button" className="ds-btn ds-btn--primary" onClick={() => setConsent('granted')}>Allow analytics</button>
        </div>
      </div>
    </section>
  )
}
