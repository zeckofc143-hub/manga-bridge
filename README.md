# Reak toons — versão independente

Reconstrução funcional baseada no inventário e na documentação fornecidos pelo proprietário do projeto.

## Objetivo

Remover a dependência obrigatória do Base44 para o funcionamento básico do site. Esta versão usa:

- React 18
- Vite 6
- Tailwind CSS 3.4
- React Router v6
- TanStack React Query
- Framer Motion
- lucide-react
- armazenamento local (`localStorage`) como backend independente

## Rodar

```bash
npm install
npm run dev
```

Para gerar produção:

```bash
npm run build
```

## O que está implementado

- Visual dark zinc com gradiente violeta → fuchsia
- Home com slider de destaques e filtro por tipo
- `featured_all`
- Recentes, Populares, Busca
- Página de obra
- Biblioteca e Favoritos
- Marcar/desmarcar capítulo como lido
- Reader com zoom, fullscreen, navegação e comentários
- Novel via `text_content`
- Views únicas por usuário local
- Comentários com respostas aninhadas, likes, spoiler e exclusão
- Avaliações
- Comunidade com criação de posts e likes
- Perfil com “Sobre mim”
- Configurações e i18n pt-BR/en/es para navegação/base
- Temas sazonais
- Central de Suporte com tickets, prioridade e status
- Painéis Admin / Suporte / Tradutor / Fundador
- Gerenciamento de destaques, badges, bans, stats e site settings

## Diferenças inevitáveis em relação ao Base44

A documentação descreve comportamento e arquitetura, mas não contém o conteúdo integral de todos os arquivos originais. Por isso esta é uma **reconstrução funcional**, não um clone byte-a-byte.

Sem inventar dados não fornecidos:

- Os GIFs sazonais exatos do Giphy não foram incluídos porque as URLs originais não foram fornecidas.
- O backend Base44 foi substituído por um adapter local persistido em `localStorage`.
- Uploads locais são convertidos em Data URL.
- `VisualEditAgent` era específico do ambiente Base44; não é necessário nesta versão independente.

## Dados demo

Na primeira abertura, o site cria dados de demonstração locais com quatro obras e capítulos. Eles existem só para o projeto abrir funcionalmente sem servidor.

## Migração futura para backend real

O arquivo `src/api/localBackend.js` concentra o acesso a dados. Para migrar para Supabase, Firebase, PostgreSQL/API própria ou outro backend, mantenha a interface:

- `backend.entities.<Entidade>.list()`
- `.filter()`
- `.get()`
- `.create()`
- `.update()`
- `.delete()`
- `backend.auth.me()`
- `backend.auth.updateMe()`

Assim as páginas precisam de poucas alterações.

## Roadmap explicitamente pendente no projeto original

- Grupos
- Pastas/Coleções
- Abas tipo navegador
- Refino mobile dedicado
- Menções @obras/@pessoas
- Rank/XP E → SSS+
- Cobertura i18n completa das páginas internas
