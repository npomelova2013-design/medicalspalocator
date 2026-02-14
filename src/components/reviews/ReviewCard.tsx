import Image from 'next/image'
import { Star } from 'lucide-react'
import type { Review } from '@/lib/queries/reviews'

interface Props {
  review: Review
}

export function ReviewCard({ review }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating)

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return ''
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return ''
    }
  }

  const initials = review.reviewer_name
    ? review.reviewer_name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  return (
    <div className="bg-white border border-[#833AB4]/10 rounded-xl p-5">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        {review.reviewer_photo_url ? (
          <Image
            src={review.reviewer_photo_url}
            alt={review.reviewer_name || 'Reviewer'}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#833AB4]/20 to-[#E1306C]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-[#833AB4]">{initials}</span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Name and date */}
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-[#262626] text-sm truncate">
              {review.reviewer_name || 'Anonymous'}
            </p>
            {review.review_date && (
              <p className="text-xs text-[#262626]/40 flex-shrink-0">
                {formatDate(review.review_date)}
              </p>
            )}
          </div>

          {/* Stars */}
          <div className="flex gap-0.5 mt-1">
            {stars.map((filled, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  filled ? 'text-[#FCAF45] fill-[#FCAF45]' : 'text-[#262626]/15'
                }`}
              />
            ))}
          </div>

          {/* Review text */}
          {review.review_text && (
            <p className="text-sm text-[#262626]/60 mt-2 leading-relaxed line-clamp-4">
              {review.review_text}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
