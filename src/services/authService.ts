import { apiFetch } from "@/lib/api"
import type { LoginPayload, LoginResponse } from "@/types/api"

/**
 * Serviço responsável pelas chamadas de autenticação.
 */

export const authService = {

    login: async (credentials: LoginPayload): Promise<LoginResponse> => {
        return apiFetch<LoginResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        })
    },

    // TODO: Futuramente, adicionar chamadas como:
  // register: async (...) => { ... },
  // refreshToken: async () => { ... },
}

