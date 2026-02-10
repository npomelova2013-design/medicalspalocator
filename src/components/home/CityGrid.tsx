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
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <span className="text-lg text-slate-400 font-medium">Explore by</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Location
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topCities.map((city) => (
            <Link key={city.city} href={`/city/${slugifyCity(city.city)}`}>
              <div className="group hover-lift rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-teal-200 p-5 transition-all duration-300 cursor-pointer h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
                      <h3 className="font-semibold text-lg text-slate-900">
                        {city.city}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500">
                      {city.total_spas} med spas
                    </p>
                    {city.avg_rating && (
                      <p className="text-xs text-slate-400 mt-1">
                        Avg {Number(city.avg_rating).toFixed(1)} stars
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1.5 flex-shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
