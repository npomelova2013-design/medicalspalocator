'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const router = useRouter()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 100)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchFocused(false)
      setMobileOpen(false)
    }
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FFF8F0]/95 backdrop-blur-lg border-b border-[#D4AF37]/10 shadow-[0_1px_3px_rgba(44,24,16,0.06)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group shrink-0">
              <span className={`font-serif text-xl tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-[#2C1810]' : 'text-white'
              }`}>
                Medical Spa
              </span>
              <span className={`font-serif text-xl tracking-tight transition-colors duration-300 ${
                scrolled
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B76E79] bg-clip-text text-transparent'
                  : 'text-[#D4AF37]/80'
              }`}>
                Locator
              </span>
            </Link>

            {/* Search bar - desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-12">
              <div className="relative w-full group">
                <Search
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                    searchFocused
                      ? 'text-[#D4AF37]'
                      : scrolled ? 'text-[#2C1810]/40' : 'text-white/50'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search by city, treatment, or spa name..."
                  className={`w-full pl-11 pr-4 py-2.5 rounded-full text-sm transition-all duration-300 focus:outline-none ${
                    scrolled
                      ? 'bg-[#F5E6E0]/50 text-[#2C1810] placeholder:text-[#2C1810]/40 border border-transparent focus:border-[#D4AF37]/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)]'
                      : 'bg-white/10 backdrop-blur-md text-white placeholder:text-white/50 border border-[#D4AF37]/20 focus:border-[#D4AF37]/40 focus:bg-white/15'
                  }`}
                />
              </div>
            </form>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 shrink-0">
              <Link
                href="/search"
                className={`relative text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 group py-1 ${
                  scrolled ? 'text-[#2C1810]/60 hover:text-[#2C1810]' : 'text-white/70 hover:text-white'
                }`}
              >
                Browse
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                  scrolled ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]'
                }`} />
              </Link>
              <Link
                href="/claim/info"
                className={`inline-flex items-center gap-1.5 text-[13px] font-medium tracking-wide px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm ${
                  scrolled
                    ? 'text-white bg-gradient-to-r from-[#D4AF37] to-[#B76E79] hover:shadow-md hover:shadow-[#D4AF37]/20'
                    : 'text-white bg-white/15 backdrop-blur-md border border-[#D4AF37]/25 hover:bg-white/25'
                }`}
              >
                List Your Spa
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden relative z-50 p-2 -mr-2 transition-colors duration-300 ${
                mobileOpen || scrolled ? 'text-[#2C1810] hover:text-[#B76E79]' : 'text-white hover:text-[#D4AF37]'
              }`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 block w-6 h-[1.5px] bg-current transform transition-all duration-300 ease-out ${
                    mobileOpen ? 'top-[11px] rotate-45' : 'top-[7px] rotate-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[11px] block w-6 h-[1.5px] bg-current transition-opacity duration-200 ${
                    mobileOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block w-6 h-[1.5px] bg-current transform transition-all duration-300 ease-out ${
                    mobileOpen ? 'top-[11px] -rotate-45' : 'top-[15px] rotate-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#FFF8F0]/95 backdrop-blur-xl transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMobile}
        />

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center h-full px-8">
          {/* Mobile search */}
          <form
            onSubmit={handleSearch}
            className={`w-full max-w-sm mb-12 transform transition-all duration-500 delay-100 ${
              mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B76E79]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments, cities..."
                className="w-full pl-11 pr-4 py-3.5 bg-white rounded-full text-sm text-[#2C1810] placeholder:text-[#2C1810]/40 border border-[#D4AF37]/20 focus:border-[#D4AF37]/40 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)] focus:outline-none transition-all duration-200"
              />
            </div>
          </form>

          {/* Mobile nav links */}
          <nav className="flex flex-col items-center gap-8">
            <Link
              href="/search"
              onClick={closeMobile}
              className={`text-2xl font-serif italic text-[#2C1810] hover:text-[#B76E79] transition-all duration-500 delay-200 transform ${
                mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Browse All
            </Link>
            <Link
              href="/claim/info"
              onClick={closeMobile}
              className={`inline-flex items-center gap-2 text-lg font-medium text-white bg-gradient-to-r from-[#D4AF37] to-[#B76E79] px-8 py-3.5 rounded-full shadow-gold-glow transition-all duration-500 delay-300 transform ${
                mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              List Your Spa
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
