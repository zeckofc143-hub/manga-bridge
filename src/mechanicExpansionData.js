const L=(pt,en)=>({pt,en});

export const MECHANIC_EXPANSION_META={version:'0.1153',checkedAt:'2026-09-06'};

export const MECHANIC_SOURCE_URLS={
  attacking:'https://pocketants.fandom.com/wiki/Attacking',
  defending:'https://pocketants.fandom.com/wiki/Defending',
  leagues:'https://pocketants.fandom.com/wiki/Leagues',
  seasons:'https://pocketants.fandom.com/wiki/Battle_Seasons',
  tokens:'https://pocketants.fandom.com/wiki/Battle_Tokens',
  pheromones:'https://pocketants.fandom.com/wiki/Pheromones',
  offline:'https://pocketants.fandom.com/wiki/Offline_Gathering',
  daily:'https://pocketants.fandom.com/wiki/Daily_Quests',
  acorns:'https://pocketants.fandom.com/wiki/Acorns',
  coop:'https://pocketants.fandom.com/wiki/Co-op_Mode',
  creatures:'https://pocketants.fandom.com/wiki/Creatures_Chamber',
  lab:'https://pocketants.fandom.com/wiki/Creature_Lab',
  garden:'https://pocketants.fandom.com/wiki/Garden',
  flowers:'https://pocketants.fandom.com/wiki/Garden_Flower',
  clans:'https://pocketants.fandom.com/wiki/Clans',
  wars:'https://pocketants.fandom.com/wiki/Clan_Wars',
  legions:'https://pocketants.fandom.com/wiki/Legions'
};

export const MECHANIC_OVERRIDES=[
  {id:'pvp',sourceUrl:MECHANIC_SOURCE_URLS.attacking,facts:[
    L('PvP pode render até 3 feromônios: 1 aos 50% de destruição, +1 aos 75% e +1 aos 100%/rainha eliminada.','PvP can award up to 3 pheromones: 1 at 50% destruction, +1 at 75%, and +1 at 100%/queen defeated.'),
    L('É preciso usar Battle Token para receber feromônios; sem token ainda pode haver saque de recursos.','A Battle Token is required for pheromone rewards; without one, resource loot can still be obtained.'),
    L('A liga influencia o tipo de feromônio e o bônus de recursos.','League affects pheromone tier and resource bonus.')
  ]},
  {id:'offline-gathering',sourceUrl:MECHANIC_SOURCE_URLS.offline,facts:[
    L('A coleta offline começa após aproximadamente 10 minutos fora; tempo em co-op também conta.','Offline gathering starts after roughly 10 minutes away; co-op time also counts.'),
    L('Fungo, folhas, sementes, partes e água podem ser coletados offline; Resin não.','Fungus, leaves, seeds, creature parts and water can be gathered offline; Resin cannot.'),
    L('A câmara relacionada precisa estar no nível 2+ e trabalhadores devem estar atribuídos à fonte.','The related chamber must be level 2+ and workers must be assigned to the source.'),
    L('Perigos do mapa, como red ants e frog, ainda podem causar perdas.','Map hazards such as red ants and the frog can still cause losses.')
  ]},
  {id:'daily-quests',sourceUrl:MECHANIC_SOURCE_URLS.daily,facts:[
    L('São 4 Daily Quests por dia.','There are 4 Daily Quests per day.'),
    L('Completar as quatro rende o pacote maior documentado: 1.500 Resin, 150 Honeydew e 10 Gems.','Completing all four grants the documented major bundle: 1,500 Resin, 150 Honeydew and 10 Gems.'),
    L('O reset diário é 00:00 UTC.','Daily reset is 00:00 UTC.')
  ]},
  {id:'fusion',sourceUrl:MECHANIC_SOURCE_URLS.creatures,facts:[
    L('A chance base da Creatures Chamber chega a 90% / 50% / 15% no Lv.4 para 2★ / 3★ / 4★.','Creatures Chamber base chance reaches 90% / 50% / 15% at Lv.4 for 2★ / 3★ / 4★.'),
    L('Acima do Lv.4, a chamber não melhora mais a chance base; passa a liberar Creature Lab.','Above Lv.4, the chamber no longer improves base fusion chance; it unlocks Creature Lab instead.'),
    L('Custos documentados: 15 Body Parts para 2★, 30 para 3★ e 50 para 4★.','Documented costs: 15 Body Parts for 2★, 30 for 3★ and 50 for 4★.')
  ]},
  {id:'creature-lab',sourceUrl:MECHANIC_SOURCE_URLS.lab,facts:[
    L('O Lab melhora Health, Attack Rate e Speed de forma permanente.','The Lab permanently improves Health, Attack Rate and Speed.'),
    L('A progressão do Lab chega ao nível 10 conforme a Creatures Chamber avança até o Lv.12.','Lab progression reaches level 10 as the Creatures Chamber advances to Lv.12.'),
    L('Upgrades usam Body Parts e Gems.','Upgrades use Body Parts and Gems.')
  ]}
];

export const MECHANIC_EXTRA_RECORDS=[
  {id:'defending',icon:'🛡️',name:L('Defesa da colônia','Colony defense'),category:'combat',stage:'mid',source:'reviewed',kind:'battle',summary:L('Define o que acontece quando outro jogador invade sua colônia: vitória, derrota, troféus, recursos, revenge e shield.','Defines what happens when another player invades your colony: victory, defeat, trophies, resources, revenge and shield.'),facts:[L('Criaturas derrotadas na defesa não são perdidas.','Creatures defeated on defense are not lost.'),L('Soldados configurados para defesa continuam disponíveis para seus ataques.','Soldiers assigned to defense remain available for your attacks.'),L('Vitória defensiva ocorre abaixo de 50% de destruição; derrota entre 50–100% concede shield.','A defensive win occurs below 50% destruction; a 50–100% defeat grants a shield.'),L('Entrar em um ataque cancela o shield ativo.','Starting an attack cancels an active shield.')],steps:[L('Configure lineup e posicionamento defensivo.','Set your defensive lineup and positioning.'),L('Depois de uma derrota, use o shield antes de iniciar novo ataque se quiser proteção.','After a defeat, use the shield before starting another attack if you want protection.')],mistakes:[L('Começar um ataque sem perceber que isso remove o shield.','Starting an attack without realizing it removes the shield.')],related:{resources:['pheromones'],chambers:['queen'],creatures:[]},sourceUrl:MECHANIC_SOURCE_URLS.defending},
  {id:'leagues',icon:'🏆',name:L('Ligas e troféus','Leagues & trophies'),category:'combat',stage:'mid-late',source:'reviewed',kind:'progression',summary:L('Troféus movem o jogador de Bronze a Emerald, alterando feromônio, bônus de saque e duração do shield.','Trophies move the player from Bronze to Emerald, changing pheromone tier, loot bonus and shield duration.'),facts:[L('As ligas atuais documentadas são Bronze, Silver, Gold, Platinum, Diamond e Emerald.','Current documented leagues are Bronze, Silver, Gold, Platinum, Diamond and Emerald.'),L('Há conflito de fonte para Bronze/Silver: a página de Leagues registra 6h de shield e Defending registra 12h após derrota.','There is a source conflict for Bronze/Silver: Leagues lists a 6h shield while Defending lists 12h after defeat.')],steps:[L('Use a tabela de ligas para ver o próximo intervalo de troféus e recompensa.','Use the league table to see the next trophy range and reward.')],mistakes:[L('Tratar duração de shield de Bronze/Silver como valor totalmente confirmado apesar da divergência atual.','Treating Bronze/Silver shield duration as fully confirmed despite the current source conflict.')],related:{resources:['pheromones'],chambers:[],creatures:[]},sourceUrl:MECHANIC_SOURCE_URLS.leagues},
  {id:'battle-seasons',icon:'🎖️',name:L('Battle Seasons','Battle Seasons'),category:'combat',stage:'mid-late',source:'review',kind:'progression',summary:L('Temporadas longas agrupam progresso de batalhas e recompensas durante vários meses.','Long seasons group battle progress and rewards across several months.'),facts:[L('A wiki atual descreve temporadas contínuas com duração aproximada de 3–4 meses.','The current wiki describes ongoing seasons lasting roughly 3–4 months.'),L('Pontos são obtidos em batalhas que chegam ao menos ao marco de 50%/1 feromônio.','Points are earned in battles that reach at least the 50%/1-pheromone threshold.'),L('A própria página comunitária avisa que a documentação pode estar incompleta; trate detalhes como em revisão.','The community page itself warns documentation may be incomplete; treat details as under review.')],steps:[L('Priorize primeiro as recompensas permanentes/recursos que sua progressão precisa.','Prioritize the permanent rewards/resources your progression needs first.')],mistakes:[L('Usar valores antigos de temporada como se fossem permanentes.','Using old season values as if they were permanent.')],related:{resources:['pheromones'],chambers:[],creatures:[]},sourceUrl:MECHANIC_SOURCE_URLS.seasons},
  {id:'coop-mode',icon:'🤝',name:L('Co-op e entradas','Co-op & entry costs'),category:'coop',stage:'mid',source:'reviewed',kind:'system',summary:L('Termite Nest, Crab Beach e Frog Pond têm requisitos próprios de Queen Chamber e custos de entrada; os recursos só são descontados quando a partida realmente começa.','Termite Nest, Crab Beach and Frog Pond have their own Queen Chamber requirements and entry costs; resources are only spent when the match actually starts.'),facts:[L('Termite Nest e Crab Beach: Queen Chamber 2+, 3 Battle Tokens, 500 Leaves e 500 Seeds.','Termite Nest and Crab Beach: Queen Chamber 2+, 3 Battle Tokens, 500 Leaves and 500 Seeds.'),L('Frog Pond: Queen Chamber 8+, 3 Battle Tokens, 150 Body Parts e 1.500 Resin.','Frog Pond: Queen Chamber 8+, 3 Battle Tokens, 150 Body Parts and 1,500 Resin.'),L('Sair antes da partida começar não consome a entrada.','Leaving before the match starts does not consume the entry cost.')],steps:[L('Confira requisitos no verificador antes de entrar.','Check requirements in the entry checker before joining.'),L('Escolha o co-op pelo recurso que está travando sua progressão.','Choose co-op based on the resource bottlenecking your progression.')],mistakes:[L('Gastar tokens em uma dungeon sem precisar da recompensa daquele momento.','Spending tokens on a dungeon when you do not need its reward right now.')],related:{resources:['battle-tokens','leaves','seeds','body-parts','resin','honeydew'],chambers:['queen'],creatures:['crab']},sourceUrl:MECHANIC_SOURCE_URLS.coop},
  {id:'acorns',icon:'🌰',name:L('Acorns / bolotas','Acorns'),category:'farm',stage:'all',source:'reviewed',kind:'daily',summary:L('Uma fonte diária simples de recursos: aparece uma por vez no mapa e tem limite diário.','A simple daily resource source: one appears at a time on the map and there is a daily cap.'),facts:[L('Há uma Acorn no mapa por vez.','There is one Acorn on the map at a time.'),L('O limite é 10 por dia e reseta às 00:00 UTC.','The cap is 10 per day and resets at 00:00 UTC.'),L('Ela aparece no minimapa, não no mapa grande.','It appears on the minimap, not the full map.')],steps:[L('Colete até 10 ao longo do ciclo diário.','Collect up to 10 across your daily loop.')],mistakes:[L('Procurar no mapa grande e achar que não apareceu.','Looking on the full map and thinking none spawned.')],related:{resources:['leaves','seeds','fungus'],chambers:[],creatures:[]},sourceUrl:MECHANIC_SOURCE_URLS.acorns},
  {id:'clans',icon:'🏕️',name:L('Clãs e bônus','Clans & bonuses'),category:'clan',stage:'mid-late',source:'reviewed',kind:'system',summary:L('Clãs conectam doações, bônus temporários, co-op extra e Clan Wars.','Clans connect donations, temporary bonuses, extra co-op and Clan Wars.'),facts:[L('Recursos doados alimentam bônus compartilhados do clã.','Donated resources fund shared clan bonuses.'),L('Bônus comunitários documentados incluem velocidade, resistência e chance de fusão.','Documented community bonuses include speed, resilience and fusion chance.'),L('Vários bônus duram 7 dias.','Several bonuses last 7 days.')],steps:[L('Doe sem comprometer upgrades críticos da sua colônia.','Donate without starving critical colony upgrades.'),L('Use bônus que combinam com o objetivo atual do clã.','Use bonuses that match the clan current goal.')],mistakes:[L('Doar recursos de gargalo sem reservar o necessário para sua própria progressão.','Donating bottleneck resources without reserving what your own progression needs.')],related:{resources:['leaves','seeds','fungus'],chambers:[],creatures:[]},sourceUrl:MECHANIC_SOURCE_URLS.clans},
  {id:'clan-wars',icon:'⚔️',name:L('Clan Wars','Clan Wars'),category:'clan',stage:'late',source:'recent',kind:'recent',summary:L('Sistema semanal de clãs adicionado em 2026, com registro, preparação, guerra, recompensas e Silk.','Weekly clan system added in 2026 with registration, preparation, war, rewards and Silk.'),facts:[L('Sexta: registro até 22:00 UTC e matchmaking depois; sábado: preparação; domingo: guerra; segunda: resultados/recompensas.','Friday: registration until 22:00 UTC then matchmaking; Saturday: preparation; Sunday: war; Monday: results/rewards.'),L('A wiki atual lista tiers de 12v12, 25v25 e 50v50.','The current wiki lists 12v12, 25v25 and 50v50 tiers.'),L('Cada participante tem 3 ataques no domingo.','Each participant has 3 attacks on Sunday.'),L('Recompensas pessoais incluem Silk e precisam ser reivindicadas no período indicado.','Personal rewards include Silk and must be claimed within the indicated window.')],steps:[L('Registre o clã na sexta.','Register the clan on Friday.'),L('Prepare no sábado e use os 3 ataques no domingo.','Prepare on Saturday and use all 3 attacks on Sunday.'),L('Reivindique recompensas a partir de segunda antes do próximo registro.','Claim rewards from Monday before the next registration.')],mistakes:[L('Esquecer de reivindicar recompensas antes da próxima janela de registro.','Forgetting to claim rewards before the next registration window.')],related:{resources:['silk'],chambers:[],creatures:[]},sourceUrl:MECHANIC_SOURCE_URLS.wars},
  {id:'legions',icon:'🪖',name:L('Legions','Legions'),category:'clan',stage:'late',source:'recent',kind:'recent',summary:L('Legions são uma camada de progressão tardia ligada a Resin e Silk, com quatro slots e novas espécies de formigas.','Legions are a late-game progression layer tied to Resin and Silk, with four slots and new ant species.'),facts:[L('O primeiro slot custa 50.000 Resin.','The first slot costs 50,000 Resin.'),L('Slots 2–4 custam 5.000 Silk cada.','Slots 2–4 cost 5,000 Silk each.'),L('Carpenter Ant usa 50.000 Resin; Bullet Ant e Exploding Ant usam 5.000 Silk cada.','Carpenter Ant uses 50,000 Resin; Bullet Ant and Exploding Ant use 5,000 Silk each.')],steps:[L('Não trate Resin como recurso descartável quando estiver preparando a primeira Legion.','Do not treat Resin as disposable when preparing the first Legion.'),L('Use Clan Wars como rota de Silk para a expansão posterior.','Use Clan Wars as the Silk route for later expansion.')],mistakes:[L('Gastar Resin de late game sem considerar o custo de 50.000 da primeira Legion.','Spending late-game Resin without considering the first Legion 50,000 cost.')],related:{resources:['resin','silk'],chambers:['resin'],creatures:[]},sourceUrl:MECHANIC_SOURCE_URLS.legions}
];

export const LEAGUE_TABLE=[
  {name:'Bronze',range:'1001–1999',pheromone:'Pink',bonus:'0%',shield:'6h*'},
  {name:'Silver',range:'2000–2999',pheromone:'Pink',bonus:'0%',shield:'6h*'},
  {name:'Gold',range:'3000–5999',pheromone:'Gold',bonus:'+25%',shield:'4h'},
  {name:'Platinum',range:'6000–9999',pheromone:'Platinum',bonus:'+50%',shield:'2h'},
  {name:'Diamond',range:'10000–24999',pheromone:'Diamond',bonus:'+70%',shield:'1h'},
  {name:'Emerald',range:'25000+',pheromone:'Emerald',bonus:'+90%',shield:'30m'}
];

export const OFFLINE_MATRIX=[
  ['fungus',true],['leaves',true],['seeds',true],['body-parts',true],['water',true],['resin',false]
];

export const COOP_ENTRIES={
  termite:{name:L('Termite Nest','Termite Nest'),qc:2,tokens:3,leaves:500,seeds:500,parts:0,resin:0},
  crab:{name:L('Crab Beach','Crab Beach'),qc:2,tokens:3,leaves:500,seeds:500,parts:0,resin:0},
  frog:{name:L('Frog Pond','Frog Pond'),qc:8,tokens:3,leaves:0,seeds:0,parts:150,resin:1500}
};

export const FUSION_BASE={
  1:[75,35,1],2:[80,40,5],3:[85,45,10],4:[90,50,15]
};
export const FUSION_COST=[15,30,50];

export const CLAN_WAR_WEEK=[
  {day:L('Sexta','Friday'),icon:'📝',title:L('Registro + matchmaking','Registration + matchmaking'),note:L('Registro 00:00–22:00 UTC; matchmaking depois.','Registration 00:00–22:00 UTC; matchmaking follows.')},
  {day:L('Sábado','Saturday'),icon:'🧱',title:L('Preparação','Preparation'),note:L('Prepare participantes e estratégia.','Prepare participants and strategy.')},
  {day:L('Domingo','Sunday'),icon:'⚔️',title:L('Guerra','War'),note:L('3 ataques por participante.','3 attacks per participant.')},
  {day:L('Segunda','Monday'),icon:'🎁',title:L('Resultados','Results'),note:L('Reivindique Silk e outras recompensas.','Claim Silk and other rewards.')}
];

export const DAILY_MECHANIC_TASKS=[
  {id:'quests',label:L('Completar as 4 Daily Quests','Complete all 4 Daily Quests')},
  {id:'acorns',label:L('Coletar até 10 Acorns','Collect up to 10 Acorns')},
  {id:'redants',label:L('Fazer Red Ant Colony/Queen se disponível','Do Red Ant Colony/Queen if available')},
  {id:'tokens',label:L('Conferir Battle Tokens antes do reset','Check Battle Tokens before reset')},
  {id:'aphid',label:L('Fazer Aphid Farm quando ativa','Do Aphid Farm when active')},
  {id:'garden',label:L('Usar escavações gratuitas do Garden','Use free Garden digs')}
];
