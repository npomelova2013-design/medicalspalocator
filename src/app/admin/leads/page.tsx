import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

const statusConfig: Record<string, { label: string; className: string }> = {
  new: {
    label: 'New',
    className: 'bg-[#833AB4]/15 text-[#E1306C]',
  },
  contacted: {
    label: 'Contacted',
    className: 'bg-amber-100 text-amber-800',
  },
  converted: {
    label: 'Converted',
    className: 'bg-green-100 text-green-800',
  },
  lost: {
    label: 'Lost',
    className: 'bg-red-100 text-red-800',
  },
}

async function getLeadsData() {
  const supabase = createAdminClient()

  const [{ count: totalCount }, { data: leads }] = await Promise.all([
    supabase.from('consumer_leads').select('*', { count: 'exact', head: true }),
    supabase
      .from('consumer_leads')
      .select(
        'id, first_name, last_name, email, phone, service_interest, source, preferred_city, status, created_at, routed_to'
      )
      .order('created_at', { ascending: false })
      .limit(100),
  ])

  return {
    totalCount: totalCount ?? 0,
    leads: leads ?? [],
  }
}

export default async function AdminLeadsPage() {
  const { totalCount, leads } = await getLeadsData()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-sm text-slate-500 mt-1">
            {totalCount.toLocaleString()} total leads
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Email
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Phone
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Service
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Source
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  City
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-sm text-slate-400">
                    No leads yet
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const status = statusConfig[lead.status] || statusConfig.new
                  return (
                    <tr
                      key={lead.id}
                      className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-3.5 text-sm font-medium text-slate-900">
                        {[lead.first_name, lead.last_name].filter(Boolean).join(' ') || '—'}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-slate-600">
                        {lead.email || '—'}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-slate-600">
                        {lead.phone || '—'}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-slate-600">
                        {lead.service_interest || '—'}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                          {lead.source || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-slate-600">
                        {lead.preferred_city || '—'}
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-slate-500">
                        {lead.created_at
                          ? new Date(lead.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '—'}
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
            Showing {leads.length} of {totalCount.toLocaleString()} leads
          </p>
        </div>
      </div>
    </div>
  )
}
