/**
 * Application Constants
 */

export const APP_NAME = 'Mugen'

export const CHARACTER_CLASSES = [
  'WARRIOR',
  'MAGE',
  'ARCHER',
  'ROGUE',
  'PALADIN',
] as const

export const CHARACTER_CLASS_NAMES: Record<string, string> = {
  WARRIOR: 'Guerreiro',
  MAGE: 'Mago',
  ARCHER: 'Arqueiro',
  ROGUE: 'Ladino',
  PALADIN: 'Paladino',
}

export const ITEM_RARITIES = [
  'COMMON',
  'UNCOMMON',
  'RARE',
  'EPIC',
  'LEGENDARY',
] as const

export const RARITY_COLORS: Record<string, string> = {
  COMMON: 'text-gray-600',
  UNCOMMON: 'text-green-600',
  RARE: 'text-blue-600',
  EPIC: 'text-purple-600',
  LEGENDARY: 'text-yellow-600',
}

export const DIFFICULTY_LEVELS = ['EASY', 'MEDIUM', 'HARD'] as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  CHARACTERS: {
    LIST: '/characters',
    GET: '/characters/:id',
    CREATE: '/characters',
    UPDATE: '/characters/:id',
    DELETE: '/characters/:id',
  },
  ACHIEVEMENTS: {
    LIST: '/achievements',
    GET: '/achievements/:id',
  },
  MINIGAMES: {
    LIST: '/minigames',
    GET: '/minigames/:id',
  },
}

export const TOAST_MESSAGES = {
  SUCCESS: 'Operação realizada com sucesso!',
  ERROR: 'Ocorreu um erro. Tente novamente.',
  LOADING: 'Carregando...',
}
