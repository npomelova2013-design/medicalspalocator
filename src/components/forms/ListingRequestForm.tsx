'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { submitListingRequest } from '@/lib/queries/leads'

export function ListingRequestForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const result = await submitListingRequest({
      businessName: form.get('businessName') as string,
      ownerName: form.get('ownerName') as string,
      email: form.get('email') as string,
      phone: form.get('phone') as string,
      website: form.get('website') as string,
      city: form.get('city') as string,
      services: form.get('services') as string,
      message: form.get('message') as string,
    })

    setLoading(false)
    if (result.success) {
      router.push('/thank-you?type=listing')
    } else {
      setError(result.error || 'Something went wrong')
    }
  }

  const inputClass = "mt-1.5 w-full rounded-xl border border-[#833AB4]/15 bg-[#FAFAFA]/50 px-4 py-2.5 text-sm text-[#262626] placeholder:text-[#262626]/40 focus:outline-none focus:ring-2 focus:ring-[#833AB4]/20 focus:border-[#833AB4]/40 transition"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="businessName" className="text-sm font-medium text-[#262626]/70">Business Name *</label>
        <input id="businessName" name="businessName" required placeholder="Your Med Spa Name" className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ownerName" className="text-sm font-medium text-[#262626]/70">Your Name *</label>
          <input id="ownerName" name="ownerName" required placeholder="Dr. Jane Smith" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-[#262626]/70">Phone *</label>
          <input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-[#262626]/70">Email *</label>
        <input id="email" name="email" type="email" required placeholder="jane@yourspa.com" className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="text-sm font-medium text-[#262626]/70">City *</label>
          <input id="city" name="city" required placeholder="Chicago" className={inputClass} />
        </div>
        <div>
          <label htmlFor="website" className="text-sm font-medium text-[#262626]/70">Website (optional)</label>
          <input id="website" name="website" type="url" placeholder="https://yourspa.com" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="services" className="text-sm font-medium text-[#262626]/70">Services Offered *</label>
        <input id="services" name="services" required placeholder="Botox, Fillers, Laser Hair Removal..." className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-[#262626]/70">Additional Info (optional)</label>
        <textarea id="message" name="message" rows={3} placeholder="Anything else you'd like us to know?" className={`${inputClass} resize-none`} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#833AB4] to-[#E1306C] hover:from-[#E1306C] hover:to-[#833AB4] text-white font-medium py-3 rounded-xl transition-all shadow-md shadow-[#833AB4]/20 hover:shadow-lg hover:shadow-[#833AB4]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Submit Listing Request
      </button>
    </form>
  )
}
