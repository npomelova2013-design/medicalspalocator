import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { special_offer } = body

    if (special_offer !== undefined && special_offer !== null && typeof special_offer !== 'string') {
      return NextResponse.json({ error: 'Invalid special_offer' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const updateData: Record<string, string | null> = {
      special_offer: special_offer && typeof special_offer === 'string' && special_offer.trim().length > 0
        ? special_offer.trim().slice(0, 500)
        : null,
    }

    const { error } = await supabase
      .from('med_spas')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Listing update error:', error)
      return NextResponse.json({ error: 'Failed to update listing' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Listing update API error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
