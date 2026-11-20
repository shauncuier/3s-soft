import { getProof } from '@/content/proof'
import { formatCheckedOn, sourceName } from '@/lib/format'

/** A verifiable number with its label and a link to where anyone can check it. */
export function ProofStat({ id }: { id: string }) {
  const p = getProof(id)
  return (
    <div className="ds-proof">
      <p className="ds-proof__value m-0" translate="no">
        {p.value}
        {id === 'fiverr-rating' && <span className="ds-proof__star" aria-hidden="true">★</span>}
      </p>
      <p className="ds-proof__label m-0">{p.label}</p>
      <a className="ds-proof__source" href={p.sourceUrl} target="_blank" rel="noopener">
        {sourceName(p.sourceUrl)} ↗ checked {formatCheckedOn(p.checkedOn)}
      </a>
    </div>
  )
}
