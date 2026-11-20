import Link from 'next/link'
import Image from 'next/image'
import type { WorkItem } from '@/content/types'

const categoryLabel: Record<WorkItem['category'], string> = {
  amazon: 'Amazon',
  shopify: 'Shopify',
  'multi-marketplace': 'Multi-marketplace',
  'lead-gen': 'Lead generation',
  web: 'Web development',
}

/** A case-study card. External items (web work) open their public source in a new tab. */
export function WorkCard({ item }: { item: WorkItem }) {
  const image = item.external ? item.image : item.images[0]
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface-200">
        {image ? (
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" className="h-full w-full object-cover object-top" />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center">
            <span className="ds-display text-xl font-extrabold text-brand-charcoal">{item.clientLabel.split(' · ')[0]}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <span className="ds-chip self-start">{categoryLabel[item.category]}</span>
        <h3 className="ds-service__title">{item.title}</h3>
        <p className="m-0 text-sm font-semibold text-ink">{item.clientLabel}</p>
        <p className="ds-service__text">{item.summary}</p>
        <span className="ds-service__more">{item.external ? 'See it on the web ↗' : 'Read the case study →'}</span>
      </div>
    </>
  )

  if (item.external) {
    return (
      <a className="ds-service" href={item.url} target="_blank" rel="noopener">
        {body}
      </a>
    )
  }
  return (
    <Link className="ds-service" href={`/portfolio/${item.slug}/`}>
      {body}
    </Link>
  )
}
