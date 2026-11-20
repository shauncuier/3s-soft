const ITEMS = ['Amazon', 'Walmart', 'Shopify', 'Etsy', 'eBay', 'A+ Content', 'Brand Story', 'Bulk uploads', 'Variations', 'Catalogue care', '5.0 from 465 reviews', 'Since 2015']

/** Green ticker band. The visible copy is duplicated for a seamless loop; the duplicate is hidden from screen readers. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="m-0 flex shrink-0 list-none items-center gap-8 p-0 pr-8">
      {ITEMS.map((t) => (
        <li key={t} className="flex items-center gap-8 font-mono text-sm font-medium tracking-[0.12em] whitespace-nowrap uppercase">
          {t} <span aria-hidden="true" className="text-on-green/60">✦</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="motion-group overflow-hidden bg-green-700 py-4 text-on-green" role="region" aria-label="What we work on">
      <div className="motion-marquee flex w-max" style={{ ['--dur' as string]: '45s' }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
