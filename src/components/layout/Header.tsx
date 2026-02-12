'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // On homepage, header starts transparent/white text; on all other pages, always dark text
  const isDarkText = scrolled || pathname !== '/'

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
          isDarkText
            ? 'bg-[#FAFAFA]/95 backdrop-blur-lg border-b border-[#833AB4]/10 shadow-[0_1px_3px_rgba(44,24,16,0.06)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group shrink-0">
              <span className={`font-serif text-xl tracking-tight transition-colors duration-300 ${
                isDarkText ? 'text-[#262626]' : 'text-white'
              }`}>
                Medical Spa
              </span>
              <span className={`font-serif text-xl tracking-tight transition-colors duration-300 ${
                isDarkText
                  ? 'bg-gradient-to-r from-[#833AB4] to-[#E1306C] bg-clip-text text-transparent'
                  : 'text-white/90'
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
                      ? 'text-[#833AB4]'
                      : isDarkText ? 'text-[#262626]/40' : 'text-white/50'
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
                    isDarkText
                      ? 'bg-[#F0E6F6]/50 text-[#262626] placeholder:text-[#262626]/40 border border-[#833AB4]/15 focus:border-[#833AB4]/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(131,58,180,0.08)]'
                      : 'bg-white/15 backdrop-blur-md text-white placeholder:text-white/60 border border-white/20 focus:border-[#833AB4]/40 focus:bg-white/20'
                  }`}
                />
              </div>
            </form>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 shrink-0">
              <Link
                href="/search"
                className={`relative text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 group py-1 ${
                  isDarkText ? 'text-[#262626]/80 hover:text-[#262626]' : 'text-white/90 hover:text-white'
                }`}
              >
                Browse
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full bg-[#833AB4]" />
              </Link>
              <Link
                href="/claim/info"
                className={`inline-flex items-center gap-1.5 text-[13px] font-medium tracking-wide px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm ${
                  isDarkText
                    ? 'text-white bg-gradient-to-r from-[#833AB4] to-[#E1306C] hover:shadow-md hover:shadow-[#833AB4]/20'
                    : 'text-white bg-white/15 backdrop-blur-md border border-[#833AB4]/25 hover:bg-white/25'
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
                mobileOpen || isDarkText ? 'text-[#262626] hover:text-[#E1306C]' : 'text-white hover:text-[#833AB4]'
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
        className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ease-out ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#FAFAFA]/95 backdrop-blur-xl transition-opacity duration-500 ${
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E1306C]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments, cities..."
                className="w-full pl-11 pr-4 py-3.5 bg-white rounded-full text-sm text-[#262626] placeholder:text-[#262626]/40 border border-[#833AB4]/20 focus:border-[#833AB4]/40 focus:shadow-[0_0_0_3px_rgba(131,58,180,0.08)] focus:outline-none transition-all duration-200"
              />
            </div>
          </form>

          {/* Mobile nav links */}
          <nav className="flex flex-col items-center gap-8">
            <Link
              href="/search"
              onClick={closeMobile}
              className={`text-2xl font-serif italic text-[#262626] hover:text-[#E1306C] transition-all duration-500 delay-200 transform ${
                mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Browse All
            </Link>
            <Link
              href="/claim/info"
              onClick={closeMobile}
              className={`inline-flex items-center gap-2 text-lg font-medium text-white bg-gradient-to-r from-[#833AB4] to-[#E1306C] px-8 py-3.5 rounded-full shadow-purple-glow transition-all duration-500 delay-300 transform ${
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
