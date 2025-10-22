import { useState } from 'react'
import { postService } from '@/services/postService'
import { PostStatus } from '@/types/api'
import type { PostPayload } from '@/types/api'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export const DashboardPage = () => {
  const { user } = useAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('') 
  const [status, setStatus] = useState<PostStatus>(PostStatus.DRAFT) 
  const [tags, setTags] = useState('') 
  const [coverImageUrl, setCoverImageUrl] = useState('') 
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
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
    } catch (err) { /* ... tratamento de erro ... */ 
      const apiErrorMessage = (err as Error).message
      setError(apiErrorMessage || 'Erro ao criar o post. Tente novamente.')
    } finally { setIsLoading(false) }
  }
  // --- Fim da lógica do formulário ---

  return (
    <div className="container mx-auto p-4 md:p-8 relative"> 
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <ThemeToggle />
      </div>

      <h1 className="mb-6 text-3xl font-bold">
        Novo Post (Bem-vindo, {user?.name || 'Admin'}!)
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mensagens de Feedback */}
        {error && ( /* ... div de erro ... */ 
            <div className="rounded-md bg-destructive p-3 text-sm text-destructive-foreground">{error}</div>
        )}
        {successMessage && ( /* ... div de sucesso ... */ 
             <div className="rounded-md bg-green-600 p-3 text-sm text-white">{successMessage}</div>
        )}

        <div> 
           <label htmlFor="title" className="mb-2 block text-sm font-medium">Título</label>
           <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título incrível do seu post" required disabled={isLoading} />
        </div>

        {/* Campo Conteúdo (Markdown) */}
        <div> {/* ... label e <Textarea id="content"... /> ... */}
           <label htmlFor="content" className="mb-2 block text-sm font-medium">Conteúdo (Markdown)</label>
           <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escreva seu post aqui usando Markdown..." rows={10} required disabled={isLoading} />
        </div>
        
        {/* Campo URL da Imagem de Capa (MVP) */}
        <div> {/* ... label e <Input id="coverImageUrl"... /> ... */}
             <label htmlFor="coverImageUrl" className="mb-2 block text-sm font-medium">URL da Imagem de Capa (Opcional)</label>
             <Input id="coverImageUrl" type="url" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} placeholder="https://exemplo.com/imagem.jpg" disabled={isLoading} />
        </div>

        {/* Campo Tags */}
        <div> {/* ... label e <Input id="tags"... /> ... */}
             <label htmlFor="tags" className="mb-2 block text-sm font-medium">Tags (separadas por vírgula)</label>
             <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, Spring Boot, Carreira" disabled={isLoading} />
        </div>
        
        {/* Campo Status */}
        <div> {/* ... label e <Select id="status"... /> ... */}
             <label htmlFor="status" className="mb-2 block text-sm font-medium">Status</label>
             <Select id="status" value={status} onChange={(e) => setStatus(e.target.value as PostStatus)} required disabled={isLoading}>
                 {Object.entries(PostStatus).map(([key, value]) => ( <option key={value} value={value}>{key}</option> ))}
             </Select>
        </div>

        {/* Botão de Submissão */}
        <div className="flex justify-end"> {/* ... <Button type="submit"... /> ... */
             <Button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar Post'}</Button>
        }</div>
      </form>
    </div>
  )
}