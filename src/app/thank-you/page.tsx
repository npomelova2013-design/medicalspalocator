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
      <CheckCircle2 className="w-16 h-16 text-teal-600 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {isClaim ? 'Claim Request Submitted!' : 'Thanks for Your Request!'}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {isClaim
          ? "We'll verify your information and contact you within 24 hours to activate your listing."
          : 'A local med spa specialist will contact you shortly to help you find the perfect treatment.'}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-block bg-teal-600 text-white hover:bg-teal-700 font-medium px-6 py-2.5 rounded-lg transition"
        >
          Browse More Med Spas
        </Link>
        <Link
          href="/search"
          className="inline-block bg-white text-teal-600 border border-teal-600 hover:bg-teal-50 font-medium px-6 py-2.5 rounded-lg transition"
        >
          Search by Treatment
        </Link>
      </div>
    </div>
  )
}
