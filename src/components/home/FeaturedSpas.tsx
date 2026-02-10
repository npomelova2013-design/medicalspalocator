import { MedSpaCard } from '@/components/listings/MedSpaCard'
import { PremiumMedSpaCard } from '@/components/listings/PremiumMedSpaCard'
import type { MedSpaCard as MedSpaCardType } from '@/types/database'

interface Props {
  spas: MedSpaCardType[]
}

export function FeaturedSpas({ spas }: Props) {
  if (spas.length === 0) return null

  return (
    <section className="section-padding bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div>
          <p className="text-lg text-slate-400 font-medium">Featured</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Top-Rated Med Spas
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full mt-4 mb-10" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spas.map((spa) => (
            spa.listing_tier === 'premium' || spa.listing_tier === 'enterprise'
              ? <PremiumMedSpaCard key={spa.id} spa={spa} />
              : <MedSpaCard key={spa.id} spa={spa} />
          ))}
        </div>
      </div>
    </section>
  )
}
