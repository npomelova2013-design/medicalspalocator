import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/thank-you'] },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://medicalspalocator.com'}/sitemap.xml`,
  }
}
