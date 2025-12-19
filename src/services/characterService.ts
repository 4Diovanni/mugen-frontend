/**
 * services/characterService.ts
 * Character API service - handles all character-related API calls
 */

import type {
  Character,
  CharacterListItem,
  CreateCharacterDTO,
  UpdateCharacterDTO,
  CharacterAttributes,
  UpdateCharacterAttributesDTO,
  ApiResponse,
  PaginatedResponse,
} from '@/@types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

/**
 * Get axios instance with auth token
 */
function getHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/**
 * Character Service
 */
export const characterService = {
  /**
   * Get all characters for the authenticated user
   */
  async getAllCharacters(): Promise<CharacterListItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/characters`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.statusText}`);
      }

      const data: ApiResponse<CharacterListItem[]> = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  },

  /**
   * Get character details by ID
   */
  async getCharacterById(id: string): Promise<Character> {
    try {
      const response = await fetch(`${API_BASE_URL}/characters/${id}`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch character: ${response.statusText}`);
      }

      const data: ApiResponse<Character> = await response.json();
      if (!data.data) {
        throw new Error('Character not found');
      }
      return data.data;
    } catch (error) {
      console.error('Error fetching character:', error);
      throw error;
    }
  },

  /**
   * Create a new character
   */
  async createCharacter(dto: CreateCharacterDTO): Promise<Character> {
    try {
      const response = await fetch(`${API_BASE_URL}/characters`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(dto),
      });

      if (!response.ok) {
        throw new Error(`Failed to create character: ${response.statusText}`);
      }

      const data: ApiResponse<Character> = await response.json();
      if (!data.data) {
        throw new Error('Failed to create character');
      }
      return data.data;
    } catch (error) {
      console.error('Error creating character:', error);
      throw error;
    }
  },

  /**
   * Update character details
   */
  async updateCharacter(
    id: string,
    dto: UpdateCharacterDTO
  ): Promise<Character> {
    try {
      const response = await fetch(`${API_BASE_URL}/characters/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(dto),
      });

      if (!response.ok) {
        throw new Error(`Failed to update character: ${response.statusText}`);
      }

      const data: ApiResponse<Character> = await response.json();
      if (!data.data) {
        throw new Error('Failed to update character');
      }
      return data.data;
    } catch (error) {
      console.error('Error updating character:', error);
      throw error;
    }
  },

  /**
   * Update only character name
   */
  async updateCharacterName(id: string, name: string): Promise<Character> {
    try {
      const response = await fetch(`${API_BASE_URL}/characters/${id}/name`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update character name: ${response.statusText}`);
      }

      const data: ApiResponse<Character> = await response.json();
      if (!data.data) {
        throw new Error('Failed to update character name');
      }
      return data.data;
    } catch (error) {
      console.error('Error updating character name:', error);
      throw error;
    }
  },

  /**
   * Delete character by ID
   */
  async deleteCharacter(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/characters/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete character: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting character:', error);
      throw error;
    }
  },

  /**
   * Get count of active characters
   */
  async getCharacterCount(): Promise<number> {
    try {
      const response = await fetch(`${API_BASE_URL}/characters/count`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch character count: ${response.statusText}`);
      }

      const data: ApiResponse<{ count: number }> = await response.json();
      return data.data?.count || 0;
    } catch (error) {
      console.error('Error fetching character count:', error);
      throw error;
    }
  },

  /**
   * Get character attributes/stats
   */
  async getCharacterAttributes(
    id: string
  ): Promise<CharacterAttributes> {
    try {
      const response = await fetch(`${API_BASE_URL}/characters/${id}/attributes`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch character attributes: ${response.statusText}`
        );
      }

      const data: ApiResponse<CharacterAttributes> = await response.json();
      if (!data.data) {
        throw new Error('Character attributes not found');
      }
      return data.data;
    } catch (error) {
      console.error('Error fetching character attributes:', error);
      throw error;
    }
  },

  /**
   * Update character attributes/stats
   */
  async updateCharacterAttributes(
    id: string,
    dto: UpdateCharacterAttributesDTO
  ): Promise<CharacterAttributes> {
    try {
      const response = await fetch(`${API_BASE_URL}/characters/${id}/attributes`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(dto),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update character attributes: ${response.statusText}`
        );
      }

      const data: ApiResponse<CharacterAttributes> = await response.json();
      if (!data.data) {
        throw new Error('Failed to update character attributes');
      }
      return data.data;
    } catch (error) {
      console.error('Error updating character attributes:', error);
      throw error;
    }
  },
};

export default characterService;
