import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Post } from "@/types/api";

interface PostCardProps {
    post: Post
}

export const PostCard = ({ post }: PostCardProps) => {
    const category = post.tags?.[0] || 'Sem Categoria'

    // TODO: Melhorar a lógica de resumo
    const excerpt = post.content.substring(0, 100) + '...'

    // TODO: Usar uma imagem placeholder mais temática
    const imageUrl = post.coverImageUrl || `https://placehold.co/600x400/${
        '1A112B' // Cor escura placeholder
    }/${
        'AC25E6' // Cor neon placeholder
    }?text=Placeholder`

    return (
        <div className="overflow-hidden rounded-xl bg-secondary-bg shadow-lg shadow-accent-neon/10 transition duration-300 hover:-translate-y-1 hover:shadow-accent-neon/30">
            {/* Imagem de Capa */}
            <Link to={`/post/${post.slug}`} aria-label={`Ler post: ${post.title}`}>
                <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url('${imageUrl}')` }}
                />            
            </Link>

            {/* Conteúdo do Card */}
            <div className="p-6">
                {/** Categoria (Tag) */}
                {category && (
                    <p className="mb-2 text-sm font-semibold uppercase text-accent-neon transition-colors duration-500">
                        {category}
                    </p>
                )}

                {/* Título (Linkado) */}
                <h3 className="mb-3 text-2xl font-bold text-text-dark transition-colors duration-500">
                    <Link to={`/post/${post.slug}`} className="hover:underline">
                        {post.title}
                    </Link>
                </h3>

                {/* Resumo */}
                <p className="mb-4 text-sm text-text-muted transition-colors duration-500">
                    {excerpt}
                </p>

                {/* Link "Ler Mais" */}
                <Link 
                    to={`/post/${post.slug}`} 
                    className="inline-flex items-center font-bold text-accent-neon transition-colors duration-500 hover:underline"
                >
                    Ler Mais
                    <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
            </div>  
        </div>
    )
}

