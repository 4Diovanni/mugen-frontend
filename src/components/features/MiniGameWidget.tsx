import { Minigame } from '@/@types/game.types'
import Card from '@components/common/Card'
import Button from '@components/common/Button'

interface MiniGameWidgetProps {
  game: Minigame
  onPlay?: () => void
}

/**
 * MiniGameWidget Component
 * Widget to display and launch minigames
 */
function MiniGameWidget({ game, onPlay }: MiniGameWidgetProps) {
  const difficultyColors = {
    EASY: 'text-green-600',
    MEDIUM: 'text-yellow-600',
    HARD: 'text-red-600',
  }

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {game.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {game.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>
            <span className={`font-semibold ${difficultyColors[game.difficulty]}`}>
              {game.difficulty}
            </span>
          </div>
          <div className="space-x-4 text-right">
            <span className="text-yellow-600">💰 {game.rewardGold}</span>
            <span className="text-blue-600">⭐ {game.rewardExperience}</span>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={onPlay}
        >
          Jogar
        </Button>
      </div>
    </Card>
  )
}

export default MiniGameWidget
