/**
 * Skills API Endpoints
 * Sincronizado com: /skills (SkillController)
 */

import apiClient from '../client'
import type { ApiResponse } from '@types/index'
import type { Skill } from '@types/game.types'

const BASE_PATH = '/skills'

/**
 * GET /skills
 * List all skills
 */
export async function listSkills() {
  const response = await apiClient.get<ApiResponse<Skill[]>>(BASE_PATH)
  return response.data
}

/**
 * POST /skills
 * Create skill (Master only)
 */
export async function createSkill(data: Omit<Skill, 'id'>) {
  const response = await apiClient.post<ApiResponse<Skill>>(BASE_PATH, data)
  return response.data
}

/**
 * PUT /skills/{id}
 * Update skill (Master only)
 */
export async function updateSkill(id: number, data: Partial<Skill>) {
  const response = await apiClient.put<ApiResponse<Skill>>(
    `${BASE_PATH}/${id}`,
    data
  )
  return response.data
}

/**
 * DELETE /skills/{id}
 * Delete skill (Master only)
 */
export async function deleteSkill(id: number) {
  const response = await apiClient.delete<ApiResponse<null>>(
    `${BASE_PATH}/${id}`
  )
  return response.data
}
