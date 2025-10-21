
export const Role = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER',
} as const

export type Role = typeof Role[keyof typeof Role]

export interface User {
    id: string
    name: string
    email: string
    profileImageUrl: string | null
    roles: Role[]
}

export type LoginPayload = {
    email: string
    password: string
}

export type LoginResponse = {
    token: string
}

export interface DecodedToken {
    sub: string
    roles: Role[]
    name: string
    exp: number
    iat: number
}