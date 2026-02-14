import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, type PlanKey } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_PLANS: PlanKey[] = ['claimed', 'premium', 'enterprise']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, medSpaId, email, name, businessName } = body

    if (!plan || !VALID_PLANS.includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }
    if (!businessName?.trim()) {
      return NextResponse.json({ error: 'Business name required' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-five-navy-28.vercel.app'

    const checkoutUrl = await createCheckoutSession({
      plan: plan as PlanKey,
      medSpaId: medSpaId || undefined,
      email: email.trim(),
      businessName: businessName.trim(),
      successUrl: `${siteUrl}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${siteUrl}/pricing`,
    })

    if (!checkoutUrl) {
      // Stripe not configured — fall back to saving as lead
      const supabase = createAdminClient()
      await supabase.from('consumer_leads').insert({
        first_name: name?.trim() || null,
        email: email.trim(),
        service_interest: `Upgrade to ${plan} — ${businessName.trim()}`,
        notes: medSpaId ? `MedSpa ID: ${medSpaId}` : undefined,
        source: 'upgrade_request',
        status: 'new',
      })
      return NextResponse.json({
        success: true,
        fallback: true,
        message: 'Your upgrade request has been received! We will contact you shortly.',
      })
    }

    return NextResponse.json({ url: checkoutUrl })
  } catch (err) {
    console.error('Checkout API error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
