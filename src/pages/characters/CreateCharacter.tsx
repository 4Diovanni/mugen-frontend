import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacter } from '@hooks/useCharacter'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import Card from '@components/common/Card'
import type { CharacterClass } from '@types/game.types'

const CLASSES: CharacterClass[] = ['WARRIOR', 'MAGE', 'ARCHER', 'ROGUE', 'PALADIN']

/**
 * Create Character Page
 */
function CreateCharacter() {
  const navigate = useNavigate()
  const { createCharacter, isLoading } = useCharacter()
  const [name, setName] = useState('')
  const [characterClass, setCharacterClass] = useState<CharacterClass>('WARRIOR')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Nome do personagem é obrigatório')
      return
    }

    const created = await createCharacter(name, characterClass)
    if (created) {
      navigate('/characters')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Criar Personagem
      </h1>

      <Card>
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome do Personagem"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Aragon"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Classe
            </label>
            <select
              value={characterClass}
              onChange={(e) => setCharacterClass(e.target.value as CharacterClass)}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {CLASSES.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Classe selecionada:</strong> {characterClass}
            </p>
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Criar Personagem
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default CreateCharacter
