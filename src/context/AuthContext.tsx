import  {
    createContext,
    useState,
    useContext,
    type ReactNode,
    useEffect
} from 'react'
import { jwtDecode } from 'jwt-decode'
import { Role } from '@/types/api'
import  type { User, DecodedToken } from '@/types/api'

const AUTH_TOKEN_KEY = 'authToken'

interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isAdmin: boolean
    isLoading: boolean
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem(AUTH_TOKEN_KEY)

            if (storedToken) {
                const decodedToken = jwtDecode<DecodedToken>(storedToken)

                if(decodedToken.exp * 1000 > Date.now()) {
                    setToken(storedToken)

                    const userFromToken: User = {
                        id: decodedToken.sub,
                        email: decodedToken.sub,
                        name: decodedToken.name,
                        roles: decodedToken.roles,
                        profileImageUrl: null,
                    }
                    setUser(userFromToken)
                } else {
                    localStorage.removeItem(AUTH_TOKEN_KEY)
                }
            }
        } catch (error) {
            console.error('Falha ao carregar e decodificar o token:', error)
            localStorage.removeItem(AUTH_TOKEN_KEY)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const login = (newToken: string) => {
        try {
            const decodedToken = jwtDecode<DecodedToken>(newToken)

            const userFromToken: User = {
                id: decodedToken.sub,
                email: decodedToken.sub,
                name: decodedToken.name,
                roles: decodedToken.roles,
                profileImageUrl: null,
            }

            setToken(newToken)
            setUser(userFromToken)
            localStorage.setItem(AUTH_TOKEN_KEY, newToken)
        } catch (error) {
            console.error('Falha ao decodificar o token durante o login:', error)
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem(AUTH_TOKEN_KEY)
    }

    const isAuthenticated = !!user && !!token
    const isAdmin = user?.roles.includes(Role.ADMIN) ?? false

    return (
        <AuthContext.Provider
            value={{ 
                user,
                token, 
                isAuthenticated, 
                isAdmin,
                isLoading, 
                login, 
                logout 
            }}
        >
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}