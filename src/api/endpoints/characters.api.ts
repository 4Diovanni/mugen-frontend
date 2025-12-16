/**
 * Characters API Endpoints
 */

import apiClient from '../client'
import type { ApiResponse, PaginationParams } from '@types/index'
import type { Character, CreateCharacterRequest, UpdateCharacterRequest } from '@types/game.types'

/**
 * GET /characters
 * List all characters for current user
 */
export async function listCharacters(params?: PaginationParams) {
  const response = await apiClient.get<ApiResponse<Character[]>>('/characters', {
    params,
  })
  return response.data
}

/**
 * GET /characters/:id
 * Get character details
 */
export async function getCharacter(id: string) {
  const response = await apiClient.get<ApiResponse<Character>>(
    `/characters/${id}`
  )
  return response.data
}

/**
 * POST /characters
 * Create new character
 */
export async function createCharacter(data: CreateCharacterRequest) {
  const response = await apiClient.post<ApiResponse<Character>>(
    '/characters',
    data
  )
  return response.data
}

/**
 * PUT /characters/:id
 * Update character
 */
export async function updateCharacter(
  id: string,
  data: UpdateCharacterRequest
) {
  const response = await apiClient.put<ApiResponse<Character>>(
    `/characters/${id}`,
    data
  )
  return response.data
}

/**
 * DELETE /characters/:id
 * Delete character
 */
export async function deleteCharacter(id: string) {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/characters/${id}`
  )
  return response.data
}

/**
 * GET /characters/:id/inventory
 * Get character inventory
 */
export async function getCharacterInventory(characterId: string) {
  const response = await apiClient.get(
    `/characters/${characterId}/inventory`
  )
  return response.data
}

/**
 * GET /characters/:id/achievements
 * Get character achievements
 */
export async function getCharacterAchievements(characterId: string) {
  const response = await apiClient.get(
    `/characters/${characterId}/achievements`
  )
  return response.data
}
