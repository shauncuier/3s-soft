import { getConsent, setConsent, CONSENT_EVENT, GA_ID, readUtm, persistUtm, revokeTracking } from '../lib/analytics'

function loadTrackers(doc: Document, clarityId?: string) {
  if (doc.getElementById('ga4')) return
  const win = doc.defaultView! as Window & { dataLayer?: unknown[] }
  const ga = doc.createElement('script')
  ga.id = 'ga4'
  ga.async = true
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  doc.head.appendChild(ga)
  win.dataLayer = win.dataLayer || []
  win.gtag = function gtag() {
    // gtag reads the arguments object, not an array.
    win.dataLayer!.push(arguments)
  }
  win.gtag('js', new Date())
  win.gtag('config', GA_ID, { anonymize_ip: true })
  if (clarityId) {
    const c = doc.createElement('script')
    c.async = true
    c.src = `https://www.clarity.ms/tag/${clarityId}`
    doc.head.appendChild(c)
  }
}

/**
 * Cookie banner (static, hidden markup) and tracker loading. Trackers load only after "Allow analytics".
 * While the banner is open, CSS reserves its height so it never covers the focused element (WCAG 2.4.11).
 */
export function initConsent(doc: Document) {
  const win = doc.defaultView!
  persistUtm(readUtm(win.location.search))

  const banner = doc.querySelector<HTMLElement>('[data-consent-banner]')
  const clarityId = banner?.dataset.clarity || undefined
  // Space under the open banner is reserved in CSS (globals.css, [data-consent-spacer]): nothing is measured here,
  // so showing the banner never forces a layout of the page.
  const show = (open: boolean) => {
    if (banner) banner.hidden = !open
  }

  const apply = () => {
    const c = getConsent()
    show(c === null)
    if (c === 'granted') loadTrackers(doc, clarityId)
    // Declined after allowing in this visit: switch trackers off, drop their cookies, reload without them.
    if (c === 'denied' && doc.getElementById('ga4')) {
      revokeTracking()
      win.location.reload()
    }
  }

  banner?.querySelectorAll<HTMLButtonElement>('[data-consent]').forEach((b) => {
    b.addEventListener('click', () => setConsent(b.dataset.consent as 'granted' | 'denied'))
  })
  doc.querySelectorAll<HTMLButtonElement>('[data-consent-reset]').forEach((b) => {
    b.addEventListener('click', () => {
      try { win.localStorage.removeItem('3s-consent'); win.sessionStorage.removeItem('3s-consent') } catch { /* storage blocked */ }
      win.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }))
    })
  })
  win.addEventListener(CONSENT_EVENT, apply)
  // Another tab changed the choice.
  win.addEventListener('storage', (e) => { if (e.key === '3s-consent') apply() })
  apply()
}
