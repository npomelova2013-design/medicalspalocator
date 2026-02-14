import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail, notifyAdmin } from '@/lib/email'
import { getUpgradeConfirmationHtml, getAdminNotificationHtml } from '@/lib/email-templates'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const plan = session.metadata?.plan || 'claimed'
        const medSpaId = session.metadata?.medSpaId
        const businessName = session.metadata?.businessName || ''
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string
        const customerEmail = session.customer_email || session.customer_details?.email || ''

        // Map plan to tier
        const tierMap: Record<string, string> = {
          claimed: 'claimed',
          premium: 'premium',
          enterprise: 'enterprise',
        }
        const tier = tierMap[plan] || 'claimed'

        if (medSpaId) {
          // Upgrade existing listing
          await supabase
            .from('med_spas')
            .update({
              listing_tier: tier,
              is_claimed: true,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              subscription_status: 'active',
              outreach_status: 'converted',
            })
            .eq('id', medSpaId)
        }

        // Send confirmation emails
        try {
          await Promise.all([
            customerEmail
              ? sendEmail({
                  to: customerEmail,
                  subject: `Welcome to ${plan.charAt(0).toUpperCase() + plan.slice(1)}!`,
                  html: getUpgradeConfirmationHtml(businessName || 'there', plan),
                })
              : Promise.resolve(),
            notifyAdmin(
              `New Subscription: ${businessName} (${plan})`,
              getAdminNotificationHtml({
                name: businessName,
                email: customerEmail,
                phone: null,
                source: 'stripe_subscription',
                serviceInterest: `${plan} subscription — $${plan === 'claimed' ? '97' : plan === 'premium' ? '197' : '297'}/mo`,
                notes: medSpaId ? `MedSpa ID: ${medSpaId}` : 'New listing — no existing med spa',
              })
            ),
          ])
        } catch (emailErr) {
          console.error('Post-checkout email error:', emailErr)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const subMedSpaId = subscription.metadata?.medSpaId

        if (subMedSpaId) {
          await supabase
            .from('med_spas')
            .update({
              listing_tier: 'free',
              subscription_status: 'canceled',
            })
            .eq('id', subMedSpaId)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerEmail = invoice.customer_email
        if (customerEmail) {
          await sendEmail({
            to: customerEmail,
            subject: 'Payment Failed — Action Required',
            html: `<p>Hi, your payment for Medical Spa Locator failed. Please update your payment method to keep your listing active.</p>`,
          })
        }

        // Update status — cast through unknown to access subscription field
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const failedSub = String((invoice as any).subscription || '')
        if (failedSub) {
          // Find med spa by subscription ID
          const { data: spa } = await supabase
            .from('med_spas')
            .select('id')
            .eq('stripe_subscription_id', failedSub)
            .single()
          if (spa) {
            await supabase
              .from('med_spas')
              .update({ subscription_status: 'past_due' })
              .eq('id', spa.id)
          }
        }
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err instanceof Error ? err.message : err)
  }

  return NextResponse.json({ received: true })
}
