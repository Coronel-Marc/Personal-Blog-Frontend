import { HeroSection } from '@/components/shared/HeroSection'
import { PostCard } from '@/components/shared/PostCard'
import type { Post, PostStatus } from '@/types/api'

// Criação de dados mockados para testes
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'A Nostalgia da Interceptor 650: Neon e Cromo',
    slug: 'nostalgia-interceptor-650-neon-cromo',
    content: 'Por que a Royal Enfield domina o cenário retro e como ela se encaixa perfeitamente na vibe synthwave. Este texto é um pouco mais longo para simular um resumo...',
    status: 'PUBLISHED' as PostStatus, // Precisamos fazer a asserção de tipo aqui
    coverImageUrl: 'https://placehold.co/600x400/AC25E6/1A112B?text=Royal+Interceptor+650',
    tags: ['Motos Clássicas', 'Royal Enfield', 'Synthwave'],
    authorName: 'Marcos Gabriel',
    authorId: 'admin-id',
    createdAt: '2025-10-22T10:00:00Z', // Formato ISO 8601 string
  },
  {
    id: '2',
    title: 'Guia Essencial do Synthwave: Música e Estilo',
    slug: 'guia-essencial-synthwave-musica-estilo',
    content: 'Da trilha sonora aos visuais icônicos, mergulhe de cabeça no movimento retrô. Explorando artistas como The Midnight, Gunship e mais...',
    status: 'PUBLISHED' as PostStatus,
    coverImageUrl: 'https://placehold.co/600x400/25C1AC/1A112B?text=Synthwave+Cityscape',
    tags: ['Cultura Pop', 'Música', 'Retrowave'],
    authorName: 'Marcos Gabriel',
    authorId: 'admin-id',
    createdAt: '2025-10-20T14:30:00Z',
  },
  {
    id: '3',
    title: 'Top 5 Carros Esportivos dos Anos 80',
    slug: 'top-5-carros-esportivos-anos-80',
    content: 'Modelos que definiram uma era de velocidade, design angular e nostalgia pura. De Lorean, Ferrari Testarossa, e outros ícones...',
    status: 'PUBLISHED' as PostStatus,
    coverImageUrl: 'https://placehold.co/600x400/E62547/1A112B?text=Carros+Esportivos+80s',
    tags: ['Automotivo', 'Anos 80', 'Nostalgia'],
    authorName: 'Marcos Gabriel',
    authorId: 'admin-id',
    createdAt: '2025-10-18T09:15:00Z',
  },
]

export const HomePage = () => {
  return (
    <div>
      <HeroSection />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-10 border-b-2 border-accent-neon/40 pb-2 text-4xl font-extrabold text-text-dark transition-colors duration-500">
          Posts Recentes
        </h2>
        {/** TODO: Adicionar o grid com os PostCards aqui */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  )
}