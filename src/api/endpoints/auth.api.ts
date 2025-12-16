/**
 * Authentication API Endpoints
 */

import apiClient from '../client'
import type { LoginRequest, LoginResponse, RegisterRequest } from '@types/auth.types'
import type { ApiResponse } from '@types/index'

/**
 * POST /auth/login
 * Authenticate user with email and password
 */
export async function login(credentials: LoginRequest) {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    '/auth/login',
    credentials
  )
  return response.data
}

/**
 * POST /auth/register
 * Create new user account
 */
export async function register(data: RegisterRequest) {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    '/auth/register',
    data
  )
  return response.data
}

/**
 * POST /auth/logout
 * Logout current user
 */
export async function logout() {
  const response = await apiClient.post<ApiResponse<null>>('/auth/logout')
  return response.data
}

/**
 * POST /auth/refresh
 * Refresh JWT token
 */
export async function refreshToken(refreshToken: string) {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    '/auth/refresh',
    { refreshToken }
  )
  return response.data
}

/**
 * POST /auth/forgot-password
 * Request password reset
 */
export async function forgotPassword(email: string) {
  const response = await apiClient.post<ApiResponse<null>>(
    '/auth/forgot-password',
    { email }
  )
  return response.data
}

/**
 * POST /auth/reset-password
 * Reset password with token
 */
export async function resetPassword(
  token: string,
  password: string,
  confirmPassword: string
) {
  const response = await apiClient.post<ApiResponse<null>>(
    '/auth/reset-password',
    { token, password, confirmPassword }
  )
  return response.data
}
