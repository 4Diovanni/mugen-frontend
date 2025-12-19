/**
 * stores/characterStore.ts
 * Character Store - manages character list and active character state
 * Uses Zustand + Persist middleware
 */

import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import type {
  Character,
  CharacterListItem,
  CreateCharacterDTO,
  UpdateCharacterDTO,
} from '@/@types';
import characterService from '@/services/characterService';

/**
 * Character Store State Interface
 */
interface CharacterStoreState {
  // State
  characters: CharacterListItem[];
  activeCharacter: Character | null;
  isLoading: boolean;
  error: string | null;
  lastFetch: number | null;

  // Actions
  setCharacters: (characters: CharacterListItem[]) => void;
  setActiveCharacter: (character: Character | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // API Actions
  fetchCharacters: () => Promise<void>;
  fetchCharacterById: (id: string) => Promise<void>;
  createCharacter: (dto: CreateCharacterDTO) => Promise<Character>;
  updateCharacter: (id: string, dto: UpdateCharacterDTO) => Promise<void>;
  deleteCharacter: (id: string) => Promise<void>;
  getCharacterCount: () => number;
}

/**
 * Type for persisted state
 */
type CharacterStorePersistedState = Pick<
  CharacterStoreState,
  'characters' | 'activeCharacter'
>;

/**
 * Character Store
 */
export const useCharacterStore = create<
  CharacterStoreState,
  [['zustand/persist', CharacterStorePersistedState]]
>(
  persist(
    (set, get) => ({
      // ========== INITIAL STATE ==========
      characters: [],
      activeCharacter: null,
      isLoading: false,
      error: null,
      lastFetch: null,

      // ========== BASIC ACTIONS ==========
      setCharacters: (characters: CharacterListItem[]) => {
        set({ characters });
      },

      setActiveCharacter: (character: Character | null) => {
        set({ activeCharacter: character });
      },

      setIsLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      // ========== API ACTIONS ==========
      /**
       * Fetch all characters for the current user
       */
      fetchCharacters: async () => {
        set({ isLoading: true, error: null });
        try {
          const characters = await characterService.getAllCharacters();
          set({
            characters,
            isLoading: false,
            lastFetch: Date.now(),
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to fetch characters';
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      /**
       * Fetch a specific character by ID and set as active
       */
      fetchCharacterById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const character = await characterService.getCharacterById(id);
          set({
            activeCharacter: character,
            isLoading: false,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to fetch character';
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      /**
       * Create a new character
       */
      createCharacter: async (dto: CreateCharacterDTO) => {
        set({ isLoading: true, error: null });
        try {
          const newCharacter = await characterService.createCharacter(dto);
          const { characters } = get();
          const characterItem: CharacterListItem = {
            id: newCharacter.id,
            name: newCharacter.name,
            level: newCharacter.level,
            race: newCharacter.race,
            tp: newCharacter.tp,
            isActive: newCharacter.isActive,
          };
          set({
            characters: [...characters, characterItem],
            activeCharacter: newCharacter,
            isLoading: false,
          });
          return newCharacter;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to create character';
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      /**
       * Update an existing character
       */
      updateCharacter: async (id: string, dto: UpdateCharacterDTO) => {
        set({ isLoading: true, error: null });
        try {
          const updatedCharacter = await characterService.updateCharacter(id, dto);
          const { characters } = get();
          const updatedList = characters.map((char) =>
            char.id === id
              ? {
                  ...char,
                  name: updatedCharacter.name,
                  level: updatedCharacter.level,
                  tp: updatedCharacter.tp,
                }
              : char
          );
          set({
            characters: updatedList,
            activeCharacter: updatedCharacter,
            isLoading: false,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to update character';
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      /**
       * Delete a character
       */
      deleteCharacter: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await characterService.deleteCharacter(id);
          const { characters, activeCharacter } = get();
          const updatedList = characters.filter((char) => char.id !== id);
          set({
            characters: updatedList,
            activeCharacter:
              activeCharacter?.id === id ? null : activeCharacter,
            isLoading: false,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to delete character';
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      /**
       * Get count of active characters
       */
      getCharacterCount: () => {
        const { characters } = get();
        return characters.filter((char) => char.isActive).length;
      },
    }),
    {
      name: 'character-store',
      partialize: (state) => ({
        characters: state.characters,
        activeCharacter: state.activeCharacter,
      }),
    } as PersistOptions<CharacterStoreState, CharacterStorePersistedState>
  )
);

export default useCharacterStore;
