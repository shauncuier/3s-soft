import Link from 'next/link'
import { Boxes, LayoutTemplate, Store, Users, ClipboardList, type LucideIcon } from 'lucide-react'
import type { ServiceCardData, ServiceSlug } from '@/content/types'

const icons: Record<ServiceSlug, LucideIcon> = {
  'ecommerce-product-listing': Boxes,
  'amazon-a-plus-content': LayoutTemplate,
  'shopify-store-management': Store,
  'lead-generation': Users,
  'virtual-assistant': ClipboardList,
}

/** headingLevel 2 when the cards sit directly under the page h1 (no section heading between). */
export function ServiceCard({ service, headingLevel = 3 }: { service: ServiceCardData; headingLevel?: 2 | 3 }) {
  const Icon = icons[service.slug]
  const H = `h${headingLevel}` as const
  return (
    <Link className="ds-service" href={`/services/${service.slug}/`}>
      <span className="ds-service__icon"><Icon size={24} strokeWidth={1.75} aria-hidden="true" /></span>
      <H className="ds-service__title">{service.title}</H>
      <p className="ds-service__text">{service.summary}</p>
      <ul className="ds-service__list">
        {service.deliverables.slice(0, 3).map((d) => <li key={d}>{d}</li>)}
      </ul>
      <div className="ds-service__chips" aria-label="Platforms">
        {service.platforms.map((p) => <span key={p} className="ds-chip" translate="no">{p}</span>)}
      </div>
      <span className="ds-service__more">Explore {service.title} →</span>
    </Link>
  )
}
