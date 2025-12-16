import { useEffect } from 'react'
import { useAuth } from '@hooks/useAuth'
import { useCharacter } from '@hooks/useCharacter'
import Card from '@components/common/Card'
import Button from '@components/common/Button'
import { Link } from 'react-router-dom'
import CharacterCard from '@components/features/CharacterCard'

/**
 * Dashboard Page
 * Main dashboard showing user info and characters
 */
function Dashboard() {
  const { user } = useAuth()
  const { characters, isLoading, listCharacters } = useCharacter()

  useEffect(() => {
    listCharacters()
  }, [listCharacters])

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Bem-vindo, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Role de {user?.role === 'ROLE_MASTER' ? '👑 Master' : '🎯 Jogador'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Personagens</p>
            <p className="text-2xl font-bold text-primary-600">{characters.length}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Achievements</p>
            <p className="text-2xl font-bold text-primary-600">0</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-4xl mb-2">🌟</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total XP</p>
            <p className="text-2xl font-bold text-primary-600">0</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-4xl mb-2">💰</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Ouro Total</p>
            <p className="text-2xl font-bold text-yellow-600">0</p>
          </div>
        </Card>
      </div>

      {/* Characters */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Seus Personagens
          </h2>
          <Link to="/characters/create">
            <Button>+ Novo Personagem</Button>
          </Link>
        </div>

        {isLoading ? (
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        ) : characters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Você ainda não tem nenhum personagem
            </p>
            <Link to="/characters/create">
              <Button>Criar Primeiro Personagem</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Dashboard
