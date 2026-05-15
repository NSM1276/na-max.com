'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { staffApi } from '@/lib/staff-api'
import { AuthStorage } from '@/lib/auth-storage'

export default function StaffLoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  // Уже залогинен — сразу на дашборд
  useEffect(() => {
    if (AuthStorage.isLoggedIn()) router.replace('/staff/dashboard')
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const tokens = await staffApi.login(email, password)
      AuthStorage.setTokens(tokens.accessToken, tokens.refreshToken)
      router.push('/staff/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Anmeldung fehlgeschlagen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-3xl font-bold text-brand-navy tracking-tight">
            Na<span className="text-brand-sky">-</span>Max
          </span>
          <p className="mt-1 text-sm text-slate-400 font-medium tracking-wide uppercase">
            Staff Portal
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-8">
          <h1 className="text-xl font-bold text-brand-navy mb-6">Anmelden</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                E-Mail
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-brand-navy text-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-sky/40 focus:border-brand-sky transition"
                placeholder="name@hotel.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Passwort
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-brand-navy text-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-sky/40 focus:border-brand-sky transition"
                placeholder="••••••••"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-sky text-white text-sm font-semibold
                         hover:bg-brand-sky-dark transition-all duration-150 shadow-cta
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Anmelden...
                </span>
              ) : 'Anmelden'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Na-Max Staff Portal · Nur für autorisiertes Personal
        </p>
      </div>
    </div>
  )
}
