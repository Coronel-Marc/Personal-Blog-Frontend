import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from 'react'

type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'vite-ui-theme'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
    children: ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

export const ThemeProvider = ({
    children,
    defaultTheme = 'dark',
    storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) => {
    const [theme, setThemeState] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )
    useEffect (() => {
        const root = window.document.documentElement

        root.classList.remove('light', 'dark')
        root.classList.add(theme)

        localStorage.setItem(storageKey, theme)
    }, [theme, storageKey])

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
    }

    const value = {
        theme,
        setTheme,
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
    }
    return context
}