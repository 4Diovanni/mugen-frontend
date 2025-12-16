import { Link } from 'react-router-dom'
import Button from '@components/common/Button'

/**
 * 404 Not Found Page
 */
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Página não encontrada
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Desculpe, não conseguimos encontrar essa página.
        </p>
        <Link to="/">
          <Button>Voltar para Home</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
