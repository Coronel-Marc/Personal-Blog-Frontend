# Frontend do meu blog
Um projeto React moderno para blog pessoal com área administrativa protegida, desenvolvido com TypeScript e Tailwind CSS.

## Sobre o projeto
Este é um frontend para blog pessoal que permite gerenciar posts através de uma área administrativa protegida. O projeto possui duas áreas principais:

- **Área Pública**: Exibe posts, informações sobre o autor e portfólio
- **Área Administrativa**: Interface protegida para gerenciar posts (CRUD)

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Context API
- Axios

## Autenticação

O sistema utiliza autenticação JWT para proteger a área administrativa. O `AuthContext` gerencia o estado de autenticação globalmente.

## Funcionalidades Principais

Área Pública

- Listagem de posts
- Visualização individual de post
- Página Sobre
- Portfólio
- Página inicial com seção hero

Área Administrativa

- Login seguro
- Dashboard com listagem de posts
- CRUD completo de posts
- Suporte a posts com status (Publicado/Rascunho/Arquivado)

## UI/UX

- Design responsivo
- Suporte a tema claro/escuro
- Componentes UI reutilizáveis
- Feedback visual para ações do usuário
- Interface adaptativa (tabela em desktop, cards em mobile)

## Segurança

- Rotas protegidas via `ProtectedRoute`
- Tokens JWT armazenados de forma segura
- Validação de formulários
- Tratamento de erros consistente

## Configuração e Uso

1. Clone o repositório
2. Instale as depêndencias:
``` 
npm install
```
3. Configure as variáveis de ambiente
4. Execute o projeto:
```
npm run dev
```
## TO-DOs
- [] Implementar paginação na listagem de posts
- [] Adicionar filtros de busca
- [] Implementar preview de posts
- [] Adicionar testes automatizados

## Licença
Este projeto está sob a licença MIT.