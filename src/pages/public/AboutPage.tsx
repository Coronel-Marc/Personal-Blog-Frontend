import { Github, Linkedin } from 'lucide-react' // Substituir quando assim que possíve. Versão depreciada vai ser removida na v1.0
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export const AboutPage = () => {
  //TODO: Substituir pela minha foto
  const profileImageUrl = `https://placehold.co/400x400/${'1A112B'}/${'AC25E6'}?text=Sua+Foto`

  const GITHUB_URL = 'https://github.com/Coronel-Marc'
  const LINKEDIN_URL = 'https://www.linkedin.com/in/g-marcos/'
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
      {/* Grid responsivo: 1 coluna no mobile, 3 colunas no desktop */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {/* Coluna 1: Foto (ocupa 1 de 3 colunas no desktop) */}
        <div className="flex justify-center md:justify-start">
          <img
            src={profileImageUrl}
            alt="Sua foto profissional" //
            className="h-48 w-48 rounded-full object-cover shadow-lg md:h-64 md:w-64" // Foto redonda
          />
        </div>

        {/* Coluna 2: Texto e Links (ocupa 2 de 3 colunas no desktop) */}
        <div className="md:col-span-2">
          <h1 className="mb-6 text-4xl font-extrabold text-text-dark transition-colors duration-500 md:text-5xl">
            Sobre Mim
          </h1>

          {/* Seção da Biografia */}
          <div className="prose prose-invert max-w-none 
                          prose-p:text-text-muted dark:prose-p:text-text-muted 
                          prose-a:text-accent-neon hover:prose-a:underline
                          dark:prose-a:text-accent-neon
                          mb-8 transition-colors duration-500">
            {/* TODO: Escrever sua biografia aqui */}
            <p>
              Olá! Sou [Seu Nome], um [Sua Profissão, ex: Desenvolvedor Backend Java] apaixonado por tecnologia e [Seus Interesses, ex: motocicletas clássicas e música synthwave].
            </p>
            <p>
              Este blog é meu espaço pessoal para compartilhar conhecimentos, experiências
              e reflexões sobre [Tópicos do Blog, ex: desenvolvimento de software, carreira em TI, e minhas aventuras sobre duas rodas].
            </p>
            <p>
              Minha jornada na tecnologia começou em [Ano/Contexto]. Desde então, tenho
              trabalhado com [Principais Tecnologias, ex: Java, Spring Boot, MongoDB] para construir
              [Tipos de Aplicações, ex: APIs robustas e escaláveis]. Você pode ver alguns dos
              meus projetos na seção <Link to="/portfolio">Portfólio</Link>.
            </p>
            {/* Adicione mais parágrafos conforme necessário */}
          </div>

          {/* Seção de Links Sociais */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-text-dark transition-colors duration-500">
              Conecte-se Comigo
            </h2>
            <div className="flex space-x-4">
              {/* Link LinkedIn */}
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </Button>
              </a>
              {/* Link GitHub */}
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Github className="h-4 w-4" /> GitHub
                </Button>
              </a>
              {/* Adicione outros links se desejar */}
            </div>
          </div>

          {/* TODO: Adicionar Formulário de Contato aqui (Opcional) */}
          {/* <section> ... </section> */}

        </div>
      </div>
    </div>
  )

}
