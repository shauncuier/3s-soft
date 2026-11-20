import type { Review } from '@/content/types'

function stars(rating: number) {
  const full = Math.round(rating)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}

/** A real buyer review, quoted word for word, with its source. */
export function ReviewCard({ review }: { review: Review }) {
  const platform = review.platform === 'fiverr' ? 'Fiverr' : 'Upwork'
  return (
    <figure className="ds-review m-0">
      <div className="ds-review__stars" aria-label={`Rated ${review.rating} out of 5`} role="img">
        <span aria-hidden="true" style={{ color: 'var(--star)', margin: 0, font: 'inherit', letterSpacing: '2px' }}>{stars(review.rating)}</span>
        <span>{review.rating.toFixed(1)}</span>
      </div>
      <blockquote className="ds-review__quote m-0">“{review.text}”</blockquote>
      <figcaption className="ds-review__meta">
        <span className="ds-review__user" translate="no">{review.user}</span>
        {review.country && <span>{review.country}</span>}
        <span>{review.date}</span>
        <span className="ds-chip">{review.gig}</span>
        <a className="ds-review__source" href={review.sourceUrl} target="_blank" rel="noopener" translate="no">
          {platform} ↗
        </a>
      </figcaption>
    </figure>
  )
}
