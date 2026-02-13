import type { Metadata } from 'next'
import Link from 'next/link'
import { ListingRequestForm } from '@/components/forms/ListingRequestForm'

export const metadata: Metadata = {
  title: 'Add Your Med Spa',
  description: 'Submit your med spa to be listed on Medical Spa Locator — Illinois\' largest med spa directory.',
}

export default function NewListingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 pt-24">
      <nav className="text-sm text-[#262626]/50 mb-6">
        <Link href="/" className="hover:text-[#E1306C]">Home</Link>
        <span className="mx-2 text-[#262626]/30">/</span>
        <Link href="/claim/info" className="hover:text-[#E1306C]">List Your Spa</Link>
        <span className="mx-2 text-[#262626]/30">/</span>
        <span className="text-[#262626]">Add New</span>
      </nav>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-serif italic font-semibold tracking-editorial text-[#262626] mb-3">
          Add Your Med Spa
        </h1>
        <p className="text-[#262626]/60 max-w-lg mx-auto">
          Not in our directory yet? Tell us about your med spa and we&apos;ll get you listed within 48 hours.
        </p>
      </div>

      <div className="bg-white border border-[#833AB4]/10 rounded-2xl p-6 sm:p-8 shadow-sm">
        <ListingRequestForm />
      </div>

      <p className="text-center text-sm text-[#262626]/40 mt-6">
        Already listed?{' '}
        <Link href="/claim/info" className="text-[#833AB4] hover:underline">
          Claim your existing listing
        </Link>
      </p>
    </div>
  )
}
