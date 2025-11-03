import { ProjectCard, type Project } from "@/components/shared/ProjectCard";

//TODO: Fazer isso vir de uma API talvez possa ser melhor, mas por enquanto vamos de hardcoded pro MVP (que não sai nunca)
const myProjects: Project[] = [
  {
    title: 'Blog Pessoal Full-Stack (Este site!)',
    description: 
      'Uma API REST de blog completa com Spring Boot e um frontend reativo com React, Vite e Tailwind CSS, incluindo autenticação JWT e um painel de admin.',
    imageUrl: `https://placehold.co/600x400/1A112B/AC25E6?text=Blog+Full-Stack`, // TODO: Tirar um print do blog!
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Java 21',
      'Spring Boot',
      'MongoDB',
      'JWT',
      'Docker',
    ],
    githubUrl: 'https://github.com/Coronel-Marc/Personal-Blog',
    //demoUrl: '#',
  },
  /*{
    title: 'Meu Próximo Projeto Incrível',
    description:
      'Uma descrição envolvente sobre outro projeto que demonstra suas habilidades. Pode ser um app mobile, uma ferramenta de CLI, ou qualquer coisa que você tenha orgulho.',
    imageUrl: `https://placehold.co/600x400/1A112B/25C1AC?text=Projeto+Futuro`,
    techStack: ['Node.js', 'PostgreSQL', 'GraphQL'],
    githubUrl: 'https://github.com/Coronel-Marc',
    
  }*/
  // novos projetos aqui
]

export const PortfolioPage = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Título da Página */}
      <h1 className="mb-10 border-b-2 border-accent-neon/40 pb-2 text-4xl font-extrabold text-text-dark transition-colors duration-500">
        Portfólio de Projetos
      </h1>

      {/* 2. Grid para os ProjectCards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {myProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  )
}