import type { ConsumerLead } from '@/types/database'

export async function submitLead(lead: Partial<ConsumerLead>): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    if (!res.ok) {
      const err = await res.json()
      return { success: false, error: err.error || 'Failed to submit' }
    }
    return { success: true }
  } catch {
    return { success: false, error: 'Network error' }
  }
}

export async function submitClaimRequest(data: {
  medSpaId: string
  name: string
  email: string
  phone: string
  role: string
  howHeard: string
  message?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const err = await res.json()
      return { success: false, error: err.error || 'Failed to submit' }
    }
    return { success: true }
  } catch {
    return { success: false, error: 'Network error' }
  }
}
