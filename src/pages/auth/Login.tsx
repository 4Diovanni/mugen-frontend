import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import Card from '@components/common/Card'

/**
 * Login Page
 */
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { login, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!email || !password) {
      setErrors({
        email: email ? '' : 'Email é obrigatório',
        password: password ? '' : 'Senha é obrigatória',
      })
      return
    }

    await login(email, password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">🎮 Mugen</h1>
          <p className="text-gray-600 dark:text-gray-400">Entre na sua conta</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            error={errors.email}
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            error={errors.password}
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Entrar
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-primary-600 font-semibold hover:underline">
            Criar conta
          </Link>
        </div>

        <div className="mt-3 text-center">
          <Link to="/forgot-password" className="text-primary-600 text-sm hover:underline">
            Esqueceu a senha?
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Login
