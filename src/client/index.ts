import { initMenu, initNavCurrent } from './menu'
import { initConsent } from './consent'
import { initTracking } from './track'
import { initFilter } from './filter'
import { initBeforeAfter } from './before-after'
import { initLeadForms } from './lead-form'

/**
 * The only JavaScript the site ships. Every page reads and navigates without it; it adds the
 * menu, cookie banner, forms, filter and toggle. Each part starts in its own task so none blocks input.
 */
const steps: ((doc: Document) => void)[] = [initConsent, initMenu, initNavCurrent, initTracking, initLeadForms, initFilter, initBeforeAfter]

function boot() {
  for (const step of steps) setTimeout(() => step(document), 0)
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
else boot()
