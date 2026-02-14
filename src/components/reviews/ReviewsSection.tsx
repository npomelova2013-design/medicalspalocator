import { Star } from 'lucide-react'
import { getReviewsForSpa } from '@/lib/queries/reviews'
import { ReviewCard } from './ReviewCard'

interface Props {
  medSpaId: string
  googleRating: number | null
  googleReviewsCount: number
}

export async function ReviewsSection({ medSpaId, googleRating, googleReviewsCount }: Props) {
  let reviews = []
  try {
    reviews = await getReviewsForSpa(medSpaId, 6)
  } catch {
    // Table may not exist yet — gracefully skip
    return null
  }

  // If no reviews in our table, show nothing
  // (Google rating is already shown in the header)
  if (reviews.length === 0) return null

  // Calculate average from stored reviews
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  return (
    <div className="bg-white border border-[#833AB4]/10 rounded-2xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-serif italic font-semibold text-[#262626]">
          Patient Reviews
        </h2>
        {googleRating && (
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-[#FCAF45] fill-[#FCAF45]" />
            <span className="font-semibold text-[#262626] text-sm">{googleRating.toFixed(1)}</span>
            <span className="text-xs text-[#262626]/40">
              ({googleReviewsCount} reviews)
            </span>
          </div>
        )}
      </div>

      {/* Review average bar */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-[#F0E6F6]/30 rounded-xl">
        <div className="text-center">
          <p className="text-3xl font-bold text-[#262626]">{avgRating.toFixed(1)}</p>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.round(avgRating) ? 'text-[#FCAF45] fill-[#FCAF45]' : 'text-[#262626]/15'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-[#262626]/40 mt-0.5">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter((r) => r.rating === stars).length
            const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0
            return (
              <div key={stars} className="flex items-center gap-2 text-xs">
                <span className="text-[#262626]/50 w-3">{stars}</span>
                <div className="flex-1 h-2 bg-[#262626]/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#833AB4] to-[#E1306C] rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[#262626]/30 w-4 text-right">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}
