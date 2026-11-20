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
 * While the banner is open its height is reserved so it never covers the focused element (WCAG 2.4.11).
 */
export function initConsent(doc: Document) {
  const win = doc.defaultView!
  persistUtm(readUtm(win.location.search))

  const banner = doc.querySelector<HTMLElement>('[data-consent-banner]')
  const clarityId = banner?.dataset.clarity || undefined
  const root = doc.documentElement
  const spacer = doc.querySelector<HTMLElement>('[data-consent-spacer]')
  let ro: ResizeObserver | null = null

  // Reserve the banner's height without reading layout: ResizeObserver reports it after the browser lays out.
  const reserve = (h: number) => {
    if (spacer) spacer.style.height = `${h}px`
    root.style.scrollPaddingBottom = h ? `${h + 16}px` : ''
  }
  const show = (open: boolean) => {
    if (!banner) return
    banner.hidden = !open
    ro?.disconnect()
    ro = null
    if (open && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver((entries) => {
        const box = entries[0]?.borderBoxSize?.[0]
        reserve(Math.ceil(box ? box.blockSize : (entries[0]?.target as HTMLElement).offsetHeight))
      })
      ro.observe(banner)
    }
    if (!open) reserve(0)
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
      try { win.localStorage.removeItem('3s-consent') } catch { /* storage blocked */ }
      win.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }))
    })
  })
  win.addEventListener(CONSENT_EVENT, apply)
  // Another tab changed the choice.
  win.addEventListener('storage', (e) => { if (e.key === '3s-consent') apply() })
  apply()
}
