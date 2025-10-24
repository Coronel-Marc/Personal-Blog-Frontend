import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/Button'

export const AdminHeader = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    // TODO: Adicionar modal de confirmação como no protótipo
    // Por enquanto, executa o logout diretamente
    logout()
  }

  return (
    // Header fixo, com cores do tema e sombra
    <header className="sticky top-0 z-10 bg-secondary-bg shadow-lg shadow-accent-neon/10 transition-colors duration-500 content-panel">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Lado Esquerdo: Título e Nome (ou só Título em mobile) */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-extrabold tracking-widest text-accent-neon transition-colors duration-500">
            ADMIN
          </h1>
          <span className="hidden text-text-muted md:inline">| Dashboard</span>
        </div>

        {/* Lado Direito: Controles */}
        <div className="flex items-center space-x-4">
          {/* Nome do usuário (escondido em telas pequenas) */}
          <span className="hidden font-medium text-text-dark sm:inline">
            Bem-vindo, {user?.name || 'Admin'}
          </span>

          {/* Toggle de Tema */}
          <ThemeToggle />

          {/* Botão de Logout */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">Sair</span> {/* Esconde texto em mobile */}
          </Button>
        </div>
      </div>
    </header>
  )
}