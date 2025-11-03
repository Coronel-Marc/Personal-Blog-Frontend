import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { AlertTriangle } from 'lucide-react'

export const NotFoundPage = () => {
  return (
    // Centraliza o conteúdo na tela
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4"> 
      {/* Ícone de Alerta (Sugerido pelo Gemini) */}
      <AlertTriangle className="mb-6 h-16 w-16 text-accent-neon transition-colors duration-500 md:h-24 md:w-24" /> 

      {/* Título "404" com cor de destaque */}
      <h1 className="mb-4 text-6xl font-extrabold text-accent-neon transition-colors duration-500 md:text-8xl">
        404
      </h1>
      
      {/* Mensagem Principal */}
      <p className="mb-4 text-xl font-semibold text-text-dark transition-colors duration-500 md:text-2xl">
        Ops! Página não encontrada.
      </p>
      
      {/* Mensagem Secundária */}
      <p className="mb-8 max-w-md text-text-muted transition-colors duration-500">
        A página que você está procurando pode ter sido removida, o nome alterado ou está temporariamente indisponível.
      </p>
      
      {/* Botão para Voltar para Home */}
      <Link to="/">
        <Button 
          variant="default"
          className="neon-glow-button" 
        >
          Voltar para a Página Inicial
        </Button>
      </Link>
    </div>
  )
}