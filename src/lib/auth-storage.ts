'use client'

const ACCESS_KEY  = 'nm_access'
const REFRESH_KEY = 'nm_refresh'

export const AuthStorage = {
  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(ACCESS_KEY, accessToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
  },
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(ACCESS_KEY)
  },
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(REFRESH_KEY)
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
  },
  isLoggedIn(): boolean {
    return !!AuthStorage.getAccessToken()
  },
}
