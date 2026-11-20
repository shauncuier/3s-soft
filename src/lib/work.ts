import type { ServiceSlug, WorkItem } from '@/content/types'
import { selectedWork } from '@/content/home'

/** Case studies that show a given service (internal items only). */
export function workFor(slug: ServiceSlug): WorkItem[] {
  return selectedWork.filter((w) => !w.external && w.services.includes(slug))
}
