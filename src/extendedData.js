export const faqItems = [
  {
    id: 'map-creature-limit',
    category: 'Criaturas',
    question: 'Quantas criaturas podem ficar vivas no mapa ao mesmo tempo?',
    answer: 'A referência comunitária atual documenta apenas 1 criatura viva no mapa por vez. Uma criatura sendo capturada também conta para esse limite.',
    source: 'community',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'corpse-limit',
    category: 'Criaturas',
    question: 'Existe limite de criaturas mortas no mapa?',
    answer: 'A referência comunitária registra um máximo de 5 carcaças ao mesmo tempo. Ao exceder esse número, a mais antiga pode desaparecer.',
    source: 'community',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'butterfly-attack',
    category: 'Criaturas',
    question: 'Como atacar a Butterfly?',
    answer: 'A Butterfly precisa pousar para ser atacada. A wiki comunitária indica que isso ocorre no período de crepúsculo/noite. Ela também não precisa ser eliminada para uma vitória de 100% em batalha.',
    source: 'community',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'beehive-purpose',
    category: 'Beehive',
    question: 'Para que serve a Beehive?',
    answer: 'As abelhas protegem uma colmeia com um labirinto. As recompensas documentadas incluem resina, honeydew e honeycomb. Para entrar, o jogador precisa de Bee Essence.',
    source: 'community',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'beehive-daily-limit',
    category: 'Beehive',
    question: 'Quantas recompensas da Beehive posso pegar por dia?',
    answer: 'A FAQ comunitária atual registra limite de 5 recompensas da Beehive por dia.',
    source: 'community',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'hornet-honeycomb',
    category: 'Criaturas',
    question: 'Como o Honeycomb é usado para conseguir Asian Giant Hornet?',
    answer: 'O Honeycomb funciona como condição extra da atração: segure o item enquanto usa pheromones. A referência também registra que uma atração dourada nessa condição pode gerar a versão dourada.',
    source: 'community',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'get-resin',
    category: 'Recursos',
    question: 'Onde conseguir Resin?',
    answer: 'Uma fonte principal é a árvore onde os termites também coletam resina. A progressão atual ainda inclui outras fontes, como co-op, Beehive e missões/recompensas específicas.',
    source: 'community',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'early-upgrades',
    category: 'Progressão',
    question: 'O que jogadores novos costumam priorizar?',
    answer: 'Discussões recentes da comunidade repetem três prioridades: manter Leaf/Fungus/Seed Chambers evoluindo, fortalecer Queen Chamber e não investir pesado em sistemas de late game cedo demais. Isso é orientação comunitária, não uma regra oficial.',
    source: 'consensus',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'early-creatures',
    category: 'Progressão',
    question: 'Quais criaturas aparecem bastante em recomendações de early game?',
    answer: 'Em discussões recentes, Scorpion, Bombardier Beetle e Centipede aparecem repetidamente como melhorias acessíveis para exércitos iniciais. O valor real depende de estrelas, Creature Lab, formação e oponente.',
    source: 'consensus',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'fire-ant-when',
    category: 'Progressão',
    question: 'Devo focar Fire Ant Nest logo no começo?',
    answer: 'A recomendação comunitária recente é não tratar Fire Ant Nest como prioridade no early game. Jogadores costumam sugerir estabilizar Queen Chamber, economia e recursos antes.',
    source: 'consensus',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'garrison',
    category: 'Colônia',
    question: 'O que o Garrison faz?',
    answer: 'A bandeira do Garrison concentra uma quantidade de soldados em uma área do mapa. É útil para guardar rotas e pontos de recurso. Quantidade e comportamento exatos podem depender dos upgrades.',
    source: 'community',
    verifiedAt: '2026-09-05'
  }
];

export const eventArchive = [
  {
    id: 'valentines-2026',
    name: "Valentine's Event 2026",
    year: 2026,
    kind: 'Evento principal',
    creature: 'Fire Millipede',
    status: 'Passado',
    source: 'community',
    summary: 'Evento de 2026 que introduziu a Fire Millipede, uma criatura especial com Fire Trail. A página comunitária a identifica como a 32ª criatura adicionada ao jogo.',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'summer-2025',
    name: 'Summer Event 2025',
    year: 2025,
    kind: 'Evento principal',
    creature: 'Beach Tiger Beetle',
    status: 'Passado',
    source: 'community',
    summary: 'Evento de verão de 2025 com Beach Tiger Beetle. A criatura especial é descrita como uma variante mais forte do Tiger Beetle com aceleração periódica.',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'easter-2025',
    name: 'Easter Event 2025',
    year: 2025,
    kind: 'Evento principal',
    creature: 'Ladybug',
    status: 'Passado',
    source: 'community',
    summary: 'Evento de Páscoa de 2025 que trouxe a Ladybug como criatura especial e utilizou atividades recorrentes para gerar pontos de evento.',
    verifiedAt: '2026-09-05'
  },
  {
    id: 'anniversary-2024',
    name: '4th Anniversary Event',
    year: 2024,
    kind: 'Aniversário',
    creature: 'Cyanide Millipede',
    status: 'Passado',
    source: 'community',
    summary: 'Evento do quarto aniversário do jogo, iniciado em junho de 2024, com Cyanide Millipede como criatura especial.',
    verifiedAt: '2026-09-05'
  }
];

export const extraSpecialCreatures = [
  { id: 'special-fire-millipede', name: 'Fire Millipede', rarity: 'Especial', year: 2026, event: "Valentine's Event 2026", source: 'community' },
  { id: 'special-beach-tiger-beetle', name: 'Beach Tiger Beetle', rarity: 'Especial', year: 2025, event: 'Summer Event 2025', source: 'community' },
  { id: 'special-ladybug', name: 'Ladybug', rarity: 'Especial', year: 2025, event: 'Easter Event 2025', source: 'community' }
];

export const contentAreas = [
  { id:'core', name:'Mecânicas principais', status:'bom', note:'Coleta, upgrades, captura, PvP e progressão básica já possuem base.' },
  { id:'resources', name:'Recursos', status:'bom', note:'Principais recursos catalogados; faltam tabelas completas de custos e fontes por versão.' },
  { id:'chambers', name:'Câmaras', status:'medio', note:'Funções e prioridades já existem; custos nível a nível ainda precisam de coleta/validação.' },
  { id:'normal-creatures', name:'Criaturas normais', status:'bom', note:'Conjunto normal principal catalogado; alguns stats avançados ainda precisam revisão.' },
  { id:'special-creatures', name:'Criaturas especiais', status:'medio', note:'Índice amplo presente; páginas individuais, habilidades e stats ainda estão incompletos.' },
  { id:'events', name:'Eventos', status:'medio', note:'Arquivo iniciado com eventos recentes; histórico completo ainda será expandido.' },
  { id:'shops', name:'Lojas / upgrades especiais', status:'baixo', note:'Precisa de catálogo de itens, níveis, custos e requisitos por versão.' },
  { id:'quests', name:'Missões / recompensas', status:'baixo', note:'Rotina básica documentada; tabelas completas de recompensas ainda precisam ser levantadas.' },
  { id:'coop', name:'Co-op / bosses', status:'medio', note:'Sistemas principais identificados; faltam páginas detalhadas de cada atividade.' },
  { id:'pvp', name:'PvP / meta', status:'medio', note:'Princípios e fontes comunitárias existem; dados de meta devem sempre carregar data de revisão.' }
];

export const sourceRegistry = [
  {
    id:'official-google-play',
    type:'official',
    label:'Google Play — Pocket Ants: Colony Simulator',
    purpose:'Confirmar descrição oficial, sistemas centrais e data recente de atualização.',
    checked:'2026-09-05'
  },
  {
    id:'community-fandom',
    type:'community',
    label:'PocketAnts Wiki (Fandom)',
    purpose:'Stats, tempos, eventos, FAQ, câmaras e detalhes que não aparecem na descrição oficial.',
    checked:'2026-09-05'
  },
  {
    id:'community-reddit',
    type:'consensus',
    label:'r/PocketAnts',
    purpose:'Descobrir dúvidas reais, meta recente e recomendações recorrentes; nunca tratado como fonte oficial.',
    checked:'2026-09-05'
  }
];

export const verificationRules = [
  'Informação oficial recebe selo Oficial.',
  'Número ou mecânica encontrada apenas em wiki comunitária recebe selo Wiki comunitária.',
  'Dica de Reddit/comunidade recebe selo Consenso da comunidade e data de revisão.',
  'Quando duas fontes entram em conflito, o valor não é escolhido no chute: ele fica A revisar.',
  'Conteúdo dependente de meta deve ser revisado com mais frequência que mecânicas estáveis.',
  'Cada expansão do banco deve preferir IDs estáveis para não quebrar coleção, favoritos ou URLs.'
];
