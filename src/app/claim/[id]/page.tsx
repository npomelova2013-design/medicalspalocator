import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMedSpaById } from '@/lib/queries/med-spas'
import { ClaimForm } from '@/components/forms/ClaimForm'
import { StarRating } from '@/components/shared/StarRating'

export const metadata: Metadata = {
  title: 'Claim Your Listing',
  description: 'Claim your med spa listing to update your information and access premium features.',
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function ClaimPage({ params }: Props) {
  const { id } = await params
  const spa = await getMedSpaById(id)
  if (!spa) notFound()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pt-24">
      <nav className="text-sm text-[#262626]/50 mb-6">
        <Link href="/" className="hover:text-[#E1306C]">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/med-spa/${spa.url_slug}`} className="hover:text-[#E1306C]">{spa.business_name}</Link>
        <span className="mx-2">/</span>
        <span className="text-[#262626]">Claim</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-[#262626] mb-2">Claim Your Listing</h1>

      <div className="bg-[#FAFAFA] border border-[#E1306C]/20 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-[#262626]">{spa.business_name}</h3>
        <p className="text-sm text-[#262626]/60">{spa.city}, {spa.state}</p>
        <StarRating rating={spa.google_rating} count={spa.google_reviews_count} size="sm" />
      </div>

      <div className="bg-white border border-[#E1306C]/20 rounded-xl p-6">
        <p className="text-[#262626]/60 mb-6">
          Verify your identity as the owner or authorized representative of this business. We&apos;ll review your information and contact you within 24 hours.
        </p>
        <ClaimForm medSpaId={spa.id} businessName={spa.business_name} />
      </div>
    </div>
  )
}
