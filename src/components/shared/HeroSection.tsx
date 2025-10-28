import React from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import {useTheme } from '@/context/ThemeContext'
import { Link } from 'react-router-dom'

interface HeroSectionProps {
    className?: string
}

export const HeroSection = ({className}: HeroSectionProps) => {
    const { theme } = useTheme()
    // TODO: Substituir URL da imagem de fundo quando eu tiver uma imagem melhor
    const heroBgImageUrlDark = "url('https://placehold.co/1920x1080/130a20/AC25E6?text=Night+Rider+BG')"
    const heroBgImageLightUrl = "url('https://placehold.co/1920x1080/F9F3F6/D8436B?text=Sunset+Vibes+BG')"

    const currentHeroBgImage = theme === 'dark' ? heroBgImageUrlDark : heroBgImageLightUrl

    return (
        <div className={cn('relative w-full overflow-hidden', className)}>
            <div
                className='hero-background absolute inset-0 bg-cover bg-center opacity-15 dark:opacity-15 pointer-events-none transition-opacity duration-500'
                style={{ backgroundImage: currentHeroBgImage }}
                aria-hidden='true'
            />

            <div className='relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8'>
                <p className='mb-4 text-xl font-semibold uppercase tracking-widest text-accent-neon transition-colors duration-500'>
                    Motores, Neon e Nostalgia
                </p>
                <h1 className='mb-6 text-6xl font-extrabold leading-tight text-text-dark transition-colors duration-500 sm:text-7xl'>
                    Seu ponto de partida para o {' '}
                    <span className='text-accent-neon transition-colors duration-500'>Synthwave</span>
                </h1>
                <p className='mx-auto mb-8 max-w-3xl text-lg text-text-muted transition-colors duration-500'>
                    Explore o melhor da cultura retrô-futurista, dos clássicos automotivos à trilha sonora perfeita.
                </p>
                <Link to='/blog'>
                    <Button
                    size='lg'
                    className='neon-glow-button px-8 py-4 uppercase tracking-widest hover:scale-[1.05]'
                    // TODO: Adicionar ação ao botão (link para posts recentes, talvez?)
                >
                    Posts Recentes
                </Button>                
                </Link>
            </div>
        </div>
    )
}
