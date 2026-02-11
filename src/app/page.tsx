import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/home/Hero'
import { CityGrid } from '@/components/home/CityGrid'
import { StatsBar } from '@/components/home/StatsBar'
import { FeaturedSpas } from '@/components/home/FeaturedSpas'
import { TreatmentMarquee } from '@/components/home/TreatmentMarquee'
import { TrustLogosBar } from '@/components/home/TrustLogosBar'
import { getCitySummaries } from '@/lib/queries/cities'
import { getFeaturedSpas, getTotalCount } from '@/lib/queries/med-spas'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const [cities, featured, totalSpas] = await Promise.all([
    getCitySummaries(),
    getFeaturedSpas(6),
    getTotalCount(),
  ])

  const totalCities = cities.length

  return (
    <>
      <Hero />
      <StatsBar totalSpas={totalSpas} totalCities={totalCities} />
      <TrustLogosBar />
      <CityGrid cities={cities} />
      <FeaturedSpas spas={featured} />

      {/* Treatment Marquee */}
      <TreatmentMarquee />

      {/* Dark CTA Section */}
      <section className="relative bg-[#1a1a2e] py-24 md:py-36 overflow-hidden">
        {/* Floating orbs */}
        <div className="gradient-orb gradient-orb-rose-gold absolute -top-20 -left-20 h-[400px] w-[400px] animate-float opacity-20" />
        <div className="gradient-orb gradient-orb-champagne absolute -bottom-24 -right-24 h-[350px] w-[350px] animate-float-delayed opacity-15" />
        <div className="gradient-orb gradient-orb-mauve absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-float-slow opacity-10" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif italic font-semibold text-4xl md:text-5xl lg:text-6xl tracking-editorial text-white leading-tight">
            Your Perfect Treatment
            <br />
            <span className="instagram-gradient-text">Starts Here</span>
          </h2>
          <p className="mt-6 text-lg text-[#833AB4]/50 max-w-2xl mx-auto">
            Browse hundreds of verified med spas, compare ratings, and find the best providers for Botox, fillers, laser treatments, and more.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 mt-10 bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-[#833AB4]/20 hover:shadow-xl hover:shadow-[#833AB4]/30 transition-all"
          >
            Explore All Med Spas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Spacer for footer CTA overlap */}
      <div className="h-32" />
    </>
  )
}
