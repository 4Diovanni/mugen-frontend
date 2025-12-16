import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@stores/authStore'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'ROLE_PLAYER' | 'ROLE_MASTER'
}

/**
 * ProtectedRoute Component
 * Validates user authentication and role-based access
 */
function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore()

  // Not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  // Check role requirement
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
