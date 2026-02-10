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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      <CheckCircle2 className="w-16 h-16 text-[#B76E79] mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-[#2C1810] mb-4">
        {isClaim ? 'Claim Request Submitted!' : 'Thanks for Your Request!'}
      </h1>
      <p className="text-lg text-[#2C1810]/60 mb-8">
        {isClaim
          ? "We'll verify your information and contact you within 24 hours to activate your listing."
          : 'A local med spa specialist will contact you shortly to help you find the perfect treatment.'}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-block bg-[#D4AF37] text-white hover:bg-[#B8960E] font-medium px-6 py-2.5 rounded-lg transition"
        >
          Browse More Med Spas
        </Link>
        <Link
          href="/search"
          className="inline-block bg-white text-[#B76E79] border border-[#B76E79] hover:bg-[#F5E6E0] font-medium px-6 py-2.5 rounded-lg transition"
        >
          Search by Treatment
        </Link>
      </div>
    </div>
  )
}
