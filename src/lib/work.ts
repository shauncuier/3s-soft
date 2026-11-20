import type { ServiceSlug, CaseStudy } from '@/content/types'
import { caseStudies } from '@/content/portfolio'

/** Case studies that show a given service. */
export function workFor(slug: ServiceSlug): CaseStudy[] {
  return caseStudies.filter((w) => w.services.includes(slug))
}
