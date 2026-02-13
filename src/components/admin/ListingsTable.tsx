'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Crown, ExternalLink, Sparkles, Loader2, Check, X } from 'lucide-react'

interface Listing {
  id: string
  business_name: string
  city: string
  state: string
  google_rating: number | null
  google_reviews_count: number
  listing_tier: string
  is_active: boolean
  prospect_score: number | null
  url_slug: string
  special_offer: string | null
}

interface Props {
  initialListings: Listing[]
  totalCount: number
}

const tierConfig: Record<string, { label: string; className: string }> = {
  free: { label: 'Free', className: 'bg-slate-100 text-slate-600' },
  claimed: { label: 'Claimed', className: 'bg-gradient-to-r from-sky-100 to-sky-50 text-sky-800 border border-sky-200' },
  premium: { label: 'Featured', className: 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200' },
  enterprise: { label: 'Enterprise', className: 'bg-gradient-to-r from-[#E1306C]/15 to-[#1a1a2e]/10 text-[#E1306C] border border-[#E1306C]/30' },
}

export function ListingsTable({ initialListings, totalCount }: Props) {
  const [listings, setListings] = useState<Listing[]>(initialListings)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)

  function startEditing(listing: Listing) {
    setEditingId(listing.id)
    setEditValue(listing.special_offer || '')
  }

  function cancelEditing() {
    setEditingId(null)
    setEditValue('')
  }

  async function saveOffer(listingId: string) {
    setSaving(true)
    const res = await fetch(`/api/admin/listings/${listingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ special_offer: editValue }),
    })
    if (res.ok) {
      setListings(prev => prev.map(l =>
        l.id === listingId ? { ...l, special_offer: editValue.trim() || null } : l
      ))
    }
    setSaving(false)
    setEditingId(null)
  }

  const thClass = 'text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3'

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className={thClass}>Business Name</th>
              <th className={thClass}>City</th>
              <th className={thClass}>Rating</th>
              <th className={thClass}>Tier</th>
              <th className={thClass}>Special Offer</th>
              <th className={thClass}>Active</th>
              <th className={thClass}>Actions</th>
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
                const isEditing = editingId === listing.id
                return (
                  <tr
                    key={listing.id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-3.5">
                      <span className="text-sm font-medium text-slate-900">
                        {listing.business_name}
                      </span>
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
                          <span className="text-xs text-slate-400 ml-1">({listing.google_reviews_count})</span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">&mdash;</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tier.className}`}
                      >
                        {(listing.listing_tier === 'premium' || listing.listing_tier === 'enterprise') && (
                          <Crown className="w-3 h-3 mr-1" />
                        )}
                        {tier.label}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            placeholder="e.g. 20% off first visit"
                            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#833AB4]/20 focus:border-[#833AB4]/30 min-w-[200px]"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveOffer(listing.id)
                              if (e.key === 'Escape') cancelEditing()
                            }}
                          />
                          <button
                            onClick={() => saveOffer(listing.id)}
                            disabled={saving}
                            className="p-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition"
                          >
                            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : listing.special_offer ? (
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#833AB4] flex-shrink-0" />
                          <span className="text-sm text-slate-700 truncate max-w-[200px]">{listing.special_offer}</span>
                          <button
                            onClick={() => startEditing(listing)}
                            className="text-[#833AB4] hover:text-[#E1306C] text-xs font-medium ml-1 shrink-0"
                          >
                            Edit
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditing(listing)}
                          className="text-sm text-slate-400 hover:text-[#833AB4] transition"
                        >
                          + Add offer
                        </button>
                      )}
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

      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          Showing {listings.length} of {totalCount.toLocaleString()} listings (sorted by prospect score)
        </p>
      </div>
    </div>
  )
}
