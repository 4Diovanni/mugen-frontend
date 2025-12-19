import { useCallback } from 'react'
import { useCharacterStore } from '@stores/characterStore'
import * as charactersApi from '@api/endpoints/characters.api'
import * as inventoryApi from '@api/endpoints/inventory.api'
import toast from 'react-hot-toast'
import type { CreateCharacterRequest, AllocateAttributeRequest} from '@/@types/game.types'

/**
 * useCharacter Hook
 * Sincronizado com CharacterController do backend
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
   * List Characters (com paginação)
   */
  const listCharacters = useCallback(async (page = 0, size = 10) => {
    try {
      setIsLoading(true)
      clearError()
      const response = await charactersApi.listCharacters({ page, size })
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
   * Get Character by ID
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
    async (data: CreateCharacterRequest) => {
      try {
        setIsLoading(true)
        clearError()
        const response = await charactersApi.createCharacter(data)
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

  /**
   * Allocate TP (Talent Points)
   */
  const allocateTP = useCallback(
    async (characterId: string, request: AllocateAttributeRequest) => {
      try {
        setIsLoading(true)
        clearError()
        const response = await charactersApi.allocateAttribute(
          characterId,
          request
        )
        updateCharacter(response.data)
        toast.success('Pontos alocados com sucesso!')
        return response.data
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || 'Erro ao alocar pontos'
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, setError, updateCharacter, clearError]
  )

  /**
   * Gain Experience
   */
  const gainExp = useCallback(
    async (characterId: string, amount: number, reason: string) => {
      try {
        setIsLoading(true)
        clearError()
        const response = await charactersApi.gainExperience(
          characterId,
          { amount, reason }
        )
        updateCharacter(response.data)
        toast.success(`+${amount} XP ganhos!`)
        return response.data
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || 'Erro ao ganhar experiência'
        setError(errorMsg)
        toast.error(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, setError, updateCharacter, clearError]
  )

  /**
   * Get Character Stats
   */
  const getCharacterStats = useCallback(
    async (characterId: string) => {
      try {
        clearError()
        const response = await charactersApi.getCharacterStats(characterId)
        return response.data
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || 'Erro ao calcular stats'
        setError(errorMsg)
        toast.error(errorMsg)
      }
    },
    [setError, clearError]
  )

  /**
   * Get Inventory
   */
  const getInventory = useCallback(
    async (characterId: string) => {
      try {
        clearError()
        const response = await inventoryApi.getInventory(characterId)
        return response.data
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || 'Erro ao carregar inventário'
        setError(errorMsg)
        toast.error(errorMsg)
      }
    },
    [setError, clearError]
  )

  /**
   * Get Level Progress
   */
  const getLevelProgress = useCallback(
    async (characterId: string) => {
      try {
        clearError()
        const response = await charactersApi.getLevelProgress(characterId)
        return response.data
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || 'Erro ao obter progresso'
        setError(errorMsg)
      }
    },
    [setError, clearError]
  )

  /**
   * Get TP Summary
   */
  const getTPSummary = useCallback(
    async (characterId: string) => {
      try {
        clearError()
        const response = await charactersApi.getTPSummary(characterId)
        return response.data
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message || 'Erro ao obter resumo de TP'
        setError(errorMsg)
      }
    },
    [setError, clearError]
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
    allocateTP,
    gainExp,
    getCharacterStats,
    getInventory,
    getLevelProgress,
    getTPSummary,
    clearError,
  }
}
