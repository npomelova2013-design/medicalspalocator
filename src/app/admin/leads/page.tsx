import { createAdminClient } from '@/lib/supabase/admin'
import { LeadsTable } from '@/components/admin/LeadsTable'

export const dynamic = 'force-dynamic'

async function getLeadsData() {
  const supabase = createAdminClient()

  const [{ count: totalCount }, { data: leads }] = await Promise.all([
    supabase.from('consumer_leads').select('*', { count: 'exact', head: true }),
    supabase
      .from('consumer_leads')
      .select(
        'id, first_name, last_name, email, phone, service_interest, source, preferred_city, status, notes, created_at, routed_to'
      )
      .order('created_at', { ascending: false })
      .limit(50),
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

      <LeadsTable initialLeads={leads} initialTotalCount={totalCount} />
    </div>
  )
}
