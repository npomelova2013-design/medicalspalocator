import type { Metadata } from 'next'
import { getTotalCount } from '@/lib/queries/med-spas'
import { getAllCities } from '@/lib/queries/med-spas'
import { PricingPageClient } from '@/components/pricing/PricingPageClient'

export const metadata: Metadata = {
  title: 'Pricing — Grow Your Med Spa Business | Medical Spa Locator',
  description:
    'Premium listing plans for med spas. Get priority placement, verified badge, photo gallery, lead capture, and analytics. Plans from $97/month.',
}

export const revalidate = 3600

export default async function PricingPage() {
  const [totalSpas, cities] = await Promise.all([getTotalCount(), getAllCities()])
  const totalCities = cities.length

  return <PricingPageClient totalSpas={totalSpas} totalCities={totalCities} />
}
