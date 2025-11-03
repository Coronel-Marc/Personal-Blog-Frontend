import { Github, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export interface Project {
  title: string
  description: string
  imageUrl: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string // Opcional
}

interface ProjectCardProps {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, imageUrl, techStack, githubUrl, demoUrl } = project

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-secondary-bg shadow-lg shadow-accent-neon/10 transition duration-300 hover:-translate-y-1 hover:shadow-accent-neon/30">
      {/* Imagem de Capa */}
      <a
        href={demoUrl || githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver projeto: ${title}`}
      >
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      </a>

      {/* Conteúdo do Card */}
      <div className="flex flex-grow flex-col p-6">
        {/* Título */}
        <h3 className="mb-3 text-2xl font-bold text-text-dark transition-colors duration-500">
          {title}
        </h3>

        {/* Descrição */}
        <p className="mb-4 flex-grow text-sm text-text-muted transition-colors duration-500">
          {description}
        </p>

        {/* Seção da Tech Stack */}
        <div className="mb-6">
          <h4 className="mb-2 text-xs font-semibold uppercase text-text-muted">
            Tecnologias Utilizadas
          </h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Links de Ação */}
        <div className="flex space-x-4">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Github className="h-4 w-4" /> GitHub
            </Button>
          </a>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" /> Ver Demo
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}