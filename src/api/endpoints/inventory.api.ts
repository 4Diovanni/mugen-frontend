/**
 * Inventory API Endpoints
 * Sincronizado com: /inventory (InventoryController)
 */

import apiClient from '../client'
import type { ApiResponse } from '@types/index'
import type { InventoryItem } from '@types/game.types'

const BASE_PATH = '/inventory'

/**
 * GET /inventory/{characterId}
 * Get character inventory
 */
export async function getInventory(characterId: string) {
  const response = await apiClient.get<ApiResponse<InventoryItem[]>>(
    `${BASE_PATH}/${characterId}`
  )
  return response.data
}

/**
 * POST /inventory/add
 * Add item to inventory
 */
export async function addItemToInventory(data: {
  characterId: string
  itemId: number
  quantity: number
}) {
  const response = await apiClient.post<ApiResponse<InventoryItem>>(
    `${BASE_PATH}/add`,
    data
  )
  return response.data
}

/**
 * DELETE /inventory/{inventoryItemId}
 * Remove item from inventory
 */
export async function removeItemFromInventory(inventoryItemId: string) {
  const response = await apiClient.delete<ApiResponse<null>>(
    `${BASE_PATH}/${inventoryItemId}`
  )
  return response.data
}

/**
 * PUT /inventory/{inventoryItemId}/equip
 * Equip item
 */
export async function equipItem(inventoryItemId: string) {
  const response = await apiClient.put<ApiResponse<InventoryItem>>(
    `${BASE_PATH}/${inventoryItemId}/equip`
  )
  return response.data
}

/**
 * PUT /inventory/{inventoryItemId}/unequip
 * Unequip item
 */
export async function unequipItem(inventoryItemId: string) {
  const response = await apiClient.put<ApiResponse<InventoryItem>>(
    `${BASE_PATH}/${inventoryItemId}/unequip`
  )
  return response.data
}

/**
 * POST /inventory/{inventoryItemId}/use
 * Use consumable item
 */
export async function useItem(inventoryItemId: string) {
  const response = await apiClient.post<ApiResponse<InventoryItem>>(
    `${BASE_PATH}/${inventoryItemId}/use`
  )
  return response.data
}
