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
  return (
    <section className="bg-[#FFF8F0] border-y border-[#D4AF37]/10 py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#2C1810]/25 mb-8">
          Trusted by practitioners featured on
        </p>
        <div className="flex items-center justify-center gap-6 md:gap-10 lg:gap-14 flex-wrap">
          {TRUST_LOGOS.map((logo) => (
            <span
              key={logo.name}
              className={`text-base md:text-lg lg:text-xl text-[#2C1810]/20 hover:text-[#2C1810]/35 transition-colors duration-300 select-none ${logo.style}`}
            >
              {logo.display}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
