/**
 * Equipment API Endpoints
 * Sincronizado com: /weapons, /armor (WeaponController, ArmorController)
 */

import apiClient from '../client'
import type { ApiResponse } from '@types/index'
import type { Weapon, Armor } from '@types/game.types'

// ==================== WEAPONS ====================

/**
 * GET /weapons
 * List all weapons
 */
export async function listWeapons() {
  const response = await apiClient.get<ApiResponse<Weapon[]>>('/weapons')
  return response.data
}

/**
 * POST /weapons
 * Create weapon (Master only)
 */
export async function createWeapon(data: Omit<Weapon, 'id'>) {
  const response = await apiClient.post<ApiResponse<Weapon>>('/weapons', data)
  return response.data
}

/**
 * PUT /weapons/{id}
 * Update weapon (Master only)
 */
export async function updateWeapon(id: number, data: Partial<Weapon>) {
  const response = await apiClient.put<ApiResponse<Weapon>>(
    `/weapons/${id}`,
    data
  )
  return response.data
}

/**
 * DELETE /weapons/{id}
 * Delete weapon (Master only)
 */
export async function deleteWeapon(id: number) {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/weapons/${id}`
  )
  return response.data
}

// ==================== ARMOR ====================

/**
 * GET /armor
 * List all armor
 */
export async function listArmor() {
  const response = await apiClient.get<ApiResponse<Armor[]>>('/armor')
  return response.data
}

/**
 * POST /armor
 * Create armor (Master only)
 */
export async function createArmor(data: Omit<Armor, 'id'>) {
  const response = await apiClient.post<ApiResponse<Armor>>('/armor', data)
  return response.data
}

/**
 * PUT /armor/{id}
 * Update armor (Master only)
 */
export async function updateArmor(id: number, data: Partial<Armor>) {
  const response = await apiClient.put<ApiResponse<Armor>>(
    `/armor/${id}`,
    data
  )
  return response.data
}

/**
 * DELETE /armor/{id}
 * Delete armor (Master only)
 */
export async function deleteArmor(id: number) {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/armor/${id}`
  )
  return response.data
}
