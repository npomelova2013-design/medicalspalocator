'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { submitClaimRequest } from '@/lib/queries/leads'

interface Props {
  medSpaId: string
  businessName: string
}

export function ClaimForm({ medSpaId }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const result = await submitClaimRequest({
      medSpaId,
      name: form.get('name') as string,
      email: form.get('email') as string,
      phone: form.get('phone') as string,
      role: form.get('role') as string,
      howHeard: form.get('howHeard') as string,
      message: form.get('message') as string,
    })

    setLoading(false)
    if (result.success) {
      router.push('/thank-you?type=claim')
    } else {
      setError(result.error || 'Something went wrong')
    }
  }

  const inputClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition"
  const selectClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition appearance-none"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-slate-700">Your Name *</label>
        <input id="name" name="name" required placeholder="Dr. Jane Smith" className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-700">Email *</label>
        <input id="email" name="email" type="email" required placeholder="jane@yourspa.com" className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone *</label>
        <input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" className={inputClass} />
      </div>
      <div>
        <label htmlFor="role" className="text-sm font-medium text-slate-700">Your Role</label>
        <select id="role" name="role" className={selectClass}>
          <option value="owner">Owner</option>
          <option value="manager">Practice Manager</option>
          <option value="marketing">Marketing Director</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="howHeard" className="text-sm font-medium text-slate-700">How did you hear about us?</label>
        <select id="howHeard" name="howHeard" className={selectClass}>
          <option value="google">Google Search</option>
          <option value="called">Your team called me</option>
          <option value="email">Email from your team</option>
          <option value="referral">Referral</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-slate-700">Message (optional)</label>
        <textarea id="message" name="message" rows={3} placeholder="Any questions or comments?" className={`${inputClass} resize-none`} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium py-3 rounded-xl transition-all shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Submit Claim Request
      </button>
    </form>
  )
}
