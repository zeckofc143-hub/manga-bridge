# 🐜 Pocket Ants Wiki BR

Wiki comunitária em português para **Pocket Ants: Colony Simulator**, reconstruída sobre um repositório antigo que não era mais usado.

A proposta não é ser só uma coleção de textos: a wiki combina **banco de dados + guias + trackers + calculadoras + transparência de fontes**, com prioridade para uso no celular.

## ✅ O que já está implementado

### Navegação e interface
- Home mobile-first com atalhos por assunto
- Busca global por criaturas, recursos, câmaras, mecânicas e guias
- Filtros por raridade, função e prioridade
- Páginas detalhadas de criaturas e câmaras
- Modo escuro e claro
- Layout responsivo para Android/mobile
- Manifesto web + ícone para experiência instalável/atalho no celular
- `HashRouter` para navegação segura em hospedagem estática

### Banco de dados inicial
- Criaturas normais e lendárias com:
  - raridade
  - funções
  - HP, ataque e velocidade relativos
  - condição de atração
  - tempo de captura
  - fase de progressão
  - tipo de fonte
- Índice amplo de criaturas especiais
- Arquivo inicial de eventos recentes
- Recursos e formas de obtenção
- Câmaras da colônia, função, prioridade e nível máximo
- Mecânicas: captura, PvP, Red Ant Colony, Aphid Farm, Fire Ant Nest, Beehive, Co-op e Garrison
- Glossário
- FAQ pesquisável
- Biblioteca inicial de guias para early/mid/late game

## 🧰 Ferramentas já funcionando

### Comparador de criaturas
Compara HP, ataque e velocidade relativos de duas criaturas lado a lado.

### Planejador de farm
O jogador informa o que possui, a meta, sua média por run e o tempo médio. A wiki calcula quantidade de runs e tempo estimado sem inventar drop rates.

### Checklist diário
Salvo em `localStorage` no aparelho.

### Tracker de coleção
Permite marcar criaturas obtidas e acompanhar a coleção. Também usa `localStorage`.

### Central do jogador
Painel flutuante com:
- planner de nível das câmaras
- porcentagem de progresso da colônia
- FAQ por categoria
- arquivo de eventos
- matriz de cobertura da wiki
- registro de fontes
- regras de verificação
- exportação/importação de backup em JSON

### Calculadoras avançadas
- tempo acumulado de upgrades
- nível final/capacidade final da meta selecionada
- chance de fusão de criaturas
- bônus de Honeydew, clã e gemas separados
- custo de Body Parts por tentativa
- valor esperado matemático de tentativas, explicitamente marcado como não-garantia
- referência de desbloqueios do Creature Lab

## 🧪 Política de fontes

A wiki não mistura tudo como se tivesse o mesmo nível de certeza.

- **Oficial** — informação confirmada por material oficial do jogo / Ariel Games / lojas oficiais.
- **Wiki comunitária** — números e detalhes catalogados por jogadores e revisados antes de entrar na base.
- **Consenso da comunidade** — estratégias recorrentes de jogadores; podem mudar com o meta.
- **A revisar** — informação com conflito entre fontes ou sem confirmação suficiente.

Quando duas fontes discordam, a interface deve **mostrar o conflito**, não escolher um valor no chute.

## 🗃️ Estrutura dos dados

```text
src/wikiData.js        # base principal
src/extendedData.js    # FAQ, eventos, cobertura e registro de fontes
src/upgradeData.js     # tabelas usadas pelas calculadoras
```

As entidades usam IDs estáveis para facilitar uma futura migração para JSON separado, banco de dados ou CMS sem quebrar URLs, coleção e trackers.

## 🛠️ Desenvolvimento

```bash
npm install
npm run dev
```

### Build de produção

```bash
npm run build
```

O resultado fica em `dist/`.

O repositório também possui workflow de CI em:

```text
.github/workflows/wiki-build.yml
```

Cada push na `main` valida automaticamente o build de produção.

## 🌐 GitHub Pages

O deploy automático já está preparado em:

```text
.github/workflows/pages.yml
```

Para a primeira publicação, o repositório precisa ter **GitHub Pages habilitado usando GitHub Actions como fonte de publicação**. Depois disso, pushes futuros podem publicar a wiki automaticamente pelo workflow.

A aplicação usa `HashRouter` e `base: './'`, então as rotas internas funcionam em uma subpasta do GitHub Pages sem depender de rewrite no servidor.

## 📱 Mobile / instalação

Arquivos preparados:

```text
public/manifest.webmanifest
public/ant-wiki-icon.svg
public/robots.txt
```

O HTML referencia o manifesto e o ícone. A experiência de instalação/atalho depende das capacidades do navegador e da hospedagem HTTPS usada.

## 🧹 Manutenção de dados

Existe um formulário estruturado de issue em:

```text
.github/ISSUE_TEMPLATE/data-report.yml
```

Ele pede:
- página/item afetado
- informação incorreta
- correção sugerida
- versão/data do jogo
- evidência/fonte

Assim correções entram em revisão antes de virar dado confirmado.

## 🚧 Próximas expansões

### P0 — completar conteúdo
- páginas individuais de todas as criaturas especiais
- habilidades e stats ainda faltantes
- custos completos por nível das câmaras
- catálogo detalhado de shops e upgrades especiais
- missões e tabelas de recompensas
- páginas completas de cada co-op/boss

### P1 — ferramentas
- planner de formação/time
- tracker detalhado de Creature Lab por espécie
- calculadora de materiais quando custos completos forem confirmados
- favoritos
- comparação múltipla de criaturas
- filtros por obtenção, condição climática/horário, função e evento

### P2 — manutenção e qualidade
- changelog por versão do jogo
- histórico de revisão por entidade
- alerta automático de páginas antigas após update
- botão interno para abrir relatório de dado incorreto
- suporte PT-BR/EN
- migração gradual para banco/CMS se o volume justificar

## ⚠️ Aviso

Projeto comunitário independente. Pocket Ants e seus elementos pertencem aos respectivos criadores. Dados comunitários podem mudar após atualizações do jogo; por isso a interface identifica origem e status de verificação.
