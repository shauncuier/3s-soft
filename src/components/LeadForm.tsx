import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { services } from '@/content/services'
import { site, whatsappLink } from '@/content/site'
import type { LeadKind } from '@/lib/lead'

/**
 * Static form markup. src/client/lead-form.ts validates and sends it to Formspree.
 * The <template>s hold the success panel, the failure alert and the error icon the script clones.
 */
export function LeadForm({ kind }: { kind: LeadKind }) {
  const id = (f: string) => `${kind}-${f}`
  const label = (name: string, text: string, required = true) => (
    <label className="ds-field__label" htmlFor={id(name)}>
      {text} <span className="ds-field__req">({required ? 'required' : 'optional'})</span>
    </label>
  )

  return (
    <div data-lead-form={kind}>
      <form noValidate className="flex flex-col gap-5" aria-label={kind === 'audit' ? 'Free listing audit request' : 'Contact form'} action="https://formspree.io/f/mgoyrdky" method="POST">
        <div data-errsum hidden tabIndex={-1} role="alert" aria-labelledby={id('errsum')} className="ds-errsum">
          <h2 id={id('errsum')} className="ds-errsum__title"><AlertCircle size={20} aria-hidden="true" /> <span data-errsum-title /></h2>
          <ul className="ds-errsum__list" data-errsum-list />
        </div>

        {kind === 'contact' && (
          <div className="ds-field" data-field="name">
            {label('name', 'Name')}
            <input id={id('name')} name="name" className="ds-field__input" type="text" autoComplete="name" required />
          </div>
        )}

        {kind === 'audit' && (
          <>
            <div className="ds-field" data-field="storeUrl">
              {label('storeUrl', 'Store or listing URL')}
              <input id={id('storeUrl')} name="storeUrl" className="ds-field__input" type="url" inputMode="url" autoComplete="url" spellCheck={false} required placeholder="https://www.amazon.com/dp/…" />
              <span className="ds-field__hint">A link to your storefront or one of the five products.</span>
            </div>
            {/* Radio chips, not a <select>: one tap on a phone, and far cheaper for the browser to lay out. */}
            <div className="ds-field" data-field="marketplace">
              <span className="ds-field__label" id={id('marketplace-label')}>Marketplace <span className="ds-field__req">(required)</span></span>
              <div role="radiogroup" aria-labelledby={id('marketplace-label')} className="flex flex-wrap gap-2">
                {['Amazon', 'Walmart', 'Shopify', 'Etsy', 'eBay', 'Other'].map((m, i) => (
                  <label key={m} className="choice">
                    <input type="radio" name="marketplace" value={m} id={i === 0 ? id('marketplace') : undefined} className="sr-only" required />
                    <span translate="no">{m}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="ds-field" data-field="email">
          {label('email', 'Email')}
          <input id={id('email')} name="email" className="ds-field__input" type="email" autoComplete="email" spellCheck={false} required placeholder="name@shop.com" />
        </div>

        <div className="ds-field">
          {label('whatsapp', 'WhatsApp number', false)}
          <input id={id('whatsapp')} name="whatsapp" className="ds-field__input" type="tel" inputMode="tel" autoComplete="tel" placeholder="+1 555 010 0000" />
        </div>

        {kind === 'contact' && (
          <>
            <div className="ds-field">
              {label('service', 'Service', false)}
              <select id={id('service')} name="service" className="ds-field__input" defaultValue="">
                <option value="">Not sure yet</option>
                {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
              </select>
            </div>
            <div className="ds-field" data-field="message">
              <label className="ds-field__label" htmlFor={id('message')}>What do you need? <span className="ds-field__req">(required)</span></label>
              <textarea id={id('message')} name="message" className="ds-field__input" rows={5} required placeholder="For example: 40 new Amazon listings with variations…" />
            </div>
          </>
        )}

        {kind === 'audit' && <input type="hidden" name="products" value="5" />}

        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={id('company_website')}>Company website</label>
          <input id={id('company_website')} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div data-failed hidden role="alert" className="ds-errsum">
          <p className="ds-errsum__title m-0"><AlertCircle size={20} aria-hidden="true" /> We couldn’t send your request.</p>
          <p className="m-0">
            Check your connection and try again, or <a className="font-semibold text-green-700 underline" href={whatsappLink()} target="_blank" rel="noopener">message us on WhatsApp</a> or email{' '}
            <a className="font-semibold text-green-700 underline" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>

        <button type="submit" className="ds-btn ds-btn--primary self-start max-sm:w-full" data-label={kind === 'audit' ? 'Send my audit request' : 'Send message'}>
          {kind === 'audit' ? 'Send my audit request' : 'Send message'}
        </button>
        <p className="m-0 text-sm text-ink-muted">We use your details only to reply to this request. See our <a className="underline underline-offset-2" href="/privacy-policy/">privacy policy</a>.</p>
      </form>

      <div data-sent hidden role="status" tabIndex={-1} className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-green-700 bg-green-100 p-6">
        <p className="m-0 flex items-center gap-2 text-lg font-bold"><CheckCircle2 aria-hidden="true" className="text-green-700" /> Thanks, we have your request.</p>
        <p className="m-0">
          {kind === 'audit'
            ? 'We will review your products and email you a short list of fixes. If you want to talk sooner, message us on WhatsApp.'
            : 'We will reply by email. If it is urgent, message us on WhatsApp.'}
        </p>
        <a className="ds-btn ds-btn--secondary self-start" href={whatsappLink()} target="_blank" rel="noopener">WhatsApp us</a>
      </div>

      <template data-icon-alert><AlertCircle size={18} aria-hidden="true" /></template>
    </div>
  )
}
