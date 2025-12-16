/**
 * Character Service
 * Sincronizado com CharacterController
 */

import * as charactersApi from '@api/endpoints/characters.api'
import * as inventoryApi from '@api/endpoints/inventory.api'
import { useCharacterStore } from '@stores/characterStore'
import type { CreateCharacterRequest, Character, AllocateAttributeRequest } from '@types/game.types'

export class CharacterService {
  /**
   * Load characters for current user
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

  /**
   * Update character name
   */
  static async updateCharacterName(id: string, name: string) {
    const response = await charactersApi.updateCharacterName(id, { name })
    const characterStore = useCharacterStore.getState()
    characterStore.updateCharacter(response.data)
    return response.data
  }

  /**
   * Deactivate character (soft delete)
   */
  static async deactivateCharacter(id: string) {
    const response = await charactersApi.deactivateCharacter(id)
    const characterStore = useCharacterStore.getState()
    characterStore.updateCharacter(response.data)
    return response.data
  }

  /**
   * Get character stats
   */
  static async getCharacterStats(id: string) {
    const response = await charactersApi.getCharacterStats(id)
    return response.data
  }

  /**
   * Get character inventory
   */
  static async getInventory(characterId: string) {
    const response = await inventoryApi.getInventory(characterId)
    return response.data
  }

  /**
   * Allocate TP to attribute
   */
  static async allocateTP(characterId: string, request: AllocateAttributeRequest) {
    const response = await charactersApi.allocateAttribute(
      characterId,
      request
    )
    const characterStore = useCharacterStore.getState()
    characterStore.updateCharacter(response.data)
    return response.data
  }

  /**
   * Get TP summary
   */
  static async getTPSummary(characterId: string) {
    const response = await charactersApi.getTPSummary(characterId)
    return response.data
  }

  /**
   * Get TP history
   */
  static async getTPHistory(characterId: string) {
    const response = await charactersApi.getTPHistory(characterId)
    return response.data
  }

  /**
   * Get level progress
   */
  static async getLevelProgress(characterId: string) {
    const response = await charactersApi.getLevelProgress(characterId)
    return response.data
  }

  /**
   * Gain experience
   */
  static async gainExperience(characterId: string, amount: number, reason: string) {
    const response = await charactersApi.gainExperience(
      characterId,
      { amount, reason }
    )
    const characterStore = useCharacterStore.getState()
    characterStore.updateCharacter(response.data)
    return response.data
  }

  /**
   * Get experience info
   */
  static async getExperienceInfo(characterId: string) {
    const response = await charactersApi.getExperienceInfo(characterId)
    return response.data
  }

  /**
   * Get character transformations
   */
  static async getTransformations(characterId: string) {
    const response = await charactersApi.getCharacterTransformations(characterId)
    return response.data
  }

  /**
   * Get unlocked transformations
   */
  static async getUnlockedTransformations(characterId: string) {
    const response = await charactersApi.getUnlockedTransformations(characterId)
    return response.data
  }

  /**
   * Get available transformations to unlock
   */
  static async getAvailableTransformations(characterId: string) {
    const response = await charactersApi.getAvailableTransformations(characterId)
    return response.data
  }

  /**
   * Unlock transformation
   */
  static async unlockTransformation(characterId: string, transformationId: number) {
    const response = await charactersApi.unlockTransformation(
      characterId,
      transformationId
    )
    return response.data
  }

  /**
   * Get character skills
   */
  static async getCharacterSkills(characterId: string) {
    const response = await charactersApi.getCharacterSkills(characterId)
    return response.data
  }

  /**
   * Add skill to character
   */
  static async addSkill(characterId: string, skillId: number) {
    const response = await charactersApi.addSkillToCharacter(
      characterId,
      skillId
    )
    return response.data
  }

  /**
   * Remove skill from character
   */
  static async removeSkill(characterId: string, skillId: number) {
    await charactersApi.removeSkillFromCharacter(characterId, skillId)
  }
}
