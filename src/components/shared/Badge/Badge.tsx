import React from 'react'
import '../../../styles/cronica-design-system.css'

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'primary'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

/**
 * 🎯 Badge Component
 * Status indicators and labels
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
  className = '',
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
