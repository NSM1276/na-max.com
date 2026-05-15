'use client'

import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { Toaster } from 'react-hot-toast'
import { staffApi } from '@/lib/staff-api'
import { AuthStorage } from '@/lib/auth-storage'
import type { RequestStatus } from '@/lib/staff-types'
import RequestCard from '@/components/staff/RequestCard'

// Фильтры вкладок
type Filter = 'ALL' | RequestStatus

const FILTER_TABS: { key: Filter; label: string }[] = [
  { key: 'ALL',         label: 'Alle'          },
  { key: 'PENDING',     label: 'Neu'           },
  { key: 'IN_PROGRESS', label: 'In Bearbeitung' },
  { key: 'COMPLETED',   label: 'Erledigt'      },
  { key: 'CANCELLED',   label: 'Abgebrochen'   },
]

export default function DashboardPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<Filter>('ALL')

  // Auth guard — client-side
  useEffect(() => {
    if (!AuthStorage.isLoggedIn()) router.replace('/staff/login')
  }, [router])

  // SWR ключ с фильтром
  const swrKey = filter === 'ALL'
    ? '/staff/requests'
    : `/staff/requests?status=${filter}`

  // Polling каждые 10 секунд
  const { data: requests, error, isLoading, mutate } = useSWR(
    swrKey,
    staffApi.fetchRequests,
    {
      refreshInterval: 10_000,
      revalidateOnFocus: true,
      dedupingInterval: 2000,
    },
  )

  const handleStatusChanged = useCallback(() => {
    mutate() // немедленно обновить список
  }, [mutate])

  const handleLogout = () => {
    AuthStorage.clear()
    router.push('/staff/login')
  }

  // Кол-во PENDING для бейджа в заголовке
  const pendingCount = requests?.filter(r => r.status === 'PENDING').length ?? 0

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: '12px', fontFamily: 'var(--font-dm-sans)', fontSize: '14px' },
          success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
        }}
      />

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 bg-brand-navy border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-white tracking-tight">
              Na<span className="text-brand-sky">-</span>Max
            </span>
            <span className="hidden sm:block text-white/30">|</span>
            <span className="hidden sm:block text-sm text-white/60 font-medium">
              Anfragen-Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Polling-индикатор */}
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                         text-white/60 hover:text-white hover:bg-white/10 transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Filter tabs ── */}
        <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-slate-100 mb-6 overflow-x-auto">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`
                flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                ${filter === tab.key
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'text-slate-500 hover:text-brand-navy hover:bg-slate-50'}
              `}
            >
              {tab.label}
              {tab.key === 'PENDING' && pendingCount > 0 && (
                <span className={`
                  min-w-[18px] h-[18px] rounded-full text-xs flex items-center justify-center px-1 font-bold
                  ${filter === 'PENDING' ? 'bg-brand-sky text-white' : 'bg-amber-500 text-white'}
                `}>
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── States ── */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 rounded-xl bg-white animate-pulse border border-slate-100" />
            ))}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-slate-600 font-medium">Verbindungsfehler</p>
            <p className="text-slate-400 text-sm mt-1">API nicht erreichbar. Versuche es erneut...</p>
          </div>
        )}

        {!isLoading && !error && requests?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-600 font-medium">Keine offenen Anfragen</p>
            <p className="text-slate-400 text-sm mt-1">Neue Anfragen erscheinen automatisch</p>
          </div>
        )}

        {/* ── Request cards grid ── */}
        {!isLoading && !error && requests && requests.length > 0 && (
          <>
            <p className="text-xs text-slate-400 mb-4 font-medium">
              {requests.length} {requests.length === 1 ? 'Anfrage' : 'Anfragen'} ·{' '}
              aktualisiert automatisch alle 10 Sek.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {requests.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onStatusChanged={handleStatusChanged}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
