/**
 * Tô me perdendo demais com esse DashboardPage, então vou comentar (se eu me lembrar e se a IA me ajudar) o que cada parte faz.
 * 
 * Essa página lista os posts criados, permitindo editar ou excluir cada um.
 * Usa o postService para buscar, editar e excluir posts via API. Conforme eu for me lembrando ou fazendo alteraçõces, vou comentando aqui.
 * 
 * Componentes principais usados:
 * - Table, TableRow, TableCell: Para mostrar a lista de posts em tabela.
 * - Badge: Para indicar o status do post (Publicado/Rascunho).
 * - AlertDialog: Para confirmar exclusão de posts.
 * - Button: Botões estilizados para ações.
 * 
 * Estados principais:
 * - posts: Array dos posts buscados da API.
 * - isLoadingPosts: Indica se os posts estão sendo carregados.
 * - postsError: Armazena erros ao buscar posts.
 * - isDeleteDialogOpen, postToDelete: Controlam o diálogo de confirmação de exclusão.
 * 
 * Efeitos:
 * - useEffect na montagem para buscar os posts via postService.getAllAdminPosts().
 * 
 * Funções principais:
 * - handleEditPost: Navega para a página de edição do post.
 * - openDeleteConfirmation: Abre o diálogo de confirmação para excluir um post.
 * - confirmDeletePost: Chama o serviço para excluir o post e atualiza a lista.
 * - closeDeleteDialog: Fecha o diálogo de exclusão.
 * 
 * O layout geral é uma tabela com os posts, botões para editar/excluir, e um diálogo de confirmação para exclusão.
 * 
 * TODOs futuros:
 * - Adicionar paginação se houver muitos posts.
 * - Melhorar a UI para dispositivos móveis (ex: cards ao invés de tabela).
 * - Adicionar filtros ou busca na lista de posts.
 * 
 * Espero que esses comentários ajudem a entender o que cada parte faz!
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { postService } from '@/services/postService'
import { PostStatus } from '@/types/api'
import type { Post, Page } from '@/types/api'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Pencil, Trash2, Plus } from 'lucide-react'

export const DashboardPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

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
        const postsPage: Page<Post> = await postService.getAllAdminPosts({ page: 0, size: 10 /*Ajustar se necessário, ou se quiser. Tanto faz*/ })
        console.log(postsPage) // Log aqui
        setPosts(postsPage.content)
      } catch (err) { /* ... tratamento de erro ... */ 
          const apiErrorMessage = (err as Error).message
          setPostsError(apiErrorMessage || 'Erro ao buscar os posts.')
      } finally { setIsLoadingPosts(false) }
    }
    fetchPosts()
  }, [])

  const handleEditPost = (slug: string) => {
    navigate(`/admin/posts/editar/${slug}`)
  }

  const openDeleteConfirmation = (post: Post) => {
    setPostToDelete(post)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeletePost = async () => {
    if (!postToDelete) return
    setIsLoadingPosts(true) 
    setPostsError(null); // Limpa erros anteriores eu acho
    try {
      await postService.deletePost(postToDelete.id)
      setPosts(prevPosts => prevPosts.filter(p => p.id !== postToDelete.id))
    } catch (err) { 
        const apiErrorMessage = (err as Error).message
        setPostsError(apiErrorMessage || `Erro ao excluir o post ${postToDelete.title}.`)
    } finally {
      setIsLoadingPosts(false)
      closeDeleteDialog()
    }
  }

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setPostToDelete(null)
  }
  // ------------------------------------------

  return (
    <div className="container mx-auto p-4 md:p-8 relative">
      {/* Comentando isso aqui pq ficou feio
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <ThemeToggle />
      </div>
      
      */}

      <section>
        <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h2 className="text-3xl font-bold text-text-dark mb-4 md:mb-0">
            Gerenciar Posts ({posts.length})
          </h2>
          <Button 
            onClick={() => navigate('/admin/posts/novo')}
            className="flex items-center space-x-2 neon-glow-button uppercase tracking-widest hover:scale-[1.02]"
            // size="lg" É opçional, o padrão já é bom. Mas se quiser um botãozão, só descomentar
          >
            <Plus className="h-5 w-5" />
            <span>Criar Novo Post</span>
          </Button>
        </div>
        {/* -------------------------------------------------------- */}


        {/* Container da Lista  */}
        <div className="rounded-xl bg-secondary-bg p-4 content-panel transition-colors duration-500">
          {/* Estados de Loading/Error/No Posts  */}
          {isLoadingPosts && <p className="text-center text-text-muted py-4">Carregando posts...</p>}
          {postsError && <p className="text-center text-destructive py-4">{postsError}</p>}
          {!isLoadingPosts && !postsError && posts.length === 0 && (
            <p className="text-center text-text-muted py-4">Nenhum post criado ainda.</p>
          )}

          {/* Tabela */}
          {!isLoadingPosts && !postsError && posts.length > 0 && (
            <div className="hidden md:block"> 
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Título</TableHead>
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
                        {new Date(post.createdAt).toLocaleDateString('pt-BR')} 
                      </TableCell> {/** */}
                      <TableCell>
                        <Badge 
                          variant={
                            post.status === PostStatus.PUBLISHED 
                              ? 'success' 
                              : post.status === PostStatus.ARCHIVED
                              ? 'destructive' 
                              : 'warning'
                          }>
                          {post.status === PostStatus.PUBLISHED 
                            ? 'Publicado' 
                            : post.status === PostStatus.ARCHIVED
                            ? 'Arquivado'
                            : 'Rascunho'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditPost(post.slug)} className="text-accent-neon hover:text-accent-neon/80" aria-label={`Editar post ${post.title}`}> <Pencil className="h-5 w-5" /> </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteConfirmation(post)} className="text-danger-red hover:text-danger-red/80" aria-label={`Excluir post ${post.title}`}> <Trash2 className="h-5 w-5" /> </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {/* TODO: Adicionar a renderização dos Cards para mobile aqui */}
        </div>
      </section>

      {/* AlertDialog*/}
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