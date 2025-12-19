/**
 * Characters API Endpoints
 * Sincronizado com: /characters (CharacterController)
 */

import apiClient from '../client'
import type { ApiResponse } from '@/@types'
import type {
  Character,
  CreateCharacterRequest,
  UpdateCharacterDTO,
  UpdateCharacterNameDTO,
  CharacterStats,
  CharacterSkill,
  CharacterTransformation,
  TPSummary,
  TPTransaction,
  LevelProgress,
  ExperienceInfo,
  ExperienceTable,
  AllocateAttributeRequest,
  AwardTPRequest,
  GainExpRequest,
  Transformation,
} from '@/@types/game.types'

const BASE_PATH = '/characters'

// ==================== CRUD BÁSICO ====================

/**
 * POST /characters
 * Criar novo personagem
 */
export async function createCharacter(data: CreateCharacterRequest) {
  const response = await apiClient.post<ApiResponse<Character>>(
    BASE_PATH,
    data
  )
  return response.data
}

/**
 * GET /characters/{id}
 * Get character details
 */
export async function getCharacter(id: string) {
  const response = await apiClient.get<ApiResponse<Character>>(
    `${BASE_PATH}/${id}`
  )
  return response.data
}

/**
 * PUT /characters/{id}
 * Update character
 */
export async function updateCharacter(
  id: string,
  data: UpdateCharacterDTO
) {
  const response = await apiClient.put<ApiResponse<Character>>(
    `${BASE_PATH}/${id}`,
    data
  )
  return response.data
}

/**
 * DELETE /characters/{id}
 * Delete character
 */
export async function deleteCharacter(id: string) {
  const response = await apiClient.delete<ApiResponse<null>>(
    `${BASE_PATH}/${id}`
  )
  return response.data
}

// ==================== LISTAGEM E CONSULTAS ====================

/**
 * GET /characters
 * List all characters with pagination
 */
export async function listCharacters(params?: {
  page?: number
  size?: number
  sortBy?: string
  sortDirection?: 'ASC' | 'DESC'
}) {
  const response = await apiClient.get<ApiResponse<any>>(
    BASE_PATH,
    { params }
  )
  return response.data
}

/**
 * GET /characters/owner/{ownerId}
 * List characters by owner
 */
export async function getCharactersByOwner(ownerId: string) {
  const response = await apiClient.get<ApiResponse<Character[]>>(
    `${BASE_PATH}/owner/${ownerId}`
  )
  return response.data
}

/**
 * GET /characters/owner/{ownerId}/paginated
 * List characters by owner with pagination
 */
export async function getCharactersByOwnerPaginated(
  ownerId: string,
  params?: {
    page?: number
    size?: number
    sortBy?: string
    sortDirection?: 'ASC' | 'DESC'
  }
) {
  const response = await apiClient.get<ApiResponse<any>>(
    `${BASE_PATH}/owner/${ownerId}/paginated`,
    { params }
  )
  return response.data
}

/**
 * GET /characters/owner/{ownerId}/count
 * Count characters by owner
 */
export async function countCharactersByOwner(ownerId: string) {
  const response = await apiClient.get<ApiResponse<number>>(
    `${BASE_PATH}/owner/${ownerId}/count`
  )
  return response.data
}

/**
 * GET /characters/{id}/exists
 * Check if character exists
 */
export async function characterExists(id: string) {
  const response = await apiClient.get<ApiResponse<boolean>>(
    `${BASE_PATH}/${id}/exists`
  )
  return response.data
}

// ==================== SUB-RECURSOS: TRANSFORMAÇÕES ====================

/**
 * GET /characters/{characterId}/transformations/available
 * Get available transformations to unlock
 */
export async function getAvailableTransformations(characterId: string) {
  const response = await apiClient.get<ApiResponse<Transformation[]>>(
    `${BASE_PATH}/${characterId}/transformations/available`
  )
  return response.data
}

/**
 * POST /characters/{characterId}/transformations/{transformationId}
 * Unlock transformation
 */
export async function unlockTransformation(
  characterId: string,
  transformationId: number
) {
  const response = await apiClient.post<ApiResponse<CharacterTransformation>>(
    `${BASE_PATH}/${characterId}/transformations/${transformationId}`
  )
  return response.data
}

/**
 * GET /characters/{characterId}/transformations
 * Get all transformations
 */
export async function getCharacterTransformations(characterId: string) {
  const response = await apiClient.get<ApiResponse<CharacterTransformation[]>>(
    `${BASE_PATH}/${characterId}/transformations`
  )
  return response.data
}

/**
 * GET /characters/{characterId}/transformations/unlocked
 * Get unlocked transformations only
 */
export async function getUnlockedTransformations(characterId: string) {
  const response = await apiClient.get<ApiResponse<CharacterTransformation[]>>(
    `${BASE_PATH}/${characterId}/transformations/unlocked`
  )
  return response.data
}

/**
 * GET /characters/{characterId}/transformations/{transformationId}/unlocked
 * Check if specific transformation is unlocked
 */
export async function hasUnlockedTransformation(
  characterId: string,
  transformationId: number
) {
  const response = await apiClient.get<ApiResponse<boolean>>(
    `${BASE_PATH}/${characterId}/transformations/${transformationId}/unlocked`
  )
  return response.data
}

// ==================== SUB-RECURSOS: SKILLS ====================

/**
 * POST /characters/{characterId}/skills/{skillId}
 * Add skill to character
 */
export async function addSkillToCharacter(
  characterId: string,
  skillId: number
) {
  const response = await apiClient.post<ApiResponse<CharacterSkill>>(
    `${BASE_PATH}/${characterId}/skills/${skillId}`
  )
  return response.data
}

/**
 * GET /characters/{characterId}/skills
 * Get character skills
 */
export async function getCharacterSkills(characterId: string) {
  const response = await apiClient.get<ApiResponse<CharacterSkill[]>>(
    `${BASE_PATH}/${characterId}/skills`
  )
  return response.data
}

/**
 * DELETE /characters/{characterId}/skills/{skillId}
 * Remove skill from character
 */
export async function removeSkillFromCharacter(
  characterId: string,
  skillId: number
) {
  const response = await apiClient.delete<ApiResponse<null>>(
    `${BASE_PATH}/${characterId}/skills/${skillId}`
  )
  return response.data
}

// ==================== STATS E ATRIBUTOS ====================

/**
 * GET /characters/{id}/stats
 * Calculate final character stats
 */
export async function getCharacterStats(id: string) {
  const response = await apiClient.get<ApiResponse<CharacterStats>>(
    `${BASE_PATH}/${id}/stats`
  )
  return response.data
}

/**
 * PATCH /characters/{id}/name
 * Update character name only
 */
export async function updateCharacterName(
  id: string,
  data: UpdateCharacterNameDTO
) {
  const response = await apiClient.patch<ApiResponse<Character>>(
    `${BASE_PATH}/${id}/name`,
    data
  )
  return response.data
}

/**
 * PATCH /characters/{id}/deactivate
 * Deactivate character (soft delete)
 */
export async function deactivateCharacter(id: string) {
  const response = await apiClient.patch<ApiResponse<Character>>(
    `${BASE_PATH}/${id}/deactivate`
  )
  return response.data
}

// ==================== TP SYSTEM ====================

/**
 * POST /characters/{id}/allocate-attribute
 * Allocate points to attribute (spend TP)
 */
export async function allocateAttribute(
  id: string,
  data: AllocateAttributeRequest
) {
  const response = await apiClient.post<ApiResponse<Character>>(
    `${BASE_PATH}/${id}/allocate-attribute`,
    data
  )
  return response.data
}

/**
 * POST /characters/{id}/award-tp
 * Award TP to character
 */
export async function awardTP(id: string, data: AwardTPRequest) {
  const response = await apiClient.post<ApiResponse<Character>>(
    `${BASE_PATH}/${id}/award-tp`,
    data
  )
  return response.data
}

/**
 * GET /characters/{id}/tp-summary
 * Get TP summary
 */
export async function getTPSummary(id: string) {
  const response = await apiClient.get<ApiResponse<TPSummary>>(
    `${BASE_PATH}/${id}/tp-summary`
  )
  return response.data
}

/**
 * GET /characters/{id}/tp-cost/{attributeName}/{points}
 * Calculate TP cost for attribute allocation
 */
export async function calculateTPCost(
  id: string,
  attributeName: string,
  points: number
) {
  const response = await apiClient.get<ApiResponse<number>>(
    `${BASE_PATH}/${id}/tp-cost/${attributeName}/${points}`
  )
  return response.data
}

/**
 * GET /characters/{id}/tp-history
 * Get TP transaction history
 */
export async function getTPHistory(id: string) {
  const response = await apiClient.get<ApiResponse<TPTransaction[]>>(
    `${BASE_PATH}/${id}/tp-history`
  )
  return response.data
}

// ==================== EXPERIENCE & LEVELING ====================

/**
 * POST /characters/{characterId}/gain-exp
 * Gain experience
 */
export async function gainExperience(
  characterId: string,
  data: GainExpRequest
) {
  const response = await apiClient.post<ApiResponse<Character>>(
    `${BASE_PATH}/${characterId}/gain-exp`,
    data
  )
  return response.data
}

/**
 * GET /characters/{characterId}/level-progress
 * Get level progress
 */
export async function getLevelProgress(characterId: string) {
  const response = await apiClient.get<ApiResponse<LevelProgress>>(
    `${BASE_PATH}/${characterId}/level-progress`
  )
  return response.data
}

/**
 * GET /characters/experience/exp-table
 * Get experience table
 */
export async function getExperienceTable(params?: {
  start?: number
  end?: number
}) {
  const response = await apiClient.get<ApiResponse<ExperienceTable[]>>(
    `${BASE_PATH}/experience/exp-table`,
    { params }
  )
  return response.data
}

/**
 * GET /characters/{characterId}/exp-info
 * Get complete experience info
 */
export async function getExperienceInfo(characterId: string) {
  const response = await apiClient.get<ApiResponse<ExperienceInfo>>(
    `${BASE_PATH}/${characterId}/exp-info`
  )
  return response.data
}

// ==================== ADMIN ====================

/**
 * PATCH /characters/{characterId}/set-level/{level}
 * [ADMIN] Set character level
 */
export async function setCharacterLevel(characterId: string, level: number) {
  const response = await apiClient.patch<ApiResponse<Character>>(
    `${BASE_PATH}/${characterId}/set-level/${level}`
  )
  return response.data
}

/**
 * PATCH /characters/{characterId}/reset-experience
 * [ADMIN] Reset experience and level to 1
 */
export async function resetExperience(characterId: string) {
  const response = await apiClient.patch<ApiResponse<Character>>(
    `${BASE_PATH}/${characterId}/reset-experience`
  )
  return response.data
}
