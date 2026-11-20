import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { mainNav, AUDIT_HREF } from '@/content/nav'

/**
 * Static header. src/client/menu.ts opens the mobile menu and marks the current section.
 * On the outreach landing page the desktop links are hidden by CSS (body:has([data-landing])).
 */
export function Header() {
  return (
    <header className="sticky top-0 border-b border-line bg-surface-0" style={{ zIndex: 'var(--z-sticky-header)', top: 'env(safe-area-inset-top, 0px)' }}>
      <div className="container-site">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link href="/" prefetch={false} className="flex items-center gap-2 rounded-md" aria-label="3s-Soft home">
            {/* eslint-disable-next-line @next/next/no-img-element -- 44px logo, no preload needed */}
            <img src="/assets/brand/3s-soft-logo.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full" decoding="async" />
            <span className="ds-display text-lg font-extrabold text-ink" translate="no">3s-Soft</span>
          </Link>

          <nav aria-label="Main" className="site-nav hidden md:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-nav-link
                    className="inline-flex min-h-11 items-center px-3 text-[15px] font-semibold text-ink transition-colors hover:text-green-700 aria-[current=page]:text-green-700 aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[10px]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={AUDIT_HREF} className="ds-btn ds-btn--primary hidden sm:inline-flex">Free audit</a>
            <button
              type="button"
              className="menu-button ds-btn ds-btn--secondary px-3 md:hidden"
              data-menu-button
              aria-expanded="false"
              aria-controls="site-menu"
            >
              <Menu className="menu-button__open" aria-hidden="true" />
              <X className="menu-button__close" aria-hidden="true" />
              <span className="menu-button__open">Menu</span>
              <span className="menu-button__close">Close</span>
            </button>
          </div>
        </div>

        <nav id="site-menu" aria-label="Mobile" hidden className="border-t border-line bg-surface-0 px-5 md:hidden" style={{ overscrollBehavior: 'contain' }}>
          <ul className="m-0 flex list-none flex-col p-0 py-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} data-nav-link className="flex min-h-12 items-center text-base font-semibold text-ink hover:text-green-700 aria-[current=page]:text-green-700">
                  {item.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <a href={AUDIT_HREF} className="ds-btn ds-btn--primary w-full">Get a free 5-product audit</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
