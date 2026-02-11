import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { Crown, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

const tierConfig: Record<string, { label: string; className: string }> = {
  free: {
    label: 'Free',
    className: 'bg-slate-100 text-slate-600',
  },
  claimed: {
    label: 'Claimed',
    className: 'bg-gradient-to-r from-sky-100 to-sky-50 text-sky-800 border border-sky-200',
  },
  premium: {
    label: 'Featured',
    className: 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200',
  },
  enterprise: {
    label: 'Enterprise',
    className: 'bg-gradient-to-r from-[#E1306C]/15 to-[#1a1a2e]/10 text-[#E1306C] border border-[#E1306C]/30',
  },
}

async function getListingsData() {
  const supabase = createAdminClient()

  const [{ count: totalCount }, { data: listings }] = await Promise.all([
    supabase.from('med_spas').select('*', { count: 'exact', head: true }),
    supabase
      .from('med_spas')
      .select(
        'id, business_name, city, state, google_rating, google_reviews_count, listing_tier, is_active, prospect_score, url_slug'
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

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Business Name
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  City
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Rating
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Reviews
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Tier
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Active
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {listings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-400">
                    No listings found
                  </td>
                </tr>
              ) : (
                listings.map((listing) => {
                  const tier = tierConfig[listing.listing_tier] || tierConfig.free
                  return (
                    <tr
                      key={listing.id}
                      className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-900">
                            {listing.business_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-slate-600">
                        {listing.city}, {listing.state}
                      </td>
                      <td className="px-6 py-3.5">
                        {listing.google_rating ? (
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold text-slate-900">
                              {listing.google_rating.toFixed(1)}
                            </span>
                            <span className="text-amber-400 text-sm">&#9733;</span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-slate-600">
                        {listing.google_reviews_count.toLocaleString()}
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tier.className}`}
                        >
                          {(listing.listing_tier === 'premium' ||
                            listing.listing_tier === 'enterprise') && (
                            <Crown className="w-3 h-3 mr-1" />
                          )}
                          {tier.label}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        {listing.is_active ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3.5">
                        <Link
                          href={`/med-spa/${listing.url_slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#833AB4] hover:text-[#E1306C] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer showing count */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Showing {listings.length} of {totalCount.toLocaleString()} listings (sorted by prospect score)
          </p>
        </div>
      </div>
    </div>
  )
}
