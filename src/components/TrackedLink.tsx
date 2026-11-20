import type { AnchorHTMLAttributes, ReactNode } from 'react'
import type { TrackEvent } from '@/lib/analytics'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  event: TrackEvent
  external?: boolean
  children: ReactNode
}

/** A plain link that records an analytics event via src/client/track.ts (only when the visitor allowed analytics). */
export function TrackedLink({ event, external, children, ...rest }: Props) {
  return (
    <a {...rest} data-track={event} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      {children}
    </a>
  )
}
