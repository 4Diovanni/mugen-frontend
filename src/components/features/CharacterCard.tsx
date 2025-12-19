import { Character } from '@/@types/game.types'
import Card from '@components/common/Card'
import { Link } from 'react-router-dom'

interface CharacterCardProps {
  character: Character
}

/**
 * CharacterCard Component
 * Displays character information in a card format
 */
function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link to={`/characters/${character.id}`}>
      <Card className="hover:shadow-lg transition-all cursor-pointer">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {character.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {character.class} - Nível {character.level}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Experiência</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {character.exp}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Ouro</p>
              <p className="font-semibold text-yellow-600">💰 {character.level}</p>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Vida</span>
              <span>
                {character.health}/{character.maxHealth}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{
                  width: `${(character.health / character.maxHealth) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default CharacterCard
