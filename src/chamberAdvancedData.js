const L=(pt,en)=>({pt,en});

export const CHAMBER_SOURCE_URLS={
  'food-processing':'https://pocketants.fandom.com/wiki/Food_Processing_Chamber',
  'leaf-storage':'https://pocketants.fandom.com/wiki/Leaf_Storage_Chamber',
  'seed-storage':'https://pocketants.fandom.com/wiki/Seed_Storage_Chamber',
  queen:'https://pocketants.fandom.com/wiki/Queen%27s_Chamber',
  nursery:'https://pocketants.fandom.com/wiki/Nursery_Chamber',
  'body-parts':'https://pocketants.fandom.com/wiki/Body_Parts_Chamber',
  creatures:'https://pocketants.fandom.com/wiki/Creatures_Chamber',
  honeydew:'https://pocketants.fandom.com/wiki/Honeydew_Chamber',
  resin:'https://pocketants.fandom.com/wiki/Resin_Chamber',
  water:'https://pocketants.fandom.com/wiki/Water_Storage_Chamber'
};

export const CHAMBER_MIN_LEVELS={queen:1};

export const CHAMBER_NEXT_MILESTONES={
  'food-processing':[
    {level:3,label:L('Marco inicial do tutorial e mais capacidade de trabalhadores.','Early tutorial milestone and more worker capacity.')},
    {level:6,label:L('Economia já preparada para o começo do mid game.','Economy prepared for the start of mid game.')},
    {level:12,label:L('Máximo conhecido: 9.999 fungos e 150 trabalhadores.','Known maximum: 9,999 fungus and 150 workers.')}
  ],
  'leaf-storage':[
    {level:2,label:L('Primeiro upgrade pedido pelas quests.','First upgrade requested by the quest line.')},
    {level:6,label:L('Armazenamento intermediário para sustentar processamento.','Mid-tier storage to support processing.')},
    {level:12,label:L('Máximo conhecido: 9.999 folhas.','Known maximum: 9,999 leaves.')}
  ],
  'seed-storage':[
    {level:2,label:L('Primeiro marco de quests para sementes.','First seed-storage quest milestone.')},
    {level:4,label:L('Marco intermediário da progressão inicial.','Mid milestone in early progression.')},
    {level:12,label:L('Máximo conhecido: 9.999 sementes.','Known maximum: 9,999 seeds.')}
  ],
  queen:[
    {level:2,label:L('Libera soldados de nível 1.','Unlocks level 1 soldiers.')},
    {level:6,label:L('Começa a fase em que Resin entra forte na progressão da Queen.','Starts the phase where Resin becomes a major Queen bottleneck.')},
    {level:10,label:L('Marco tardio importante da linha de quests.','Important late-game quest milestone.')},
    {level:12,label:L('Máximo: soldados chegam ao nível 11.','Maximum: soldiers reach level 11.')}
  ],
  nursery:[
    {level:4,label:L('5 ovos de capacidade.','5 egg capacity.')},
    {level:8,label:L('9 ovos de capacidade.','9 egg capacity.')},
    {level:12,label:L('13 ovos; o tempo de eclosão é melhorado em outro sistema.','13 eggs; hatching time is improved by a separate system.')}
  ],
  'body-parts':[
    {level:6,label:L('Desbloqueia o aparecimento do Vinegaroon nos fins de semana.','Unlocks weekend Vinegaroon spawns.')},
    {level:10,label:L('4.000 partes de capacidade.','4,000 body-part capacity.')},
    {level:12,label:L('9.999 partes e requisito para Resin Chamber passar do nível 10.','9,999 parts and required for Resin Chamber beyond level 10.')}
  ],
  creatures:[
    {level:1,label:L('Captura de criaturas + chances base de fusão.','Creature capture + base fusion chances.')},
    {level:4,label:L('Último nível que melhora a chance base de fusão.','Last level that improves base fusion chance.')},
    {level:5,label:L('A partir daqui, upgrades servem principalmente ao Creature Lab.','From here on, upgrades mainly serve Creature Lab progression.')},
    {level:12,label:L('Creature Lab chega ao nível 10.','Creature Lab reaches level 10.')}
  ],
  honeydew:[
    {level:1,label:L('Construir libera Aphid Farms no mapa.','Building unlocks Aphid Farms on the map.')},
    {level:6,label:L('Marco pedido pela linha de quests.','Quest-line milestone.')},
    {level:12,label:L('Máximo conhecido: 9.999 Honeydew.','Known maximum: 9,999 Honeydew.')}
  ],
  resin:[
    {level:1,label:L('Construir libera acesso ao Termite Nest co-op.','Building unlocks access to the Termite Nest co-op.')},
    {level:10,label:L('70.000 de armazenamento; acima daqui exige Body Parts Chamber no máximo.','70,000 storage; beyond this requires a max Body Parts Chamber.')},
    {level:12,label:L('Tabela dedicada registra 99.999 de armazenamento.','Dedicated table records 99,999 storage.')}
  ],
  water:[
    {level:1,label:L('Desbloqueia sementes comuns do Garden.','Unlocks common Garden seeds.')},
    {level:6,label:L('Desbloqueia sementes incomuns.','Unlocks uncommon seeds.')},
    {level:10,label:L('Desbloqueia sementes raras, incluindo Bluebells.','Unlocks rare seeds, including Bluebells.')},
    {level:12,label:L('Máximo conhecido: 9.999 de água.','Known maximum: 9,999 water.')}
  ]
};

export const CHAMBER_LEVEL_TABLES={
  nursery:{
    columns:[L('Nível','Level'),L('Custo (sementes)','Cost (seeds)'),L('Tempo','Time'),L('Máx. ovos','Max eggs')],
    rows:[
      [1,'25',L('1 min','1 min'),2],[2,'50',L('5 min','5 min'),3],[3,'75',L('10 min','10 min'),4],[4,'100',L('30 min','30 min'),5],
      [5,'150',L('1 h','1 h'),6],[6,'200',L('3 h','3 h'),7],[7,'300',L('6 h','6 h'),8],[8,'400',L('12 h','12 h'),9],
      [9,'500',L('1 dia','1 day'),10],[10,'1.000',L('3 dias','3 days'),11],[11,'2.500',L('7 dias','7 days'),12],[12,'6.000',L('14 dias','14 days'),13]
    ]
  },
  'body-parts':{
    columns:[L('Nível','Level'),L('Folhas','Leaves'),L('Sementes','Seeds'),L('Tempo','Time'),L('Capacidade','Capacity')],
    rows:[
      [1,'50','50',L('1 min','1 min'),'50'],[2,'75','75',L('10 min','10 min'),'100'],[3,'100','100',L('1 h','1 h'),'200'],[4,'150','150',L('2 h','2 h'),'300'],
      [5,'200','200',L('3 h','3 h'),'500'],[6,'250','250',L('6 h','6 h'),'1.000'],[7,'300','300',L('12 h','12 h'),'1.500'],[8,'350','350',L('1 dia','1 day'),'2.000'],
      [9,'500','500',L('2 dias','2 days'),'3.000'],[10,'1.000','1.000',L('3 dias','3 days'),'4.000'],[11,'2.500','2.500',L('7 dias','7 days'),'5.000'],[12,'6.000','6.000',L('14 dias','14 days'),'9.999']
    ]
  },
  creatures:{
    columns:[L('Nível','Level'),L('Partes','Parts'),L('Tempo','Time'),L('2★','2★'),L('3★','3★'),L('4★','4★'),L('Lab','Lab')],
    rows:[
      [1,'25',L('5 min','5 min'),'75%','35%','1%',1],[2,'750',L('6 h','6 h'),'80%','40%','5%',1],[3,'2.500',L('12 h','12 h'),'85%','45%','10%',1],[4,'5.000',L('1 dia','1 day'),'90%','50%','15%',2],
      [5,'5.500',L('2 dias','2 days'),'90%','50%','15%',3],[6,'6.000',L('3 dias','3 days'),'90%','50%','15%',4],[7,'6.500',L('5 dias','5 days'),'90%','50%','15%',5],[8,'7.000',L('7 dias','7 days'),'90%','50%','15%',6],
      [9,'7.500',L('10 dias','10 days'),'90%','50%','15%',7],[10,'8.000',L('14 dias','14 days'),'90%','50%','15%',8],[11,'8.500',L('20 dias','20 days'),'90%','50%','15%',9],[12,'9.900',L('28 dias','28 days'),'90%','50%','15%',10]
    ]
  },
  resin:{
    columns:[L('Nível','Level'),L('Capacidade','Capacity'),L('Folhas','Leaves'),L('Partes','Parts'),L('Tempo','Time')],
    rows:[
      [1,'3.000','50','50',L('1 min','1 min')],[2,'6.000','75','75',L('30 min','30 min')],[3,'9.000','100','100',L('1 h','1 h')],[4,'12.000','200','200',L('2 h','2 h')],
      [5,'20.000','350','350',L('3 h','3 h')],[6,'25.000','500','500',L('6 h','6 h')],[7,'40.000','750','750',L('12 h','12 h')],[8,'50.000','1.000','1.000',L('1 dia','1 day')],
      [9,'60.000','2.500','2.500',L('2 dias','2 days')],[10,'70.000','5.000','5.000',L('3 dias','3 days')],[11,'80.000','7.500','7.500',L('7 dias','7 days')],[12,'99.999','9.500','9.500',L('14 dias','14 days')]
    ]
  },
  water:{
    columns:[L('Nível','Level'),L('Tempo','Time'),L('Capacidade','Capacity'),L('Desbloqueio','Unlock')],
    rows:[
      [1,L('5 min','5 min'),'50',L('Sementes comuns','Common seeds')],[2,L('6 h','6 h'),'100','—'],[3,L('12 h','12 h'),'200','—'],[4,L('1 dia','1 day'),'300','—'],
      [5,L('2 dias','2 days'),'500','—'],[6,L('3 dias','3 days'),'1.000',L('Sementes incomuns','Uncommon seeds')],[7,L('5 dias','5 days'),'1.500','—'],[8,L('7 dias','7 days'),'2.000','—'],
      [9,L('10 dias','10 days'),'3.000','—'],[10,L('14 dias','14 days'),'4.000',L('Sementes raras','Rare seeds')],[11,L('20 dias','20 days'),'5.000','—'],[12,L('28 dias','28 days'),'9.999','—']
    ]
  }
};

export const WATER_SEED_UNLOCKS={
  1:['Marigold','Black Hollyhock','Green zinnia','Blue columbine','Scarlet sage','Myrrh','Rainflower','Bat flower','Water lily','Sunflower','Shrub oak','Four-leaf clover','Wood sorrel'],
  6:['Purple coneflower','White snakeroot','Tickseed','Silver dollar','Eucalyptus',"Bird's nest orchid","Hare's ear",'Hairy bittercress'],
  10:['Goldenrod','Bluebells','Guaraná','Fire lily','Fuchsia','Jewelweed','Firecracker']
};

export const CHAMBER_TYPED_RELATIONS=[
  {from:'leaf-storage',to:'food-processing',type:'feeds',label:L('fornece capacidade de folhas','feeds leaf capacity')},
  {from:'food-processing',to:'queen',type:'synergy',label:L('sustenta fungo e exército','supports fungus and army')},
  {from:'seed-storage',to:'queen',type:'capacity',label:L('capacidade para custos de sementes','capacity for seed costs')},
  {from:'body-parts',to:'resin',type:'requirement',label:L('Lv.12 é requisito para Resin >10','Lv.12 required for Resin >10')},
  {from:'resin',to:'queen',type:'capacity',label:L('Resin limita upgrades tardios','Resin gates late upgrades')},
  {from:'body-parts',to:'creatures',type:'currency',label:L('partes pagam upgrades e fusões','parts pay for upgrades and fusions')},
  {from:'honeydew',to:'aphid-farm',type:'unlock',label:L('construir libera Aphid Farms','building unlocks Aphid Farms')},
  {from:'resin',to:'termite-nest',type:'unlock',label:L('construir libera o co-op','building unlocks the co-op')},
  {from:'water',to:'garden',type:'unlock',label:L('Lv.1/6/10 libera raridades','Lv.1/6/10 unlock rarities')}
];

export const CHAMBER_GOAL_STEPS={
  economy:{label:L('Economia inicial','Early economy'),steps:[
    ['food-processing',3,L('Chegue ao marco inicial de produção.','Reach the first production milestone.')],['leaf-storage',2,L('Abra espaço para folhas.','Open leaf capacity.')],['seed-storage',2,L('Prepare sementes para upgrades.','Prepare seed capacity.')],['queen',2,L('Libere os primeiros soldados.','Unlock the first soldiers.')],['food-processing',6,L('Fortaleça produção antes dos sistemas caros.','Strengthen production before expensive systems.')],['leaf-storage',6,L('Acompanhe o armazenamento.','Keep storage in step.')]
  ]},
  combat:{label:L('Combate / soldados','Combat / soldiers'),steps:[
    ['queen',6,L('Leve a Queen até o primeiro grande marco de Resin.','Take Queen to the first major Resin milestone.')],['resin',6,L('Suba Resin junto para não travar capacidade.','Raise Resin alongside it to avoid capacity gates.')],['queen',10,L('Avance os soldados para o late game.','Advance soldiers into late game.')],['body-parts',12,L('Prepare o requisito do Resin tardio.','Prepare the late Resin requirement.')],['resin',12,L('Finalize o principal gargalo de armazenamento.','Finish the main storage bottleneck.')],['queen',12,L('Finalize os soldados.','Finish soldier progression.')]
  ]},
  creatures:{label:L('Criaturas','Creatures'),steps:[
    ['body-parts',6,L('Libere Vinegaroon e melhore a renda de partes.','Unlock Vinegaroon and improve parts income.')],['creatures',4,L('Pegue toda a melhoria base de fusão primeiro.','Get all base fusion improvement first.')],['resin',12,L('Evite gastar partes no Lab antes de resolver Resin.','Avoid spending parts on Lab before solving Resin.')],['creatures',12,L('Depois, avance o Creature Lab.','Then advance Creature Lab.')]
  ]},
  resin:{label:L('Destravar resina','Break the resin bottleneck'),steps:[
    ['resin',6,L('Aumente rapidamente capacidade e fonte.','Quickly raise capacity and source size.')],['body-parts',12,L('É requisito para Resin passar do 10.','Required for Resin beyond 10.')],['resin',12,L('Finalize a câmara e libere o teto de capacidade.','Finish the chamber and unlock max capacity.')]
  ]},
  honeydew:{label:L('Honeydew','Honeydew'),steps:[
    ['honeydew',1,L('Construir já libera Aphid Farms.','Building it already unlocks Aphid Farms.')],['honeydew',6,L('Chegue ao marco da linha de quests.','Reach the quest-line milestone.')],['honeydew',12,L('Finalize capacidade se Honeydew virou gargalo.','Finish capacity if Honeydew is now a bottleneck.')]
  ]},
  garden:{label:L('Garden','Garden'),steps:[
    ['water',1,L('Libere sementes comuns.','Unlock common seeds.')],['water',6,L('Libere sementes incomuns.','Unlock uncommon seeds.')],['water',10,L('Libere raras como Bluebells.','Unlock rares such as Bluebells.')],['water',12,L('Finalize capacidade de água.','Finish water capacity.')]
  ]}
};

export function nextMilestoneFor(id,level){
  return (CHAMBER_NEXT_MILESTONES[id]||[]).find(item=>item.level>level)||null;
}

export function recommendationFor(goal,levels){
  const plan=CHAMBER_GOAL_STEPS[goal]||CHAMBER_GOAL_STEPS.economy;
  const step=plan.steps.find(([id,target])=>(levels[id]||CHAMBER_MIN_LEVELS[id]||0)<target)||plan.steps[plan.steps.length-1];
  return {plan,id:step[0],target:step[1],reason:step[2]};
}
