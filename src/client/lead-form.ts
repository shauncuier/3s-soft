import { track, getStoredUtm } from '../lib/analytics'
import { submitLead, validateLead, LEAD_LABELS, type Fetch, type LeadKind } from '../lib/lead'

function iconFrom(root: Element): Element | null {
  const tpl = root.querySelector('template[data-icon-alert]') as HTMLTemplateElement | null
  if (!tpl) return null
  // Server-rendered templates keep children in .content; client-rendered ones (tests) keep them inline.
  const el = tpl.content?.firstElementChild ?? tpl.firstElementChild
  return el ? el.cloneNode(true) as Element : null
}

/** Wires every [data-lead-form] block: validation, error summary, honeypot, one request at a time, success and failure states. */
export function initLeadForms(doc: Document, fetchImpl?: Fetch) {
  doc.querySelectorAll<HTMLElement>('[data-lead-form]').forEach((root) => {
    const kind = root.dataset.leadForm as LeadKind
    const form = root.querySelector('form')!
    const summary = root.querySelector<HTMLElement>('[data-errsum]')!
    const failed = root.querySelector<HTMLElement>('[data-failed]')!
    const sent = root.querySelector<HTMLElement>('[data-sent]')!
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!
    const id = (f: string) => `${kind}-${f}`
    let pending = false

    function showErrors(errors: Record<string, string>) {
      form.querySelectorAll('[data-field]').forEach((wrap) => {
        const name = (wrap as HTMLElement).dataset.field!
        const input = wrap.querySelector<HTMLElement>('input, select, textarea')!
        wrap.querySelector('.ds-field__error')?.remove()
        const msg = errors[name]
        wrap.classList.toggle('ds-field--error', Boolean(msg))
        if (msg) {
          input.setAttribute('aria-invalid', 'true')
          input.setAttribute('aria-describedby', `${id(name)}-err`)
          const span = doc.createElement('span')
          span.className = 'ds-field__error'
          span.id = `${id(name)}-err`
          span.setAttribute('role', 'alert')
          const icon = iconFrom(root)
          if (icon) span.append(icon, ' ')
          span.append(msg)
          wrap.append(span)
        } else {
          input.removeAttribute('aria-invalid')
          input.removeAttribute('aria-describedby')
        }
      })
      const keys = Object.keys(errors)
      summary.hidden = keys.length < 2
      if (keys.length > 1) {
        summary.querySelector('[data-errsum-title]')!.textContent = `Check ${keys.length} fields before sending`
        const list = summary.querySelector('[data-errsum-list]')!
        list.replaceChildren(...keys.map((k) => {
          const li = doc.createElement('li')
          const a = doc.createElement('a')
          a.href = `#${id(k)}`
          a.textContent = `${LEAD_LABELS[k]}: ${errors[k]}`
          li.append(a)
          return li
        }))
      }
      return keys
    }

    function done() {
      form.hidden = true
      sent.hidden = false
      sent.focus()
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      if (pending) return
      const data = new FormData(form)
      const keys = showErrors(validateLead(kind, data))
      if (keys.length > 0) {
        if (keys.length > 1) summary.focus()
        else doc.getElementById(id(keys[0]))?.focus()
        return
      }

      // Bots fill the hidden field; pretend success and send nothing.
      if (String(data.get('company_website') ?? '') !== '') return done()

      pending = true
      failed.hidden = true
      button.disabled = true
      button.textContent = 'Sending…'
      data.set('form_type', kind)
      for (const [k, v] of Object.entries(getStoredUtm())) if (v) data.set(k, v)

      const result = await submitLead(data, fetchImpl)
      pending = false
      button.disabled = false
      button.textContent = button.dataset.label ?? 'Send'
      if (result.ok) {
        track(kind === 'audit' ? 'audit_submit' : 'form_submit', { form_type: kind })
        done()
      } else {
        failed.hidden = false
      }
    })
  })
}
