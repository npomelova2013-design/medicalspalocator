import { Hero } from '@/components/home/Hero'
import { CityGrid } from '@/components/home/CityGrid'
import { StatsBar } from '@/components/home/StatsBar'
import { FeaturedSpas } from '@/components/home/FeaturedSpas'
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
      <CityGrid cities={cities} />
      <FeaturedSpas spas={featured} />

      {/* CTA Section - spacer for footer CTA overlap */}
      <div className="h-32" />
    </>
  )
}
