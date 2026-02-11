export const SITE_NAME = 'Medical Spa Locator'
export const SITE_DESCRIPTION =
  'Find the best medical spas in Illinois. Compare ratings, read reviews, and book your consultation.'
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://medicalspalocator.com'

export const COLORS = {
  primary: '#833AB4', // Instagram purple
  primaryDark: '#E1306C', // Instagram hot pink
  gold: '#833AB4', // Instagram purple (premium)
  goldLight: '#F0E6F6', // light lavender
} as const

export const LISTING_TIERS = {
  free: { label: 'Basic', color: 'gray' },
  claimed: { label: 'Claimed', color: 'blue' },
  premium: { label: 'Featured', color: 'amber' },
  enterprise: { label: 'Enterprise', color: 'rose' },
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
