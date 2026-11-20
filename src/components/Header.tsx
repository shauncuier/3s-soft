'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { mainNav, AUDIT_HREF } from '@/content/nav'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  // Outreach landing page: logo only, no navigation to leak attention.
  const landing = pathname === AUDIT_HREF
  const menuId = useId()

  const close = () => setOpen(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 pt-3" style={{ zIndex: 'var(--z-sticky-header)', top: 'env(safe-area-inset-top, 0px)' }}>
      <div className="container-site">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 rounded-full border border-line bg-surface-0/90 pr-2 pl-4 shadow-[var(--shadow-card)] backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 rounded-md" aria-label="3s-Soft home">
          <Image src="/assets/brand/3s-soft-logo.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full" loading="eager" />
          <span className="ds-display text-lg font-extrabold text-ink" translate="no">3s-Soft</span>
        </Link>

        {!landing && <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = pathname?.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-semibold transition-colors hover:bg-surface-200 ${active ? 'bg-green-100 text-green-700' : 'text-ink'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>}

        <div className="flex items-center gap-2">
          <Link href={AUDIT_HREF} className="ds-btn ds-btn--primary hidden rounded-full sm:inline-flex">
            Free audit
          </Link>
          <button
            type="button"
            className="ds-btn ds-btn--secondary rounded-full px-3 md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span>{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        aria-label="Mobile"
        hidden={!open}
        className="mx-auto mt-2 max-w-[1120px] rounded-[28px] border border-line bg-surface-0 px-5 shadow-[var(--shadow-card)] md:hidden"
        style={{ overscrollBehavior: 'contain' }}
      >
        <ul className="m-0 flex list-none flex-col p-0 py-2">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close} className="flex min-h-12 items-center text-base font-semibold text-ink hover:text-green-700">
                {item.label}
              </Link>
            </li>
          ))}
          <li className="py-3">
            <Link href={AUDIT_HREF} onClick={close} className="ds-btn ds-btn--primary w-full">
              Get a free 5-product audit
            </Link>
          </li>
        </ul>
      </nav>
      </div>
    </header>
  )
}
