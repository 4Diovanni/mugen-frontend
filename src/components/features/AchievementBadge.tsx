import { Achievement } from '@types/game.types'
import Card from '@components/common/Card'

interface AchievementBadgeProps {
  achievement: Achievement
  unlocked?: boolean
}

/**
 * AchievementBadge Component
 * Displays achievement badge
 */
function AchievementBadge({ achievement, unlocked = false }: AchievementBadgeProps) {
  return (
    <Card
      className={`p-4 text-center transition-all ${
        unlocked ? 'opacity-100' : 'opacity-50 grayscale'
      }`}
    >
      <div className="mb-3 text-4xl">{achievement.icon || '🏆'}</div>
      <h4 className="font-bold text-gray-900 dark:text-white">
        {achievement.name}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {achievement.description}
      </p>
      <p className="text-xs text-primary-600 font-semibold mt-2">
        +{achievement.points} pts
      </p>
      {unlocked && (
        <p className="text-xs text-green-600 font-semibold mt-1">✓ Desbloqueado</p>
      )}
    </Card>
  )
}

export default AchievementBadge
