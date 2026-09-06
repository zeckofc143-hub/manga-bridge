const L=(pt,en)=>({pt,en});

export const STRATEGY_META={version:'0.1153',checkedAt:'2026-09-06'};

export const STRATEGY_SOURCES={
  official:'https://play.google.com/store/apps/details?id=com.ariel.zanyants',
  faq:'https://pocketants.fandom.com/wiki/FAQ',
  aphid:'https://pocketants.fandom.com/wiki/Aphid_Farm',
  gems:'https://pocketants.fandom.com/wiki/Gems',
  clans:'https://pocketants.fandom.com/wiki/Clans',
  coop:'https://pocketants.fandom.com/wiki/Co-op_Mode',
  wars:'https://pocketants.fandom.com/wiki/Clan_Wars',
  redditBeginner:'https://www.reddit.com/r/PocketAnts/comments/1q0o9tt/tips_for_newbies/',
  redditReturn:'https://www.reddit.com/r/PocketAnts/comments/1v1e459/just_got_back_in_the_game/',
  redditMatch:'https://www.reddit.com/r/PocketAnts/comments/1vccqh7/why_am_i_only_getting_matched_with_people_with_11/',
  redditCreatures:'https://www.reddit.com/r/PocketAnts/comments/1tr3d48/best_way_to_get_good_creatures_for_a_beginner/',
  redditDefense:'https://www.reddit.com/r/PocketAnts/comments/1vdiwrc/can_somebody_draft_me_a_good_defense/',
  redditDefense2:'https://www.reddit.com/r/PocketAnts/comments/1uml3no/help_regarding_defense/',
  redditGems:'https://www.reddit.com/r/PocketAnts/comments/1uxxqp7/help/'
};

export const STRATEGY_RECORDS=[
  {
    id:'colony-first',icon:'🏠',title:L('Colônia primeiro, PvP depois','Colony first, PvP later'),category:'progression',stage:'early',status:'consensus',
    summary:L('Para uma conta nova, a comunidade recente converge em fortalecer Food Processing, Leaf/Seed storage e Queen antes de perseguir rank.','For a new account, recent community advice converges on strengthening Food Processing, Leaf/Seed storage and Queen before chasing rank.'),
    actions:[L('Mantenha Food Processing, Leaf e Seed Chambers subindo.','Keep Food Processing, Leaf and Seed Chambers upgrading.'),L('Use Resin principalmente para remover gargalos de Queen/progressão.','Use Resin mainly to remove Queen/progression bottlenecks.'),L('Faça PvP o suficiente para objetivos úteis, mas não use troféu como principal medida de progresso.','Do enough PvP for useful objectives, but do not use trophies as your main progress metric.')],
    why:[L('Matchmaking pode colocar iniciantes contra exércitos muito mais completos; melhorar a economia abre workers, soldados e upgrades que ajudam em todo o resto.','Matchmaking can put beginners against much more complete armies; economy upgrades unlock workers, soldiers and upgrades that help everywhere else.')],
    avoid:[L('Tentar “consertar” early game só perdendo troféus ou gastando recursos em PvP.','Trying to fix early game only by losing trophies or spending resources on PvP.')],
    sources:['redditBeginner','redditReturn','redditMatch']
  },
  {
    id:'capture-before-parts',icon:'🪤',title:L('Monte o exército antes de moer tudo em partes','Build the army before grinding everything into parts'),category:'creatures',stage:'early',status:'community',
    summary:L('Se ainda faltam slots preenchidos, jogadores recentes sugerem capturar boa parte das criaturas derrotadas em vez de colher Body Parts automaticamente.','If your army still has empty slots, recent players suggest capturing many defeated creatures instead of automatically harvesting Body Parts.'),
    actions:[L('Preencha o exército com criaturas funcionais.','Fill the army with functional creatures.'),L('Depois use duplicatas/fracas como fonte de Body Parts.','Then use duplicates/weaker creatures as a Body Parts source.')],
    why:[L('Um slot ocupado ajuda imediatamente em PvP, defesa e co-op; Body Parts só valem mais quando já existe uma base de criaturas.','An occupied slot helps immediately in PvP, defense and co-op; Body Parts become more valuable once you already have a creature base.')],
    avoid:[L('Tratar toda criatura morta como “100% Body Parts” no primeiro dia.','Treating every dead creature as “100% Body Parts” on day one.')],
    sources:['redditMatch','redditCreatures']
  },
  {
    id:'early-creatures',icon:'🦂',title:L('Criaturas early que a comunidade ainda cita','Early creatures the community still recommends'),category:'creatures',stage:'early-mid',status:'community',
    summary:L('Scorpion, Bombardier Beetle e Centipede aparecem repetidamente em conselhos recentes; Hornet é citado como bom início, mas perde valor quando aparecem counters mais fortes.','Scorpion, Bombardier Beetle and Centipede repeatedly appear in recent advice; Hornet is cited as a good starter but loses value once stronger counters appear.'),
    actions:[L('Procure Scorpion/Bombardier/Centipede quando as condições permitirem.','Look for Scorpion/Bombardier/Centipede when conditions allow.'),L('Use Hornet como ponte, não como investimento eterno.','Use Hornet as a bridge, not an eternal investment.'),L('Durante eventos, priorize special creatures que realmente melhoram seu lineup.','During events, prioritize special creatures that actually improve your lineup.')],
    why:[L('A meta muda e especiais recentes podem superar criaturas normais; por isso a wiki não transforma ranking comunitário em stat oficial.','The meta changes and recent specials can outperform normal creatures; that is why the wiki does not turn community rankings into official stats.')],
    avoid:[L('Apagar uma criatura só porque alguém chamou de “ruim” sem olhar estrelas, função e seu estágio.','Deleting a creature just because someone called it “bad” without checking stars, role and your stage.')],
    sources:['redditCreatures','redditReturn']
  },
  {
    id:'resin-window',icon:'⏱️',title:L('Termite acabou? A próxima meia hora é Resin','Termite done? The next half hour is Resin time'),category:'farm',stage:'early-late',status:'consensus',
    summary:L('Termite Nest dá 2.000 Resin e desativa termites da árvore por 30 minutos. Jogadores recomendam usar a janela imediatamente.','Termite Nest gives 2,000 Resin and disables tree termites for 30 minutes. Players recommend using the window immediately.'),
    actions:[L('Prepare workers/fungus antes do co-op quando possível.','Prepare workers/fungus before the co-op when possible.'),L('Ao terminar, entre na árvore e use o timer inteiro.','When it ends, enter the tree and use the whole timer.')],
    why:[L('O timer não acumula e Resin não continua sendo coletada offline.','The timer does not stack and Resin does not continue gathering offline.')],
    avoid:[L('Fazer outro Termite enquanto o timer ainda está alto esperando 60 minutos.','Doing another Termite while the timer is still high expecting 60 minutes.')],
    sources:['faq','coop']
  },
  {
    id:'honeydew-upgrades',icon:'🍯',title:L('Honeydew: barato primeiro, multiplicador cedo','Honeydew: cheap upgrades first, multiplier early'),category:'economy',stage:'early-mid',status:'consensus',
    summary:L('A FAQ registra como conselho comum comprar upgrades baratos (até ~1.200 Honeydew) e depois acelerar o Honeydew Multiplier; o nível 5 leva o multiplicador de x5 para x10.','The FAQ records common advice to buy cheap upgrades (up to ~1,200 Honeydew) and then push the Honeydew Multiplier; level 5 moves the multiplier from x5 to x10.'),
    actions:[L('Pegue upgrades baratos que melhoram a rotina inteira.','Take cheap upgrades that improve the whole routine.'),L('Depois priorize o multiplicador se Aphid Farms/eventos forem importantes.','Then prioritize the multiplier if Aphid Farms/events matter to you.')],
    why:[L('Mais Honeydew por aphid também aumenta activity points em eventos que contam Honeydew da farm.','More Honeydew per aphid also increases activity points in events that count farm Honeydew.')],
    avoid:[L('Gastar tudo num upgrade caro e ficar sem multiplicador/velocidade básica.','Spending everything on one expensive upgrade and missing multiplier/basic speed.')],
    sources:['faq','aphid']
  },
  {
    id:'gem-priority',icon:'💎',title:L('Gems: slots e fusões valem mais que atalhos','Gems: slots and fusions beat shortcuts'),category:'economy',stage:'all',status:'consensus',
    summary:L('Wiki e comentários recentes apontam storage slots, boosts de fusão e Creature Lab como usos de alto valor; comprar comida/tokens/Aphid Farm é geralmente tratado como fraco.','Wiki and recent comments point to storage slots, fusion boosts and Creature Lab as high-value uses; buying food/tokens/Aphid Farm is generally treated as weak value.'),
    actions:[L('Reserve Gems para os primeiros slots de criatura.','Reserve Gems for the first creature slots.'),L('Guarde boost para fusões que realmente doem perder, principalmente especiais/raras.','Save boosts for fusions that are painful to lose, especially special/rare ones.')],
    why:[L('Slots são progresso permanente e fusão de alto valor evita perder recursos raros.','Slots are permanent progress and high-value fusion boosts protect rare resources.')],
    avoid:[L('Spawnar Aphid Farm com Gems por impulso.','Spawning Aphid Farm with Gems on impulse.'),L('Comprar Battle Tokens/comida só para acelerar alguns minutos.','Buying Battle Tokens/food just to save a few minutes.')],
    sources:['gems','redditGems']
  },
  {
    id:'organized-coops',icon:'🤝',title:L('Co-op organizado tende a render mais','Organized co-op tends to perform better'),category:'social',stage:'mid-late',status:'community',
    summary:L('Jogadores recomendam clã ativo e lobbies organizados em vez de depender apenas da busca pública, principalmente para conteúdos mais difíceis.','Players recommend an active clan and organized lobbies instead of relying only on public search, especially for harder content.'),
    actions:[L('Entre em clã com horário de co-op compatível com você.','Join a clan with co-op times that fit you.'),L('Use clan co-ops para uma segunda oportunidade diária de Termite/Crab quando disponível.','Use clan co-ops for an additional daily Termite/Crab opportunity when available.'),L('Em Frog/Crab, combine estratégia antes de iniciar se o grupo ainda estiver aprendendo.','In Frog/Crab, agree on strategy before starting if the group is still learning.')],
    why:[L('Clãs também oferecem doações, bônus temporários e co-ops especiais.','Clans also offer donations, temporary bonuses and special co-ops.')],
    avoid:[L('Criar um clã novo só porque parece mais rápido; a wiki diz que gerenciar um clã sério exige bastante esforço.','Creating a new clan just because it seems faster; the wiki says running a serious clan takes substantial effort.')],
    sources:['clans','redditBeginner']
  },
  {
    id:'defense-placement',icon:'🛡️',title:L('Defesa PvP: posição tem debate real','PvP defense: placement is genuinely debated'),category:'combat',stage:'mid-late',status:'conflict',
    summary:L('Discussões recentes discordam entre concentrar tudo na Queen Chamber e posicionar unidades acima/na entrada com Flytrap. A wiki deve mostrar o conflito, não declarar uma formação universal.','Recent discussions disagree between stacking everything in the Queen Chamber and placing units above/near the entrance with Flytrap. The wiki should show the conflict, not declare a universal formation.'),
    actions:[L('Teste sua própria defesa por friendly/test battle quando possível.','Test your own defense with friendly/test battles when possible.'),L('Se o oponente usa Chrysanthemum, evite depender de uma única pilha de criaturas.','If opponents use Chrysanthemum, avoid relying on one single creature stack.'),L('Use Flytrap e soldados como parte de uma defesa em camadas quando o layout permitir.','Use Flytrap and soldiers as part of layered defense when the layout allows.')],
    why:[L('Uma formação que funciona contra melee pode falhar contra stun, flyers ou lineup diferente.','A formation that works against melee can fail against stun, flyers or a different lineup.')],
    avoid:[L('Copiar “tudo na Queen” como regra absoluta.','Copying “everything in Queen” as an absolute rule.')],
    sources:['redditDefense','redditDefense2']
  },
  {
    id:'late-systems',icon:'🧱',title:L('Não abra dez sistemas late ao mesmo tempo','Do not open ten late systems at once'),category:'progression',stage:'mid',status:'community',
    summary:L('Uma recomendação recente bastante votada é adiar Fire Ant Nest, Aphid pets, attack flowers, Creatures Chamber acima de 4 e grind pesado de PvP até a Queen estar bem mais avançada.','A recent well-received recommendation is to delay Fire Ant Nest, Aphid pets, attack flowers, Creatures Chamber above 4 and heavy PvP grinding until Queen is much further along.'),
    actions:[L('Pergunte qual sistema remove seu gargalo atual antes de gastar.','Ask which system removes your current bottleneck before spending.'),L('Se Queen/Resin ainda travam tudo, trate sistemas laterais como opcionais.','If Queen/Resin still block everything, treat side systems as optional.')],
    why:[L('Body Parts, Resin, Honeydew e Gems competem entre vários sistemas; abrir todos cedo dilui progresso.','Body Parts, Resin, Honeydew and Gems compete across many systems; opening everything early dilutes progress.')],
    avoid:[L('Usar “QC10” como regra matemática; é uma referência comunitária, não requisito oficial.','Using “QC10” as a mathematical rule; it is community guidance, not an official requirement.')],
    sources:['redditBeginner']
  },
  {
    id:'event-order',icon:'🎉',title:L('Evento: faça primeiro o que tem reset','Event: do reset-limited tasks first'),category:'event',stage:'all',status:'pattern',
    summary:L('Major Events históricos misturam tarefas diárias, Acorns, Red Ants, Aphid Honeydew, Pheromones e fontes de 24h. A rota mais segura é consumir primeiro o que expira/resetta.','Historical Major Events mix daily tasks, Acorns, Red Ants, Aphid Honeydew, Pheromones and 24h sources. The safest route is to consume expiring/reset-limited activities first.'),
    actions:[L('Colete itens diários/Acorns e faça atividades com reset.','Collect daily items/Acorns and do reset-limited activities.'),L('Depois use Aphid/event source/PvP para completar o que faltar.','Then use Aphid/event source/PvP to finish what remains.'),L('Confira a edição atual antes de usar uma tabela antiga.','Check the current edition before using an old point table.')],
    why:[L('Padrões de evento se repetem, mas timers e pontuação mudam entre edições.','Event patterns repeat, but timers and scoring change between editions.')],
    avoid:[L('Gastar Gems para completar activity bar cedo sem calcular quanto ainda virá de tarefas gratuitas.','Spending Gems to fill the activity bar early without calculating how many free points are still coming.')],
    sources:['faq','gems']
  },
  {
    id:'clan-war-claim',icon:'🧵',title:L('Clan War: ganhar e esquecer de coletar ainda é perder','Clan War: winning and forgetting to claim is still losing'),category:'social',stage:'late',status:'high',
    summary:L('Silk pessoal depende de contribuição/tier/resultado e precisa ser reivindicada entre segunda-feira e o próximo registro.','Personal Silk depends on contribution/tier/result and must be claimed between Monday and the next registration.'),
    actions:[L('Participe dos 3 ataques disponíveis no War Day quando estiver registrado.','Use the 3 available attacks on War Day when registered.'),L('Na segunda-feira, reivindique sua recompensa antes da próxima janela de registro.','On Monday, claim your reward before the next registration window.')],
    why:[L('Recompensas não reivindicadas até o próximo registro são perdidas.','Rewards unclaimed by the next registration are lost.')],
    avoid:[L('Tratar Silk como farm diário; o ciclo é semanal.','Treating Silk as a daily farm; the cycle is weekly.')],
    sources:['wars']
  }
];

export const STRATEGY_CATEGORIES=['all','progression','economy','farm','creatures','combat','social','event'];
