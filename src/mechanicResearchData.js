const L=(pt,en)=>({pt,en});
const wikiSearch=query=>`https://pocketants.fandom.com/wiki/Special:Search?query=${encodeURIComponent(query)}`;

export const MECHANIC_RESEARCH_META={
  version:'0.1153',
  checkedAt:'2026-09-06',
  officialUrl:'https://play.google.com/store/apps/details?id=com.ariel.zanyants&hl=pt_BR',
  wikiUrl:'https://pocketants.fandom.com/wiki/PocketAnts_Wiki',
  note:L('A busca externa desta revisão apresentou erro interno; dados abaixo combinam a base já revisada do projeto com pesquisas anteriores. Pontos comunitários continuam rotulados.','External search hit an internal error during this revision; the data below combines the project reviewed database with earlier research. Community claims remain labeled.')
};

export const MECHANIC_RECORDS=[
  {
    id:'capture',icon:'🪤',name:L('Captura de criaturas','Creature capture'),category:'creatures',stage:'early-mid',source:'official',kind:'system',
    summary:L('Depois de derrotar uma criatura, a Creatures Chamber permite capturá-la para o exército em vez de tratá-la apenas como fonte de partes.','After defeating a creature, the Creatures Chamber lets you capture it for your army instead of treating it only as a source of parts.'),
    facts:[L('Construir a Creatures Chamber habilita a captura.','Building the Creatures Chamber enables capture.'),L('O tempo de captura pertence à criatura; subir a chamber não reduz automaticamente esse tempo.','Capture time belongs to the creature; upgrading the chamber does not automatically reduce that time.'),L('O timer de captura continua enquanto você está fora do mapa.','The capture timer continues while you are away from the map.')],
    steps:[L('Derrote uma criatura atraída ou encontrada.','Defeat an attracted or encountered creature.'),L('Escolha capturar quando a opção estiver disponível.','Choose capture when the option is available.'),L('Aguarde o tempo da espécie e gerencie seus slots.','Wait for the species timer and manage your slots.')],
    mistakes:[L('Confundir upgrade da Creatures Chamber com redução do tempo de captura.','Assuming Creatures Chamber upgrades reduce capture time.')],
    related:{resources:['pheromones','body-parts'],chambers:['creatures'],creatures:[]},search:'Creatures Chamber capture'
  },
  {
    id:'attraction',icon:'🧪',name:L('Atração e feromônios','Attraction & pheromones'),category:'creatures',stage:'early-mid',source:'reviewed',kind:'system',
    summary:L('Feromônios atraem criaturas, mas espécie, cor do feromônio, liga e condições como horário, chuva ou Honeycomb podem mudar o resultado.','Pheromones attract creatures, but species, pheromone color, league and conditions such as time, rain or Honeycomb can change the result.'),
    facts:[L('A base atual trabalha com Pink, Gold, Platinum, Diamond e Emerald Pheromones.','The current database tracks Pink, Gold, Platinum, Diamond and Emerald Pheromones.'),L('Algumas criaturas exigem condições extras de horário, clima ou item.','Some creatures require extra time, weather or item conditions.'),L('PvP é uma das rotas para obter feromônios ligados à liga.','PvP is one route to obtain league-linked pheromones.')],
    steps:[L('Confira a criatura desejada e a condição dela.','Check the target creature and its condition.'),L('Use o tipo de feromônio adequado ao seu estágio/liga.','Use the pheromone type appropriate to your stage/league.'),L('Espere a condição especial quando necessário.','Wait for the special condition when needed.')],
    mistakes:[L('Gastar feromônio sem conferir chuva, período do dia ou item exigido.','Spending pheromones without checking rain, time of day or required item.')],
    related:{resources:['pheromones'],chambers:['creatures'],creatures:['dragonfly','scorpion','hornet']},search:'Pheromones creatures attraction'
  },
  {
    id:'fusion',icon:'✨',name:L('Fusão de criaturas','Creature fusion'),category:'creatures',stage:'mid',source:'reviewed',kind:'system',
    summary:L('Fusão transforma criaturas em versões de estrelas maiores. A chance base melhora nos primeiros níveis da Creatures Chamber e pode receber bônus de outros sistemas.','Fusion upgrades creatures to higher-star versions. Base chance improves through the early Creatures Chamber levels and can receive bonuses from other systems.'),
    facts:[L('A Creatures Chamber melhora a chance base apenas até o nível 4.','Creatures Chamber improves base fusion chance only through level 4.'),L('Níveis 5–12 da chamber passam a focar Creature Lab, não mais chance base de fusão.','Chamber levels 5–12 shift to Creature Lab progression rather than base fusion chance.'),L('Honeydew, flores e outros bônus podem complementar a chance.','Honeydew, flowers and other bonuses can supplement the chance.')],
    steps:[L('Cheque a chance atual antes de gastar partes.','Check your current chance before spending parts.'),L('Considere chegar ao marco útil da Creatures Chamber.','Consider reaching the useful Creatures Chamber milestone.'),L('Some bônus permanentes/situacionais antes de tentativas caras.','Stack permanent/situational bonuses before expensive attempts.')],
    mistakes:[L('Subir Creatures Chamber acima do 4 esperando que a chance base continue aumentando.','Upgrading Creatures Chamber above 4 expecting base fusion chance to keep rising.')],
    related:{resources:['body-parts','gems','honeydew'],chambers:['creatures','water'],creatures:[]},search:'Creatures fusion'
  },
  {
    id:'creature-lab',icon:'🧬',name:L('Creature Lab','Creature Lab'),category:'creatures',stage:'mid-late',source:'reviewed',kind:'progression',
    summary:L('Depois da fase inicial de fusão, níveis altos da Creatures Chamber passam a destravar a progressão do Creature Lab.','After the early fusion phase, higher Creatures Chamber levels unlock Creature Lab progression.'),
    facts:[L('A transição prática começa depois do marco de Creatures Chamber 4.','The practical transition starts after the Creatures Chamber 4 milestone.'),L('Investir aqui compete por Body Parts com a progressão de Resin.','Investment here competes for Body Parts with Resin progression.')],
    steps:[L('Estabilize a progressão básica de captura/fusão.','Stabilize basic capture/fusion progression.'),L('Cheque se Resin/Queen ainda são gargalos maiores.','Check whether Resin/Queen are still larger bottlenecks.'),L('Aí avance Creature Lab conforme seu objetivo de criaturas.','Then progress Creature Lab according to your creature goals.')],
    mistakes:[L('Queimar Body Parts cedo e travar Resin Chamber depois.','Burning Body Parts early and later stalling Resin Chamber.')],
    related:{resources:['body-parts','gems'],chambers:['creatures','resin','body-parts'],creatures:[]},search:'Creature Lab'
  },
  {
    id:'pvp',icon:'⚔️',name:L('PvP / invasões','PvP / invasions'),category:'combat',stage:'mid',source:'official',kind:'battle',
    summary:L('Invasões colocam sua colônia contra outros jogadores e conectam combate, ligas, Battle Tokens, recursos e feromônios.','Invasions pit your colony against other players and connect combat, leagues, Battle Tokens, resources and pheromones.'),
    facts:[L('A descrição oficial confirma invasões a colônias de outros jogadores.','The official description confirms invasions of other players colonies.'),L('A documentação comunitária liga a recompensa de feromônios ao desempenho/destruição e à liga.','Community documentation links pheromone rewards to performance/destruction and league.')],
    steps:[L('Confira seus soldados e lineup de criaturas.','Check your soldiers and creature lineup.'),L('Use Battle Tokens quando a recompensa fizer sentido para sua fase.','Use Battle Tokens when the reward makes sense for your stage.'),L('Use o resultado para alimentar progressão de feromônios/liga.','Use results to feed pheromone/league progression.')],
    mistakes:[L('Gastar tokens em PvP por hábito quando outro conteúdo é seu gargalo.','Spending tokens on PvP by habit when another activity is your bottleneck.')],
    related:{resources:['battle-tokens','pheromones'],chambers:['queen'],creatures:[]},search:'Battles PvP invasions'
  },
  {
    id:'battle-tokens',icon:'🎟️',name:L('Ciclo de Battle Tokens','Battle Token cycle'),category:'combat',stage:'mid',source:'reviewed',kind:'daily',
    summary:L('Battle Tokens funcionam como chaves de entrada para PvP e várias atividades. Gerenciá-los bem decide para qual recurso seu tempo de combate será convertido.','Battle Tokens act as entry keys for PvP and several activities. Managing them well decides which resource your combat time turns into.'),
    facts:[L('Se você estiver abaixo de 3 no reset diário, o jogo restaura até 3.','If you are below 3 at daily reset, the game restores you up to 3.'),L('Ter mais de 3 não apaga o excedente no reset.','Having more than 3 does not erase the surplus at reset.'),L('Termite Nest, Fire Ant Nest e Crab Beach estão entre os conteúdos ligados a tokens.','Termite Nest, Fire Ant Nest and Crab Beach are among token-linked activities.')],
    steps:[L('Antes do reset, veja se está desperdiçando regeneração por estar cheio.','Before reset, check whether you are wasting refill by staying full.'),L('Converta tokens no recurso que mais bloqueia sua fase.','Convert tokens into the resource blocking your stage the most.')],
    mistakes:[L('Tratar Battle Token como recurso final em vez de chave para outros farms.','Treating Battle Tokens as an end resource instead of a key to other farms.')],
    related:{resources:['battle-tokens','resin','honeydew','body-parts','pheromones'],chambers:[],creatures:[]},search:'Battle Tokens'
  },
  {
    id:'red-ants',icon:'🐜',name:L('Red Ant Colony','Red Ant Colony'),category:'combat',stage:'early-mid',source:'official',kind:'daily',
    summary:L('A colônia de formigas vermelhas é um objetivo recorrente de combate e uma fonte diária de itens/recompensas extras.','The red ant colony is a recurring combat objective and a daily source of extra items/rewards.'),
    facts:[L('A descrição oficial do jogo destaca derrotar a Red Ant Colony diariamente.','The official game description highlights defeating the Red Ant Colony daily.'),L('A força desses inimigos acompanha parte da progressão da Queen Chamber.','Enemy strength follows part of Queen Chamber progression.')],
    steps:[L('Inclua Red Ants no ciclo diário quando conseguir derrotá-las de forma consistente.','Include Red Ants in your daily loop once you can defeat them consistently.')],
    mistakes:[L('Subir Queen e esquecer que alguns inimigos também acompanham essa progressão.','Upgrading Queen while forgetting some enemies also scale with that progression.')],
    related:{resources:['pheromones','gems'],chambers:['queen'],creatures:[]},search:'Red Ant Colony'
  },
  {
    id:'garrison',icon:'🚩',name:L('Garrison / bandeira','Garrison / flag'),category:'combat',stage:'early-mid',source:'reviewed',kind:'control',
    summary:L('A Garrison concentra soldados em uma área escolhida do mapa e serve para controlar rotas, defender coleta ou preparar encontros.','Garrison concentrates soldiers in a chosen map area and helps control routes, defend gathering or prepare encounters.'),
    facts:[L('A bandeira permite reposicionar a concentração de soldados sem transformar isso em um novo tipo de unidade.','The flag lets you reposition soldier concentration without creating a new unit type.')],
    steps:[L('Posicione a bandeira perto do ponto que realmente precisa ser protegido.','Place the flag near the point that actually needs protection.'),L('Reposicione quando o objetivo do mapa mudar.','Move it when your map objective changes.')],
    mistakes:[L('Deixar soldados concentrados longe do recurso/objetivo atual.','Leaving soldiers concentrated far from the current resource/objective.')],
    related:{resources:[],chambers:['queen'],creatures:[]},search:'Garrison'
  },
  {
    id:'aphid-farm',icon:'🍯',name:L('Aphid Farm','Aphid Farm'),category:'farm',stage:'mid',source:'reviewed',kind:'timer',
    summary:L('Aphid Farm é uma das rotas principais de Honeydew e entra num ciclo de reaparecimento após ser concluída.','Aphid Farm is one of the main Honeydew routes and follows a respawn cycle after completion.'),
    facts:[L('Aphid Farms começam a aparecer depois de construir a Honeydew Chamber.','Aphid Farms begin appearing after building the Honeydew Chamber.'),L('A base atual registra cerca de 6 horas para uma nova farm após a anterior ser concluída.','The current database records roughly 6 hours for a new farm after the previous one is completed.'),L('Com o Honeydew Multiplier máximo documentado, uma farm completa pode chegar a 150 Honeydew.','With the documented maximum Honeydew Multiplier, a full farm can reach 150 Honeydew.')],
    steps:[L('Construa Honeydew Chamber para abrir o sistema.','Build Honeydew Chamber to unlock the system.'),L('Conclua a farm e trate o respawn como um timer de farm.','Complete the farm and treat respawn as a farm timer.')],
    mistakes:[L('Esperar Aphid Farm antes de construir a Honeydew Chamber.','Expecting Aphid Farm before building the Honeydew Chamber.')],
    related:{resources:['honeydew'],chambers:['honeydew'],creatures:[]},search:'Aphid Farm'
  },
  {
    id:'offline-gathering',icon:'🌙',name:L('Coleta offline','Offline gathering'),category:'farm',stage:'all',source:'reviewed',kind:'offline',
    summary:L('Alguns recursos continuam sendo coletados enquanto você está fora, mas a regra não é igual para todos — especialmente Resin.','Some resources continue to be gathered while you are away, but the rule is not the same for all of them — especially Resin.'),
    facts:[L('Folhas, sementes, fungo, partes e água possuem mecânicas de coleta offline documentadas na base atual.','Leaves, seeds, fungus, parts and water have offline gathering mechanics documented in the current database.'),L('Resin não entra na coleta offline normal.','Resin is not part of normal offline gathering.'),L('Água possui limite offline documentado por sessão na referência comunitária.','Water has a documented per-session offline limit in the community reference.')],
    steps:[L('Antes de sair, deixe trabalhadores onde a coleta offline realmente funciona.','Before leaving, assign workers where offline gathering actually works.'),L('Não conte com Resin como renda automática.','Do not count on Resin as automatic income.')],
    mistakes:[L('Planejar Resin como se fosse coletada offline igual Leaves/Seeds.','Planning Resin as if it gathered offline like Leaves/Seeds.')],
    related:{resources:['leaves','seeds','fungus','body-parts','water','resin'],chambers:['food-processing','leaf-storage','seed-storage','water'],creatures:[]},search:'Offline Gathering'
  },
  {
    id:'daily-quests',icon:'📋',name:L('Daily Quests e reset','Daily Quests & reset'),category:'farm',stage:'all',source:'reviewed',kind:'daily',
    summary:L('Missões diárias transformam tarefas normais em um pacote previsível de recompensas e fazem parte do ciclo diário de progressão.','Daily quests turn normal tasks into a predictable reward package and are part of the daily progression loop.'),
    facts:[L('A base atual documenta 4 Daily Quests.','The current database documents 4 Daily Quests.'),L('A recompensa maior atual inclui Resin, Honeydew e Gems.','The current major reward includes Resin, Honeydew and Gems.')],
    steps:[L('Cheque as quatro tarefas antes de gastar tokens/recursos.','Check all four tasks before spending tokens/resources.'),L('Combine tarefas com farms que você já faria naquele dia.','Combine tasks with farms you were already going to do that day.')],
    mistakes:[L('Completar atividades caras antes de ver se elas contam para uma Daily Quest.','Doing expensive activities before checking whether they count for a Daily Quest.')],
    related:{resources:['resin','honeydew','gems'],chambers:[],creatures:[]},search:'Daily Quests'
  },
  {
    id:'termite-nest',icon:'🪵',name:L('Termite Nest','Termite Nest'),category:'coop',stage:'mid-late',source:'reviewed',kind:'battle',
    summary:L('Termite Nest converte combate/co-op em Resin e é uma das rotas mais fortes para quebrar o gargalo desse recurso.','Termite Nest converts combat/co-op into Resin and is one of the strongest routes for breaking the Resin bottleneck.'),
    facts:[L('Construir Resin Chamber abre a progressão ligada ao Termite Nest.','Building Resin Chamber opens progression linked to Termite Nest.'),L('A recompensa documentada atual inclui 2.000 Resin por conclusão.','The current documented reward includes 2,000 Resin per completion.'),L('A referência registra uma janela de 30 minutos sem termites após a vitória.','The reference records a 30-minute termite-free window after victory.')],
    steps:[L('Use quando Resin for seu gargalo real.','Use it when Resin is your actual bottleneck.'),L('Aproveite a janela sem termites para coletar na árvore.','Use the termite-free window to gather at the tree.')],
    mistakes:[L('Gastar tokens aqui quando Resin já não é sua prioridade imediata.','Spending tokens here when Resin is no longer your immediate priority.')],
    related:{resources:['battle-tokens','resin'],chambers:['resin','queen'],creatures:[]},search:'Termite Nest'
  },
  {
    id:'fire-ant-nest',icon:'🔥',name:L('Fire Ant Nest','Fire Ant Nest'),category:'coop',stage:'mid-late',source:'reviewed',kind:'battle',
    summary:L('Uma sequência de 15 chambers de dificuldade crescente que transforma combate em Honeydew e outras recompensas.','A sequence of 15 increasingly difficult chambers that turns combat into Honeydew and other rewards.'),
    facts:[L('A base atual registra 15 chambers.','The current database records 15 chambers.'),L('Uma conclusão completa documentada chega a 150 Honeydew.','A documented full clear reaches 150 Honeydew.'),L('É conteúdo ligado a Battle Tokens e a força dos seus soldados/criaturas.','It is tied to Battle Tokens and the strength of your soldiers/creatures.')],
    steps:[L('Entre quando seu exército aguenta avançar várias chambers, não só a primeira.','Enter when your army can push through several chambers, not just the first.'),L('Use como rota de Honeydew quando competir bem com suas outras opções.','Use it as a Honeydew route when it competes well with your other options.')],
    mistakes:[L('Forçar cedo demais e converter tokens em pouca progressão.','Forcing it too early and converting tokens into little progress.')],
    related:{resources:['battle-tokens','honeydew'],chambers:['queen','honeydew'],creatures:[]},search:'Fire Ant Nest'
  },
  {
    id:'crab-beach',icon:'🦀',name:L('Crab Beach','Crab Beach'),category:'coop',stage:'mid-late',source:'reviewed',kind:'battle',
    summary:L('Crab Beach é uma atividade de combate/co-op ligada a Body Parts e à progressão do Crab.','Crab Beach is a combat/co-op activity tied to Body Parts and Crab progression.'),
    facts:[L('A recompensa documentada inclui 100 Body Parts por vitória.','The documented reward includes 100 Body Parts per win.'),L('É uma rota útil quando Body Parts bloqueiam Resin/Creatures.','It is useful when Body Parts block Resin/Creatures progression.')],
    steps:[L('Use quando seu gargalo for Body Parts.','Use it when Body Parts are your bottleneck.'),L('Compare o gasto de Battle Tokens com Termite/Fire Ant Nest.','Compare Battle Token spending against Termite/Fire Ant Nest.')],
    mistakes:[L('Farmar partes sem considerar que Resin e Creatures competem pelo mesmo estoque.','Farming parts without considering that Resin and Creatures compete for the same stock.')],
    related:{resources:['battle-tokens','body-parts'],chambers:['body-parts','resin','creatures'],creatures:['crab']},search:'Crab Beach'
  },
  {
    id:'beehive',icon:'🐝',name:L('Beehive','Beehive'),category:'coop',stage:'mid-late',source:'reviewed',kind:'daily',
    summary:L('Beehive é um sistema diário de recompensa ligado a Bee Essence, Resin, Honeydew e Honeycomb.','Beehive is a daily reward system tied to Bee Essence, Resin, Honeydew and Honeycomb.'),
    facts:[L('A base atual registra até 5 recompensas diárias.','The current database records up to 5 daily rewards.'),L('As escolhas documentadas incluem 2.000 Resin, 75 Honeydew ou Honeycomb.','Documented choices include 2,000 Resin, 75 Honeydew or Honeycomb.'),L('Bee Essence funciona como consumível de acesso.','Bee Essence acts as an access consumable.')],
    steps:[L('Escolha a recompensa pelo gargalo atual, não pelo valor visual.','Choose the reward based on your current bottleneck, not visual value.'),L('Planeje Honeycomb quando quiser a rota ligada ao Asian Giant Hornet.','Plan Honeycomb when you want the Asian Giant Hornet route.')],
    mistakes:[L('Sempre escolher Resin/Honeydew sem considerar Honeycomb quando ele é necessário.','Always choosing Resin/Honeydew without considering Honeycomb when it is needed.')],
    related:{resources:['resin','honeydew'],chambers:['resin'],creatures:['hornet']},search:'Beehive'
  },
  {
    id:'garden',icon:'🌸',name:L('Garden e flores','Garden & flowers'),category:'garden',stage:'mid-late',source:'reviewed',kind:'progression',
    summary:L('Garden transforma Water e Flower Seeds em flores com efeitos úteis e cria uma camada paralela de progressão.','Garden turns Water and Flower Seeds into useful-effect flowers and creates a parallel progression layer.'),
    facts:[L('Water Storage Chamber controla marcos de sementes do Garden.','Water Storage Chamber controls Garden seed milestones.'),L('Os marcos atuais importantes são Water Lv.1, Lv.6 e Lv.10.','Important current milestones are Water Lv.1, Lv.6 and Lv.10.'),L('Algumas flores afetam sistemas como chance de fusão.','Some flowers affect systems such as fusion chance.')],
    steps:[L('Suba Water até o próximo marco de sementes que você realmente quer.','Upgrade Water to the next seed milestone you actually want.'),L('Escolha flores pelo efeito desejado, não só pela raridade.','Choose flowers for the effect you want, not rarity alone.')],
    mistakes:[L('Tratar Garden como coleção estética e ignorar os buffs.','Treating Garden as cosmetic collection and ignoring buffs.')],
    related:{resources:['water','resin'],chambers:['water'],creatures:[]},search:'Garden flowers'
  },
  {
    id:'coop',icon:'🤝',name:L('Co-op e escolha de atividade','Co-op & activity choice'),category:'coop',stage:'mid-late',source:'reviewed',kind:'system',
    summary:L('Co-op é melhor entendido como uma rede de atividades que convertem tempo/tokens em recursos diferentes, não como um modo isolado.','Co-op is best understood as a network of activities that convert time/tokens into different resources, not as one isolated mode.'),
    facts:[L('Termite Nest favorece Resin; Crab Beach favorece Body Parts; Fire Ant Nest favorece Honeydew.','Termite Nest favors Resin; Crab Beach favors Body Parts; Fire Ant Nest favors Honeydew.'),L('Escolher a atividade pelo gargalo atual evita desperdício de Battle Tokens.','Choosing activity by current bottleneck avoids wasting Battle Tokens.')],
    steps:[L('Identifique seu gargalo.','Identify your bottleneck.'),L('Escolha a atividade que converte melhor seu token/tempo naquele recurso.','Choose the activity that best converts your token/time into that resource.')],
    mistakes:[L('Repetir sempre o mesmo co-op sem olhar qual recurso está bloqueando você.','Repeating the same co-op without checking which resource is blocking you.')],
    related:{resources:['battle-tokens','resin','honeydew','body-parts'],chambers:['resin','body-parts','honeydew'],creatures:['crab']},search:'Co-op'
  },
  {
    id:'clan-wars',icon:'🏳️',name:L('Clan Wars e Silk','Clan Wars & Silk'),category:'clan',stage:'late',source:'recent',kind:'recent',
    summary:L('Clan Wars é uma camada recente de 2026 que introduziu Silk como recurso de progressão ligado à contribuição e ao resultado da guerra.','Clan Wars is a recent 2026 layer that introduced Silk as a progression resource tied to contribution and war outcome.'),
    facts:[L('Silk foi adicionada nas atualizações recentes junto de Clan Wars/Legions.','Silk was added in recent updates alongside Clan Wars/Legions.'),L('A recompensa pessoal depende de contribuição, tier/formato e resultado.','Personal reward depends on contribution, tier/format and outcome.')],
    steps:[L('Entre em um clã ativo quando essa camada fizer sentido para sua progressão.','Join an active clan when this layer makes sense for your progression.'),L('Trate Silk como recurso de late game, não como substituto de Resin.','Treat Silk as a late-game resource, not a replacement for Resin.')],
    mistakes:[L('Ignorar Resin porque Silk virou o recurso novo. Os dois alimentam partes diferentes do late game.','Ignoring Resin because Silk is new. Both feed different parts of late game.')],
    related:{resources:['silk','resin'],chambers:[],creatures:[]},search:'Clan Wars Silk'
  },
  {
    id:'legions',icon:'🛡️',name:L('Legions','Legions'),category:'clan',stage:'late',source:'recent',kind:'recent',
    summary:L('Legions usam Resin e Silk para abrir uma camada de exército tardio e novas unidades ligadas ao conteúdo de clã.','Legions use Resin and Silk to open a late-army layer and new units tied to clan content.'),
    facts:[L('A primeira Legion documentada usa 50.000 Resin.','The first documented Legion uses 50,000 Resin.'),L('Slots posteriores e novas unidades recentes usam Silk na documentação atual.','Later slots and recent new units use Silk in current documentation.')],
    steps:[L('Não entre nessa camada antes de sua economia básica suportar o custo.','Do not enter this layer before your basic economy can support the cost.'),L('Planeje Resin e Silk separadamente.','Plan Resin and Silk separately.')],
    mistakes:[L('Gastar Resin até zero antes de um marco de Legion sem considerar Queen/Resin progression paralela.','Spending Resin to zero before a Legion milestone without considering parallel Queen/Resin progression.')],
    related:{resources:['resin','silk'],chambers:['resin','queen'],creatures:[]},search:'Legions'
  }
];

export const MECHANIC_CATEGORIES=['all','creatures','combat','farm','coop','garden','clan'];

export const MECHANIC_PATHS={
  creatures:{label:L('Montar criaturas','Build creature army'),ids:['attraction','capture','fusion','creature-lab']},
  resin:{label:L('Quebrar gargalo de Resin','Break Resin bottleneck'),ids:['battle-tokens','termite-nest','offline-gathering','beehive']},
  honeydew:{label:L('Farmar Honeydew','Farm Honeydew'),ids:['aphid-farm','fire-ant-nest','beehive','daily-quests']},
  combat:{label:L('Melhorar combate','Improve combat'),ids:['garrison','red-ants','pvp','battle-tokens']},
  daily:{label:L('Rotina diária','Daily routine'),ids:['daily-quests','red-ants','aphid-farm','beehive','battle-tokens']},
  late:{label:L('Preparar late game','Prepare late game'),ids:['clan-wars','legions','beehive','creature-lab']}
};

export const MECHANIC_FLOW=[
  {from:'battle-tokens',to:'termite-nest',label:L('entrada','entry')},
  {from:'termite-nest',to:'resin',label:L('gera','yields')},
  {from:'battle-tokens',to:'fire-ant-nest',label:L('entrada','entry')},
  {from:'fire-ant-nest',to:'honeydew',label:L('gera','yields')},
  {from:'battle-tokens',to:'crab-beach',label:L('entrada','entry')},
  {from:'crab-beach',to:'body-parts',label:L('gera','yields')},
  {from:'pheromones',to:'attraction',label:L('atrai','attracts')},
  {from:'attraction',to:'capture',label:L('abre chance','opens chance')},
  {from:'capture',to:'fusion',label:L('alimenta','feeds')},
  {from:'water',to:'garden',label:L('alimenta','feeds')},
  {from:'clan-wars',to:'silk',label:L('gera','yields')},
  {from:'silk',to:'legions',label:L('desbloqueia','unlocks')}
];

export const MECHANIC_TIMERS=[
  {id:'battle-reset',icon:'🎟️',title:L('Battle Tokens','Battle Tokens'),value:L('Reset diário','Daily reset'),note:L('Abaixo de 3, restaura até 3; excedente não é apagado.','Below 3, refills up to 3; surplus is not erased.'),mechanic:'battle-tokens'},
  {id:'aphid-respawn',icon:'🍯',title:L('Aphid Farm','Aphid Farm'),value:L('~6 h','~6 h'),note:L('Ciclo de reaparecimento registrado na base atual.','Respawn cycle recorded in the current database.'),mechanic:'aphid-farm'},
  {id:'beehive-cap',icon:'🐝',title:L('Beehive','Beehive'),value:L('Até 5/dia','Up to 5/day'),note:L('Limite de recompensas documentado na base atual.','Reward cap documented in the current database.'),mechanic:'beehive'},
  {id:'offline-resin',icon:'🌙',title:L('Resin offline','Offline Resin'),value:L('Não','No'),note:L('Resin não faz parte da coleta offline normal.','Resin is not part of normal offline gathering.'),mechanic:'offline-gathering'},
  {id:'daily-quests',icon:'📋',title:L('Daily Quests','Daily Quests'),value:L('4 tarefas','4 tasks'),note:L('Cheque antes de gastar tokens e recursos.','Check before spending tokens and resources.'),mechanic:'daily-quests'}
];

export const mechanicSourceUrl=record=>record?.source==='official'||record?.source==='recent'?MECHANIC_RESEARCH_META.officialUrl:wikiSearch(record?.search||record?.name?.en||'Pocket Ants mechanics');
