import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, notes } = body

    const validStatuses = ['new', 'contacted', 'converted', 'lost']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const updateData: Record<string, string> = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = typeof notes === 'string' ? notes.slice(0, 1000) : ''

    const { error } = await supabase
      .from('consumer_leads')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Lead update error:', error)
      return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead update API error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
