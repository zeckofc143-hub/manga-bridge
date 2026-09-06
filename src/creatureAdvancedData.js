const n = (value='') => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

const LOCK_AND_CHARGE = new Set([
  'tarantula','praying mantis','tiger beetle','scorpion','dragonfly','asian giant hornet','hornet','centipede','crab',
  'ghost mantis','christmas spider','festive tiger beetle','halloween pennant','shocking pink dragon millipede','orchid mantis',
  'emperor scorpion','emerald cockroach wasp','skull spider','roseate skimmer dragonfly','manticora tiger beetle',
  'trilobite beetle','antlered wasp','christmas crab'
].map(n));
const RANGED = new Set(['bombardier beetle','paussinae beetle','lugubrious bombardier beetle'].map(n));
const PACIFIST_AOE = new Set(['rhinoceros beetle','rhino beetle','christmas beetle','flower chafer beetle'].map(n));
const HEALER = new Set(['butterfly','monarch butterfly','red costate tiger moth','red costate moth'].map(n));

export function verifiedAiType(creature){
  const name = n(creature?.name);
  if(HEALER.has(name)) return {label:'Healer',description:'Não ataca; produz partículas que curam criaturas aliadas próximas.',source:'Creature AI'};
  if(RANGED.has(name)) return {label:'Ranged',description:'Trava no alvo, mira e dispara permanecendo parado.',source:'Creature AI'};
  if(PACIFIST_AOE.has(name)) return {label:'Pacifist AoE',description:'Não procura combate; quando recebe dano, carrega um ataque em área de curto alcance.',source:'Creature AI'};
  if(LOCK_AND_CHARGE.has(name)) return {label:'Lock & Charge',description:'Trava em um alvo e corre/salta até ele; contra outra criatura permanece atacando enquanto o alvo estiver ao alcance.',source:'Creature AI'};
  return {label:'Não catalogada',description:'A página comunitária de AI ainda não lista esta criatura em uma das categorias principais.',source:'A revisar'};
}

const STANDARD_MELEE = [1.04,2.08,3.11,4.15,5.19];
const SPECIAL_MELEE = [2.08,3.11,4.15,5.19,null];
const STANDARD_FLYING = [4.15,8.30,12.46,16.61,20.76];
const SPECIAL_FLYING = [12.46,18.69,24.57,30.80,null];
const AOE_BOMBER = [7.27,7.27,7.27,7.27,7.27];
const AOE_RHINO = [8.30,8.30,8.30,8.30,8.30];
const HEAL = [27.68,27.68,27.68,27.68,27.68];

const STAR_DAMAGE = new Map();
function add(names,values,note='Dano por golpe contra a referência usada pela tabela comunitária.'){
  for(const name of names) STAR_DAMAGE.set(n(name),{values,note});
}
add(['Tarantula','Praying Mantis','Mantis','Tiger Beetle','Scorpion','Centipede'],STANDARD_MELEE);
add(['Ghost Mantis','Christmas Spider','Festive Tiger Beetle'],SPECIAL_MELEE);
add(['Dragonfly','Hornet'],STANDARD_FLYING,'Valor acima do solo; criaturas voadoras podem ter interação diferente contra outros voadores.');
add(['Halloween Pennant','Emerald Cockroach Wasp','Roseate Skimmer Dragonfly'],SPECIAL_FLYING,'Valor acima do solo. A tabela registra valores separados em algumas lutas entre voadores.');
add(['Bombardier Beetle'],AOE_BOMBER,'O dano em área registrado permanece igual entre estrelas; outros stats ainda mudam.');
add(['Paussinae Beetle','Lugubrious Bombardier Beetle'],[7.27,7.27,7.27,7.27,null],'O dano em área registrado permanece igual entre estrelas.');
add(['Rhinoceros Beetle','Rhino Beetle'],AOE_RHINO,'Ataque em área reativo; dano registrado igual entre estrelas.');
add(['Christmas Beetle','Flower Chafer Beetle'],[8.30,8.30,8.30,8.30,null],'Ataque em área reativo; dano registrado igual entre estrelas.');
add(['Butterfly'],HEAL,'Este valor é cura, não dano.');
add(['Monarch Butterfly'],[27.68,27.68,27.68,27.68,null],'Este valor é cura, não dano.');
STAR_DAMAGE.set(n('Crab'),{values:[20.42,40.48,60.21,80.28,null],note:'Crab causa dano muito maior por golpe; a tabela não confirma o valor de 4★ Golden.'});

export function starDamageFor(creature){
  return STAR_DAMAGE.get(n(creature?.name)) || null;
}

export const communityMatchups = {
  [n('Scorpion')]: {
    stages:['Early','Mid'],
    strengths:['Dano rápido corpo a corpo','Boa criatura normal antes de especiais dominarem a conta'],
    weaknesses:['Perde espaço para especiais mais fortes no late game'],
    label:'Consenso comunitário moderado'
  },
  [n('Bombardier Beetle')]: {
    stages:['Early','Mid'],
    strengths:['Ataque em área','Bom para limpar grupos de soldados','Pressão à distância'],
    weaknesses:['Há relatos recentes de power creep no late game'],
    label:'Comunidade · opiniões variam'
  },
  [n('Centipede')]: {
    stages:['Early','Mid'],
    strengths:['Dano corpo a corpo rápido','Alternativa comum no início'],
    weaknesses:['Jogadores avançados tendem a substituí-lo por especiais/lendárias'],
    label:'Comunidade'
  },
  [n('Hornet')]: {
    stages:['Early','Mid'],
    strengths:['Voador acessível depois da Beehive','Bom starter segundo discussões recentes'],
    weaknesses:['Frog é citado repetidamente como resposta forte contra voadores'],
    counters:['Frog'],
    label:'Comunidade'
  },
  [n('Crab')]: {
    stages:['Mid','Late'],
    strengths:['Muito resistente','Ataque em área','Objetivo frequente de progressão após QC8'],
    synergies:['Damage Dealers','Healers'],
    label:'Comunidade · consenso forte'
  },
  [n('Frog')]: {
    stages:['Late'],
    strengths:['Muito valorizado contra criaturas voadoras','Objetivo avançado de co-op'],
    counters:['Voadoras, especialmente Hornet em discussões comunitárias'],
    label:'Comunidade · consenso forte'
  }
};

export function matchupFor(creature){ return communityMatchups[n(creature?.name)] || null; }

export function currentAvailability(creature){
  if(creature?.category !== 'event') return {status:'Permanente / sistema base',tone:'base',detail:'Esta entrada não depende de um evento especial para existir no jogo.'};
  return {
    status:'Sem confirmação na última revisão',
    tone:'unknown',
    detail:'Última revisão pública: 05/09/2026. Nessa revisão, não encontramos uma fonte confiável confirmando esta criatura ativa. O histórico continua disponível e mini-events podem trazê-la de volta.'
  };
}

export function galleryCandidates(creature){
  const values = [creature?.imageUrl,...(creature?.imageCandidates||[])].filter(Boolean);
  return [...new Set(values)].filter(src=>!String(src).includes('ubfv-IkrBuk'));
}
