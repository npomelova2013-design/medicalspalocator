'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Syringe, Sparkles, Zap, Droplets, Target, Flame, ArrowRight } from 'lucide-react'

const TREATMENTS = [
  {
    name: 'Botox',
    description: 'Smooth fine lines and wrinkles with precision injections',
    icon: Syringe,
    query: 'Botox',
  },
  {
    name: 'Dermal Fillers',
    description: 'Restore volume and enhance facial contours naturally',
    icon: Droplets,
    query: 'Fillers',
  },
  {
    name: 'Laser Treatments',
    description: 'Advanced laser technology for skin rejuvenation',
    icon: Zap,
    query: 'Laser',
  },
  {
    name: 'HydraFacials',
    description: 'Deep cleansing and hydration for radiant skin',
    icon: Sparkles,
    query: 'Facials',
  },
  {
    name: 'Body Contouring',
    description: 'Non-invasive sculpting for your ideal silhouette',
    icon: Flame,
    query: 'Body Contouring',
  },
  {
    name: 'Microneedling',
    description: 'Stimulate collagen for firmer, smoother skin',
    icon: Target,
    query: 'Microneedling',
  },
]

function TreatmentCard({ treatment, index }: { treatment: typeof TREATMENTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const Icon = treatment.icon

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/search?q=${encodeURIComponent(treatment.query)}`}>
        <div className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6
          hover:bg-white/10 hover:border-[#833AB4]/30 hover:shadow-lg hover:shadow-[#833AB4]/10 transition-all duration-500 cursor-pointer h-full">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#833AB4]/20 to-[#E1306C]/20
            flex items-center justify-center mb-4 group-hover:from-[#833AB4]/30 group-hover:to-[#E1306C]/30 transition-all">
            <Icon className="w-6 h-6 text-[#E1306C] group-hover:text-[#FCAF45] transition-colors duration-300" />
          </div>

          {/* Text */}
          <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-[#FCAF45] transition-colors duration-300">
            {treatment.name}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed">
            {treatment.description}
          </p>

          {/* Arrow */}
          <ArrowRight className="w-4 h-4 text-[#833AB4] opacity-0 group-hover:opacity-100
            transition-all duration-300 mt-3 group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  )
}

export function TreatmentShowcase() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Video background — SD for performance, heavily overlaid */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/5524244/5524244-sd_640_360_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay (92%) */}
      <div className="absolute inset-0 bg-[#0d0d1a]/[0.92]" />

      {/* Instagram gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#833AB4] to-transparent opacity-40" />

      {/* Background orbs */}
      <div className="gradient-orb gradient-orb-champagne absolute -top-40 -left-40 h-[500px] w-[500px] animate-float-slow opacity-10" />
      <div className="gradient-orb gradient-orb-rose-gold absolute -bottom-32 -right-32 h-[400px] w-[400px] animate-float opacity-15" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-[#E1306C] font-medium">Browse by</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic font-semibold tracking-editorial text-white mt-3">
            Popular <span className="instagram-gradient-text">Treatments</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#833AB4] to-[#E1306C] rounded-full mt-5 mx-auto" />
          <p className="mt-4 text-white/40 max-w-lg mx-auto">
            Find top-rated providers for the most sought-after aesthetic treatments in Illinois
          </p>
        </div>

        {/* Treatment grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {TREATMENTS.map((treatment, i) => (
            <TreatmentCard key={treatment.name} treatment={treatment} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
