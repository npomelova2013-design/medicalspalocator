import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, BarChart3, Star, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Claim Your Med Spa Listing',
  description: 'Claim your free listing on Medical Spa Locator. Update your information, add photos, and start receiving exclusive leads.',
}

export default function ClaimInfoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Grow Your Med Spa Business
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
          <div key={title} className="bg-white border border-gray-200 rounded-xl p-6 flex gap-4">
            <Icon className="w-8 h-8 text-teal-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center bg-teal-50 border border-teal-200 rounded-xl p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-4">Search for your med spa below and click &ldquo;Claim This Listing&rdquo;</p>
        <Link
          href="/search"
          className="inline-block bg-teal-600 text-white hover:bg-teal-700 font-medium px-8 py-3 rounded-lg transition"
        >
          Find Your Listing
        </Link>
      </div>
    </div>
  )
}
