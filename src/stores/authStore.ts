import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthState } from '@/@types'

/**
 * Auth Store
 * Manages authentication state globally
 */
interface AuthStoreState extends AuthState {
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setIsAuthenticated: (authenticated: boolean) => void
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthStoreState>(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
