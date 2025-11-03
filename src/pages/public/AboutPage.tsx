import { Github, Linkedin } from 'lucide-react' // Substituir quando assim que possível. Versão depreciada vai ser removida na v1.0
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export const AboutPage = () => {
  //TODO: Substituir pela minha foto
  const profileImageUrl = `https://the-code-and-road-amzn-s3.s3.us-east-2.amazonaws.com/1762179211693_image.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIASVFDWVSH3HLNSFZW%2F20251103%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251103T203644Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJGMEQCIFl7sY5dZOSLA3NpQBwzIQT82vj0uX%2BqCQB41W5rBPQjAiAFbcPEXzRz1wUJpW6JXRdPPuNER1m0fVbf8LhcbwZYayrbAghmEAAaDDE4Mjg3OTQzMTgyMyIMb0kCJZbmiMvWgS6pKrgC41sHGd1Fg6ONj9fUJpeRVCMB%2BCzvXAZQ04tOlk%2BBg0uHe0rw5TaRZAUUc2FBAcbVyf70OpEak3BfT5KgD7qASyZQCe8ZDtY4q7VHQNF%2FaqJ8rnPsbBqnU0Ki7Hx2pB8DNxz3Pe5jLLc39988uM2Yp4peJmpPiZ5%2Bo7HZhriOvtoUF5GLZn1EiWKaG9Gw6Mrs%2FBCJBE9PmTEor%2BNqN%2FLxIUxUeWebCYjSGa1Tz34SosQecwDbknU93cWGnoIm7kLq2FhJ7ITbcJ1iQFeLV7RuYrsp0%2Fz%2B4V4g5a8coJjJ6i7C3uTXnzLpClTTkwLoEQFRr2cbzGcepL%2FAuryrdsXD71Me6zMwK5IRQtXp%2BgkT3qQRj3PvC47dvvX7MZzPdfR%2FE%2BpiOEpfaZWd6LSEzN4gJlad%2Bu8EI6RGMI3losgGOq4C6g%2FYAYS1RuRTZZzLznb8Br9JYSKwe9AqKFC7I9f4%2FoYcCtz91F3ekOumB9%2BpjofiD%2BFSwPj6fjYgRbDTtrtUwFovHXF5o1djJjG9LJqspSvNjq%2B4aKVMjpWZffJwN67%2BiJVFrqcnMlmVN30W02QmZ8t%2FaUva6oQY%2Banui8J6SZByuCrtL6Qu3f0dDSqQFZBeBeXm6sGbRKR2Qn3wTIvlPNpHxrY3sjXuE4ZWoqfrFlaZxLLnYt905OVSOtuNAz8b47yJBXzdMyzR1PgKhoGT%2BLnNAMmr9kKdQjScLpLtybYFWJlUBasLJIwucb0luMV%2BCioi2I9B7ynYxjNuTr1sPAhiH%2B9woa3CEy86QECqBbkr6j221kmIGjqAnWQ9pFYavIuaS%2BbLMg%2F89QQGzJM%3D&X-Amz-Signature=a3c9f1d1fe0996d6ee775a58fd9fee909e0afbf9d569f41383c63578cb9e51c4&X-Amz-SignedHeaders=host&response-content-disposition=inline`

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
              Sou desenvolvedor Backend com foco em Java e sou apaixonado por dois mundos: a <b>lógica do software</b> e <b>motos clássicas</b>,
              tudo isso embalado pela trilha sonora que nostálgica synthwave.
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
