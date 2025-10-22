
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

export const PostStatus = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
} as const

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus]

export type PostPayload = {
    title: string
    content: string
    tags: string[]
    status: PostStatus
    // Atualizar o backend para suportar imagem de capa via URL ou upload
    coverImageUrl?: string | null
}

export interface Post {
    id: string
    title: string
    slug: string
    content: string
    status: PostStatus
    coverImageUrl: string | null // Atualizar o backend para suportar imagem de capa via URL ou upload
    tags: string[]
    authorName: string
    authorId: string
    createdAt: string // A API retorna Instant, que vira string no JSON
    modifiedAt?: string | null 
}

export interface Page<T> {
    content: T[]
    pageable: {
        pageNumber: number
        pageSize: number
        sort: {
            sorted: boolean
            unsorted: boolean
            empty: boolean
        }
        offset: number
        paged: boolean
        unpaged: boolean
    }
    totalPages: number
    totalElements: number
    last: boolean
    size: number
    number: number
    sort: {
        sorted: boolean
        unsorted: boolean
        empty: boolean
    }
    numberOfElements: number
    first: boolean
    empty: boolean
}