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

export function ServiceCard({ service }: { service: ServiceCardData }) {
  const Icon = icons[service.slug]
  return (
    <Link className="ds-service" href={`/services/${service.slug}/`}>
      <span className="ds-service__icon"><Icon size={24} strokeWidth={1.75} aria-hidden="true" /></span>
      <h3 className="ds-service__title">{service.title}</h3>
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
