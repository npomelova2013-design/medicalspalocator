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
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 relative">
      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl px-8 py-10 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 -mt-20 relative z-10 shadow-2xl shadow-teal-900/30">
          <div>
            <h3 className="font-serif text-2xl text-white font-semibold">
              Own a Med Spa?
            </h3>
            <p className="text-teal-50/80 mt-1 max-w-md">
              Join Illinois&apos; fastest-growing med spa directory and connect with thousands of potential clients.
            </p>
          </div>
          <Link
            href="/claim/info"
            className="shrink-0 bg-white text-teal-700 font-semibold px-8 py-3 rounded-full hover:bg-teal-50 transition shadow-lg shadow-teal-800/20"
          >
            Get Listed Today
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <span className="font-serif text-xl text-white">Medical Spa</span>
              <span className="font-serif text-xl text-teal-400 ml-1.5">Locator</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Illinois&apos; largest med spa directory. Compare ratings, read reviews, and find the best medical spas near you.
            </p>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-medium mb-4">
              Popular Cities
            </h4>
            <ul className="space-y-2">
              {TOP_CITIES.map((city) => (
                <li key={city}>
                  <Link
                    href={`/city/${slugifyCity(city)}`}
                    className="text-sm text-slate-400 hover:text-white transition"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-medium mb-4">
              Treatments
            </h4>
            <ul className="space-y-2">
              {TREATMENTS.map((t) => (
                <li key={t}>
                  <Link
                    href={`/search?q=${encodeURIComponent(t)}`}
                    className="text-sm text-slate-400 hover:text-white transition"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Med Spas */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-medium mb-4">
              For Med Spas
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/claim/info" className="text-sm text-slate-400 hover:text-white transition">
                  Claim Your Listing
                </Link>
              </li>
              <li>
                <Link href="/claim/info" className="text-sm text-slate-400 hover:text-white transition">
                  Premium Listings
                </Link>
              </li>
              <li>
                <Link href="/claim/info" className="text-sm text-slate-400 hover:text-white transition">
                  Advertising
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 pt-6">
          <p className="text-center text-sm text-slate-600">
            &copy; {new Date().getFullYear()} Medical Spa Locator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
