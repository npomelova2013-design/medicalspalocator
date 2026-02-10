export interface MedSpa {
  id: string
  business_name: string
  business_type: string | null
  legal_business_name: string | null
  dba_variants: string | null
  address: string | null
  city: string
  state: string
  zip_code: string | null
  canonicalized_address: string | null
  phone: string | null
  email: string | null
  website: string | null
  owner_name: string | null
  owner_phone: string | null
  supervising_physicians: string | null
  associated_practitioners: string | null
  control_model: string | null
  google_rating: number | null
  google_reviews_count: number
  google_reviews_text: string | null
  google_reviews_dates: string | null
  other_reviews: string | null
  categories: string | null
  treatments: string | null
  treatment_categories: string | null
  listing_tier: 'free' | 'claimed' | 'premium' | 'enterprise'
  is_claimed: boolean
  claimed_by: string | null
  claimed_at: string | null
  is_verified: boolean
  is_active: boolean
  featured_order: number | null
  logo_url: string | null
  cover_image_url: string | null
  gallery_urls: string[] | null
  video_url: string | null
  special_offer: string | null
  profile_views: number
  phone_clicks: number
  website_clicks: number
  direction_clicks: number
  lead_form_submissions: number
  prospect_score: number
  priority_tier: string | null
  score_reasons: string | null
  url_slug: string
  meta_title: string | null
  meta_description: string | null
  source: string | null
  disclosure_note: string | null
  collected_date: string | null
  cleaned_date: string | null
  data_completeness: number | null
  created_at: string
  updated_at: string
}

export interface MedSpaCard {
  id: string
  business_name: string
  url_slug: string
  address: string | null
  city: string
  state: string
  zip_code: string | null
  phone: string | null
  google_rating: number | null
  google_reviews_count: number
  treatments: string | null
  treatment_categories: string | null
  listing_tier: 'free' | 'claimed' | 'premium' | 'enterprise'
  is_verified: boolean
  logo_url: string | null
  cover_image_url: string | null
  special_offer: string | null
  featured_order: number | null
}

export interface CitySummary {
  city: string
  state: string
  total_spas: number
  premium_spas: number
  avg_rating: number
  total_reviews: number
}

export interface ConsumerLead {
  id?: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  email: string | null
  zip_code: string | null
  service_interest: string | null
  preferred_city: string | null
  timeline: string | null
  budget_range: string | null
  is_first_time: boolean | null
  notes: string | null
  source: string
  source_campaign: string | null
  landing_page: string | null
  routed_to: string | null
  status: string
  created_at?: string
}

export interface AnalyticsEvent {
  event_type: string
  med_spa_id?: string
  lead_id?: string
  page_path: string
  referrer?: string
  session_id?: string
  metadata?: Record<string, unknown>
}
