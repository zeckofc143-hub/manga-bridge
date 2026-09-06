export const CHAMBER_RESEARCH_META = {
  version: '0.1153',
  checkedAt: '2026-09-06',
  colonyUrl: 'https://pocketants.fandom.com/wiki/Colony_Chambers',
  blackAntsUrl: 'https://pocketants.fandom.com/wiki/Black_Ants',
  faqUrl: 'https://pocketants.fandom.com/wiki/FAQ',
  starterUrl: 'https://pocketants.fandom.com/wiki/Starter_Tutorial',
  resinUrl: 'https://pocketants.fandom.com/wiki/Resin',
  aphidUrl: 'https://pocketants.fandom.com/wiki/Aphid_Farm'
};

const L=(pt,en)=>({pt,en});

export const CHAMBER_RECORDS = [
  {
    id:'food-processing',icon:'🍄',name:L('Câmara de processamento','Food Processing Chamber'),category:'economy',priority:'critical',stage:'early',maxLevel:12,
    summary:L('Transforma folhas em fungo, aumenta o armazenamento de comida e define o limite de trabalhadoras.','Turns leaves into fungus, increases food storage and determines the worker cap.'),
    effects:[L('Produção e armazenamento de fungo','Fungus production and storage'),L('Aumenta o máximo de trabalhadoras','Raises the maximum worker count')],
    milestones:[L('É uma das primeiras câmaras que o tutorial manda construir.','One of the first chambers the tutorial asks you to build.'),L('No nível 12, a base comunitária registra 9.999 fungos e 150 trabalhadoras.','At level 12, the community reference records 9,999 fungus and 150 workers.')],
    resources:['leaves','fungus'],dependsOn:['leaf-storage'],unlocks:['economy','workers'],maxStat:L('9.999 fungos · 150 trabalhadoras','9,999 fungus · 150 workers'),source:'reviewed'
  },
  {
    id:'leaf-storage',icon:'🍃',name:L('Armazém de folhas','Leaf Storage Chamber'),category:'economy',priority:'high',stage:'early',maxLevel:12,
    summary:L('Armazena folhas e sustenta a cadeia Folhas → Fungo → Exército.','Stores leaves and supports the Leaves → Fungus → Army chain.'),
    effects:[L('Aumenta a capacidade de folhas','Raises leaf capacity'),L('Evita travar upgrades e processamento por falta de espaço','Prevents upgrades and processing from stalling on storage')],
    milestones:[L('No nível máximo, a referência comunitária registra 9.999 folhas.','At max level, the community reference records 9,999 leaves.')],
    resources:['leaves'],dependsOn:[],unlocks:['economy'],maxStat:L('9.999 folhas','9,999 leaves'),source:'reviewed'
  },
  {
    id:'seed-storage',icon:'🌰',name:L('Armazém de sementes','Seed Storage Chamber'),category:'economy',priority:'high',stage:'early',maxLevel:12,
    summary:L('Armazena sementes e prepara a colônia para upgrades que passam a exigir grandes quantidades delas.','Stores seeds and prepares the colony for upgrades that require large seed amounts.'),
    effects:[L('Aumenta a capacidade de sementes','Raises seed capacity'),L('Sustenta Queen, Nursery, Honeydew e outros upgrades','Supports Queen, Nursery, Honeydew and other upgrades')],
    milestones:[L('No nível máximo, a referência comunitária registra 9.999 sementes.','At max level, the community reference records 9,999 seeds.')],
    resources:['seeds'],dependsOn:[],unlocks:['economy'],maxStat:L('9.999 sementes','9,999 seeds'),source:'reviewed'
  },
  {
    id:'queen',icon:'👑',name:L('Câmara da rainha',"Queen's Chamber"),category:'core',priority:'critical',stage:'all',maxLevel:12,
    summary:L('É o coração da colônia: aumenta a força dos soldados e a vida da rainha, afetando praticamente todo conteúdo de combate.','The heart of the colony: improves soldier strength and queen health, affecting nearly every combat activity.'),
    effects:[L('Cada avanço melhora os soldados','Each upgrade improves soldiers'),L('Aumenta a vida da rainha','Raises queen health')],
    milestones:[L('Subir a Queen Chamber é parte central do tutorial e libera a progressão de soldados.','Upgrading the Queen Chamber is central to the tutorial and unlocks soldier progression.'),L('A base atual do projeto registra soldados chegando ao nível 11 no máximo.','The current project database records soldiers reaching level 11 at max.')],
    resources:['seeds','resin'],dependsOn:['seed-storage','resin'],unlocks:['soldiers','combat','clans'],maxStat:L('Soldados até nível 11','Soldiers up to level 11'),source:'reviewed'
  },
  {
    id:'nursery',icon:'🥚',name:L('Berçário','Nursery Chamber'),category:'core',priority:'medium',stage:'early-mid',maxLevel:12,
    summary:L('Armazena os ovos produzidos pela rainha e melhora o fluxo de reposição de formigas.','Stores eggs produced by the queen and improves ant replacement flow.'),
    effects:[L('Aumenta o limite de ovos/larvas','Raises egg/larva capacity')],
    milestones:[L('No nível 12, a referência comunitária registra capacidade para 13 ovos.','At level 12, the community reference records capacity for 13 eggs.')],
    resources:['seeds'],dependsOn:['queen'],unlocks:['army-flow'],maxStat:L('13 ovos','13 eggs'),source:'reviewed'
  },
  {
    id:'body-parts',icon:'🧩',name:L('Câmara de partes','Body Parts Chamber'),category:'creatures',priority:'high',stage:'mid',maxLevel:12,
    summary:L('Armazena partes de criaturas e interfere diretamente na progressão avançada e nas recompensas do Vinegaroon.','Stores creature parts and directly affects advanced progression and Vinegaroon rewards.'),
    effects:[L('Aumenta a capacidade de partes','Raises creature-part capacity'),L('A recompensa do Vinegaroon depende desta câmara','Vinegaroon reward depends on this chamber')],
    milestones:[L('Vinegaroon passa a aparecer quando a câmara chega ao nível 6 ou mais.','Vinegaroon starts appearing once this chamber reaches level 6 or higher.'),L('No nível máximo, a referência comunitária registra 9.999 partes.','At max level, the community reference records 9,999 parts.')],
    resources:['body-parts','leaves','seeds'],dependsOn:[],unlocks:['vinegaroon','resin-progression'],maxStat:L('9.999 partes','9,999 parts'),source:'reviewed'
  },
  {
    id:'creatures',icon:'🪲',name:L('Câmara de criaturas','Creatures Chamber'),category:'creatures',priority:'situational',stage:'mid-late',maxLevel:12,
    summary:L('Permite capturar criaturas; os primeiros níveis melhoram fusão e os níveis altos expandem o Creature Lab.','Allows creature capture; early levels improve fusion and higher levels expand the Creature Lab.'),
    effects:[L('Permite capturar criaturas derrotadas','Allows defeated creatures to be captured'),L('Melhora chance de fusão nos níveis iniciais','Improves fusion chance at early levels'),L('Níveis maiores liberam progressão do Creature Lab','Higher levels unlock Creature Lab progression')],
    milestones:[L('Construir a câmara habilita captura.','Building the chamber enables capture.'),L('A base do projeto trata níveis 5–12 como progressão ligada ao Creature Lab.','The project database treats levels 5–12 as Creature Lab progression.')],
    resources:['body-parts'],dependsOn:['body-parts'],unlocks:['capture','fusion','creature-lab'],maxStat:L('Captura + fusão + Creature Lab','Capture + fusion + Creature Lab'),source:'reviewed'
  },
  {
    id:'honeydew',icon:'🍯',name:L('Câmara de Honeydew','Honeydew Chamber'),category:'advanced',priority:'medium',stage:'mid',maxLevel:12,
    summary:L('Armazena Honeydew e, ao ser construída, faz o sistema de Aphid Farm começar a aparecer no mapa.','Stores Honeydew and, once built, causes Aphid Farms to begin appearing on the map.'),
    effects:[L('Aumenta armazenamento de Honeydew','Raises Honeydew storage'),L('Construir libera Aphid Farms','Building it unlocks Aphid Farms')],
    milestones:[L('Aphid Farm começa a aparecer depois que a câmara é construída.','Aphid Farms begin appearing after the chamber is built.'),L('No nível máximo, a referência comunitária registra 9.999 Honeydew.','At max level, the community reference records 9,999 Honeydew.')],
    resources:['honeydew','fungus','seeds'],dependsOn:[],unlocks:['aphid-farm','honeydew-shop'],maxStat:L('9.999 Honeydew','9,999 Honeydew'),source:'reviewed'
  },
  {
    id:'resin',icon:'🟠',name:L('Câmara de resina','Resin Chamber'),category:'advanced',priority:'critical',stage:'mid-late',maxLevel:12,
    summary:L('Um dos maiores gargalos do jogo. Aumenta armazenamento e também a quantidade da fonte de resina no mapa.','One of the biggest progression bottlenecks. Raises storage and also increases the resin source amount on the map.'),
    effects:[L('Aumenta capacidade de resina','Raises resin capacity'),L('Aumenta a fonte de resina do mapa','Raises the map resin source amount'),L('Sustenta upgrades tardios da Queen Chamber','Supports late Queen Chamber upgrades')],
    milestones:[L('A página dedicada de Resin registra a fonte crescendo de 2.000 no nível 1 até 6.000 no nível 12.','The dedicated Resin page records the source growing from 2,000 at level 1 to 6,000 at level 12.'),L('Há conflito de fonte sobre a capacidade máxima; a página dedicada registra 99.999, enquanto a página-resumo mostra 9.999.','There is a source conflict on max capacity; the dedicated page records 99,999 while the summary page shows 9,999.')],
    resources:['resin','body-parts','leaves'],dependsOn:['body-parts'],unlocks:['queen-late','resin-source'],maxStat:L('99.999* resina · fonte 6.000','99,999* resin · 6,000 source'),source:'conflict',
    conflict:L('*Adotado provisoriamente da página dedicada de Resin; a página geral de chambers diverge.','*Provisionally adopted from the dedicated Resin page; the general chamber page disagrees.'),
    levelTable:[
      [1,3000,2000],[2,6000,2250],[3,9000,2500],[4,12000,2750],[5,20000,3000],[6,25000,3250],[7,40000,3500],[8,50000,4000],[9,60000,4500],[10,70000,5000],[11,80000,5500],[12,99999,6000]
    ]
  },
  {
    id:'water',icon:'💧',name:L('Câmara de água','Water Storage Chamber'),category:'garden',priority:'medium',stage:'mid',maxLevel:12,
    summary:L('Armazena água e participa da progressão do Garden, influenciando sementes e raridades ligadas às flores.','Stores water and supports Garden progression, affecting flower seeds and their rarity progression.'),
    effects:[L('Aumenta armazenamento de água','Raises water storage'),L('Níveis maiores melhoram a progressão de sementes do Garden','Higher levels improve Garden seed progression')],
    milestones:[L('A documentação comunitária relaciona níveis maiores a sementes mais raras.','Community documentation links higher levels to rarer seeds.')],
    resources:['water'],dependsOn:[],unlocks:['garden','flower-seeds'],maxStat:L('Progressão de água e sementes','Water and seed progression'),source:'reviewed'
  }
];

export const CHAMBER_GOALS = {
  economy:{label:L('Economia inicial','Early economy'),order:['food-processing','leaf-storage','seed-storage','queen'],note:L('Prioriza produção, armazenamento e força básica antes de sistemas caros.','Prioritizes production, storage and basic strength before expensive systems.')},
  combat:{label:L('Combate / soldados','Combat / soldiers'),order:['queen','food-processing','resin','body-parts'],note:L('Queen Chamber vem primeiro; Resin e Body Parts entram quando os upgrades avançados começam a travar.','Queen Chamber comes first; Resin and Body Parts matter once advanced upgrades begin to bottleneck.')},
  creatures:{label:L('Criaturas','Creatures'),order:['body-parts','creatures','queen'],note:L('Partes sustentam captura/fusão e também não devem faltar para a progressão de resina.','Parts support capture/fusion and should not be exhausted if resin progression still needs them.')},
  resin:{label:L('Destravar resina','Break the resin bottleneck'),order:['resin','body-parts','queen'],note:L('Resin Chamber e Body Parts formam um dos gargalos centrais do mid/late game.','Resin Chamber and Body Parts form one of the key mid/late-game bottlenecks.')},
  honeydew:{label:L('Honeydew','Honeydew'),order:['honeydew','queen','food-processing'],note:L('Construir Honeydew Chamber libera Aphid Farms; depois o foco depende dos buffs que você quer comprar.','Building Honeydew Chamber unlocks Aphid Farms; after that, priorities depend on the buffs you want.')},
  garden:{label:L('Garden','Garden'),order:['water','resin','food-processing'],note:L('Water Storage abre o caminho do Garden; resina sustenta vários gastos paralelos dessa fase.','Water Storage opens Garden progression; resin supports several parallel costs in this phase.')}
};

export const CHAMBER_DEPENDENCY_PATHS = [
  {from:'leaf-storage',to:'food-processing',label:L('sustenta folhas','feeds leaves')},
  {from:'food-processing',to:'queen',label:L('economia / exército','economy / army')},
  {from:'seed-storage',to:'queen',label:L('sementes','seeds')},
  {from:'body-parts',to:'resin',label:L('upgrade avançado','advanced upgrade')},
  {from:'resin',to:'queen',label:L('níveis altos','high levels')},
  {from:'body-parts',to:'creatures',label:L('captura / fusão','capture / fusion')},
  {from:'honeydew',to:'aphid-farm',label:L('desbloqueia','unlocks')},
  {from:'water',to:'garden',label:L('desbloqueia','unlocks')}
];
