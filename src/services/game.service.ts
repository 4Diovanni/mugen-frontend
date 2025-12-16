/**
 * Game Service
 * Handles game logic (achievements, minigames, etc)
 */

import * as achievementsApi from '@api/endpoints/achievements.api'
import * as gamesApi from '@api/endpoints/games.api'

export class GameService {
  /**
   * List achievements
   */
  static async listAchievements() {
    const response = await achievementsApi.listAchievements()
    return response.data
  }

  /**
   * Get achievement
   */
  static async getAchievement(id: string) {
    const response = await achievementsApi.getAchievement(id)
    return response.data
  }

  /**
   * List minigames
   */
  static async listMinigames() {
    const response = await gamesApi.listMinigames()
    return response.data
  }

  /**
   * Get minigame
   */
  static async getMinigame(id: string) {
    const response = await gamesApi.getMinigame(id)
    return response.data
  }

  /**
   * Play minigame
   */
  static async playMinigame(
    minigameId: string,
    characterId: string,
    score: number
  ) {
    const response = await gamesApi.playMinigame(minigameId, characterId, score)
    return response.data
  }
}
