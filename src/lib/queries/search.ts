import { createServerSupabase } from '@/lib/supabase/server'
import type { MedSpaCard } from '@/types/database'

const CARD_FIELDS = `
  id, business_name, url_slug, address, city, state, zip_code, phone,
  google_rating, google_reviews_count, treatments, treatment_categories,
  listing_tier, is_verified, logo_url, cover_image_url, special_offer, featured_order
`

export async function browseAllMedSpas(
  options?: { page?: number; limit?: number }
): Promise<{ data: MedSpaCard[]; count: number }> {
  const supabase = await createServerSupabase()
  const page = options?.page || 1
  const limit = options?.limit || 24
  const offset = (page - 1) * limit

  const { data, count } = await supabase
    .from('med_spas')
    .select(CARD_FIELDS, { count: 'exact' })
    .eq('is_active', true)
    .order('google_rating', { ascending: false, nullsFirst: false })
    .order('google_reviews_count', { ascending: false })
    .range(offset, offset + limit - 1)

  return {
    data: (data || []) as MedSpaCard[],
    count: count || 0,
  }
}

export async function searchMedSpas(
  query: string,
  options?: { page?: number; limit?: number }
): Promise<{ data: MedSpaCard[]; count: number }> {
  const supabase = await createServerSupabase()
  const page = options?.page || 1
  const limit = options?.limit || 24
  const offset = (page - 1) * limit

  // Try full-text search first
  const { data, error, count } = await supabase
    .from('med_spas')
    .select(CARD_FIELDS, { count: 'exact' })
    .eq('is_active', true)
    .textSearch(
      'business_name',
      query,
      { type: 'websearch' }
    )
    .order('google_rating', { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('searchMedSpas() FTS error:', error.message)
  }

  // If FTS returns results, use them
  if (!error && data && data.length > 0) {
    return { data: data as MedSpaCard[], count: count || 0 }
  }

  // Fallback: ILIKE search across multiple columns
  const searchPattern = `%${query}%`

  const { data: fallbackData, count: fallbackCount } = await supabase
    .from('med_spas')
    .select(CARD_FIELDS, { count: 'exact' })
    .eq('is_active', true)
    .or(`business_name.ilike.${searchPattern},city.ilike.${searchPattern},treatments.ilike.${searchPattern},categories.ilike.${searchPattern}`)
    .order('google_rating', { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1)

  return {
    data: (fallbackData || []) as MedSpaCard[],
    count: fallbackCount || 0,
  }
}
