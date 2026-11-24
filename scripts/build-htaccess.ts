import { writeFileSync } from 'node:fs'
import { redirects, renderHtaccess, renderOldUrlsSitemap } from '../src/content/redirects'

writeFileSync('public/.htaccess', renderHtaccess(redirects))
console.log(`Wrote public/.htaccess with ${redirects.length + 1} redirects.`)

writeFileSync('public/old-urls.xml', renderOldUrlsSitemap(redirects))
console.log('Wrote public/old-urls.xml (temporary: delete about 4 weeks after submitting it in Search Console).')
