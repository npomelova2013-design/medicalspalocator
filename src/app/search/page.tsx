import type { Metadata } from 'next'
import Link from 'next/link'
import { MedSpaGrid } from '@/components/listings/MedSpaGrid'
import { searchMedSpas } from '@/lib/queries/search'
import { Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Search Med Spas',
  description: 'Search for medical spas in Illinois by name, city, or treatment.',
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
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-teal-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Search</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {query ? `Search Results` : 'Search Med Spas'}
      </h1>

      {query && (
        <p className="text-gray-600 mb-6">
          {count} result{count !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </p>
      )}

      {!query && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">Enter a search term to find med spas</p>
          <p className="text-gray-400">Try searching by city name, treatment, or spa name</p>
        </div>
      )}

      {query && <MedSpaGrid spas={spas} emptyMessage="No results found. Try a different search term." />}
    </div>
  )
}
