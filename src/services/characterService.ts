/**
 * Character Service
 * Business logic layer for character operations
 */

import {
  characterEndpoints,
  characterStatsEndpoints,
  characterSkillsEndpoints,
  characterTPEndpoints,
  characterExpEndpoints,
  characterTransformationEndpoints,
} from '@/api/endpoints/characters';
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

class CharacterService {
  /**
   * Get all characters (paginated)
   */
  async getAllCharacters(page = 0, size = 10, sortBy = 'name', sortDirection = 'ASC') {
    try {
      const response = await characterEndpoints.getAll(page, size, sortBy, sortDirection);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching characters:', error);
      throw error;
    }
  }

  /**
   * Get characters by owner/user
   */
  async getCharactersByOwner(ownerId: string, paginated = false) {
    try {
      const response = await characterEndpoints.getByOwner(ownerId, paginated);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching user characters:', error);
      throw error;
    }
  }

  /**
   * Get single character by ID
   */
  async getCharacterById(id: string): Promise<Character> {
    try {
      const response = await characterEndpoints.getById(id);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching character:', error);
      throw error;
    }
  }

  /**
   * Get character with full details including stats, skills, etc
   */
  async getCharacterDetail(id: string): Promise<CharacterDetail> {
    try {
      const response = await characterEndpoints.getDetail(id);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching character details:', error);
      throw error;
    }
  }

  /**
   * Create new character
   */
  async createCharacter(data: CreateCharacterRequest): Promise<Character> {
    try {
      const response = await characterEndpoints.create(data);
      console.log('✅ Character created:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating character:', error);
      throw error;
    }
  }

  /**
   * Update character
   */
  async updateCharacter(id: string, data: UpdateCharacterRequest): Promise<Character> {
    try {
      const response = await characterEndpoints.update(id, data);
      console.log('✅ Character updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating character:', error);
      throw error;
    }
  }

  /**
   * Delete character
   */
  async deleteCharacter(id: string): Promise<void> {
    try {
      await characterEndpoints.delete(id);
      console.log('✅ Character deleted');
    } catch (error) {
      console.error('❌ Error deleting character:', error);
      throw error;
    }
  }

  /**
   * Deactivate character (soft delete)
   */
  async deactivateCharacter(id: string): Promise<Character> {
    try {
      const response = await characterEndpoints.deactivate(id);
      console.log('✅ Character deactivated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error deactivating character:', error);
      throw error;
    }
  }

  /**
   * Update character name
   */
  async updateCharacterName(id: string, name: string): Promise<Character> {
    try {
      const response = await characterEndpoints.updateName(id, name);
      console.log('✅ Character name updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating character name:', error);
      throw error;
    }
  }
}

/**
 * Character Stats Service
 */
class CharacterStatsService {
  /**
   * Get calculated stats
   */
  async getStats(characterId: string): Promise<CharacterStats> {
    try {
      const response = await characterStatsEndpoints.getStats(characterId);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      throw error;
    }
  }

  /**
   * Get TP summary
   */
  async getTPSummary(characterId: string): Promise<TPSummary> {
    try {
      const response = await characterStatsEndpoints.getTPSummary(characterId);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching TP summary:', error);
      throw error;
    }
  }
}

/**
 * Character Skills Service
 */
class CharacterSkillsService {
  /**
   * Get all character skills
   */
  async getSkills(characterId: string): Promise<CharacterSkill[]> {
    try {
      const response = await characterSkillsEndpoints.getAll(characterId);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching character skills:', error);
      throw error;
    }
  }

  /**
   * Add skill to character
   */
  async addSkill(characterId: string, skillId: number): Promise<CharacterSkill> {
    try {
      const response = await characterSkillsEndpoints.add(characterId, skillId);
      console.log('✅ Skill added:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding skill:', error);
      throw error;
    }
  }

  /**
   * Remove skill from character
   */
  async removeSkill(characterId: string, skillId: number): Promise<void> {
    try {
      await characterSkillsEndpoints.remove(characterId, skillId);
      console.log('✅ Skill removed');
    } catch (error) {
      console.error('❌ Error removing skill:', error);
      throw error;
    }
  }
}

/**
 * Character TP Service
 */
class CharacterTPService {
  /**
   * Allocate TP to attribute
   */
  async allocateAttribute(
    characterId: string,
    data: AllocateAttributeRequest
  ): Promise<Character> {
    try {
      const response = await characterTPEndpoints.allocateAttribute(characterId, data);
      console.log('✅ TP allocated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error allocating TP:', error);
      throw error;
    }
  }

  /**
   * Calculate TP cost
   */
  async calculateTPCost(
    characterId: string,
    attributeName: string,
    points: number
  ): Promise<number> {
    try {
      const response = await characterTPEndpoints.calculateCost(
        characterId,
        attributeName,
        points
      );
      return response.data;
    } catch (error) {
      console.error('❌ Error calculating TP cost:', error);
      throw error;
    }
  }

  /**
   * Get TP transaction history
   */
  async getTPHistory(characterId: string): Promise<any[]> {
    try {
      const response = await characterTPEndpoints.getHistory(characterId);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching TP history:', error);
      throw error;
    }
  }
}

/**
 * Character Experience Service
 */
class CharacterExpService {
  /**
   * Gain experience
   */
  async gainExp(characterId: string, data: GainExpRequest): Promise<Character> {
    try {
      const response = await characterExpEndpoints.gainExp(characterId, data);
      console.log('✅ Experience gained:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error gaining experience:', error);
      throw error;
    }
  }

  /**
   * Get level progress
   */
  async getLevelProgress(characterId: string) {
    try {
      const response = await characterExpEndpoints.getLevelProgress(characterId);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching level progress:', error);
      throw error;
    }
  }

  /**
   * Get experience info
   */
  async getExpInfo(characterId: string) {
    try {
      const response = await characterExpEndpoints.getExpInfo(characterId);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching exp info:', error);
      throw error;
    }
  }
}

/**
 * Character Transformation Service
 */
class CharacterTransformationService {
  /**
   * Get available transformations
   */
  async getAvailableTransformations(characterId: string) {
    try {
      const response = await characterTransformationEndpoints.getAvailable(characterId);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching available transformations:', error);
      throw error;
    }
  }

  /**
   * Get all transformations
   */
  async getAllTransformations(characterId: string) {
    try {
      const response = await characterTransformationEndpoints.getAll(characterId);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching transformations:', error);
      throw error;
    }
  }

  /**
   * Get unlocked transformations
   */
  async getUnlockedTransformations(characterId: string) {
    try {
      const response = await characterTransformationEndpoints.getUnlocked(characterId);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching unlocked transformations:', error);
      throw error;
    }
  }

  /**
   * Unlock transformation
   */
  async unlockTransformation(characterId: string, transformationId: number) {
    try {
      const response = await characterTransformationEndpoints.unlock(
        characterId,
        transformationId
      );
      console.log('✅ Transformation unlocked:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error unlocking transformation:', error);
      throw error;
    }
  }
}

// Export service instances
export const characterService = new CharacterService();
export const characterStatsService = new CharacterStatsService();
export const characterSkillsService = new CharacterSkillsService();
export const characterTPService = new CharacterTPService();
export const characterExpService = new CharacterExpService();
export const characterTransformationService = new CharacterTransformationService();

// Export types
export type {
  Character,
  CharacterDetail,
  CharacterStats,
  TPSummary,
  CreateCharacterRequest,
  UpdateCharacterRequest,
};
