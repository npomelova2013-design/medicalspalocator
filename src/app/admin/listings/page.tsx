import { createAdminClient } from '@/lib/supabase/admin'
import { ListingsTable } from '@/components/admin/ListingsTable'

export const dynamic = 'force-dynamic'

async function getListingsData() {
  const supabase = createAdminClient()

  const [{ count: totalCount }, { data: listings }] = await Promise.all([
    supabase.from('med_spas').select('*', { count: 'exact', head: true }),
    supabase
      .from('med_spas')
      .select(
        'id, business_name, city, state, google_rating, google_reviews_count, listing_tier, is_active, prospect_score, url_slug, special_offer'
      )
      .order('prospect_score', { ascending: false })
      .limit(50),
  ])

  return {
    totalCount: totalCount ?? 0,
    listings: listings ?? [],
  }
}

export default async function AdminListingsPage() {
  const { totalCount, listings } = await getListingsData()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Listings</h1>
          <p className="text-sm text-slate-500 mt-1">
            {totalCount.toLocaleString()} total med spas
          </p>
        </div>
      </div>

      <ListingsTable initialListings={listings} totalCount={totalCount} />
    </div>
  )
}
