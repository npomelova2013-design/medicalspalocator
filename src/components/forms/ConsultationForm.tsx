'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { submitLead } from '@/lib/queries/leads'
import { SERVICE_OPTIONS, TIMELINE_OPTIONS } from '@/lib/utils/constants'

interface Props {
  medSpaId: string
  medSpaCity: string
}

export function ConsultationForm({ medSpaId, medSpaCity }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const result = await submitLead({
      first_name: form.get('firstName') as string,
      last_name: form.get('lastName') as string,
      phone: form.get('phone') as string,
      email: form.get('email') as string,
      service_interest: form.get('service') as string,
      timeline: form.get('timeline') as string,
      notes: form.get('message') as string,
      preferred_city: medSpaCity,
      source: 'website_form',
      landing_page: window.location.pathname,
      routed_to: medSpaId,
      status: 'new',
    })

    setLoading(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.error || 'Something went wrong')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <h4 className="font-serif font-semibold text-[#2C1810] text-lg mb-1">Request Submitted!</h4>
        <p className="text-sm text-[#2C1810]/50">We&apos;ll be in touch within 24 hours.</p>
      </div>
    )
  }

  const inputClass = "mt-1.5 w-full rounded-xl border border-[#D4AF37]/15 bg-[#FFF8F0]/50 px-4 py-2.5 text-sm text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]/40 transition"
  const selectClass = "mt-1.5 w-full rounded-xl border border-[#D4AF37]/15 bg-[#FFF8F0]/50 px-4 py-2.5 text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]/40 transition appearance-none"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className="text-xs font-medium text-[#2C1810]/60">First Name *</label>
          <input id="firstName" name="firstName" required placeholder="Jane" className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className="text-xs font-medium text-[#2C1810]/60">Last Name</label>
          <input id="lastName" name="lastName" placeholder="Doe" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="text-xs font-medium text-[#2C1810]/60">Phone *</label>
        <input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="text-xs font-medium text-[#2C1810]/60">Email</label>
        <input id="email" name="email" type="email" placeholder="jane@email.com" className={inputClass} />
      </div>
      <div>
        <label htmlFor="service" className="text-xs font-medium text-[#2C1810]/60">Service Interested In</label>
        <select id="service" name="service" className={selectClass}>
          <option value="">Select a service...</option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="timeline" className="text-xs font-medium text-[#2C1810]/60">Timeline</label>
        <select id="timeline" name="timeline" className={selectClass}>
          <option value="">When are you looking?</option>
          {TIMELINE_OPTIONS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="text-xs font-medium text-[#2C1810]/60">Message (optional)</label>
        <textarea id="message" name="message" rows={2} placeholder="Any specific questions?" className={`${inputClass} resize-none`} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B76E79] hover:from-[#B76E79] hover:to-[#D4AF37] text-white font-medium py-3 rounded-xl transition-all shadow-md shadow-[#D4AF37]/20 hover:shadow-lg hover:shadow-[#D4AF37]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Request Free Consultation
      </button>

      <p className="text-[11px] text-[#2C1810]/30 text-center leading-relaxed">
        By submitting, you agree to be contacted about med spa services.
      </p>
    </form>
  )
}
