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

/**
 * "Allow" is kept in localStorage, so the banner never asks again.
 * "Decline" is kept in sessionStorage only: it holds for this visit, and the banner asks again next visit.
 * A "denied" left in localStorage by the earlier banner is ignored.
 */
export function getConsent(): Consent {
  try {
    if (localStorage.getItem(CONSENT_KEY) === 'granted') return 'granted'
    return sessionStorage.getItem(CONSENT_KEY) === 'denied' ? 'denied' : null
  } catch {
    return null
  }
}

export function setConsent(consent: 'granted' | 'denied'): void {
  try {
    if (consent === 'granted') {
      localStorage.setItem(CONSENT_KEY, 'granted')
      sessionStorage.removeItem(CONSENT_KEY)
    } else {
      localStorage.removeItem(CONSENT_KEY)
      sessionStorage.setItem(CONSENT_KEY, 'denied')
    }
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

const TRACKER_COOKIE = /^(_ga|_gid|_gat|_clck|_clsk|CLID|MUID|ANONCHK|SM)(_|$)/

/**
 * Withdraws consent in trackers that already loaded this visit and deletes their cookies.
 * The caller reloads the page afterwards so no tracker code keeps running.
 */
export function revokeTracking(): void {
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  ;(window as Window & { clarity?: (...args: unknown[]) => void }).clarity?.('consent', false)
  const host = window.location.hostname
  const parts = host.split('.')
  const domains = ['', host, ...parts.map((_, i) => '.' + parts.slice(i).join('.')).filter((d) => d.split('.').length > 2)]
  for (const pair of document.cookie.split(';')) {
    const name = pair.split('=')[0].trim()
    if (!TRACKER_COOKIE.test(name)) continue
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`
    }
  }
}
