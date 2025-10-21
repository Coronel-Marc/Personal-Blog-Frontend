import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '@/context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation();

    if (isLoading) {
        return <div>Carregando...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

 
    return children
}