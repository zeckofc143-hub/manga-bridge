const fandom = (slug) => `https://pocketants.fandom.com/wiki/${slug}`;
const ytSearch = (name, topic='guide') => `https://www.youtube.com/results?search_query=${encodeURIComponent(`Pocket Ants ${name} ${topic}`)}`;
const wikiFile = (file) => `https://pocketants.fandom.com/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;

const safeFiles = (name, extra=[]) => [
  ...extra.map(wikiFile),
  wikiFile(`${name} Icon.png`),
  wikiFile(`${name}.png`),
  wikiFile(`${name} icon.png`)
];

const imageOverrides = {
  'Hornet':['Asian Giant Hornet Icon.png','Hornet Icon.png','Asian Giant Hornet.png'],
  'Asian Giant Hornet':['Asian Giant Hornet Icon.png','Asian Giant Hornet.png'],
  'Crab':['Crab Icon.png','Crab creature.png'],
  'Frog':['Frog Icon.png','Frog creature.png'],
  'Christmas Crab':['Christmas Crab Icon.png','Christmas Crab creature.png'],
  'Peacock Spider':['Peacock spider Icon.png','Peacock Spider Icon.png'],
  'Black Widow':['Black Widow Icon.png','Blackwidow.png'],
  'Shocking Pink Dragon Millipede':['Shocking Pink Dragon Millipede Icon.png'],
  'Fire Ant Queen':['Fire Ant Queen.png','Fire Ant Queen Icon.png'],
  'Termite King':['Termite King.png','Termite King Icon.png'],
  'Termite Queen':['Termite Queen.png','Termite Queen Icon.png'],
  'Vinegaroon':['Vinegaroon.png','Vinegaroon Icon.png'],
  'Crab Boss':['Crab boss.png','Crab (boss).png','Crab Boss.png'],
  'Frog Boss':['Frog boss.png','Frog (boss).png','Frog Boss.png'],
  'Red Ant Worker':['Red Worker Ant.png','Red worker.png','Red Ant Worker.png'],
  'Red Ant Soldier':['Red Soldier Ant.png','Red soldier.png','Red Ant Soldier.png'],
  'Red Ant Queen':['Red Queen Ant.png','Red Ant Queen.png'],
  'Fire Ant Soldier':['Fire Ant.png','Fire Ant Soldier.png'],
  'Termite Worker':['Termite worker.png','Termite Worker.png'],
  'Termite Soldier':['Termite soldier.png','Termite Soldier.png'],
  'Bee Worker':['Bee worker.png','Worker Bee.png','Bee.png'],
  'Bee Guard':['Bee guard.png','Guard Bee.png','Bee.png'],
  'Queen Bee':['Queen Bee.png','Bee Queen.png'],
  'Pet Aphid':['Pet Aphid.png','Pet aphid idle animation.png'],
  'Farm Aphid':['Aphid.png','A single aphid.png'],
  'Venus Flytrap':['Venus Flytrap.png'],
  'Player Ant':['Player ant.png','Black Worker Ant.png'],
  'Worker Ant':['Black Worker Ant.png','Worker Ant.png'],
  'Soldier Ant':['Black Soldier Ant.png','Soldier Ant.png'],
  'Queen Ant':['Queen ant.png','Queen Ant.png']
};

export function enrichCreature(creature){
  const images = safeFiles(creature.name, imageOverrides[creature.name] || []);
  const status = creature.id === 'crab' || creature.id === 'frog'
    ? 'direct'
    : 'capturable';

  const correction = creature.id === 'tiger-beetle'
    ? {
        verification:'review',
        attraction:'Conflito entre fontes comunitárias: a página individual informa qualquer horário/clima, enquanto a tabela Capturing já exibiu preferência por noite/amanhecer. Trate como dado a confirmar no jogo.',
        researchWarning:'Há conflito entre páginas da própria wiki sobre o melhor horário de atração.'
      }
    : creature.id === 'bombardier-beetle'
      ? {
          verification:'review',
          attraction:'Conflito entre fontes comunitárias: a página individual atual informa qualquer horário/clima, enquanto a tabela Capturing já indicou noite/crepúsculo. Trate como dado a confirmar no jogo.',
          researchWarning:'Há conflito entre páginas da própria wiki sobre o melhor horário de atração.'
        }
      : {};

  return {
    ...creature,
    ...correction,
    captureStatus: status,
    capturable: status === 'capturable',
    obtainable: true,
    goldenAvailable: creature.category === 'normal' && !['crab','frog'].includes(creature.id),
    imageCandidates:[...images, creature.imageUrl].filter(Boolean),
    imageUrl: images[0] || creature.imageUrl,
    youtubeSearchUrl: creature.youtubeSearchUrl || ytSearch(creature.name, 'capture tutorial')
  };
}

const entity = ({id,name,entityType,subcategory,description,location,howToEncounter=[],sourceSlug,imageFiles=[],videos=[],verification='high',notes=[]}) => ({
  id,name,category:'noncapturable',rarity:entityType==='boss'?'Boss':'Sem raridade',roles:[subcategory],stats:{},bodyParts:null,captureTime:'Não capturável',
  attraction:location,description,obtain:howToEncounter,battleNotes:notes,
  verification,verifiedAt:'2026-09-05',sourceUrl:fandom(sourceSlug),
  entityType,subcategory,captureStatus: entityType==='ally' ? 'ally' : 'noncapturable',capturable:false,obtainable:entityType==='ally',
  imageCandidates:safeFiles(name,[...imageFiles,...(imageOverrides[name]||[])]),
  videos,
  youtubeSearchUrl:ytSearch(name, entityType==='boss'?'boss guide':'guide')
});

export const nonCapturableCreatures = [
  entity({id:'vinegaroon-boss',name:'Vinegaroon',entityType:'boss',subcategory:'Mini-boss',description:'Mini-boss de fim de semana. A própria wiki afirma explicitamente que não pode ser capturado nem adicionado ao exército de criaturas.',location:'Mapa principal, apenas nos fins de semana',howToEncounter:['Aparece de sábado 00:00 UTC até segunda 00:00 UTC.','Um novo pode surgir 4 horas depois de ser derrotado.','Também pode ser atraído pela Gem Shop durante o fim de semana.'],sourceSlug:'Vinegaroon',notes:['Recompensa Body Parts ao ser derrotado.']}),
  entity({id:'fire-ant-queen',name:'Fire Ant Queen',entityType:'boss',subcategory:'Boss',description:'Primeiro boss adicionado ao jogo e inimigo final do Fire Ant Nest. Possui muita vida, ataque em área e invoca Fire Ants ao perder vida.',location:'15ª câmara do Fire Ant Nest',howToEncounter:['Entre e avance pelas 15 câmaras do Fire Ant Nest.','A rainha aparece na última câmara.'],sourceSlug:'Fire_Ant_Queen',notes:['Não faz parte do sistema de captura de criaturas.']}),
  entity({id:'termite-king',name:'Termite King',entityType:'boss',subcategory:'Boss de Co-op',description:'Primeiro boss enfrentado dentro do Termite Nest Co-op. Precisa ser derrotado para liberar a câmara da Termite Queen.',location:'Termite Nest Co-op',howToEncounter:['Inicie o Termite Nest Co-op.','Avance até a segunda câmara.'],sourceSlug:'Termite_King'}),
  entity({id:'termite-queen',name:'Termite Queen',entityType:'boss',subcategory:'Boss de Co-op',description:'Boss final do Termite Nest Co-op. Derrotá-la conclui o co-op e rende as recompensas da atividade.',location:'Última câmara do Termite Nest Co-op',howToEncounter:['Derrote o Termite King.','Avance para a câmara final do Termite Nest.'],sourceSlug:'Termite_Queen'}),
  entity({id:'crab-boss',name:'Crab Boss',entityType:'boss',subcategory:'Boss de Co-op',description:'Boss do Crab Beach. É diferente do Crab lendário que entra no seu exército; derrotar o boss contribui para obter o Crab jogável.',location:'Crab Beach Co-op',howToEncounter:['Entre no Crab Beach Co-op.','Complete a luta cooperativa contra o boss.'],sourceSlug:'Crab_(boss)',imageFiles:['Crab (boss).png'],notes:['Boss e criatura jogável são entradas diferentes no catálogo.']}),
  entity({id:'frog-boss',name:'Frog Boss',entityType:'boss',subcategory:'Boss de Co-op',description:'Boss do Frog Pond Co-op. A luta possui fases e mecânicas cooperativas; é diferente do Frog lendário que pode entrar no exército.',location:'Frog Pond Co-op',howToEncounter:['Entre no Frog Pond Co-op.','Complete as fases cooperativas da luta.'],sourceSlug:'Frog_(boss)',imageFiles:['Frog (boss).png'],notes:['Boss e Frog jogável são entidades distintas.']}),

  entity({id:'red-ant-worker',name:'Red Ant Worker',entityType:'hostile',subcategory:'Hostil',description:'Operária da colônia vermelha. Coleta recursos perto do Red Ant Nest e pode atacar formigas pretas que se aproximem.',location:'Red Ant Nest e arredores',sourceSlug:'Red_Ants'}),
  entity({id:'red-ant-soldier',name:'Red Ant Soldier',entityType:'hostile',subcategory:'Hostil',description:'Soldado da colônia vermelha, responsável pela defesa dos trabalhadores e do ninho.',location:'Red Ant Nest e arredores',sourceSlug:'Red_Ants'}),
  entity({id:'red-ant-queen',name:'Red Ant Queen',entityType:'hostile',subcategory:'Rainha hostil',description:'Rainha da colônia vermelha. Derrotá-la conclui a invasão do Red Ant Nest e inicia o temporizador de reaparecimento da colônia.',location:'Interior do Red Ant Nest',sourceSlug:'Red_Ants'}),
  entity({id:'fire-ant-soldier',name:'Fire Ant Soldier',entityType:'hostile',subcategory:'Hostil',description:'Formiga de fogo hostil encontrada protegendo Aphid Farms e nas câmaras do Fire Ant Nest.',location:'Aphid Farms e Fire Ant Nest',sourceSlug:'Fire_Ants'}),
  entity({id:'termite-worker',name:'Termite Worker',entityType:'hostile',subcategory:'Hostil',description:'Cupim trabalhador encontrado na árvore, associado à coleta de resina.',location:'Árvore / Resin source',sourceSlug:'Termites'}),
  entity({id:'termite-soldier',name:'Termite Soldier',entityType:'hostile',subcategory:'Hostil',description:'Cupim soldado que protege os trabalhadores e a região de resina; reaparece continuamente enquanto o sistema está ativo.',location:'Árvore / Resin source',sourceSlug:'Termites'}),
  entity({id:'bee-worker',name:'Bee Worker',entityType:'hostile',subcategory:'Hostil invencível',description:'Abelha que patrulha a Beehive. As abelhas externas são extremamente perigosas e não fazem parte do sistema de captura.',location:'Ao redor da Beehive',sourceSlug:'Bees',notes:['A wiki descreve as abelhas externas como impossíveis de matar nas condições normais do jogo.']}),
  entity({id:'bee-guard',name:'Bee Guard',entityType:'hostile',subcategory:'Guarda',description:'Tipo de abelha associado à defesa da colmeia.',location:'Beehive',sourceSlug:'Bees'}),
  entity({id:'queen-bee',name:'Queen Bee',entityType:'npc',subcategory:'NPC da Beehive',description:'Rainha da colmeia. Faz parte da atividade da Beehive e não pode ser adicionada ao exército.',location:'Interior da Beehive',sourceSlug:'Bees'}),
  entity({id:'venus-flytrap',name:'Venus Flytrap',entityType:'npc',subcategory:'Defesa ambiental',description:'Planta carnívora defensiva desbloqueável na Resin Shop. Em batalhas, engole criaturas inimigas que entram no alcance.',location:'Ao lado do formigueiro / batalhas',howToEncounter:['Desbloqueie a Flytrap pela Resin Shop.'],sourceSlug:'Venus_Flytrap',notes:['Não é uma criatura capturável; é uma unidade defensiva fixa.']}),
  entity({id:'farm-aphid',name:'Farm Aphid',entityType:'npc',subcategory:'NPC de recurso',description:'Pulgão das Aphid Farms. É transportado por trabalhadores durante o comboio e produz Honeydew quando chega à colônia.',location:'Aphid Farm / comboio',sourceSlug:'Aphid_Farm'}),

  entity({id:'pet-aphid',name:'Pet Aphid',entityType:'ally',subcategory:'Pet / aliado',description:'Pet que segue a formiga do jogador e concede dois bônus aleatórios. Não é capturado pela Creatures Chamber.',location:'Garden / flores',howToEncounter:['Pode aparecer aleatoriamente ao colher uma flor no Garden.'],sourceSlug:'Pet_Aphid'}),
  entity({id:'player-ant',name:'Player Ant',entityType:'ally',subcategory:'Colônia',description:'Formiga controlada diretamente pelo jogador e responsável por administrar a colônia, atrair criaturas e comandar unidades.',location:'Black Ant Colony / mapa principal',sourceSlug:'Black_Ants'}),
  entity({id:'worker-ant',name:'Worker Ant',entityType:'ally',subcategory:'Colônia',description:'Operária da colônia preta. Coleta e processa recursos e executa tarefas da colônia.',location:'Black Ant Colony',howToEncounter:['Nasce de ovos da Queen Ant após alimentação com fungo.'],sourceSlug:'Worker_Ants'}),
  entity({id:'soldier-ant',name:'Soldier Ant',entityType:'ally',subcategory:'Colônia',description:'Unidade de combate da colônia preta usada contra criaturas, colônias hostis, bosses e em batalhas.',location:'Black Ant Colony',sourceSlug:'Soldier_Ants'}),
  entity({id:'queen-ant',name:'Queen Ant',entityType:'ally',subcategory:'Colônia',description:'Rainha da colônia do jogador. Produz ovos e permanece na Queen’s Chamber.',location:'Queen’s Chamber',sourceSlug:'Black_Ants'})
];

export const statusFilters = [
  {id:'all',label:'Todos'},
  {id:'capturable',label:'Capturáveis'},
  {id:'direct',label:'Obtidos direto'},
  {id:'noncapturable',label:'Não capturáveis'},
  {id:'boss',label:'Bosses'},
  {id:'hostile',label:'Hostis'},
  {id:'ally',label:'Pets / aliados'}
];

export function statusMatches(creature, filter){
  if(filter==='all') return true;
  if(filter==='capturable') return creature.captureStatus==='capturable';
  if(filter==='direct') return creature.captureStatus==='direct';
  if(filter==='noncapturable') return creature.captureStatus==='noncapturable';
  if(filter==='boss') return creature.entityType==='boss';
  if(filter==='hostile') return creature.entityType==='hostile' || creature.entityType==='npc';
  if(filter==='ally') return creature.captureStatus==='ally';
  return true;
}

export const captureStatusMeta = {
  capturable:{label:'CAPTURÁVEL',short:'Capturável'},
  direct:{label:'OBTIDO DIRETO',short:'Obtido direto'},
  noncapturable:{label:'NÃO CAPTURÁVEL',short:'Não capturável'},
  ally:{label:'PET / ALIADO',short:'Pet / aliado'}
};
