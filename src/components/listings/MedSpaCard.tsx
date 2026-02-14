import Link from 'next/link'
import { SafeImage } from '@/components/shared/SafeImage'
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

export function MedSpaCard({ spa }: Props) {
  const treatments = getTopTreatments(spa.treatments, 3)

  return (
    <div className="gradient-border-hover group">
      <div className="rounded-2xl border border-[#833AB4]/10 bg-white overflow-hidden transition-all duration-300 shadow-md shadow-black/[0.06]">
        <div className="h-48 overflow-hidden">
          <SafeImage
            src={spa.cover_image_url || getPlaceholderImage(spa.business_name)}
            alt={spa.business_name}
            width={400}
            height={192}
            className="w-full h-full object-cover object-center"
            fallbackSrc={getPlaceholderImage(spa.business_name)}
          />
        </div>

        <div className="p-6">
          <Link href={`/med-spa/${spa.url_slug}`} className="group/link">
            <h3 className="text-lg font-semibold text-[#262626] group-hover/link:text-[#E1306C] transition truncate">
              {spa.business_name}
            </h3>
          </Link>

          <div className="flex items-center gap-2 mt-2">
            {spa.is_verified && <VerifiedBadge />}
            <PremiumBadge tier={spa.listing_tier} size="sm" />
          </div>

          <div className="mt-3">
            <StarRating rating={spa.google_rating} count={spa.google_reviews_count} size="sm" />
          </div>

          <div className="flex items-center gap-1.5 text-[#262626]/50 text-sm mt-2">
            <MapPin className="w-3.5 h-3.5 text-[#833AB4] flex-shrink-0" />
            <span className="truncate">
              {spa.address ? `${spa.address}, ` : ''}{spa.city}, {spa.state} {spa.zip_code}
            </span>
          </div>

          {treatments.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {treatments.map((t) => (
                <TreatmentTag key={t} treatment={t} />
              ))}
            </div>
          )}

          {spa.special_offer && (
            <div className="mt-3 bg-gradient-to-r from-[#833AB4]/10 to-[#E1306C]/10 border border-[#833AB4]/20 rounded-lg p-2.5 flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#833AB4] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#1a1a2e] font-medium line-clamp-2">{spa.special_offer}</p>
            </div>
          )}

          <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#833AB4]/10">
            <ClickToCall phone={spa.phone} medSpaId={spa.id} />
            <Link
              href={`/med-spa/${spa.url_slug}`}
              className="text-sm font-medium text-[#E1306C] hover:text-[#833AB4] transition"
            >
              View Profile &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
