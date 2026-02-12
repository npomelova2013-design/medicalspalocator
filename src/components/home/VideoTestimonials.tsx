'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: 'The results exceeded all my expectations. I felt completely comfortable from consultation to treatment.',
    name: 'Sarah M.',
    city: 'Chicago, IL',
    rating: 5,
    treatment: 'Botox & Fillers',
    videoSrc: 'https://videos.pexels.com/video-files/7581709/7581709-uhd_2732_1440_25fps.mp4',
    poster: '/images/beauty-closeup.png',
  },
  {
    quote: 'Finding the right provider used to be so stressful. This directory made comparing options effortless.',
    name: 'Jennifer K.',
    city: 'Naperville, IL',
    rating: 5,
    treatment: 'Laser Treatment',
    videoSrc: 'https://videos.pexels.com/video-files/7010919/7010919-hd_1920_1080_25fps.mp4',
    poster: '/images/beauty-braids.png',
  },
  {
    quote: 'I love that I could read real reviews and compare ratings before booking my first appointment.',
    name: 'Amanda R.',
    city: 'Evanston, IL',
    rating: 5,
    treatment: 'HydraFacial',
    videoSrc: 'https://videos.pexels.com/video-files/3763029/3763029-hd_1920_1080_25fps.mp4',
    poster: '/images/hero-portrait.png',
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Start video playback when visible
          videoRef.current?.play().catch(() => {})
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30
        aspect-[3/4] md:aspect-[3/5] group transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Video background — lazy loaded */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={testimonial.poster}
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src={testimonial.videoSrc} type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a]/95 via-[#0d0d1a]/50 to-[#0d0d1a]/20" />

      {/* Subtle purple accent at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#833AB4] to-[#E1306C] opacity-60" />

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        {/* Stars */}
        <div className="flex gap-0.5 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#FCAF45] text-[#FCAF45]" />
          ))}
        </div>

        {/* Quote icon */}
        <Quote className="w-6 h-6 text-[#833AB4]/60 mb-2" />

        {/* Quote text */}
        <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Attribution */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-white font-semibold text-sm">{testimonial.name}</p>
          <p className="text-white/50 text-xs">{testimonial.city} &middot; {testimonial.treatment}</p>
        </div>
      </div>
    </div>
  )
}

export function VideoTestimonials() {
  return (
    <section className="relative bg-[#0d0d1a] py-24 md:py-36 overflow-hidden">
      {/* Background orbs */}
      <div className="gradient-orb gradient-orb-rose-gold absolute -top-32 -right-32 h-[400px] w-[400px] animate-float opacity-15" />
      <div className="gradient-orb gradient-orb-champagne absolute -bottom-24 -left-24 h-[350px] w-[350px] animate-float-delayed opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-[#E1306C] font-medium">What People Say</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic font-semibold tracking-editorial text-white mt-3">
            Real <span className="instagram-gradient-text">Experiences</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#833AB4] to-[#E1306C] rounded-full mt-5 mx-auto" />
        </div>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
