import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'

/**
 * Sidebar Component
 * Side navigation menu
 */
function Sidebar() {
  const { user } = useAuth()

  return (
    <aside className="hidden lg:block w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 h-screen overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Menu
        </h2>

        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/characters"
            className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition"
          >
            🎯 Personagens
          </Link>

          {user?.role === 'ROLE_MASTER' && (
            <>
              <div className="py-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mt-6 mb-2">
                Administração
              </div>
              <Link
                to="/admin"
                className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition"
              >
                ⚙️ Admin Panel
              </Link>
            </>
          )}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
