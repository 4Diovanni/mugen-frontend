/**
 * Character API Endpoints
 * CRUD operations for characters and related data
 */

import apiClient from '../client';
import {
  Character,
  CharacterDetail,
  CharacterStats,
  TPSummary,
  CreateCharacterRequest,
  UpdateCharacterRequest,
  CharacterSkill,
  AllocateAttributeRequest,
  GainExpRequest,
} from '@/@types/character';

const BASE = '/characters';

/**
 * Character CRUD Operations
 */
export const characterEndpoints = {
  /**
   * Get all characters (paginated)
   */
  getAll: (page = 0, size = 10, sortBy = 'name', sortDirection = 'ASC') =>
    apiClient.get<{ content: Character[]; totalElements: number }>(
      `${BASE}?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    ),

  /**
   * Get characters by owner (user)
   */
  getByOwner: (ownerId: string, paginated = false) =>
    paginated
      ? apiClient.get<{ content: Character[]; totalElements: number }>(
          `${BASE}/owner/${ownerId}/paginated`
        )
      : apiClient.get<Character[]>(`${BASE}/owner/${ownerId}`),

  /**
   * Get single character by ID
   */
  getById: (id: string) => apiClient.get<Character>(`${BASE}/${id}`),

  /**
   * Get character with full details
   */
  getDetail: (id: string) => apiClient.get<CharacterDetail>(`${BASE}/${id}`),

  /**
   * Create new character
   */
  create: (data: CreateCharacterRequest) =>
    apiClient.post<Character>(`${BASE}`, data),

  /**
   * Update character
   */
  update: (id: string, data: UpdateCharacterRequest) =>
    apiClient.put<Character>(`${BASE}/${id}`, data),

  /**
   * Delete character
   */
  delete: (id: string) => apiClient.delete<void>(`${BASE}/${id}`),

  /**
   * Deactivate character (soft delete)
   */
  deactivate: (id: string) =>
    apiClient.patch<Character>(`${BASE}/${id}/deactivate`, {}),

  /**
   * Update character name
   */
  updateName: (id: string, name: string) =>
    apiClient.patch<Character>(`${BASE}/${id}/name`, { name }),
};

/**
 * Character Stats
 */
export const characterStatsEndpoints = {
  /**
   * Get calculated stats for character
   */
  getStats: (characterId: string) =>
    apiClient.get<CharacterStats>(`${BASE}/${characterId}/stats`),

  /**
   * Get TP summary
   */
  getTPSummary: (characterId: string) =>
    apiClient.get<TPSummary>(`${BASE}/${characterId}/tp-summary`),
};

/**
 * Character Skills
 */
export const characterSkillsEndpoints = {
  /**
   * Get all skills of character
   */
  getAll: (characterId: string) =>
    apiClient.get<CharacterSkill[]>(`${BASE}/${characterId}/skills`),

  /**
   * Add skill to character
   */
  add: (characterId: string, skillId: number) =>
    apiClient.post<CharacterSkill>(
      `${BASE}/${characterId}/skills/${skillId}`,
      {}
    ),

  /**
   * Remove skill from character
   */
  remove: (characterId: string, skillId: number) =>
    apiClient.delete<void>(`${BASE}/${characterId}/skills/${skillId}`),
};

/**
 * Character TP System
 */
export const characterTPEndpoints = {
  /**
   * Allocate TP to attribute
   */
  allocateAttribute: (characterId: string, data: AllocateAttributeRequest) =>
    apiClient.post<Character>(
      `${BASE}/${characterId}/allocate-attribute`,
      data
    ),

  /**
   * Calculate TP cost for attribute points
   */
  calculateCost: (
    characterId: string,
    attributeName: string,
    points: number
  ) => apiClient.get<number>(`${BASE}/${characterId}/tp-cost/${attributeName}/${points}`),

  /**
   * Get TP transaction history
   */
  getHistory: (characterId: string) =>
    apiClient.get<any[]>(`${BASE}/${characterId}/tp-history`),
};

/**
 * Character Experience
 */
export const characterExpEndpoints = {
  /**
   * Gain experience
   */
  gainExp: (characterId: string, data: GainExpRequest) =>
    apiClient.post<Character>(
      `${BASE}/${characterId}/gain-exp`,
      data
    ),

  /**
   * Get level progress
   */
  getLevelProgress: (characterId: string) =>
    apiClient.get<{
      level: number;
      currentExp: number;
      expForNextLevel: number;
      progressPercentage: number;
      isMaxLevel: boolean;
    }>(`${BASE}/${characterId}/level-progress`),

  /**
   * Get experience info
   */
  getExpInfo: (characterId: string) =>
    apiClient.get<any>(`${BASE}/${characterId}/exp-info`),
};

/**
 * Character Transformations
 */
export const characterTransformationEndpoints = {
  /**
   * Get available transformations
   */
  getAvailable: (characterId: string) =>
    apiClient.get<any[]>(`${BASE}/${characterId}/transformations/available`),

  /**
   * Get all transformations
   */
  getAll: (characterId: string) =>
    apiClient.get<any[]>(`${BASE}/${characterId}/transformations`),

  /**
   * Get unlocked transformations only
   */
  getUnlocked: (characterId: string) =>
    apiClient.get<any[]>(`${BASE}/${characterId}/transformations/unlocked`),

  /**
   * Unlock transformation
   */
  unlock: (characterId: string, transformationId: number) =>
    apiClient.post<any>(
      `${BASE}/${characterId}/transformations/${transformationId}`,
      {}
    ),

  /**
   * Check if transformation is unlocked
   */
  isUnlocked: (characterId: string, transformationId: number) =>
    apiClient.get<boolean>(
      `${BASE}/${characterId}/transformations/${transformationId}/unlocked`
    ),
};
