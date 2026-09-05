# 🐜 Pocket Ants Wiki BR

Wiki comunitária em português para **Pocket Ants: Colony Simulator**, reconstruída sobre um repositório antigo que não era mais usado.

## Objetivo

Criar uma wiki realmente útil no celular, combinando informação organizada com ferramentas que uma wiki tradicional normalmente não oferece.

## O que já está implementado

- Home mobile-first com atalhos por assunto
- Busca global por criaturas, recursos, câmaras, mecânicas e guias
- Banco inicial de criaturas com:
  - raridade
  - papéis
  - vida, ataque e velocidade relativos
  - condição de atração
  - tempo de captura
  - fase de progressão
  - origem/confiança do dado
- Lista inicial de criaturas especiais de eventos
- Recursos e fontes de obtenção
- Câmaras da colônia, prioridade e função
- Páginas detalhadas de criaturas e câmaras
- Mecânicas: captura, PvP, Red Ant Colony, Aphid Farm, Fire Ant Nest, Beehive, Co-op e Garrison
- Biblioteca inicial de guias
- Glossário de termos
- Modo escuro e claro
- Layout responsivo para Android/mobile

## Ferramentas

### Comparador de criaturas
Compara HP, ataque e velocidade relativos de duas criaturas lado a lado.

### Planejador de farm
O jogador informa o que possui, a meta, sua média por run e o tempo médio. O site calcula quantas runs e quanto tempo faltam sem inventar drop rates.

### Checklist diário
Checklist salvo em `localStorage` no aparelho.

### Tracker de coleção
Permite marcar criaturas obtidas e acompanhar o progresso da coleção. Também usa `localStorage`.

## Política de fontes

A wiki não mistura tudo como se tivesse o mesmo nível de certeza.

- **Oficial** — informação confirmada por material oficial do jogo / Ariel Games / lojas oficiais.
- **Wiki comunitária** — números e detalhes catalogados por jogadores e revisados antes de entrar na base.
- **Consenso da comunidade** — estratégias recorrentes de jogadores; podem mudar com o meta.
- **A revisar** — informação com conflito entre fontes ou sem confirmação suficiente.

Cada bloco relevante pode mostrar seu selo de origem.

## Estrutura dos dados

Os dados iniciais ficam em:

```text
src/wikiData.js
```

Eles possuem IDs estáveis, permitindo no futuro migrar para JSON separado, banco de dados ou CMS sem refazer toda a interface.

## Rodar localmente

```bash
npm install
npm run dev
```

## Gerar produção

```bash
npm run build
```

O resultado fica em `dist/`.

## Hospedagem

A aplicação usa `HashRouter` e `base: './'`, então funciona bem em hospedagem estática e em subpastas sem depender de rewrites do servidor.

## Próximas expansões

### P0 — conteúdo essencial
- completar todas as criaturas normais e especiais
- confirmar stats ainda faltantes
- tabelas completas de custos por nível das câmaras
- fontes exatas por campo
- páginas dedicadas para Resin, Honeydew, Body Parts e Pheromones

### P1 — ferramentas
- calculadora real de custo de upgrades quando as tabelas forem verificadas
- planner de formação/time
- tracker de upgrades das câmaras
- rotinas personalizadas de farm
- filtros avançados por obtenção, condição, papel e fase

### P2 — manutenção e comunidade
- changelog por versão do jogo
- indicador automático de páginas possivelmente desatualizadas
- botão para reportar dado incorreto
- histórico de revisão de cada entidade
- suporte PT-BR/EN

## Aviso

Este é um projeto comunitário independente. Pocket Ants e seus elementos pertencem aos respectivos criadores. Dados comunitários podem mudar após atualizações do jogo; por isso a interface identifica fonte e status de verificação.
