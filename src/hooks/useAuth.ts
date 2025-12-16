import { useCallback } from 'react'
import { useAuthStore } from '@stores/authStore'
import * as authApi from '@api/endpoints/auth.api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

/**
 * useAuth Hook
 * Provides authentication methods
 */
export function useAuth() {
  const navigate = useNavigate()
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setToken,
    setIsLoading,
    setError,
    setIsAuthenticated,
    logout: logoutStore,
    clearError,
  } = useAuthStore()

  /**
   * Login
   */
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true)
        clearError()

        const response = await authApi.login({ email, password })
        const { user: userData, token: newToken } = response.data

        setUser(userData as any)
        setToken(newToken)
        setIsAuthenticated(true)
        localStorage.setItem('token', newToken)

        toast.success('Bem-vindo de volta!')
        navigate('/dashboard')
      } catch (err: any) {
        const errorMsg = err.response?.data?.message || 'Erro ao fazer login'
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, setError, setUser, setToken, setIsAuthenticated, navigate, clearError]
  )

  /**
   * Register
   */
  const register = useCallback(
    async (
      email: string,
      password: string,
      name: string,
      confirmPassword: string
    ) => {
      try {
        setIsLoading(true)
        clearError()

        const response = await authApi.register({
          email,
          password,
          name,
          confirmPassword,
        })
        const { user: userData, token: newToken } = response.data

        setUser(userData as any)
        setToken(newToken)
        setIsAuthenticated(true)
        localStorage.setItem('token', newToken)

        toast.success('Conta criada com sucesso!')
        navigate('/dashboard')
      } catch (err: any) {
        const errorMsg = err.response?.data?.message || 'Erro ao criar conta'
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, setError, setUser, setToken, setIsAuthenticated, navigate, clearError]
  )

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      await authApi.logout()
      logoutStore()
      toast.success('Desconectado com sucesso')
      navigate('/login')
    } catch (err: any) {
      toast.error('Erro ao desconectar')
    } finally {
      setIsLoading(false)
    }
  }, [logoutStore, navigate, setIsLoading])

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  }
}
