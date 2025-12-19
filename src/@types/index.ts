/**
 * @types/index.ts
 * Comprehensive type definitions for MUGEN Frontend
 * Maps exactly with Backend Entity structure
 */

// ========== AUTHENTICATION TYPES ==========
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ========== ENUMS ==========
export type Rarity = 'COMUM' | 'INCOMUM' | 'RARO' | 'ÉPICO' | 'LENDÁRIO';
export type EquipmentStatus = 'EQUIPADO_AA' | 'NAO_EQUIPADO';
export type ArmorType = 'LEVE' | 'NORMAL' | 'PESADA';

// ========== CHARACTER BASE TYPES ==========
export interface Race {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Transformation {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface CharacterAttributes {
  characterId: string;
  str: number;      // Força (0-120)
  dex: number;      // Destreza (0-120)
  con: number;      // Constituição (0-120)
  wil: number;      // Vontade (0-120)
  mnd: number;      // Mente (0-120)
  spi: number;      // Espírito (0-120)
  totalPoints?: number;  // Helper property
}

// ========== MAIN CHARACTER TYPE ==========
export interface Character {
  id: string;
  owner: User;
  name: string;
  race: Race;
  level: number;
  exp: number;
  tp: number;  // Currency
  activeTransformation?: Transformation | null;
  isActive: boolean;
  attributes: CharacterAttributes;
  equipment: CharacterEquipment;
  inventory: Inventory;
  createdAt?: string;
  updatedAt?: string;
}

// Character for list view (simplified)
export interface CharacterListItem {
  id: string;
  name: string;
  level: number;
  race: Race;
  tp: number;
  isActive: boolean;
  imageUrl?: string;
}

// ========== EQUIPMENT TYPES ==========
export interface WeaponRequirements {
  minStr: number;
  minDex: number;
  minCon: number;
  minWil: number;
  minMnd: number;
  minSpi: number;
  minLevel: number;
}

export interface Weapon {
  id: number;
  name: string;
  description: string;
  notes?: string;
  imageUrl: string;
  primaryType?: string;
  secondaryType: string;
  elementalType?: string;
  rarity: Rarity;
  requirements: WeaponRequirements;
  tpCost: number;
  bonuses: {
    str: number;
    dex: number;
    con: number;
    wil: number;
    mnd: number;
    spi: number;
  };
  isUnique: boolean;
  maxQuantity: number;
  isActive: boolean;
  sellPrice?: number;  // Helper: tpCost / 2
  displayName?: string;  // Helper for UI
}

export interface Armor {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  armorType: ArmorType;
  rarity: Rarity;
  tpCost: number;
  bonuses: {
    str: number;
    con: number;
    dex: number;
  };
  requirements: {
    minLevel: number;
    minCon: number;
  };
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  sellPrice?: number;  // Helper: tpCost / 2
  displayName?: string;  // Helper for UI
}

export interface Material {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rarity: Rarity;
  addedByMaster: boolean;
  createdAt: string;
  displayName?: string;  // Helper for UI
}

export interface CharacterEquipment {
  id: number;
  characterId: string;
  weapon?: Weapon | null;
  armor?: Armor | null;
  status: EquipmentStatus;
  equippedAt?: string;
  unequippedAt?: string;
  totalBonuses?: {
    str: number;
    dex: number;
    con: number;
    wil: number;
    mnd: number;
    spi: number;
  };  // Helper: calculated from weapon + armor
}

// ========== INVENTORY TYPES ==========
export interface InventoryWeapon {
  id: number;
  weaponId: number;
  weapon: Weapon;
  quantity: number;
  totalValue?: number;  // Helper: weapon.tpCost * quantity
  addedAt: string;
}

export interface InventoryArmor {
  id: number;
  armorId: number;
  armor: Armor;
  quantity: number;
  totalValue?: number;  // Helper: armor.tpCost * quantity
  addedAt: string;
}

export interface InventoryMaterial {
  id: number;
  materialId: number;
  material: Material;
  quantity: number;
  totalValue?: number;  // Helper
  addedAt: string;
}

export interface Inventory {
  id: string;
  characterId: string;
  currentSlots: number;
  maxSlots: number;
  totalValue: number;  // TP total de todos os items
  usagePercentage?: number;  // Helper: (currentSlots / maxSlots) * 100
  freeSlots?: number;  // Helper: maxSlots - currentSlots
  weapons: InventoryWeapon[];
  armors: InventoryArmor[];
  materials: InventoryMaterial[];
  lastUpdated: string;
  totalItemCount?: number;  // Helper: sum of all quantities
}

// ========== DTO TYPES (for API requests) ==========
export interface CreateCharacterDTO {
  name: string;
  raceId: number;
}

export interface UpdateCharacterDTO {
  name?: string;
  level?: number;
  exp?: number;
  tp?: number;
}

export interface UpdateCharacterAttributesDTO {
  str: number;
  dex: number;
  con: number;
  wil: number;
  mnd: number;
  spi: number;
}

export interface EquipItemDTO {
  itemId: number;
  itemType: 'WEAPON' | 'ARMOR';
}

// ========== API RESPONSE TYPES ==========
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

// ========== STORE STATE TYPES ==========
export interface CharacterStoreState {
  characters: Character[];
  activeCharacter: Character | null;
  isLoading: boolean;
  error: string | null;
}

export interface InventoryStoreState {
  inventory: Inventory | null;
  isLoading: boolean;
  error: string | null;
}
