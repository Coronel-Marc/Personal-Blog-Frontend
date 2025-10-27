import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { postService } from '@/services/postService'
import type { Post } from '@/types/api'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Badge } from '@/components/ui/Badge'
import { CalendarDays, UserCircle } from 'lucide-react'

export const PostPage = () => {
  const { slug } = useParams<{ slug: string }>()

  // Estdos para buscar os dados
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Busca os dados do post quando o componente monta ou o slug muda
  useEffect(() => {
    // Verifica se o slug existe antes de buscar. Segurança extra, vai que...né
    if (!slug) {
      setError("Slug do post não fornecido na URL.")
      setIsLoading(false)
      return
    }

    const fetchPost = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await postService.getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        const apiErroMessage = (err as Error).message;
        setError(apiErroMessage || `Post "${slug}" não encontrado.`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  // Renderização Condicional
  if (isLoading) {
    //TODO: Criar um componente Skeleton/Loading mais elaborado
    return <div className='container mx-auto p-8 text-center text-text-muted'>Carregando post...</div>
  }
  if (error) {
    //TODO: Considerar redicionar para a pagina 404 se o erro for "Not found"
    return <div className='container mx-auto p-8 text-center text-destructive'>{error}</div>
  }

  // Se chegou aqui e post ainda é null (não deveria acontecer, mas por segurança)
  if (!post) {
    return <div className='container mx-auto p-8 text-center text-text-muted'>Post não encontrado.</div>
  }

  // Renderização do post
  // Placeholder da imagem se não tiver uma
  const imageUrl = post.coverImageUrl || `https://placehold.co/1200x500/1A112B/AC25E6?text=Pleice_Rouder`
  return (
    <article className='container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8'>
      {/* Imagem de Capa */}
      <img 
        src={imageUrl}
        alt={`Imagem de capa para ${post.title}`}
        className='mb-8 h-64 w-full rounded-lg object-cover shadow-lg md:h-96'
      />

      {/* Título principal */}
      <h1 className='mb-4 text-4xl font-extrabold text-text-dark transition-colors duration-500 md:text-5xl'>
        {post.title}
      </h1>

      {/* Metadados (Autor e tals...) */}
      <div className='mb-8 flex flex-wrap items-center space-x-4 text-sm text-text-muted transition-colors duration-500'>
        <div className='flex items-center'>
          <UserCircle className='mr-1.5 h-4 w-4' />
          <span>{post.authorName}</span>
        </div>
        <div className='flex items-center'>
          <CalendarDays className='mr-1.5 h-4 w-4' />
          {/* Formatação básica da data (Melhoria: date-fns) */}
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString('pt-BR', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </time>
        </div>
        {/* TODO: Adicionar Tempo de Leitura Estimado */}
      </div>

      {/* Conteúdo Markdown Renderizado */}
      {/* Adiciona classes CSS para estilizar o HTML gerado pelo Markdown */}

      <div className='prose prose-invert max-w-none 
                      prose-headings:text-text-dark prose-p:text-text-dark/90 
                      prose-a:text-accent-neon hover:prose-a:underline
                      prose-blockquote:border-accent-neon prose-blockquote:text-text-muted
                      prose-strong:text-text-dark 
                      prose-code:text-accent-neon prose-code:bg-secondary-bg prose-code:p-1 prose-code:rounded-md
                      prose-li:marker:text-accent-neon
                      dark:prose-headings:text-text-dark dark:prose-p:text-text-dark/90 
                      dark:prose-a:text-accent-neon dark:prose-blockquote:text-text-muted
                      dark:prose-strong:text-text-dark dark:prose-code:text-accent-neon 
                      dark:prose-li:marker:text-accent-neon
                      transition-colors duration-500'>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 border-t border-border pt-6">
          <h4 className="mb-3 text-lg font-semibold text-text-dark">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              // TODO: Criar rota /tags/:tagSlug para linkar
              <Link to={`/tags/${tag}`} key={tag}> 
                <Badge variant="secondary">{tag}</Badge> 
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* TODO: Adicionar Seção de Comentários aqui */}

    </article>
  )
}