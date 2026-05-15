import { SITE } from '@/lib/constants'

export default function Footer() {
  return (
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

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>© {new Date().getFullYear()} {SITE.name}. Alle Rechte vorbehalten.</span>
          <span>DSGVO-konform · Daten auf EU-Servern</span>
        </div>
      </div>
    </footer>
  )
}
