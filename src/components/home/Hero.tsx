'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export function Hero() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <section className="relative overflow-hidden bg-white py-28 md:py-40">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/30" />

      {/* Floating gradient orbs */}
      <div className="gradient-orb gradient-orb-teal absolute -top-24 -right-24 h-[500px] w-[500px]" />
      <div className="gradient-orb gradient-orb-gold absolute -bottom-32 -left-32 h-[400px] w-[400px]" />
      <div className="gradient-orb gradient-orb-purple absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
        {/* Headline */}
        <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
          Discover
          <br />
          Illinois&rsquo; Finest
          <br />
          Medical Spas
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 mb-10 max-w-2xl text-lg text-slate-500 md:text-xl">
          Compare top-rated providers, read verified reviews, and book your next
          consultation — all in one place.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
          <div className="relative flex items-center rounded-2xl bg-white shadow-2xl">
            <Search className="pointer-events-none absolute left-5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, treatment, or spa name..."
              className="w-full rounded-2xl border-0 bg-transparent py-5 pl-14 pr-36 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="absolute right-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:from-teal-600 hover:to-teal-700"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick filter pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['Botox', 'Fillers', 'Laser', 'Facials', 'Body Contouring'].map(
            (t) => (
              <button
                key={t}
                onClick={() =>
                  router.push(`/search?q=${encodeURIComponent(t)}`)
                }
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition hover:border-teal-300 hover:bg-teal-50"
              >
                {t}
              </button>
            )
          )}
        </div>

        {/* Trust line */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-slate-200" />
          <span className="text-sm tracking-wide text-slate-400">
            Trusted by 286+ med spas across Illinois
          </span>
          <span className="h-px w-12 bg-slate-200" />
        </div>
      </div>
    </section>
  )
}
