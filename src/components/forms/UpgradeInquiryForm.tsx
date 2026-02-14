'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { submitUpgradeRequest } from '@/lib/queries/leads'

interface Props {
  plan: string
  onSuccess?: () => void
}

export function UpgradeInquiryForm({ plan, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.email || !form.businessName) {
      setError('Email and business name are required')
      return
    }

    setLoading(true)
    const result = await submitUpgradeRequest({
      plan,
      email: form.email.trim(),
      name: form.name.trim() || undefined,
      businessName: form.businessName.trim(),
    })
    setLoading(false)

    if (!result.success) {
      setError(result.error || 'Something went wrong')
      return
    }

    if (result.url) {
      // Redirect to Stripe Checkout
      window.location.href = result.url
      return
    }

    // Fallback: no Stripe, saved as lead
    setSuccess(true)
    if (onSuccess) setTimeout(onSuccess, 2000)
  }

  if (success) {
    return (
      <div className="text-center py-6">
        <p className="text-[#833AB4] font-semibold text-lg mb-2">Request Received!</p>
        <p className="text-sm text-[#262626]/50">
          We&apos;ll contact you shortly to get your upgrade started.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-[#262626]/60 mb-1.5">Your Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-[#833AB4]/15 text-sm text-[#262626] focus:outline-none focus:border-[#833AB4]/40 focus:shadow-[0_0_0_3px_rgba(131,58,180,0.08)] transition"
          placeholder="Jane Smith"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#262626]/60 mb-1.5">Email *</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-[#833AB4]/15 text-sm text-[#262626] focus:outline-none focus:border-[#833AB4]/40 focus:shadow-[0_0_0_3px_rgba(131,58,180,0.08)] transition"
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#262626]/60 mb-1.5">Phone</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-[#833AB4]/15 text-sm text-[#262626] focus:outline-none focus:border-[#833AB4]/40 focus:shadow-[0_0_0_3px_rgba(131,58,180,0.08)] transition"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#262626]/60 mb-1.5">Business Name *</label>
        <input
          type="text"
          required
          value={form.businessName}
          onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-[#833AB4]/15 text-sm text-[#262626] focus:outline-none focus:border-[#833AB4]/40 focus:shadow-[0_0_0_3px_rgba(131,58,180,0.08)] transition"
          placeholder="Your Med Spa Name"
        />
      </div>

      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white font-semibold text-sm shadow-lg shadow-[#833AB4]/20 hover:shadow-xl hover:shadow-[#833AB4]/30 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Continue to Checkout`
        )}
      </button>

      <p className="text-xs text-[#262626]/40 text-center">
        Secure payment via Stripe. Cancel anytime.
      </p>
    </form>
  )
}
