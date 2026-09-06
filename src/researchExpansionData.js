export const latestResearchStatus = {
  verifiedAt: '2026-09-06',
  gameVersion: 'v0.1153',
  storeUpdatedAt: '25/08/2026',
  note: 'A Google Play lista a versão v0.1153 com pequenas mudanças e correções de bugs. Detalhes completos continuam direcionados ao Discord oficial.'
};

export const expansionKnowledgeSections = [
  {
    id: 'vinegaroon',
    title: 'Vinegaroon',
    category: 'Bosses',
    items: [
      'Mini-boss de fim de semana; não é uma criatura capturável.',
      'Só passa a aparecer depois que a Body Parts Chamber chega ao nível 6 ou superior.',
      'Ele pode ser ignorado até o jogador decidir iniciar a luta.',
      'A recompensa é entregue em Body Parts imediatamente após a derrota.',
      'A referência comunitária calcula a recompensa em aproximadamente 4% da capacidade máxima atual da Body Parts Chamber.',
      'A carcaça não funciona como fonte de coleta e desaparece logo após a derrota.'
    ]
  },
  {
    id: 'body-parts-advanced',
    title: 'Body Parts: fontes e prioridades',
    category: 'Farm',
    items: [
      'Carcaças de criaturas comuns rendem entre 20 e 80 partes conforme a raridade documentada.',
      'Outras fontes importantes incluem batalhas, Daily Rewards/Quests, Crab Beach e Vinegaroon.',
      'Custos comunitários de fusão: 15 partes para 2★, 30 para 3★ e 50 para 4★.',
      'A comunidade recomenda priorizar Resin Chamber antes de gastar pesado em Creatures Chamber, porque a resina trava upgrades importantes da colônia.',
      'Batalhas em ligas com bônus podem render centenas de partes em uma única vitória.'
    ]
  },
  {
    id: 'fire-ant-nest-expanded',
    title: 'Fire Ant Nest — acesso e estrutura',
    category: 'Dungeon',
    items: [
      'É desbloqueada depois que a Honeydew Chamber é construída.',
      'A entrada custa 3 Battle Tokens, 500 Leaves e 500 Seeds por tentativa.',
      'A dungeon possui 15 câmaras e termina na Fire Ant Queen.',
      'As criaturas internas recebem grandes bônus de vida em comparação às versões normais.',
      'Completar as 15 câmaras rende um total comunitário documentado de 150 Honeydew.',
      'Não existe limite fixo de clears, mas cada tentativa consome os recursos de entrada.'
    ]
  },
  {
    id: 'coop-rewards',
    title: 'Co-op: custos, requisitos e recompensas',
    category: 'Bosses',
    items: [
      'Termite Nest e Crab Beach exigem Queen Chamber nível 2+, 3 Battle Tokens, 500 Leaves e 500 Seeds.',
      'Frog Pond exige Queen Chamber nível 8+, 3 Battle Tokens, 150 Body Parts e 1500 Resin.',
      'Termite Nest: 2000 Resin + 30 minutos sem termites na árvore + chance rara de skin.',
      'Crab Beach: 100 Body Parts + 1 ponto da barra do Crab + chance rara de skin.',
      'Frog Pond: 250 Honeydew + 1 Red Sage Seed + 1 ponto + efeito de “no frog timer” até o reset + chance rara de skin.',
      'As recompensas normais de cada mapa são limitadas por dia; Termite e Crab também têm versão Clan Co-op.'
    ]
  },
  {
    id: 'shops-overview',
    title: 'Mapa das lojas',
    category: 'Shops',
    items: [
      'Gem Shop: shields, Battle Tokens, recursos, spawns especiais e cosméticos.',
      'Honeydew Shop: bônus permanentes como multiplicador de Honeydew, velocidade de Workers/Soldiers, eclosão, resiliência, fusão, flores e tamanho do exército.',
      'Resin Shop: Max Soldiers, Garrison, stats do jogador, Bee Essence e upgrades ligados à Venus Flytrap.',
      'Pheromone Shop: atração de criaturas, conversão de pheromones e summons dourados.',
      'Creature Lab: HP, velocidade e ataque por espécie; upgrades acima do nível 5 passam a combinar Body Parts e Gems.',
      'Bônus de mesmo tipo substituem o nível anterior; não somam entre si.'
    ]
  },
  {
    id: 'honeydew-shop-priority',
    title: 'Honeydew Shop — prioridades úteis',
    category: 'Shops',
    items: [
      'O Honeydew Bonus começa em 2x e chega a 15x; o salto do nível 5 leva o total para 10x.',
      'A comunidade costuma tratar esse multiplicador como uma das compras mais valiosas porque aumenta o retorno das Aphid Farms.',
      'Chrysanthemum também aparece como upgrade importante para progressão no Fire Ant Nest.',
      'Workers Speed e Egg Hatching Time têm vários níveis permanentes, mas o retorno depende da fase da colônia.',
      'A wiki deve exibir custos por nível separadamente quando a tabela completa estiver validada.'
    ]
  },
  {
    id: 'daily-quests-expanded',
    title: 'Daily Quests — recompensa principal',
    category: 'Diário',
    items: [
      'São quatro Daily Quests por dia.',
      'As tarefas variam entre batalhas, criaturas, Red Ant Queen, Fire Ants/Termites, Aphid convoy e anúncios recompensados.',
      'Completar as quatro libera a recompensa principal documentada: 150 Honeydew, 1500 Resin e 10 Gems.',
      'O reset diário ocorre às 00:00 UTC.',
      'Daily Quests são uma das fontes estáveis mais importantes de Resin e Honeydew no começo/meio do jogo.'
    ]
  }
];

export const expansionSources = [
  { type: 'Oficial', name: 'Google Play — versão v0.1153', url: 'https://play.google.com/store/apps/details?id=com.ariel.zanyants&hl=pt_BR', topic: 'Versão atual, data de atualização e descrição oficial do jogo' },
  { type: 'Wiki comunitária', name: 'Vinegaroon', url: 'https://pocketants.fandom.com/wiki/Vinegaroon', topic: 'Spawn, requisito, recompensa e comportamento do mini-boss' },
  { type: 'Wiki comunitária', name: 'Body Parts', url: 'https://pocketants.fandom.com/wiki/Body_Parts', topic: 'Fontes, fusão e prioridade de uso' },
  { type: 'Wiki comunitária', name: 'Fire Ant Nest', url: 'https://pocketants.fandom.com/wiki/Fire_Ant_Nest', topic: 'Entrada, 15 câmaras, Fire Ant Queen e Honeydew' },
  { type: 'Wiki comunitária', name: 'Co-op Mode', url: 'https://pocketants.fandom.com/wiki/Co-op_Mode', topic: 'Requisitos, custos, modos e recompensas de Termite/Crab/Frog' },
  { type: 'Wiki comunitária', name: 'Honeydew Shop', url: 'https://pocketants.fandom.com/wiki/Honeydew_Shop', topic: 'Bônus, níveis e custos de Honeydew' },
  { type: 'Wiki comunitária', name: 'Shops', url: 'https://pocketants.fandom.com/wiki/Shops', topic: 'Mapa geral de Gem/Honeydew/Resin/Pheromone Shop e Creature Lab' },
  { type: 'Wiki comunitária', name: 'Daily Quests', url: 'https://pocketants.fandom.com/wiki/Daily_Quests', topic: 'Tarefas diárias e recompensa principal' }
];

export const executiveResearchCoverage = [
  { id: 'wiki-core', label: 'Wiki central', status: 'forte', detail: 'Home, busca, recursos, câmaras, criaturas, mecânicas, guias e glossário já existem.' },
  { id: 'interactive-tools', label: 'Ferramentas interativas', status: 'forte', detail: 'Comparador, farm planner, checklist, tracker, backup e calculadoras avançadas já estão implementados.' },
  { id: 'research-transparency', label: 'Fontes e confiança', status: 'forte', detail: 'O site separa Oficial, Wiki comunitária, Consenso e A revisar, como previsto no plano aprofundado.' },
  { id: 'bosses-coop', label: 'Bosses / Co-op', status: 'expandindo', detail: 'Base já existia; esta expansão adiciona Vinegaroon e recompensas/custos dos co-ops.' },
  { id: 'shops', label: 'Shops', status: 'expandindo', detail: 'Era uma das lacunas P0. Agora há visão geral e prioridade inicial; ainda faltam todas as tabelas completas por nível.' },
  { id: 'quests-rewards', label: 'Quests / recompensas', status: 'expandindo', detail: 'Daily Quests ganharam recompensa principal; ainda faltam todas as missões e recompensas históricas.' },
  { id: 'community', label: 'Comunidade', status: 'parcial', detail: 'Centro de Pesquisa, fontes e reporte existem; fórum/comentários internos ainda não são necessários para a primeira versão.' },
  { id: 'ads-macros', label: 'Ads / macros', status: 'secundário', detail: 'Mantido como conteúdo auxiliar e seguro; não é mais o eixo central da wiki.' },
  { id: 'seo-editorial', label: 'SEO / editorial', status: 'parcial', detail: 'Metadados, robots, PWA e URLs existem; sitemap editorial, changelog por versão e histórico de revisão ainda podem evoluir.' }
];
