import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { authService } from '@/services/authService'
import type { LoginPayload } from '@/types/api'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { login: loginContext } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const payload: LoginPayload = { email, password }

    try {
      const response = await authService.login(payload)

      loginContext(response.token)
      navigate(from, { replace: true })
    } catch (err) {
      const apiErrorMessage = (err as Error).message
      setError(apiErrorMessage || 'Falha ao efetuar login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // TODO: Substituir este HTML por Átomos e Moléculas (Input, Button)
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Login Admin</h2>
        
        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-center text-red-700">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded border px-3 py-2" // Tailwind
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block text-sm font-bold">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded border px-3 py-2" // Tailwind
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-blue-500 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50" // Tailwind
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}