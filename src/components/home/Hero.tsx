'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Play, MapPin, Star, Shield } from 'lucide-react'
import { InstaParticles } from '@/components/shared/InstaParticles'

const HERO_VIDEOS = [
  'https://videos.pexels.com/video-files/5069465/5069465-uhd_2560_1440_24fps.mp4',
  'https://videos.pexels.com/video-files/6981411/6981411-uhd_2560_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/5069457/5069457-uhd_2560_1440_24fps.mp4',
]

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
    <section className="relative overflow-hidden min-h-[100vh] flex items-center">
      {/* Primary Video Background — full bleed */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src={HERO_VIDEOS[0]} type="video/mp4" />
      </video>

      {/* Cinematic overlay — dark at edges, clear in center */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a]/80 via-[#0d0d1a]/30 to-[#0d0d1a]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a]/70 via-transparent to-[#0d0d1a]/50" />

      {/* Subtle Instagram color wash on edges */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#833AB4]/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-[#E1306C]/15 to-transparent" />

      {/* Instagram particles */}
      <InstaParticles />

      {/* Content — asymmetric layout */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-32 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[100vh] lg:min-h-0 lg:py-40">
          {/* Left: Text + Search */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCAF45] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FCAF45]" />
              </span>
              <span className="text-xs font-medium text-white/80 tracking-wide uppercase">
                286+ verified med spas in Illinois
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif italic font-semibold text-5xl leading-[1.02] tracking-editorial text-white md:text-6xl lg:text-7xl xl:text-8xl">
              Discover
              <br />
              Illinois&rsquo; Finest
              <br />
              <span className="instagram-gradient-text">Medical Spas</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 mb-10 max-w-xl text-lg text-white/60 md:text-xl leading-relaxed mx-auto lg:mx-0">
              Compare top-rated providers, read verified reviews, and book your next consultation — all in one place.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto lg:mx-0">
              <div className="relative flex items-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/20 transition-all focus-within:border-[#833AB4]/40 focus-within:bg-white/15">
                <Search className="pointer-events-none absolute left-5 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by city, treatment, or spa name..."
                  className="w-full rounded-2xl border-0 bg-transparent py-5 pl-14 pr-36 text-base text-white placeholder:text-white/30 focus:outline-none focus:ring-0"
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
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2.5">
              {['Botox', 'Fillers', 'Laser', 'Facials', 'Body Contouring'].map(
                (t) => (
                  <button
                    key={t}
                    onClick={() =>
                      router.push(`/search?q=${encodeURIComponent(t)}`)
                    }
                    className="rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
                  >
                    {t}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Right: Video showcase cards */}
          <div className="lg:col-span-5 hidden lg:flex flex-col gap-4">
            {/* Floating video thumbnails — stacked */}
            <div className="relative">
              {/* Main featured video card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30 aspect-[4/3]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={HERO_VIDEOS[1]} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex -space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FCAF45] text-[#FCAF45]" />
                      ))}
                    </div>
                    <span className="text-white/80 text-xs font-medium">5.0</span>
                  </div>
                  <p className="text-white font-semibold text-sm">Premium Med Spa Experience</p>
                  <p className="text-white/50 text-xs mt-0.5">Chicago, IL</p>
                </div>
                {/* Play indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                  </span>
                  <span className="text-[10px] text-white/80 font-medium uppercase tracking-wider">Live</span>
                </div>
              </div>

              {/* Two smaller video thumbnails below */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg aspect-video group cursor-pointer">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  >
                    <source src={HERO_VIDEOS[2]} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Play className="w-3.5 h-3.5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-[11px] font-medium truncate">Laser Treatment</p>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg aspect-video group cursor-pointer">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  >
                    <source src={HERO_VIDEOS[0]} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Play className="w-3.5 h-3.5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-[11px] font-medium truncate">Facial Rejuvenation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust indicators row */}
            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="flex items-center gap-1.5 text-white/40">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Verified</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/40">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">42 Cities</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/40">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] font-medium">4.8 Avg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
    </section>
  )
}
