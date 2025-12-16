import { Link } from 'react-router-dom'
import Button from '@components/common/Button'

/**
 * Unauthorized Access Page
 */
function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">🔐</h1>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Acesso Negado
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Você não tem permissão para acessar essa página.
        </p>
        <Link to="/">
          <Button>Voltar para Home</Button>
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized
