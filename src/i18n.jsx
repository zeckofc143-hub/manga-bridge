import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Check, Languages, Settings, X } from 'lucide-react';
import './settings.css';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'pa-language';

export const CREATURE_NAMES = {
  'tarantula': { pt:'Tarântula', en:'Tarantula' },
  'praying-mantis': { pt:'Louva-a-deus', en:'Praying Mantis' },
  'tiger-beetle': { pt:'Besouro-tigre', en:'Tiger Beetle' },
  'scorpion': { pt:'Escorpião', en:'Scorpion' },
  'butterfly': { pt:'Borboleta', en:'Butterfly' },
  'bombardier-beetle': { pt:'Besouro-bombardeiro', en:'Bombardier Beetle' },
  'rhinoceros-beetle': { pt:'Besouro-rinoceronte', en:'Rhinoceros Beetle' },
  'dragonfly': { pt:'Libélula', en:'Dragonfly' },
  'hornet': { pt:'Vespa-gigante-asiática', en:'Hornet' },
  'centipede': { pt:'Lacraia', en:'Centipede' },
  'crab': { pt:'Caranguejo', en:'Crab' },
  'frog': { pt:'Sapo', en:'Frog' },

  'ghost-mantis': { pt:'Louva-a-deus-fantasma', en:'Ghost Mantis' },
  'christmas-spider': { pt:'Aranha de Natal', en:'Christmas Spider' },
  'paussinae-beetle': { pt:'Besouro Paussinae', en:'Paussinae Beetle' },
  'monarch-butterfly': { pt:'Borboleta-monarca', en:'Monarch Butterfly' },
  'festive-tiger-beetle': { pt:'Besouro-tigre festivo', en:'Festive Tiger Beetle' },
  'halloween-pennant': { pt:'Libélula-pennant de Halloween', en:'Halloween Pennant' },
  'christmas-beetle': { pt:'Besouro de Natal', en:'Christmas Beetle' },
  'shocking-pink-dragon-millipede': { pt:'Milípede-dragão rosa-choque', en:'Shocking Pink Dragon Millipede' },
  'orchid-mantis': { pt:'Louva-a-deus-orquídea', en:'Orchid Mantis' },
  'emperor-scorpion': { pt:'Escorpião-imperador', en:'Emperor Scorpion' },
  'emerald-cockroach-wasp': { pt:'Vespa-esmeralda-da-barata', en:'Emerald Cockroach Wasp' },
  'skull-spider': { pt:'Aranha-caveira', en:'Skull Spider' },
  'red-costate-tiger-moth': { pt:'Mariposa-tigre-vermelha-costada', en:'Red Costate Tiger Moth' },
  'roseate-skimmer': { pt:'Libélula Roseate Skimmer', en:'Roseate Skimmer Dragonfly' },
  'flower-chafer': { pt:'Besouro-das-flores', en:'Flower Chafer Beetle' },
  'manticora': { pt:'Besouro-tigre Manticora', en:'Manticora Tiger Beetle' },
  'trilobite': { pt:'Besouro-trilobita', en:'Trilobite Beetle' },
  'lugubrious': { pt:'Besouro-bombardeiro-lúgubre', en:'Lugubrious Bombardier Beetle' },
  'antlered-wasp': { pt:'Vespa-de-chifres', en:'Antlered Wasp' },
  'christmas-crab': { pt:'Caranguejo de Natal', en:'Christmas Crab' },
  'red-scorpion': { pt:'Escorpião-vermelho', en:'Red Scorpion' },
  'jeweled-flower-mantis': { pt:'Louva-a-deus-flor-jóia', en:'Jeweled Flower Mantis' },
  'cyanide-millipede': { pt:'Milípede-de-cianeto', en:'Cyanide Millipede' },
  'common-eastern-firefly': { pt:'Vaga-lume-oriental-comum', en:'Common Eastern Firefly' },
  'halloween-hisser': { pt:'Barata-sibilante de Halloween', en:'Halloween Hisser' },
  'december-moth': { pt:'Mariposa-de-dezembro', en:'December Moth' },
  'red-paper-wasp': { pt:'Vespa-de-papel-vermelha', en:'Red Paper Wasp' },
  'ladybug': { pt:'Joaninha', en:'Ladybug' },
  'black-widow': { pt:'Viúva-negra', en:'Black Widow' },
  'beach-tiger-beetle': { pt:'Besouro-tigre-da-praia', en:'Beach Tiger Beetle' },
  'african-deaths-head-hawkmoth': { pt:'Mariposa-caveira-africana', en:"African Death's-Head Hawkmoth" },
  'white-faced-meadowhawk': { pt:'Libélula-meadowhawk-de-cara-branca', en:'White-faced Meadowhawk' },
  'fire-millipede': { pt:'Milípede-de-fogo', en:'Fire Millipede' },
  'peacock-spider': { pt:'Aranha-pavão', en:'Peacock Spider' },
  'asian-giant-hornet-special': { pt:'Vespa-gigante-asiática (Especial)', en:'Asian Giant Hornet (Special)' },

  'vinegaroon-boss': { pt:'Escorpião-vinagre', en:'Vinegaroon' },
  'fire-ant-queen': { pt:'Rainha das formigas-de-fogo', en:'Fire Ant Queen' },
  'termite-king': { pt:'Rei dos cupins', en:'Termite King' },
  'termite-queen': { pt:'Rainha dos cupins', en:'Termite Queen' },
  'crab-boss': { pt:'Chefe Caranguejo', en:'Crab Boss' },
  'frog-boss': { pt:'Chefe Sapo', en:'Frog Boss' },
  'red-ant-worker': { pt:'Operária formiga-vermelha', en:'Red Ant Worker' },
  'red-ant-soldier': { pt:'Soldado formiga-vermelha', en:'Red Ant Soldier' },
  'red-ant-queen': { pt:'Rainha formiga-vermelha', en:'Red Ant Queen' },
  'fire-ant-soldier': { pt:'Soldado formiga-de-fogo', en:'Fire Ant Soldier' },
  'termite-worker': { pt:'Cupim-operário', en:'Termite Worker' },
  'termite-soldier': { pt:'Cupim-soldado', en:'Termite Soldier' },
  'bee-worker': { pt:'Abelha-operária', en:'Bee Worker' },
  'bee-guard': { pt:'Abelha-guarda', en:'Bee Guard' },
  'queen-bee': { pt:'Abelha-rainha', en:'Queen Bee' },
  'venus-flytrap': { pt:'Dioneia', en:'Venus Flytrap' },
  'farm-aphid': { pt:'Pulgão da fazenda', en:'Farm Aphid' },
  'pet-aphid': { pt:'Pulgão de estimação', en:'Pet Aphid' },
  'player-ant': { pt:'Formiga do jogador', en:'Player Ant' },
  'worker-ant': { pt:'Formiga-operária', en:'Worker Ant' },
  'soldier-ant': { pt:'Formiga-soldado', en:'Soldier Ant' },
  'queen-ant': { pt:'Formiga-rainha', en:'Queen Ant' }
};

const CREATURE_DESCRIPTION_EN = {
  'tarantula':'A common creature and one of the first the player encounters. Easy to defeat and useful for building an early army or collecting Body Parts.',
  'praying-mantis':'A common damage creature. It is an early-game option before rare or event creatures become available.',
  'tiger-beetle':'Extremely fast and able to leap at targets. It is one of the fastest normal creatures.',
  'scorpion':'One of the best normal early-game options thanks to its high attack rate and relatively simple acquisition.',
  'butterfly':'A pacifist creature: it deals no damage and periodically heals nearby allied creatures.',
  'bombardier-beetle':'A slow beetle with a chemical area attack. It is especially dangerous to groups of soldier ants.',
  'rhinoceros-beetle':'One of the toughest normal creatures. Very slow, but able to absorb heavy damage and strike a wide area.',
  'dragonfly':'A rare flying creature with good damage. Weather is the main obstacle to obtaining it.',
  'hornet':'A rare flying creature that requires Honeycomb from the Beehive before pheromones can summon it.',
  'centipede':'A ground creature with a strong combination of health and attack rate for a normal creature.',
  'crab':'The first legendary creature. It attacks slowly, has very high health and deals huge area damage.',
  'frog':'A legendary creature specialized in removing flying targets. Its tongue can execute airborne creatures in range and it uses an area attack when no flyer is available.',
  'ghost-mantis':'One of the game’s earliest special creatures. A much stronger Mantis variant, especially in attack rate.',
  'christmas-spider':'A Christmas Tarantula variant with improved stats and a long history in early events.',
  'paussinae-beetle':'A crowd-control special with a heart-themed projectile and better stats than the normal Bombardier Beetle.',
  'monarch-butterfly':'A special healing variant that can return in Creature Events and must land before it can be attacked.',
  'festive-tiger-beetle':'A celebration Tiger Beetle with more health and attack rate than the normal version.',
  'halloween-pennant':'A flying Dragonfly-based special with higher health and damage.',
  'christmas-beetle':'A special Rhinoceros Beetle with extremely high health, built to tank and deal area damage.',
  'shocking-pink-dragon-millipede':'A Centipede special introduced during Valentine’s 2022 and later brought back in mini-events.',
  'orchid-mantis':'A special Mantis with much higher attack rate and health than the common version.',
  'emperor-scorpion':'A much tougher Scorpion special and a recurring choice in community lists of strong ground creatures.',
  'emerald-cockroach-wasp':'A flying special wasp with very high attack rate.',
  'skull-spider':'A Halloween spider with higher health and attack rate than the Tarantula.',
  'red-costate-tiger-moth':'A support moth special with better overall stats than the Butterfly.',
  'roseate-skimmer':'A special Dragonfly with higher speed and health.',
  'flower-chafer':'A special Rhinoceros Beetle with better speed and health that has returned in multiple Creature Events.',
  'manticora':'A special Tiger Beetle with higher health and attack rate that has also returned in mini-events.',
  'trilobite':'One of the strongest 2023 ground specials, combining high health with an almost maxed attack rate.',
  'lugubrious':'A tougher and faster Bombardier special that keeps strong crowd-control utility.',
  'antlered-wasp':'A special wasp with very strong attacks, including against other flying creatures.',
  'christmas-crab':'A special Crab variant obtained through its own co-op/activity bar and a Crab Token instead of normal event capture.',
  'red-scorpion':'A Valentine 2024 Scorpion special and a high-performance ground variant.',
  'jeweled-flower-mantis':'A special Mantis with much higher health and speed than the normal version.',
  'cyanide-millipede':'A special millipede that creates a toxic cloud, adding damage and threatening groups of ants.',
  'common-eastern-firefly':'Changes behavior by time of day: a ground attacker during the day and a flying creature at night.',
  'halloween-hisser':'A special tank with improved attack rate and health. Its Hiss ability deals extra damage and can kill ants.',
  'december-moth':'A pacifist healing moth from Christmas 2024. It does not attack but heals allied creatures.',
  'red-paper-wasp':'A red flying wasp with very high damage and strong performance against airborne targets.',
  'ladybug':'An extremely durable special with a temporary shield that blocks damage and recharges faster at higher stars.',
  'black-widow':'A 5th Anniversary spider special with extremely high health and attack rate according to the current community page.',
  'beach-tiger-beetle':'An extremely fast special. It periodically gains a blue aura that further boosts its performance.',
  'african-deaths-head-hawkmoth':'A healing moth with Toxic Spores: it can heal allies and damage nearby creatures when the ability activates.',
  'white-faced-meadowhawk':'A special Dragonfly with high health and attack rate plus a speed aura that boosts movement and attacks.',
  'fire-millipede':'One of the strongest specials documented in 2026. It leaves a fire trail that persists briefly and deals heavy damage.',
  'peacock-spider':'An Easter 2026 spider. When its purple bar fills, it performs a dance that stuns nearby enemy creatures.',
  'asian-giant-hornet-special':'The 6th Anniversary 2026 special. Some stats are still placeholders in the community source, so they are not treated as final here.',
  'vinegaroon-boss':'A weekend mini-boss. Community documentation explicitly states that it cannot be captured or added to the creature army.',
  'fire-ant-queen':'The final enemy of the Fire Ant Nest, with high health, area attacks and Fire Ant summons as its health drops.',
  'termite-king':'The first boss fought inside the Termite Nest Co-op. It must be defeated before the Termite Queen chamber opens.',
  'termite-queen':'The final boss of the Termite Nest Co-op. Defeating it completes the activity and awards its rewards.',
  'crab-boss':'The Crab Beach boss. It is separate from the legendary playable Crab; defeating the boss contributes toward obtaining the playable creature.',
  'frog-boss':'The Frog Pond Co-op boss. The fight has cooperative phases and is separate from the legendary playable Frog.',
  'red-ant-worker':'A Red Ant colony worker that gathers resources near the nest and can attack nearby black ants.',
  'red-ant-soldier':'A Red Ant soldier responsible for defending workers and the nest.',
  'red-ant-queen':'The Red Ant colony queen. Defeating her completes the nest invasion and starts the colony respawn timer.',
  'fire-ant-soldier':'A hostile Fire Ant found guarding Aphid Farms and inside the Fire Ant Nest.',
  'termite-worker':'A worker termite found around the tree and associated with Resin gathering.',
  'termite-soldier':'A soldier termite that protects workers and the Resin area.',
  'bee-worker':'A bee that patrols around the Beehive. Outside bees are extremely dangerous and are not capturable creatures.',
  'bee-guard':'A bee type associated with defending the hive.',
  'queen-bee':'The queen inside the Beehive activity. She cannot be added to the creature army.',
  'venus-flytrap':'A fixed defensive carnivorous plant unlocked through the Resin Shop. It swallows enemy creatures that enter its range.',
  'farm-aphid':'An Aphid Farm NPC carried by workers during the convoy. Aphids generate Honeydew when they reach the colony.',
  'pet-aphid':'A pet that follows the player ant and grants two random bonuses. It is not captured through the Creatures Chamber.',
  'player-ant':'The ant directly controlled by the player, used to manage the colony, attract creatures and command units.',
  'worker-ant':'A black-colony worker that gathers and processes resources and performs colony tasks.',
  'soldier-ant':'The black-colony combat unit used against creatures, hostile colonies, bosses and in battles.',
  'queen-ant':'The player colony queen. She produces eggs and remains in the Queen’s Chamber.'
};

const UI_EN = new Map(Object.entries({
  'Início':'Home','Criaturas':'Creatures','Recursos':'Resources','Câmaras':'Chambers','Mecânicas':'Mechanics','Guias':'Guides','Ferramentas':'Tools','Glossário':'Glossary',
  'Wiki BR':'Wiki EN','Buscar na wiki':'Search the wiki','Buscar criatura, recurso, câmara...':'Search creature, resource, chamber...','Buscar no banco de criaturas...':'Search the creature database...','Buscar criaturas':'Search creatures','Alternar tema':'Toggle theme','Abrir menu':'Open menu','Fechar menu':'Close menu',
  'Banco de Dados de Criaturas':'Creature Database','Banco completo de criaturas com imagens, descrição, obtenção, stats, habilidades, eventos, fontes e ferramentas pessoais. Use a Central de Criaturas para montar coleção, planejar captura, comparar criaturas, organizar exército, calcular fusão/Lab e acompanhar lendárias.':'Complete creature database with images, descriptions, acquisition methods, stats, abilities, events, sources and personal tools. Use the Creature Hub to manage your collection, plan captures, compare creatures, organize armies, calculate fusion/Lab upgrades and track legendaries.',
  'Registros completos':'Complete records','Filtros + coleção':'Filters + collection','Busca + planners':'Search + planners',
  'Enciclopédia de criaturas':'Creature database','A categoria mostra a imagem, descrição, obtenção e dados principais de cada criatura. Toque em uma ficha para abrir o conteúdo completo.':'Each record shows the creature image, description, acquisition method and key data. Tap a record to open the full profile.',
  'Todas':'All','Capturáveis':'Capturable','Especiais / Eventos':'Special / Events','Lendárias / Co-op':'Legendary / Co-op','Bosses':'Bosses','Hostis / NPCs':'Hostile / NPCs','Pets / Aliados':'Pets / Allies',
  'entradas':'entries','capturáveis':'capturable','especiais':'specials','bosses':'bosses','Dados revisados em 05/09/2026':'Data reviewed on 05/09/2026','Condições, stats e formas de obtenção são cruzados com a wiki comunitária atual. Divergências continuam marcadas na própria ficha.':'Conditions, stats and acquisition methods are cross-checked against the current community wiki. Conflicts remain flagged on each record.',
  'Filtros':'Filters','Raridade':'Rarity','Como consegue':'How to get','Ordenar':'Sort','Todos':'All','Feromônios':'Pheromones','Evento':'Event','Co-op / barra':'Co-op / bar','Mapa / NPC':'Map / NPC','Raridade · comum → lendária':'Rarity · common → legendary','Nome A–Z':'Name A–Z','Mais recentes':'Newest',
  'resultados':'results','cards agora mostram os dados principais sem precisar abrir':'cards now show key data without opening the full profile','Nada encontrado':'Nothing found','Remova um filtro ou pesquise outro termo.':'Remove a filter or search for another term.',
  'Método':'Method','Captura':'Capture','Body Parts':'Body Parts','Origem':'Origin','Como obter':'How to get','Habilidade:':'Ability:','Ficha completa':'Full profile','Tutorial':'Tutorial','Buscar tutorial':'Search tutorial','Conflito de fonte':'Source conflict','Revisado':'Reviewed',
  'Voltar':'Back','Voltar para Criaturas':'Back to Creatures','Criatura não encontrada':'Creature not found','Variante de':'Variant of','Fonte principal':'Main source','Condição / local:':'Condition / location:','Stats e dados':'Stats and data','Valores de referência':'Reference values','Dano':'Damage','Vida':'Health','Velocidade':'Speed','Tempo de captura':'Capture time','Habilidade':'Ability','Mecânica especial conhecida':'Known special mechanic','Como funciona / combate':'How it works / combat','Detalhes separados da descrição principal':'Details separated from the main description','Histórico de eventos':'Event history','Ocorrências registradas na base':'Recorded appearances in the database','Tutoriais e vídeos':'Tutorials and videos','Material para ver a criatura e o processo no jogo':'Material showing the creature and its in-game process','Pesquisar mais tutoriais':'Search more tutorials','Fonte e revisão':'Source and review','Abrir fonte':'Open source',
  'Comum':'Common','Incomum':'Uncommon','Rara':'Rare','Lendária':'Legendary','Especial':'Special','Sem raridade':'No rarity','Boss':'Boss','Não capturável':'Not capturable','Obtido direto':'Directly obtained','Aliado':'Ally','Entidade':'Entity','Mapa / atividade':'Map / activity','Aliado / sistema':'Ally / system','Co-op / barra':'Co-op / bar','Item especial':'Special item',
  'Corpo a corpo':'Melee','Início':'Early game','Dano':'Damage','Sniper':'Sniper','Velocidade':'Speed','Cura':'Healing','Suporte':'Support','Voadora':'Flying','Tanque':'Tank','Controle de grupo':'Crowd control','Área':'Area damage','Anti-aéreo':'Anti-air','Co-op':'Co-op','Colônia':'Colony','Hostil':'Hostile','Guarda':'Guard','Defesa ambiental':'Environmental defense','NPC de recurso':'Resource NPC','Pet / aliado':'Pet / ally',
  'Configurações':'Settings','Idioma':'Language','Português (Brasil)':'Portuguese (Brazil)','Inglês':'English','A linguagem é salva neste aparelho.':'Language is saved on this device.','Fechar configurações':'Close settings',
  'O que você quer resolver?':'What do you want to solve?','Navegação':'Navigation','Stats, raridade, função, captura e filtros.':'Stats, rarity, role, capture and filters.','Onde conseguir e para que serve cada recurso.':'Where to get each resource and what it is used for.','Prioridade, limite e função de cada sala.':'Priority, limits and purpose of each chamber.','Early, mid, late game, resina e honeydew.':'Early, mid, late game, Resin and Honeydew.','Comparador, farm planner e checklists.':'Comparator, farm planner and checklists.','PvP, co-op, Garrison, Beehive e mais.':'PvP, co-op, Garrison, Beehive and more.',
  'Começar pelo guia':'Start with the guide','Abrir ferramentas':'Open tools','Fonte oficial separada':'Official source separated','Conflitos sinalizados':'Conflicts flagged','Dados comunitários rotulados':'Community data labeled','Visão rápida':'Quick overview','criaturas base':'base creatures','especiais catalogadas':'cataloged specials','câmaras':'chambers','recursos':'resources','Primeiros passos':'Getting started','Progressão sem gastar recurso à toa':'Progress without wasting resources','Todos os guias':'All guides','Política de dados':'Data policy','Sem transformar opinião em “fato da wiki”.':'Never turn opinions into “wiki facts”.','Explorar':'Explore','Fontes':'Sources'
}));

const UI_PT_FROM_EN = new Map([...UI_EN.entries()].map(([pt,en])=>[en,pt]));
const NAME_EN_TO_PT = new Map(Object.values(CREATURE_NAMES).map(x=>[x.en,x.pt]));
const NAME_PT_TO_EN = new Map(Object.values(CREATURE_NAMES).map(x=>[x.pt,x.en]));

const EXACT_DESCRIPTION_PT_TO_EN = new Map();

function normalizeSpace(value='') { return String(value).replace(/\s+/g,' ').trim(); }

export function creatureName(id, fallback='', language='pt') {
  const item = CREATURE_NAMES[id];
  if(!item) return fallback;
  return language === 'en' ? item.en : item.pt;
}

export function creatureDescription(id, fallback='', language='pt') {
  if(language !== 'en') return fallback;
  return CREATURE_DESCRIPTION_EN[id] || fallback;
}

export function translateRawText(value, language='pt') {
  if(value === null || value === undefined) return value;
  const original = String(value);
  const trimmed = normalizeSpace(original);
  if(!trimmed) return original;

  if(language === 'en') {
    if(NAME_PT_TO_EN.has(trimmed)) return NAME_PT_TO_EN.get(trimmed);
    if(UI_EN.has(trimmed)) return UI_EN.get(trimmed);
    if(EXACT_DESCRIPTION_PT_TO_EN.has(trimmed)) return EXACT_DESCRIPTION_PT_TO_EN.get(trimmed);

    let match = trimmed.match(/^(\d+) resultados$/);
    if(match) return `${match[1]} results`;
    match = trimmed.match(/^Revisado em (.+)\.$/);
    if(match) return `Reviewed on ${match[1]}.`;
    match = trimmed.match(/^Dados revisados em (.+)$/);
    if(match) return `Data reviewed on ${match[1]}`;
    match = trimmed.match(/^Durante (.+?) (\d{4}), complete a barra de atividade do evento\.$/);
    if(match) return `During ${match[1]} ${match[2]}, fill the event activity bar.`;
    match = trimmed.match(/^Use feromônios respeitando esta condição: (.+)\.$/);
    if(match) return `Use pheromones while respecting this condition: ${match[1]}.`;
    match = trimmed.match(/^Para encontrá-la, vá até: (.+)\.$/);
    if(match) return `To find it, go to: ${match[1]}.`;

    const common = {
      'Derrote a criatura e capture-a se houver vaga.':'Defeat the creature and capture it if you have a free slot.',
      'Derrote a criatura com seus soldados.':'Defeat the creature with your soldiers.',
      'Escolha “Capturar” e mantenha espaço livre para concluir o processo.':'Choose “Capture” and keep a free slot to complete the process.',
      'Use feromônios para atrair uma criatura.':'Use pheromones to attract a creature.',
      'Esta entidade não pode ser capturada nem adicionada ao exército de criaturas.':'This entity cannot be captured or added to the creature army.',
      'Ela aparece como parte do mapa, de uma atividade ou de uma luta específica.':'It appears as part of the map, an activity or a specific fight.',
      'Não é capturada pela Creatures Chamber.':'It is not captured through the Creatures Chamber.',
      'Complete a atividade ou co-op associado até preencher a barra da criatura.':'Complete the related activity or co-op until the creature bar is full.',
      'Tenha uma vaga livre no exército quando a recompensa estiver disponível.':'Have a free army slot when the reward becomes available.',
      'Reivindique a criatura diretamente; ela não usa o processo normal de captura por feromônios.':'Claim the creature directly; it does not use the normal pheromone capture process.',
      'Espere um evento ou mini-evento em que esta criatura esteja disponível.':'Wait for an event or mini-event where this creature is available.',
      'Complete a barra de atividade exigida pelo evento.':'Fill the activity bar required by the event.',
      'Em Creature Events/mini-events antigos, algumas especiais retornam e normalmente não têm limite diário.':'In returning Creature Events/mini-events, some specials come back and usually have no daily attraction limit.'
    };
    return common[trimmed] || original;
  }

  if(NAME_EN_TO_PT.has(trimmed)) return NAME_EN_TO_PT.get(trimmed);
  if(UI_PT_FROM_EN.has(trimmed)) return UI_PT_FROM_EN.get(trimmed);
  return original;
}

function translateNode(node, language, store) {
  if(node.nodeType !== Node.TEXT_NODE) return;
  const current = node.nodeValue || '';
  if(!current.trim()) return;
  let state = store.get(node);
  if(!state || (state.applied !== undefined && current !== state.applied)) {
    state = { original: current, applied: undefined };
    store.set(node,state);
  }
  const leading = state.original.match(/^\s*/)?.[0] || '';
  const trailing = state.original.match(/\s*$/)?.[0] || '';
  const core = state.original.trim();
  const translated = translateRawText(core,language);
  const next = `${leading}${translated}${trailing}`;
  if(current !== next) node.nodeValue = next;
  state.applied = next;
}

function translateAttributes(element, language, store) {
  if(!(element instanceof Element)) return;
  const attrs = ['placeholder','aria-label','title'];
  for(const attr of attrs) {
    if(!element.hasAttribute(attr)) continue;
    const key = `${attr}`;
    let state = store.get(element) || {};
    const current = element.getAttribute(attr) || '';
    if(!state[key] || (state[key].applied !== undefined && current !== state[key].applied)) {
      state[key] = { original: current, applied: undefined };
    }
    const next = translateRawText(state[key].original,language);
    if(current !== next) element.setAttribute(attr,next);
    state[key].applied = next;
    store.set(element,state);
  }
}

function DomLanguageSync({ language }) {
  useEffect(()=>{
    const textStore = new WeakMap();
    const attrStore = new WeakMap();
    let scheduled = false;

    const scan = root => {
      if(!root) return;
      if(root.nodeType === Node.TEXT_NODE) translateNode(root,language,textStore);
      if(root.nodeType === Node.ELEMENT_NODE) {
        translateAttributes(root,language,attrStore);
        const walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
        let node;
        while((node=walker.nextNode())) translateNode(node,language,textStore);
        root.querySelectorAll?.('[placeholder],[aria-label],[title]').forEach(el=>translateAttributes(el,language,attrStore));
      }
    };

    const scanAll = () => { scheduled=false; scan(document.body); };
    const schedule = () => { if(!scheduled){ scheduled=true; queueMicrotask(scanAll); } };
    scanAll();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title']});
    return ()=>observer.disconnect();
  },[language]);
  return null;
}

export function LanguageProvider({ children }) {
  const [language,setLanguageState] = useState(()=>localStorage.getItem(STORAGE_KEY) || 'pt');
  const setLanguage = next => setLanguageState(next === 'en' ? 'en' : 'pt');

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY,language);
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    document.documentElement.dataset.language = language;
    window.dispatchEvent(new CustomEvent('pa:language',{detail:{language}}));
  },[language]);

  const value = useMemo(()=>({language,setLanguage,t:(pt,en)=>language==='en'?(en ?? pt):pt,name:(id,fallback)=>creatureName(id,fallback,language),description:(id,fallback)=>creatureDescription(id,fallback,language)}),[language]);

  return <LanguageContext.Provider value={value}><DomLanguageSync language={language}/>{children}</LanguageContext.Provider>;
}

export function useLanguage(){
  const ctx = useContext(LanguageContext);
  if(!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

export function SiteSettings(){
  const {language,setLanguage,t} = useLanguage();
  const [open,setOpen] = useState(false);

  useEffect(()=>{
    if(!open) return;
    const onKey = e => { if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown',onKey);
    return ()=>window.removeEventListener('keydown',onKey);
  },[open]);

  return <>
    <button className="pa-settings-fab" onClick={()=>setOpen(true)} aria-label={t('Abrir configurações','Open settings')} title={t('Configurações','Settings')}><Settings size={20}/></button>
    {open && <div className="pa-settings-backdrop" onClick={()=>setOpen(false)}>
      <aside className="pa-settings-panel" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="pa-settings-title">
        <div className="pa-settings-head">
          <div><span className="pa-settings-kicker"><Settings size={15}/>{t('Configurações','Settings')}</span><h2 id="pa-settings-title">{t('Configurações do site','Site settings')}</h2></div>
          <button className="pa-settings-close" onClick={()=>setOpen(false)} aria-label={t('Fechar configurações','Close settings')}><X size={20}/></button>
        </div>

        <section className="pa-settings-section">
          <div className="pa-settings-section-title"><Languages size={18}/><div><strong>{t('Idioma','Language')}</strong><span>{t('A linguagem é salva neste aparelho.','Language is saved on this device.')}</span></div></div>
          <div className="pa-language-options">
            <button className={language==='pt'?'active':''} onClick={()=>setLanguage('pt')}>
              <span className="pa-language-flag">🇧🇷</span><div><strong>Português (Brasil)</strong><small>PT-BR</small></div>{language==='pt'&&<Check size={18}/>} 
            </button>
            <button className={language==='en'?'active':''} onClick={()=>setLanguage('en')}>
              <span className="pa-language-flag">🇺🇸</span><div><strong>English</strong><small>EN</small></div>{language==='en'&&<Check size={18}/>} 
            </button>
          </div>
        </section>

        <div className="pa-settings-note">{t('Os nomes das criaturas também acompanham o idioma selecionado.','Creature names also follow the selected language.')}</div>
      </aside>
    </div>}
  </>;
}
