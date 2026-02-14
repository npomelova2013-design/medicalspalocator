import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SafeImage } from '@/components/shared/SafeImage'
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
import { getPlaceholderImage } from '@/lib/utils/images'
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
        <div className="relative bg-[#1a1a2e] pt-28 pb-16 overflow-hidden">
          <div className="gradient-orb gradient-orb-rose-gold absolute -top-20 -right-20 h-[400px] w-[400px] animate-float opacity-20" />
          <div className="gradient-orb gradient-orb-champagne absolute -bottom-20 -left-20 h-[300px] w-[300px] animate-float-delayed opacity-15" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="text-sm text-white/50 mb-8">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span className="mx-2 text-white/30">/</span>
              <Link href={`/city/${slugifyCity(spa.city)}`} className="hover:text-white transition">{spa.city}</Link>
              <span className="mx-2 text-white/30">/</span>
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
              <div className="mt-5 p-4 bg-gradient-to-r from-[#833AB4]/10 to-[#E1306C]/10 border border-[#833AB4]/20 rounded-xl inline-block">
                <p className="text-white/90 font-medium text-sm">Special Offer: {spa.special_offer}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-12 ${!isPremium ? 'pt-24' : ''}`}>
        {/* Breadcrumb — only for non-premium */}
        {!isPremium && (
          <nav className="text-sm text-[#262626]/50 mb-8">
            <Link href="/" className="hover:text-[#E1306C] transition">Home</Link>
            <span className="mx-2 text-[#262626]/30">/</span>
            <Link href={`/city/${slugifyCity(spa.city)}`} className="hover:text-[#E1306C] transition">{spa.city}</Link>
            <span className="mx-2 text-[#262626]/30">/</span>
            <span className="text-[#262626]/70">{spa.business_name}</span>
          </nav>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header — only for non-premium (premium has dark hero) */}
            {!isPremium && (
              <div className="rounded-2xl p-8 md:p-10 bg-white border border-[#833AB4]/10 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <PremiumBadge tier={spa.listing_tier} />
                  {spa.is_verified && <VerifiedBadge />}
                </div>

                <h1 className="text-3xl md:text-4xl font-serif italic font-semibold tracking-editorial text-[#262626] mb-4">{spa.business_name}</h1>

                <StarRating rating={spa.google_rating} count={spa.google_reviews_count} size="lg" />

                {spa.special_offer && (
                  <div className="mt-5 p-4 bg-gradient-to-r from-[#833AB4]/10 to-[#E1306C]/10 border border-[#833AB4]/20 rounded-xl">
                    <p className="text-[#1a1a2e] font-medium text-sm">Special Offer: {spa.special_offer}</p>
                  </div>
                )}
              </div>
            )}

            {/* Cover Image — for non-premium listings */}
            {!isPremium && (
              <div className="rounded-2xl overflow-hidden border border-[#833AB4]/10 shadow-sm">
                <SafeImage
                  src={spa.cover_image_url || getPlaceholderImage(spa.business_name)}
                  alt={spa.business_name}
                  width={800}
                  height={400}
                  className="w-full aspect-[2/1] object-cover object-center"
                  fallbackSrc={getPlaceholderImage(spa.business_name)}
                />
              </div>
            )}

            {/* Photo Gallery */}
            {spa.gallery_urls && spa.gallery_urls.length > 0 && (
              <div className="bg-white border border-[#833AB4]/10 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-serif italic font-semibold text-[#262626] mb-5">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {spa.gallery_urls.slice(0, 6).map((url, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden border border-[#833AB4]/10">
                      <SafeImage
                        src={url}
                        alt={`${spa.business_name} photo ${i + 1}`}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        fallbackSrc={getPlaceholderImage(spa.business_name)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video — for premium listings */}
            {isPremium && spa.video_url && (
              <div className="rounded-2xl overflow-hidden border border-[#833AB4]/10 shadow-sm">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full aspect-video object-cover"
                >
                  <source src={spa.video_url} type="video/mp4" />
                </video>
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-white border border-[#833AB4]/10 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-serif italic font-semibold text-[#262626] mb-5">Contact Information</h2>
              <div className="space-y-4">
                {spa.phone && (
                  <div className="flex items-center gap-3">
                    <ClickToCall phone={spa.phone} medSpaId={spa.id} variant="button" />
                  </div>
                )}
                {spa.address && (
                  <div className="flex items-start gap-3 text-[#262626]/60">
                    <MapPin className="w-5 h-5 text-[#833AB4] flex-shrink-0 mt-0.5" />
                    <span>{formatAddress(spa.address, spa.city, spa.state, spa.zip_code)}</span>
                  </div>
                )}
                {spa.website && (
                  <div className="flex items-center gap-3 text-[#262626]/60">
                    <Globe className="w-5 h-5 text-[#833AB4]" />
                    <a
                      href={spa.website.startsWith('http') ? spa.website : `https://${spa.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E1306C] hover:text-[#833AB4] hover:underline truncate"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                {spa.email && (
                  <div className="flex items-center gap-3 text-[#262626]/60">
                    <Mail className="w-5 h-5 text-[#833AB4]" />
                    <a href={`mailto:${spa.email}`} className="text-[#E1306C] hover:text-[#833AB4] hover:underline">{spa.email}</a>
                  </div>
                )}
              </div>
            </div>

            {/* Treatments */}
            {treatments.length > 0 && (
              <div className="bg-white border border-[#833AB4]/10 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-serif italic font-semibold text-[#262626] mb-5">Services & Treatments</h2>
                <div className="flex flex-wrap gap-2">
                  {treatments.map((t) => (
                    <TreatmentTag key={t} treatment={t} />
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <div className="bg-white border border-[#833AB4]/10 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-serif italic font-semibold text-[#262626] mb-5">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <TreatmentTag key={c} treatment={c} />
                  ))}
                </div>
              </div>
            )}

            {/* Claim CTA */}
            {!spa.is_claimed && (
              <div className="bg-gradient-to-br from-[#FAFAFA] to-[#F0E6F6]/20 border border-[#833AB4]/10 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-serif italic font-semibold text-[#262626] mb-3">Are you the owner?</h2>
                <p className="text-[#262626]/50 mb-6 max-w-lg mx-auto">
                  Claim this listing to update your information, add photos, respond to reviews, and access premium features.
                </p>
                <Link
                  href={`/claim/${spa.id}`}
                  className="inline-block bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white font-medium px-8 py-3 rounded-full transition-all shadow-lg shadow-[#833AB4]/20 hover:shadow-xl hover:shadow-[#833AB4]/30"
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
              <div className="bg-white border border-[#833AB4]/10 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-serif italic font-semibold text-[#262626] mb-4">Request a Consultation</h3>
                <ConsultationForm medSpaId={spa.id} medSpaCity={spa.city} />
              </div>

              {/* Nearby Spas */}
              {nearby.length > 0 && (
                <div>
                  <h3 className="text-lg font-serif italic font-semibold text-[#262626] mb-4">
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
