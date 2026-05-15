'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function HotelLoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/hotel/dashboard`,
      },
    })

    setLoading(false)

    if (authError) {
      setError(authError.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-brand-navy">Na-Max</span>
          <p className="text-brand-muted text-sm mt-1">Hotel-Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-sky/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-brand-navy mb-2">Link versendet!</h2>
              <p className="text-brand-slate text-sm">
                Wir haben einen Magic Link an <strong>{email}</strong> gesendet. Bitte prüfen Sie Ihr Postfach und klicken Sie auf den Link.
              </p>
              <button
                onClick={() => { setSent(false); setEmail('') }}
                className="mt-6 text-sm text-brand-sky hover:text-brand-sky-dark underline"
              >
                Andere E-Mail verwenden
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-brand-navy mb-1">Anmelden</h1>
              <p className="text-brand-muted text-sm mb-6">
                Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Link zum Anmelden.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-slate mb-1">
                    E-Mail-Adresse
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihr@hotel.de"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-brand-navy placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-sky/40 focus:border-brand-sky transition text-sm"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-2.5 rounded-xl bg-brand-sky hover:bg-brand-sky-dark text-white font-medium text-sm transition disabled:opacity-50 disabled:cursor-not-allowed shadow-cta hover:shadow-cta-hover"
                >
                  {loading ? 'Wird gesendet…' : 'Magic Link senden'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-brand-muted mt-6">
          Noch kein Konto?{' '}
          <a href="mailto:hallo@na-max.com" className="text-brand-sky hover:underline">
            Kontakt aufnehmen
          </a>
        </p>
      </div>
    </div>
  )
}
