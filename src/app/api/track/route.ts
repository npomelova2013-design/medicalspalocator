import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event_type, med_spa_id, page_path, referrer, metadata } = body

    if (!event_type) {
      return NextResponse.json({ error: 'event_type required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Insert event
    await supabase.from('analytics_events').insert({
      event_type,
      med_spa_id: med_spa_id || null,
      page_path: page_path || null,
      referrer: referrer || null,
      metadata: metadata || null,
    })

    // Auto-increment counters on med_spas
    if (med_spa_id) {
      if (event_type === 'page_view') {
        await supabase.rpc('track_event', {
          p_event_type: 'page_view',
          p_med_spa_id: med_spa_id,
          p_page_path: page_path || null,
          p_referrer: referrer || null,
        })
      } else if (event_type === 'phone_click') {
        await supabase.rpc('track_event', {
          p_event_type: 'phone_click',
          p_med_spa_id: med_spa_id,
          p_page_path: page_path || null,
        })
      } else if (event_type === 'website_click') {
        await supabase.rpc('track_event', {
          p_event_type: 'website_click',
          p_med_spa_id: med_spa_id,
          p_page_path: page_path || null,
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
