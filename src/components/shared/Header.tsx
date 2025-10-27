import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react'; // Ícone de exemplo
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';

export const Header = () => {
    return (
        // Header fixo no topo da página
        <header className="sticky top-0 z-10 bg-secondary-bg shadow-lg shadow-accent-neon/10 transition-colors duration-500">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link
                    to="/"
                    className="flex items-center space-x-2 text-2xl font-extrabold tracking-widest text-accent-neon transition-colors duration-500"
                >
                    <Zap className="h-8 w-8" />
                    {/* TODO: Trocar 'BLOG NAME' pelo nome real do blog, que eu ainda não decidi qual é */}
                    <span>BLOG NAME</span>
                </Link>

                <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="hidden items-center space-x-6 md:flex">
                        {/* TODO: Atualizar os links ('to') quando as rotas existirem */}
                        <Link to="/" className="font-medium text-text-dark transition duration-300 hover:text-accent-neon">
                        Home
                        </Link>
                        <Link to="/about" className="font-medium text-text-dark transition duration-300 hover:text-accent-neon">
                        Sobre
                        </Link>
                        <Link to="/portfolio" className="font-medium text-text-dark transition duration-300 hover:text-accent-neon">
                        Portfólio
                        </Link>
                        
                        {/* Link para o Admin (Usando o Button outline) */}
                        {/* TODO: Esconder este botão baseado no useAuth() no futuro */}
                        <Link to="/admin">
                            <Button variant="outline" size="sm" className="ml-4"> 
                            Admin
                            </Button>
                        </Link>
                    </div>
                    <ThemeToggle />

                    {/* TODO: Adicionar um botão "Menu Hamburger" para mobile */}
                </div>
            </nav>
        </header>
    )
}