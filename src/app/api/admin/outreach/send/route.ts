import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email'
import { sendSMS } from '@/lib/sms'
import {
  getOutreachEmail1Html,
  getOutreachEmail2Html,
  getOutreachEmail3Html,
  getOutreachSMS1,
  getOutreachSMS2,
} from '@/lib/outreach-templates'

const VALID_METHODS = ['email', 'sms'] as const
const VALID_TEMPLATES = ['email1', 'email2', 'email3', 'sms1', 'sms2'] as const

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { medSpaId, method, templateId } = body

    if (!medSpaId) {
      return NextResponse.json({ error: 'medSpaId required' }, { status: 400 })
    }
    if (!method || !VALID_METHODS.includes(method)) {
      return NextResponse.json({ error: 'method must be email or sms' }, { status: 400 })
    }
    if (!templateId || !VALID_TEMPLATES.includes(templateId)) {
      return NextResponse.json({ error: 'Invalid templateId' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Fetch spa data
    const { data: spa, error: spaError } = await supabase
      .from('med_spas')
      .select('id, business_name, city, email, phone, profile_views')
      .eq('id', medSpaId)
      .single()

    if (spaError || !spa) {
      return NextResponse.json({ error: 'Med spa not found' }, { status: 404 })
    }

    let sent = false

    if (method === 'email') {
      if (!spa.email) {
        return NextResponse.json({ error: 'No email on file for this spa' }, { status: 400 })
      }

      let html = ''
      let subject = ''
      const views = spa.profile_views || 0

      switch (templateId) {
        case 'email1':
          html = getOutreachEmail1Html(spa.business_name, spa.city, views)
          subject = `${spa.business_name} — ${views}+ views on MedSpaLocator`
          break
        case 'email2':
          html = getOutreachEmail2Html(spa.business_name)
          subject = `Follow-up: Grow ${spa.business_name} with Premium`
          break
        case 'email3':
          html = getOutreachEmail3Html(spa.business_name)
          subject = `Last chance: Lock in launch pricing for ${spa.business_name}`
          break
      }

      sent = await sendEmail({ to: spa.email, subject, html })
    } else {
      // SMS
      if (!spa.phone) {
        return NextResponse.json({ error: 'No phone on file for this spa' }, { status: 400 })
      }

      let smsBody = ''
      const views = spa.profile_views || 0

      switch (templateId) {
        case 'sms1':
          smsBody = getOutreachSMS1(spa.business_name, views)
          break
        case 'sms2':
          smsBody = getOutreachSMS2(spa.business_name)
          break
      }

      sent = await sendSMS(spa.phone, smsBody)
    }

    // Update outreach status
    const updateData: Record<string, unknown> = {
      last_contacted: new Date().toISOString(),
    }

    // Only update outreach_status if currently not_contacted
    const { data: currentSpa } = await supabase
      .from('med_spas')
      .select('outreach_status')
      .eq('id', medSpaId)
      .single()

    if (currentSpa?.outreach_status === 'not_contacted') {
      updateData.outreach_status = 'contacted'
    }

    await supabase.from('med_spas').update(updateData).eq('id', medSpaId)

    return NextResponse.json({
      success: true,
      sent,
      method,
      templateId,
    })
  } catch (err) {
    console.error('Outreach send error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Failed to send outreach' }, { status: 500 })
  }
}
