import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { Button } from '@/components/ui/Button'

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()
    
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
        >
            {theme === 'dark' ? (
                <Sun className="h-6 w-6" />
            ) : (
                <Moon className="h-6 w-6" />
            )}
        </Button>
    )
}