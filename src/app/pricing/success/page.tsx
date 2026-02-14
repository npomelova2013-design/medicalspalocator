import { CheckCircle2, ArrowRight, BarChart3, Image as ImageIcon, Sparkles } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome to Premium! | Medical Spa Locator',
}

export default function PricingSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 pt-28">
      {/* Success header */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#833AB4] to-[#E1306C] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif italic font-semibold tracking-editorial text-[#262626] mb-3">
          Welcome to Premium!
        </h1>
        <p className="text-lg text-[#262626]/60">
          Your subscription is active and your listing has been upgraded.
        </p>
      </div>

      {/* Next steps */}
      <div className="mt-10 space-y-4">
        <h2 className="text-xl font-serif italic font-semibold text-[#262626] mb-4">
          Here&apos;s what to do next:
        </h2>

        {[
          {
            icon: ImageIcon,
            title: 'Add Photos & Videos',
            description: 'Upload your best facility photos, treatment results, and team photos to attract more patients.',
          },
          {
            icon: Sparkles,
            title: 'Set Up Special Offers',
            description: 'Create a special offer that displays prominently on your listing to convert more visitors.',
          },
          {
            icon: BarChart3,
            title: 'Monitor Your Analytics',
            description: 'Track profile views, click-to-calls, and lead form submissions from your admin dashboard.',
          },
        ].map((step, i) => {
          const Icon = step.icon
          return (
            <div key={i} className="flex gap-4 p-5 bg-white border border-[#833AB4]/10 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#833AB4]/10 to-[#E1306C]/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#833AB4]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#262626] text-sm">{step.title}</h3>
                <p className="text-sm text-[#262626]/60 mt-0.5">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Confirmation email note */}
      <div className="mt-8 bg-[#F0E6F6]/50 border border-[#833AB4]/10 rounded-xl p-5 text-center">
        <p className="text-sm text-[#262626]/60">
          A confirmation email has been sent to your inbox with your subscription details and login information.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
        <Link
          href="/admin"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white font-medium px-6 py-3 rounded-full shadow-md shadow-[#833AB4]/20 hover:shadow-lg transition-all"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-white text-[#E1306C] border border-[#E1306C]/30 hover:bg-[#F0E6F6] font-medium px-6 py-3 rounded-full transition"
        >
          Browse Directory
        </Link>
      </div>
    </div>
  )
}
