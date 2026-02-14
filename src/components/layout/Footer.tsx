import Link from 'next/link'
import { slugifyCity } from '@/lib/utils/formatting'

const TOP_CITIES = [
  'Chicago', 'Skokie', 'Evanston', 'Northbrook', 'Highland Park',
  'Glenview', 'Deerfield', 'Wilmette', 'Lake Forest', 'Park Ridge',
  'Libertyville', 'Winnetka',
]

const TREATMENTS = [
  'Botox', 'Fillers', 'Laser Hair Removal', 'Facials',
  'Chemical Peels', 'Body Contouring', 'Microneedling', 'Coolsculpting',
]

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0d0d1a] to-[#1a1a2e] relative overflow-hidden">
      {/* Background orbs */}
      <div className="gradient-orb gradient-orb-rose-gold absolute top-20 -right-40 h-[400px] w-[400px] animate-float opacity-15" />
      <div className="gradient-orb gradient-orb-champagne absolute bottom-20 -left-32 h-[350px] w-[350px] animate-float-delayed opacity-10" />

      {/* CTA Banner — gradient border wrapper */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#833AB4] p-[2px] rounded-2xl -mt-20 relative z-10 shadow-2xl">
          <div className="bg-[#0d0d1a] rounded-[calc(1rem-2px)] px-8 py-10 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif italic text-2xl text-white font-semibold tracking-editorial">
                Own a Med Spa?
              </h3>
              <p className="text-white/60 mt-1 max-w-md">
                Join Illinois&apos; fastest-growing med spa directory and connect with thousands of potential clients.
              </p>
            </div>
            <Link
              href="/claim/info"
              className="shrink-0 bg-white text-[#262626] font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get Listed Today &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <span className="font-serif text-xl text-white">Medical Spa</span>
              <span className="font-serif text-xl ml-1.5 bg-gradient-to-r from-[#833AB4] to-[#E1306C] bg-clip-text text-transparent">Locator</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Illinois&apos; largest med spa directory. Compare ratings, read reviews, and find the best medical spas near you.
            </p>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 font-medium mb-4">
              Popular Cities
            </h4>
            <ul className="space-y-2">
              {TOP_CITIES.map((city) => (
                <li key={city}>
                  <Link
                    href={`/city/${slugifyCity(city)}`}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 font-medium mb-4">
              Treatments
            </h4>
            <ul className="space-y-2">
              {TREATMENTS.map((t) => (
                <li key={t}>
                  <Link
                    href={`/search?q=${encodeURIComponent(t)}`}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Med Spas */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 font-medium mb-4">
              For Med Spas
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/claim/info" className="text-sm text-white/60 hover:text-white transition">
                  Claim Your Listing
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition">
                  Premium Plans
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 pt-6">
          <p className="text-center text-sm text-white/40">
            &copy; {new Date().getFullYear()} Medical Spa Locator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
