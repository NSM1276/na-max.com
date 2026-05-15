'use client'

import { useState } from 'react'
import { staffApi } from '@/lib/staff-api'
import type { ServiceRequest, RequestStatus } from '@/lib/staff-types'
import { CATEGORY_LABELS } from '@/lib/staff-types'
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import toast from 'react-hot-toast'

// ───────── Иконки категорий (inline SVG) ─────────
const CategoryIcon = ({ category }: { category: string }) => {
  const cls = 'w-4 h-4'
  switch (category) {
    case 'CLEANING':  return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
    case 'FOOD':      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    case 'TECHNICAL': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    case 'INFO':      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    default:          return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  }
}

// ───────── Relative time ─────────
function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60)  return 'Gerade eben'
  if (diff < 3600) return `vor ${Math.floor(diff / 60)} Min.`
  if (diff < 86400) return `vor ${Math.floor(diff / 3600)} Std.`
  return `vor ${Math.floor(diff / 86400)} Tag(en)`
}

// ───────── Payload preview ─────────
function PayloadPreview({ payload }: { payload: Record<string, unknown> }) {
  const entries = Object.entries(payload).filter(([, v]) => v !== null && v !== false && v !== undefined)
  if (!entries.length) return null
  return (
    <div className="text-xs text-slate-500 space-y-0.5">
      {entries.slice(0, 3).map(([k, v]) => (
        <div key={k}>
          <span className="text-slate-400">{k}:</span>{' '}
          <span className="text-slate-600 font-medium">
            {Array.isArray(v) ? v.join(', ') : String(v)}
          </span>
        </div>
      ))}
    </div>
  )
}

// ───────── Action buttons per status ─────────
const ACTIONS: Record<RequestStatus, { label: string; next: RequestStatus; style: string }[]> = {
  PENDING: [
    { label: 'Annehmen',    next: 'IN_PROGRESS', style: 'bg-sky-600 hover:bg-sky-700 text-white' },
    { label: 'Abbrechen',   next: 'CANCELLED',   style: 'bg-slate-200 hover:bg-slate-300 text-slate-700' },
  ],
  IN_PROGRESS: [
    { label: '✓ Erledigt',  next: 'COMPLETED',   style: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
    { label: 'Abbrechen',   next: 'CANCELLED',   style: 'bg-slate-200 hover:bg-slate-300 text-slate-700' },
  ],
  COMPLETED:  [],
  CANCELLED:  [],
}

interface Props {
  request: ServiceRequest
  onStatusChanged: () => void
}

export default function RequestCard({ request, onStatusChanged }: Props) {
  const [loading, setLoading] = useState<RequestStatus | null>(null)

  const handleAction = async (nextStatus: RequestStatus) => {
    setLoading(nextStatus)
    try {
      await staffApi.updateStatus(request.id, nextStatus)
      toast.success(nextStatus === 'COMPLETED' ? 'Erledigt! ✓' : 'Status aktualisiert')
      onStatusChanged()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Fehler beim Aktualisieren')
    } finally {
      setLoading(null)
    }
  }

  const actions = ACTIONS[request.status]
  const isArchived = request.status === 'COMPLETED' || request.status === 'CANCELLED'

  return (
    <div className={`
      flex flex-col rounded-xl border bg-white overflow-hidden transition-all duration-200
      ${isArchived ? 'opacity-60 shadow-sm' : 'shadow-[0_2px_8px_rgba(15,30,46,0.06)] hover:shadow-[0_8px_24px_rgba(15,30,46,0.10)]'}
    `}>
      {/* Card header */}
      <div className="flex items-start justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          {/* Номер комнаты */}
          <span className="text-2xl font-bold text-brand-navy leading-none">
            {request.room.roomNumber}
          </span>
          {request.room.floor != null && (
            <span className="text-xs text-slate-400">Etage {request.room.floor}</span>
          )}
        </div>
        <PriorityBadge priority={request.priority} />
      </div>

      {/* Category */}
      <div className="px-4 pb-3 flex items-center gap-1.5 text-sm font-medium text-slate-600">
        <CategoryIcon category={request.category} />
        {CATEGORY_LABELS[request.category]}
      </div>

      {/* Payload details */}
      <div className="px-4 pb-3">
        <PayloadPreview payload={request.payload} />
      </div>

      {/* Staff note */}
      {request.staffNote && (
        <div className="mx-4 mb-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
          <p className="text-xs text-slate-500">
            <span className="font-medium text-slate-600">Notiz: </span>
            {request.staffNote}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto border-t border-slate-100 px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <StatusBadge status={request.status} />
          <span className="text-xs text-slate-400">{timeAgo(request.createdAt)}</span>
        </div>

        {/* Action buttons */}
        {actions.length > 0 && (
          <div className="flex gap-1.5">
            {actions.map((action) => (
              <button
                key={action.next}
                onClick={() => handleAction(action.next)}
                disabled={loading !== null}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${action.style}
                `}
              >
                {loading === action.next ? (
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    ...
                  </span>
                ) : action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
