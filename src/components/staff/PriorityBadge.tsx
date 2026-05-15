import type { RequestPriority } from '@/lib/staff-types'
import { PRIORITY_LABELS } from '@/lib/staff-types'

const STYLES: Record<RequestPriority, string> = {
  LOW:    'bg-slate-100 text-slate-500 text-xs',
  NORMAL: 'bg-slate-100 text-slate-600 text-xs',
  HIGH:   'bg-orange-100 text-orange-700 text-xs font-semibold',
  URGENT: 'bg-red-100 text-red-700 text-xs font-bold',
}

export default function PriorityBadge({ priority }: { priority: RequestPriority }) {
  if (priority === 'NORMAL') return null // Normal не отображаем — не засоряет UI
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${STYLES[priority]}`}>
      {priority === 'URGENT' ? '🔴 ' : priority === 'HIGH' ? '🟠 ' : ''}
      {PRIORITY_LABELS[priority]}
    </span>
  )
}
