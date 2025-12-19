/**
 * Character Types - Mugen RPG
 * Interface with backend character models
 */

export interface CharacterAttributes {
  str: number;
  dex: number;
  con: number;
  wil: number;
  mnd: number;
  spi: number;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  level: number;
  exp: number;
  currentHP: number;
  maxHP: number;
  currentTP: number;
  maxTP: number;
  attributes: CharacterAttributes;
  owner?: {
    id: string;
    displayName?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CharacterStats {
  attack: number;
  defense: number;
  speed: number;
  accuracy: number;
  evasion: number;
  criticalChance: number;
}

export interface CharacterDetail extends Character {
  stats: CharacterStats;
  skills: CharacterSkill[];
  equipment: EquipmentSlot[];
  transformations?: CharacterTransformation[];
}

export interface CharacterSkill {
  skillId: number;
  skillName: string;
  level: number;
  cooldown: number;
}

export interface CharacterTransformation {
  transformationId: number;
  transformationName: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface EquipmentSlot {
  slot: 'HEAD' | 'BODY' | 'HANDS' | 'LEGS' | 'FEET' | 'MAIN_HAND' | 'OFF_HAND';
  itemId?: number;
  itemName?: string;
  rarity?: string;
}

export interface TPSummary {
  currentTP: number;
  maxTP: number;
  tpPercentage: number;
  lastTPGain?: string;
  lastTPSpend?: string;
}

export interface CreateCharacterRequest {
  name: string;
  race: string;
  attributes?: CharacterAttributes;
}

export interface UpdateCharacterRequest {
  name?: string;
  currentHP?: number;
}

export interface CharacterLevel {
  level: number;
  currentExp: number;
  expForNextLevel: number;
  progressPercentage: number;
  isMaxLevel: boolean;
}

export interface AllocateAttributeRequest {
  attributeName: 'STR' | 'DEX' | 'CON' | 'WIL' | 'MND' | 'SPI';
  points: number;
  characterId: string;
}

export interface GainExpRequest {
  amount: number;
  reason: string;
}
