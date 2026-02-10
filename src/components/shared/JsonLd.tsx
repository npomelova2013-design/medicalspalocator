import type { MedSpa } from '@/types/database'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function generateListingJsonLd(spa: MedSpa) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: spa.business_name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: spa.address || '',
      addressLocality: spa.city,
      addressRegion: spa.state,
      postalCode: spa.zip_code || '',
      addressCountry: 'US',
    },
    telephone: spa.phone || undefined,
    url: spa.website || `https://medicalspalocator.com/med-spa/${spa.url_slug}`,
    ...(spa.google_rating ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: spa.google_rating.toString(),
        reviewCount: spa.google_reviews_count.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    } : {}),
    medicalSpecialty: ['Dermatology', 'PlasticSurgery'],
    priceRange: '$$',
  }
}
