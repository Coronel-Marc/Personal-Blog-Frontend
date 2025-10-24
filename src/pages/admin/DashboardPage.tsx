import { useState, useEffect } from 'react'
import { postService } from '@/services/postService'
import { PostStatus } from '@/types/api'
import type { PostPayload, Post, Page } from '@/types/api'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Badge } from '@/components/ui/Badge'
import { AlertDialog } from '@/components/ui/AlertDialog'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table'

import { Pencil, Trash2 } from 'lucide-react'

// import { Badge } from '@/components/ui/Badge'

export const DashboardPage = () => {
  const { user } = useAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('') 
  const [status, setStatus] = useState<PostStatus>(PostStatus.DRAFT) 
  const [tags, setTags] = useState('') 
  const [coverImageUrl, setCoverImageUrl] = useState('') 
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [posts, setPosts] = useState<Post[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState<string | null>(null)

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoadingPosts(true)
      setPostsError(null)
      try {
        // Chama o serviço para buscar posts (página 0, tamanho 10 por padrão)
        const postsPage: Page<Post> = await postService.getAllAdminPosts({ page: 0, size: 10 })
        setPosts(postsPage.content) // Guarda apenas o array de posts
      } catch (err) {
        const apiErrorMessage = (err as Error).message
        setPostsError(apiErrorMessage || 'Erro ao buscar os posts.')
      } finally {
        setIsLoadingPosts(false)
      }
    }

    fetchPosts()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)
    setSuccessMessage(null)
    // LEMBRETE: Atualizar o backend PostCreateDTO para aceitar coverImageUrl
    const payload: PostPayload = { /* ... payload ... */ 
        title, content, status, 
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        coverImageUrl: coverImageUrl || null,
    }
    try {
      const newPost = await postService.createPost(payload)
      setSuccessMessage(`Post "${newPost.title}" criado com sucesso!`)
      // Limpa formulário
       setTitle(''); setContent(''); setStatus(PostStatus.DRAFT); setTags(''); setCoverImageUrl('');
       setPosts(prevPosts => [newPost, ...prevPosts])
    } catch (err) { /* ... tratamento de erro ... */ 
      const apiErrorMessage = (err as Error).message
      setFormError(apiErrorMessage || 'Erro ao criar o post. Tente novamente.')
    } finally { setIsSubmitting(false) }
  }

  const openDeleteConfirmation = (post: Post) => {
    setPostToDelete(post) // Guarda o post
    setIsDeleteDialogOpen(true) // Abre o modal
  }

  const confirmDeletePost = async () => {
    if (!postToDelete) return // Segurança extra

    try {
      setIsLoadingPosts(true) 
      await postService.deletePost(postToDelete.id) 
      setPosts(prevPosts => prevPosts.filter(p => p.id !== postToDelete.id))
      // setSuccessMessage(`Post "${postToDelete.title}" excluído com sucesso.`); // Mensagem opcional
    } catch (err) {
      const apiErrorMessage = (err as Error).message
      // Mostra o erro no estado de erro da lista por enquanto
      setPostsError(apiErrorMessage || `Erro ao excluir o post ${postToDelete.title}.`) 
    } finally {
      setIsLoadingPosts(false)
      closeDeleteDialog() // Fecha o modal independentemente do resultado
    }
  }

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setPostToDelete(null)
  }

  const handleEditPost = (postId: string) => {
    alert(`TODO: Implementar edição para Post ID: ${postId}`)
    //openDeleteConfirmation(posts.find(p => p.id === postId)!, true);
  }

  const handleDeletePost = async (postId: string) => {
    if (window.confirm(`Tem certeza que deseja deletar o post ID ${postId}? Esta ação não pode ser desfeita.`)) {
      try{
        setIsLoadingPosts(true)
        await postService.deletePost(postId)
        // Remove o post da lista localmente após sucesso
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
        setSuccessMessage(`Post ID ${postId} excluído com sucesso.`)
      } catch (err) {
        const apiErrorMessage = (err as Error).message
        setPostsError(apiErrorMessage || `Erro ao deletar o post ID ${postId}.`)
      } finally {
        setIsLoadingPosts(false)
      }
    }
  }
  // --- Fim da lógica do formulário ---

  return (
    <div className="container mx-auto p-4 md:p-8 relative"> 
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <ThemeToggle />
      </div>

      <section className="mb-12">
            <h1 className="mb-6 text-3xl font-bold">Novo Post (Bem-vindo, {user?.name || 'Admin'}!)</h1>
            <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-secondary-bg p-6 content-panel transition-colors duration-500">
                {/* ... (mensagens de feedback e campos do formulário) ... */}
                 {formError && ( <div className="rounded-md bg-destructive p-3 text-sm text-destructive-foreground">{formError}</div> )}
                 {successMessage && ( <div className="rounded-md bg-green-600 p-3 text-sm text-white">{successMessage}</div> )}
                 <div><label htmlFor="title">Título</label><Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required disabled={isSubmitting} /></div>
                 <div><label htmlFor="content">Conteúdo (Markdown)</label><Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={10} required disabled={isSubmitting} /></div>
                 <div><label htmlFor="coverImageUrl">URL da Imagem de Capa (Opcional)</label><Input id="coverImageUrl" type="url" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} disabled={isSubmitting} /></div>
                 <div><label htmlFor="tags">Tags (separadas por vírgula)</label><Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} disabled={isSubmitting} /></div>
                 <div><label htmlFor="status">Status</label><Select id="status" value={status} onChange={(e) => setStatus(e.target.value as PostStatus)} required disabled={isSubmitting}>{Object.entries(PostStatus).map(([key, value]) => ( <option key={value} value={value}>{key}</option> ))}</Select></div>
                 <div className="flex justify-end"><Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar Post'}</Button></div>
            </form>
       </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-text-dark">Posts Existentes ({posts.length})</h2>
            {/* TODO: Adicionar filtros ou paginação aqui */}
        </div>

        {/* Container da Lista */}
        <div className="rounded-xl bg-secondary-bg p-4 content-panel transition-colors duration-500">
          {isLoadingPosts && <p className="text-center text-text-muted py-4">Carregando posts...</p>}
          {postsError && <p className="text-center text-destructive py-4">{postsError}</p>}
          {!isLoadingPosts && !postsError && posts.length === 0 && (
            <p className="text-center text-text-muted py-4">Nenhum post encontrado.</p>
          )}

          {/* Renderiza a tabela APENAS se houver posts e não estiver carregando/erro */}
          {!isLoadingPosts && !postsError && posts.length > 0 && (
            // A tabela só será visível em 'md' para cima, como no protótipo
            <div className="hidden md:block"> 
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* Colunas baseadas no protótipo */}
                    <TableHead className="w-[40%]">Título</TableHead> {/* Ajuste a largura conforme necessário */}
                    <TableHead>Data Criação</TableHead> 
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell className="text-text-muted">
                        {/* Formatação simples da data (Melhoria Futura: date-fns) */}
                        {new Date(post.createdAt).toLocaleDateString('pt-BR')} 
                      </TableCell>
                      <TableCell>
                        <Badge variant={post.status === PostStatus.PUBLISHED ? 'success' : 'warning'}>
                          {post.status === PostStatus.PUBLISHED ? 'Publicado' : 'Rascunho'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {/* Botões de Ação */}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditPost(post.id)}
                          className="text-accent-neon hover:text-accent-neon/80"
                          aria-label={`Editar post ${post.title}`}
                        >
                          <Pencil className="h-5 w-5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => openDeleteConfirmation(post)}
                          className="text-danger-red hover:text-danger-red/80"
                          aria-label={`Excluir post ${post.title}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* TODO: Adicionar a renderização dos Cards para mobile aqui */}
          {/* <div className="md:hidden space-y-4"> ... </div> */}

        </div>
      </section>

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDeletePost}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir permanentemente o post "${postToDelete?.title || ''}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir Permanentemente"
        cancelText="Cancelar"
      />
    </div>
  )
}