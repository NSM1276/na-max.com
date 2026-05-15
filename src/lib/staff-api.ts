import { AuthStorage } from './auth-storage'
import type { ServiceRequest, StaffTokens } from './staff-types'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/v1'

// ─────────────────────────────────────────────
// Core fetch wrapper — handles 401 + auto-refresh
// ─────────────────────────────────────────────

async function apiFetch<T>(path: string, init?: RequestInit, retry = true): Promise<T> {
  const token = AuthStorage.getAccessToken()

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })

  // Access token истёк — пробуем обновить
  if (res.status === 401 && retry) {
    const refreshed = await tryRefresh()
    if (!refreshed) {
      AuthStorage.clear()
      window.location.href = '/staff/login'
      throw new Error('Session expired')
    }
    return apiFetch<T>(path, init, false)
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { message?: string }).message ?? `HTTP ${res.status}`)
  }

  return res.json() as Promise<T>
}

async function tryRefresh(): Promise<boolean> {
  const refreshToken = AuthStorage.getRefreshToken()
  if (!refreshToken) return false

  const res = await fetch(`${BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })

  if (!res.ok) return false

  const { accessToken } = (await res.json()) as { accessToken: string }
  AuthStorage.setTokens(accessToken, refreshToken)
  return true
}

// ─────────────────────────────────────────────
// Public API surface
// ─────────────────────────────────────────────

export const staffApi = {
  login(email: string, password: string) {
    return apiFetch<StaffTokens>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  // SWR-совместимый fetcher — ключ = строка URL-пути
  fetchRequests(path: string) {
    return apiFetch<ServiceRequest[]>(path)
  },

  updateStatus(id: string, status: string, staffNote?: string) {
    return apiFetch<ServiceRequest>(`/staff/requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, ...(staffNote ? { staffNote } : {}) }),
    })
  },
}
