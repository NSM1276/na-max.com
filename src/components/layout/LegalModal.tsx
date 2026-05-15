'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface LegalModalProps {
  type: 'impressum' | 'datenschutz'
  onClose: () => void
}

const IMPRESSUM = (
  <>
    <h2 className="text-xl font-bold mb-6">Impressum</h2>
    <p className="text-sm text-slate-500 mb-6">Gemäß § 5 ECG</p>

    <h3 className="font-semibold mb-1">Nasim Nuridinov e.U</h3>
    <p className="text-slate-600 mb-1">Tscherttegasse 39, 1120 Wien, Österreich</p>
    <p className="text-slate-600 mb-1">E-Mail: <a href="mailto:office@na-max.com" className="text-brand-sky hover:underline">office@na-max.com</a></p>
    <p className="text-slate-600 mb-6">Telefon: <a href="tel:+4367764292055" className="text-brand-sky hover:underline">+43 677 64292055</a></p>

    <h3 className="font-semibold mb-1">Unternehmensgegenstand</h3>
    <p className="text-slate-600 mb-6">Web Design &amp; Web Development</p>

    <h3 className="font-semibold mb-1">UID-Nummer</h3>
    <p className="text-slate-600 mb-6">ATU80802758</p>

    <h3 className="font-semibold mb-1">Aufsichtsbehörde</h3>
    <p className="text-slate-600 mb-6">Magistrat der Stadt Wien · Mitglied der WKO Wien</p>

    <h3 className="font-semibold mb-1">Haftungsausschluss</h3>
    <p className="text-slate-600">
      Alle Inhalte dieser Website wurden sorgfältig erstellt. Für die Richtigkeit,
      Vollständigkeit und Aktualität der bereitgestellten Informationen wird keine
      Gewähr übernommen.
    </p>
  </>
)

const DATENSCHUTZ = (
  <>
    <h2 className="text-xl font-bold mb-6">Datenschutzerklärung</h2>

    <h3 className="font-semibold mb-1">Verantwortlicher gemäß DSGVO</h3>
    <p className="text-slate-600 mb-1">Nasim Nuridinov e.U, Tscherttegasse 39, 1120 Wien</p>
    <p className="text-slate-600 mb-6">E-Mail: <a href="mailto:office@na-max.com" className="text-brand-sky hover:underline">office@na-max.com</a></p>

    <h3 className="font-semibold mb-1">Welche Daten wir verarbeiten</h3>
    <p className="text-slate-600 mb-4">
      Diese Website erhebt keine personenbezogenen Daten über Formulare oder Tracking.
      Es werden keine Cookies gesetzt.
    </p>
    <p className="text-slate-600 mb-6">
      <code className="bg-slate-100 px-1 rounded text-sm">localStorage</code> wird
      ausschließlich verwendet, um Ihre Sprachpräferenz (DE/EN) zu speichern. Dies ist
      eine technisch notwendige Funktion und bedarf keiner Einwilligung (§ 25 Abs. 2 TDSG).
    </p>

    <h3 className="font-semibold mb-1">Schriften (selbst gehostet)</h3>
    <p className="text-slate-600 mb-6">
      Diese Website verwendet die Schriftarten Inter Tight und Instrument Serif,
      die ausschließlich von unserem eigenen Server geladen werden.
      Es werden keine Daten an Dritte übertragen.
    </p>

    <h3 className="font-semibold mb-1">Kontaktaufnahme per E-Mail oder Telefon</h3>
    <p className="text-slate-600 mb-6">
      Wenn Sie uns per E-Mail oder Telefon kontaktieren, werden Ihre Angaben zur
      Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
      Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
    </p>

    <h3 className="font-semibold mb-1">Ihre Rechte</h3>
    <p className="text-slate-600">
      Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
      Verarbeitung und Datenübertragbarkeit. Beschwerden können bei der österreichischen
      Datenschutzbehörde eingereicht werden (<a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-brand-sky hover:underline">dsb.gv.at</a>).
    </p>
  </>
)

export default function LegalModal({ type, onClose }: LegalModalProps) {
  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            {type === 'impressum' ? 'Impressum' : 'Datenschutz'}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            aria-label="Schließen"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-6 text-sm leading-relaxed text-brand-ink">
          {type === 'impressum' ? IMPRESSUM : DATENSCHUTZ}
        </div>

        {/* Bottom padding for mobile safe area */}
        <div className="shrink-0" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>,
    document.body
  )
}
