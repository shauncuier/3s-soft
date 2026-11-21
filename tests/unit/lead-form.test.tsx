import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LeadForm } from '@/components/LeadForm'
import { submitLead } from '@/lib/lead'
import { initLeadForms } from '@/client/lead-form'
import { setConsent, persistUtm } from '@/lib/analytics'

declare global { interface Window { gtag?: (...args: unknown[]) => void } }

const ok = () => Promise.resolve(new Response('{"ok":true}', { status: 200 }))

function fillAudit() {
  fireEvent.change(screen.getByLabelText(/Store or listing URL/), { target: { value: 'https://www.amazon.com/dp/B0TEST' } })
  fireEvent.click(screen.getByRole('radio', { name: 'Amazon' }))
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'seller@shop.com' } })
}

type F = (input: string, init?: RequestInit) => Promise<Response>
let navigate = vi.fn()
function mount(kind: 'audit' | 'contact', fetchImpl: F) {
  navigate = vi.fn()
  const r = render(<LeadForm kind={kind} />)
  initLeadForms(document, fetchImpl, navigate)
  return r
}

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  window.gtag = vi.fn()
})

test('submitLead posts a JSON-accepting request to our own mail handler', async () => {
  const fetchImpl = vi.fn(ok)
  const fd = new FormData()
  fd.set('email', 'a@b.co')
  const res = await submitLead(fd, fetchImpl)
  expect(res).toEqual({ ok: true })
  const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
  expect(url).toBe('/api/lead.php')
  expect((init.headers as Record<string, string>).Accept).toBe('application/json')
})

test('submitLead reports a server error', async () => {
  const res = await submitLead(new FormData(), () => Promise.resolve(new Response('', { status: 500 })))
  expect(res.ok).toBe(false)
})

test('submitLead reports a network failure', async () => {
  const res = await submitLead(new FormData(), () => Promise.reject(new Error('offline')))
  expect(res.ok).toBe(false)
})

test('a filled honeypot never reaches the network', async () => {
  const fetchImpl = vi.fn(ok)
  const { container } = mount('audit', fetchImpl)
  fillAudit()
  ;(container.querySelector('input[name="company_website"]') as HTMLInputElement).value = 'spam'
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/Thanks/))
  expect(fetchImpl).not.toHaveBeenCalled()
})

test('invalid email and URL show inline errors and do not submit', async () => {
  const fetchImpl = vi.fn(ok)
  mount('audit', fetchImpl)
  fireEvent.change(screen.getByLabelText(/Store or listing URL/), { target: { value: 'not a url' } })
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'seller@shop' } })
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  // Two errors: each message appears inline and in the linked error summary.
  expect((await screen.findAllByText(/Enter a full link/)).length).toBe(2)
  expect(screen.getAllByText(/Enter a full email address/).length).toBe(2)
  // Marketplace was left empty too, so three fields are listed.
  expect(screen.getByRole('heading', { name: /Check 3 fields/ })).toBeTruthy()
  expect(screen.getByLabelText(/^Email/).getAttribute('aria-invalid')).toBe('true')
  expect(fetchImpl).not.toHaveBeenCalled()
})

test('a server error keeps the input and re-enables the button', async () => {
  mount('audit', () => Promise.resolve(new Response('', { status: 500 })))
  fillAudit()
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  expect(await screen.findByText(/couldn’t send/i)).toBeTruthy()
  expect((screen.getByLabelText(/^Email/) as HTMLInputElement).value).toBe('seller@shop.com')
  expect(screen.getByRole('button', { name: /send/i }).hasAttribute('disabled')).toBe(false)
})

test('a double click sends one request', async () => {
  let resolve!: (r: Response) => void
  const fetchImpl = vi.fn(() => new Promise<Response>((r) => { resolve = r }))
  mount('audit', fetchImpl)
  fillAudit()
  const button = screen.getByRole('button', { name: /send/i })
  fireEvent.click(button)
  fireEvent.click(button)
  expect(fetchImpl).toHaveBeenCalledTimes(1)
  resolve(new Response('{}', { status: 200 }))
  await screen.findByRole('status')
})

test('success shows a message, tracks the event and posts UTM fields', async () => {
  setConsent('granted')
  persistUtm({ utm_source: 'linkedin', utm_campaign: 'nov' })
  const fetchImpl = vi.fn(ok)
  mount('audit', fetchImpl)
  fillAudit()
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/Thanks/))
  const body = (fetchImpl.mock.calls[0] as unknown as [string, RequestInit])[1].body as FormData
  expect(body.get('utm_source')).toBe('linkedin')
  expect(body.get('form_type')).toBe('audit')
  expect(window.gtag).toHaveBeenCalledWith('event', 'audit_submit', expect.anything())
})

test('contact form tracks form_submit', async () => {
  setConsent('granted')
  mount('contact', vi.fn(ok))
  fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: 'Sam' } })
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'sam@shop.com' } })
  fireEvent.change(screen.getByLabelText(/What do you need/), { target: { value: 'Help with 40 Amazon listings.' } })
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  await waitFor(() => expect(window.gtag).toHaveBeenCalledWith('event', 'form_submit', expect.anything()))
})

test('success moves focus to the confirmation', async () => {
  mount('audit', vi.fn(ok))
  fillAudit()
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('status')))
})

test('the failure message links the email address', async () => {
  mount('audit', () => Promise.resolve(new Response('', { status: 500 })))
  fillAudit()
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  await screen.findByText(/couldn’t send/i)
  expect(screen.getByRole('link', { name: 'info@3s-soft.com' }).getAttribute('href')).toBe('mailto:info@3s-soft.com')
})

test('marketplace is a group of radio choices, one tap on a phone', () => {
  mount('audit', vi.fn(ok))
  const group = screen.getByRole('radiogroup', { name: /Marketplace/ })
  expect(group.querySelectorAll('input[type="radio"][name="marketplace"]')).toHaveLength(6)
  expect(document.querySelector('form[aria-label="Free listing audit request"] select')).toBeNull()
})

test('a missing marketplace marks the group and focuses its first choice', async () => {
  mount('audit', vi.fn(ok))
  fireEvent.change(screen.getByLabelText(/Store or listing URL/), { target: { value: 'https://www.amazon.com/dp/B0TEST' } })
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'seller@shop.com' } })
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  expect(await screen.findByText(/Choose the marketplace/)).toBeTruthy()
  expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'Amazon' }))
})

test('the form posts to our own handler even without JavaScript, with its type', () => {
  mount('contact', vi.fn(ok))
  const form = document.querySelector('form[aria-label="Contact form"]')!
  expect(form.getAttribute('action')).toBe('/api/lead.php')
  expect(form.querySelector<HTMLInputElement>('input[type="hidden"][name="form_type"]')!.value).toBe('contact')
  expect(document.body.innerHTML).not.toMatch(/formspree/i)
})

test('a refused request (rate limit or server error) shows the failure message', async () => {
  mount('audit', () => Promise.resolve(new Response('{"ok":false}', { status: 429 })))
  fillAudit()
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  expect(await screen.findByText(/couldn’t send/i)).toBeTruthy()
})

test('after a successful send the visitor goes to the thank-you page for that form', async () => {
  mount('audit', vi.fn(ok))
  fillAudit()
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  await waitFor(() => expect(navigate).toHaveBeenCalledWith('/thank-you/?form=audit'))
})

test('a failed send stays on the page and does not go to the thank-you page', async () => {
  mount('audit', () => Promise.resolve(new Response('', { status: 500 })))
  fillAudit()
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  await screen.findByText(/couldn’t send/i)
  expect(navigate).not.toHaveBeenCalled()
})
