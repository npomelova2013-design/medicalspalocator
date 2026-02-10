export function formatPhone(phone: string | null): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return phone
}

export function formatPhoneHref(phone: string | null): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  return `tel:+1${digits.length === 11 ? digits.slice(1) : digits}`
}

export function formatAddress(
  address: string | null,
  city: string,
  state: string,
  zip: string | null
): string {
  const parts = [address, `${city}, ${state}`, zip].filter(Boolean)
  return parts.join(' ')
}

export function slugifyCity(city: string): string {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function deslugifyCity(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatRating(rating: number | null): string {
  if (!rating) return 'N/A'
  return rating.toFixed(1)
}

export function formatReviewCount(count: number): string {
  if (count === 0) return 'No reviews'
  if (count === 1) return '1 review'
  return `${count.toLocaleString()} reviews`
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}
