/**
 * Global Type Definitions
 * Central hub for all TypeScript types used across the application
 */

export type UserRole = 'ROLE_PLAYER' | 'ROLE_MASTER'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  order?: 'ASC' | 'DESC'
}

export interface ApiResponse<T> {
  data: T
  message: string
  statusCode: number
  timestamp: string
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}
