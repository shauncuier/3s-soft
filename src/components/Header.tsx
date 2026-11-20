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
  const menuId = useId()

  const close = () => setOpen(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 border-b border-line bg-surface-0/95 backdrop-blur" style={{ zIndex: 'var(--z-sticky-header)' }}>
      <div className="container-site flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 rounded-md" aria-label="3s-Soft home">
          <Image src="/assets/brand/3s-soft-logo.webp" alt="" width={48} height={48} className="h-12 w-12" priority />
          <span className="ds-display text-lg font-extrabold text-ink" translate="no">3s-Soft</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = pathname?.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`inline-flex min-h-11 items-center rounded-md px-3 text-[15px] font-semibold hover:text-green-700 ${active ? 'text-green-700 underline decoration-2 underline-offset-8' : 'text-ink'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={AUDIT_HREF} className="ds-btn ds-btn--primary hidden sm:inline-flex">
            Free audit
          </Link>
          <button
            type="button"
            className="ds-btn ds-btn--secondary px-3 md:hidden"
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
        className="border-t border-line bg-surface-0 md:hidden"
        style={{ overscrollBehavior: 'contain' }}
      >
        <ul className="container-site flex flex-col py-2">
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
    </header>
  )
}
