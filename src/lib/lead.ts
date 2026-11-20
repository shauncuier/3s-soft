export const FORMSPREE_URL = 'https://formspree.io/f/mgoyrdky'

export type Fetch = (input: string, init?: RequestInit) => Promise<Response>
export type SubmitResult = { ok: true } | { ok: false; error: string }
export type LeadKind = 'audit' | 'contact'
export type FieldErrors = Record<string, string>

/** Posts a lead to Formspree. Never throws. */
export async function submitLead(data: FormData, fetchImpl: Fetch = fetch): Promise<SubmitResult> {
  try {
    const res = await fetchImpl(FORMSPREE_URL, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
    return res.ok ? { ok: true } : { ok: false, error: `Server responded ${res.status}` }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network error' }
  }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function isUrl(value: string) {
  try {
    const u = new URL(value)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

export function validateLead(kind: LeadKind, data: FormData): FieldErrors {
  const e: FieldErrors = {}
  const get = (k: string) => String(data.get(k) ?? '').trim()
  if (kind === 'audit') {
    if (!isUrl(get('storeUrl'))) e.storeUrl = 'Enter a full link to your store or a listing, starting with https://'
    if (!get('marketplace')) e.marketplace = 'Choose the marketplace you sell on.'
  } else {
    if (!get('name')) e.name = 'Enter your name.'
    if (get('message').length < 10) e.message = 'Tell us a little about what you need (at least 10 characters).'
  }
  if (!EMAIL.test(get('email'))) e.email = 'Enter a full email address, like name@shop.com.'
  return e
}

export const LEAD_LABELS: Record<string, string> = {
  storeUrl: 'Store or listing URL', marketplace: 'Marketplace', email: 'Email', name: 'Name', message: 'What do you need',
}
