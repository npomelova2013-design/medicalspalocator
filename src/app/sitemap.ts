import { MetadataRoute } from 'next'
import { getAllSlugs, getAllCities } from '@/lib/queries/med-spas'
import { slugifyCity } from '@/lib/utils/formatting'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medicalspalocator.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, cities] = await Promise.all([getAllSlugs(), getAllCities()])

  return [
    { url: BASE_URL, lastModified: new Date(), priority: 1, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/search`, lastModified: new Date(), priority: 0.5, changeFrequency: 'weekly' },
    ...cities.map((city) => ({
      url: `${BASE_URL}/city/${slugifyCity(city)}`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    })),
    ...slugs.map(({ url_slug, updated_at }) => ({
      url: `${BASE_URL}/med-spa/${url_slug}`,
      lastModified: new Date(updated_at),
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    })),
  ]
}
