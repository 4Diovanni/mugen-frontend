import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
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

/**
 * State that will be persisted
 */
type AuthStorePersistedState = Pick<
    AuthStoreState,
    'user' | 'token' | 'isAuthenticated'
>
export const useAuthStore = create<
    AuthStoreState,
    [['zustand/persist', AuthStorePersistedState]]
>(
    persist(
        (set) => ({
// ===== State =====
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

// ===== Actions =====
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            setIsLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),
            setIsAuthenticated: (isAuthenticated) =>
                set({ isAuthenticated }),
            clearError: () => set({ error: null }),
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
        }),
        {
            name: 'auth-store',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        } as PersistOptions<AuthStoreState, AuthStorePersistedState>
    )
)