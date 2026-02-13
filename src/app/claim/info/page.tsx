import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, BarChart3, Star, Shield, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Claim Your Med Spa Listing',
  description: 'Claim your free listing on Medical Spa Locator. Update your information, add photos, and start receiving exclusive leads.',
}

export default function ClaimInfoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 pt-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-serif italic font-semibold tracking-editorial text-[#262626] mb-4">
          Grow Your Med Spa Business
        </h1>
        <p className="text-lg text-[#262626]/60 max-w-2xl mx-auto">
          Your listing is already live on Illinois&apos; largest med spa directory. Claim it to unlock powerful features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {[
          { icon: CheckCircle2, title: 'Update Your Info', desc: 'Keep your hours, services, and contact info accurate and up-to-date.' },
          { icon: Star, title: 'Showcase Reviews', desc: 'Highlight your best reviews and ratings to attract new clients.' },
          { icon: BarChart3, title: 'Track Performance', desc: 'See how many people view your listing, click your phone number, and visit your website.' },
          { icon: Shield, title: 'Premium Features', desc: 'Get featured placement, exclusive leads, and priority support.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white border border-[#833AB4]/10 rounded-xl p-6 flex gap-4 hover:border-[#833AB4]/30 hover:shadow-sm transition-all">
            <Icon className="w-8 h-8 text-[#833AB4] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-[#262626] mb-1">{title}</h3>
              <p className="text-sm text-[#262626]/60">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center bg-gradient-to-br from-[#FAFAFA] to-[#F0E6F6]/20 border border-[#833AB4]/10 rounded-xl p-8">
        <h2 className="text-xl font-serif italic font-semibold text-[#262626] mb-2">Ready to Get Started?</h2>
        <p className="text-[#262626]/60 mb-6">Search for your med spa below and click &ldquo;Claim This Listing&rdquo;</p>

        {/* Inline search form */}
        <form action="/search" method="GET" className="max-w-lg mx-auto">
          <div className="relative flex items-center rounded-2xl bg-white border border-[#833AB4]/15 shadow-lg shadow-black/[0.06] transition-all focus-within:border-[#833AB4]/40 focus-within:shadow-xl">
            <Search className="pointer-events-none absolute left-5 h-5 w-5 text-[#262626]/30" />
            <input
              type="text"
              name="q"
              placeholder="Enter your med spa name..."
              className="w-full rounded-2xl border-0 bg-transparent py-4 pl-14 pr-36 text-base text-[#262626] placeholder:text-[#262626]/30 focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="absolute right-3 rounded-xl bg-gradient-to-r from-[#833AB4] to-[#E1306C] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#833AB4]/25 transition-all hover:shadow-lg hover:shadow-[#E1306C]/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              Find Listing
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-[#262626]/50">
          Don&apos;t see your business?{' '}
          <Link href="/claim/new" className="text-[#E1306C] hover:underline font-medium">
            Add your med spa to our directory &rarr;
          </Link>
        </p>
      </div>
    </div>
  )
}
