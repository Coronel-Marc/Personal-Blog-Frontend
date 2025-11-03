import { HeroSection } from '@/components/shared/HeroSection'
import { PostCard } from '@/components/shared/PostCard'
import type { Post,Page } from '@/types/api'
import { useState, useEffect } from 'react'
import { postService } from '@/services/postService'


export const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isloading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  //TODO: Adicionar estados para paginação no futuro
  // -----------------------------------------------

  // useEffect para buscar os posts
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const postsPage: Page<Post> = await postService.getAllPublicPosts({ page: 0, size: 6 })
        setPosts(postsPage.content)
      } catch (err) {
        const apiErrorMessage = (err as Error).message
        setError(apiErrorMessage || 'Erro ao buscar posts.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div>
      <HeroSection />

      <main className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <h2 className='mb-10 border-b-2 border-accent-neon/40 pb-2 text-4xl font-extrabold text-text-dark transition-colors duration-500'>
          Posts Recentes
        </h2>
        {/** TODO: Adicionar o grid com os PostCards aqui */}
        {/*Renderização Condicional (Loading/Error/Grid) */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {isloading && (
            //TODO: Criar um component SkeletonCard reutilizável
            Array.from({ length: 3 }).map((_, index) =>(
              <div key={index} className='animate-pulse rounded-xl bg-secondary-bg shadow-lg'>
                <div className='h-48 rounded-t-xl bg-secondary-bg/50'></div>
                <div className='p-6 space-y-4'>
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
            <p className='col-span-1 md:col-span-2 lg:col-span-3 text-center text-destructive'>{error}</p>
          )}
          {!isloading && !error && posts.length === 0 && (
            <p className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-text-muted">Nenhum post publicado ainda.</p>
          )}
          {!isloading && !error && posts.length > 0 && (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
        {/* TODO: Adicionar Controles de Paginação aqui */}
      </main>
    </div>
  )
}