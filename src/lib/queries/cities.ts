import { createServerSupabase } from '@/lib/supabase/server'
import type { CitySummary } from '@/types/database'

export async function getCitySummaries(): Promise<CitySummary[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('city_summary')
    .select('*')
    .order('total_spas', { ascending: false })
  if (error) {
    console.error('getCitySummaries() error:', error.message)
    return []
  }
  return data as CitySummary[]
}

export async function getCitySummary(city: string): Promise<CitySummary | null> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('city_summary')
    .select('*')
    .ilike('city', city)
    .single()
  if (error || !data) {
    if (error) console.error('getCitySummary() error:', error.message)
    return null
  }
  return data as CitySummary
}
