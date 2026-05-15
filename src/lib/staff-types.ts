export type RequestStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type RequestCategory = 'CLEANING' | 'FOOD' | 'INFO' | 'TECHNICAL' | 'OTHER'
export type RequestPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'

export interface ServiceRequest {
  id: string
  category: RequestCategory
  priority: RequestPriority
  status: RequestStatus
  payload: Record<string, unknown>
  staffNote: string | null
  createdAt: string
  updatedAt: string
  room: { roomNumber: string; floor: number | null }
  assignedTo: { id: string; name: string } | null
}

export interface StaffTokens {
  accessToken: string
  refreshToken: string
}

// ───────── UI helpers ─────────

export const CATEGORY_LABELS: Record<RequestCategory, string> = {
  CLEANING:  'Zimmerreinigung',
  FOOD:      'Room Service',
  INFO:      'Information',
  TECHNICAL: 'Technisches Problem',
  OTHER:     'Sonstiges',
}

export const STATUS_LABELS: Record<RequestStatus, string> = {
  PENDING:     'Neu',
  IN_PROGRESS: 'In Bearbeitung',
  COMPLETED:   'Erledigt',
  CANCELLED:   'Abgebrochen',
}

export const PRIORITY_LABELS: Record<RequestPriority, string> = {
  LOW:    'Niedrig',
  NORMAL: 'Normal',
  HIGH:   'Hoch',
  URGENT: 'Dringend',
}
