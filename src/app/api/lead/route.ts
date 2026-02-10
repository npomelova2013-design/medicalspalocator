import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { first_name, last_name, phone, email, service_interest, preferred_city, timeline, notes, source, landing_page, routed_to } = body

    if (!first_name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('consumer_leads')
      .insert({
        first_name,
        last_name: last_name || null,
        phone,
        email: email || null,
        service_interest: service_interest || null,
        preferred_city: preferred_city || null,
        timeline: timeline || null,
        notes: notes || null,
        source: source || 'website_form',
        landing_page: landing_page || null,
        routed_to: routed_to || null,
        status: 'new',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Lead insert error:', error)
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    // Track the event
    await supabase.from('analytics_events').insert({
      event_type: 'lead_form_submit',
      med_spa_id: routed_to || null,
      lead_id: data?.id || null,
      page_path: landing_page || '/',
    })

    return NextResponse.json({ success: true, id: data?.id })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
