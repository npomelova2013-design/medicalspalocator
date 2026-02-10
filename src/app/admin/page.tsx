import { createAdminClient } from '@/lib/supabase/admin'
import { Building2, Users, TrendingUp, Crown } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getDashboardData() {
  const supabase = createAdminClient()

  const [
    { count: totalListings },
    { count: totalLeads },
    { count: leadsThisWeek },
    { count: premiumListings },
    { data: recentLeads },
  ] = await Promise.all([
    supabase
      .from('med_spas')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true),
    supabase
      .from('consumer_leads')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('consumer_leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    supabase
      .from('med_spas')
      .select('*', { count: 'exact', head: true })
      .in('listing_tier', ['premium', 'enterprise']),
    supabase
      .from('consumer_leads')
      .select('id, first_name, last_name, email, phone, service_interest, source, created_at')
      .order('created_at', { ascending: false })
      .limit(10),
  ])

  return {
    totalListings: totalListings ?? 0,
    totalLeads: totalLeads ?? 0,
    leadsThisWeek: leadsThisWeek ?? 0,
    premiumListings: premiumListings ?? 0,
    recentLeads: recentLeads ?? [],
  }
}

export default async function AdminDashboardPage() {
  const { totalListings, totalLeads, leadsThisWeek, premiumListings, recentLeads } =
    await getDashboardData()

  const kpis = [
    { label: 'Total Listings', value: totalListings, icon: Building2 },
    { label: 'Total Leads', value: totalLeads, icon: Users },
    { label: 'Leads This Week', value: leadsThisWeek, icon: TrendingUp },
    { label: 'Premium Listings', value: premiumListings, icon: Crown },
  ]

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-2xl border border-slate-100 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">{kpi.label}</span>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5E6E0] to-[#D4AF37]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              <p className="text-3xl font-serif font-bold text-gradient">
                {kpi.value.toLocaleString()}
              </p>
            </div>
          )
        })}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-serif text-lg font-semibold text-slate-900">Recent Leads</h2>
        </div>
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
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-400">
                    No leads yet
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
