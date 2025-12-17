import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'

/**
 * Login Page
 */
export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (!formData.email || !formData.password) {
      return
    }

    await login(formData.email, formData.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-charcoal-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">🎮 Mugen</h1>
          <p className="text-gray-400">RPG Game Platform</p>
        </div>

        {/* Form Card */}
        <div className="bg-charcoal-700 rounded-lg p-8 border border-gray-700 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

          {error && (
            <div className="bg-red-900 bg-opacity-30 border border-red-600 text-red-200 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className="w-full px-4 py-2 bg-charcoal-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-charcoal-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition mt-6"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 pt-6 border-t border-gray-600 text-center">
            <p className="text-gray-400 mb-4">
              Não tem conta?{' '}
              <Link to="/register" className="text-teal-400 hover:text-teal-300 font-semibold transition">
                Registre-se aqui
              </Link>
            </p>
            <Link to="/" className="text-gray-500 hover:text-gray-400 text-sm transition">
              ← Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
