import React, { useState, useEffect } from 'react'
import { PostStatus } from '@/types/api'
import type { PostPayload, Post } from '@/types/api'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { postService } from '@/services/postService'

// 1. Define as props do formulário
interface PostFormProps {
  initialData?: Post | null
  onSubmit: (payload: PostPayload) => Promise<void>
  isSubmitting: boolean
  submitError?: string | null
  submitSuccessMessage?: string | null
  submitButtonText?: string
  cancelButton?: React.ReactNode
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
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '')

  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImageUrl || '')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setContent(initialData.content)
      setStatus(initialData.status)
      setTags(initialData.tags?.join(', ') || '')
      setCoverImageUrl(initialData.coverImageUrl || '')
    } else {
       setTitle(''); setContent(''); setStatus(PostStatus.DRAFT); setTags(''); setCoverImageUrl('');
    }
    setSelectedFile(null)
    setUploadError(null)
    setIsUploading(false)
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploadError(null)

    let finalImageUrl = coverImageUrl

    if (selectedFile) {
      setIsUploading(true)
      try {
        const uploadResponse = await postService.uploadImage(selectedFile)
        finalImageUrl = uploadResponse.fileUrl
      } catch (err) {
        const apiErrorMessage = (err as Error).message
        setUploadError(apiErrorMessage || 'Falha no upload da imagem.')
        setIsUploading(false)
        return
      } finally {
        setIsUploading(false)
      }
    }
    // Monta o payload
    const payload: PostPayload = {
      title,
      content,
      status,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      coverImageUrl: finalImageUrl || null,
    }
    onSubmit(payload)
  }

  const isFormDisabled = isUploading || isSubmitting

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-secondary-bg p-6 content-panel transition-colors duration-500">
      {/* Mensagens de Feedback */}
      {submitError && ( <div className="rounded-md bg-destructive p-3 text-sm text-destructive-foreground">{submitError}</div> )}
      {uploadError && ( <div className="rounded-md bg-destructive p-3 text-sm text-destructive-foreground">{uploadError}</div> )}
      {submitSuccessMessage && ( <div className="rounded-md bg-green-600 p-3 text-sm text-white">{submitSuccessMessage}</div> )}

      {/* Campo Título */}
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-text-muted">Título</label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required disabled={isFormDisabled} />
      </div>

      {/* Campo Conteúdo (Markdown) */}
      <div>
        <label htmlFor="content" className="mb-2 block text-sm font-medium text-text-muted">Conteúdo (Markdown)</label>
        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={15} required disabled={isFormDisabled} />
      </div>

      {/* Campo de upload de imagem*/}
      <div>
        <label htmlFor="coverImageFile" className="mb-2 block text-sm font-medium text-text-muted">
          Imagem de Capa (Opcional)
        </label>
        <Input 
          id="coverImageFile" 
          type="file" 
          accept="image/png, image/jpeg, image/webp"
          onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)} 
          disabled={isFormDisabled}
          className="file:mr-4 file:rounded-md file:border-0 file:bg-primary file:py-2 file:px-4 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90" // Estilização do botão "Escolher arquivo"
        />
        {/* Mostra a imagem atual se não houver um novo arquivo selecionado */}
        {coverImageUrl && !selectedFile && (
          <div className="mt-4">
            <p className="text-xs text-text-muted">Imagem atual:</p>
            <img src={coverImageUrl} alt="Preview da capa atual" className="mt-2 h-32 w-auto rounded-md border border-border" />
          </div>
        )}
      </div>

      {/* Campo Tags */}
      <div>
        <label htmlFor="tags" className="mb-2 block text-sm font-medium text-text-muted">Tags (separadas por vírgula)</label>
        <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} disabled={isFormDisabled} />
      </div>
      
      {/* Campo Status */}
      <div>
        <label htmlFor="status" className="mb-2 block text-sm font-medium text-text-muted">Status</label>
        <Select id="status" value={status} onChange={(e) => setStatus(e.target.value as PostStatus)} required disabled={isFormDisabled}>
          {Object.entries(PostStatus).map(([key, value]) => ( <option key={value} value={value}>{key}</option>))}
        </Select>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-3">
        {/* Renderiza o botão de cancelar (passado como prop) */}
        {React.isValidElement(cancelButton) && React.cloneElement(cancelButton as React.ReactElement<any>, { disabled: isFormDisabled })}
        
        <Button type="submit" disabled={isFormDisabled}>
          {isUploading ? 'Enviando imagem...' : (isSubmitting ? 'Salvando...' : submitButtonText)}
        </Button>
      </div>
    </form>
  )
}