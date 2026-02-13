'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  totalSpas: number
  totalCities: number
  avgRating: number
}

function AnimatedCounter({ target, suffix = '+' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-serif italic font-bold tracking-editorial instagram-gradient-text">
      {count}{suffix}
    </span>
  )
}

export function StatsBar({ totalSpas, totalCities, avgRating }: Props) {
  return (
    <div className="relative bg-[#1a1a2e] py-10 md:py-14 overflow-hidden">
      {/* Background orbs */}
      <div className="gradient-orb gradient-orb-rose-gold absolute -top-32 -left-32 h-[400px] w-[400px] animate-float opacity-30" />
      <div className="gradient-orb gradient-orb-champagne absolute -bottom-24 -right-24 h-[350px] w-[350px] animate-float-delayed opacity-25" />

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-evenly">
          {/* Stat: Med Spas */}
          <div className="flex flex-col items-center text-center">
            <AnimatedCounter target={totalSpas} />
            <span className="text-sm uppercase tracking-[0.2em] text-white/50 mt-3">
              Med Spas
            </span>
          </div>

          {/* Separator */}
          <div className="hidden sm:block h-12 w-px bg-[#833AB4]/20" />

          {/* Stat: Cities Covered */}
          <div className="flex flex-col items-center text-center">
            <AnimatedCounter target={totalCities} />
            <span className="text-sm uppercase tracking-[0.2em] text-white/50 mt-3">
              Cities Covered
            </span>
          </div>

          {/* Separator */}
          <div className="hidden sm:block h-12 w-px bg-[#833AB4]/20" />

          {/* Stat: Average Rating */}
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl md:text-6xl font-serif italic font-bold tracking-editorial instagram-gradient-text">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-sm uppercase tracking-[0.2em] text-white/50 mt-3">
              Average Rating
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
