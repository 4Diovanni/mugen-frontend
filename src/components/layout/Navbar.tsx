import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import Button from '@components/common/Button'

/**
 * Navbar Component
 * Main navigation bar
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl text-primary-600">
            🎮 Mugen
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/characters"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition"
            >
              Personagens
            </Link>
            {user?.role === 'ROLE_MASTER' && (
              <Link
                to="/admin"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition"
              >
                Admin
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {user?.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-dark-700 pt-4 flex flex-col gap-4">
            <Link to="/dashboard" className="text-gray-700 dark:text-gray-300">
              Dashboard
            </Link>
            <Link to="/characters" className="text-gray-700 dark:text-gray-300">
              Personagens
            </Link>
            {user?.role === 'ROLE_MASTER' && (
              <Link to="/admin" className="text-gray-700 dark:text-gray-300">
                Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
