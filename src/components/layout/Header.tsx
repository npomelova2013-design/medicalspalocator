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
    setScrolled(window.scrollY > 10)
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
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
            : 'bg-white/90 backdrop-blur-lg border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group shrink-0">
              <span className="font-serif text-xl tracking-tight text-gray-900">
                Medical Spa
              </span>
              <span className="font-serif text-xl tracking-tight bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                Locator
              </span>
            </Link>

            {/* Search bar - desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-12">
              <div className="relative w-full group">
                <Search
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                    searchFocused ? 'text-teal-500' : 'text-gray-400'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search by city, treatment, or spa name..."
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 rounded-full text-sm text-gray-900 placeholder:text-gray-400 border border-transparent focus:border-teal-500/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(20,184,166,0.08)] focus:outline-none transition-all duration-200"
                />
              </div>
            </form>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 shrink-0">
              <Link
                href="/search"
                className="relative text-[13px] font-medium tracking-wide uppercase text-gray-500 hover:text-gray-900 transition-colors duration-200 group py-1"
              >
                Browse
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-teal-500 transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/claim/info"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium tracking-wide text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-teal-500/20"
              >
                List Your Spa
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors"
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
          className={`absolute inset-0 bg-white/95 backdrop-blur-xl transition-opacity duration-500 ${
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments, cities..."
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-full text-sm text-gray-900 placeholder:text-gray-400 border border-transparent focus:border-teal-500/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(20,184,166,0.08)] focus:outline-none transition-all duration-200"
              />
            </div>
          </form>

          {/* Mobile nav links */}
          <nav className="flex flex-col items-center gap-8">
            <Link
              href="/search"
              onClick={closeMobile}
              className={`text-2xl font-serif text-gray-900 hover:text-teal-600 transition-all duration-500 delay-200 transform ${
                mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Browse All
            </Link>
            <Link
              href="/claim/info"
              onClick={closeMobile}
              className={`inline-flex items-center gap-2 text-lg font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-3.5 rounded-full shadow-sm transition-all duration-500 delay-300 transform ${
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
