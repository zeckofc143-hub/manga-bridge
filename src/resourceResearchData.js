export const RESOURCE_RESEARCH_META = {
  version: '0.1153',
  checkedAt: '2026-09-06',
  officialReleaseUrl: 'https://apps.apple.com/br/app/pocket-ants-colony-simulator/id1532712160',
  officialAndroidUrl: 'https://play.google.com/store/apps/details?id=com.ariel.zanyants'
};

const L=(pt,en)=>({pt,en});

export const RESOURCE_SOURCE_LINKS = {
  resources:{label:L('Visão geral de recursos','Resources overview'),url:'https://pocketants.fandom.com/wiki/Resources'},
  offline:{label:L('Coleta offline','Offline Gathering'),url:'https://pocketants.fandom.com/wiki/Offline_Gathering'},
  daily:{label:L('Missões diárias','Daily Quests'),url:'https://pocketants.fandom.com/wiki/Daily_Quests'},
  rewards:{label:L('Recompensas diárias','Daily Rewards'),url:'https://pocketants.fandom.com/wiki/Daily_Rewards'},
  resin:{label:L('Resina','Resin'),url:'https://pocketants.fandom.com/wiki/Resin'},
  honeydew:{label:L('Honeydew','Honeydew'),url:'https://pocketants.fandom.com/wiki/Honeydew'},
  bodyParts:{label:L('Partes de criatura','Body Parts'),url:'https://pocketants.fandom.com/wiki/Body_Parts'},
  pheromones:{label:L('Feromônios','Pheromones'),url:'https://pocketants.fandom.com/wiki/Pheromones'},
  battleTokens:{label:L('Fichas de batalha','Battle Tokens'),url:'https://pocketants.fandom.com/wiki/Battle_Tokens'},
  gems:{label:L('Gemas','Gems'),url:'https://pocketants.fandom.com/wiki/Gems'},
  water:{label:L('Água','Water'),url:'https://pocketants.fandom.com/wiki/Water'},
  garden:{label:L('Jardim','Garden'),url:'https://pocketants.fandom.com/wiki/Garden'},
  flowers:{label:L('Flores do jardim','Garden Flowers'),url:'https://pocketants.fandom.com/wiki/Garden_Flower'},
  beehive:{label:L('Colmeia','Beehive'),url:'https://pocketants.fandom.com/wiki/Beehive'},
  termite:{label:L('Ninho de cupins','Termite Nest'),url:'https://pocketants.fandom.com/wiki/Termite_Nest'},
  fireAnt:{label:L('Ninho de formigas-de-fogo','Fire Ant Nest'),url:'https://pocketants.fandom.com/wiki/Fire_Ant_Nest'},
  frog:{label:L('Lago do sapo','Frog Pond'),url:'https://pocketants.fandom.com/wiki/Frog_Pond'},
  crab:{label:L('Praia do caranguejo','Crab Beach'),url:'https://pocketants.fandom.com/wiki/Crab_Beach'},
  acorns:{label:L('Bolotas','Acorns'),url:'https://pocketants.fandom.com/wiki/Acorns'},
  clans:{label:L('Guerras de clã','Clan Wars'),url:'https://pocketants.fandom.com/wiki/Clan_Wars'},
  legions:{label:L('Legiões','Legions'),url:'https://pocketants.fandom.com/wiki/Legions'}
};

export const RESOURCE_RECORDS = [
  {
    id:'leaves',icon:'🍃',name:L('Folhas','Leaves'),category:'colony',priority:'high',stage:'early',offline:true,renewable:true,sourceKinds:['map','offline'],
    summary:L('Base da economia inicial: trabalhadoras coletam folhas e elas alimentam upgrades e a produção de fungo.','A core early-economy resource: workers gather leaves for upgrades and fungus production.'),
    obtain:[
      {name:L('Fontes de folhas no mapa','Leaf sources on the map'),detail:L('Coleta direta por trabalhadoras e compatível com coleta offline.','Gathered by workers and supported by offline gathering.'),kind:'map'},
      {name:L('Fontes ilimitadas temporárias','Temporary unlimited sources'),detail:L('Itens como Strawberry podem fornecer folhas por tempo limitado.','Items such as Strawberry can provide leaves for a limited time.'),kind:'special'}
    ],
    uses:[L('Produção de fungo','Fungus production'),L('Upgrades da colônia','Colony upgrades'),L('Entrada em conteúdos que cobram folhas','Entry costs for activities that require leaves')],
    facts:[L('Pode ser coletada offline se a câmara estiver no nível necessário.','Can be collected offline once the chamber requirement is met.'),L('Fire Ant Nest, Termite Nest e Crab Beach usam 500 folhas no custo de entrada documentado.','Fire Ant Nest, Termite Nest and Crab Beach use 500 leaves in the documented entry cost.')],
    chambers:['leaf-storage','food-processing'],systems:['fungus','offline-gathering'],sources:['resources','offline','battleTokens']
  },
  {
    id:'fungus',icon:'🍄',name:L('Fungo','Fungus'),category:'colony',priority:'high',stage:'early',offline:true,renewable:true,sourceKinds:['processing','offline'],
    summary:L('Alimento central da colônia, produzido a partir de folhas na Food Processing Chamber.','Core colony food produced from leaves in the Food Processing Chamber.'),
    obtain:[{name:L('Processamento de folhas','Leaf processing'),detail:L('Folhas são convertidas em fungo pela estrutura de processamento.','Leaves are converted into fungus through the processing chamber.'),kind:'processing'}],
    uses:[L('Alimentar a rainha','Feed the queen'),L('Criar trabalhadoras e soldados','Create workers and soldiers'),L('Upgrades e doações','Upgrades and donations')],
    facts:[L('Trabalhadora: 1 fungo; soldado: 15 fungos segundo a documentação comunitária.','Worker: 1 fungus; soldier: 15 fungus according to community documentation.'),L('Pode participar da coleta offline.','Supported by offline gathering.')],
    chambers:['food-processing','queen','nursery'],systems:['army','offline-gathering'],sources:['resources','offline']
  },
  {
    id:'seeds',icon:'🌰',name:L('Sementes','Seeds'),category:'colony',priority:'high',stage:'early',offline:true,renewable:true,sourceKinds:['map','offline','rewards'],
    summary:L('Recurso básico de upgrades coletado em fontes do mapa e usado em várias câmaras.','Basic upgrade resource gathered from map sources and used by several chambers.'),
    obtain:[{name:L('Fonte de sementes','Seed source'),detail:L('A fonte reaparece quando a anterior se esgota e pode ser coletada offline.','A new source appears after the previous one is exhausted and can be gathered offline.'),kind:'map'}, {name:L('Recompensas','Rewards'),detail:L('Também aparece em recompensas e atividades.','Also appears in rewards and activities.'),kind:'rewards'}],
    uses:[L('Upgrades de câmaras','Chamber upgrades'),L('Custos de entrada de dungeons/co-ops','Dungeon/co-op entry costs')],
    facts:[L('Não confundir com sementes de flores do Garden.','Do not confuse these with Garden flower seeds.'),L('Os mesmos conteúdos que cobram 500 folhas também documentam 500 sementes.','The same activities documented with a 500-leaf entry cost also require 500 seeds.')],
    chambers:['seed-storage','queen','nursery','body-parts','honeydew'],systems:['offline-gathering'],sources:['resources','offline','battleTokens']
  },
  {
    id:'body-parts',icon:'🧩',name:L('Partes de criatura','Creature Parts'),category:'progression',priority:'critical',stage:'mid',offline:true,renewable:true,sourceKinds:['creatures','battle','coop','offline','rewards'],
    summary:L('Material-chave para fusão e progressão avançada, especialmente Creatures Chamber e Resin Chamber.','Key material for fusion and advanced progression, especially the Creatures and Resin Chambers.'),
    obtain:[
      {name:L('Cadáveres de criaturas','Creature corpses'),detail:L('Criaturas mortas rendem normalmente entre 20 e 80 partes conforme o tipo/raridade.','Killed creatures usually yield 20–80 parts depending on type/rarity.'),kind:'creatures'},
      {name:L('Batalhas','Battles'),detail:L('Bônus de liga podem tornar batalhas uma fonte muito forte.','League bonuses can make battles a very strong source.'),kind:'battle'},
      {name:L('Crab Beach','Crab Beach'),detail:L('Vitória documentada: 100 partes.','Documented win reward: 100 parts.'),kind:'coop'},
      {name:L('Vinegaroon e recompensas','Vinegaroon and rewards'),detail:L('Também aparecem em Vinegaroon, quests e login diário.','Also available from Vinegaroon, quests and daily login.'),kind:'rewards'}
    ],
    uses:[L('Fusão: 2★ = 15, 3★ = 30, 4★ = 50','Fusion: 2★ = 15, 3★ = 30, 4★ = 50'),L('Creatures Chamber','Creatures Chamber'),L('Resin Chamber','Resin Chamber')],
    facts:[L('Cadáveres podem ser definidos como fonte para coleta offline.','Creature corpses can be set as an offline gathering source.'),L('A própria base comunitária recomenda priorizar Resin Chamber antes de gastar pesado em progressão paralela.','The community reference itself recommends prioritizing the Resin Chamber before heavy parallel investment.')],
    chambers:['body-parts','creatures','resin'],systems:['fusion','creature-lab','offline-gathering'],sources:['bodyParts','crab','offline']
  },
  {
    id:'resin',icon:'🟠',name:L('Resina','Resin'),category:'progression',priority:'critical',stage:'mid-late',offline:false,renewable:true,sourceKinds:['map','coop','daily','beehive','clan'],
    summary:L('Um dos maiores gargalos do mid/late game; alimenta Queen Chamber, Resin Shop, Garden e parte da economia de Legions.','One of the main mid/late-game bottlenecks; used by the Queen Chamber, Resin Shop, Garden and part of the Legion economy.'),
    obtain:[
      {name:L('Árvore / cupins','Tree / termites'),detail:L('Trabalhadoras coletam enquanto você protege a área; resina não entra na coleta offline.','Workers gather while you protect the area; resin is not supported by offline gathering.'),kind:'map'},
      {name:L('Termite Nest','Termite Nest'),detail:L('Vitória pública documentada: 2.000 resina + 30 min sem cupins.','Documented public win: 2,000 resin + 30 minutes without termites.'),kind:'coop'},
      {name:L('Beehive','Beehive'),detail:L('Escolha de recompensa: 2.000 resina; até 5 recompensas/dia.','Reward choice: 2,000 resin; up to 5 rewards/day.'),kind:'beehive'},
      {name:L('4 Daily Quests','4 Daily Quests'),detail:L('Recompensa maior: 1.500 resina + 150 honeydew + 10 gemas.','Major reward: 1,500 resin + 150 honeydew + 10 gems.'),kind:'daily'},
      {name:L('Clan co-op','Clan co-op'),detail:L('Clãs podem oferecer uma segunda oportunidade diária de co-op.','Clans can provide a second daily co-op opportunity.'),kind:'clan'}
    ],
    uses:[L('Queen Chamber','Queen Chamber'),L('Resin Shop e Bee Essence','Resin Shop and Bee Essence'),L('Garden e melhorias','Garden and upgrades'),L('Primeira Legion: 50.000 resina','First Legion: 50,000 resin')],
    facts:[L('Coleta offline: NÃO.','Offline gathering: NO.'),L('Beehive: até 10.000 resina bruta/dia se todas as cinco escolhas forem resina.','Beehive: up to 10,000 gross resin/day if all five rewards are resin.'),L('Há histórico de conflito em páginas antigas sobre capacidade da Resin Chamber; a página Colony atual exibe 99.999 enquanto outra listagem antiga pode divergir.','There has been a source conflict around Resin Chamber capacity; the current Colony page shows 99,999 while older summaries may differ.')],
    chambers:['resin','queen'],systems:['resin-shop','beehive','garden','legions'],sources:['resin','termite','beehive','daily','legions']
  },
  {
    id:'honeydew',icon:'🍯',name:L('Honeydew','Honeydew'),category:'progression',priority:'critical',stage:'mid-late',offline:false,renewable:true,sourceKinds:['aphid','daily','coop','beehive'],
    summary:L('Recurso avançado usado em buffs permanentes e vários sistemas de combate/progressão.','Advanced resource used for permanent buffs and several combat/progression systems.'),
    obtain:[
      {name:L('Aphid Farm','Aphid Farm'),detail:L('Começa em 10 por farm e pode chegar a 150 com Honeydew Multiplier máximo documentado.','Starts at 10 per farm and can reach 150 with the documented max Honeydew Multiplier.'),kind:'aphid'},
      {name:L('Daily Quests','Daily Quests'),detail:L('Completar as quatro: 150 honeydew.','Complete all four: 150 honeydew.'),kind:'daily'},
      {name:L('Fire Ant Nest','Fire Ant Nest'),detail:L('Conclusão completa documentada: 150 honeydew.','Documented full-clear reward: 150 honeydew.'),kind:'coop'},
      {name:L('Frog Pond','Frog Pond'),detail:L('Vitória documentada: 250 honeydew.','Documented win reward: 250 honeydew.'),kind:'coop'},
      {name:L('Beehive','Beehive'),detail:L('75 por escolha; até 375/dia.','75 per reward choice; up to 375/day.'),kind:'beehive'}
    ],
    uses:[L('Honeydew Shop','Honeydew Shop'),L('Velocidade/resistência e outros buffs','Speed/resilience and other buffs'),L('Fusion chance e army size','Fusion chance and army size'),L('Reviver Legions destruídas','Revive destroyed Legions')],
    facts:[L('O Honeydew Shop substitui bônus anteriores do mesmo tipo; eles não se somam.','Honeydew Shop bonuses of the same type replace previous ones; they do not stack.'),L('Aphid Farm reaparece em ciclo documentado de 6 horas.','Aphid Farm has a documented 6-hour respawn cycle.')],
    chambers:['honeydew'],systems:['honeydew-shop','aphid-farm','fire-ant-nest','frog-pond','legions'],sources:['honeydew','fireAnt','frog','beehive']
  },
  {
    id:'water',icon:'💧',name:L('Água','Water'),category:'garden',priority:'medium',stage:'mid',offline:true,renewable:true,sourceKinds:['map','offline'],
    summary:L('Recurso do Garden, coletado no lago e usado para cultivar flores.','Garden resource gathered from the pond and used to grow flowers.'),
    obtain:[{name:L('Lago do mapa','Map pond'),detail:L('Fonte permanente que não se esgota; trabalhadores podem coletar.','Permanent non-depleting source; workers can gather from it.'),kind:'map'}],
    uses:[L('Regar sementes do Garden duas vezes','Water Garden seeds twice'),L('Progressão de flores e buffs','Flower and buff progression')],
    facts:[L('Coleta offline suportada, mas existe limite documentado de 500 água por sessão offline.','Offline gathering is supported, with a documented 500-water cap per offline session.'),L('Se o sapo estiver ativo, trabalhadores enviados à água podem sofrer perdas na coleta offline.','If the frog is active, workers assigned to water can be lost during offline gathering.'),L('Water Storage Chamber libera sementes comuns e níveis maiores liberam raridades superiores.','Water Storage Chamber unlocks common seeds, with higher levels unlocking higher rarities.')],
    chambers:['water'],systems:['garden','offline-gathering','frog-pond'],sources:['water','offline','garden','flowers']
  },
  {
    id:'pheromones',icon:'🧪',name:L('Feromônios','Pheromones'),category:'combat',priority:'high',stage:'early-mid',offline:false,renewable:true,sourceKinds:['battle','rewards'],
    summary:L('Moeda de invocação usada para atrair criaturas e fortalecer o exército.','Summoning currency used to attract creatures and strengthen the army.'),
    obtain:[{name:L('Batalhas PvP','PvP battles'),detail:L('A cor do feromônio depende da liga e da progressão atual.','Pheromone color depends on league and current progression.'),kind:'battle'}, {name:L('Red Ant Queen / login / Dr. Zany','Red Ant Queen / login / Dr. Zany'),detail:L('Fontes adicionais documentadas para feromônios, especialmente os rosas.','Additional documented sources, especially for pink pheromones.'),kind:'rewards'}],
    uses:[L('Invocação regular de criaturas','Regular creature summons'),L('Invocações/variantes especiais conforme condições','Special summons/variants depending on conditions')],
    facts:[L('A documentação recente lista Pink, Gold, Platinum, Diamond e Emerald.','Recent documentation lists Pink, Gold, Platinum, Diamond and Emerald.'),L('Batalhas precisam de Battle Token para render feromônio.','Battles require a Battle Token to award pheromones.')],
    chambers:['creatures'],systems:['pvp','creatures'],sources:['pheromones','battleTokens']
  },
  {
    id:'gems',icon:'💎',name:L('Gemas','Gems'),category:'currency',priority:'situational',stage:'all',offline:false,renewable:true,sourceKinds:['daily','events','premium','map'],
    summary:L('Moeda premium que também pode ser obtida gratuitamente em pequenas quantidades.','Premium currency that can also be earned for free in small amounts.'),
    obtain:[{name:L('Red Ants','Red Ants'),detail:L('Fonte gratuita documentada: 5–10 por derrota, normalmente até duas vezes ao dia.','Documented free source: 5–10 per defeat, normally up to twice per day.'),kind:'map'}, {name:L('Daily Quests','Daily Quests'),detail:L('10 gemas na recompensa maior após completar quatro quests.','10 gems in the major reward after completing four quests.'),kind:'daily'}, {name:L('Login / quests / eventos','Login / quests / events'),detail:L('Outras fontes gratuitas variáveis.','Other variable free sources.'),kind:'events'}],
    uses:[L('Slots e upgrades permanentes','Slots and permanent upgrades'),L('Creature Lab e fusão','Creature Lab and fusion'),L('Battle Tokens e conveniência','Battle Tokens and convenience'),L('Garden, revives e outros sistemas','Garden, revives and other systems')],
    facts:[L('A wiki comunitária recomenda priorizar usos permanentes antes de consumíveis.','The community wiki recommends prioritizing permanent uses before consumables.'),L('Battle Tokens têm pacotes compráveis com gemas.','Battle Tokens can be purchased in gem bundles.')],
    chambers:['creatures'],systems:['gem-shop','creature-lab','garden'],sources:['gems','daily','rewards']
  },
  {
    id:'battle-tokens',icon:'🎟️',name:L('Fichas de batalha','Battle Tokens'),category:'combat',priority:'high',stage:'mid',offline:false,renewable:true,sourceKinds:['daily','ads','premium'],
    summary:L('Chave de acesso para PvP com recompensa e para várias dungeons/co-ops.','Access key for reward-enabled PvP and several dungeons/co-ops.'),
    obtain:[{name:L('Reset diário','Daily reset'),detail:L('Se estiver abaixo de 3 às 00:00 UTC, o total é restaurado para 3; excedente acima de 3 é mantido.','If below 3 at 00:00 UTC, the total is restored to 3; amounts above 3 are preserved.'),kind:'daily'}, {name:L('Anúncios / Gem Shop','Ads / Gem Shop'),detail:L('Também podem ser obtidas por anúncio ou compradas com gemas.','Also obtainable through ads or purchased with gems.'),kind:'premium'}],
    uses:[L('PvP com recompensa de feromônio','PvP with pheromone rewards'),L('Fire Ant Nest: 3 tokens','Fire Ant Nest: 3 tokens'),L('Termite Nest: 3 tokens','Termite Nest: 3 tokens'),L('Crab Beach: 3 tokens','Crab Beach: 3 tokens')],
    facts:[L('As três dungeons documentadas também cobram 500 folhas + 500 sementes.','The three documented dungeons also cost 500 leaves + 500 seeds.'),L('Guardar mais de 3 tokens não faz o excedente sumir no reset.','Holding more than 3 tokens does not remove the excess at reset.')],
    chambers:[],systems:['pvp','fire-ant-nest','termite-nest','crab-beach'],sources:['battleTokens','fireAnt','termite','crab']
  },
  {
    id:'silk',icon:'🕸️',name:L('Seda','Silk'),category:'clan',priority:'critical',stage:'late',offline:false,renewable:true,new2026:true,sourceKinds:['clan'],
    summary:L('Novo recurso de 2026 ligado às Clan Wars e à progressão de Legions.','A new 2026 resource tied to Clan Wars and Legion progression.'),
    obtain:[{name:L('Clan Wars','Clan Wars'),detail:L('Recompensa pessoal escala com contribuição, tier e resultado; o clã também recebe Silk.','Personal rewards scale with contribution, tier and outcome; the clan also receives Silk.'),kind:'clan'}],
    uses:[L('2ª, 3ª e 4ª Legion: 5.000 Silk cada','2nd, 3rd and 4th Legion: 5,000 Silk each'),L('Bullet Ant: 5.000 Silk','Bullet Ant: 5,000 Silk'),L('Exploding Ant: 5.000 Silk','Exploding Ant: 5,000 Silk'),L('Upgrades de Legions desbloqueadas com Silk','Upgrades for Legions unlocked with Silk')],
    facts:[L('Silk foi adicionada oficialmente junto de Clan Wars, Legions e três novas espécies de formiga.','Silk was officially added alongside Clan Wars, Legions and three new ant species.'),L('Cada membro participa de uma Clan War por semana no calendário documentado.','Each member participates in one Clan War per week under the documented schedule.')],
    chambers:[],systems:['clan-wars','legions'],sources:['clans','legions'],official:true
  }
];

export const SPECIAL_RESOURCE_ENTRIES = [
  {id:'acorns',icon:'🌰',name:L('Bolotas','Acorns'),type:L('Fonte de loot','Loot source'),summary:L('Uma aparece por vez no mapa e há limite de 10 coletas por dia, resetando às 00:00 UTC.','One appears at a time on the map, with a 10-per-day collection limit resetting at 00:00 UTC.'),source:'acorns'},
  {id:'honeycomb',icon:'🍯',name:L('Honeycomb','Honeycomb'),type:L('Item de invocação','Summon item'),summary:L('Recompensa da Beehive usada para forçar a aparição do Asian Giant Hornet durante uma invocação.','Beehive reward used to force an Asian Giant Hornet spawn during a summon.'),source:'beehive'},
  {id:'bee-essence',icon:'🐝',name:L('Bee Essence','Bee Essence'),type:L('Consumível de acesso','Access consumable'),summary:L('Necessária para entrar na Beehive; faz parte do ciclo Resin → Bee Essence → Beehive → recompensa.','Required to enter the Beehive; part of the Resin → Bee Essence → Beehive → reward loop.'),source:'beehive'},
  {id:'corpse',icon:'☠️',name:L('Cadáver de criatura','Creature Corpse'),type:L('Fonte temporária','Temporary source'),summary:L('Criada ao escolher matar uma criatura; pode ser definida como fonte de Body Parts, inclusive offline.','Created when killing a creature; can be set as a Body Parts source, including offline.'),source:'bodyParts'},
  {id:'unlimited',icon:'🍓',name:L('Fontes ilimitadas','Unlimited Sources'),type:L('Fonte temporária','Temporary source'),summary:L('Itens temporários como Strawberry fornecem folhas/fungo sem esgotar durante o período ativo.','Temporary items such as Strawberry provide leaves/fungus without depleting while active.'),source:'offline'},
  {id:'flower-seeds',icon:'🌱',name:L('Sementes de flores','Flower Seeds'),type:L('Sistema do Garden','Garden system'),summary:L('São diferentes das Seeds da colônia; vêm de digging patches e desbloqueiam um catálogo de 28 flores conhecidas.','Different from colony Seeds; found in digging patches and tied to a catalogue of 28 known flowers.'),source:'garden'}
];

export const ECONOMY_PATHS = [
  {from:'leaves',to:'fungus',label:L('processar','process')},
  {from:'fungus',to:'army',label:L('criar formigas','create ants')},
  {from:'battle-tokens',to:'pheromones',label:L('PvP','PvP')},
  {from:'battle-tokens',to:'resin',label:L('Termite Nest','Termite Nest')},
  {from:'battle-tokens',to:'honeydew',label:L('Fire Ant Nest','Fire Ant Nest')},
  {from:'battle-tokens',to:'body-parts',label:L('Crab Beach','Crab Beach')},
  {from:'resin',to:'beehive',label:L('Bee Essence','Bee Essence')},
  {from:'beehive',to:'honeydew',label:L('escolha','choice')},
  {from:'clan-wars',to:'silk',label:L('recompensa','reward')},
  {from:'silk',to:'legions',label:L('desbloquear / evoluir','unlock / upgrade')},
  {from:'water',to:'garden',label:L('cultivar','grow')},
  {from:'body-parts',to:'resin-chamber',label:L('upgrade','upgrade')}
];

export const DAILY_FARM_TASKS = [
  {id:'daily-quests',max:4,label:L('Missões diárias','Daily Quests'),note:L('Complete 4 para a recompensa maior.','Complete 4 for the major reward.'),reward:{resin:1500,honeydew:150,gems:10}},
  {id:'acorns',max:10,label:L('Bolotas','Acorns'),note:L('Limite diário: 10.','Daily limit: 10.')},
  {id:'termite-public',max:1,label:L('Termite Nest público','Public Termite Nest'),note:L('Vitória: 2.000 resina.','Win: 2,000 resin.'),reward:{resin:2000}},
  {id:'termite-clan',max:1,label:L('Termite Nest de clã','Clan Termite Nest'),note:L('Oportunidade extra se disponível.','Extra opportunity when available.'),reward:{resin:2000}},
  {id:'frog',max:1,label:L('Frog Pond','Frog Pond'),note:L('Vitória: 250 honeydew.','Win: 250 honeydew.'),reward:{honeydew:250}},
  {id:'crab',max:1,label:L('Crab Beach','Crab Beach'),note:L('Vitória: 100 partes.','Win: 100 parts.'),reward:{bodyParts:100}},
  {id:'beehive',max:5,label:L('Beehive','Beehive'),note:L('Até 5 recompensas; escolha Resin/Honeydew/Honeycomb.','Up to 5 rewards; choose Resin/Honeydew/Honeycomb.')},
  {id:'red-ants',max:2,label:L('Red Ants','Red Ants'),note:L('Fonte gratuita de gemas; valor pode variar.','Free gem source; amount can vary.')}
];

export const GOAL_PRESETS = {
  resin:{title:L('Farmar Resina','Farm Resin'),steps:[L('Complete as 4 Daily Quests para +1.500.','Complete all 4 Daily Quests for +1,500.'),L('Faça Termite Nest público (+2.000) e o de clã se disponível.','Run public Termite Nest (+2,000) and the clan opportunity if available.'),L('Use Beehive para +2.000 por escolha quando Resin for prioridade.','Choose +2,000 Resin in Beehive when Resin is the priority.'),L('Proteja trabalhadoras na árvore; não conte com coleta offline.','Protect workers at the tree; do not rely on offline gathering.')]},
  honeydew:{title:L('Farmar Honeydew','Farm Honeydew'),steps:[L('Complete as 4 Daily Quests (+150).','Complete all 4 Daily Quests (+150).'),L('Mantenha Aphid Farm em ciclo e evolua o Honeydew Multiplier.','Keep Aphid Farm cycling and upgrade the Honeydew Multiplier.'),L('Fire Ant Nest completo rende 150; Frog Pond rende 250.','A full Fire Ant Nest gives 150; Frog Pond gives 250.'),L('Beehive rende 75 por escolha, até 375/dia.','Beehive gives 75 per choice, up to 375/day.')]},
  'body-parts':{title:L('Farmar Partes de criatura','Farm Creature Parts'),steps:[L('Use criaturas mortas como fonte; cadáveres suportam coleta offline.','Use killed creatures as a source; corpses support offline gathering.'),L('Crab Beach rende 100 por vitória.','Crab Beach gives 100 per win.'),L('Batalhas podem escalar muito com bônus de liga.','Battles can scale strongly with league bonuses.'),L('Evite gastar tudo em fusão se Resin Chamber estiver travando a progressão.','Avoid spending everything on fusion if the Resin Chamber is blocking progression.')]},
  pheromones:{title:L('Farmar Feromônios','Farm Pheromones'),steps:[L('Preserve Battle Tokens para batalhas que rendem feromônio.','Preserve Battle Tokens for battles that award pheromones.'),L('Subir de liga muda a cor dos feromônios obtidos.','Climbing leagues changes the pheromone color earned.'),L('Red Ant Queen, login e Dr. Zany ajudam especialmente no começo.','Red Ant Queen, login and Dr. Zany help especially early on.')]},
  silk:{title:L('Farmar Silk','Farm Silk'),steps:[L('Silk vem das Clan Wars; não existe farm diário comum documentado.','Silk comes from Clan Wars; there is no ordinary daily farm documented.'),L('Contribuição, tier e resultado afetam a recompensa pessoal.','Contribution, tier and outcome affect personal rewards.'),L('Planeje gastos de 5.000 por Legion/ant desbloqueada com Silk.','Plan around 5,000 costs for Silk-unlocked Legions/ants.')]},
  gems:{title:L('Poupar Gemas','Save Gems'),steps:[L('Faça Red Ants, Daily Quests, login e eventos para fontes grátis.','Use Red Ants, Daily Quests, login and events for free sources.'),L('Priorize slots e upgrades permanentes antes de consumíveis.','Prioritize slots and permanent upgrades before consumables.'),L('Evite usar gemas para acelerar timers sem necessidade.','Avoid using gems to skip timers unless needed.')]}
};
