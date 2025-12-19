import React from 'react'
import '../../../styles/cronica-design-system.css'

type CardVariant = 'default' | 'accent' | 'danger'

interface CardProps {
  title?: string
  variant?: CardVariant
  children: React.ReactNode
  footer?: React.ReactNode
  onClick?: () => void
  className?: string
}

/**
 * 📦 Card Component
 * Reusable container for content with variants
 */
export const Card: React.FC<CardProps> = ({
  title,
  variant = 'default',
  children,
  footer,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`card card--${variant} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : -1}
    >
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
        </div>
      )}

      <div className="card-body">{children}</div>

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

export default Card
