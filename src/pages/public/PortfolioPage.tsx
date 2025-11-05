import { ProjectCard, type Project } from "@/components/shared/ProjectCard";

//TODO: Fazer isso vir de uma API talvez possa ser melhor, mas por enquanto vamos de hardcoded pro MVP (que não sai nunca)
const myProjects: Project[] = [
  {
    title: 'API Blog pessoal (A API deste site!)',
    description: 
      'Uma API REST de blog completa com Spring Boot, incluindo autenticação JWT e uma área de admin.',
    imageUrl: `https://placehold.co/600x400/1A112B/AC25E6?text=Blog+API-REST`, // TODO: Tirar um print do blog!
    techStack: [
      'Java 21',
      'Spring Boot',
      'MongoDB',
      'JWT',
      'Docker',
    ],
    githubUrl: 'https://github.com/Coronel-Marc/Personal-Blog',
    //demoUrl: '#',
  },
  {
    title: 'Frontend Blog pessoal (Este site!)',
    description:
      'Um frontend reativo com React, Vite, Tailwind CSS e um painel admin.',
    imageUrl: `https://placehold.co/600x400/1A112B/25C1AC?text=Blog+Frontend`,
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/Coronel-Marc/Personal-Blog-Frontend',
    
  }
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