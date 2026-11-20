import { track, type TrackEvent } from '../lib/analytics'

/** Any link with data-track="event_name" records that event (only after the visitor allowed analytics). */
export function initTracking(doc: Document) {
  doc.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]')
    if (el) track(el.dataset.track as TrackEvent)
  })
}
