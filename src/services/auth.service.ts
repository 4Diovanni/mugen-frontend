/**
 * Authentication Service
 * Handles auth logic (login, register, token refresh)
 */

import * as authApi from '@api/endpoints/auth.api'
import { useAuthStore } from '@stores/authStore'
import type { LoginRequest, RegisterRequest } from '@/@types/auth.types'

export class AuthService {
  /**
   * Authenticate user
   */
  static async authenticate(credentials: LoginRequest) {
    const response = await authApi.login(credentials)
    const { user, token } = response.data

    const authStore = useAuthStore.getState()
    authStore.setUser(user as any)
    authStore.setToken(token)
    authStore.setIsAuthenticated(true)

    localStorage.setItem('token', token)
    return response
  }

  /**
   * Register new user
   */
  static async register(data: RegisterRequest) {
    const response = await authApi.register(data)
    const { user, token } = response.data

    const authStore = useAuthStore.getState()
    authStore.setUser(user as any)
    authStore.setToken(token)
    authStore.setIsAuthenticated(true)

    localStorage.setItem('token', token)
    return response
  }

  /**
   * Logout user
   */
  static async logout() {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Error during logout:', error)
    }

    const authStore = useAuthStore.getState()
    authStore.logout()
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const authStore = useAuthStore.getState()
    return authStore.isAuthenticated && !!authStore.token
  }

  /**
   * Get current user
   */
  static getCurrentUser() {
    const authStore = useAuthStore.getState()
    return authStore.user
  }

  /**
   * Get current token
   */
  static getToken(): string | null {
    const authStore = useAuthStore.getState()
    return authStore.token
  }
}
