import { apiFetch } from "@/lib/api"
import type { Post, PostPayload, Page } from "@/types/api"

/**
 * Serviço para gerenciar operações relacionadas a posts.
 */
export const postService = {
    /**
   * Cria um novo post na API.
   * Requer autenticação (o apiFetch anexa o token).
   * @param payload - Os dados do post a ser criado (título, conteúdo, etc.).
   * @returns Uma Promise com o objeto Post criado.
   */
  createPost: async (payload: PostPayload): Promise<Post> => {
    // Endpoint: POST /posts
    // Payload: PostCreateDTO (representado pelo nosso PostPayload)
    // Resposta: PostResponseDTO (representado pelo nosso Post)

    return apiFetch<Post>('/posts',{
        method: 'POST',
        body: JSON.stringify(payload),
    })
  },

  /**
   * Busca todos os posts públicos paginados.
   * Não requer autenticação.
   * @param pageable - Objeto com informações de paginação (page, size, sort).
   * @returns Uma Promise com a página de Posts.
   */
  getAllPublicPosts: async (pageable: { page?: number; size?: number /* Adicionar sort se necessário */} ={}): Promise<Page<Post>> => {
    // Endpoint: GET /posts
    const params = new URLSearchParams()
    if (pageable.page !== undefined) params.append('page', String(pageable.page))
    if (pageable.size !== undefined) params.append('size', String(pageable.size))
    // TODO: Adicionar lógica para sort se necessário
    const queryString = params.toString()
    return apiFetch<Page<Post>>(`/posts${queryString ? `?${queryString}` : ''}`, {
        method: 'GET',
    })
  },
  getAllAdminPosts: async (pageable: { page?: number; size?: number /* Adicionar sort? */ } = {}): Promise<Page<Post>> => {
    // Endpoint: GET /posts
    const params = new URLSearchParams()
    if (pageable.page !== undefined) params.append('page', String(pageable.page))
    if (pageable.size !== undefined) params.append('size', String(pageable.size))
    // TODO: Adicionar lógica para sort se necessário (ex: &sort=createdAt,desc)
    const queryString = params.toString()
    // A chamada é autenticada porque apiFetch anexa o token
    return apiFetch<Page<Post>>(`/posts${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
    })
  },

  /**
   * Busca um post público pelo seu slug.
   * Não requer autenticação.
   * @param slug - O slug do post.
   * @returns Uma Promise com o objeto Post encontrado.
   */
  getPostBySlug: async (slug: string): Promise<Post> => {
    // Endpoint: GET /posts/{slug}
    return apiFetch<Post>(`/posts/${slug}`,{
        method: 'GET',
    })
  },

  updatePost: async (id: string, payload: PostPayload): Promise<Post> => {
    // Endpoint: PUT /posts/{id}
    return apiFetch<Post>(`/posts/${id}`,{
        method: 'PUT',
        body: JSON.stringify(payload),
    })
  },

  deletePost: async (id: string): Promise<void> => {
    // Endpoint: DELETE /posts/{id}
    // A API retorna 204 No Content, o apiFetch retornará null
    await apiFetch<void>(`/posts/${id}`,{
        method: 'DELETE',
    })
  },
}