import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { authService } from '@/services/authService'
import type { LoginPayload } from '@/types/api'

import {Input} from '@/components/ui/Input'
import {Button} from '@/components/ui/Button'

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
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-secondary p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Login Admin</h2>
        
        {error && (
          <div className="mb-4 rounded-md bg-destructive p-3 text-center text-sm text-destructive-foreground">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="admin@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Senha
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}