import React, { useEffect } from 'react';
import { translateRawText } from './i18nCore';
import { useLanguage } from './LanguageProviderLite';

const EXTRA_EN = new Map(Object.entries({
  'Base atualizada em setembro de 2026':'Base updated in September 2026',
  'A wiki de Pocket Ants que tenta':'The Pocket Ants wiki that tries to',
  'organizar o jogo de verdade.':'actually organize the game.',
  'Recursos, câmaras, criaturas, farm, progressão, guias e ferramentas num lugar só — com fonte e nível de confiança visíveis.':'Resources, chambers, creatures, farming, progression, guides and tools in one place — with sources and confidence levels clearly shown.',
  'Base v0.1':'Base v0.1',
  'A página oficial confirma coleta, upgrades, criação de formigas, captura de criaturas e invasões. Detalhes finos recebem fonte comunitária.':'The official page confirms gathering, upgrades, ant breeding, creature capture and invasions. Fine details use community sources.',
  'Criaturas para conhecer':'Creatures to know',
  'Early / mid game':'Early / mid game',
  'Wiki comunitária independente, feita para organizar dados, guias e ferramentas do Pocket Ants.':'Independent community wiki built to organize Pocket Ants data, guides and tools.',
  'Pocket Ants pertence aos seus respectivos criadores.':'Pocket Ants belongs to its respective creators.',
  'Base atualizada':'Updated database',
  'Economia':'Economy','Colônia':'Colony','Biblioteca':'Library','Utilidades':'Utilities','Referência':'Reference','Busca global':'Global search',
  'O que cada recurso faz, onde obter e qual é o papel dele na progressão.':'What each resource does, where to get it and its role in progression.',
  'Função, prioridade e limites em uma visão feita para decidir o próximo upgrade.':'Purpose, priority and limits in a view designed to help choose the next upgrade.',
  'Dado confirmado fica separado de estratégia comunitária. Assim um conselho de meta não vira regra eterna só porque entrou numa página.':'Confirmed data stays separate from community strategy, so a meta recommendation does not become a permanent rule just because it appears on a page.',
  'Primeiros passos em 5 decisões':'Getting started in 5 decisions',
  'Comparador de criaturas':'Creature comparator','Compare ratings relativos lado a lado.':'Compare relative ratings side by side.',
  'Planejador de farm':'Farm planner','Use sua média real por run para estimar quanto falta.':'Use your real average per run to estimate what remains.',
  'Tenho agora':'Current amount','Meta':'Target','Ganho por run':'Gain per run','Minutos por run':'Minutes per run','Faltam':'Remaining','Runs':'Runs','Tempo estimado':'Estimated time',
  'A calculadora não inventa drop rate: você coloca a sua média, então ela continua útil mesmo se o jogo mudar.':'The calculator does not invent drop rates: you enter your own average, so it stays useful even if the game changes.',
  'Checklist diário':'Daily checklist','Fica salvo neste aparelho.':'Saved on this device.','Resetar':'Reset','concluídos':'completed',
  'Tracker de coleção':'Collection tracker','marcadas como obtidas.':'marked as obtained.','Filtrar coleção...':'Filter collection...',
  'Coisas que uma wiki tradicional quase nunca entrega: comparação, planejamento e trackers salvos no navegador.':'Things a traditional wiki rarely provides: comparison, planning and trackers saved in your browser.',
  'Siglas e termos que aparecem em guias e conversas da comunidade.':'Abbreviations and terms used in guides and community discussions.',
  'A busca cobre criaturas, recursos, câmaras, mecânicas e guias.':'Search covers creatures, resources, chambers, mechanics and guides.',
  'Buscar':'Search','Ex.: resina, scorpion, rainha...':'E.g.: resin, scorpion, queen...','Tente outro nome, função, raridade ou sistema.':'Try another name, role, rarity or system.','Digite algo para buscar em toda a wiki.':'Type something to search across the wiki.',
  'Página não encontrada':'Page not found','Essa formiga cavou para o lado errado.':'This ant dug in the wrong direction.','Voltar ao início':'Back to home',
  'Nada encontrado com esses filtros.':'Nothing found with these filters.','Nenhum resultado':'No results',
  'Stats relativos':'Relative stats','Escala comunitária usada para comparação entre criaturas.':'Community scale used to compare creatures.','Captura e obtenção':'Capture and acquisition','Tempo':'Time','Condição':'Condition','Partes':'Parts','Fase':'Phase',
  'Como ler esta página':'How to read this page','Stats e condições são dados de referência. A frase de estratégia é tratada como orientação comunitária e pode mudar conforme eventos, counters e atualizações.':'Stats and conditions are reference data. Strategy text is treated as community guidance and may change with events, counters and updates.',
  'Criaturas especiais':'Special creatures','A referência comunitária informa dezenas de variantes especiais exclusivas de eventos. Esta primeira base já indexa as confirmadas na pesquisa.':'Community references list dozens of event-exclusive special variants. This database indexes the ones confirmed by the research.',
  'Eventos':'Events','Básico':'Basic','Avançado':'Advanced','Jardim':'Garden','Premium':'Premium','Combate':'Combat','Crítica':'Critical','Alta':'High','Média':'Medium','Situacional':'Situational',
  'Como obter':'How to get','Usos':'Uses','MAX':'MAX','Oficial':'Official','Wiki comunitária':'Community wiki','Consenso da comunidade':'Community consensus','A revisar':'Needs review',
  'Google Play / Ariel Games':'Google Play / Ariel Games','PocketAnts Wiki, revisada em 2026':'PocketAnts Wiki, reviewed in 2026','Dicas recorrentes de jogadores; pode variar com o meta':'Recurring player advice; may vary with the meta','Dado com conflito ou ainda sem confirmação suficiente':'Conflicting or insufficiently confirmed data',
  'Resultados':'Results','Criatura':'Creature','Recurso':'Resource','Câmara':'Chamber','Mecânica':'Mechanic','Guia':'Guide',
  'Iniciante':'Beginner','Iniciante / intermediário':'Beginner / intermediate','Intermediário':'Intermediate','Roadmap':'Roadmap',
  'Prioridade':'Priority','Função':'Role','Limite':'Limit','Descrição':'Description','Resumo':'Summary','Detalhes':'Details',
  'Abrir configurações':'Open settings','Configurações do site':'Site settings','Os nomes das criaturas também acompanham o idioma selecionado.':'Creature names also follow the selected language.'
}));

const EXTRA_PT = new Map([...EXTRA_EN.entries()].map(([pt,en]) => [en,pt]));
const FRAGMENTS_EN = [
  ['A wiki de Pocket Ants que tenta','The Pocket Ants wiki that tries to'],
  ['organizar o jogo de verdade.','actually organize the game.'],
  ['Dados revisados em ','Data reviewed on '],
  [' resultados',' results'],
  [' concluídos',' completed'],
  [' marcadas como obtidas.',' marked as obtained.'],
  ['Voltar para criaturas','Back to creatures'],
  ['Voltar para câmaras','Back to chambers'],
  ['Voltar para ','Back to '],
  ['Resultado para ','Result for '],
  ['Resultados para ','Results for '],
  ['Fonte: ','Source: '],
  ['Prioridade: ','Priority: ']
];
const FRAGMENTS_PT = FRAGMENTS_EN.map(([pt,en]) => [en,pt]);
const TEXT_STATE = new WeakMap();
const ATTR_STATE = new WeakMap();
const ROLE_CONTEXT = '.ce3-card,.ce3-detail-page,.ce3-role-scroll,.cth-root,.creature-card,.role-row,.tag-cloud';

const clean = value => String(value ?? '').replace(/\s+/g,' ').trim();
const isNativeDatabaseRoute = () => /^#\/(?:resources|chambers|mechanics|guides|tools)(?:\/|$|\?)/i.test(window.location.hash || '#/');

function convertText(raw,language){
  const source=String(raw ?? '');
  if(!source.trim()) return source;
  const leading=source.match(/^\s*/)?.[0] || '';
  const trailing=source.match(/\s*$/)?.[0] || '';
  let core=source.trim();
  core=translateRawText(core,language);
  const exact=language==='en'?EXTRA_EN:EXTRA_PT;
  if(exact.has(clean(core))) core=exact.get(clean(core));
  for(const [from,to] of (language==='en'?FRAGMENTS_EN:FRAGMENTS_PT)){
    if(core.includes(from)) core=core.split(from).join(to);
  }
  if(language==='en'){
    core=core
      .replace(/^(\d+)\s+resultados$/i,'$1 results')
      .replace(/^(\d+)\/(\d+)\s+concluídos$/i,'$1/$2 completed')
      .replace(/^Dados revisados em\s+(.+)$/i,'Data reviewed on $1')
      .replace(/^Revisado em\s+(.+)$/i,'Reviewed on $1');
  }
  return `${leading}${core}${trailing}`;
}

function contextualText(node,source,language){
  if(language==='en' && clean(source)==='Início' && node.parentElement?.closest?.(ROLE_CONTEXT)){
    const leading=source.match(/^\s*/)?.[0] || '';
    const trailing=source.match(/\s*$/)?.[0] || '';
    return `${leading}Early game${trailing}`;
  }
  return convertText(source,language);
}

function translateTextNode(node,language){
  if(node.nodeType!==Node.TEXT_NODE || !node.nodeValue?.trim()) return;
  if(node.parentElement?.closest?.('[data-no-auto-i18n="true"]')) return;
  const current=node.nodeValue;
  let state=TEXT_STATE.get(node);
  if(!state || (state.applied!==undefined && current!==state.applied)) state={source:current,applied:undefined};
  const next=contextualText(node,state.source,language);
  if(current!==next) node.nodeValue=next;
  state.applied=next;
  TEXT_STATE.set(node,state);
}

function translateAttributes(el,language){
  if(!(el instanceof Element)) return;
  let state=ATTR_STATE.get(el) || {};
  for(const attr of ['placeholder','aria-label','title']){
    if(!el.hasAttribute(attr)) continue;
    const current=el.getAttribute(attr) || '';
    if(!state[attr] || (state[attr].applied!==undefined && current!==state[attr].applied)) state[attr]={source:current,applied:undefined};
    const next=convertText(state[attr].source,language);
    if(current!==next) el.setAttribute(attr,next);
    state[attr].applied=next;
  }
  ATTR_STATE.set(el,state);
}

function processRoot(root,language){
  if(isNativeDatabaseRoute()) return;
  if(!root) return;
  if(root.nodeType===Node.TEXT_NODE){ translateTextNode(root,language); return; }
  if(root.nodeType!==Node.ELEMENT_NODE) return;
  translateAttributes(root,language);
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())) translateTextNode(node,language);
  root.querySelectorAll?.('[placeholder],[aria-label],[title]').forEach(el=>translateAttributes(el,language));
}

export default function TranslationCoverageLite(){
  const {language}=useLanguage();
  useEffect(()=>{
    let frame=0;
    const timers=new Set();

    const flush=()=>{frame=0;processRoot(document.body,language);};
    const schedule=(delays=[0,70,220])=>{
      if(isNativeDatabaseRoute()) return;
      if(!frame) frame=requestAnimationFrame(flush);
      delays.filter(delay=>delay>0).forEach(delay=>{
        const id=window.setTimeout(()=>{timers.delete(id);processRoot(document.body,language);},delay);
        timers.add(id);
      });
    };
    const onRoute=()=>schedule([0,70,220,900]);
    const onInteraction=event=>{
      if(event.type==='input' && !event.target.matches?.('input,textarea,select')) return;
      schedule([0,80]);
    };

    schedule([0,80,260,900,1800,3200]);
    window.addEventListener('hashchange',onRoute);
    window.addEventListener('app:navigation',onRoute);
    document.addEventListener('click',onInteraction,true);
    document.addEventListener('input',onInteraction,true);
    document.addEventListener('change',onInteraction,true);

    return ()=>{
      window.removeEventListener('hashchange',onRoute);
      window.removeEventListener('app:navigation',onRoute);
      document.removeEventListener('click',onInteraction,true);
      document.removeEventListener('input',onInteraction,true);
      document.removeEventListener('change',onInteraction,true);
      if(frame) cancelAnimationFrame(frame);
      timers.forEach(id=>window.clearTimeout(id));
      timers.clear();
    };
  },[language]);
  return null;
}
