export const researchSnapshot = {
  verifiedAt: '2026-09-05',
  game: {
    title: 'Pocket Ants: Colony Simulator',
    developer: 'Ariel-Games',
    release: '27/06/2020 (early access, conforme wiki comunitária)',
    downloads: '10 mi+',
    googlePlayRating: '4,3★',
    appStoreBRRating: '4,4★',
    model: 'Grátis, anúncios e compras no app'
  },
  sentiment: {
    positive: [
      'Visual simples e carismático é elogiado por jogadores.',
      'Mistura coleta, construção de colônia, coleção de criaturas, PvP e co-op.',
      'Clãs e Discord são vistos como aceleradores enormes de progressão e aprendizado.',
      'Eventos recorrentes mantêm a coleção de criaturas especiais relevante.'
    ],
    negative: [
      'Matchmaking de PvP é uma das reclamações mais recorrentes entre iniciantes.',
      'Progressão pode ficar muito lenta e repetitiva sem rotina eficiente.',
      'Jogadores reclamam da IA/controle das criaturas durante algumas batalhas.',
      'Anúncios de recompensa podem ser longos e a comunidade discute bastante isso.',
      'Novos jogadores sentem desvantagem contra contas antigas cheias de criaturas de evento.'
    ]
  }
};

export const communityConsensus = [
  {
    id: 'early-priority',
    category: 'Progressão',
    title: 'Early game: colônia primeiro, PvP depois',
    confidence: 'alto',
    summary: 'O conselho que mais se repete é manter Food/Fungus, Leaf e Seed subindo e não transformar PvP em prioridade enquanto a colônia e o exército ainda são pequenos.',
    bullets: [
      'Priorize câmaras baratas que aumentam produção e capacidade.',
      'Queen Chamber e Resin Chamber viram gargalos importantes mais adiante.',
      'Não se preocupe cedo demais com Fire Ant Nest, tiers altos de PvP e Creature Chamber acima do necessário para fusão.'
    ]
  },
  {
    id: 'clan-discord',
    category: 'Comunidade',
    title: 'Entrar em clã cedo vale muito',
    confidence: 'alto',
    summary: 'Clãs dão chat, doações, bônus, co-ops extras e acesso fácil a jogadores experientes. A comunidade recomenda também usar o Discord oficial para lobbies privados.',
    bullets: [
      'Co-ops privados costumam ter taxa de sucesso muito melhor que busca pública.',
      'Clãs fortes ajudam a acelerar upgrades e ensinam rotas/meta.',
      'Convites podem permitir entrada mesmo quando os requisitos normais do clã não são atendidos.'
    ]
  },
  {
    id: 'early-creatures',
    category: 'Criaturas',
    title: 'Meta comunitário do começo',
    confidence: 'médio-alto',
    summary: 'Scorpion, Centipede e Bombardier Beetle aparecem repetidamente como alvos fortes do early game. Hornet é útil cedo, mas cai de valor quando surgem counters como Frog.',
    bullets: [
      'Scorpion: escolha recorrente para ataque/defesa inicial.',
      'Centipede: muito valorizado no early/mid game.',
      'Bombardier Beetle: bom tanque/dano em várias composições.',
      'Praying Mantis e Tarantula tendem a ser substituídos com o avanço.'
    ]
  },
  {
    id: 'late-creatures',
    category: 'Criaturas',
    title: 'Frog e Crab dominam muitas conversas de late game',
    confidence: 'médio',
    summary: 'Discussões recentes tratam Frog e Crab como objetivos de alto valor. O Crab é elogiado pelo AOE e resistência; Frog é valorizado por utilidade contra alvos voadores.',
    bullets: [
      'Crab é excelente em situações com muitos inimigos por causa do dano em área.',
      'Frog é especialmente valioso contra criaturas voadoras.',
      'Criaturas de evento podem superar opções normais e mudam o meta.'
    ]
  },
  {
    id: 'pvp-matchmaking',
    category: 'PvP',
    title: 'Matchmaking é a maior dor do iniciante',
    confidence: 'alto',
    summary: 'Vários relatos de 2026 mostram contas novas enfrentando exércitos com 11–12 criaturas ou jogadores em faixas de troféus bem superiores.',
    bullets: [
      'A recomendação recorrente é não insistir em PvP normal quando a conta ainda não está pronta.',
      'Ainda vale acompanhar desafios/temporadas que entreguem recompensa.',
      'No início de temporadas, jogadores fortes podem estar temporariamente em ranks mais baixos.'
    ]
  },
  {
    id: 'honeydew-priority',
    category: 'Recursos',
    title: 'Honeydew: multiplicador e Chrysanthemum aparecem como prioridade',
    confidence: 'alto',
    summary: 'FAQ e comunidade recomendam comprar upgrades baratos primeiro, depois focar no multiplicador de Honeydew; Chrysanthemum é muito citado para Fire Ant Nest.',
    bullets: [
      'Daily quests são a fonte inicial mais consistente de Honeydew/Resin.',
      'Aphid Farm vira fonte central de Honeydew.',
      'Fire Ant Nest e Beehive entram como fontes adicionais quando a conta suporta.'
    ]
  }
];

export const knowledgeSections = [
  {
    id: 'core-loop',
    title: 'Loop principal do jogo',
    category: 'Fundamentos',
    items: [
      'Colete Fungus, Leaves, Seeds, Water, Resin, Honeydew e Body Parts.',
      'Leve recursos para câmaras e aumente capacidade/produção.',
      'Alimente a rainha e crie Workers e Soldiers.',
      'Derrote criaturas no mapa, capture-as e use-as no exército.',
      'Faça fusões para aumentar estrelas e use o Creature Lab para upgrades permanentes por espécie.',
      'Ataque jogadores, defenda a colônia, suba ligas e ganhe pheromones.',
      'Faça conteúdo diário: Red Ant Colony, Daily Quests, Aphid Farm e co-ops.'
    ]
  },
  {
    id: 'offline',
    title: 'Offline Gathering',
    category: 'Farm',
    items: [
      'Começa depois de cerca de 10 minutos offline.',
      'Pode coletar Fungus, Leaves, Seeds, Body Parts e Water.',
      'Resin não é coletada pelo sistema offline.',
      'A câmara do recurso precisa estar ao menos no nível 2.',
      'Red Ants presentes podem matar Workers enquanto você está offline.',
      'O Frog vivo pode causar perdas de Workers designados para Water até o co-op diário ser concluído.',
      'Fontes ilimitadas de evento funcionam com regras/caps próprios.'
    ]
  },
  {
    id: 'red-ants',
    title: 'Red Ant Colony',
    category: 'Diário',
    items: [
      'Respawn normal em 12 horas; eventos principais costumam reduzir para 6 horas.',
      'Derrotar a rainha elimina instantaneamente as outras Red Ants.',
      'Recompensa Pheromone rosa e Gems.',
      'É uma das fontes diárias importantes de Gems.',
      'Também rende Activity Points em eventos.'
    ]
  },
  {
    id: 'aphid-farm',
    title: 'Aphid Farm',
    category: 'Honeydew',
    items: [
      'Uma das fontes centrais de Honeydew.',
      'Só uma farm fica ativa no mapa por vez.',
      'Após vencer os guardas, você escolta Workers carregando aphids até a colônia.',
      'Cada Worker perdido no comboio reduz o Honeydew recebido.',
      'Nova farm aparece cerca de 6 horas após a anterior ser vencida.',
      'O multiplicador da Honeydew Shop aumenta muito o retorno.'
    ]
  },
  {
    id: 'beehive',
    title: 'Beehive / Bee Maze',
    category: 'Mapa',
    items: [
      'Fica no alto da árvore, no ramo direito.',
      'Exige Bee Essence, comprável por Resin ou Gems; usar Resin é a recomendação comum.',
      'É um labirinto temporizado; tocar obstáculos reduz o tempo.',
      'Recompensas incluem Resin, Honeydew e Honeycomb.',
      'Honeycomb permite forçar a atração do Asian Giant Hornet quando usado junto de um summon.',
      'Soldiers não lidam bem com as abelhas externas por causa do voo/velocidade.'
    ]
  },
  {
    id: 'fire-nest',
    title: 'Fire Ant Nest',
    category: 'Dungeon',
    items: [
      'Dungeon de 15 câmaras com Fire Ants e criaturas buffadas.',
      'A sala final contém a Fire Ant Queen.',
      'Completar tudo rende 150 Honeydew segundo a wiki/FAQ comunitária.',
      'O consenso é tentar seriamente perto de QC10, com army grande e Chrysanthemum forte.',
      'A câmara 14 é frequentemente citada como uma das partes mais difíceis.'
    ]
  },
  {
    id: 'coops',
    title: 'Co-op Mode',
    category: 'Multiplayer',
    items: [
      'Dungeons multiplayer em tempo real contra bosses.',
      'Termite Nest é muito usado para Resin e dá 30 minutos sem termites na árvore.',
      'Crab e Frog co-ops são objetivos importantes para obter criaturas de alto valor.',
      'A comunidade prefere lobbies privados de clã/Discord a matchmaking público.',
      'Clãs podem oferecer oportunidade extra de co-op.'
    ]
  },
  {
    id: 'pvp',
    title: 'PvP, ligas e pheromones',
    category: 'PvP',
    items: [
      'Ataques usam Battle Token quando o objetivo é ganhar pheromones.',
      '50%, 75% e 100% de destruição rendem até 3 pheromones.',
      'Ligas melhores liberam pheromones melhores e bônus de recursos.',
      'Gold, Platinum, Diamond e Emerald aumentam o bônus de recursos de batalha.',
      'Sair/retreat após procurar oponente pode custar troféus.',
      'Escudos ficam menores em ligas altas e atacar cancela o escudo ativo.'
    ]
  },
  {
    id: 'garden',
    title: 'Garden, seeds e flowers',
    category: 'Garden',
    items: [
      'Digging patches dão seeds; existem tentativas diárias e extras via anúncio/gems.',
      'Plantar custa Honeydew e cultivar exige Water em duas etapas.',
      'Novas seeds são liberadas ao subir Water Storage Chamber.',
      'Só duas flowers temporárias diferentes podem ficar ativas ao mesmo tempo.',
      'A comunidade usa flores para manipular spawns, acelerar captura e melhorar batalha/co-op.',
      'Pet Aphids podem surgir ao colher flores e carregam dois bônus aleatórios.'
    ]
  },
  {
    id: 'events',
    title: 'Eventos recorrentes',
    category: 'Eventos',
    items: [
      'Valentine’s, Easter, Anniversary, Summer, Halloween e Christmas formam o calendário recorrente principal.',
      'Eventos usam Activity Bar e normalmente trazem Special Creatures/skins.',
      'Alguns eventos reduzem respawns de Red Ants, Aphid Farms ou creatures.',
      'Criaturas antigas podem voltar em mini Creature Events.',
      'Christmas Crab retorna em eventos de Natal e é tratado como criatura Legendary.'
    ]
  }
];

export const sourceRegistry = [
  { type: 'Oficial', name: 'Google Play — Pocket Ants', url: 'https://play.google.com/store/apps/details?id=com.ariel.zanyants', topic: 'Descrição oficial, downloads, rating, reviews e links sociais' },
  { type: 'Oficial', name: 'App Store Brasil — Pocket Ants', url: 'https://apps.apple.com/br/app/pocket-ants-colony-simulator/id1532712160', topic: 'Rating iOS, descrição e dados do app' },
  { type: 'Wiki comunitária', name: 'PocketAnts Wiki — Home', url: 'https://pocketants.fandom.com/wiki/Pocket_Ants_Wiki', topic: 'Mapa geral de sistemas e histórico' },
  { type: 'Wiki comunitária', name: 'Starter Tutorial', url: 'https://pocketants.fandom.com/wiki/Starter_Tutorial', topic: 'Tutorial, captura, fusão, batalha e defesa' },
  { type: 'Wiki comunitária', name: 'FAQ', url: 'https://pocketants.fandom.com/wiki/FAQ', topic: 'Dúvidas, prioridades e recomendações comunitárias' },
  { type: 'Wiki comunitária', name: 'Colony Chambers', url: 'https://pocketants.fandom.com/wiki/Colony_Chambers', topic: 'Resumo das câmaras' },
  { type: 'Wiki comunitária', name: 'Creatures', url: 'https://pocketants.fandom.com/wiki/Creatures', topic: 'Stats relativos, raridade, especiais e captura' },
  { type: 'Wiki comunitária', name: 'Creatures Chamber', url: 'https://pocketants.fandom.com/wiki/Creatures_Chamber', topic: 'Captura, fusão e Creature Lab' },
  { type: 'Wiki comunitária', name: 'Pheromones', url: 'https://pocketants.fandom.com/wiki/Pheromones', topic: 'Atração, conversão e golden creatures' },
  { type: 'Wiki comunitária', name: 'Honeydew', url: 'https://pocketants.fandom.com/wiki/Honeydew', topic: 'Fontes, usos e prioridade de upgrades' },
  { type: 'Wiki comunitária', name: 'Honeydew Shop', url: 'https://pocketants.fandom.com/wiki/Honeydew_Shop', topic: 'Buffs permanentes' },
  { type: 'Wiki comunitária', name: 'Shops', url: 'https://pocketants.fandom.com/wiki/Shops', topic: 'Gem, Honeydew e Resin shops' },
  { type: 'Wiki comunitária', name: 'Aphid Farm', url: 'https://pocketants.fandom.com/wiki/Aphid_Farm', topic: 'Honeydew e comboios' },
  { type: 'Wiki comunitária', name: 'Beehive', url: 'https://pocketants.fandom.com/wiki/Beehive', topic: 'Bee Maze, Bee Essence e recompensas' },
  { type: 'Wiki comunitária', name: 'Fire Ant Nest', url: 'https://pocketants.fandom.com/wiki/Fire_Ant_Nest', topic: 'Dungeon de Fire Ants' },
  { type: 'Wiki comunitária', name: 'Co-op Mode', url: 'https://pocketants.fandom.com/wiki/Co-op_Mode', topic: 'Co-ops e bosses' },
  { type: 'Wiki comunitária', name: 'Termites', url: 'https://pocketants.fandom.com/wiki/Termites', topic: 'Resin e Termite co-op' },
  { type: 'Wiki comunitária', name: 'Red Ants', url: 'https://pocketants.fandom.com/wiki/Red_Ants', topic: 'Respawn, gems e evento' },
  { type: 'Wiki comunitária', name: 'Offline Gathering', url: 'https://pocketants.fandom.com/wiki/Offline_Gathering', topic: 'Farm offline e limites' },
  { type: 'Wiki comunitária', name: 'Garden', url: 'https://pocketants.fandom.com/wiki/Garden', topic: 'Seeds, flowers e Water' },
  { type: 'Wiki comunitária', name: 'Pet Aphid', url: 'https://pocketants.fandom.com/wiki/Pet_Aphid', topic: 'Bônus de pets' },
  { type: 'Wiki comunitária', name: 'Clans', url: 'https://pocketants.fandom.com/wiki/Clans', topic: 'Clãs, cargos, storage e boosts' },
  { type: 'Wiki comunitária', name: 'Joining a Clan FAQ', url: 'https://pocketants.fandom.com/wiki/Joining_a_Clan_FAQ', topic: 'Benefícios e como entrar' },
  { type: 'Wiki comunitária', name: 'Attacking', url: 'https://pocketants.fandom.com/wiki/Attacking', topic: 'Regras de ataque e pheromones' },
  { type: 'Wiki comunitária', name: 'Defending', url: 'https://pocketants.fandom.com/wiki/Defending', topic: 'Defesa e shields' },
  { type: 'Wiki comunitária', name: 'Leagues', url: 'https://pocketants.fandom.com/wiki/Leagues', topic: 'Troféus, ligas, bônus e pheromones' },
  { type: 'Wiki comunitária', name: 'Daily Quests', url: 'https://pocketants.fandom.com/wiki/Daily_Quests', topic: 'Rotina diária' },
  { type: 'Wiki comunitária', name: 'Events', url: 'https://pocketants.fandom.com/wiki/Events', topic: 'Calendário e criaturas especiais' },
  { type: 'Comunidade', name: 'Reddit — Tips for newbies', url: 'https://www.reddit.com/r/PocketAnts/comments/1q0o9tt/tips_for_newbies/', topic: 'Prioridades de iniciantes, clã e co-op' },
  { type: 'Comunidade', name: 'Reddit — Matchmaking', url: 'https://www.reddit.com/r/PocketAnts/comments/1utie31/does_this_game_have_any_matchmaking/', topic: 'Experiência de PvP e progressão' },
  { type: 'Comunidade', name: 'Reddit — Matchups 2026', url: 'https://www.reddit.com/r/PocketAnts/comments/1ts6nra/what_are_these_matchups/', topic: 'Diferença de troféus no matchmaking' },
  { type: 'Comunidade', name: 'Reddit — Beginner creatures', url: 'https://www.reddit.com/r/PocketAnts/comments/1tr3d48/best_way_to_get_good_creatures_for_a_beginner/', topic: 'Criaturas para iniciantes' },
  { type: 'Comunidade', name: 'Reddit — Army meta', url: 'https://www.reddit.com/r/PocketAnts/comments/1r79xzj/my_army_rn_pls_rate_3/', topic: 'Frog, Crab e composição' },
  { type: 'Comunidade', name: 'Reddit — Defense', url: 'https://www.reddit.com/r/PocketAnts/comments/1u8mglz/is_this_a_good_defensive/', topic: 'Defesa e farm de criaturas' },
  { type: 'Comunidade', name: 'Reddit — Creature storage', url: 'https://www.reddit.com/r/PocketAnts/comments/1vin49r/creature_storage_becoming_full/', topic: 'Prioridade de storage e descarte' },
  { type: 'Comunidade', name: 'Reddit — Ads', url: 'https://www.reddit.com/r/PocketAnts/comments/1qyzktk/how_do_i_get_5_seconds_ad_instead_of_30_seconds/', topic: 'Experiência com anúncios' },
  { type: 'YouTube', name: 'Rupar — Fire Ant Nest full guide', url: 'https://www.youtube.com/watch?v=WSOGMIvJkhQ', topic: 'Rotas e câmaras do Fire Ant Nest' },
  { type: 'YouTube', name: 'DIZZZERT — Fire Ant Nest beginner guide', url: 'https://www.youtube.com/watch?v=b96AmYkgGek', topic: 'Guia alternativo de Fire Ant Nest' }
];
