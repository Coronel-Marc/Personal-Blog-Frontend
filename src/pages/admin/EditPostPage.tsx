import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { postService } from '@/services/postService'
import type { PostPayload, Post } from '@/types/api'
import { PostForm } from '@/components/shared/PostForm'
import { Button } from '@/components/ui/Button' // Para o botão Cancelar

export const EditPostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  // Estados para buscar os dados do post
  const [postData, setPostData] = useState<Post | null>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  // Estados para o processo de atualização (passados para o PostForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState<string | null>(null)

  // Busca os dados do post quando o componente monta ou o slug muda
  useEffect(() => {
    if (!slug) {
        setFetchError("Slug do post inválido.");
        setIsLoadingData(false);
        return;
    };

    const fetchPost = async () => {
      setIsLoadingData(true)
      setFetchError(null)
      try {
        // Usa a função getPostBySlug do serviço
        const data = await postService.getPostBySlug(slug)
        setPostData(data)
      } catch (err) {
        const apiErrorMessage = (err as Error).message
        // Sua API retorna 404 se não encontrar
        setFetchError(apiErrorMessage || `Post com slug "${slug}" não encontrado.`)
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchPost()
  }, [slug]) // Dependência: re-busca se o slug na URL mudar

  // Função passada para o onSubmit do PostForm
  const handleUpdate = async (payload: PostPayload) => {
    // Precisamos do ID do post para a chamada de update
    if (!postData?.id) {
        setSubmitError("Erro interno: ID do post não encontrado para atualização.");
        return;
    }

    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccessMessage(null)

    try {
      // Chama a função updatePost do serviço
      const updatedPost = await postService.updatePost(postData.id, payload)
      
      setSubmitSuccessMessage(`Post "${updatedPost.title}" atualizado com sucesso! Redirecionando...`)
      setPostData(updatedPost); // Atualiza os dados locais com a resposta da API

      // Redireciona para o dashboard após um delay
      setTimeout(() => {
        navigate('/admin')
      }, 1500)

    } catch (err) {
      const apiErrorMessage = (err as Error).message
      setSubmitError(apiErrorMessage || 'Erro ao atualizar o post. Tente novamente.')
      setIsSubmitting(false) 
    }
    // Não colocar finally aqui pelo mesmo motivo da CreatePostPage
  }

  // Botão Cancelar
  const cancelButton = (
    <Button 
      type="button" // Importante: type="button" para não submeter o form
      variant="outline" 
      onClick={() => navigate('/admin')} // Volta para o dashboard
      disabled={isSubmitting} // Desabilita durante a submissão
    >
      Cancelar
    </Button>
  )

  // --- Renderização Condicional ---
  if (isLoadingData) {
    return <div className="container mx-auto p-8 text-center text-text-muted">Carregando dados do post...</div>
  }

  if (fetchError) {
    return <div className="container mx-auto p-8 text-center text-destructive">{fetchError}</div>
  }

  if (!postData) {
      // Segurança extra, caso postData seja null mesmo sem erro (não deve acontecer)
      return <div className="container mx-auto p-8 text-center text-text-muted">Post não encontrado.</div>
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="mb-6 text-3xl font-bold">Editar Post</h1>
      
      {/* Renderiza o PostForm passando os dados e funções */}
      <PostForm 
        initialData={postData} // Passa os dados buscados
        onSubmit={handleUpdate} // Passa a função de update
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccessMessage={submitSuccessMessage}
        submitButtonText="Atualizar Post" // Texto customizado para o botão
        cancelButton={cancelButton} // Passa o botão Cancelar
      />
    </div>
  )
}