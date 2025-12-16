/**
 * Minigames API Endpoints
 */

import apiClient from '../client'
import type { ApiResponse } from '@types/index'
import type { Minigame, MinigameResult } from '@types/game.types'

/**
 * GET /minigames
 * List all available minigames
 */
export async function listMinigames() {
  const response = await apiClient.get<ApiResponse<Minigame[]>>('/minigames')
  return response.data
}

/**
 * GET /minigames/:id
 * Get minigame details
 */
export async function getMinigame(id: string) {
  const response = await apiClient.get<ApiResponse<Minigame>>(
    `/minigames/${id}`
  )
  return response.data
}

/**
 * POST /minigames/:id/play
 * Start playing minigame
 */
export async function playMinigame(
  minigameId: string,
  characterId: string,
  score: number
) {
  const response = await apiClient.post<ApiResponse<MinigameResult>>(
    `/minigames/${minigameId}/play`,
    { characterId, score }
  )
  return response.data
}

/**
 * GET /minigames/:id/results
 * Get minigame results history
 */
export async function getMinigameResults(minigameId: string) {
  const response = await apiClient.get<ApiResponse<MinigameResult[]>>(
    `/minigames/${minigameId}/results`
  )
  return response.data
}
