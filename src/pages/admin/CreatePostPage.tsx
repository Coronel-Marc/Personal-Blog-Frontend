import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Para redirecionar após sucesso
import { postService } from '@/services/postService'
import type { PostPayload } from '@/types/api'
import { PostForm } from '@/components/shared/PostForm' // 1. Importa o formulário

export const CreatePostPage = () => {
  const navigate = useNavigate() // Hook para navegação

  // Estados para controlar o processo de submissão
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState<string | null>(null)

  // 2. Função que será passada como 'onSubmit' para o PostForm
  const handleCreate = async (payload: PostPayload) => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccessMessage(null)

    try {
      // Chama o serviço para criar o post
      const newPost = await postService.createPost(payload)
      
      setSubmitSuccessMessage(`Post "${newPost.title}" criado com sucesso! Redirecionando...`)
      
      // Redireciona para o dashboard após um pequeno delay para mostrar a mensagem
      setTimeout(() => {
        navigate('/admin') // Volta para a lista de posts
      }, 1500) // Espera 1.5 segundos

    } catch (err) {
      const apiErrorMessage = (err as Error).message
      setSubmitError(apiErrorMessage || 'Erro ao criar o post. Tente novamente.')
      setIsSubmitting(false) // Permite tentar novamente em caso de erro
    } 
    // Não definimos setIsLoading(false) no 'finally' aqui, 
    // pois queremos manter o botão desabilitado após o sucesso durante o redirecionamento.
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="mb-6 text-3xl font-bold">Criar Novo Post</h1>
      
      {/* 3. Renderiza o PostForm, passando as props necessárias */}
      <PostForm 
        onSubmit={handleCreate} 
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccessMessage={submitSuccessMessage}
        // Não passamos initialData, pois é um post novo
      />
    </div>
  )
}