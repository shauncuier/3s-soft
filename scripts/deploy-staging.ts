/**
 * Deploys deploy/site-staging.zip to the staging subdomain (new.3s-soft.com) through the cPanel API.
 * Reads CPANEL_HOST, CPANEL_USER and CPANEL_TOKEN from .env (never printed).
 * Only ever touches the staging folder. Going live is a separate, manual step (docs/deploy.md).
 *
 *   npx tsx scripts/deploy-staging.ts           # show what would change
 *   npx tsx scripts/deploy-staging.ts --apply   # upload, replace the old build, extract
 */
import { readFileSync } from 'node:fs'

const STAGING_DIR = 'new.3s-soft.com'
const KEEP = new Set(['.well-known', 'cgi-bin', '.user.ini', 'php.ini', 'site-staging.zip'])
const ZIP = 'deploy/site-staging.zip'

function env(name: string): string {
  const line = readFileSync('.env', 'utf8').split(/\r?\n/).find((l) => l.startsWith(`${name}=`))
  const value = line?.slice(name.length + 1).trim().replace(/^"|"$/g, '')
  if (!value) throw new Error(`${name} missing in .env`)
  return value
}

const host = env('CPANEL_HOST')
const auth = { Authorization: `cpanel ${env('CPANEL_USER')}:${env('CPANEL_TOKEN')}` }

async function uapi(path: string, init?: RequestInit) {
  const res = await fetch(`https://${host}/execute/${path}`, { ...init, headers: { ...auth, ...(init?.headers ?? {}) } })
  const json = (await res.json()) as { status: number; errors: string[] | null; data: unknown }
  if (json.status !== 1) throw new Error(`${path.split('?')[0]}: ${JSON.stringify(json.errors)}`)
  return json.data
}

async function fileop(op: 'unlink' | 'extract', sourcefiles: string[], destfiles?: string) {
  const q = new URLSearchParams({ cpanel_jsonapi_module: 'Fileman', cpanel_jsonapi_func: 'fileop', cpanel_jsonapi_apiversion: '2', op, sourcefiles: sourcefiles.join(','), doubledecode: '0' })
  if (destfiles) q.set('destfiles', destfiles)
  const res = await fetch(`https://${host}/json-api/cpanel?${q}`, { headers: auth })
  const json = (await res.json()) as { cpanelresult: { error?: string; data?: { result: number; output?: string }[] } }
  const r = json.cpanelresult
  if (r.error || r.data?.some((d) => d.result !== 1)) throw new Error(`${op}: ${r.error ?? JSON.stringify(r.data)}`)
}

const apply = process.argv.includes('--apply')
const listing = (await uapi(`Fileman/list_files?dir=${STAGING_DIR}&show_hidden=1&include_mime=0`)) as { file: string }[]
const remove = listing.map((f) => f.file).filter((f) => !KEEP.has(f))
console.log(`Staging folder ~/${STAGING_DIR}: ${listing.length} items; ${remove.length} old build items to replace.`)
if (!apply) {
  console.log('Dry run. Re-run with --apply to deploy.')
  process.exit(0)
}

const form = new FormData()
form.set('dir', STAGING_DIR)
form.set('overwrite', '1')
form.set('file-1', new Blob([readFileSync(ZIP)]), 'site-staging.zip')
await uapi('Fileman/upload_files', { method: 'POST', body: form })
console.log('Uploaded site-staging.zip')

const home = `/home/${env('CPANEL_USER')}/${STAGING_DIR}`
if (remove.length) await fileop('unlink', remove.map((f) => `${home}/${f}`))
console.log(`Removed ${remove.length} old items`)

await fileop('extract', [`${home}/site-staging.zip`], home)
console.log('Extracted')
await fileop('unlink', [`${home}/site-staging.zip`])
console.log('Removed the zip. Done: https://new.3s-soft.com/')
