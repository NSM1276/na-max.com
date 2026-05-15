'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { fadeInUp, transition, viewportOptions } from '@/lib/motion'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/v1'

const PILOT_BULLETS = [
  '14 Tage kostenlos — keine Kreditkarte',
  'Setup & QR-Codes in 24 Stunden',
  'Persönliches Onboarding inklusive',
  'Jederzeit kündbar, keine Mindestlaufzeit',
]

interface FormState {
  hotelName: string
  rooms:     string  // string потому что input
  email:     string
  phone:     string
  message:   string
}

const INITIAL: FormState = { hotelName: '', rooms: '', email: '', phone: '', message: '' }

export default function PilotFormSection() {
  const [form, setForm]       = useState<FormState>(INITIAL)
  const [errors, setErrors]   = useState<Partial<Record<keyof FormState, string>>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [serverErr, setServerErr] = useState<string | null>(null)

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (form.hotelName.trim().length < 2)        e.hotelName = 'Bitte Hotelname angeben'
    const rooms = parseInt(form.rooms, 10)
    if (!form.rooms || isNaN(rooms) || rooms < 1) e.rooms = 'Zimmeranzahl (z.B. 25)'
    else if (rooms > 10000)                       e.rooms = 'Maximal 10 000'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Gültige E-Mail bitte'
    if (form.phone && form.phone.length > 40)     e.phone = 'Telefonnummer zu lang'
    if (form.message && form.message.length > 1000) e.message = 'Nachricht zu lang (max 1000 Zeichen)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setServerErr(null)
    if (!validate()) return

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelName: form.hotelName.trim(),
          rooms:     parseInt(form.rooms, 10),
          email:     form.email.trim(),
          ...(form.phone.trim()   ? { phone:   form.phone.trim() }   : {}),
          ...(form.message.trim() ? { message: form.message.trim() } : {}),
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        const msg  = Array.isArray(body.message) ? body.message.join(', ') : body.message
        throw new Error(msg || `HTTP ${res.status}`)
      }

      setDone(true)
      setForm(INITIAL)
    } catch (err) {
      setServerErr(err instanceof Error ? err.message : 'Etwas ist schiefgelaufen. Bitte später erneut versuchen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SectionWrapper id="pilot" className="bg-gradient-to-b from-brand-surface to-white">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        transition={transition}
        className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12"
      >
        {/* Left — pitch */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <p className="text-xs font-semibold text-brand-sky uppercase tracking-widest mb-3">
            14-Tage Pilot
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy leading-tight text-balance">
            Starten Sie risikofrei. In 24 Stunden live.
          </h2>
          <p className="mt-4 text-brand-slate leading-relaxed">
            Tragen Sie sich ein — wir melden uns innerhalb eines Werktages, klären
            offene Fragen und richten Ihren Pilot ein. Ohne Vertrag, ohne
            Verpflichtung.
          </p>

          <ul className="mt-6 space-y-2.5">
            {PILOT_BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-brand-slate">
                <CheckCircleIcon className="w-5 h-5 text-brand-sky flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl bg-white border border-slate-100 shadow-card-hover p-6 sm:p-8">
            {done ? (
              <SuccessState onReset={() => setDone(false)} />
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h3 className="text-lg font-bold text-brand-navy mb-1">
                  Pilot anfragen
                </h3>
                <p className="text-sm text-brand-muted -mt-1 mb-4">
                  4 Felder, 30 Sekunden. Wir melden uns binnen 24 h.
                </p>

                {/* Row: hotel + rooms */}
                <div className="grid sm:grid-cols-[2fr_1fr] gap-3">
                  <Field
                    id="hotelName" label="Hotelname"
                    value={form.hotelName}
                    onChange={(v) => setForm({ ...form, hotelName: v })}
                    error={errors.hotelName}
                    placeholder="z.B. Hotel Sacher"
                    required
                  />
                  <Field
                    id="rooms" label="Zimmer"
                    type="number"
                    value={form.rooms}
                    onChange={(v) => setForm({ ...form, rooms: v })}
                    error={errors.rooms}
                    placeholder="42"
                    required
                  />
                </div>

                <Field
                  id="email" label="E-Mail"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                  placeholder="ihre@hotel.com"
                  required
                />

                <Field
                  id="phone" label="Telefon"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  error={errors.phone}
                  placeholder="+43 …"
                  optional
                />

                <Field
                  id="message" label="Nachricht"
                  multiline
                  value={form.message}
                  onChange={(v) => setForm({ ...form, message: v })}
                  error={errors.message}
                  placeholder="Besondere Wünsche, Fragen zur Integration etc."
                  optional
                />

                {serverErr && (
                  <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
                    <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0 text-red-500" />
                    <span>{serverErr}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-brand-sky text-white font-semibold text-sm
                             hover:bg-brand-sky-dark transition-all duration-150 shadow-cta
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Wird gesendet…
                    </span>
                  ) : 'Jetzt Pilot anfragen →'}
                </button>

                <p className="text-[11px] text-brand-muted text-center pt-1">
                  Mit Klick auf &laquo;Pilot anfragen&raquo; akzeptieren Sie unsere
                  Datenschutzhinweise. Wir nutzen Ihre Daten ausschließlich, um Sie
                  zum Pilot zu kontaktieren.
                </p>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

// ─────────── Field component ───────────

interface FieldProps {
  id:          string
  label:       string
  value:       string
  onChange:    (v: string) => void
  error?:      string
  placeholder?: string
  type?:       string
  required?:   boolean
  optional?:   boolean
  multiline?:  boolean
}

function Field({
  id, label, value, onChange, error, placeholder, type = 'text',
  required, optional, multiline,
}: FieldProps) {
  const inputCls = `
    w-full px-3.5 py-2.5 rounded-xl border text-sm text-brand-navy placeholder:text-slate-300
    focus:outline-none focus:ring-2 transition
    ${error
      ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
      : 'border-slate-200 focus:ring-brand-sky/40 focus:border-brand-sky'}
  `
  return (
    <div>
      <label htmlFor={id} className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1">
        <span>
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </span>
        {optional && <span className="text-slate-300">Optional</span>}
      </label>
      {multiline ? (
        <textarea
          id={id} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} required={required} rows={3}
          className={inputCls + ' resize-none'}
        />
      ) : (
        <input
          id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} required={required}
          className={inputCls}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ─────────── Success state ───────────

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
        <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
      </div>
      <h3 className="text-xl font-bold text-brand-navy">Vielen Dank!</h3>
      <p className="mt-2 text-sm text-brand-slate max-w-sm mx-auto leading-relaxed">
        Ihre Anfrage ist bei uns angekommen. Wir melden uns innerhalb von
        24 Stunden — meistens schneller.
      </p>
      <button
        onClick={onReset}
        className="mt-5 text-sm text-brand-sky font-semibold hover:underline"
      >
        Noch ein Hotel anmelden
      </button>
    </div>
  )
}
