/**
 * Authentication Related Types
 */

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  displayName: string  // ✅ Changed from 'name' to 'displayName'
  confirmPassword: string
}

export interface LoginResponse {
  user: {
    id: string
    email: string
    name: string
    role: 'ROLE_PLAYER' | 'ROLE_MASTER' | 'ROLE_ADMIN'
  }
  token: string
  refreshToken?: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface AuthError {
  message: string
  code?: string
}
