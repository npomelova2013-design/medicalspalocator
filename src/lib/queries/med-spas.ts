import { createServerSupabase } from '@/lib/supabase/server'
import type { MedSpa, MedSpaCard } from '@/types/database'

const CARD_FIELDS = `
  id, business_name, url_slug, address, city, state, zip_code, phone,
  google_rating, google_reviews_count, treatments, treatment_categories,
  listing_tier, is_verified, logo_url, cover_image_url, special_offer, featured_order
`

export async function getMedSpaBySlug(slug: string): Promise<MedSpa | null> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('med_spas')
    .select('*')
    .eq('url_slug', slug)
    .eq('is_active', true)
    .single()
  if (error || !data) return null
  return data as MedSpa
}

export async function getMedSpaById(id: string): Promise<MedSpa | null> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('med_spas')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()
  if (error || !data) return null
  return data as MedSpa
}

export async function getMedSpasByCity(
  city: string,
  options?: { page?: number; limit?: number; treatment?: string; minRating?: number }
): Promise<{ data: MedSpaCard[]; count: number }> {
  const supabase = await createServerSupabase()
  const page = options?.page || 1
  const limit = options?.limit || 24
  const offset = (page - 1) * limit

  let query = supabase
    .from('med_spas')
    .select(CARD_FIELDS, { count: 'exact' })
    .ilike('city', city)
    .eq('is_active', true)

  if (options?.treatment) {
    query = query.ilike('treatments', `%${options.treatment}%`)
  }
  if (options?.minRating) {
    query = query.gte('google_rating', options.minRating)
  }

  // Sort: premium/enterprise first, then by rating
  const { data, error, count } = await query
    .order('listing_tier', { ascending: true }) // 'enterprise' and 'premium' sort before 'free'
    .order('google_rating', { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1)

  if (error) return { data: [], count: 0 }

  // Re-sort to put premium/enterprise at top (since alphabetical sort puts 'enterprise' first, 'free' second, 'premium' third)
  const sorted = (data as MedSpaCard[]).sort((a, b) => {
    const tierOrder: Record<string, number> = { enterprise: 0, premium: 1, claimed: 2, free: 3 }
    const aOrder = tierOrder[a.listing_tier] ?? 3
    const bOrder = tierOrder[b.listing_tier] ?? 3
    if (aOrder !== bOrder) return aOrder - bOrder
    return (b.google_rating || 0) - (a.google_rating || 0)
  })

  return { data: sorted, count: count || 0 }
}

export async function getFeaturedSpas(limit: number = 6): Promise<MedSpaCard[]> {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('med_spas')
    .select(CARD_FIELDS)
    .in('listing_tier', ['premium', 'enterprise'])
    .eq('is_active', true)
    .order('featured_order', { ascending: true, nullsFirst: false })
    .order('google_rating', { ascending: false, nullsFirst: false })
    .limit(limit)

  // If no premium listings yet, return top-rated
  if (!data || data.length === 0) {
    const { data: topRated } = await supabase
      .from('med_spas')
      .select(CARD_FIELDS)
      .eq('is_active', true)
      .order('google_rating', { ascending: false, nullsFirst: false })
      .order('google_reviews_count', { ascending: false })
      .limit(limit)
    return (topRated || []) as MedSpaCard[]
  }
  return data as MedSpaCard[]
}

export async function getNearbySpas(city: string, excludeId: string, limit: number = 3): Promise<MedSpaCard[]> {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('med_spas')
    .select(CARD_FIELDS)
    .ilike('city', city)
    .neq('id', excludeId)
    .eq('is_active', true)
    .order('listing_tier', { ascending: true })
    .order('google_rating', { ascending: false, nullsFirst: false })
    .limit(limit)
  return (data || []) as MedSpaCard[]
}

export async function getAllSlugs(): Promise<{ url_slug: string; updated_at: string }[]> {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('med_spas')
    .select('url_slug, updated_at')
    .eq('is_active', true)
  return data || []
}

export async function getAllCities(): Promise<string[]> {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('med_spas')
    .select('city')
    .eq('is_active', true)
  if (!data) return []
  const unique = Array.from(new Set(data.map(d => d.city))).sort()
  return unique
}

export async function getTotalCount(): Promise<number> {
  const supabase = await createServerSupabase()
  const { count } = await supabase
    .from('med_spas')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true)
  return count || 0
}
