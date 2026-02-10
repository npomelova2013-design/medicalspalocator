export const SITE_NAME = 'Medical Spa Locator'
export const SITE_DESCRIPTION =
  'Find the best medical spas in Illinois. Compare ratings, read reviews, and book your consultation.'
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://medicalspalocator.com'

export const COLORS = {
  primary: '#0d9488', // teal-600
  primaryDark: '#0f766e', // teal-700
  gold: '#d97706', // amber-600 (premium)
  goldLight: '#fbbf24', // amber-400
} as const

export const LISTING_TIERS = {
  free: { label: 'Basic', color: 'gray' },
  claimed: { label: 'Claimed', color: 'blue' },
  premium: { label: 'Featured', color: 'amber' },
  enterprise: { label: 'Enterprise', color: 'purple' },
} as const

export const SERVICE_OPTIONS = [
  'Botox / Injectables',
  'Dermal Fillers',
  'Laser Hair Removal',
  'Laser Skin Treatments',
  'Facials / Skin Care',
  'Chemical Peels',
  'Body Contouring',
  'Microneedling',
  'PRP / Platelet Therapy',
  'Other',
] as const

export const TIMELINE_OPTIONS = [
  'As soon as possible',
  'This week',
  'This month',
  'Just researching',
] as const
