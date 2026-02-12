import type { MedSpa, MedSpaCard } from '@/types/database'

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

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateCityListJsonLd(city: string, spas: MedSpaCard[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medicalspalocator.com'
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Med Spas in ${city}, IL`,
    numberOfItems: spas.length,
    itemListElement: spas.slice(0, 10).map((spa, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'MedicalBusiness',
        name: spa.business_name,
        url: `${siteUrl}/med-spa/${spa.url_slug}`,
        ...(spa.google_rating ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: spa.google_rating.toString(),
            reviewCount: (spa.google_reviews_count || 0).toString(),
          },
        } : {}),
      },
    })),
  }
}

export function generateFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
