import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const VALID_STATUSES = ['not_contacted', 'contacted', 'interested', 'declined', 'converted']

interface Props {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params
    const body = await request.json()
    const { outreach_status, outreach_notes } = body

    const supabase = createAdminClient()

    const updateData: Record<string, unknown> = {}

    if (outreach_status !== undefined) {
      if (!VALID_STATUSES.includes(outreach_status)) {
        return NextResponse.json({ error: 'Invalid outreach status' }, { status: 400 })
      }
      updateData.outreach_status = outreach_status
    }

    if (outreach_notes !== undefined) {
      updateData.outreach_notes = outreach_notes
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const { error } = await supabase
      .from('med_spas')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Prospect update error:', error)
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Prospect PUT error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
