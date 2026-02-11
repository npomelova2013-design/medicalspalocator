import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { slugifyCity } from '@/lib/utils/formatting'
import type { CitySummary } from '@/types/database'

interface Props {
  cities: CitySummary[]
}

export function CityGrid({ cities }: Props) {
  const topCities = cities.slice(0, 12)

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background orbs */}
      <div className="gradient-orb gradient-orb-champagne absolute -top-40 -right-40 h-[500px] w-[500px] animate-float-slow opacity-20" />
      <div className="gradient-orb gradient-orb-warm-blush absolute -bottom-32 -left-32 h-[400px] w-[400px] animate-float opacity-15" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <span className="text-lg text-[#E1306C] font-medium">Explore by</span>
          <h2 className="text-3xl md:text-4xl font-serif italic font-semibold tracking-editorial text-[#262626]">
            Location
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topCities.map((city) => (
            <Link key={city.city} href={`/city/${slugifyCity(city.city)}`}>
              <div className="gradient-border-hover group">
                <div className="rounded-2xl bg-white hover:bg-[#FAFAFA] border border-[#833AB4]/10 p-5 transition-all duration-300 cursor-pointer h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#833AB4] to-[#E1306C] flex-shrink-0" />
                        <h3 className="font-semibold text-lg text-[#262626]">
                          {city.city}
                        </h3>
                      </div>
                      <p className="text-sm text-[#262626]/60">
                        {city.total_spas} med spas
                      </p>
                      {city.avg_rating && (
                        <p className="text-xs text-[#E1306C] mt-1">
                          Avg {Number(city.avg_rating).toFixed(1)} stars
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#833AB4] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1.5 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
