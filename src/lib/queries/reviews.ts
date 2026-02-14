import { createServerSupabase } from '@/lib/supabase/server'

export interface Review {
  id: string
  med_spa_id: string
  google_review_id: string | null
  reviewer_name: string | null
  reviewer_photo_url: string | null
  rating: number
  review_text: string | null
  review_date: string | null
  created_at: string
}

export async function getReviewsForSpa(medSpaId: string, limit: number = 10): Promise<Review[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('med_spa_id', medSpaId)
    .order('review_date', { ascending: false, nullsFirst: false })
    .limit(limit)

  if (error) {
    // Table may not exist yet — gracefully return empty
    console.error('getReviewsForSpa() error:', error.message)
    return []
  }
  return (data || []) as Review[]
}

export async function getReviewCountForSpa(medSpaId: string): Promise<number> {
  const supabase = await createServerSupabase()
  const { count, error } = await supabase
    .from('reviews')
    .select('id', { count: 'exact', head: true })
    .eq('med_spa_id', medSpaId)

  if (error) return 0
  return count || 0
}
