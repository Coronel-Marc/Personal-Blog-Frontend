import { Link, NavLink } from 'react-router-dom'
import { Zap, Menu, X } from 'lucide-react' // Ícone de exemplo, mudar isso na proxima atualização
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import { useState } from 'react'


export const Header = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const navLinkClasses = 'font-medium text-text-dark transition duration-300 hover:text-accent-neon'
    const activeNavLinkClasses = 'text-accent-neon'

    return (
        // Header fixo no topo da página
        <header className='sticky top-0 z-10 bg-secondary-bg shadow-lg shadow-accent-neon/10 transition-colors duration-500'>
            <nav className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
                <Link
                    to='/'
                    className='flex items-center space-x-2 text-2xl font-extrabold tracking-widest text-accent-neon transition-colors duration-500'
                    onClick={closeMobileMenu}
                >
                    <Zap className='h-8 w-8' />
                    {/* ACHO que esse é o nome oficial do blog */}
                    <span>The Code & Road</span>
                </Link>

                <div className='flex items-center space-x-4 md:space-x-6'>
                    <div className='hidden items-center space-x-6 md:flex'>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => cn(navLinkClasses, isActive && activeNavLinkClasses)}
                            >
                            Home
                            </NavLink>
                            <NavLink 
                            to="/about" 
                            className={({ isActive }) => cn(navLinkClasses, isActive && activeNavLinkClasses)}
                            >
                            Sobre
                            </NavLink>
                            <NavLink 
                            to="/portfolio" 
                            className={({ isActive }) => cn(navLinkClasses, isActive && activeNavLinkClasses)}
                            >
                            Portfólio
                        </NavLink>
                        
                        {/* TODO: Esconder este botão baseado no useAuth() no futuro */}
                        <Link to='/admin'>
                            <Button variant='outline' size='sm' className='ml-4'> Admin </Button>
                        </Link>
                    </div>
                    <ThemeToggle />
                    
                    <div className="md:hidden">
                        <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMobileMenu}
                        aria-label="Abrir menu"
                        >
                        {/* Mostra X se aberto, Menu se fechado */}
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </nav>
            <div className={cn(
                "absolute left-0 w-full origin-top transform bg-secondary-bg shadow-lg transition-all duration-300 ease-in-out md:hidden",
                isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0' 
            )}>
                <div className="space-y-1 px-4 pb-3 pt-2">
                    {/* Links replicados para o menu mobile */}
                    <NavLink 
                    to="/" 
                    className={({ isActive }) => cn(navLinkClasses, isActive && activeNavLinkClasses, 'block rounded-md px-3 py-2 text-base')}
                    onClick={closeMobileMenu} // Fecha ao clicar
                    >
                    Home
                    </NavLink>
                    <NavLink 
                    to="/about" 
                    className={({ isActive }) => cn(navLinkClasses, isActive && activeNavLinkClasses, 'block rounded-md px-3 py-2 text-base')}
                    onClick={closeMobileMenu}
                    >
                    Sobre
                    </NavLink>
                    <NavLink 
                    to="/portfolio" 
                    className={({ isActive }) => cn(navLinkClasses, isActive && activeNavLinkClasses, 'block rounded-md px-3 py-2 text-base')}
                    onClick={closeMobileMenu}
                    >
                    Portfólio
                    </NavLink>
                    <Link 
                    to="/admin" 
                    className="block rounded-md px-3 py-2 text-base"
                    onClick={closeMobileMenu}
                    >
                    <Button variant="outline" size="sm" className="w-full"> Admin </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}