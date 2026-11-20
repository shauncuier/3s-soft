import type { Review } from '@/content/types'
import { ReviewCard } from '@/components/ReviewCard'

/** Real reviews in a static grid. */
export function ReviewGrid({ reviews }: { reviews: Review[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
    </div>
  )
}
