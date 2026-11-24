import { getConsent, setConsent, track, readUtm, persistUtm, getStoredUtm, revokeTracking } from '@/lib/analytics'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  window.gtag = vi.fn()
})

test('readUtm keeps only utm_ params', () => {
  expect(readUtm('?utm_source=linkedin&utm_campaign=nov&x=1')).toEqual({ utm_source: 'linkedin', utm_campaign: 'nov' })
})

test('readUtm returns empty object without utm params', () => {
  expect(readUtm('?ref=abc')).toEqual({})
})

test('track does nothing when consent is unset', () => {
  track('whatsapp_click')
  expect(window.gtag).not.toHaveBeenCalled()
})

test('track does nothing when consent is denied', () => {
  setConsent('denied')
  track('whatsapp_click')
  expect(window.gtag).not.toHaveBeenCalled()
})

test('track sends the event when consent is granted', () => {
  setConsent('granted')
  track('audit_submit', { utm_source: 'linkedin' })
  expect(window.gtag).toHaveBeenCalledWith('event', 'audit_submit', { utm_source: 'linkedin' })
})

test('getConsent returns null when storage throws', () => {
  const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
  expect(getConsent()).toBeNull()
  spy.mockRestore()
})

test('UTM values persist for the session', () => {
  persistUtm({ utm_source: 'email', utm_campaign: 'q4' })
  expect(getStoredUtm()).toEqual({ utm_source: 'email', utm_campaign: 'q4' })
})

test('persistUtm does not overwrite stored UTM with an empty set', () => {
  persistUtm({ utm_source: 'email' })
  persistUtm({})
  expect(getStoredUtm()).toEqual({ utm_source: 'email' })
})

test('revokeTracking turns analytics consent off in loaded trackers and removes their cookies', () => {
  const gtag = vi.fn()
  const clarity = vi.fn()
  window.gtag = gtag
  ;(window as unknown as { clarity: unknown }).clarity = clarity
  document.cookie = '_ga=GA1.1.123; path=/'
  document.cookie = '_clck=abc; path=/'
  document.cookie = 'keep=yes; path=/'
  revokeTracking()
  expect(gtag).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'denied' })
  expect(clarity).toHaveBeenCalledWith('consent', false)
  expect(document.cookie).not.toMatch(/_ga=|_clck=/)
  expect(document.cookie).toMatch(/keep=yes/)
})

test('allowing analytics is remembered for good: it survives a new visit', () => {
  setConsent('granted')
  sessionStorage.clear() // a new visit starts with empty session storage
  expect(getConsent()).toBe('granted')
})

test('declining lasts for this visit only, so the banner asks again next visit', () => {
  setConsent('denied')
  expect(getConsent()).toBe('denied')
  expect(localStorage.getItem('3s-consent')).toBeNull()
  sessionStorage.clear()
  expect(getConsent()).toBeNull()
})

test('declining after allowing removes the stored permission', () => {
  setConsent('granted')
  setConsent('denied')
  expect(localStorage.getItem('3s-consent')).toBeNull()
  expect(getConsent()).toBe('denied')
})

test('an old "declined" saved forever by the previous banner is ignored, so the banner shows again', () => {
  localStorage.setItem('3s-consent', 'denied')
  expect(getConsent()).toBeNull()
})
