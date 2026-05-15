'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'

// ─── Options ──────────────────────────────────────────────────────────────────

const PROPERTY_TYPES = ['Hotel', 'Pension / B&B', 'Apartment', 'Hostel', 'Anderes']
const ROOM_COUNTS    = ['1 – 5 Zimmer', '6 – 15 Zimmer', '16 – 30 Zimmer', '30+ Zimmer']
const GUEST_MIXES    = [
  'Meist deutschsprachig',
  'International gemischt',
  'Meist englischsprachig',
  'Viele Asiaten / Russen',
]
const CITIES = ['Wien', 'Graz', 'Salzburg', 'Berlin', 'München', 'Andere Stadt']

const STEPS_LABELS = ['IHR OBJEKT', 'IHRE GÄSTE', 'KONTAKT']

// ─── State ────────────────────────────────────────────────────────────────────

type State = {
  step:         number
  propertyType: string
  rooms:        string
  guestMix:     string
  city:         string
  hotelName:    string
  email:        string
  phone:        string
}

const INIT: State = {
  step: 0, propertyType: '', rooms: '', guestMix: '', city: '',
  hotelName: '', email: '', phone: '',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS_LABELS.map((label, i) => {
        const done    = i < current
        const active  = i === current
        return (
          <div key={i} className="flex items-center gap-0 flex-1 last:flex-none">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                done   ? 'bg-brand-sky border-brand-sky text-white' :
                active ? 'border-brand-sky text-brand-sky bg-transparent' :
                         'border-slate-200 text-slate-300 bg-transparent'
              }`}>
                {done ? '✓' : i + 1}
              </div>
              <span className={`text-[10px] font-semibold tracking-widest uppercase hidden sm:block ${
                active ? 'text-brand-navy' : done ? 'text-brand-sky' : 'text-slate-300'
              }`}>
                {label}
              </span>
            </div>
            {i < STEPS_LABELS.length - 1 && (
              <div className={`flex-1 h-px mx-3 ${done ? 'bg-brand-sky' : 'bg-slate-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function ChipGroup({
  options, value, onChange,
}: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-3.5 py-2 rounded-xl border text-sm font-medium transition-all ${
            value === opt
              ? 'border-brand-sky bg-brand-sky text-white shadow-cta'
              : 'border-slate-200 text-brand-slate hover:border-brand-sky/50 bg-white'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
      {children}
    </p>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function RegistrationFunnelSection() {
  const [s, setS]         = useState<State>(INIT)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const set = (key: keyof State, value: string | number) =>
    setS(prev => ({ ...prev, [key]: value }))

  const canNext =
    s.step === 0 ? !!s.propertyType && !!s.rooms :
    s.step === 1 ? !!s.guestMix && !!s.city :
    !!s.hotelName && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canNext) return
    setStatus('sending')

    const fd = new FormData()
    fd.append('_captcha',  'false')
    fd.append('_template', 'table')
    fd.append('_subject',  `Na-Max Anfrage — ${s.hotelName} · ${s.city}`)
    fd.append('Art des Objekts',   s.propertyType)
    fd.append('Anzahl Zimmer',     s.rooms)
    fd.append('Gäste-Mix',         s.guestMix)
    fd.append('Stadt',             s.city)
    fd.append('Name des Objekts',  s.hotelName)
    fd.append('E-Mail',            s.email)
    if (s.phone) fd.append('Telefon', s.phone)

    try {
      const res = await fetch('https://formsubmit.co/ajax/pilot@na-max.com', {
        method:  'POST',
        headers: { Accept: 'application/json' },
        body:    fd,
      })
      const json = await res.json()
      setStatus(json.success === 'true' || json.success === true ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionWrapper id="registrierung" className="bg-gradient-to-b from-brand-surface to-white">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
            14-Tage Pilot
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">
            Jetzt kostenlos starten
          </h2>
          <p className="mt-3 text-brand-slate text-sm">
            Wir melden uns innerhalb eines Werktages und richten alles ein.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card-hover p-6 sm:p-8">
          {status === 'sent' ? (
            <SuccessState hotelName={s.hotelName} onReset={() => { setS(INIT); setStatus('idle') }} />
          ) : (
            <form onSubmit={handleSubmit}>
              <StepIndicator current={s.step} />

              {/* Step 0 */}
              {s.step === 0 && (
                <div className="space-y-6">
                  <div>
                    <Label>Art des Objekts</Label>
                    <ChipGroup options={PROPERTY_TYPES} value={s.propertyType}
                      onChange={v => set('propertyType', v)} />
                  </div>
                  <div>
                    <Label>Anzahl der Zimmer</Label>
                    <ChipGroup options={ROOM_COUNTS} value={s.rooms}
                      onChange={v => set('rooms', v)} />
                  </div>
                </div>
              )}

              {/* Step 1 */}
              {s.step === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label>Woher kommen Ihre Gäste?</Label>
                    <ChipGroup options={GUEST_MIXES} value={s.guestMix}
                      onChange={v => set('guestMix', v)} />
                  </div>
                  <div>
                    <Label>Ihre Stadt</Label>
                    <ChipGroup options={CITIES} value={s.city}
                      onChange={v => set('city', v)} />
                  </div>
                </div>
              )}

              {/* Step 2 — contact */}
              {s.step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5 block">
                      Name des Hotels / Pension <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={s.hotelName}
                      onChange={e => set('hotelName', e.target.value)}
                      placeholder="z.B. Pension Schönbrunn"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-brand-sky/40 focus:border-brand-sky"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5 block">
                      Ihre E-Mail <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={s.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="ihre@email.at"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-brand-sky/40 focus:border-brand-sky"
                    />
                  </div>
                  <div>
                    <label className="flex justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                      <span>Telefon</span>
                      <span className="normal-case font-normal">Optional</span>
                    </label>
                    <input
                      type="tel"
                      value={s.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="+43 …"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-brand-sky/40 focus:border-brand-sky"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
                      <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
                      Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className={`mt-8 flex ${s.step > 0 ? 'justify-between' : 'justify-end'}`}>
                {s.step > 0 && (
                  <button
                    type="button"
                    onClick={() => set('step', s.step - 1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm text-brand-slate hover:border-slate-300 transition-colors"
                  >
                    ← Zurück
                  </button>
                )}
                {s.step < 2 ? (
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => set('step', s.step + 1)}
                    className="px-6 py-2.5 rounded-xl bg-brand-sky text-white text-sm font-semibold
                               shadow-cta hover:bg-brand-sky-dark transition-all
                               disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Weiter →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canNext || status === 'sending'}
                    className="px-6 py-2.5 rounded-xl bg-brand-sky text-white text-sm font-semibold
                               shadow-cta hover:bg-brand-sky-dark transition-all
                               disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Wird gesendet…' : 'Kostenlos anfragen →'}
                  </button>
                )}
              </div>

              <p className="mt-4 text-[11px] text-brand-muted text-center">
                Keine Kreditkarte · Kein Vertrag · Jederzeit kündbar
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

function SuccessState({ hotelName, onReset }: { hotelName: string; onReset: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
        <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
      </div>
      <h3 className="text-xl font-bold text-brand-navy">Vielen Dank!</h3>
      <p className="mt-2 text-sm text-brand-slate max-w-sm mx-auto leading-relaxed">
        Ihre Anfrage für <strong>{hotelName}</strong> ist angekommen.
        Wir melden uns innerhalb von 24 Stunden — meistens schneller.
      </p>
      <button
        onClick={onReset}
        className="mt-5 text-sm text-brand-sky font-semibold hover:underline"
      >
        Weiteres Objekt anmelden
      </button>
    </div>
  )
}
