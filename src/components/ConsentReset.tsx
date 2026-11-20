'use client'

import { CONSENT_EVENT } from '@/lib/analytics'

/** Clears the stored analytics choice so the consent banner shows again. */
export function ConsentReset() {
  return (
    <button
      type="button"
      className="ds-btn ds-btn--secondary rounded-full"
      onClick={() => {
        try { localStorage.removeItem('3s-consent') } catch { /* storage blocked */ }
        window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }))
      }}
    >
      Change my cookie choice
    </button>
  )
}
