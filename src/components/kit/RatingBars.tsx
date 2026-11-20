/** Star breakdown as a table, with bars scaled to the largest count. */
export function RatingBars({ breakdown, caption }: { breakdown: Record<1 | 2 | 3 | 4 | 5, number>; caption?: string }) {
  const max = Math.max(...Object.values(breakdown))
  return (
    <table className="w-full border-collapse text-left">
      {caption && <caption className="mb-3 text-left text-sm text-ink-muted">{caption}</caption>}
      <thead className="sr-only"><tr><th scope="col">Stars</th><th scope="col">Share</th><th scope="col">Reviews</th></tr></thead>
      <tbody className="tabular-nums">
        {([5, 4, 3, 2, 1] as const).map((s, i) => (
          <tr key={s}>
            <th scope="row" className="w-20 py-2 pr-3 text-sm font-semibold whitespace-nowrap">{s} star{s > 1 ? 's' : ''}</th>
            <td className="py-2" aria-hidden="true">
              <div className="h-3 overflow-hidden rounded-full bg-surface-200">
                <div className="motion-rise h-full origin-left rounded-full bg-[var(--star)]" style={{ width: `${Math.max(1, (breakdown[s] / max) * 100)}%`, ['--delay' as string]: `${i * 80}ms` }} />
              </div>
            </td>
            <td className="w-14 py-2 pl-3 text-right text-sm font-bold">{breakdown[s]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
