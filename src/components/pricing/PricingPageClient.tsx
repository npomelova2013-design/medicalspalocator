'use client'

import { useState } from 'react'
import { Check, X, ChevronDown, Sparkles, Shield, BarChart3, Image as ImageIcon, Phone, Star, Zap } from 'lucide-react'
import { UpgradeInquiryForm } from '@/components/forms/UpgradeInquiryForm'

interface Props {
  totalSpas: number
  totalCities: number
}

const plans = [
  {
    key: 'claimed' as const,
    name: 'Claimed',
    price: 97,
    description: 'Take control of your listing',
    highlight: false,
    features: [
      'Claim & edit your listing',
      'Add business description',
      'Contact info displayed',
      'Basic analytics',
      'Lead form submissions',
      'Email notifications',
    ],
  },
  {
    key: 'premium' as const,
    name: 'Premium',
    price: 197,
    description: 'Stand out from the competition',
    highlight: true,
    features: [
      'Everything in Claimed',
      'Priority search placement',
      'Verified badge ✓',
      'Photo gallery (up to 6)',
      'Special offers banner',
      'Click-to-call tracking',
      'Advanced analytics',
      'Featured on city pages',
    ],
  },
  {
    key: 'enterprise' as const,
    name: 'Enterprise',
    price: 297,
    description: 'Maximum visibility & leads',
    highlight: false,
    features: [
      'Everything in Premium',
      'Top placement in all searches',
      'Video showcase',
      'Unlimited gallery photos',
      'Custom branding',
      'Dedicated account manager',
      'Monthly performance reports',
      'Priority support',
    ],
  },
]

const comparisonFeatures = [
  { name: 'Claim & edit listing', free: false, claimed: true, premium: true, enterprise: true },
  { name: 'Contact info displayed', free: true, claimed: true, premium: true, enterprise: true },
  { name: 'Google rating shown', free: true, claimed: true, premium: true, enterprise: true },
  { name: 'Lead form submissions', free: false, claimed: true, premium: true, enterprise: true },
  { name: 'Email notifications', free: false, claimed: true, premium: true, enterprise: true },
  { name: 'Business description', free: false, claimed: true, premium: true, enterprise: true },
  { name: 'Priority search placement', free: false, claimed: false, premium: true, enterprise: true },
  { name: 'Verified badge', free: false, claimed: false, premium: true, enterprise: true },
  { name: 'Photo gallery', free: false, claimed: false, premium: '6 photos', enterprise: 'Unlimited' },
  { name: 'Special offers banner', free: false, claimed: false, premium: true, enterprise: true },
  { name: 'Click-to-call tracking', free: false, claimed: false, premium: true, enterprise: true },
  { name: 'Advanced analytics', free: false, claimed: false, premium: true, enterprise: true },
  { name: 'Video showcase', free: false, claimed: false, premium: false, enterprise: true },
  { name: 'Dedicated account manager', free: false, claimed: false, premium: false, enterprise: true },
]

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes! All plans are month-to-month with no contracts. Cancel anytime from your dashboard or by contacting us.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Premium and Enterprise listings typically see a 3x increase in profile views within the first month. Lead form submissions usually start within the first week.',
  },
  {
    q: 'Do I need an existing listing?',
    a: "No! If your med spa isn't listed yet, we'll create your profile as part of the onboarding process.",
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards (Visa, Mastercard, Amex) through our secure Stripe payment system.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Absolutely. You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the end of your billing cycle.',
  },
  {
    q: 'Is there a setup fee?',
    a: 'No setup fees. The monthly price is all you pay. We also offer a free listing option if you just want basic visibility.',
  },
]

export function PricingPageClient({ totalSpas, totalCities }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1a1a2e] pt-28 pb-20 overflow-hidden">
        <div className="gradient-orb gradient-orb-rose-gold absolute -top-20 -right-20 h-[400px] w-[400px] animate-float opacity-20" />
        <div className="gradient-orb gradient-orb-champagne absolute -bottom-20 -left-20 h-[300px] w-[300px] animate-float-delayed opacity-15" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#E1306C] font-medium text-sm tracking-wide uppercase mb-3">Pricing Plans</p>
          <h1 className="font-serif italic font-semibold text-4xl md:text-5xl lg:text-6xl tracking-editorial text-white leading-tight">
            Grow Your Med Spa{' '}
            <span className="instagram-gradient-text">Business</span>
          </h1>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            Join {totalSpas.toLocaleString()}+ med spas across {totalCities} cities. Get more patients with premium placement, verified badges, and lead capture tools.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? 'bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#833AB4] p-[2px] shadow-xl shadow-[#833AB4]/20'
                  : 'border border-[#833AB4]/15 shadow-md'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-0 left-0 right-0 bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white text-xs font-bold text-center py-1.5 tracking-wide uppercase z-10">
                  Most Popular
                </div>
              )}
              <div className={`bg-white p-8 h-full flex flex-col ${plan.highlight ? 'rounded-[calc(1rem-2px)] pt-10' : 'rounded-2xl'}`}>
                <h3 className="text-xl font-bold text-[#262626]">{plan.name}</h3>
                <p className="text-sm text-[#262626]/50 mt-1">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#262626]">${plan.price}</span>
                  <span className="text-[#262626]/50 text-sm">/month</span>
                </div>

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#262626]/70">
                      <Check className="w-4 h-4 text-[#833AB4] flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.key)}
                  className={`mt-8 w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white shadow-lg shadow-[#833AB4]/20 hover:shadow-xl hover:shadow-[#833AB4]/30'
                      : 'bg-[#F0E6F6] text-[#833AB4] hover:bg-[#E1306C] hover:text-white'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Free tier note */}
        <p className="text-center text-sm text-[#262626]/40 mt-8">
          Not ready to upgrade?{' '}
          <a href="/claim/info" className="text-[#E1306C] hover:underline">
            Claim your free listing
          </a>{' '}
          and upgrade anytime.
        </p>
      </section>

      {/* Upgrade Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 text-[#262626]/40 hover:text-[#262626] transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-serif italic font-semibold text-[#262626] mb-1">
              Get Started with {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
            </h3>
            <p className="text-sm text-[#262626]/50 mb-6">
              ${plans.find((p) => p.key === selectedPlan)?.price}/month — cancel anytime
            </p>
            <UpgradeInquiryForm
              plan={selectedPlan}
              onSuccess={() => setSelectedPlan(null)}
            />
          </div>
        </div>
      )}

      {/* Feature Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-serif italic font-semibold text-[#262626] text-center mb-10">
          Compare All Features
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#833AB4]/15">
                <th className="text-left py-4 pr-4 font-medium text-[#262626]/50">Feature</th>
                <th className="text-center py-4 px-4 font-medium text-[#262626]/50">Free</th>
                <th className="text-center py-4 px-4 font-medium text-[#262626]/70">Claimed<br /><span className="text-xs text-[#262626]/40">$97/mo</span></th>
                <th className="text-center py-4 px-4 font-bold text-[#833AB4]">Premium<br /><span className="text-xs font-medium">$197/mo</span></th>
                <th className="text-center py-4 px-4 font-medium text-[#262626]/70">Enterprise<br /><span className="text-xs text-[#262626]/40">$297/mo</span></th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feat) => (
                <tr key={feat.name} className="border-b border-[#833AB4]/5 hover:bg-[#F0E6F6]/50 transition">
                  <td className="py-3 pr-4 text-[#262626]/70">{feat.name}</td>
                  {(['free', 'claimed', 'premium', 'enterprise'] as const).map((tier) => {
                    const val = feat[tier]
                    return (
                      <td key={tier} className="text-center py-3 px-4">
                        {val === true ? (
                          <Check className="w-4 h-4 text-[#833AB4] mx-auto" />
                        ) : val === false ? (
                          <X className="w-4 h-4 text-[#262626]/20 mx-auto" />
                        ) : (
                          <span className="text-xs font-medium text-[#833AB4]">{val}</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="bg-[#1a1a2e] py-16 relative overflow-hidden">
        <div className="gradient-orb gradient-orb-rose-gold absolute -top-20 right-10 h-[300px] w-[300px] opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-serif italic font-semibold text-white text-center mb-12">
            Trusted by Med Spas Across Illinois
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: BarChart3, stat: `${totalSpas.toLocaleString()}+`, label: 'Listed Med Spas' },
              { icon: Star, stat: `${totalCities}`, label: 'Cities Covered' },
              { icon: Phone, stat: '1,200+', label: 'Monthly Leads' },
              { icon: Shield, stat: '99.9%', label: 'Uptime' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label}>
                  <Icon className="w-6 h-6 text-[#E1306C] mx-auto mb-2" />
                  <p className="text-3xl font-bold text-white">{item.stat}</p>
                  <p className="text-sm text-white/60 mt-1">{item.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Upgrade */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-serif italic font-semibold text-[#262626] text-center mb-12">
          Why Med Spas Choose Premium
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: 'More Visibility', desc: 'Premium listings appear first in search results and city pages, getting 3x more profile views.' },
            { icon: Shield, title: 'Build Trust', desc: 'The verified badge and photo gallery help patients choose your spa with confidence.' },
            { icon: ImageIcon, title: 'Showcase Your Work', desc: 'Upload photos and videos of your facility, treatments, and before/after results.' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#833AB4]/10 to-[#E1306C]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#833AB4]" />
                </div>
                <h3 className="font-semibold text-[#262626] mb-2">{item.title}</h3>
                <p className="text-sm text-[#262626]/60 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-3xl font-serif italic font-semibold text-[#262626] text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[#833AB4]/10 rounded-xl overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-[#262626] text-[15px]">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#833AB4] flex-shrink-0 ml-4 transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-[#262626]/70 leading-relaxed border-t border-[#833AB4]/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-[#833AB4]/5 to-[#E1306C]/5 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Sparkles className="w-8 h-8 text-[#E1306C] mx-auto mb-4" />
          <h2 className="text-3xl font-serif italic font-semibold text-[#262626] mb-3">
            Ready to Grow Your Practice?
          </h2>
          <p className="text-[#262626]/50 mb-8 max-w-lg mx-auto">
            Join hundreds of med spas already benefiting from premium placement and lead generation tools.
          </p>
          <button
            onClick={() => setSelectedPlan('premium')}
            className="bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-[#833AB4]/20 hover:shadow-xl hover:shadow-[#833AB4]/30 transition-all"
          >
            Start Your Premium Listing
          </button>
        </div>
      </section>

      {/* Spacer for footer CTA overlap */}
      <div className="h-32" />
    </>
  )
}
