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
   * ✅ Login bem-sucedido → Dashboard
   */
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true)
        clearError()

        const response = await authApi.login({ email, password })
        const { user: userData, token: newToken } = response.data

        // Armazenar token e dados do usuário
        setUser(userData as any)
        setToken(newToken)
        setIsAuthenticated(true)
        localStorage.setItem('token', newToken)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('userId', userData.id)

        toast.success('Bem-vindo de volta!')
        
        // ✅ Redirecionar para dashboard após login
        navigate('/dashboard', { replace: true })
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
   * ✅ Registro bem-sucedido → Login (não dashboard!)
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
        
        // Opção 1: Backend retorna token (auto-login)
        if (response.data?.token) {
          const { user: userData, token: newToken } = response.data
          setUser(userData as any)
          setToken(newToken)
          setIsAuthenticated(true)
          localStorage.setItem('token', newToken)
          localStorage.setItem('user', JSON.stringify(userData))
          localStorage.setItem('userId', userData.id)
          
          toast.success('Conta criada com sucesso!')
          // Auto-login bem-sucedido
          navigate('/dashboard', { replace: true })
        } 
        // Opção 2: Backend não retorna token (redireciona para login)
        else {
          toast.success('Conta criada com sucesso! Faça login agora.')
          // ✅ Redirecionar para login após registro
          navigate('/login', { replace: true, state: { email } })
        }
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
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
      toast.success('Desconectado com sucesso')
      navigate('/login', { replace: true })
    } catch (err: any) {
      toast.error('Erro ao desconectar')
      // Desconectar mesmo se der erro
      logoutStore()
      navigate('/login', { replace: true })
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
