import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail, notifyAdmin } from '@/lib/email'
import { getLeadConfirmationHtml, getAdminNotificationHtml } from '@/lib/email-templates'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[\d\s\-().]{10,15}$/

function sanitize(val: unknown, maxLen: number = 500): string | null {
  if (typeof val !== 'string') return null
  const trimmed = val.trim()
  return trimmed.length > 0 ? trimmed.slice(0, maxLen) : null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { first_name, last_name, phone, email, service_interest, preferred_city, timeline, notes, source, landing_page, routed_to } = body

    // Required fields
    const name = sanitize(first_name, 100)
    const phoneClean = sanitize(phone, 20)

    if (!name || !phoneClean) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    // Phone validation: 10-15 digits
    const digitsOnly = phoneClean.replace(/\D/g, '')
    if (digitsOnly.length < 10 || digitsOnly.length > 15 || !PHONE_RE.test(phoneClean)) {
      return NextResponse.json({ error: 'Please enter a valid phone number (10-15 digits)' }, { status: 400 })
    }

    // Optional email validation
    const emailClean = sanitize(email, 254)
    if (emailClean && !EMAIL_RE.test(emailClean)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('consumer_leads')
      .insert({
        first_name: name,
        last_name: sanitize(last_name, 100),
        phone: phoneClean,
        email: emailClean,
        service_interest: sanitize(service_interest, 200),
        preferred_city: sanitize(preferred_city, 100),
        timeline: sanitize(timeline, 100),
        notes: sanitize(notes, 500),
        source: sanitize(source, 50) || 'website_form',
        landing_page: sanitize(landing_page, 500),
        routed_to: sanitize(routed_to, 100),
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
      med_spa_id: sanitize(routed_to, 100),
      lead_id: data?.id || null,
      page_path: sanitize(landing_page, 500) || '/',
    })

    // Send email notifications (await so Vercel doesn't kill the function early)
    try {
      await Promise.all([
        emailClean
          ? sendEmail({
              to: emailClean,
              subject: 'Your consultation request has been received!',
              html: getLeadConfirmationHtml(name),
            })
          : Promise.resolve(),
        notifyAdmin(
          `New Lead: ${name} - ${sanitize(service_interest, 200) || 'General'}`,
          getAdminNotificationHtml({
            name,
            email: emailClean,
            phone: phoneClean,
            source: 'website_form',
            serviceInterest: sanitize(service_interest, 200),
            city: sanitize(preferred_city, 100),
            notes: sanitize(notes, 500),
          })
        ),
      ])
    } catch (emailErr) {
      console.error('Email notification error:', emailErr)
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Lead API error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
