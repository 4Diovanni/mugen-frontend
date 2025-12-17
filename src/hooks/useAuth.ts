import { useCallback } from 'react'
import { useAuthStore } from '@stores/authStore'
import * as authApi from '@api/endpoints/auth.api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

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
   * Extract user data from JWT token
   */
  const extractUserFromToken = (jwtToken: string) => {
    try {
      const decoded: any = jwtDecode(jwtToken)
      console.log('🔓 Decoded JWT:', decoded)

      // Extract user data from JWT payload
      const userData = {
        id: decoded.sub || decoded.userId || 'unknown',
        email: decoded.email || 'unknown',
        name: decoded.name || 'User',
        role: decoded.roles?.[0] || decoded.role || 'ROLE_PLAYER',
      }

      console.log('👤 Extracted user from token:', userData)
      return userData
    } catch (err) {
      console.error('❌ Failed to decode JWT:', err)
      throw new Error('Não foi possível decodificar o token')
    }
  }

  /**
   * Parse login response - handles multiple response formats
   */
  const parseLoginResponse = (response: any) => {
    console.log('🔍 Login Response:', response)

    let userData = null
    let newToken = null

    // Format 1: OAuth2/JWT Response { access_token, expires_in, token_type }
    if (response?.access_token && !response?.user) {
      console.log('🔑 OAuth2/JWT format detected')
      newToken = response.access_token
      userData = extractUserFromToken(newToken)
    }
    // Format 2: { user: {...}, token: "..." }
    else if (response?.user && response?.token) {
      console.log('📦 Format 2: Direct user + token')
      userData = response.user
      newToken = response.token
    }
    // Format 3: { data: { user: {...}, token: "..." } }
    else if (response?.data?.user && response?.data?.token) {
      console.log('📦 Format 3: Wrapped in data')
      userData = response.data.user
      newToken = response.data.token
    }
    // Format 4: { userData: {...}, token: "..." }
    else if (response?.userData && response?.token) {
      console.log('📦 Format 4: userData + token')
      userData = response.userData
      newToken = response.token
    }
    // Format 5: Direct nested
    else if (response?.data?.user) {
      console.log('📦 Format 5: Nested')
      userData = response.data.user
      newToken = response.data.token || response.token
    }
    // Format 6: Token response with user in JWT
    else if (response?.token) {
      console.log('📦 Format 6: Token response')
      newToken = response.token
      try {
        userData = extractUserFromToken(newToken)
      } catch (err) {
        console.error('Cannot extract user from token:', err)
      }
    }

    if (!userData || !newToken) {
      console.error('❌ Could not parse login response:', {
        response,
        parsed: { userData, newToken },
      })
      throw new Error(
        `Formato de resposta do servidor inesperado. Recebido: ${JSON.stringify(
          response
        ).substring(0, 200)}`
      )
    }

    // Ensure user has all required fields
    if (!userData.role) {
      userData.role = 'ROLE_PLAYER'
    }
    if (!userData.id) {
      userData.id = 'unknown'
    }

    return { userData, newToken }
  }

  /**
   * Login
   * ✅ Login bem-sucedido → Dashboard
   */
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true)
        clearError()

        console.log('🔐 Attempting login for:', email)
        const response = await authApi.login({ email, password })
        console.log('✅ Login response received:', response)

        // Parse response in multiple formats
        const { userData, newToken } = parseLoginResponse(response)

        // Armazenar token e dados do usuário
        setUser(userData as any)
        setToken(newToken)
        setIsAuthenticated(true)
        localStorage.setItem('token', newToken)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('userId', userData.id)

        console.log('✅ Login successful:', userData.email)
        toast.success('Bem-vindo de volta!')

        // ✅ Redirecionar para dashboard após login
        navigate('/dashboard', { replace: true })
      } catch (err: any) {
        console.error('❌ Login error:', err)
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          'Erro ao fazer login'
        console.error('❌ Error message:', errorMsg)
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [
      setIsLoading,
      setError,
      setUser,
      setToken,
      setIsAuthenticated,
      navigate,
      clearError,
    ]
  )

  /**
   * Register
   * ✅ Registro bem-sucedido → Login (não dashboard!)
   */
  const register = useCallback(
    async (
      email: string,
      password: string,
      displayName: string,
      confirmPassword: string
    ) => {
      try {
        setIsLoading(true)
        clearError()

        console.log('📝 Attempting registration for:', email)
        const response = await authApi.register({
          email,
          password,
          displayName,  // ✅ Changed from 'name' to 'displayName'
          confirmPassword,
        })
        console.log('✅ Registration response:', response)

        // Opção 1: Backend retorna token (auto-login)
        if (response?.token || response?.access_token || response?.data?.token) {
          try {
            const { userData, newToken } = parseLoginResponse(response)
            setUser(userData as any)
            setToken(newToken)
            setIsAuthenticated(true)
            localStorage.setItem('token', newToken)
            localStorage.setItem('user', JSON.stringify(userData))
            localStorage.setItem('userId', userData.id)

            console.log('✅ Auto-login after registration successful')
            toast.success('Conta criada com sucesso!')
            // Auto-login bem-sucedido
            navigate('/dashboard', { replace: true })
          } catch (parseErr) {
            // Se não conseguir fazer parse, vai para login mesmo
            console.warn('⚠️ Auto-login parse failed, redirecting to login')
            toast.success('Conta criada com sucesso! Faça login agora.')
            navigate('/login', { replace: true, state: { email } })
          }
        }
        // Opção 2: Backend não retorna token (redireciona para login)
        else {
          console.log('ℹ️ No token in response, redirecting to login')
          toast.success('Conta criada com sucesso! Faça login agora.')
          // ✅ Redirecionar para login após registro
          navigate('/login', { replace: true, state: { email } })
        }
      } catch (err: any) {
        console.error('❌ Registration error:', err)
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          'Erro ao criar conta'
        console.error('❌ Error message:', errorMsg)
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [
      setIsLoading,
      setError,
      setUser,
      setToken,
      setIsAuthenticated,
      navigate,
      clearError,
    ]
  )

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      console.log('🔐 Attempting logout')
      await authApi.logout()
      logoutStore()
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
      console.log('✅ Logout successful')
      toast.success('Desconectado com sucesso')
      navigate('/login', { replace: true })
    } catch (err: any) {
      console.error('❌ Logout error:', err)
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
