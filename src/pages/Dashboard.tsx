import { useEffect } from 'react'
import { useAuth } from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

/**
 * Dashboard Page
 * Main page after successful login
 */
export default function Dashboard() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  // Verificar se está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Você precisa fazer login primeiro')
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-charcoal-800 text-gray-200 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">🎮 Mugen RPG</h1>
            <p className="text-gray-400">Bem-vindo de volta, <span className="text-teal-400 font-semibold">{user.name}</span>!</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
          >
            Sair
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card: Personagens */}
          <div className="bg-charcoal-700 rounded-lg p-6 border border-gray-700 hover:border-teal-500 transition cursor-pointer">
            <div className="text-4xl mb-3">🧙</div>
            <h2 className="text-2xl font-bold text-white mb-2">Personagens</h2>
            <p className="text-gray-400 mb-4">Crie e gerencie seus personagens</p>
            <button className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded font-semibold w-full transition">
              Ir para Personagens
            </button>
          </div>

          {/* Card: Inventário */}
          <div className="bg-charcoal-700 rounded-lg p-6 border border-gray-700 hover:border-teal-500 transition cursor-pointer">
            <div className="text-4xl mb-3">🎒</div>
            <h2 className="text-2xl font-bold text-white mb-2">Inventário</h2>
            <p className="text-gray-400 mb-4">Gerencie seus itens e equipamentos</p>
            <button className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded font-semibold w-full transition">
              Abrir Inventário
            </button>
          </div>

          {/* Card: Achievements */}
          <div className="bg-charcoal-700 rounded-lg p-6 border border-gray-700 hover:border-teal-500 transition cursor-pointer">
            <div className="text-4xl mb-3">🏆</div>
            <h2 className="text-2xl font-bold text-white mb-2">Achievements</h2>
            <p className="text-gray-400 mb-4">Veja seus prêmios e realizações</p>
            <button className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded font-semibold w-full transition">
              Ver Achievements
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-teal-900 bg-opacity-30 border border-teal-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-teal-400 mb-2">✅ Login Bem-Sucedido!</h3>
          <p className="text-gray-300">
            Você está autenticado como <strong>{user.email}</strong>. 
            O token JWT foi armazenado com segurança e será enviado automaticamente em cada requisição.
          </p>
        </div>
      </div>
    </div>
  )
}
