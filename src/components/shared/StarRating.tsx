import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number | null
  count?: number
  showCount?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function StarRating({ rating, count = 0, showCount = true, size = 'md' }: StarRatingProps) {
  if (!rating) return <span className="text-[#262626]/40 text-sm">No rating</span>

  const sizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' }
  const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }
  const starSize = sizes[size]
  const textSize = textSizes[size]

  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.3

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${starSize} ${i < fullStars ? 'fill-[#FCAF45] text-[#FCAF45]' : i === fullStars && hasHalf ? 'fill-[#FCAF45]/50 text-[#FCAF45]' : 'fill-[#FCAF45]/20 text-[#FCAF45]/20'}`}
          />
        ))}
      </div>
      <span className={`font-semibold ${textSize} text-[#262626]`}>{rating.toFixed(1)}</span>
      {showCount && count > 0 && (
        <span className={`text-[#262626]/40 ${textSize}`}>({count.toLocaleString()})</span>
      )}
    </div>
  )
}
