import { useState, useEffect, useCallback } from 'react'

/**
 * useFetch Hook
 * Generic hook for handling API calls
 */
interface UseFetchOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export function useFetch<T = any>(
  fn: () => Promise<T>,
  options: UseFetchOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(immediate)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await fn()
      setData(result)
      onSuccess?.(result)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
      onError?.(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [fn, onSuccess, onError])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { data, isLoading, error, execute }
}
