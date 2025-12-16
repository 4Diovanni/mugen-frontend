import { create } from 'zustand'

/**
 * Game Store
 * Manages global game state
 */
interface GameStoreState {
  isLoading: boolean
  error: string | null
  selectedTab: string

  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSelectedTab: (tab: string) => void
  clearError: () => void
}

export const useGameStore = create<GameStoreState>((set) => ({
  isLoading: false,
  error: null,
  selectedTab: 'dashboard',

  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSelectedTab: (selectedTab) => set({ selectedTab }),
  clearError: () => set({ error: null }),
}))
