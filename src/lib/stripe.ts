import Stripe from 'stripe'

// Avoid caching the Stripe instance in serverless — create fresh each time
// This prevents stale connection issues on Vercel where the Node.js http agent
// from a previous cold start may be dead
function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim()
  if (!key) return null
  return new Stripe(key, {
    httpClient: Stripe.createFetchHttpClient(), // use fetch instead of Node http — works in serverless
    maxNetworkRetries: 2,
    telemetry: false,
  })
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
  const raw = process.env[PLANS[plan].envKey]
  return raw?.trim() || null
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
