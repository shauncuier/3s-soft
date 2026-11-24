/**
 * Deploys a built zip to staging (new.3s-soft.com) or live (3s-soft.com) through the cPanel API.
 * Reads CPANEL_HOST, CPANEL_USER and CPANEL_TOKEN from .env (never printed).
 * Live refuses to run unless ~/site-backups/ holds a backup of public_html made today.
 *
 *   npx tsx scripts/deploy.ts staging            # dry run: show what would change
 *   npx tsx scripts/deploy.ts staging --apply    # upload deploy/site-staging.zip, replace the old build, extract
 *   npx tsx scripts/deploy.ts live --apply       # same with deploy/site-live.zip into public_html
 */
import { readFileSync, statSync } from 'node:fs'
import { buildMatchesTarget, isZipArchive } from './deploy-guard'

const TARGETS = {
  staging: { dir: 'new.3s-soft.com', zip: 'deploy/site-staging.zip', url: 'https://new.3s-soft.com/' },
  live: { dir: 'public_html', zip: 'deploy/site-live.zip', url: 'https://3s-soft.com/' },
} as const
const target = process.argv[2] as keyof typeof TARGETS
if (!(target in TARGETS)) throw new Error('Usage: deploy.ts staging|live [--apply]')
const { dir: STAGING_DIR, zip: ZIP, url: URL_ } = TARGETS[target]
const UPLOAD_NAME = ZIP.split('/').pop()!
const KEEP = new Set(['.well-known', 'cgi-bin', '.user.ini', 'php.ini', UPLOAD_NAME])

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
// Refuse the wrong build: staging must be noindex, live indexable, and the zip must be made from the current out/.
if (!buildMatchesTarget(readFileSync('out/index.html', 'utf8'), target)) {
  throw new Error(`out/ is not a ${target} build (check NEXT_PUBLIC_NOINDEX and that the last build succeeded). Nothing deployed.`)
}
if (statSync(ZIP).mtimeMs < statSync('out/index.html').mtimeMs) {
  throw new Error(`${ZIP} is older than out/. Re-create the zip from the current build. Nothing deployed.`)
}
if (!isZipArchive(readFileSync(ZIP))) {
  throw new Error(`${ZIP} is not a zip file (Git Bash's tar makes a tar archive). Use C:\Windows\System32\tar.exe -a -c -f ${ZIP} -C out . Nothing deployed.`)
}
if (target === 'live') {
  const today = new Date().toLocaleDateString('sv-SE') // local YYYY-MM-DD, matching the backup name
  const backups = (await uapi('Fileman/list_files?dir=site-backups&include_mime=0')) as { file: string }[]
  if (!backups.some((b) => b.file === `public_html-${today}.zip`)) throw new Error(`No backup ~/site-backups/public_html-${today}.zip. Back up public_html first.`)
  console.log(`Backup found: ~/site-backups/public_html-${today}.zip`)
}
const listing = (await uapi(`Fileman/list_files?dir=${STAGING_DIR}&show_hidden=1&include_mime=0`)) as { file: string }[]
const remove = listing.map((f) => f.file).filter((f) => !KEEP.has(f))
console.log(`${target} folder ~/${STAGING_DIR}: ${listing.length} items; ${remove.length} old build items to replace.`)
if (!apply) {
  console.log('Dry run. Re-run with --apply to deploy.')
  process.exit(0)
}

const form = new FormData()
form.set('dir', STAGING_DIR)
form.set('overwrite', '1')
form.set('file-1', new Blob([readFileSync(ZIP)]), UPLOAD_NAME)
await uapi('Fileman/upload_files', { method: 'POST', body: form })
console.log(`Uploaded ${UPLOAD_NAME}`)

const home = `/home/${env('CPANEL_USER')}/${STAGING_DIR}`
if (remove.length) await fileop('unlink', remove.map((f) => `${home}/${f}`))
console.log(`Removed ${remove.length} old items`)

await fileop('extract', [`${home}/${UPLOAD_NAME}`], home)
console.log('Extracted')
await fileop('unlink', [`${home}/${UPLOAD_NAME}`])
console.log(`Removed the zip. Done: ${URL_}`)
