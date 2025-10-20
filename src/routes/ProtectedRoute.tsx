import {Navigate} from 'react-router-dom';
//import {useAuth} from '@/context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    //cont {isAuthenticated} = useAuth()

    const isAuthenticated = false; // TODO: substituir pela verificação real de autenticação

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    
    return children
}