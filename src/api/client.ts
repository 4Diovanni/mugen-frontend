import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios'

/**
 * Environment Variables (Type-safe)
 */
const BASE_URL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
const TIMEOUT: number = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10)

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('🔧 API Client Configuration:')
  console.log(`   Base URL: ${BASE_URL}`)
  console.log(`   Timeout: ${TIMEOUT}ms`)
}

/**
 * Axios HTTP Client
 * Handles all backend API communication
 * Type-safe with proper environment variable handling
 */
class ApiClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  /**
   * Setup Request & Response Interceptors
   */
  private setupInterceptors(): void {
    // ✅ Request Interceptor - Add JWT token to every request
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token')

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
          if (import.meta.env.DEV) {
            console.log(`📤 Request: ${config.method?.toUpperCase()} ${config.url}`)
          }
        }

        return config
      },
      (error) => {
        console.error('❌ Request Error:', error)
        return Promise.reject(error)
      }
    )

    // ✅ Response Interceptor - Handle responses and errors
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (import.meta.env.DEV) {
          console.log(`📥 Response: ${response.status} ${response.statusText}`)
        }
        return response
      },
      (error) => {
        // 🔐 Handle 401 Unauthorized (token expired)
        if (error.response?.status === 401) {
          console.warn('⚠️ Token expired or unauthorized')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('userId')
          window.location.href = '/login'
        }

        // 🚫 Handle 403 Forbidden (insufficient permissions)
        if (error.response?.status === 403) {
          console.warn('⚠️ Insufficient permissions')
          window.location.href = '/unauthorized'
        }

        // 🐛 Log error details in development
        if (import.meta.env.DEV) {
          console.error(
            `❌ API Error: ${error.response?.status} ${error.message}`,
            error.response?.data
          )
        }

        return Promise.reject(error)
      }
    )
  }

  /**
   * GET Request
   */
  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config)
  }

  /**
   * POST Request
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config)
  }

  /**
   * PUT Request
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config)
  }

  /**
   * PATCH Request
   */
  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config)
  }

  /**
   * DELETE Request
   */
  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config)
  }
}

export default new ApiClient()
