'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { InstaParticles } from '@/components/shared/InstaParticles'

// Local glam video with fallback
const HERO_VIDEO_PRIMARY = '/videos/hero-glam.mp4'
const HERO_VIDEO_FALLBACK = '/videos/hero-bg.mp4'

interface HeroProps {
  totalSpas: number
  totalCities?: number
  avgRating?: number
}

export function Hero({ totalSpas }: HeroProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <section className="relative overflow-hidden min-h-[100vh] flex items-center">
      {/* Primary Video Background — cinematic zoom out */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-portrait.png"
        className="absolute inset-0 w-full h-full object-cover object-top animate-cinematic-zoom"
      >
        <source src={HERO_VIDEO_PRIMARY} type="video/mp4" />
        <source src={HERO_VIDEO_FALLBACK} type="video/mp4" />
      </video>

      {/* White semi-transparent overlay — faded/ghosted luxury effect */}
      <div className="absolute inset-0 bg-white/[0.72]" />

      {/* Subtle warm cream radial glow at center for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,165,116,0.08)_0%,_transparent_70%)]" />

      {/* Very light bottom gradient to transition into next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40" />

      {/* Instagram particles */}
      <InstaParticles />

      {/* Content — centered layout */}
      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-32 md:py-40">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#262626]/5 backdrop-blur-md border border-[#262626]/10 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCAF45] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FCAF45]" />
            </span>
            <span className="text-xs font-medium text-[#262626]/70 tracking-wide uppercase">
              {totalSpas}+ verified med spas in Illinois
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif italic font-semibold text-5xl leading-[1.02] tracking-editorial text-[#262626] md:text-6xl lg:text-7xl xl:text-8xl">
            Discover
            <br />
            Illinois&rsquo; Finest
            <br />
            <span className="instagram-gradient-text">Medical Spas</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 mb-10 max-w-xl text-lg text-[#262626]/60 md:text-xl leading-relaxed mx-auto">
            Compare top-rated providers, read verified reviews, and book your next consultation — all in one place.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
            <div className="relative flex items-center rounded-2xl bg-white/70 backdrop-blur-xl border border-[#833AB4]/15 shadow-2xl shadow-black/10 transition-all focus-within:border-[#833AB4]/40 focus-within:bg-white/90">
              <Search className="pointer-events-none absolute left-5 h-5 w-5 text-[#262626]/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city, treatment, or spa name..."
                className="w-full rounded-2xl border-0 bg-transparent py-5 pl-14 pr-36 text-base text-[#262626] placeholder:text-[#262626]/30 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="absolute right-3 rounded-xl bg-gradient-to-r from-[#833AB4] to-[#E1306C] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#833AB4]/25 transition-all hover:shadow-xl hover:shadow-[#E1306C]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick filter pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {['Botox', 'Fillers', 'Laser', 'Facials', 'Body Contouring'].map(
              (t) => (
                <button
                  key={t}
                  onClick={() =>
                    router.push(`/search?q=${encodeURIComponent(t)}`)
                  }
                  className="rounded-full bg-white/50 backdrop-blur-sm border border-[#262626]/10 px-4 py-1.5 text-sm font-medium text-[#262626]/70 transition-all hover:bg-white/80 hover:text-[#262626] hover:border-[#833AB4]/20"
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
