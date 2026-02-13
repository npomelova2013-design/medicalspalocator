import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail, notifyAdmin } from '@/lib/email'
import { getClaimConfirmationHtml, getAdminNotificationHtml } from '@/lib/email-templates'

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
    const { medSpaId, name, email, phone, role, howHeard, message } = body

    // Required fields
    const nameClean = sanitize(name, 100)
    const emailClean = sanitize(email, 254)
    const phoneClean = sanitize(phone, 20)

    if (!nameClean || !emailClean || !phoneClean) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 })
    }

    // Email validation
    if (!EMAIL_RE.test(emailClean)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    // Phone validation: 10-15 digits
    const digitsOnly = phoneClean.replace(/\D/g, '')
    if (digitsOnly.length < 10 || digitsOnly.length > 15 || !PHONE_RE.test(phoneClean)) {
      return NextResponse.json({ error: 'Please enter a valid phone number (10-15 digits)' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { error } = await supabase
      .from('consumer_leads')
      .insert({
        first_name: nameClean,
        phone: phoneClean,
        email: emailClean,
        service_interest: `Claim Request - ${sanitize(role, 50) || 'owner'}`,
        notes: `How heard: ${sanitize(howHeard, 100) || 'unknown'}. ${sanitize(message, 500) || ''}`.trim(),
        source: 'claim_form',
        routed_to: sanitize(medSpaId, 100),
        status: 'new',
      })

    if (error) {
      console.error('Claim insert error:', error)
      return NextResponse.json({ error: 'Failed to save claim' }, { status: 500 })
    }

    // Fire-and-forget email notifications
    sendEmail({
      to: emailClean,
      subject: 'Your claim request has been received!',
      html: getClaimConfirmationHtml(nameClean, sanitize(medSpaId, 100) || 'your business'),
    }).catch(() => {})
    notifyAdmin(
      `New Claim Request: ${nameClean}`,
      getAdminNotificationHtml({
        name: nameClean,
        email: emailClean,
        phone: phoneClean,
        source: 'claim_form',
        serviceInterest: `Claim Request - ${sanitize(role, 50) || 'owner'}`,
        notes: `How heard: ${sanitize(howHeard, 100) || 'unknown'}. ${sanitize(message, 500) || ''}`.trim(),
      })
    ).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Claim API error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
