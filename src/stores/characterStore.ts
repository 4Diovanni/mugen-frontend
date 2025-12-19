import { create } from 'zustand'
import type { Character } from '@/@types/game.types'

/**
 * Character Store
 * Manages character state globally
 */
interface CharacterStoreState {
  characters: Character[]
  currentCharacter: Character | null
  isLoading: boolean
  error: string | null

  setCharacters: (characters: Character[]) => void
  setCurrentCharacter: (character: Character | null) => void
  addCharacter: (character: Character) => void
  updateCharacter: (character: Character) => void
  removeCharacter: (characterId: string) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useCharacterStore = create<CharacterStoreState>((set) => ({
  characters: [],
  currentCharacter: null,
  isLoading: false,
  error: null,

  setCharacters: (characters) => set({ characters }),
  setCurrentCharacter: (currentCharacter) => set({ currentCharacter }),

  addCharacter: (character) =>
    set((state) => ({
      characters: [...state.characters, character],
    })),

  updateCharacter: (updatedCharacter) =>
    set((state) => ({
      characters: state.characters.map((c) =>
        c.id === updatedCharacter.id ? updatedCharacter : c
      ),
      currentCharacter:
        state.currentCharacter?.id === updatedCharacter.id
          ? updatedCharacter
          : state.currentCharacter,
    })),

  removeCharacter: (characterId) =>
    set((state) => ({
      characters: state.characters.filter((c) => c.id !== characterId),
      currentCharacter:
        state.currentCharacter?.id === characterId
          ? null
          : state.currentCharacter,
    })),

  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))
