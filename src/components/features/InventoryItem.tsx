import { Item } from '@/@types/game.types'
import Card from '@components/common/Card'

interface InventoryItemProps {
  item: Item
  quantity?: number
}

/**
 * InventoryItem Component
 * Displays item in inventory
 */
function InventoryItem({ item, quantity = 1 }: InventoryItemProps) {
  const rarityColors = {
    COMMON: 'text-gray-600',
    UNCOMMON: 'text-green-600',
    RARE: 'text-blue-600',
    EPIC: 'text-purple-600',
    LEGENDARY: 'text-yellow-600',
  }

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className={`font-bold ${rarityColors[item.rarity]}`}>
            {item.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {item.description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            {item.type}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            x{quantity}
          </p>
          <p className="text-sm text-yellow-600">💰 {item.price}</p>
        </div>
      </div>
    </Card>
  )
}

export default InventoryItem
