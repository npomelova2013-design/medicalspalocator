import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MedSpaGrid } from '@/components/listings/MedSpaGrid'
import { getMedSpasByCity, getAllCities } from '@/lib/queries/med-spas'
import { getCitySummary } from '@/lib/queries/cities'
import { deslugifyCity, slugifyCity } from '@/lib/utils/formatting'
import { JsonLd, generateBreadcrumbJsonLd, generateCityListJsonLd, generateFaqJsonLd } from '@/components/shared/JsonLd'
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
  const summary = await getCitySummary(city)
  const spaCount = summary?.total_spas || ''
  const avgRating = summary ? Number(summary.avg_rating).toFixed(1) : '4.5'
  return {
    title: `Best Med Spas in ${city}, IL | Botox, Fillers & More`,
    description: `Compare ${spaCount} top-rated medical spas in ${city}, Illinois. Average rating: ${avgRating} stars. Read reviews and book consultations for Botox, fillers, laser treatments and more.`,
    alternates: { canonical: `/city/${cityName}` },
  }
}

function generateCityFaqs(city: string, spaCount: number, avgRating: string) {
  return [
    {
      question: `How many med spas are in ${city}, IL?`,
      answer: `There are ${spaCount} verified medical spas in ${city}, Illinois with an average Google rating of ${avgRating} stars. Medical Spa Locator helps you compare providers, read reviews, and book consultations.`,
    },
    {
      question: `What treatments are most popular at ${city} med spas?`,
      answer: `The most popular treatments at ${city} med spas include Botox, dermal fillers, laser hair removal, chemical peels, microneedling, and body contouring. Many providers also offer facials, PRP therapy, and CoolSculpting.`,
    },
    {
      question: `How do I choose a med spa in ${city}?`,
      answer: `When choosing a med spa in ${city}, look for verified listings with high Google ratings, read patient reviews, check that practitioners are licensed, and compare treatment options and pricing. Medical Spa Locator makes it easy to compare all providers side by side.`,
    },
  ]
}

export default async function CityPage({ params }: Props) {
  const { cityName } = await params
  const city = deslugifyCity(cityName)
  const [{ data: spas }, summary] = await Promise.all([
    getMedSpasByCity(city),
    getCitySummary(city),
  ])

  if (spas.length === 0) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medicalspalocator.com'
  const avgRating = summary ? Number(summary.avg_rating).toFixed(1) : '4.5'
  const faqs = generateCityFaqs(city, spas.length, avgRating)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pt-24">
      {/* Schema: Breadcrumb */}
      <JsonLd data={generateBreadcrumbJsonLd([
        { name: 'Home', url: siteUrl },
        { name: `${city}, IL`, url: `${siteUrl}/city/${cityName}` },
      ])} />
      {/* Schema: ItemList */}
      <JsonLd data={generateCityListJsonLd(city, spas)} />
      {/* Schema: FAQ */}
      <JsonLd data={generateFaqJsonLd(faqs)} />

      {/* Breadcrumb */}
      <nav className="text-sm text-[#262626]/40 mb-8">
        <Link href="/" className="hover:text-[#833AB4] transition">Home</Link>
        <span className="mx-2 text-[#262626]/20">/</span>
        <span className="text-[#262626]/70">{city}, IL</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-serif italic font-semibold tracking-editorial text-[#262626] mb-4">
          Best Med Spas in {city}, IL
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-[#833AB4] to-[#E1306C] rounded-full mb-6" />
        {summary && (
          <div className="flex flex-wrap gap-6 text-sm text-[#262626]/50">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#833AB4] to-[#E1306C]" />
              {summary.total_spas} med spas
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#833AB4]" />
              {avgRating} avg rating
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E1306C]" />
              {summary.total_reviews.toLocaleString()} total reviews
            </span>
          </div>
        )}
      </div>

      {/* Listings */}
      <MedSpaGrid spas={spas} emptyMessage={`No med spas found in ${city}.`} />

      {/* FAQ Section */}
      <section className="mt-16 mb-8">
        <h2 className="text-2xl font-serif italic font-semibold text-[#262626] mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-xl border border-[#833AB4]/10 p-5 hover:border-[#833AB4]/20 transition-colors">
              <summary className="font-medium text-[#262626] cursor-pointer list-none flex items-center justify-between">
                {faq.question}
                <span className="text-[#833AB4] text-xl leading-none ml-4 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-[#262626]/60 leading-relaxed text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-8 bg-gradient-to-br from-[#FAFAFA] to-[#F0E6F6]/20 rounded-2xl p-8 md:p-12 text-center border border-[#833AB4]/10">
        <h2 className="text-2xl font-serif italic font-semibold text-[#262626] mb-3">Own a Med Spa in {city}?</h2>
        <p className="text-[#262626]/50 mb-6 max-w-lg mx-auto">
          Claim your free listing to update your info and start receiving exclusive leads.
        </p>
        <Link
          href="/claim/info"
          className="inline-block bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white font-medium px-8 py-3 rounded-full transition-all shadow-lg shadow-[#833AB4]/20 hover:shadow-xl hover:shadow-[#833AB4]/30"
        >
          Claim Your Listing
        </Link>
      </div>
    </div>
  )
}
