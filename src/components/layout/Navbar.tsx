'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '@/lib/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <span className="text-xl font-bold text-brand-navy tracking-tight">
              {SITE.name}
            </span>
            <span className="hidden sm:block text-xs text-brand-muted font-medium border border-brand-muted/30 rounded-full px-2 py-0.5">
              Hotel
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-brand-slate hover:text-brand-navy transition-colors font-medium">
              So funktioniert&apos;s
            </a>
            <a href="#features" className="text-sm text-brand-slate hover:text-brand-navy transition-colors font-medium">
              Funktionen
            </a>
            <a href="#pilot" className="text-sm text-brand-slate hover:text-brand-navy transition-colors font-medium">
              Pilot
            </a>
          </nav>

          <a
            href="#pilot"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-sky text-white text-sm font-semibold shadow-cta hover:bg-brand-sky-dark hover:shadow-cta-hover transition-all duration-200"
          >
            Pilot starten
          </a>
        </div>
      </div>
    </motion.header>
  )
}
