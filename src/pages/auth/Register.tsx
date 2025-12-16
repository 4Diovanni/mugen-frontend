import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import Card from '@components/common/Card'

/**
 * Register Page
 */
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { register, isLoading, error } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'Nome é obrigatório'
    if (!formData.email) newErrors.email = 'Email é obrigatório'
    if (!formData.password) newErrors.password = 'Senha é obrigatória'
    if (formData.password.length < 6)
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Senhas não conferem'

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    await register(
      formData.email,
      formData.password,
      formData.name,
      formData.confirmPassword
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">🎮 Mugen</h1>
          <p className="text-gray-600 dark:text-gray-400">Crie sua conta</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome"
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            error={errors.email}
          />

          <Input
            label="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Sua senha"
            error={errors.password}
          />

          <Input
            label="Confirmar Senha"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirme sua senha"
            error={errors.confirmPassword}
          />

          <Button type="submit" fullWidth isLoading={isLoading}>
            Criar Conta
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">
            Entrar
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Register
