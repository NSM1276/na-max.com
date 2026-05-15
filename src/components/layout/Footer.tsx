'use client'

import { useState } from 'react'
import { SITE } from '@/lib/constants'
import LegalModal from './LegalModal'

type ModalType = 'impressum' | 'datenschutz' | null

export default function Footer() {
  const [modal, setModal] = useState<ModalType>(null)

  return (
    <>
      <footer className="bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-lg font-bold tracking-tight">{SITE.name}</span>
              <p className="text-sm text-white/50 mt-1">{SITE.tagline}</p>
            </div>

            <nav className="flex items-center gap-6 text-sm text-white/60">
              <a href="#how-it-works" className="hover:text-white transition-colors">
                So funktioniert&apos;s
              </a>
              <a href="#features" className="hover:text-white transition-colors">
                Funktionen
              </a>
              <a href="#pilot" className="hover:text-white transition-colors">
                Pilot starten
              </a>
              <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                Kontakt
              </a>
            </nav>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <span>© {new Date().getFullYear()} {SITE.name}. Alle Rechte vorbehalten.</span>

            <div className="flex items-center gap-4">
              <span>DSGVO-konform · Daten auf EU-Servern</span>
              <span className="text-white/20">|</span>
              <button
                onClick={() => setModal('impressum')}
                className="hover:text-white/80 transition-colors underline-offset-2 hover:underline"
              >
                Impressum
              </button>
              <button
                onClick={() => setModal('datenschutz')}
                className="hover:text-white/80 transition-colors underline-offset-2 hover:underline"
              >
                Datenschutz
              </button>
            </div>
          </div>
        </div>
      </footer>

      {modal && (
        <LegalModal type={modal} onClose={() => setModal(null)} />
      )}
    </>
  )
}
