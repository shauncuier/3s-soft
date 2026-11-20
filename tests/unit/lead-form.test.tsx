import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LeadForm, submitLead } from '@/components/LeadForm'
import { setConsent, persistUtm } from '@/lib/analytics'

declare global { interface Window { gtag?: (...args: unknown[]) => void } }

const ok = () => Promise.resolve(new Response('{"ok":true}', { status: 200 }))

function fillAudit() {
  fireEvent.change(screen.getByLabelText(/Store or listing URL/), { target: { value: 'https://www.amazon.com/dp/B0TEST' } })
  fireEvent.change(screen.getByLabelText(/Marketplace/), { target: { value: 'Amazon' } })
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'seller@shop.com' } })
}

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  window.gtag = vi.fn()
})

test('submitLead posts JSON-accepting request to Formspree', async () => {
  const fetchImpl = vi.fn(ok)
  const fd = new FormData()
  fd.set('email', 'a@b.co')
  const res = await submitLead(fd, fetchImpl)
  expect(res).toEqual({ ok: true })
  const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
  expect(url).toBe('https://formspree.io/f/mgoyrdky')
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
  const { container } = render(<LeadForm kind="audit" fetchImpl={fetchImpl} />)
  fillAudit()
  ;(container.querySelector('input[name="company_website"]') as HTMLInputElement).value = 'spam'
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/Thanks/))
  expect(fetchImpl).not.toHaveBeenCalled()
})

test('invalid email and URL show inline errors and do not submit', async () => {
  const fetchImpl = vi.fn(ok)
  render(<LeadForm kind="audit" fetchImpl={fetchImpl} />)
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
  render(<LeadForm kind="audit" fetchImpl={() => Promise.resolve(new Response('', { status: 500 }))} />)
  fillAudit()
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  expect(await screen.findByText(/couldn’t send/i)).toBeTruthy()
  expect((screen.getByLabelText(/^Email/) as HTMLInputElement).value).toBe('seller@shop.com')
  expect(screen.getByRole('button', { name: /send/i }).hasAttribute('disabled')).toBe(false)
})

test('a double click sends one request', async () => {
  let resolve!: (r: Response) => void
  const fetchImpl = vi.fn(() => new Promise<Response>((r) => { resolve = r }))
  render(<LeadForm kind="audit" fetchImpl={fetchImpl} />)
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
  render(<LeadForm kind="audit" fetchImpl={fetchImpl} />)
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
  render(<LeadForm kind="contact" fetchImpl={vi.fn(ok)} />)
  fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: 'Sam' } })
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'sam@shop.com' } })
  fireEvent.change(screen.getByLabelText(/What do you need/), { target: { value: 'Help with 40 Amazon listings.' } })
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  await waitFor(() => expect(window.gtag).toHaveBeenCalledWith('event', 'form_submit', expect.anything()))
})
