'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { track, type TrackEvent } from '@/lib/analytics'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  event: TrackEvent
  external?: boolean
  children: ReactNode
}

/** A plain link that records an analytics event (only when the visitor allowed analytics). */
export function TrackedLink({ event, external, children, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      onClick={(e) => {
        track(event)
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}
