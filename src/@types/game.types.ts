/**
 * Game Related Types
 * Sincronizado com backend: com.mugen.backend.entity
 */

export type ItemType = 'WEAPON' | 'ARMOR' | 'MATERIAL' | 'CONSUMABLE' | 'QUEST_ITEM'
export type ItemRarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'
export type CharacterClass = 'WARRIOR' | 'MAGE' | 'ARCHER' | 'ROGUE' | 'PALADIN'
export type AttributeName = 'STR' | 'DEX' | 'CON' | 'WIL' | 'MND' | 'SPI'

// ==================== CHARACTER ====================

export interface Character {
  id: string // UUID
  owner: User
  name: string
  class: CharacterClass
  level: number
  exp: number // current experience
  attributes: CharacterAttribute
  transformations: CharacterTransformation[]
  skills: CharacterSkill[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CharacterAttribute {
  str: number // Strength
  dex: number // Dexterity
  con: number // Constitution
  wil: number // Will
  mnd: number // Mind
  spi: number // Spirit
}

export interface CreateCharacterRequest {
  name: string
  class: CharacterClass
}

export interface UpdateCharacterDTO {
  name?: string
  level?: number
  exp?: number
  isActive?: boolean
}

export interface UpdateCharacterNameDTO {
  name: string
}

// ==================== CHARACTER STATS ====================

export interface CharacterStats {
  health: number
  maxHealth: number
  mana: number
  maxMana: number
  attackPower: number
  defensePower: number
  magicPower: number
  magicDefense: number
  speed: number
  evasion: number
}

export interface CharacterTransformation {
  id: string // UUID
  character: Character
  transformation: Transformation
  unlockedAt: string
}

export interface Transformation {
  id: number
  name: string
  description: string
  icon?: string
  requiredLevel: number
  bonusStats?: Record<string, number>
}

// ==================== SKILLS ====================

export interface CharacterSkill {
  id: string // UUID
  character: Character
  skill: Skill
  level: number
  lastUsedAt?: string
}

export interface Skill {
  id: number
  name: string
  description: string
  class: CharacterClass
  cooldown: number // em segundos
  manaCost: number
  damage?: number
  healing?: number
  icon?: string
}

// ==================== INVENTORY ====================

export interface InventoryItem {
  id: string // UUID
  character: Character
  item: Item
  quantity: number
  slot?: number
  isEquipped: boolean
  equippedAt?: string
}

export interface Item {
  id: number
  name: string
  description: string
  type: ItemType
  rarity: ItemRarity
  price: number
  icon?: string
  requirements?: ItemRequirements
}

export interface ItemRequirements {
  minLevel?: number
  requiredClass?: CharacterClass
  requiredStats?: Partial<CharacterAttribute>
}

export interface Weapon extends Item {
  damage: number
  weaponType: 'SWORD' | 'AXE' | 'DAGGER' | 'BOW' | 'STAFF' | 'GUN'
  attackSpeed: number
}

export interface Armor extends Item {
  defense: number
  magicDefense: number
  armorType: 'HEAD' | 'CHEST' | 'LEGS' | 'FEET' | 'HANDS'
}

// ==================== ACHIEVEMENTS ====================

export interface Achievement {
  id: number
  name: string
  description: string
  icon?: string
  points: number
  requirement?: string
  createdAt: string
}

export interface CharacterAchievement {
  id: string // UUID
  character: Character
  achievement: Achievement
  unlockedAt: string
}

// ==================== TP SYSTEM ====================

export interface TPSummary {
  characterId: string
  totalTP: number
  spentTP: number
  availableTP: number
  lastAwardedAt?: string
  transactionCount: number
}

export interface TPTransaction {
  id: string // UUID
  character: Character
  amount: number
  type: 'AWARD' | 'SPEND'
  reason: string
  createdAt: string
  createdBy?: string
}

export interface AllocateAttributeRequest {
  characterId: string // UUID
  attributeName: AttributeName
  points: number // 1-50
}

export interface AwardTPRequest {
  characterId: string // UUID
  amount: number
  reason: string
}

// ==================== EXPERIENCE ====================

export interface LevelProgress {
  currentLevel: number
  currentExp: number
  expForNextLevel: number
  progressPercentage: number
  isMaxLevel: boolean
}

export interface ExperienceInfo {
  level: number
  currentExp: number
  expForNextLevel: number
  progressPercentage: number
  totalExp: number
  isMaxLevel: boolean
  nextLevelIn: number
}

export interface ExperienceTable {
  level: number
  expRequired: number
  totalExp: number
}

export interface GainExpRequest {
  amount: number
  reason: string
}

// ==================== USER ====================

export interface User {
  id: string // UUID
  email: string
  name: string
  role: 'ROLE_PLAYER' | 'ROLE_MASTER' | 'ROLE_ADMIN'
  createdAt: string
  updatedAt: string
}
