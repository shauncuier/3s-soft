import { writeFileSync } from 'node:fs'
import { redirects, renderHtaccess } from '../src/content/redirects'

writeFileSync('public/.htaccess', renderHtaccess(redirects))
console.log(`Wrote public/.htaccess with ${redirects.length + 1} redirects.`)
