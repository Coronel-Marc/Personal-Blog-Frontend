import React, { useState, useEffect } from 'react'
import { PostStatus } from '@/types/api'
import type { PostPayload, Post } from '@/types/api' // Importa Post também
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

// 1. Define as props do formulário
interface PostFormProps {
  initialData?: Post | null // Dados iniciais para pré-preencher (edição)
  onSubmit: (payload: PostPayload) => Promise<void> // Função chamada ao submeter
  isSubmitting: boolean // Estado de carregamento vindo do pai
  submitError?: string | null // Erro vindo do pai
  submitSuccessMessage?: string | null // Mensagem de sucesso vindo do pai
  submitButtonText?: string // Texto do botão (ex: 'Salvar Post', 'Atualizar Post')
  cancelButton?: React.ReactNode // Botão de cancelar opcional (para edição)
}

export const PostForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitError,
  submitSuccessMessage,
  submitButtonText = 'Salvar Post',
  cancelButton,
}: PostFormProps) => {
  // Estados locais para os campos (inicializados com initialData se existir)
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [status, setStatus] = useState<PostStatus>(initialData?.status || PostStatus.DRAFT)
  // Converte array de tags de volta para string para o input
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '')
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImageUrl || '')

  // 2. Efeito para atualizar o formulário se initialData mudar (importante para edição)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setContent(initialData.content)
      setStatus(initialData.status)
      setTags(initialData.tags?.join(', ') || '')
      setCoverImageUrl(initialData.coverImageUrl || '')
    } else {
      // Se não houver initialData (modo criação), reseta os campos
      // Isso é útil se o mesmo componente for reusado sem desmontar
       setTitle(''); setContent(''); setStatus(PostStatus.DRAFT); setTags(''); setCoverImageUrl('');
    }
  }, [initialData]) // Roda sempre que initialData mudar

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Monta o payload
    const payload: PostPayload = {
      title,
      content,
      status,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      coverImageUrl: coverImageUrl || null,
    }
    // Chama a função onSubmit passada pelo componente pai
    onSubmit(payload)
  }

  return (
    // O JSX do formulário é praticamente o mesmo que estava no DashboardPage
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-secondary-bg p-6 content-panel transition-colors duration-500">
      {/* Mensagens de Feedback (agora vêm das props) */}
      {submitError && ( <div className="rounded-md bg-destructive p-3 text-sm text-destructive-foreground">{submitError}</div> )}
      {submitSuccessMessage && ( <div className="rounded-md bg-green-600 p-3 text-sm text-white">{submitSuccessMessage}</div> )}

      {/* Campo Título */}
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-text-muted">Título</label> {/* Corrigido para text-muted */}
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required disabled={isSubmitting} />
      </div>

      {/* Campo Conteúdo (Markdown) */}
      <div>
        <label htmlFor="content" className="mb-2 block text-sm font-medium text-text-muted">Conteúdo (Markdown)</label> {/* Corrigido para text-muted */}
        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={15} required disabled={isSubmitting} /> {/* Aumentei rows */}
      </div>

      {/* Campo URL da Imagem de Capa (MVP) */}
      <div>
        <label htmlFor="coverImageUrl" className="mb-2 block text-sm font-medium text-text-muted">URL da Imagem de Capa (Opcional)</label> {/* Corrigido para text-muted */}
        <Input id="coverImageUrl" type="url" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} disabled={isSubmitting} />
      </div>

      {/* Campo Tags */}
      <div>
        <label htmlFor="tags" className="mb-2 block text-sm font-medium text-text-muted">Tags (separadas por vírgula)</label> {/* Corrigido para text-muted */}
        <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} disabled={isSubmitting} />
      </div>
      
      {/* Campo Status */}
      <div>
        <label htmlFor="status" className="mb-2 block text-sm font-medium text-text-muted">Status</label> {/* Corrigido para text-muted */}
        <Select id="status" value={status} onChange={(e) => setStatus(e.target.value as PostStatus)} required disabled={isSubmitting}>
          {Object.entries(PostStatus).map(([key, value]) => ( <option key={value} value={value}>{key}</option> ))}
        </Select>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-3">
        {/* Renderiza o botão de cancelar se ele for passado */}
        {cancelButton} 
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : submitButtonText}
        </Button>
      </div>
    </form>
  )
}