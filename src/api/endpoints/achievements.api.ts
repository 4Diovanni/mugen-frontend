/**
 * Achievements API Endpoints
 */

import apiClient from '../client'
import type { ApiResponse } from '@/@types'
import type { Achievement } from '@/@types/game.types'

/**
 * GET /achievements
 * List all achievements
 */
export async function listAchievements() {
  const response = await apiClient.get<ApiResponse<Achievement[]>>(
    '/achievements'
  )
  return response.data
}

/**
 * GET /achievements/:id
 * Get achievement details
 */
export async function getAchievement(id: string) {
  const response = await apiClient.get<ApiResponse<Achievement>>(
    `/achievements/${id}`
  )
  return response.data
}

/**
 * POST /achievements (Master only)
 * Create new achievement
 */
export async function createAchievement(data: Omit<Achievement, 'id'>) {
  const response = await apiClient.post<ApiResponse<Achievement>>(
    '/achievements',
    data
  )
  return response.data
}

/**
 * PUT /achievements/:id (Master only)
 * Update achievement
 */
export async function updateAchievement(
  id: string,
  data: Partial<Achievement>
) {
  const response = await apiClient.put<ApiResponse<Achievement>>(
    `/achievements/${id}`,
    data
  )
  return response.data
}

/**
 * DELETE /achievements/:id (Master only)
 * Delete achievement
 */
export async function deleteAchievement(id: string) {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/achievements/${id}`
  )
  return response.data
}
