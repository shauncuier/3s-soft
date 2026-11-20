import Link from 'next/link'

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? ''

/** Cookie choice. Static and hidden; src/client/consent.ts shows it when no choice is stored. */
export function ConsentBanner() {
  return (
    <>
    {/* Grows to the banner's height while it is open, so the end of the page can scroll clear of it. */}
    <div data-consent-spacer aria-hidden="true" />
    <section
      aria-label="Cookie choice"
      hidden
      data-consent-banner
      data-clarity={CLARITY_ID}
      className="fixed inset-x-0 bottom-0 border-t border-line bg-surface-0 shadow-[var(--shadow-bar)]"
      style={{ zIndex: 'var(--z-consent)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="container-site flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="prose-measure text-sm">
          We use Google Analytics and Microsoft Clarity to see which pages help sellers. They set cookies, so they only run if you allow them.{' '}
          <Link prefetch={false} className="font-semibold text-green-700 underline underline-offset-2" href="/cookies/">Cookie policy</Link>
        </p>
        <div className="flex gap-3">
          <button type="button" className="ds-btn ds-btn--secondary" data-consent="denied">Decline</button>
          <button type="button" className="ds-btn ds-btn--primary" data-consent="granted">Allow analytics</button>
        </div>
      </div>
    </section>
    </>
  )
}
