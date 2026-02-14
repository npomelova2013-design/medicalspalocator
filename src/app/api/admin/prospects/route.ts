import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '25')
    const city = searchParams.get('city') || ''
    const tier = searchParams.get('tier') || ''
    const outreachStatus = searchParams.get('outreach_status') || ''
    const search = searchParams.get('search') || ''
    const offset = (page - 1) * limit

    const supabase = createAdminClient()

    let query = supabase
      .from('med_spas')
      .select(
        'id, business_name, city, state, phone, email, listing_tier, profile_views, phone_clicks, google_rating, google_reviews_count, outreach_status, outreach_notes, last_contacted, prospect_score',
        { count: 'exact' }
      )
      .eq('is_active', true)

    if (city) {
      query = query.ilike('city', city)
    }
    if (tier) {
      query = query.eq('listing_tier', tier)
    }
    if (outreachStatus) {
      query = query.eq('outreach_status', outreachStatus)
    }
    if (search) {
      query = query.or(`business_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    const { data, error, count } = await query
      .order('prospect_score', { ascending: false, nullsFirst: false })
      .order('profile_views', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Prospects query error:', error)
      return NextResponse.json({ error: 'Failed to fetch prospects' }, { status: 500 })
    }

    return NextResponse.json({
      data: data || [],
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    })
  } catch (err) {
    console.error('Prospects API error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
