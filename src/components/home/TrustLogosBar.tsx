const TRUST_LOGOS = [
  { name: 'Healthgrades', display: 'healthgrades', style: 'font-sans font-normal tracking-tight' },
  { name: 'WebMD', display: 'WebMD', style: 'font-sans font-bold tracking-tight' },
  { name: 'RealSelf', display: 'RealSelf', style: 'font-sans font-semibold tracking-tight italic' },
  { name: 'Yelp', display: 'yelp', style: 'font-sans font-extrabold tracking-tighter' },
  { name: 'Google', display: 'Google', style: 'font-sans font-medium tracking-normal' },
  { name: 'BirdEye', display: 'BirdEye', style: 'font-sans font-semibold tracking-tight' },
  { name: 'Allergan', display: 'ALLERGAN', style: 'font-sans font-light tracking-[0.25em] text-[0.85em]' },
  { name: 'Womens Health', display: "Women\u2019s Health", style: 'font-serif italic font-semibold tracking-tight' },
  { name: 'Forbes', display: 'Forbes', style: 'font-serif italic font-bold tracking-tight' },
]

export function TrustLogosBar() {
  // Duplicate array for seamless infinite loop
  const items = [...TRUST_LOGOS, ...TRUST_LOGOS]

  return (
    <section className="relative bg-gradient-to-r from-[#FAFAFA] via-white to-[#FAFAFA] border-y border-[#833AB4]/10 py-8 md:py-10 overflow-hidden">
      {/* Left fade mask */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      {/* Right fade mask */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#262626]/25 mb-6 relative z-20">
        Trusted by practitioners featured on
      </p>

      <div className="marquee-track whitespace-nowrap">
        {items.map((logo, i) => (
          <span key={`${logo.name}-${i}`} className="inline-flex items-center">
            <span
              className={`text-lg md:text-xl text-[#262626]/25 select-none px-6 md:px-10 ${logo.style}`}
            >
              {logo.display}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#833AB4]/30 to-[#E1306C]/30 flex-shrink-0" />
          </span>
        ))}
      </div>
    </section>
  )
}
