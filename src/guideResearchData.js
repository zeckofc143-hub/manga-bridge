const L=(pt,en)=>({pt,en});

export const GUIDE_META={version:'0.1153',checkedAt:'2026-09-06',officialUrl:'https://play.google.com/store/apps/details?id=com.ariel.zanyants&hl=pt_BR'};

export const GUIDE_SOURCE_LABELS={
  official:L('Oficial / tutorial','Official / tutorial'),
  reviewed:L('Wiki revisada','Reviewed wiki'),
  consensus:L('Estratégia comunitária','Community strategy'),
  recent:L('Atualização 2026','2026 update')
};

export const GUIDE_RECORDS=[
  {
    id:'starter-roadmap',icon:'🐜',title:L('Começando do zero','Starting from zero'),category:'progression',stage:'early',source:'official',
    summary:L('Um caminho curto para sair do tutorial com economia, soldados e primeiras criaturas funcionando.','A short path to leave the tutorial with economy, soldiers and first creatures working.'),
    outcome:L('Terminar com coleta estável, Queen Chamber 2+, soldados e a base pronta para captura.','Finish with stable gathering, Queen Chamber 2+, soldiers and a colony ready for creature capture.'),
    prerequisites:[L('Nenhum além de ter iniciado o jogo.','None beyond starting the game.')],
    steps:[
      L('Siga o tutorial até construir Food Processing e começar a produzir Fungus.','Follow the tutorial until Food Processing is built and Fungus production starts.'),
      L('Construa/eleve Leaf Storage e Seed Storage sem deixar seus estoques básicos travarem.','Build/upgrade Leaf Storage and Seed Storage so basic storage does not bottleneck.'),
      L('Leve a Queen Chamber ao Lv.2 para liberar Soldier Ants.','Reach Queen Chamber Lv.2 to unlock Soldier Ants.'),
      L('Crie um grupo básico de soldados e derrote a primeira Tarantula do tutorial.','Breed a basic soldier group and defeat the tutorial Tarantula.'),
      L('Construa Body Parts Chamber e Creatures Chamber conforme o tutorial apresenta matar/capturar criaturas.','Build Body Parts Chamber and Creatures Chamber as the tutorial introduces killing/capturing creatures.'),
      L('Não tente “maxar” sistemas avançados ainda: estabilize coleta e continue as quests.','Do not try to max advanced systems yet: stabilize gathering and continue quests.')
    ],
    avoid:[L('Gastar Gems cedo só para acelerar algo que o tutorial resolveria naturalmente.','Spending Gems early just to speed up something the tutorial would naturally solve.'),L('Parar a coleta de Leaves/Seeds por longos períodos.','Leaving Leaves/Seeds gathering idle for long periods.')],
    links:{resources:['leaves','fungus','seeds'],chambers:['food-processing','leaf-storage','seed-storage','queen','body-parts','creatures'],mechanics:['capture'],creatures:['tarantula']},
    sourceUrl:'https://pocketants.fandom.com/wiki/Starter_Tutorial'
  },
  {
    id:'early-economy',icon:'🍃',title:L('Economia do early game','Early-game economy'),category:'economy',stage:'early',source:'consensus',
    summary:L('Como manter Food Processing, Leaves e Seeds avançando sem transformar armazenamento em gargalo.','How to keep Food Processing, Leaves and Seeds progressing without turning storage into a bottleneck.'),
    outcome:L('Ter recursos básicos entrando de forma contínua e espaço suficiente para upgrades.','Keep basic resources flowing continuously with enough storage for upgrades.'),
    prerequisites:[L('Food Processing construída.','Food Processing built.')],
    steps:[
      L('Mantenha trabalhadores em Leaves e Seeds sempre que os estoques não estiverem cheios.','Keep workers on Leaves and Seeds whenever storage is not full.'),
      L('Suba Food Processing, Leaf Storage e Seed Storage de forma intercalada.','Upgrade Food Processing, Leaf Storage and Seed Storage in rotation.'),
      L('Use Fungus para sustentar criação de ants e upgrades sem zerar sua reserva toda hora.','Use Fungus to sustain ant breeding and upgrades without constantly emptying your reserve.'),
      L('Quando um armazenamento encher rápido demais, trate a capacidade como o próximo gargalo.','When a storage fills too quickly, treat capacity as the next bottleneck.')
    ],
    avoid:[L('Maxar uma única câmara básica enquanto as outras ficam vários níveis atrás.','Maxing one basic chamber while the others fall several levels behind.')],
    links:{resources:['leaves','fungus','seeds'],chambers:['food-processing','leaf-storage','seed-storage'],mechanics:['offline-gathering'],creatures:[]},
    sourceUrl:'https://www.reddit.com/r/PocketAnts/comments/1q0o9tt/tips_for_newbies/'
  },
  {
    id:'queen-resin-roadmap',icon:'👑',title:L('Roadmap Queen + Resin','Queen + Resin roadmap'),category:'progression',stage:'mid',source:'reviewed',
    summary:L('O eixo principal da progressão: Resin Chamber cria capacidade para os upgrades longos da Queen Chamber.','The main progression axis: Resin Chamber creates capacity for long Queen Chamber upgrades.'),
    outcome:L('Evitar chegar num custo de Queen que sua Resin Chamber não consegue armazenar.','Avoid reaching a Queen cost your Resin Chamber cannot store.'),
    prerequisites:[L('Resin Chamber construída.','Resin Chamber built.')],
    steps:[
      L('Trate Queen Chamber como prioridade porque ela determina o nível dos Soldier Ants.','Treat Queen Chamber as a priority because it determines Soldier Ant level.'),
      L('Antes de cada Queen upgrade, confira se a capacidade de Resin comporta o custo.','Before each Queen upgrade, check whether Resin capacity can hold the cost.'),
      L('Guarde Body Parts para Resin Chamber antes de gastar pesado no Creature Lab.','Reserve Body Parts for Resin Chamber before heavy Creature Lab spending.'),
      L('Para Resin passar do Lv.10, leve Body Parts Chamber ao Lv.12.','To push Resin beyond Lv.10, take Body Parts Chamber to Lv.12.'),
      L('Nos níveis finais, planeje os upgrades longos da Queen com antecedência em vez de gastar Resin por impulso.','At final levels, plan long Queen upgrades ahead instead of spending Resin impulsively.')
    ],
    avoid:[L('Subir Creatures Chamber acima do Lv.4 cedo e depois faltar Body Parts para Resin.','Upgrading Creatures Chamber above Lv.4 early and then lacking Body Parts for Resin.')],
    links:{resources:['resin','body-parts'],chambers:['queen','resin','body-parts','creatures'],mechanics:['daily-quests','coop-mode'],creatures:[]},
    sourceUrl:'https://pocketants.fandom.com/wiki/Queen%27s_Chamber'
  },
  {
    id:'first-creatures',icon:'🪲',title:L('Primeiro exército de criaturas','First creature army'),category:'creatures',stage:'early-mid',source:'consensus',
    summary:L('Como sair de Tarantula/Mantis sem desperdiçar boas criaturas em Body Parts cedo demais.','How to move beyond Tarantula/Mantis without wasting useful creatures for Body Parts too early.'),
    outcome:L('Montar um exército funcional enquanto guarda duplicatas para fusões.','Build a functional army while saving duplicates for fusion.'),
    prerequisites:[L('Creatures Chamber construída.','Creatures Chamber built.')],
    steps:[
      L('Capture criaturas úteis antes de pensar em matar tudo por Body Parts.','Capture useful creatures before thinking about killing everything for Body Parts.'),
      L('Use qualquer criatura decente que melhore seu lineup; uma 1★ útil ainda ajuda no começo.','Use any decent creature that improves your lineup; a useful 1★ still helps early.'),
      L('Procure gradualmente Scorpion, Bombardier e Centipede entre as opções não especiais.','Gradually look for Scorpion, Bombardier and Centipede among non-special options.'),
      L('Guarde duplicatas para fusão e só converta criaturas em partes quando seu exército já estiver confortável.','Save duplicates for fusion and only convert creatures to parts once your army is comfortable.')
    ],
    avoid:[L('Perseguir criaturas de evento como se fossem necessárias para progredir no começo.','Chasing event creatures as if they were required for early progression.')],
    links:{resources:['pheromones','body-parts'],chambers:['creatures'],mechanics:['capture','attraction','fusion'],creatures:['scorpion','bombardier-beetle','centipede','hornet']},
    sourceUrl:'https://pocketants.fandom.com/wiki/Creatures'
  },
  {
    id:'body-parts-roadmap',icon:'🧩',title:L('Body Parts sem travar a conta','Body Parts without stalling'),category:'economy',stage:'mid',source:'reviewed',
    summary:L('Onde usar partes primeiro e por que Resin costuma vencer Creature Lab na disputa pelo recurso.','Where to spend parts first and why Resin usually beats Creature Lab in the resource competition.'),
    outcome:L('Usar Body Parts no que destrava progressão, não só no upgrade mais chamativo.','Spend Body Parts on progression gates, not just the flashiest upgrade.'),
    prerequisites:[L('Body Parts Chamber construída.','Body Parts Chamber built.')],
    steps:[
      L('Use Battles, Crab Beach, criaturas derrotadas e Vinegaroon como fontes conforme disponíveis.','Use Battles, Crab Beach, defeated creatures and Vinegaroon as sources when available.'),
      L('Mantenha Creatures Chamber no marco útil de Lv.4 enquanto Resin ainda não está resolvida.','Keep Creatures Chamber at the useful Lv.4 milestone while Resin is unresolved.'),
      L('Priorize Body Parts Chamber/Resin Chamber quando elas forem o gate da Queen.','Prioritize Body Parts Chamber/Resin Chamber when they gate the Queen.'),
      L('Depois de estabilizar Resin, redirecione partes para Creature Lab e fusões mais caras.','After Resin is stable, redirect parts into Creature Lab and more expensive fusions.')
    ],
    avoid:[L('Queimar milhares de partes no Lab e perceber depois que faltam para Resin 11/12.','Burning thousands of parts in the Lab and later realizing Resin 11/12 is blocked.')],
    links:{resources:['body-parts'],chambers:['body-parts','resin','creatures'],mechanics:['fusion','creature-lab','coop-mode'],creatures:[]},
    sourceUrl:'https://pocketants.fandom.com/wiki/Body_Parts'
  },
  {
    id:'resin-routine',icon:'🟠',title:L('Rotina de farm de Resin','Resin farming routine'),category:'farm',stage:'mid',source:'reviewed',
    summary:L('Combina árvore, Daily Quests, Termite co-op e outras fontes para alimentar Queen/Resin.','Combines tree farming, Daily Quests, Termite co-op and other sources to feed Queen/Resin.'),
    outcome:L('Ter uma rotina que gera Resin por várias fontes em vez de depender só da árvore.','Build a routine that generates Resin from multiple sources instead of relying only on the tree.'),
    prerequisites:[L('Resin Chamber construída.','Resin Chamber built.')],
    steps:[
      L('Colete Resin da árvore quando estiver jogando; ela não faz parte da coleta offline normal.','Collect Resin from the tree while active; it is not part of normal offline gathering.'),
      L('Complete as 4 Daily Quests para receber o pacote grande de 1.500 Resin.','Complete all 4 Daily Quests for the major 1,500 Resin bundle.'),
      L('Faça Termite Nest quando tiver tokens e precisar de Resin; o clear dá 2.000 Resin.','Run Termite Nest when you have tokens and need Resin; a clear gives 2,000 Resin.'),
      L('Use Beehive/recompensas extras como complemento, não como única rota.','Use Beehive/extra rewards as supplements, not the only route.'),
      L('Evite gastar Resin perto de um upgrade grande da Queen/Legion sem conferir sua meta.','Avoid spending Resin near a big Queen/Legion upgrade without checking your target.')
    ],
    avoid:[L('Esperar Resin acumular offline como Leaves/Seeds.','Expecting Resin to accumulate offline like Leaves/Seeds.')],
    links:{resources:['resin','battle-tokens'],chambers:['resin','queen'],mechanics:['daily-quests','coop-mode','offline-gathering'],creatures:[]},
    sourceUrl:'https://pocketants.fandom.com/wiki/Resin_Chamber'
  },
  {
    id:'honeydew-routine',icon:'🍯',title:L('Rotina de Honeydew','Honeydew routine'),category:'farm',stage:'mid',source:'reviewed',
    summary:L('Aphid Farm + Daily Quests + Frog/Fire Ant Nest quando disponíveis, com foco no multiplicador.','Aphid Farm + Daily Quests + Frog/Fire Ant Nest when available, with focus on the multiplier.'),
    outcome:L('Transformar Honeydew de recurso raro em uma renda previsível.','Turn Honeydew from a scarce resource into predictable income.'),
    prerequisites:[L('Honeydew Chamber construída para Aphid Farms aparecerem.','Honeydew Chamber built so Aphid Farms can spawn.')],
    steps:[
      L('Conclua Aphid Farm e marque o respawn de 6 horas.','Complete Aphid Farm and track the 6-hour respawn.'),
      L('Proteja o convoy: cada aphid perdido reduz o Honeydew recebido.','Protect the convoy: every lost aphid reduces received Honeydew.'),
      L('Priorize o Honeydew Multiplier cedo; o valor por aphid pode chegar a 15.','Prioritize the Honeydew Multiplier early; value per aphid can reach 15.'),
      L('Complete as 4 Daily Quests para mais 150 Honeydew.','Complete all 4 Daily Quests for another 150 Honeydew.'),
      L('Quando QC8+ permitir, Frog Pond adiciona 250 Honeydew por clear público.','Once QC8+ allows it, Frog Pond adds 250 Honeydew per public clear.')
    ],
    avoid:[L('Ignorar a segurança do convoy e focar só em matar os guardas iniciais.','Ignoring convoy safety and focusing only on the initial guards.')],
    links:{resources:['honeydew'],chambers:['honeydew','queen'],mechanics:['aphid-farm','daily-quests','coop-mode'],creatures:[]},
    sourceUrl:'https://pocketants.fandom.com/wiki/Aphid_Farm'
  },
  {
    id:'coop-daily',icon:'🤝',title:L('Co-op diário sem gastar token à toa','Daily co-op without wasting tokens'),category:'coop',stage:'mid',source:'reviewed',
    summary:L('Escolha Termite, Crab ou Frog pelo recurso que realmente está travando sua progressão.','Choose Termite, Crab or Frog based on the resource actually blocking progression.'),
    outcome:L('Converter Battle Tokens no recurso certo e aproveitar os limites público/clã.','Convert Battle Tokens into the right resource and use public/clan daily limits well.'),
    prerequisites:[L('QC2 para Termite/Crab; QC8 para Frog.','QC2 for Termite/Crab; QC8 for Frog.')],
    steps:[
      L('Resin travando? Priorize Termite Nest: 2.000 Resin por clear.','Resin blocking you? Prioritize Termite Nest: 2,000 Resin per clear.'),
      L('Body Parts travando? Crab Beach dá 100 Body Parts e avança a barra do Crab.','Body Parts blocking you? Crab Beach gives 100 Body Parts and advances the Crab bar.'),
      L('Honeydew travando e QC8+? Frog Pond dá 250 Honeydew.','Honeydew blocking you and QC8+? Frog Pond gives 250 Honeydew.'),
      L('Confira o custo de entrada antes de entrar; recursos só são descontados quando a partida começa.','Check entry cost before joining; resources are only deducted once the match starts.'),
      L('Use boosters de Gems somente quando o benefício fizer sentido para aquela tentativa.','Use Gem boosters only when the benefit makes sense for that run.')
    ],
    avoid:[L('Entrar automaticamente no mesmo co-op todo dia sem olhar seu gargalo atual.','Automatically running the same co-op daily without checking your current bottleneck.')],
    links:{resources:['battle-tokens','resin','body-parts','honeydew'],chambers:['queen'],mechanics:['coop-mode','battle-tokens'],creatures:['crab']},
    sourceUrl:'https://pocketants.fandom.com/wiki/Co-op_Mode'
  },
  {
    id:'fusion-safe',icon:'✨',title:L('Fusão sem jogar criatura boa fora','Fusion without wasting good creatures'),category:'creatures',stage:'mid',source:'reviewed',
    summary:L('Quando tentar fusão, quais upgrades melhoram a chance e como reservar boosts para tentativas valiosas.','When to fuse, which upgrades improve chance and how to reserve boosts for valuable attempts.'),
    outcome:L('Fazer fusões com chance consciente e reservar Gems/Bluebells para criaturas importantes.','Fuse with known odds and reserve Gems/Bluebells for important creatures.'),
    prerequisites:[L('Duas criaturas da mesma espécie/estrela quando exigido pelo sistema.','Two creatures of the same species/star when required by the system.')],
    steps:[
      L('Leve Creatures Chamber ao Lv.4 para chegar ao teto de bônus base da chamber.','Reach Creatures Chamber Lv.4 for the chamber base bonus cap.'),
      L('Suba Fusion Success Chance na Honeydew Shop conforme sua economia permitir.','Upgrade Fusion Success Chance in the Honeydew Shop as your economy allows.'),
      L('Guarde Bluebells (+5%) para fazer várias fusões durante a duração da flor.','Save Bluebells (+5%) to perform multiple fusions during the flower duration.'),
      L('Use boosts caros de Gems principalmente em criaturas raras/valiosas, não em qualquer tentativa.','Use expensive Gem boosts mainly on rare/valuable creatures, not every attempt.'),
      L('Lembre que falhar ainda consome uma das criaturas usadas.','Remember a failed fusion still consumes one of the creatures used.')
    ],
    avoid:[L('Subir Creatures Chamber acima do 4 achando que a chance base continuará crescendo.','Upgrading Creatures Chamber above 4 expecting base fusion chance to keep increasing.')],
    links:{resources:['body-parts','honeydew','gems'],chambers:['creatures','water'],mechanics:['fusion','garden'],creatures:[]},
    sourceUrl:'https://pocketants.fandom.com/wiki/Fusion'
  },
  {
    id:'garden-roadmap',icon:'🌸',title:L('Garden sem desperdiçar Water','Garden without wasting Water'),category:'garden',stage:'mid-late',source:'reviewed',
    summary:L('Quando o Garden começa a valer atenção e quais marcos de Water Storage mudam as sementes.','When the Garden becomes worth attention and which Water Storage milestones change seeds.'),
    outcome:L('Usar Water e sementes de flores com um objetivo claro: atração, fusão, farm ou combate.','Use Water and flower seeds with a clear objective: attraction, fusion, farming or combat.'),
    prerequisites:[L('Water Storage Chamber construída para cavar/usar o sistema de sementes.','Water Storage Chamber built to use the seed system.')],
    steps:[
      L('Não trate o Garden como prioridade do primeiro dia só porque ele está visível desde cedo.','Do not treat Garden as a day-one priority just because it is visible early.'),
      L('Use os marcos Water Lv.1, Lv.6 e Lv.10 para liberar grupos melhores de sementes.','Use Water Lv.1, Lv.6 and Lv.10 milestones to unlock better seed groups.'),
      L('No Lv.10, Bluebells se torna uma opção valiosa para +5% de fusion chance.','At Lv.10, Bluebells becomes a valuable +5% fusion chance option.'),
      L('Planeje ativações de flores para fazer várias ações úteis dentro da duração.','Plan flower activations so multiple useful actions fit inside their duration.')
    ],
    avoid:[L('Gastar Water em flores sem saber qual efeito você precisa naquele momento.','Spending Water on flowers without knowing which effect you need at that moment.')],
    links:{resources:['water'],chambers:['water'],mechanics:['garden','fusion','attraction'],creatures:[]},
    sourceUrl:'https://pocketants.fandom.com/wiki/Garden_Flower'
  },
  {
    id:'pvp-roadmap',icon:'⚔️',title:L('PvP: entrar na hora certa','PvP: start at the right time'),category:'combat',stage:'mid',source:'reviewed',
    summary:L('Como usar PvP para Pheromones/recursos sem transformar matchmaking difícil em um muro de progressão.','How to use PvP for Pheromones/resources without turning hard matchmaking into a progression wall.'),
    outcome:L('Saber quando vale usar Battle Token e qual marco de destruição perseguir.','Know when a Battle Token is worth using and which destruction threshold to pursue.'),
    prerequisites:[L('Exército capaz de chegar consistentemente a pelo menos 50% em alvos adequados.','An army capable of consistently reaching at least 50% on suitable targets.')],
    steps:[
      L('Entre com objetivo claro: Pheromones, recursos ou troféus.','Enter with a clear goal: Pheromones, resources or trophies.'),
      L('Com Battle Token, 50%/75%/100% correspondem a 1/2/3 Pheromones.','With a Battle Token, 50%/75%/100% correspond to 1/2/3 Pheromones.'),
      L('Se seus alvos estão muito acima do seu exército, volte a fortalecer Queen/soldados/criaturas antes de forçar PvP.','If opponents are far above your army, strengthen Queen/soldiers/creatures before forcing PvP.'),
      L('Depois de uma derrota defensiva, lembre que iniciar um ataque cancela o shield ativo.','After a defensive loss, remember that starting an attack cancels the active shield.')
    ],
    avoid:[L('Gastar tokens só por hábito quando Resin/Body Parts/Honeydew de co-op são seu gargalo.','Spending tokens by habit when co-op Resin/Body Parts/Honeydew are your bottleneck.')],
    links:{resources:['battle-tokens','pheromones'],chambers:['queen'],mechanics:['pvp','defending','leagues','battle-tokens'],creatures:[]},
    sourceUrl:'https://pocketants.fandom.com/wiki/Attacking'
  },
  {
    id:'clan-roadmap',icon:'🏕️',title:L('Entrando em clã e aproveitando de verdade','Joining a clan and actually benefiting'),category:'clan',stage:'mid-late',source:'consensus',
    summary:L('Clã não é só chat: co-op, bônus, recursos e Clan Wars aceleram várias partes da progressão.','A clan is more than chat: co-op, bonuses, resources and Clan Wars speed up several progression systems.'),
    outcome:L('Entrar num clã ativo e usar seus sistemas sem doar recursos de gargalo sem pensar.','Join an active clan and use its systems without blindly donating bottleneck resources.'),
    prerequisites:[L('Atender aos requisitos de QC/troféus do clã desejado.','Meet the desired clan QC/trophy requirements.')],
    steps:[
      L('Procure um clã ativo com co-ops e comunicação frequentes.','Look for an active clan with frequent co-ops and communication.'),
      L('Participe de Termite/Crab clan co-op quando puder: os limites são separados dos públicos.','Participate in Termite/Crab clan co-op when possible: limits are separate from public runs.'),
      L('Doe sem comprometer o próximo upgrade importante da sua própria colônia.','Donate without compromising your next important colony upgrade.'),
      L('Quando chegar ao late game, participe de Clan Wars para gerar Silk e progressão nova.','At late game, participate in Clan Wars to generate Silk and newer progression.')
    ],
    avoid:[L('Ficar num clã praticamente inativo só por já estar nele.','Staying in a mostly inactive clan just because you are already there.')],
    links:{resources:['silk','resin'],chambers:['queen'],mechanics:['clans','clan-wars','coop-mode'],creatures:[]},
    sourceUrl:'https://pocketants.fandom.com/wiki/FAQ'
  },
  {
    id:'late-game-2026',icon:'🪖',title:L('Late game 2026: Clan Wars, Silk e Legions','2026 late game: Clan Wars, Silk & Legions'),category:'late',stage:'late',source:'recent',
    summary:L('A progressão moderna adiciona um novo destino para Resin e uma economia própria de Silk.','Modern progression adds a new destination for Resin and a separate Silk economy.'),
    outcome:L('Entrar no sistema de Legions sem gastar Resin/Silk sem saber o próximo custo.','Enter the Legion system without spending Resin/Silk without knowing the next cost.'),
    prerequisites:[L('Clã ativo e acesso à progressão tardia.','Active clan and access to late-game progression.')],
    steps:[
      L('Participe do ciclo semanal de Clan Wars: registro sexta, preparação sábado, guerra domingo, rewards segunda.','Participate in the weekly Clan War cycle: Friday registration, Saturday prep, Sunday war, Monday rewards.'),
      L('Reivindique as recompensas manualmente antes da próxima janela de registro.','Claim rewards manually before the next registration window.'),
      L('Planeje 50.000 Resin para o primeiro Legion slot.','Plan 50,000 Resin for the first Legion slot.'),
      L('Guarde Silk para slots 2–4 e ant species que custam 5.000 Silk.','Save Silk for slots 2–4 and ant species costing 5,000 Silk.'),
      L('Não confunda “fim das chambers” com fim da progressão: Resin continua relevante aqui.','Do not confuse “finished chambers” with finished progression: Resin remains relevant here.')
    ],
    avoid:[L('Gastar Silk como se fosse um recurso comum antes de definir qual Legion/slot vem primeiro.','Spending Silk like a common resource before deciding which Legion/slot comes first.')],
    links:{resources:['silk','resin'],chambers:['resin'],mechanics:['clan-wars','legions','clans'],creatures:[]},
    sourceUrl:'https://pocketants.fandom.com/wiki/Legions'
  }
];

export const GUIDE_CATEGORIES=['all','progression','economy','farm','creatures','coop','garden','combat','clan','late'];

export const GUIDE_GOALS={
  start:{label:L('Acabei de começar','I just started'),ids:['starter-roadmap','early-economy','first-creatures']},
  stuck:{label:L('Minha progressão travou','My progression is stuck'),ids:['queen-resin-roadmap','body-parts-roadmap','resin-routine']},
  army:{label:L('Quero melhorar o exército','I want a stronger army'),ids:['first-creatures','fusion-safe','pvp-roadmap']},
  resin:{label:L('Preciso de Resin','I need Resin'),ids:['resin-routine','coop-daily','queen-resin-roadmap']},
  honeydew:{label:L('Preciso de Honeydew','I need Honeydew'),ids:['honeydew-routine','coop-daily','garden-roadmap']},
  social:{label:L('Quero usar clã/co-op','I want clan/co-op'),ids:['coop-daily','clan-roadmap','late-game-2026']},
  late:{label:L('Cheguei no late game','I reached late game'),ids:['clan-roadmap','late-game-2026','garden-roadmap']}
};

export const GUIDE_STAGE_ROUTES={
  early:{label:L('Início','Early'),ids:['starter-roadmap','early-economy','first-creatures']},
  mid:{label:L('Meio','Mid'),ids:['queen-resin-roadmap','body-parts-roadmap','resin-routine','honeydew-routine','coop-daily','fusion-safe','pvp-roadmap']},
  late:{label:L('Avançado','Late'),ids:['garden-roadmap','clan-roadmap','late-game-2026']}
};
