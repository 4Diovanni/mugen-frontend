/**
 * Character Service
 * Handles character-related logic
 */

import * as charactersApi from '@api/endpoints/characters.api'
import { useCharacterStore } from '@stores/characterStore'
import type { CreateCharacterRequest } from '@types/game.types'

export class CharacterService {
  /**
   * Load characters
   */
  static async loadCharacters() {
    const response = await charactersApi.listCharacters()
    const characterStore = useCharacterStore.getState()
    characterStore.setCharacters(response.data)
    return response.data
  }

  /**
   * Get character by ID
   */
  static async getCharacter(id: string) {
    const response = await charactersApi.getCharacter(id)
    const characterStore = useCharacterStore.getState()
    characterStore.setCurrentCharacter(response.data)
    return response.data
  }

  /**
   * Create new character
   */
  static async createCharacter(data: CreateCharacterRequest) {
    const response = await charactersApi.createCharacter(data)
    const characterStore = useCharacterStore.getState()
    characterStore.addCharacter(response.data)
    return response.data
  }

  /**
   * Update character
   */
  static async updateCharacter(id: string, data: any) {
    const response = await charactersApi.updateCharacter(id, data)
    const characterStore = useCharacterStore.getState()
    characterStore.updateCharacter(response.data)
    return response.data
  }

  /**
   * Delete character
   */
  static async deleteCharacter(id: string) {
    await charactersApi.deleteCharacter(id)
    const characterStore = useCharacterStore.getState()
    characterStore.removeCharacter(id)
  }
}
