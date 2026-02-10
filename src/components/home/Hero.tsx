'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { GoldParticles } from '@/components/shared/GoldParticles'

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
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/6981411/6981411-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 video-overlay" />

      {/* Floating gradient orbs */}
      <div className="gradient-orb gradient-orb-rose-gold absolute -top-24 -right-24 h-[500px] w-[500px] animate-float" />
      <div className="gradient-orb gradient-orb-champagne absolute -bottom-32 -left-32 h-[450px] w-[450px] animate-float-delayed" />
      <div className="gradient-orb gradient-orb-mauve absolute top-1/3 left-1/2 h-[350px] w-[350px] -translate-x-1/2 animate-float-slow" />

      {/* Gold particles */}
      <GoldParticles />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 py-32 md:py-40">
        {/* Headline */}
        <h1 className="font-serif italic font-semibold text-5xl leading-[1.05] tracking-editorial text-white md:text-7xl lg:text-8xl">
          Discover
          <br />
          Illinois&rsquo; Finest
          <br />
          <span className="instagram-gradient-text">Medical Spas</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-8 mb-12 max-w-2xl text-lg text-white/70 md:text-xl">
          Compare top-rated providers, read verified reviews, and book your next
          consultation — all in one place.
        </p>

        {/* Search bar — warm glassmorphism */}
        <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
          <div className="relative flex items-center rounded-2xl bg-white/10 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl">
            <Search className="pointer-events-none absolute left-5 h-5 w-5 text-[#D4AF37]/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, treatment, or spa name..."
              className="w-full rounded-2xl border-0 bg-transparent py-5 pl-14 pr-36 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="absolute right-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B76E79] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#D4AF37]/20 transition hover:shadow-xl hover:shadow-[#D4AF37]/30"
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
                className="rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/20 px-5 py-2 text-sm font-medium text-white/90 transition hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/40"
              >
                {t}
              </button>
            )
          )}
        </div>

        {/* Trust line */}
        <div className="mt-14 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#D4AF37]/30" />
          <span className="text-sm tracking-wide text-[#D4AF37]/50">
            Trusted by 286+ med spas across Illinois
          </span>
          <span className="h-px w-12 bg-[#D4AF37]/30" />
        </div>
      </div>
    </section>
  )
}
