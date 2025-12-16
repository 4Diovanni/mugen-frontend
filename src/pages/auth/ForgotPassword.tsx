import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@components/common/Button'
import Input from '@components/common/Input'
import Card from '@components/common/Card'

/**
 * Forgot Password Page
 */
function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement forgot password logic
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">Recuperar Senha</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Digite seu email para receber um link de recuperação
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />

            <Button type="submit" fullWidth isLoading={isLoading}>
              Enviar Link
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-4xl">✓</div>
            <p className="text-green-600 font-semibold">Email enviado com sucesso!</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Verifique seu email para o link de recuperação
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-primary-600 text-sm hover:underline">
            Voltar para login
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default ForgotPassword
