import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { medSpaId, name, email, phone, role, howHeard, message } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { error } = await supabase
      .from('consumer_leads')
      .insert({
        first_name: name,
        phone,
        email,
        service_interest: `Claim Request - ${role || 'owner'}`,
        notes: `How heard: ${howHeard || 'unknown'}. ${message || ''}`.trim(),
        source: 'claim_form',
        routed_to: medSpaId || null,
        status: 'new',
      })

    if (error) {
      console.error('Claim insert error:', error)
      return NextResponse.json({ error: 'Failed to save claim' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
