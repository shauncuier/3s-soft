export type Consent = 'granted' | 'denied' | null

export type TrackEvent =
  | 'whatsapp_click'
  | 'book_call_click'
  | 'form_submit'
  | 'audit_submit'
  | 'fiverr_click'
  | 'upwork_click'

export type Utm = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

export const GA_ID = 'G-JG742N2K6Z'
const CONSENT_KEY = '3s-consent'
const UTM_KEY = '3s-utm'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
export const CONSENT_EVENT = '3s-consent-change'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function getConsent(): Consent {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function setConsent(consent: 'granted' | 'denied'): void {
  try {
    localStorage.setItem(CONSENT_KEY, consent)
  } catch {
    // Storage blocked: the choice lasts for this page view only.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }))
}

export function track(event: TrackEvent, params?: Record<string, string>): void {
  if (getConsent() !== 'granted') return
  window.gtag?.('event', event, params)
}

export function readUtm(search: string): Utm {
  const params = new URLSearchParams(search)
  const utm: Utm = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) utm[key] = value
  }
  return utm
}

export function persistUtm(utm: Utm): void {
  if (Object.keys(utm).length === 0) return
  try {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(utm))
  } catch {
    // Storage blocked: UTM attribution is lost for this visit.
  }
}

export function getStoredUtm(): Utm {
  try {
    const raw = sessionStorage.getItem(UTM_KEY)
    return raw ? (JSON.parse(raw) as Utm) : {}
  } catch {
    return {}
  }
}
