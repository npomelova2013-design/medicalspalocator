import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Globe, Mail } from 'lucide-react'
import { getMedSpaBySlug, getAllSlugs, getNearbySpas } from '@/lib/queries/med-spas'
import { StarRating } from '@/components/shared/StarRating'
import { PremiumBadge } from '@/components/shared/PremiumBadge'
import { VerifiedBadge } from '@/components/shared/VerifiedBadge'
import { TreatmentTag } from '@/components/shared/TreatmentTag'
import { ClickToCall } from '@/components/shared/ClickToCall'
import { JsonLd, generateListingJsonLd } from '@/components/shared/JsonLd'
import { MedSpaCard } from '@/components/listings/MedSpaCard'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { parseTreatments } from '@/lib/utils/treatments'
import { formatAddress, slugifyCity } from '@/lib/utils/formatting'
import { PageViewTracker } from '@/components/detail/PageViewTracker'

export const revalidate = 1800

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(({ url_slug }) => ({ slug: url_slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const spa = await getMedSpaBySlug(slug)
  if (!spa) return { title: 'Not Found' }
  return {
    title: `${spa.business_name} - ${spa.city}, IL`,
    description: spa.meta_description || `${spa.business_name} in ${spa.city}, IL. ${spa.google_rating ? `Rated ${spa.google_rating} stars with ${spa.google_reviews_count} reviews.` : ''} Book your consultation today.`,
  }
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params
  const spa = await getMedSpaBySlug(slug)
  if (!spa) notFound()

  const nearby = await getNearbySpas(spa.city, spa.id, 3)
  const treatments = parseTreatments(spa.treatments)
  const categories = parseTreatments(spa.categories)

  return (
    <>
      <JsonLd data={generateListingJsonLd(spa)} />
      <PageViewTracker medSpaId={spa.id} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-teal-600 transition">Home</Link>
          <span className="mx-2 text-slate-300">/</span>
          <Link href={`/city/${slugifyCity(spa.city)}`} className="hover:text-teal-600 transition">{spa.city}</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-700">{spa.business_name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className={`rounded-2xl p-8 md:p-10 ${spa.listing_tier === 'premium' || spa.listing_tier === 'enterprise' ? 'bg-gradient-to-br from-amber-50 to-amber-100/30 border-2 border-amber-300' : 'bg-white border border-slate-100 shadow-sm'}`}>
              <div className="flex items-center gap-2 mb-3">
                <PremiumBadge tier={spa.listing_tier} />
                {spa.is_verified && <VerifiedBadge />}
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">{spa.business_name}</h1>

              <StarRating rating={spa.google_rating} count={spa.google_reviews_count} size="lg" />

              {spa.special_offer && (
                <div className="mt-5 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200/50 rounded-xl">
                  <p className="text-amber-800 font-medium text-sm">Special Offer: {spa.special_offer}</p>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-serif font-semibold text-slate-900 mb-5">Contact Information</h2>
              <div className="space-y-4">
                {spa.phone && (
                  <div className="flex items-center gap-3">
                    <ClickToCall phone={spa.phone} medSpaId={spa.id} variant="button" />
                  </div>
                )}
                {spa.address && (
                  <div className="flex items-start gap-3 text-slate-600">
                    <MapPin className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>{formatAddress(spa.address, spa.city, spa.state, spa.zip_code)}</span>
                  </div>
                )}
                {spa.website && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <Globe className="w-5 h-5 text-teal-500" />
                    <a
                      href={spa.website.startsWith('http') ? spa.website : `https://${spa.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-700 hover:underline truncate"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                {spa.email && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="w-5 h-5 text-teal-500" />
                    <a href={`mailto:${spa.email}`} className="text-teal-600 hover:underline">{spa.email}</a>
                  </div>
                )}
              </div>
            </div>

            {/* Treatments */}
            {treatments.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-serif font-semibold text-slate-900 mb-5">Services & Treatments</h2>
                <div className="flex flex-wrap gap-2">
                  {treatments.map((t) => (
                    <TreatmentTag key={t} treatment={t} />
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-serif font-semibold text-slate-900 mb-5">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <TreatmentTag key={c} treatment={c} />
                  ))}
                </div>
              </div>
            )}

            {/* Claim CTA */}
            {!spa.is_claimed && (
              <div className="bg-gradient-to-br from-slate-50 to-teal-50/30 border border-slate-100 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">Are you the owner?</h2>
                <p className="text-slate-500 mb-6 max-w-lg mx-auto">
                  Claim this listing to update your information, add photos, respond to reviews, and access premium features.
                </p>
                <Link
                  href={`/claim/${spa.id}`}
                  className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 font-medium px-8 py-3 rounded-full transition-all shadow-lg shadow-teal-500/20"
                >
                  Claim This Listing
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Consultation Form */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-serif font-semibold text-slate-900 mb-4">Request a Consultation</h3>
                <ConsultationForm medSpaId={spa.id} medSpaCity={spa.city} />
              </div>

              {/* Nearby Spas */}
              {nearby.length > 0 && (
                <div>
                  <h3 className="text-lg font-serif font-semibold text-slate-900 mb-4">
                    Other Med Spas in {spa.city}
                  </h3>
                  <div className="space-y-4">
                    {nearby.map((n) => (
                      <MedSpaCard key={n.id} spa={n} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
