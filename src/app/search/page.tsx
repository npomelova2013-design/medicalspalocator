import type { Metadata } from 'next'
import Link from 'next/link'
import { MedSpaGrid } from '@/components/listings/MedSpaGrid'
import { searchMedSpas, browseAllMedSpas } from '@/lib/queries/search'
import { Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Search Med Spas',
  description: 'Search for medical spas in Illinois by name, city, or treatment.',
  alternates: { canonical: '/search' },
}

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q || ''

  let spas: Awaited<ReturnType<typeof searchMedSpas>>['data'] = []
  let count = 0

  if (query) {
    const result = await searchMedSpas(query)
    spas = result.data
    count = result.count
  } else {
    const result = await browseAllMedSpas()
    spas = result.data
    count = result.count
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
      <nav className="text-sm text-[#262626]/50 mb-4">
        <Link href="/" className="hover:text-[#E1306C]">Home</Link>
        <span className="mx-2 text-[#262626]/30">/</span>
        <span className="text-[#262626]">{query ? 'Search' : 'Browse'}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-serif italic font-semibold tracking-editorial text-[#262626] mb-2">
        {query ? 'Search Results' : 'Browse All Med Spas'}
      </h1>

      <p className="text-[#262626]/60 mb-6">
        {query
          ? <>{count} result{count !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</>
          : <>{count} verified med spas in Illinois</>
        }
      </p>

      {/* Search bar for inline searching */}
      {!query && (
        <div className="mb-8 max-w-xl">
          <form action="/search" method="GET" className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-[#262626]/30" />
            <input
              type="text"
              name="q"
              placeholder="Filter by name, city, or treatment..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#833AB4]/15 text-sm text-[#262626] placeholder:text-[#262626]/40 focus:outline-none focus:border-[#833AB4]/30 focus:shadow-[0_0_0_3px_rgba(131,58,180,0.08)] transition-all"
            />
          </form>
        </div>
      )}

      <MedSpaGrid spas={spas} emptyMessage="No results found. Try a different search term." />
    </div>
  )
}
