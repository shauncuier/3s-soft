/** Clears the stored analytics choice so the cookie banner shows again (wired by src/client/consent.ts). */
export function ConsentReset() {
  return (
    <button type="button" className="ds-btn ds-btn--secondary" data-consent-reset>
      Change my cookie choice
    </button>
  )
}
