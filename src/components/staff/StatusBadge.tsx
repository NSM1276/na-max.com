import type { RequestStatus } from '@/lib/staff-types'
import { STATUS_LABELS } from '@/lib/staff-types'

const STYLES: Record<RequestStatus, string> = {
  PENDING:     'bg-amber-100 text-amber-800 border border-amber-200',
  IN_PROGRESS: 'bg-sky-100 text-sky-800 border border-sky-200',
  COMPLETED:   'bg-emerald-100 text-emerald-800 border border-emerald-200',
  CANCELLED:   'bg-slate-100 text-slate-500 border border-slate-200',
}

const DOTS: Record<RequestStatus, string> = {
  PENDING:     'bg-amber-500 animate-pulse',
  IN_PROGRESS: 'bg-sky-500 animate-pulse',
  COMPLETED:   'bg-emerald-500',
  CANCELLED:   'bg-slate-400',
}

export default function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STYLES[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${DOTS[status]}`} />
      {STATUS_LABELS[status]}
    </span>
  )
}
