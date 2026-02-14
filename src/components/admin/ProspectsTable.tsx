'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Mail, MessageSquare, ChevronLeft, ChevronRight, Loader2, Star, Eye, Phone } from 'lucide-react'

interface Prospect {
  id: string
  business_name: string
  city: string
  state: string
  phone: string | null
  email: string | null
  listing_tier: string
  profile_views: number
  phone_clicks: number
  google_rating: number | null
  google_reviews_count: number
  outreach_status: string | null
  outreach_notes: string | null
  last_contacted: string | null
  prospect_score: number | null
}

const STATUS_COLORS: Record<string, string> = {
  not_contacted: 'bg-slate-100 text-slate-600',
  contacted: 'bg-blue-100 text-blue-700',
  interested: 'bg-amber-100 text-amber-700',
  declined: 'bg-red-100 text-red-700',
  converted: 'bg-green-100 text-green-700',
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'not_contacted', label: 'Not Contacted' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'interested', label: 'Interested' },
  { value: 'declined', label: 'Declined' },
  { value: 'converted', label: 'Converted' },
]

const TIER_OPTIONS = [
  { value: '', label: 'All Tiers' },
  { value: 'free', label: 'Free' },
  { value: 'claimed', label: 'Claimed' },
  { value: 'premium', label: 'Premium' },
  { value: 'enterprise', label: 'Enterprise' },
]

const EMAIL_TEMPLATES = [
  { id: 'email1', label: 'Intro Pitch' },
  { id: 'email2', label: 'Follow-up' },
  { id: 'email3', label: 'Last Chance' },
]

const SMS_TEMPLATES = [
  { id: 'sms1', label: 'Intro SMS' },
  { id: 'sms2', label: 'Follow-up SMS' },
]

export function ProspectsTable() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [tierFilter, setTierFilter] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sending, setSending] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesValue, setNotesValue] = useState('')

  const fetchProspects = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      page: String(page),
      limit: '25',
    })
    if (search) params.set('search', search)
    if (statusFilter) params.set('outreach_status', statusFilter)
    if (tierFilter) params.set('tier', tierFilter)

    try {
      const res = await fetch(`/api/admin/prospects?${params}`)
      const data = await res.json()
      setProspects(data.data || [])
      setTotalPages(data.totalPages || 1)
      setTotalCount(data.count || 0)
    } catch (err) {
      console.error('Failed to fetch prospects:', err)
    } finally {
      setLoading(false)
    }
  }, [page, search, statusFilter, tierFilter])

  useEffect(() => {
    fetchProspects()
  }, [fetchProspects])

  const handleSendOutreach = async (medSpaId: string, method: 'email' | 'sms', templateId: string) => {
    setSending(`${medSpaId}-${templateId}`)
    try {
      const res = await fetch('/api/admin/outreach/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medSpaId, method, templateId }),
      })
      const data = await res.json()
      if (data.success) {
        // Refresh the row
        fetchProspects()
      } else {
        alert(data.error || 'Failed to send')
      }
    } catch {
      alert('Network error')
    } finally {
      setSending(null)
    }
  }

  const handleStatusChange = async (medSpaId: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/prospects/${medSpaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outreach_status: newStatus }),
      })
      fetchProspects()
    } catch {
      alert('Failed to update status')
    }
  }

  const handleSaveNotes = async (medSpaId: string) => {
    try {
      await fetch(`/api/admin/prospects/${medSpaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outreach_notes: notesValue }),
      })
      setEditingNotes(null)
      fetchProspects()
    } catch {
      alert('Failed to save notes')
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchProspects()
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Filters */}
      <div className="p-4 border-b border-slate-100 flex flex-wrap gap-3 items-center">
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400"
            />
          </div>
        </form>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-400"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <select
          value={tierFilter}
          onChange={(e) => { setTierFilter(e.target.value); setPage(1) }}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-400"
        >
          {TIER_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <span className="text-xs text-slate-400">
          {totalCount} prospects
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      ) : prospects.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-sm">No prospects found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-3 font-medium text-slate-500">Business</th>
                <th className="px-4 py-3 font-medium text-slate-500">City</th>
                <th className="px-4 py-3 font-medium text-slate-500">Tier</th>
                <th className="px-4 py-3 font-medium text-slate-500 text-center">
                  <Eye className="w-4 h-4 inline" />
                </th>
                <th className="px-4 py-3 font-medium text-slate-500 text-center">
                  <Star className="w-4 h-4 inline" />
                </th>
                <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 font-medium text-slate-500">Last Contacted</th>
                <th className="px-4 py-3 font-medium text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prospects.map((p) => (
                <>
                  <tr
                    key={p.id}
                    className="border-t border-slate-100 hover:bg-slate-50/50 cursor-pointer transition"
                    onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-900 truncate max-w-[200px]">{p.business_name}</p>
                        <div className="flex gap-2 mt-0.5 text-xs text-slate-400">
                          {p.email && <span>{p.email}</span>}
                          {p.phone && <span>{p.phone}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{p.city}, {p.state}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        p.listing_tier === 'premium' || p.listing_tier === 'enterprise'
                          ? 'bg-purple-100 text-purple-700'
                          : p.listing_tier === 'claimed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {p.listing_tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-slate-600">{p.profile_views}</td>
                    <td className="px-4 py-3 text-center text-slate-600">
                      {p.google_rating ? `${p.google_rating}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={p.outreach_status || 'not_contacted'}
                        onChange={(e) => {
                          e.stopPropagation()
                          handleStatusChange(p.id, e.target.value)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${
                          STATUS_COLORS[p.outreach_status || 'not_contacted'] || STATUS_COLORS.not_contacted
                        }`}
                      >
                        {STATUS_OPTIONS.filter((o) => o.value).map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {p.last_contacted
                        ? new Date(p.last_contacted).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                          className="text-xs text-slate-500 hover:text-slate-900 px-2 py-1 rounded border border-slate-200 hover:border-slate-300 transition"
                        >
                          {expandedId === p.id ? 'Close' : 'Expand'}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded row */}
                  {expandedId === p.id && (
                    <tr key={`${p.id}-expanded`} className="bg-slate-50/50">
                      <td colSpan={8} className="px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Send outreach */}
                          <div>
                            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Send Outreach</h4>
                            <div className="space-y-2">
                              {p.email && (
                                <div>
                                  <p className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> Email Templates
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {EMAIL_TEMPLATES.map((t) => (
                                      <button
                                        key={t.id}
                                        onClick={() => handleSendOutreach(p.id, 'email', t.id)}
                                        disabled={sending === `${p.id}-${t.id}`}
                                        className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:text-purple-700 transition disabled:opacity-50 flex items-center gap-1"
                                      >
                                        {sending === `${p.id}-${t.id}` ? (
                                          <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : (
                                          <Mail className="w-3 h-3" />
                                        )}
                                        {t.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {p.phone && (
                                <div>
                                  <p className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                                    <MessageSquare className="w-3 h-3" /> SMS Templates
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {SMS_TEMPLATES.map((t) => (
                                      <button
                                        key={t.id}
                                        onClick={() => handleSendOutreach(p.id, 'sms', t.id)}
                                        disabled={sending === `${p.id}-${t.id}`}
                                        className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-green-300 hover:text-green-700 transition disabled:opacity-50 flex items-center gap-1"
                                      >
                                        {sending === `${p.id}-${t.id}` ? (
                                          <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : (
                                          <Phone className="w-3 h-3" />
                                        )}
                                        {t.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {!p.email && !p.phone && (
                                <p className="text-xs text-slate-400">No email or phone on file</p>
                              )}
                            </div>
                          </div>

                          {/* Notes */}
                          <div>
                            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Notes</h4>
                            {editingNotes === p.id ? (
                              <div className="space-y-2">
                                <textarea
                                  value={notesValue}
                                  onChange={(e) => setNotesValue(e.target.value)}
                                  rows={3}
                                  className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-slate-400"
                                  placeholder="Add notes about this prospect..."
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSaveNotes(p.id)}
                                    className="text-xs px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingNotes(null)}
                                    className="text-xs px-3 py-1.5 text-slate-500 hover:text-slate-700 transition"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  setEditingNotes(p.id)
                                  setNotesValue(p.outreach_notes || '')
                                }}
                                className="text-sm text-slate-600 cursor-pointer hover:bg-white rounded-lg p-2 transition min-h-[60px]"
                              >
                                {p.outreach_notes || <span className="text-slate-300 italic">Click to add notes...</span>}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-30 transition"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-30 transition"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
