'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Search, ChevronDown, ChevronUp, Loader2, StickyNote, ChevronLeft, ChevronRight } from 'lucide-react'

interface Lead {
  id: string
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: string | null
  service_interest: string | null
  source: string | null
  preferred_city: string | null
  status: string
  notes: string | null
  created_at: string | null
  routed_to: string | null
}

interface Props {
  initialLeads: Lead[]
  initialTotalCount: number
}

const statusConfig: Record<string, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-[#833AB4]/15 text-[#E1306C]' },
  contacted: { label: 'Contacted', className: 'bg-amber-100 text-amber-800' },
  converted: { label: 'Converted', className: 'bg-green-100 text-green-800' },
  lost: { label: 'Lost', className: 'bg-red-100 text-red-800' },
}

const sourceLabels: Record<string, string> = {
  website_form: 'Website',
  claim_form: 'Claim',
  listing_request: 'Listing',
}

export function LeadsTable({ initialLeads, initialTotalCount }: Props) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [totalCount, setTotalCount] = useState(initialTotalCount)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)
  const [filters, setFilters] = useState({
    status: 'all',
    source: 'all',
    search: '',
    dateFrom: '',
    dateTo: '',
  })
  const searchTimeout = useRef<NodeJS.Timeout | null>(null)
  const isInitialMount = useRef(true)

  const fetchLeads = useCallback(async (currentFilters: typeof filters, currentPage: number) => {
    setLoading(true)
    const params = new URLSearchParams()
    if (currentFilters.status !== 'all') params.set('status', currentFilters.status)
    if (currentFilters.source !== 'all') params.set('source', currentFilters.source)
    if (currentFilters.search) params.set('search', currentFilters.search)
    if (currentFilters.dateFrom) params.set('dateFrom', currentFilters.dateFrom)
    if (currentFilters.dateTo) params.set('dateTo', currentFilters.dateTo)
    params.set('page', currentPage.toString())

    try {
      const res = await fetch(`/api/admin/leads?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setLeads(data.leads)
        setTotalCount(data.totalCount)
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Refetch when filters change (debounced for search)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    const delay = filters.search ? 400 : 0
    searchTimeout.current = setTimeout(() => {
      setPage(1)
      fetchLeads(filters, 1)
    }, delay)
    return () => { if (searchTimeout.current) clearTimeout(searchTimeout.current) }
  }, [filters, fetchLeads])

  async function updateStatus(leadId: string, newStatus: string) {
    const oldLead = leads.find(l => l.id === leadId)
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l))

    const res = await fetch(`/api/admin/leads/${leadId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (!res.ok && oldLead) {
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: oldLead.status } : l))
    }
  }

  async function saveNotes(leadId: string) {
    setSavingNotes(true)
    const res = await fetch(`/api/admin/leads/${leadId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: editingNotes }),
    })
    if (res.ok) {
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, notes: editingNotes } : l))
    }
    setSavingNotes(false)
  }

  function toggleExpand(lead: Lead) {
    if (expandedId === lead.id) {
      setExpandedId(null)
    } else {
      setExpandedId(lead.id)
      setEditingNotes(lead.notes || '')
    }
  }

  function goToPage(newPage: number) {
    setPage(newPage)
    fetchLeads(filters, newPage)
  }

  const totalPages = Math.ceil(totalCount / 50)
  const thClass = 'text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3'
  const selectClass = 'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#833AB4]/20 focus:border-[#833AB4]/30'

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={filters.status}
          onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
          className={selectClass}
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>

        <select
          value={filters.source}
          onChange={(e) => setFilters(f => ({ ...f, source: e.target.value }))}
          className={selectClass}
        >
          <option value="all">All Sources</option>
          <option value="website_form">Website</option>
          <option value="claim_form">Claim</option>
          <option value="listing_request">Listing</option>
        </select>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={filters.search}
            onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
            className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#833AB4]/20 focus:border-[#833AB4]/30 w-64"
          />
        </div>

        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilters(f => ({ ...f, dateFrom: e.target.value }))}
          className={`${selectClass} w-36`}
          title="From date"
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilters(f => ({ ...f, dateTo: e.target.value }))}
          className={`${selectClass} w-36`}
          title="To date"
        />

        {loading && <Loader2 className="w-4 h-4 animate-spin text-[#833AB4]" />}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className={thClass}>Name</th>
                <th className={thClass}>Email</th>
                <th className={thClass}>Phone</th>
                <th className={thClass}>Service</th>
                <th className={thClass}>Source</th>
                <th className={thClass}>Status</th>
                <th className={thClass}>Date</th>
                <th className={thClass}></th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-sm text-slate-400">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const status = statusConfig[lead.status] || statusConfig.new
                  const isExpanded = expandedId === lead.id
                  return (
                    <tr key={lead.id} className="group">
                      <td colSpan={8} className="p-0">
                        {/* Main row */}
                        <div className="flex items-center border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <div className="px-6 py-3.5 text-sm font-medium text-slate-900 w-[14%] truncate">
                            {[lead.first_name, lead.last_name].filter(Boolean).join(' ') || '\u2014'}
                          </div>
                          <div className="px-6 py-3.5 text-sm text-slate-600 w-[16%] truncate">
                            {lead.email || '\u2014'}
                          </div>
                          <div className="px-6 py-3.5 text-sm text-slate-600 w-[12%]">
                            {lead.phone || '\u2014'}
                          </div>
                          <div className="px-6 py-3.5 text-sm text-slate-600 w-[16%] truncate">
                            {lead.service_interest || '\u2014'}
                          </div>
                          <div className="px-6 py-3.5 w-[10%]">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                              {sourceLabels[lead.source || ''] || lead.source || '\u2014'}
                            </span>
                          </div>
                          <div className="px-6 py-3.5 w-[12%]">
                            <select
                              value={lead.status}
                              onChange={(e) => updateStatus(lead.id, e.target.value)}
                              className={`${status.className} rounded-full text-xs font-medium px-2.5 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#833AB4]/20`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="converted">Converted</option>
                              <option value="lost">Lost</option>
                            </select>
                          </div>
                          <div className="px-6 py-3.5 text-sm text-slate-500 w-[12%]">
                            {lead.created_at
                              ? new Date(lead.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : '\u2014'}
                          </div>
                          <div className="px-6 py-3.5 w-[8%]">
                            <button
                              onClick={() => toggleExpand(lead)}
                              className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#833AB4] transition"
                              title="Notes"
                            >
                              <StickyNote className="w-3.5 h-3.5" />
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>

                        {/* Expanded notes row */}
                        {isExpanded && (
                          <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Notes</label>
                            <textarea
                              value={editingNotes}
                              onChange={(e) => setEditingNotes(e.target.value)}
                              rows={3}
                              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#833AB4]/20 focus:border-[#833AB4]/30 resize-none"
                              placeholder="Add notes about this lead..."
                            />
                            <div className="flex justify-end gap-2 mt-2">
                              <button
                                onClick={() => setExpandedId(null)}
                                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 transition"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => saveNotes(lead.id)}
                                disabled={savingNotes}
                                className="px-4 py-1.5 text-xs font-medium text-white bg-[#833AB4] hover:bg-[#E1306C] rounded-lg transition disabled:opacity-50 flex items-center gap-1"
                              >
                                {savingNotes && <Loader2 className="w-3 h-3 animate-spin" />}
                                Save Notes
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with pagination */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Showing {leads.length} of {totalCount.toLocaleString()} leads
            {totalPages > 1 && ` (page ${page} of ${totalPages})`}
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="p-1.5 rounded-lg hover:bg-slate-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="p-1.5 rounded-lg hover:bg-slate-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
