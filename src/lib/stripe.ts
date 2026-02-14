import Stripe from 'stripe'

let _stripe: Stripe | null = null

function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) return null
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  return _stripe
}

export { getStripe }

export const PLANS = {
  claimed: {
    label: 'Claimed',
    price: 97,
    tier: 'claimed' as const,
    envKey: 'STRIPE_PRICE_CLAIMED',
  },
  premium: {
    label: 'Premium',
    price: 197,
    tier: 'premium' as const,
    envKey: 'STRIPE_PRICE_PREMIUM',
  },
  enterprise: {
    label: 'Enterprise',
    price: 297,
    tier: 'enterprise' as const,
    envKey: 'STRIPE_PRICE_ENTERPRISE',
  },
} as const

export type PlanKey = keyof typeof PLANS

export function getPriceId(plan: PlanKey): string | null {
  return process.env[PLANS[plan].envKey] || null
}

export async function createCheckoutSession(opts: {
  plan: PlanKey
  medSpaId?: string
  email: string
  businessName: string
  successUrl: string
  cancelUrl: string
}): Promise<string | null> {
  const stripe = getStripe()
  if (!stripe) return null

  const priceId = getPriceId(opts.plan)
  if (!priceId) return null

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: opts.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    metadata: {
      plan: opts.plan,
      medSpaId: opts.medSpaId || '',
      businessName: opts.businessName,
    },
    subscription_data: {
      metadata: {
        plan: opts.plan,
        medSpaId: opts.medSpaId || '',
        businessName: opts.businessName,
      },
    },
  })

  return session.url
}
