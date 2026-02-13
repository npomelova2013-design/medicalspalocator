import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Sparkles } from 'lucide-react'
import { StarRating } from '@/components/shared/StarRating'
import { PremiumBadge } from '@/components/shared/PremiumBadge'
import { VerifiedBadge } from '@/components/shared/VerifiedBadge'
import { TreatmentTag } from '@/components/shared/TreatmentTag'
import { ClickToCall } from '@/components/shared/ClickToCall'
import { getTopTreatments } from '@/lib/utils/treatments'
import { getPlaceholderImage } from '@/lib/utils/images'
import type { MedSpaCard as MedSpaCardType } from '@/types/database'

interface Props {
  spa: MedSpaCardType
}

export function PremiumMedSpaCard({ spa }: Props) {
  const treatments = getTopTreatments(spa.treatments, 5)

  return (
    <div className="relative rounded-2xl overflow-hidden hover-lift">
      {/* Gradient border wrapper — champagne-to-rose-gold */}
      <div className="bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#833AB4] p-[2px] rounded-2xl">
        {/* Shimmer accent bar */}
        <div className="shimmer absolute top-0 left-0 right-0 h-1 z-10" />

        {/* Inner card */}
        <div className="bg-white rounded-[calc(1rem-2px)] p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <PremiumBadge tier={spa.listing_tier} />
                {spa.is_verified && <VerifiedBadge />}
              </div>
              <Link href={`/med-spa/${spa.url_slug}`} className="group">
                <h3 className="text-xl font-bold text-[#262626] group-hover:text-[#E1306C] transition truncate">
                  {spa.business_name}
                </h3>
              </Link>
            </div>
            <div className="w-20 h-20 rounded-xl shadow-md overflow-hidden ml-4 flex-shrink-0">
              <Image
                src={spa.cover_image_url || getPlaceholderImage(spa.business_name)}
                alt={spa.business_name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <StarRating rating={spa.google_rating} count={spa.google_reviews_count} size="md" />

          <div className="flex items-center gap-1.5 text-[#262626]/50 text-sm mt-2">
            <MapPin className="w-4 h-4 text-[#833AB4] flex-shrink-0" />
            <span>{spa.address ? `${spa.address}, ` : ''}{spa.city}, {spa.state} {spa.zip_code}</span>
          </div>

          {spa.special_offer && (
            <div className="mt-4 bg-gradient-to-r from-[#833AB4]/10 to-[#E1306C]/10 border border-[#833AB4]/20 rounded-xl p-3 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#833AB4] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#1a1a2e] font-medium">{spa.special_offer}</p>
            </div>
          )}

          {treatments.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {treatments.map((t) => (
                <TreatmentTag key={t} treatment={t} />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-[#833AB4]/15 mt-5 pt-4">
            <ClickToCall phone={spa.phone} medSpaId={spa.id} variant="button" />
            <Link
              href={`/med-spa/${spa.url_slug}`}
              className="text-sm font-semibold text-[#E1306C] hover:text-[#833AB4] transition"
            >
              View Full Profile &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
