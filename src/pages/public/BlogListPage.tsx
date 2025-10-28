import { useState, useEffect } from 'react'
import { postService } from '@/services/postService'
import type { Post, Page } from '@/types/api'
import { PostCard } from '@/components/shared/PostCard' // Reutiliza o PostCard

export const BlogListPage = () => {
  // Estados para busca e exibição
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // TODO: Adicionar estados para paginação (currentPage, totalPages, etc.)

  // useEffect para buscar os posts publicados
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Busca a primeira página de posts publicados (ex: 12 posts por página)
        // Usamos getAllPublicPosts que já filtra por status 'PUBLISHED' no service
        const postsPage: Page<Post> = await postService.getAllPublicPosts({ page: 0, size: 12 }) 
        setPosts(postsPage.content)
        // TODO: Guardar informações de paginação (totalPages, etc.)
      } catch (err) {
        const apiErrorMessage = (err as Error).message
        setError(apiErrorMessage || 'Erro ao buscar os posts do blog.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, []) // Roda apenas na montagem

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Título da Página */}
      <h1 className="mb-10 border-b-2 border-accent-neon/40 pb-2 text-4xl font-extrabold text-text-dark transition-colors duration-500">
        Blog
      </h1>

      {/* Grid de Posts com Estados de Loading/Error */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && (
          // Exibe esqueletos (6 para um grid 3x2)
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-xl bg-secondary-bg shadow-lg">
              <div className="h-48 rounded-t-xl bg-secondary-bg/50"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 rounded bg-secondary-bg/50 w-1/4"></div>
                <div className="h-6 rounded bg-secondary-bg/50 w-3/4"></div>
                <div className="h-4 rounded bg-secondary-bg/50"></div>
                <div className="h-4 rounded bg-secondary-bg/50 w-5/6"></div>
                <div className="h-5 rounded bg-secondary-bg/50 w-1/3 mt-2"></div>
              </div>
            </div>
          ))
        )}

        {error && (
          <p className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-destructive">{error}</p>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <p className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-text-muted">Nenhum post publicado ainda.</p>
        )}
        
        {!isLoading && !error && posts.length > 0 && (
          // Mapeia os posts REAIS para o PostCard
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>

      {/* TODO: Adicionar Controles de Paginação aqui */}
    </div>
  )
}