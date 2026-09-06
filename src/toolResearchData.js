const L=(pt,en)=>({pt,en});

export const TOOL_META={
  version:'0.1153',
  checkedAt:'2026-09-06',
  officialUrl:'https://play.google.com/store/apps/details?id=com.ariel.zanyants',
  note:L('Ferramentas revisadas contra a versão pública atual. Dados comunitários ficam separados de cálculos puros e conflitos permanecem visíveis.','Tools reviewed against the current public version. Community data stays separate from pure calculations and conflicts remain visible.')
};

export const TOOL_SOURCE_URLS={
  fusion:'https://pocketants.fandom.com/wiki/Fusion',
  creatures:'https://pocketants.fandom.com/wiki/Creatures',
  clan:'https://pocketants.fandom.com/wiki/Clans',
  queen:'https://pocketants.fandom.com/wiki/Queen%27s_Chamber',
  resin:'https://pocketants.fandom.com/wiki/Resin_Chamber',
  tokens:'https://pocketants.fandom.com/wiki/Battle_Tokens',
  daily:'https://pocketants.fandom.com/wiki/Daily_Quests',
  coop:'https://pocketants.fandom.com/wiki/Co-op_Mode',
  legions:'https://pocketants.fandom.com/wiki/Legions',
  gems:'https://pocketants.fandom.com/wiki/Gems'
};

export const TOOL_RECORDS=[
  {id:'fusion',icon:'🧬',category:'combat',priority:1,title:L('Calculadora de fusão','Fusion calculator'),desc:L('Chance final, custo e desperdício de bônus com fórmula aberta.','Final chance, cost and wasted bonus with an open formula.'),outcome:L('Chance + Body Parts + Gems','Chance + Body Parts + Gems'),keywords:'fusion creature chamber honeydew clan bluebells rock gems chance'},
  {id:'queen-resin',icon:'👑',category:'progression',priority:1,title:L('Planner Queen ↔ Resin','Queen ↔ Resin planner'),desc:L('Custo total, tempo, gargalo de capacidade e próximo nível necessário.','Total cost, time, capacity bottleneck and required next level.'),outcome:L('Custo + tempo + bloqueio','Cost + time + gate'),keywords:'queen resin chamber upgrade soldier progression'},
  {id:'daily',icon:'📅',category:'routine',priority:1,title:L('Rotina e ganhos diários','Daily routine & gains'),desc:L('Recompensas fixas e custo real de cada co-op, sem misturar Frog com Termite/Crab.','Fixed rewards and real cost of each co-op, without mixing Frog with Termite/Crab.'),outcome:L('Lucro bruto + custos','Gross rewards + costs'),keywords:'daily quests termite crab frog coop rewards resin honeydew body parts'},
  {id:'battle-tokens',icon:'🎟️',category:'combat',priority:2,title:L('Planner de Battle Tokens','Battle Token planner'),desc:L('Entradas possíveis, déficit e efeito correto do reset das 00:00 UTC.','Affordable entries, shortage and the correct 00:00 UTC reset effect.'),outcome:L('Entradas + déficit','Entries + shortage'),keywords:'battle tokens reset dungeon coop'},
  {id:'farm',icon:'🌾',category:'farm',priority:2,title:L('Planejador de farm','Farm planner'),desc:L('Use sua própria média para estimar runs e tempo sem inventar drop rate.','Use your own average to estimate runs and time without invented drop rates.'),outcome:L('Runs + tempo','Runs + time'),keywords:'farm grind runs time estimate resource'},
  {id:'legions',icon:'🛡️',category:'late',priority:2,title:L('Planner de Legions','Legions planner'),desc:L('Separe custos de slots e espécies em Resin/Silk e veja o que ainda falta.','Separate slot and species costs in Resin/Silk and see what is still missing.'),outcome:L('Resin + Silk','Resin + Silk'),keywords:'legions carpenter bullet exploding silk resin clan wars'},
  {id:'collection',icon:'🪲',category:'tracker',priority:1,title:L('Coleção de criaturas','Creature collection'),desc:L('Tracker atualizado pela base moderna de criaturas, com filtros, progresso e faltantes.','Tracker powered by the modern creature database, with filters, progress and missing creatures.'),outcome:L('Progresso por grupo','Progress by group'),keywords:'collection creatures special event legendary missing tracker'}
];

export const TOOL_GOALS=[
  {id:'stronger',icon:'⚔️',label:L('Ficar mais forte','Get stronger'),tools:['queen-resin','fusion']},
  {id:'daily',icon:'📅',label:L('Organizar o dia','Plan my day'),tools:['daily','battle-tokens']},
  {id:'farm',icon:'🌾',label:L('Planejar farm','Plan farming'),tools:['farm','daily']},
  {id:'late',icon:'🛡️',label:L('Planejar late game','Plan late game'),tools:['legions','queen-resin']},
  {id:'collect',icon:'🪲',label:L('Completar coleção','Complete collection'),tools:['collection','fusion']}
];

export const FUSION_BASE={
  2:{1:75,2:80,3:85,4:90},
  3:{1:35,2:40,3:45,4:50},
  4:{1:1,2:5,3:10,4:15}
};
export const FUSION_HD={0:0,1:2,2:3,3:5,4:7,5:10};
export const FUSION_COST={2:15,3:30,4:50};
export const FUSION_GEMS={0:{bonus:0,cost:0},25:{bonus:25,cost:300},50:{bonus:50,cost:500}};
export const FUSION_CLAN={0:0,1:2,6:3,12:5};

export const QUEEN_UPGRADES={
  2:{seeds:15,resin:0,hours:3/60,soldier:1},
  3:{seeds:75,resin:0,hours:1,soldier:2},
  4:{seeds:150,resin:0,hours:3,soldier:3},
  5:{seeds:350,resin:0,hours:6,soldier:4},
  6:{seeds:750,resin:7500,hours:12,soldier:5},
  7:{seeds:1000,resin:10000,hours:24,soldier:6},
  8:{seeds:2500,resin:25000,hours:48,soldier:7},
  9:{seeds:4000,resin:40000,hours:72,soldier:8},
  10:{seeds:6000,resin:60000,hours:168,soldier:9},
  11:{seeds:8000,resin:80000,hours:336,soldier:10},
  12:{seeds:9900,resin:99000,hours:672,soldier:11}
};

export const RESIN_STORAGE={1:3000,2:6000,3:9000,4:12000,5:20000,6:25000,7:40000,8:50000,9:60000,10:70000,11:80000,12:99999};

export const DAILY_ACTIVITIES=[
  {id:'quests',icon:'✅',label:L('4 Daily Quests','4 Daily Quests'),mode:'daily',reward:{resin:1500,honeydew:150,gems:10},cost:{},source:'daily'},
  {id:'termite-public',icon:'🪵',label:L('Termite público','Public Termite'),mode:'public',reward:{resin:2000},cost:{tokens:3,leaves:500,seeds:500},source:'coop'},
  {id:'termite-clan',icon:'🪵',label:L('Termite do clã','Clan Termite'),mode:'clan',reward:{resin:2000},cost:{tokens:3,leaves:500,seeds:500},source:'coop'},
  {id:'crab-public',icon:'🦀',label:L('Crab público','Public Crab'),mode:'public',reward:{bodyParts:100,crabPoint:1},cost:{tokens:3,leaves:500,seeds:500},source:'coop'},
  {id:'crab-clan',icon:'🦀',label:L('Crab do clã','Clan Crab'),mode:'clan',reward:{bodyParts:100,crabPoint:1},cost:{tokens:3,leaves:500,seeds:500},source:'coop'},
  {id:'frog-public',icon:'🐸',label:L('Frog Pond','Frog Pond'),mode:'public',reward:{honeydew:250,frogPoint:1,redSage:1},cost:{tokens:3,bodyParts:150,resin:1500},source:'coop'}
];

export const LEGION_SLOT_COSTS={
  1:{resin:50000,silk:0},
  2:{resin:50000,silk:5000},
  3:{resin:50000,silk:10000},
  4:{resin:50000,silk:15000}
};
export const LEGION_SPECIES=[
  {id:'carpenter',icon:'🐜',label:'Carpenter Ants',resin:50000,silk:0},
  {id:'bullet',icon:'🐜',label:'Bullet Ants',resin:0,silk:5000},
  {id:'exploding',icon:'💥',label:'Exploding Ants',resin:0,silk:5000}
];
