'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useContent, useLang } from '@/lib/i18n'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { SITE, UI } = useContent()
  const { lang, setLang } = useLang()

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
              {UI.nav.badge}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-brand-slate hover:text-brand-navy transition-colors font-medium">
              {UI.nav.howItWorks}
            </a>
            <a href="#features" className="text-sm text-brand-slate hover:text-brand-navy transition-colors font-medium">
              {UI.nav.features}
            </a>
            <a href="#pilot" className="text-sm text-brand-slate hover:text-brand-navy transition-colors font-medium">
              {UI.nav.pilot}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center gap-0.5 bg-slate-100 rounded-full p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLang('de')}
                className={`px-2 py-1 rounded-full transition-colors ${
                  lang === 'de' ? 'bg-white text-brand-navy shadow-sm' : 'text-brand-muted'
                }`}
                aria-label="Deutsch"
              >
                DE
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-full transition-colors ${
                  lang === 'en' ? 'bg-white text-brand-navy shadow-sm' : 'text-brand-muted'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <a
              href="#pilot"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-sky text-white text-sm font-semibold shadow-cta hover:bg-brand-sky-dark hover:shadow-cta-hover transition-all duration-200"
            >
              {UI.nav.cta}
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
