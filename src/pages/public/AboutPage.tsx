import { Github, Linkedin } from 'lucide-react' // Substituir quando assim que possível. Versão depreciada vai ser removida na v1.0
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export const AboutPage = () => {
  //TODO: Substituir pela minha foto
  const profileImageUrl = 'https://the-code-and-road-amzn-s3.s3.us-east-2.amazonaws.com/1762179211693_image.jpeg'
  const GITHUB_URL = 'https://github.com/Coronel-Marc'
  const LINKEDIN_URL = 'https://www.linkedin.com/in/g-marcos/'
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div className="flex justify-center md:justify-start">
          <img
            src={profileImageUrl}
            alt="Sua foto profissional"
            className="h-48 w-48 rounded-full object-cover shadow-lg md:h-64 md:w-64" // Foto redonda
          />
        </div>

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
            <p>
              Olá! Eu sou Marcos, o piloto por traz do <b>The Code & Road</b>.
            </p>
            <p>
              Sou desenvolvedor Backend com foco em Java e sou apaixonado por dois mundos: a <b>lógica do software</b> e <b>motos clássicas</b>.
            </p>
            <p>
              Este é meu espaço pessoal para mapear duas jornadas: o aprendizado e a construção de sistemas robustos em TI, e as aventuras de estrada a bordo da minha 
              <b> Royal Enfield Interceptor 650</b>.
            </p>
            <p>
              Minha paixão por tecnologia começou em 2012, quando ganhei meu primeiro computador. Naquela época, o interesse era puramente mecânico: 
              entender as peças para extrair o máximo de performance em jogos. Em 2017, mudei o foco do hardware para o software e comecei a explorar a programação.
            </p>
            <p>
              Passei por um período de "road-testing" em várias linguagens e conceitos, sentindo-me perdido por tentar digerir temas avançados sem uma base sólida.
            </p>
            <p>
              Recentemente, encontrei minha rota principal, decidindo focar com afinco em Java e Spring Boot para construir APIs robustas e escaláveis, utilizando MongoDB e React.
            </p>
            <p>Paralelamente estudo sobre desenvolvimento de jogos, que é uma area que tenho muito interesse em aprender.</p>
            <p>
              Este blog é o meu primeiro projeto completo, onde você verá o código, os desafios e as histórias por trás da tela e do guidão.
               Seja bem-vindo à estrada. Você pode conferir o resultado do meu aprendizado na seção <Link to="/portfolio">Portfólio</Link>.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-text-dark transition-colors duration-500">
              Conecte-se Comigo
            </h2>
            <div className="flex space-x-4">
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
            </div>
          </div>

          {/* TODO: Adicionar Formulário de Contato aqui*/}
          {/* <section> ... </section> */}

        </div>
      </div>
    </div>
  )

}
