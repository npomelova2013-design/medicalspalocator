'use client'

import { ProspectsTable } from '@/components/admin/ProspectsTable'

export default function ProspectsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Prospects</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage outreach to med spas. Send email or SMS campaigns and track conversion.
        </p>
      </div>
      <ProspectsTable />
    </div>
  )
}
