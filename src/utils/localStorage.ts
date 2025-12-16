/**
 * Local Storage Utilities
 */

const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
} as const

/**
 * Save token to localStorage
 */
export function saveToken(token: string): void {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token)
}

/**
 * Get token from localStorage
 */
export function getToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.TOKEN)
}

/**
 * Clear token from localStorage
 */
export function clearToken(): void {
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
}

/**
 * Save user to localStorage
 */
export function saveUser(user: any): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

/**
 * Get user from localStorage
 */
export function getUser(): any {
  const user = localStorage.getItem(STORAGE_KEYS.USER)
  return user ? JSON.parse(user) : null
}

/**
 * Clear user from localStorage
 */
export function clearUser(): void {
  localStorage.removeItem(STORAGE_KEYS.USER)
}

/**
 * Clear all stored data
 */
export function clearAll(): void {
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USER)
}

/**
 * Set theme preference
 */
export function setTheme(theme: 'light' | 'dark' | 'auto'): void {
  localStorage.setItem(STORAGE_KEYS.THEME, theme)
}

/**
 * Get theme preference
 */
export function getTheme(): 'light' | 'dark' | 'auto' {
  return (localStorage.getItem(STORAGE_KEYS.THEME) || 'auto') as any
}
