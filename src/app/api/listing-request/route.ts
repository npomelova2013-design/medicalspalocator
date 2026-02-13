import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

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
    const { businessName, ownerName, email, phone, website, city, services, message } = body

    // Required fields
    const businessNameClean = sanitize(businessName, 200)
    const ownerNameClean = sanitize(ownerName, 100)
    const emailClean = sanitize(email, 254)
    const phoneClean = sanitize(phone, 20)
    const cityClean = sanitize(city, 100)
    const servicesClean = sanitize(services, 500)

    if (!businessNameClean || !ownerNameClean || !emailClean || !phoneClean || !cityClean || !servicesClean) {
      return NextResponse.json(
        { error: 'Business name, owner name, email, phone, city, and services are required' },
        { status: 400 }
      )
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

    // Optional fields
    const websiteClean = sanitize(website, 300)
    const messageClean = sanitize(message, 500)

    const supabase = createAdminClient()

    const noteParts = [
      websiteClean ? `Website: ${websiteClean}` : null,
      `Services: ${servicesClean}`,
      messageClean || null,
    ].filter(Boolean).join('. ')

    const { error } = await supabase
      .from('consumer_leads')
      .insert({
        first_name: ownerNameClean,
        phone: phoneClean,
        email: emailClean,
        service_interest: `New Listing - ${businessNameClean}, ${cityClean}`,
        notes: noteParts,
        source: 'listing_request',
        status: 'new',
      })

    if (error) {
      console.error('Listing request insert error:', error)
      return NextResponse.json({ error: 'Failed to save listing request' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Listing request API error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
