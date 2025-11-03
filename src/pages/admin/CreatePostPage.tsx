/**
 * Página para criar um novo post.
 * Assim como eu fiz em DashboardPage e EditPostPage, vou comentar o que cada parte faz.
 * 
 * Componentes principais usados:
 * - PostForm: Componente reutilizável para o formulário de criação/edição de posts.
 * - Button: Botão estilizado para ações.
 * 
 * Estados principais:
 * - isSubmitting: Indica se o formulário está sendo submetido.
 * - submitError: Armazena mensagens de erro da API durante a criação.
 * - submitSuccessMessage: Armazena mensagens de sucesso após criar o post.
 * Funções principais:
 * - handleCreate: Função chamada ao submeter o formulário, que chama o serviço para criar o post via API.
 * Layout:
 * - Um título "Criar Novo Post".
 * - O componente PostForm, passando as props necessárias para criação.
 * 
 * TODOs futuros:
 * - Adicionar upload de imagem para coverImageUrl.
 * - Melhorar validação dos campos no PostForm.
 * 
 * Espero que esses comentários ajudem a entender o que cada parte faz!
 * Só queria ter um bloguinho pessoal...
*/

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postService } from '@/services/postService'
import type { PostPayload } from '@/types/api'
import { PostForm } from '@/components/shared/PostForm'

export const CreatePostPage = () => {
  const navigate = useNavigate()

  // Estados para controlar o processo de submissão
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState<string | null>(null)

  // Função que será passada como 'onSubmit' para o PostForm
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
        navigate('/admin')
      }, 1500)

    } catch (err) {
      const apiErrorMessage = (err as Error).message
      setSubmitError(apiErrorMessage || 'Erro ao criar o post. Tente novamente.')
      setIsSubmitting(false)
    } 
    // Sem setIsLoading(false) no 'finally' aqui, 
    // pois quero manter o botão desabilitado após o sucesso durante o redirecionamento.
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="mb-6 text-3xl font-bold">Criar Novo Post</h1>
      
      {/* Renderiza o PostForm, passando as props necessárias */}
      <PostForm 
        onSubmit={handleCreate} 
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccessMessage={submitSuccessMessage}
      />
    </div>
  )
}