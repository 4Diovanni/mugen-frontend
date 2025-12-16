import { useCallback } from 'react'
import { useCharacterStore } from '@stores/characterStore'
import * as charactersApi from '@api/endpoints/characters.api'
import toast from 'react-hot-toast'

/**
 * useCharacter Hook
 * Provides character management methods
 */
export function useCharacter() {
  const {
    characters,
    currentCharacter,
    isLoading,
    error,
    setCharacters,
    setCurrentCharacter,
    addCharacter,
    updateCharacter,
    removeCharacter,
    setIsLoading,
    setError,
    clearError,
  } = useCharacterStore()

  /**
   * List Characters
   */
  const listCharacters = useCallback(async () => {
    try {
      setIsLoading(true)
      clearError()
      const response = await charactersApi.listCharacters()
      setCharacters(response.data)
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || 'Erro ao carregar personagens'
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, setError, setCharacters, clearError])

  /**
   * Get Character
   */
  const getCharacter = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true)
        clearError()
        const response = await charactersApi.getCharacter(id)
        setCurrentCharacter(response.data)
        return response.data
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || 'Erro ao carregar personagem'
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, setError, setCurrentCharacter, clearError]
  )

  /**
   * Create Character
   */
  const createCharacter = useCallback(
    async (name: string, characterClass: string) => {
      try {
        setIsLoading(true)
        clearError()
        const response = await charactersApi.createCharacter({
          name,
          class: characterClass as any,
        })
        addCharacter(response.data)
        toast.success('Personagem criado com sucesso!')
        return response.data
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || 'Erro ao criar personagem'
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, setError, addCharacter, clearError]
  )

  /**
   * Update Character
   */
  const updateCharacterData = useCallback(
    async (id: string, data: any) => {
      try {
        setIsLoading(true)
        clearError()
        const response = await charactersApi.updateCharacter(id, data)
        updateCharacter(response.data)
        toast.success('Personagem atualizado!')
        return response.data
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || 'Erro ao atualizar personagem'
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, setError, updateCharacter, clearError]
  )

  /**
   * Delete Character
   */
  const deleteCharacter = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true)
        clearError()
        await charactersApi.deleteCharacter(id)
        removeCharacter(id)
        toast.success('Personagem deletado!')
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || 'Erro ao deletar personagem'
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, setError, removeCharacter, clearError]
  )

  return {
    characters,
    currentCharacter,
    isLoading,
    error,
    listCharacters,
    getCharacter,
    createCharacter,
    updateCharacterData,
    deleteCharacter,
    clearError,
  }
}
