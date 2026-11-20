'use client'

import { useRef, useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { track, getStoredUtm } from '@/lib/analytics'
import { services } from '@/content/services'
import { site, whatsappLink } from '@/content/site'

export const FORMSPREE_URL = 'https://formspree.io/f/mgoyrdky'

type Fetch = (input: string, init?: RequestInit) => Promise<Response>
export type SubmitResult = { ok: true } | { ok: false; error: string }

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

type FieldErrors = Record<string, string>

function validate(kind: 'audit' | 'contact', data: FormData): FieldErrors {
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

const LABELS: Record<string, string> = {
  storeUrl: 'Store or listing URL', marketplace: 'Marketplace', email: 'Email', name: 'Name', message: 'What do you need',
}

type Status = 'idle' | 'sending' | 'sent' | 'failed'

export function LeadForm({ kind, fetchImpl }: { kind: 'audit' | 'contact'; fetchImpl?: Fetch }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const pending = useRef(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const id = (f: string) => `${kind}-${f}`

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending.current) return
    const data = new FormData(e.currentTarget)

    const found = validate(kind, data)
    setErrors(found)
    const keys = Object.keys(found)
    if (keys.length > 0) {
      requestAnimationFrame(() => {
        if (keys.length > 1) summaryRef.current?.focus()
        else formRef.current?.querySelector<HTMLElement>(`#${id(keys[0])}`)?.focus()
      })
      return
    }

    // Bots fill the hidden field; pretend success and send nothing.
    if (String(data.get('company_website') ?? '') !== '') {
      setStatus('sent')
      return
    }

    pending.current = true
    setStatus('sending')
    data.set('form_type', kind)
    for (const [k, v] of Object.entries(getStoredUtm())) if (v) data.set(k, v)
    data.set('_subject', kind === 'audit' ? 'Free listing audit request (3s-soft.com)' : 'New enquiry (3s-soft.com)')

    const result = await submitLead(data, fetchImpl)
    pending.current = false
    if (result.ok) {
      setStatus('sent')
      track(kind === 'audit' ? 'audit_submit' : 'form_submit', { form_type: kind })
    } else {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-green-700 bg-green-100 p-6">
        <p className="m-0 flex items-center gap-2 text-lg font-bold"><CheckCircle2 aria-hidden="true" className="text-green-700" /> Thanks, we have your request.</p>
        <p className="m-0">
          {kind === 'audit'
            ? 'We will review your products and email you a short list of fixes. If you want to talk sooner, message us on WhatsApp.'
            : 'We will reply by email. If it is urgent, message us on WhatsApp.'}
        </p>
        <a className="ds-btn ds-btn--secondary self-start" href={whatsappLink()} target="_blank" rel="noopener">WhatsApp us</a>
      </div>
    )
  }

  const errorKeys = Object.keys(errors)
  const field = (name: string) => ({
    id: id(name),
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id(name)}-err` : undefined,
    className: 'ds-field__input',
  })
  const err = (name: string) =>
    errors[name] ? (
      <span className="ds-field__error" id={`${id(name)}-err`} role="alert">
        <AlertCircle size={18} aria-hidden="true" /> {errors[name]}
      </span>
    ) : null
  const wrap = (name: string) => `ds-field${errors[name] ? ' ds-field--error' : ''}`

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5" aria-label={kind === 'audit' ? 'Free listing audit request' : 'Contact form'}>
      {errorKeys.length > 1 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby={id('errsum')} className="ds-errsum">
          <h2 id={id('errsum')} className="ds-errsum__title"><AlertCircle size={20} aria-hidden="true" /> Check {errorKeys.length} fields before sending</h2>
          <ul className="ds-errsum__list">
            {errorKeys.map((k) => <li key={k}><a href={`#${id(k)}`}>{LABELS[k]}: {errors[k]}</a></li>)}
          </ul>
        </div>
      )}

      {kind === 'contact' && (
        <div className={wrap('name')}>
          <label className="ds-field__label" htmlFor={id('name')}>Name <span className="ds-field__req">(required)</span></label>
          <input {...field('name')} type="text" autoComplete="name" required />
          {err('name')}
        </div>
      )}

      {kind === 'audit' && (
        <>
          <div className={wrap('storeUrl')}>
            <label className="ds-field__label" htmlFor={id('storeUrl')}>Store or listing URL <span className="ds-field__req">(required)</span></label>
            <input {...field('storeUrl')} type="url" inputMode="url" autoComplete="url" spellCheck={false} required placeholder="https://www.amazon.com/dp/…" />
            <span className="ds-field__hint">A link to your storefront or one of the five products.</span>
            {err('storeUrl')}
          </div>
          <div className={wrap('marketplace')}>
            <label className="ds-field__label" htmlFor={id('marketplace')}>Marketplace <span className="ds-field__req">(required)</span></label>
            <select {...field('marketplace')} required defaultValue="">
              <option value="" disabled>Choose one…</option>
              {['Amazon', 'Walmart', 'Shopify', 'Etsy', 'eBay', 'Other'].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            {err('marketplace')}
          </div>
        </>
      )}

      <div className={wrap('email')}>
        <label className="ds-field__label" htmlFor={id('email')}>Email <span className="ds-field__req">(required)</span></label>
        <input {...field('email')} type="email" autoComplete="email" spellCheck={false} required placeholder="name@shop.com" />
        {err('email')}
      </div>

      <div className="ds-field">
        <label className="ds-field__label" htmlFor={id('whatsapp')}>WhatsApp number <span className="ds-field__req">(optional)</span></label>
        <input id={id('whatsapp')} name="whatsapp" className="ds-field__input" type="tel" inputMode="tel" autoComplete="tel" placeholder="+1 555 010 0000" />
      </div>

      {kind === 'contact' && (
        <>
          <div className="ds-field">
            <label className="ds-field__label" htmlFor={id('service')}>Service <span className="ds-field__req">(optional)</span></label>
            <select id={id('service')} name="service" className="ds-field__input" defaultValue="">
              <option value="">Not sure yet</option>
              {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
            </select>
          </div>
          <div className={wrap('message')}>
            <label className="ds-field__label" htmlFor={id('message')}>What do you need? <span className="ds-field__req">(required)</span></label>
            <textarea {...field('message')} rows={5} required placeholder="For example: 40 new Amazon listings with variations…" />
            {err('message')}
          </div>
        </>
      )}

      {kind === 'audit' && <input type="hidden" name="products" value="5" />}

      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id('company_website')}>Company website</label>
        <input id={id('company_website')} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'failed' && (
        <div role="alert" className="ds-errsum">
          <p className="ds-errsum__title m-0"><AlertCircle size={20} aria-hidden="true" /> We couldn’t send your request.</p>
          <p className="m-0">Check your connection and try again, or <a className="font-semibold text-green-700 underline" href={whatsappLink()} target="_blank" rel="noopener">message us on WhatsApp</a> or email <span className="font-semibold">{site.email}</span>.</p>
        </div>
      )}

      <button type="submit" className="ds-btn ds-btn--primary self-start max-sm:w-full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : kind === 'audit' ? 'Send my audit request' : 'Send message'}
      </button>
      <p className="m-0 text-sm text-ink-muted">We use your details only to reply to this request. See our <a className="underline underline-offset-2" href="/privacy-policy/">privacy policy</a>.</p>
    </form>
  )
}
