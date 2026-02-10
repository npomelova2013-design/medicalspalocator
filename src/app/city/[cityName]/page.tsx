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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-teal-600 transition">Home</Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-700">{city}, IL</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
          Best Med Spas in {city}, IL
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full mb-6" />
        {summary && (
          <div className="flex flex-wrap gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              {summary.total_spas} med spas
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              {Number(summary.avg_rating).toFixed(1)} avg rating
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              {summary.total_reviews.toLocaleString()} total reviews
            </span>
          </div>
        )}
      </div>

      {/* Listings */}
      <MedSpaGrid spas={spas} emptyMessage={`No med spas found in ${city}.`} />

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-2xl p-8 md:p-12 text-center border border-slate-100">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">Own a Med Spa in {city}?</h2>
        <p className="text-slate-500 mb-6 max-w-lg mx-auto">
          Claim your free listing to update your info and start receiving exclusive leads.
        </p>
        <Link
          href="/claim/info"
          className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 font-medium px-8 py-3 rounded-full transition-all shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30"
        >
          Claim Your Listing
        </Link>
      </div>
    </div>
  )
}
