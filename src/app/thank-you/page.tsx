import Link from 'next/link'
import { CheckCircle2, FileSearch, Phone, Sparkles, Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Thank You' }

interface Props {
  searchParams: Promise<{ type?: string }>
}

const stepsConfig: Record<string, {
  title: string
  subtitle: string
  timeline: string
  steps: { icon: typeof FileSearch; label: string; description: string }[]
}> = {
  claim: {
    title: 'Claim Request Submitted!',
    subtitle: "You're on your way to managing your listing.",
    timeline: 'Within 24 hours',
    steps: [
      { icon: FileSearch, label: 'We Verify', description: 'We review your ownership details and verify your business information.' },
      { icon: Phone, label: 'We Contact You', description: 'Our team reaches out to confirm your identity and discuss your listing.' },
      { icon: Sparkles, label: 'Your Listing Goes Live', description: 'Gain full control: update info, add photos, and start receiving leads.' },
    ],
  },
  listing: {
    title: 'Listing Request Submitted!',
    subtitle: "We're excited to add your med spa to our directory.",
    timeline: 'Within 48 hours',
    steps: [
      { icon: FileSearch, label: 'We Review', description: 'Our team reviews your business information and services offered.' },
      { icon: Phone, label: 'We Reach Out', description: 'We contact you to gather additional details and finalize your profile.' },
      { icon: Sparkles, label: 'You Go Live', description: 'Your med spa appears in search results and starts receiving patient inquiries.' },
    ],
  },
  default: {
    title: 'Thanks for Your Request!',
    subtitle: "We'll match you with the perfect med spa.",
    timeline: 'Within 24 hours',
    steps: [
      { icon: FileSearch, label: 'We Review', description: 'Our team reviews your preferences and treatment interests.' },
      { icon: Phone, label: 'A Specialist Calls', description: 'A local med spa specialist contacts you to discuss your goals.' },
      { icon: Sparkles, label: 'Book Your Visit', description: 'Get matched with a top-rated med spa and schedule your consultation.' },
    ],
  },
}

export default async function ThankYouPage({ searchParams }: Props) {
  const { type } = await searchParams
  const config = stepsConfig[type || ''] || stepsConfig.default

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 pt-24">
      {/* Success header */}
      <div className="text-center">
        <CheckCircle2 className="w-16 h-16 text-[#E1306C] mx-auto mb-6" />
        <h1 className="text-3xl font-serif italic font-semibold tracking-editorial text-[#262626] mb-3">
          {config.title}
        </h1>
        <p className="text-lg text-[#262626]/60">
          {config.subtitle}
        </p>
      </div>

      {/* Timeline stepper */}
      <div className="max-w-md mx-auto mt-10">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Clock className="w-4 h-4 text-[#833AB4]" />
          <p className="text-sm font-medium text-[#833AB4]">Expected timeline: {config.timeline}</p>
        </div>

        <div className="space-y-0">
          {config.steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative flex gap-4">
                {/* Vertical connector line */}
                {index < config.steps.length - 1 && (
                  <div className="absolute left-5 top-12 w-0.5 h-[calc(100%-12px)] bg-gradient-to-b from-[#833AB4]/30 to-[#E1306C]/30" />
                )}

                {/* Step circle */}
                <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-[#833AB4] to-[#E1306C] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Step content */}
                <div className="pb-8">
                  <h3 className="font-semibold text-[#262626] text-base">
                    Step {index + 1}: {step.label}
                  </h3>
                  <p className="text-sm text-[#262626]/60 mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* What to expect */}
      <div className="mt-6 bg-white border border-[#833AB4]/10 rounded-2xl p-6 text-left">
        <h3 className="font-serif font-semibold text-[#262626] text-lg mb-3">What to Expect</h3>
        <ul className="space-y-2.5 text-sm text-[#262626]/60">
          <li className="flex items-start gap-2.5">
            <ArrowRight className="w-4 h-4 text-[#833AB4] flex-shrink-0 mt-0.5" />
            <span>You may receive a call or email from our team</span>
          </li>
          <li className="flex items-start gap-2.5">
            <ArrowRight className="w-4 h-4 text-[#833AB4] flex-shrink-0 mt-0.5" />
            <span>We never share your information with third parties</span>
          </li>
          <li className="flex items-start gap-2.5">
            <ArrowRight className="w-4 h-4 text-[#833AB4] flex-shrink-0 mt-0.5" />
            <span>You can reply to any email if you have questions</span>
          </li>
        </ul>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
        <Link
          href="/"
          className="inline-block text-center bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white hover:from-[#E1306C] hover:to-[#833AB4] font-medium px-6 py-2.5 rounded-full shadow-md shadow-[#833AB4]/20 hover:shadow-lg transition-all"
        >
          Browse More Med Spas
        </Link>
        <Link
          href="/search"
          className="inline-block text-center bg-white text-[#E1306C] border border-[#E1306C] hover:bg-[#F0E6F6] font-medium px-6 py-2.5 rounded-lg transition"
        >
          Search by Treatment
        </Link>
      </div>
    </div>
  )
}
