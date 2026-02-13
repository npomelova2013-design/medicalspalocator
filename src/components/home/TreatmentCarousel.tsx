'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/* ─── Botanical SVG for luxury texture background ─── */
const BOTANICAL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="rgba(184,134,11,0.6)" stroke-width="0.5"><path d="M200 350 C200 250, 150 200, 100 150 C150 180, 180 220, 200 280"/><path d="M200 350 C200 250, 250 200, 300 150 C250 180, 220 220, 200 280"/><path d="M200 280 C200 230, 170 190, 130 160 C165 175, 185 210, 200 250"/><path d="M200 280 C200 230, 230 190, 270 160 C235 175, 215 210, 200 250"/><ellipse cx="200" cy="130" rx="25" ry="40" stroke-width="0.4"/><ellipse cx="160" cy="160" rx="20" ry="35" transform="rotate(-30 160 160)" stroke-width="0.4"/><ellipse cx="240" cy="160" rx="20" ry="35" transform="rotate(30 240 160)" stroke-width="0.4"/><circle cx="200" cy="120" r="5" stroke-width="0.3"/><path d="M100 380 Q150 350, 200 370 Q250 390, 300 360" stroke-width="0.3"/><path d="M50 20 Q100 60, 80 120" stroke-width="0.3"/><path d="M350 30 Q300 70, 320 130" stroke-width="0.3"/></svg>`

/* ─── Treatment data ─── */
const CAROUSEL_TREATMENTS = [
  {
    title: 'Botox & Wrinkle Relaxers',
    subtitle: 'Smooth fine lines with expert precision',
    image: '/images/hero-portrait.png',
    href: '/search?q=Botox',
  },
  {
    title: 'Dermal Fillers',
    subtitle: 'Restore youthful volume naturally',
    image: '/images/spa-professional.png',
    href: '/search?q=Fillers',
  },
  {
    title: 'Laser Skin Rejuvenation',
    subtitle: 'Advanced technology for flawless skin',
    image: '/images/beauty-closeup.png',
    href: '/search?q=Laser',
  },
  {
    title: 'Luxury Facials',
    subtitle: 'Deep hydration and radiant glow',
    image: '/images/beauty-braids.png',
    href: '/search?q=Facials',
  },
  {
    title: 'Body Contouring',
    subtitle: 'Non-invasive sculpting for your ideal silhouette',
    image: '/images/hero-portrait.png',
    href: '/search?q=Body+Contouring',
  },
  {
    title: 'Microneedling',
    subtitle: 'Stimulate collagen for firmer skin',
    image: '/images/spa-professional.png',
    href: '/search?q=Microneedling',
  },
  {
    title: 'Chemical Peels',
    subtitle: 'Reveal brighter, smoother complexion',
    image: '/images/beauty-closeup.png',
    href: '/search?q=Chemical+Peels',
  },
  {
    title: 'PRP Therapy',
    subtitle: "Harness your body's natural healing",
    image: '/images/beauty-braids.png',
    href: '/search?q=PRP',
  },
]

/* ─── Card component ─── */
function TreatmentCarouselCard({ treatment }: { treatment: (typeof CAROUSEL_TREATMENTS)[0] }) {
  return (
    <Link href={treatment.href} className="block h-full">
      <div className="relative rounded-2xl overflow-hidden border border-[#833AB4]/10 shadow-xl shadow-black/15 aspect-[3/4] group cursor-pointer bg-white">
        <Image
          src={treatment.image}
          alt={treatment.title}
          fill
          sizes="(max-width: 480px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 45vw, 35vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        {/* Treatment info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <h3 className="text-white font-semibold text-base md:text-lg leading-tight">
            {treatment.title}
          </h3>
          <p className="text-white/60 text-sm mt-1.5 leading-relaxed">
            {treatment.subtitle}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#FCAF45] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Explore treatments
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ─── Main carousel component ─── */
export function TreatmentCarousel() {
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      containScroll: false,
    },
    [autoplayPlugin.current]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  /* Reduced motion detection */
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  /* Stop autoplay if reduced motion */
  useEffect(() => {
    if (prefersReducedMotion) {
      autoplayPlugin.current.stop()
    }
  }, [prefersReducedMotion])

  /* Track selected slide */
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-[#FBF8F1] min-h-[600px] md:min-h-[700px]">
      {/* ─── Luxury Texture Layers ─── */}

      {/* Layer 1: Warm radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,165,116,0.12)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(184,134,11,0.08)_0%,_transparent_55%)]" />

      {/* Layer 2: Diagonal linen texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139,105,20,0.15) 2px, rgba(139,105,20,0.15) 3px)`,
        }}
      />

      {/* Layer 3: Botanical line art */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(BOTANICAL_SVG)}")`,
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Layer 4: Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(251,248,241,0.8)_100%)]" />

      {/* ─── Content ─── */}
      <div className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <span className="text-sm uppercase tracking-[0.2em] text-[#E1306C] font-medium">
            Explore Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic font-semibold tracking-editorial text-[#262626] mt-3">
            Signature{' '}
            <span className="instagram-gradient-text">Treatments</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#833AB4] to-[#E1306C] rounded-full mt-5 mx-auto" />
          <p className="mt-4 text-[#262626]/50 max-w-lg mx-auto text-base">
            Discover the most sought-after aesthetic treatments from top-rated Illinois providers
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-[1400px] mx-auto px-4">
          {/* Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {CAROUSEL_TREATMENTS.map((treatment, index) => {
                const isActive = index === selectedIndex
                const totalSlides = CAROUSEL_TREATMENTS.length
                const isNeighbor =
                  index === (selectedIndex - 1 + totalSlides) % totalSlides ||
                  index === (selectedIndex + 1) % totalSlides

                return (
                  <div
                    key={index}
                    className="flex-[0_0_85%] min-[480px]:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 px-2 md:px-3"
                  >
                    <div
                      style={{
                        transform: isActive
                          ? 'scale(1)'
                          : isNeighbor
                            ? 'scale(0.94)'
                            : 'scale(0.88)',
                        opacity: isActive ? 1 : isNeighbor ? 0.55 : 0.3,
                        transition: prefersReducedMotion
                          ? 'none'
                          : 'transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.65s cubic-bezier(0.4,0,0.2,1)',
                      }}
                    >
                      <TreatmentCarouselCard treatment={treatment} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#833AB4]/15 flex items-center justify-center text-[#262626]/70 hover:bg-white hover:border-[#833AB4]/30 hover:shadow-lg transition-all shadow-md"
            aria-label="Previous treatment"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#833AB4]/15 flex items-center justify-center text-[#262626]/70 hover:bg-white hover:border-[#833AB4]/30 hover:shadow-lg transition-all shadow-md"
            aria-label="Next treatment"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {CAROUSEL_TREATMENTS.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-6 bg-gradient-to-r from-[#833AB4] to-[#E1306C]'
                  : 'w-2 bg-[#262626]/20 hover:bg-[#262626]/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
