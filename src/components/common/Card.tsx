import { ReactNode, HTMLAttributes } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

/**
 * Card Component
 * Container for content with rounded corners and shadow
 */
function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700',
        'shadow-md hover:shadow-lg transition-shadow duration-200',
        'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
