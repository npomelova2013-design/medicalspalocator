import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MedSpaCard } from '@/components/listings/MedSpaCard'
import { PremiumMedSpaCard } from '@/components/listings/PremiumMedSpaCard'
import type { MedSpaCard as MedSpaCardType } from '@/types/database'

interface Props {
  spas: MedSpaCardType[]
}

export function FeaturedSpas({ spas }: Props) {
  if (spas.length === 0) return null

  return (
    <section className="section-padding bg-gradient-to-b from-[#FFF8F0] via-[#F5E6E0]/30 to-[#FFF8F0] relative overflow-hidden">
      {/* Background orbs */}
      <div className="gradient-orb gradient-orb-rose-gold absolute -top-32 -right-32 h-[400px] w-[400px] animate-float opacity-15" />
      <div className="gradient-orb gradient-orb-champagne absolute -bottom-40 -left-40 h-[450px] w-[450px] animate-float-delayed opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div>
          <p className="text-lg text-[#B76E79] font-medium">Featured</p>
          <h2 className="text-3xl md:text-4xl font-serif italic font-semibold tracking-editorial text-[#2C1810]">
            Top-Rated Med Spas
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B76E79] rounded-full mt-4 mb-10" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spas.map((spa) => (
            spa.listing_tier === 'premium' || spa.listing_tier === 'enterprise'
              ? <PremiumMedSpaCard key={spa.id} spa={spa} />
              : <MedSpaCard key={spa.id} spa={spa} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#B76E79] hover:text-[#D4AF37] transition-colors"
          >
            View All Med Spas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
