/**
 * Game Related Types
 * Characters, Inventory, Achievements, etc
 */

import type { UserRole } from './index.ts'

export type ItemType = 'WEAPON' | 'ARMOR' | 'MATERIAL' | 'CONSUMABLE' | 'QUEST_ITEM'
export type ItemRarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'
export type CharacterClass = 'WARRIOR' | 'MAGE' | 'ARCHER' | 'ROGUE' | 'PALADIN'

// Character
export interface Character {
  id: string
  userId: string
  name: string
  class: CharacterClass
  level: number
  experience: number
  health: number
  maxHealth: number
  mana: number
  maxMana: number
  strength: number
  intelligence: number
  dexterity: number
  constitution: number
  wisdom: number
  charisma: number
  gold: number
  skillPoints: number
  createdAt: string
  updatedAt: string
}

export interface CreateCharacterRequest {
  name: string
  class: CharacterClass
}

export interface UpdateCharacterRequest {
  name?: string
  level?: number
  experience?: number
  health?: number
  gold?: number
  skillPoints?: number
}

// Inventory
export interface InventoryItem {
  id: string
  characterId: string
  itemId: string
  quantity: number
  slot?: number
  isEquipped: boolean
  createdAt: string
}

export interface Item {
  id: string
  name: string
  description: string
  type: ItemType
  rarity: ItemRarity
  price: number
  icon?: string
  attributes?: {
    damage?: number
    defense?: number
    magicDefense?: number
    healthBoost?: number
    manaBoost?: number
  }
}

export interface Weapon extends Item {
  damage: number
  weaponType: 'SWORD' | 'AXE' | 'DAGGER' | 'BOW' | 'STAFF'
}

export interface Armor extends Item {
  defense: number
  magicDefense: number
  armorType: 'HEAD' | 'CHEST' | 'LEGS' | 'FEET' | 'HANDS'
}

// Achievement
export interface Achievement {
  id: string
  name: string
  description: string
  icon?: string
  points: number
  unlockedAt?: string
  requirement?: string
}

export interface CharacterAchievement {
  id: string
  characterId: string
  achievementId: string
  unlockedAt: string
}

// Minigame
export interface Minigame {
  id: string
  name: string
  description: string
  type: 'PUZZLE' | 'BATTLE' | 'RACE' | 'MEMORY' | 'SKILL'
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  maxAttempts: number
  rewardGold: number
  rewardExperience: number
}

export interface MinigameResult {
  id: string
  characterId: string
  minigameId: string
  score: number
  won: boolean
  goldEarned: number
  experienceEarned: number
  completedAt: string
}

// Skill
export interface Skill {
  id: string
  name: string
  description: string
  class: CharacterClass
  cooldown: number
  manaCost: number
  damage?: number
  healing?: number
}

export interface CharacterSkill {
  id: string
  characterId: string
  skillId: string
  level: number
  lastUsedAt?: string
}
