import { ProofStat } from './ProofStat'

export function ProofBar({ ids, label = 'Our track record' }: { ids: string[]; label?: string }) {
  return (
    <ul className="ds-proofbar m-0 list-none" aria-label={label}>
      {ids.map((id) => (
        <li key={id}>
          <ProofStat id={id} />
        </li>
      ))}
    </ul>
  )
}
