// @vitest-environment node
/**
 * End-to-end test of public/api/lead.php: PHP's built-in server runs the real handler,
 * a fake SMTP server (below) records what it would send. Needs PHP (Laravel Herd or PHP_BIN).
 */
import { spawn, type ChildProcess } from 'node:child_process'
import { createServer, type Server, type Socket } from 'node:net'
import { existsSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir, homedir } from 'node:os'
import { join } from 'node:path'

const PHP = process.env.PHP_BIN ?? [join(homedir(), '.config/herd/bin/php86/php.exe'), join(homedir(), '.config/herd/bin/php84/php.exe'), 'php'].find((p) => p === 'php' || existsSync(p))!
const PHP_PORT = 4471
const SMTP_PORT = 4472

type Mail = { from: string; to: string[]; data: string; auth: string[] }
let mails: Mail[] = []
let smtp: Server
let php: ChildProcess
let dir: string

/** Minimal SMTP server: accepts AUTH LOGIN and records MAIL FROM, RCPT TO and DATA. */
function startSmtp(): Promise<void> {
  smtp = createServer((sock: Socket) => {
    let mail: Mail = { from: '', to: [], data: '', auth: [] }
    let inData = false
    let authStep = 0
    let buf = ''
    sock.on('error', () => {}) // the client may close right after QUIT
    sock.write('220 fake.smtp ESMTP\r\n')
    sock.on('data', (chunk) => {
      buf += chunk.toString('utf8')
      let i
      while ((i = buf.indexOf('\r\n')) >= 0) {
        const line = buf.slice(0, i)
        buf = buf.slice(i + 2)
        if (inData) {
          if (line === '.') { inData = false; mails.push(mail); mail = { from: '', to: [], data: '', auth: mail.auth }; sock.write('250 queued\r\n') }
          else mail.data += (line.startsWith('..') ? line.slice(1) : line) + '\n'
          continue
        }
        if (authStep > 0) {
          const v = Buffer.from(line, 'base64').toString()
          mail.auth.push(v)
          sock.write(authStep === 1 ? '334 UGFzc3dvcmQ6\r\n' : v === 'wrong-pass' ? '535 Incorrect authentication data\r\n' : '235 ok\r\n')
          authStep = authStep === 1 ? 2 : 0
          continue
        }
        const cmd = line.toUpperCase()
        if (cmd.startsWith('EHLO')) sock.write('250-fake.smtp\r\n250 AUTH LOGIN\r\n')
        else if (cmd === 'AUTH LOGIN') { authStep = 1; sock.write('334 VXNlcm5hbWU6\r\n') }
        else if (cmd.startsWith('MAIL FROM')) { mail.from = line.slice(10); sock.write('250 ok\r\n') }
        else if (cmd.startsWith('RCPT TO')) { mail.to.push(line.slice(8)); sock.write('250 ok\r\n') }
        else if (cmd === 'DATA') { inData = true; sock.write('354 go\r\n') }
        else if (cmd === 'QUIT') { sock.write('221 bye\r\n'); sock.end() }
        else sock.write('250 ok\r\n')
      }
    })
  })
  return new Promise((r) => smtp.listen(SMTP_PORT, '127.0.0.1', () => r()))
}

beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), 'lead-'))
  writeFileSync(join(dir, 'config.php'), `<?php return [
    'host' => '127.0.0.1', 'port' => ${SMTP_PORT}, 'secure' => 'none',
    'username' => 'info@3s-soft.com', 'password' => 'test-only',
    'from_email' => 'info@3s-soft.com', 'from_name' => '3s-Soft website',
    'to' => ['info@3s-soft.com'],
    'allowed_origins' => ['http://localhost:${PHP_PORT}', 'https://3s-soft.com'],
    'rate_dir' => ${JSON.stringify(join(dir, 'rate'))}, 'rate_max' => 3, 'rate_window' => 600, 'trust_test_ip_header' => true,
  ];`)
  await startSmtp()
  php = spawn(PHP, ['-S', `127.0.0.1:${PHP_PORT}`, '-t', 'public'], { env: { ...process.env, LEAD_MAILER_CONFIG: join(dir, 'config.php') }, stdio: 'ignore' })
  for (let i = 0; i < 50; i++) {
    try { await fetch(`http://127.0.0.1:${PHP_PORT}/robots.txt`); return } catch { await new Promise((r) => setTimeout(r, 100)) }
  }
}, 20000)

afterAll(() => {
  php?.kill()
  smtp?.close()
  rmSync(dir, { recursive: true, force: true })
})

beforeEach(() => { mails = [] })

function audit(extra: Record<string, string> = {}) {
  const fd = new FormData()
  fd.set('form_type', 'audit')
  fd.set('storeUrl', 'https://www.amazon.com/dp/B0TEST')
  fd.set('marketplace', 'Amazon')
  fd.set('email', 'seller@shop.com')
  fd.set('whatsapp', '+1 555 010 0000')
  fd.set('utm_source', 'linkedin')
  for (const [k, v] of Object.entries(extra)) fd.set(k, v)
  return fd
}

const post = (fd: FormData, headers: Record<string, string> = { Accept: 'application/json', Origin: `http://localhost:${PHP_PORT}` }, ip = '10.0.0.1') =>
  fetch(`http://127.0.0.1:${PHP_PORT}/api/lead.php`, { method: 'POST', body: fd, headers: { ...headers, 'X-Test-Ip': ip } })

test.skipIf(!PHP)('a valid audit request is emailed through SMTP with Reply-To set to the visitor', async () => {
  const res = await post(audit())
  expect(res.status).toBe(200)
  expect(await res.json()).toEqual({ ok: true })
  expect(mails).toHaveLength(1)
  const m = mails[0]
  expect(m.auth).toEqual(['info@3s-soft.com', 'test-only'])
  expect(m.from).toBe('<info@3s-soft.com>')
  expect(m.to).toEqual(['<info@3s-soft.com>'])
  expect(m.data).toMatch(/^Reply-To: seller@shop\.com$/m)
  expect(m.data).toMatch(/^Subject: =\?UTF-8\?B\?/m)
  const body = Buffer.from(m.data.split('\n\n').slice(1).join('').replace(/\s/g, ''), 'base64').toString()
  expect(body).toContain('https://www.amazon.com/dp/B0TEST')
  expect(body).toContain('Marketplace: Amazon')
  expect(body).toContain('utm_source: linkedin')
})

test.skipIf(!PHP)('invalid fields are rejected with 422 and nothing is sent', async () => {
  const res = await post(audit({ email: 'not-an-email', storeUrl: 'nope' }), undefined, '10.0.0.2')
  expect(res.status).toBe(422)
  const json = await res.json()
  expect(json.ok).toBe(false)
  expect(Object.keys(json.errors).sort()).toEqual(['email', 'storeUrl'])
  expect(mails).toHaveLength(0)
})

test.skipIf(!PHP)('a filled honeypot gets a normal answer and sends nothing', async () => {
  const res = await post(audit({ company_website: 'spam.example' }), undefined, '10.0.0.3')
  expect(res.status).toBe(200)
  expect(mails).toHaveLength(0)
})

test.skipIf(!PHP)('header injection through a field cannot add headers', async () => {
  const res = await post(audit({ email: 'seller@shop.com\r\nBcc: evil@example.com' }), undefined, '10.0.0.4')
  expect(res.status).toBe(422)
  expect(mails).toHaveLength(0)
})

test.skipIf(!PHP)('a foreign Origin is refused', async () => {
  const res = await post(audit(), { Accept: 'application/json', Origin: 'https://evil.example' }, '10.0.0.5')
  expect(res.status).toBe(403)
  expect(mails).toHaveLength(0)
})

test.skipIf(!PHP)('one address can send only a few requests in a short time', async () => {
  const codes: number[] = []
  for (let i = 0; i < 4; i++) codes.push((await post(audit(), undefined, '10.0.0.6')).status)
  expect(codes).toEqual([200, 200, 200, 429])
  expect(mails).toHaveLength(3)
})

test.skipIf(!PHP)('without JavaScript a sent form redirects to the thank-you page for that form', async () => {
  const res = await fetch(`http://127.0.0.1:${PHP_PORT}/api/lead.php`, { method: 'POST', body: audit(), redirect: 'manual', headers: { Accept: 'text/html', Origin: `http://localhost:${PHP_PORT}`, 'X-Test-Ip': '10.0.0.7' } })
  expect(res.status).toBe(303)
  expect(res.headers.get('location')).toBe('/thank-you/?form=audit')
  expect(mails).toHaveLength(1)
})

test.skipIf(!PHP)('the helper file cannot be opened directly', async () => {
  const res = await fetch(`http://127.0.0.1:${PHP_PORT}/api/lead-lib.php`)
  expect(res.status).toBe(404)
})

test.skipIf(!PHP)('a config that still has the placeholder password refuses to send', async () => {
  const d = mkdtempSync(join(tmpdir(), 'lead-ph-'))
  writeFileSync(join(d, 'config.php'), `<?php return ['host' => '127.0.0.1', 'port' => ${SMTP_PORT}, 'secure' => 'none', 'username' => 'info@3s-soft.com', 'password' => 'PUT-THE-MAILBOX-PASSWORD-HERE', 'from_email' => 'info@3s-soft.com', 'to' => ['info@3s-soft.com'], 'allowed_origins' => [], 'rate_dir' => ${JSON.stringify(join(d, 'rate'))}];`)
  const p = spawn(PHP, ['-S', '127.0.0.1:4473', '-t', 'public'], { env: { ...process.env, LEAD_MAILER_CONFIG: join(d, 'config.php') }, stdio: 'ignore' })
  let res: Response | undefined
  for (let i = 0; i < 50 && !res; i++) {
    try { res = await fetch('http://127.0.0.1:4473/api/lead.php', { method: 'POST', body: audit(), headers: { Accept: 'application/json' } }) } catch { await new Promise((r) => setTimeout(r, 100)) }
  }
  p.kill()
  rmSync(d, { recursive: true, force: true })
  expect(res!.status).toBe(500)
  expect(mails).toHaveLength(0)
})

test.skipIf(!PHP)('a rejected SMTP login never writes the password, plain or encoded, to the log', async () => {
  const d = mkdtempSync(join(tmpdir(), 'lead-auth-'))
  writeFileSync(join(d, 'config.php'), `<?php return ['host' => '127.0.0.1', 'port' => ${SMTP_PORT}, 'secure' => 'none', 'username' => 'info@3s-soft.com', 'password' => 'wrong-pass', 'from_email' => 'info@3s-soft.com', 'to' => ['info@3s-soft.com'], 'allowed_origins' => [], 'rate_dir' => ${JSON.stringify(join(d, 'rate'))}];`)
  const p = spawn(PHP, ['-S', '127.0.0.1:4474', '-t', 'public'], { env: { ...process.env, LEAD_MAILER_CONFIG: join(d, 'config.php') }, stdio: ['ignore', 'pipe', 'pipe'] })
  let log = ''
  p.stdout!.on('data', (c) => { log += c })
  p.stderr!.on('data', (c) => { log += c })
  let res: Response | undefined
  for (let i = 0; i < 50 && !res; i++) {
    try { res = await fetch('http://127.0.0.1:4474/api/lead.php', { method: 'POST', body: audit(), headers: { Accept: 'application/json' } }) } catch { await new Promise((r) => setTimeout(r, 100)) }
  }
  await new Promise((r) => setTimeout(r, 300))
  p.kill()
  rmSync(d, { recursive: true, force: true })
  expect(res!.status).toBe(502)
  expect(log).toMatch(/535/)
  expect(log).not.toContain('wrong-pass')
  expect(log).not.toContain(Buffer.from('wrong-pass').toString('base64'))
})
