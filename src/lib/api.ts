const AUTH_TOKEN_KEY = 'authToken'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

interface ApiError {
    timestamp: string
    status: number
    error: string
    message: string
    path: string
}

/**
 * Wrapper de 'fetch' para requisições à API.
 * Centraliza a URL base, headers de autenticação e tratamento de erros.
 */

export const apiFetch = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const headers = new Headers(options.headers || {})

    //Define o Content-Type padrão para JSON se não for especificado
    if (!headers.has('Content-Type') && options.body) {
        headers.set('Content-Type', 'application/json')
    }

    if (token && endpoint !== '/auth/login') { //<-- Modificação aqui
        headers.set('Authorization', `Bearer ${token}`)
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
        })

        if (!response.ok) {
            const errorData: ApiError = await response.json()

            throw new Error(errorData.message || 'Erro na requisição à API')
        }

        if (response.status === 204) {
            return null as T
        }

        return (await response.json()) as T
    } catch (error) {
        console.error(`Falha na API: ${options.method || 'GET'} ${endpoint}`, error)
        throw error
    }
}