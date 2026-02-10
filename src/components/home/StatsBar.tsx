interface Props {
  totalSpas: number
  totalCities: number
}

export function StatsBar({ totalSpas, totalCities }: Props) {
  return (
    <div className="relative bg-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-evenly">
          {/* Stat: Med Spas */}
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl md:text-6xl font-serif font-bold text-gradient">
              {totalSpas}+
            </span>
            <span className="text-sm uppercase tracking-[0.15em] text-slate-400 mt-2">
              Med Spas
            </span>
          </div>

          {/* Separator */}
          <div className="hidden sm:block h-12 w-px bg-slate-200" />

          {/* Stat: Cities Covered */}
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl md:text-6xl font-serif font-bold text-gradient">
              {totalCities}+
            </span>
            <span className="text-sm uppercase tracking-[0.15em] text-slate-400 mt-2">
              Cities Covered
            </span>
          </div>

          {/* Separator */}
          <div className="hidden sm:block h-12 w-px bg-slate-200" />

          {/* Stat: Average Rating */}
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl md:text-6xl font-serif font-bold text-gradient">
              4.7
            </span>
            <span className="text-sm uppercase tracking-[0.15em] text-slate-400 mt-2">
              Average Rating
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
