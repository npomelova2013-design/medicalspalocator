import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Thank You' }

interface Props {
  searchParams: Promise<{ type?: string }>
}

export default async function ThankYouPage({ searchParams }: Props) {
  const { type } = await searchParams
  const isClaim = type === 'claim'
  const isListing = type === 'listing'

  const title = isClaim
    ? 'Claim Request Submitted!'
    : isListing
      ? 'Listing Request Submitted!'
      : 'Thanks for Your Request!'

  const message = isClaim
    ? "We'll verify your information and contact you within 24 hours to activate your listing."
    : isListing
      ? "We'll review your information and add your med spa to our directory within 48 hours."
      : 'A local med spa specialist will contact you shortly to help you find the perfect treatment.'

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 pt-24 text-center">
      <CheckCircle2 className="w-16 h-16 text-[#E1306C] mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-[#262626] mb-4">
        {title}
      </h1>
      <p className="text-lg text-[#262626]/60 mb-8">
        {message}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white hover:from-[#E1306C] hover:to-[#833AB4] font-medium px-6 py-2.5 rounded-full shadow-md shadow-[#833AB4]/20 hover:shadow-lg transition-all"
        >
          Browse More Med Spas
        </Link>
        <Link
          href="/search"
          className="inline-block bg-white text-[#E1306C] border border-[#E1306C] hover:bg-[#F0E6F6] font-medium px-6 py-2.5 rounded-lg transition"
        >
          Search by Treatment
        </Link>
      </div>
    </div>
  )
}
