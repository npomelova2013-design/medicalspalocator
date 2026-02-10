import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MedSpaGrid } from '@/components/listings/MedSpaGrid'
import { getMedSpasByCity, getAllCities } from '@/lib/queries/med-spas'
import { getCitySummary } from '@/lib/queries/cities'
import { deslugifyCity, slugifyCity } from '@/lib/utils/formatting'
import Link from 'next/link'

export const revalidate = 1800

interface Props {
  params: Promise<{ cityName: string }>
}

export async function generateStaticParams() {
  const cities = await getAllCities()
  return cities.map((city) => ({ cityName: slugifyCity(city) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cityName } = await params
  const city = deslugifyCity(cityName)
  return {
    title: `Best Med Spas in ${city}, IL`,
    description: `Compare top-rated medical spas in ${city}, Illinois. Read reviews, compare ratings, and book consultations for Botox, fillers, laser treatments and more.`,
  }
}

export default async function CityPage({ params }: Props) {
  const { cityName } = await params
  const city = deslugifyCity(cityName)
  const [{ data: spas }, summary] = await Promise.all([
    getMedSpasByCity(city),
    getCitySummary(city),
  ])

  if (spas.length === 0) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pt-24">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#2C1810]/40 mb-8">
        <Link href="/" className="hover:text-[#D4AF37] transition">Home</Link>
        <span className="mx-2 text-[#2C1810]/20">/</span>
        <span className="text-[#2C1810]/70">{city}, IL</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-serif italic font-semibold tracking-editorial text-[#2C1810] mb-4">
          Best Med Spas in {city}, IL
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B76E79] rounded-full mb-6" />
        {summary && (
          <div className="flex flex-wrap gap-6 text-sm text-[#2C1810]/50">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B76E79]" />
              {summary.total_spas} med spas
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              {Number(summary.avg_rating).toFixed(1)} avg rating
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B76E79]" />
              {summary.total_reviews.toLocaleString()} total reviews
            </span>
          </div>
        )}
      </div>

      {/* Listings */}
      <MedSpaGrid spas={spas} emptyMessage={`No med spas found in ${city}.`} />

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-br from-[#FFF8F0] to-[#F5E6E0]/20 rounded-2xl p-8 md:p-12 text-center border border-[#D4AF37]/10">
        <h2 className="text-2xl font-serif italic font-semibold text-[#2C1810] mb-3">Own a Med Spa in {city}?</h2>
        <p className="text-[#2C1810]/50 mb-6 max-w-lg mx-auto">
          Claim your free listing to update your info and start receiving exclusive leads.
        </p>
        <Link
          href="/claim/info"
          className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#B76E79] text-white font-medium px-8 py-3 rounded-full transition-all shadow-lg shadow-[#D4AF37]/20 hover:shadow-xl hover:shadow-[#D4AF37]/30"
        >
          Claim Your Listing
        </Link>
      </div>
    </div>
  )
}
