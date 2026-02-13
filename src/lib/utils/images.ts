const PLACEHOLDER_IMAGES = [
  '/images/hero-portrait.png',
  '/images/spa-professional.png',
  '/images/beauty-closeup.png',
  '/images/beauty-braids.png',
]

export function getPlaceholderImage(businessName: string): string {
  let hash = 0
  for (let i = 0; i < businessName.length; i++) {
    hash = ((hash << 5) - hash) + businessName.charCodeAt(i)
    hash |= 0
  }
  return PLACEHOLDER_IMAGES[Math.abs(hash) % PLACEHOLDER_IMAGES.length]
}
