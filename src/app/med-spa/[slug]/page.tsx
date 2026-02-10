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
  const isPremium = spa.listing_tier === 'premium' || spa.listing_tier === 'enterprise'

  return (
    <>
      <JsonLd data={generateListingJsonLd(spa)} />
      <PageViewTracker medSpaId={spa.id} />

      {/* Premium dark hero for premium/enterprise listings */}
      {isPremium && (
        <div className="relative bg-[#5C1A33] pt-28 pb-16 overflow-hidden">
          <div className="gradient-orb gradient-orb-rose-gold absolute -top-20 -right-20 h-[400px] w-[400px] animate-float opacity-20" />
          <div className="gradient-orb gradient-orb-champagne absolute -bottom-20 -left-20 h-[300px] w-[300px] animate-float-delayed opacity-15" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="text-sm text-[#D4AF37]/40 mb-8">
              <Link href="/" className="hover:text-[#D4AF37] transition">Home</Link>
              <span className="mx-2 text-[#D4AF37]/20">/</span>
              <Link href={`/city/${slugifyCity(spa.city)}`} className="hover:text-[#D4AF37] transition">{spa.city}</Link>
              <span className="mx-2 text-[#D4AF37]/20">/</span>
              <span className="text-white/80">{spa.business_name}</span>
            </nav>

            <div className="flex items-center gap-2 mb-3">
              <PremiumBadge tier={spa.listing_tier} />
              {spa.is_verified && <VerifiedBadge />}
            </div>

            <h1 className="text-3xl md:text-5xl font-serif italic font-semibold tracking-editorial text-white mb-4">
              {spa.business_name}
            </h1>

            <StarRating rating={spa.google_rating} count={spa.google_reviews_count} size="lg" />

            {spa.special_offer && (
              <div className="mt-5 p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#B76E79]/10 border border-[#D4AF37]/20 rounded-xl inline-block">
                <p className="text-white/90 font-medium text-sm">Special Offer: {spa.special_offer}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb — only for non-premium */}
        {!isPremium && (
          <nav className="text-sm text-[#2C1810]/40 mb-8">
            <Link href="/" className="hover:text-[#D4AF37] transition">Home</Link>
            <span className="mx-2 text-[#2C1810]/20">/</span>
            <Link href={`/city/${slugifyCity(spa.city)}`} className="hover:text-[#D4AF37] transition">{spa.city}</Link>
            <span className="mx-2 text-[#2C1810]/20">/</span>
            <span className="text-[#2C1810]/70">{spa.business_name}</span>
          </nav>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header — only for non-premium (premium has dark hero) */}
            {!isPremium && (
              <div className="rounded-2xl p-8 md:p-10 bg-white border border-[#D4AF37]/10 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <PremiumBadge tier={spa.listing_tier} />
                  {spa.is_verified && <VerifiedBadge />}
                </div>

                <h1 className="text-3xl md:text-4xl font-serif italic font-semibold tracking-editorial text-[#2C1810] mb-4">{spa.business_name}</h1>

                <StarRating rating={spa.google_rating} count={spa.google_reviews_count} size="lg" />

                {spa.special_offer && (
                  <div className="mt-5 p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#B76E79]/10 border border-[#D4AF37]/20 rounded-xl">
                    <p className="text-[#5C1A33] font-medium text-sm">Special Offer: {spa.special_offer}</p>
                  </div>
                )}
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-white border border-[#D4AF37]/10 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-serif italic font-semibold text-[#2C1810] mb-5">Contact Information</h2>
              <div className="space-y-4">
                {spa.phone && (
                  <div className="flex items-center gap-3">
                    <ClickToCall phone={spa.phone} medSpaId={spa.id} variant="button" />
                  </div>
                )}
                {spa.address && (
                  <div className="flex items-start gap-3 text-[#2C1810]/60">
                    <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{formatAddress(spa.address, spa.city, spa.state, spa.zip_code)}</span>
                  </div>
                )}
                {spa.website && (
                  <div className="flex items-center gap-3 text-[#2C1810]/60">
                    <Globe className="w-5 h-5 text-[#D4AF37]" />
                    <a
                      href={spa.website.startsWith('http') ? spa.website : `https://${spa.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B76E79] hover:text-[#D4AF37] hover:underline truncate"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                {spa.email && (
                  <div className="flex items-center gap-3 text-[#2C1810]/60">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                    <a href={`mailto:${spa.email}`} className="text-[#B76E79] hover:text-[#D4AF37] hover:underline">{spa.email}</a>
                  </div>
                )}
              </div>
            </div>

            {/* Treatments */}
            {treatments.length > 0 && (
              <div className="bg-white border border-[#D4AF37]/10 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-serif italic font-semibold text-[#2C1810] mb-5">Services & Treatments</h2>
                <div className="flex flex-wrap gap-2">
                  {treatments.map((t) => (
                    <TreatmentTag key={t} treatment={t} />
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <div className="bg-white border border-[#D4AF37]/10 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-serif italic font-semibold text-[#2C1810] mb-5">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <TreatmentTag key={c} treatment={c} />
                  ))}
                </div>
              </div>
            )}

            {/* Claim CTA */}
            {!spa.is_claimed && (
              <div className="bg-gradient-to-br from-[#FFF8F0] to-[#F5E6E0]/20 border border-[#D4AF37]/10 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-serif italic font-semibold text-[#2C1810] mb-3">Are you the owner?</h2>
                <p className="text-[#2C1810]/50 mb-6 max-w-lg mx-auto">
                  Claim this listing to update your information, add photos, respond to reviews, and access premium features.
                </p>
                <Link
                  href={`/claim/${spa.id}`}
                  className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#B76E79] text-white font-medium px-8 py-3 rounded-full transition-all shadow-lg shadow-[#D4AF37]/20 hover:shadow-xl hover:shadow-[#D4AF37]/30"
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
              <div className="bg-white border border-[#D4AF37]/10 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-serif italic font-semibold text-[#2C1810] mb-4">Request a Consultation</h3>
                <ConsultationForm medSpaId={spa.id} medSpaCity={spa.city} />
              </div>

              {/* Nearby Spas */}
              {nearby.length > 0 && (
                <div>
                  <h3 className="text-lg font-serif italic font-semibold text-[#2C1810] mb-4">
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
