import React,{useEffect,useMemo,useState} from 'react';
import {BookOpen,ChevronRight,Search,Sparkles} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {allCatalogCreatures} from './creatureCatalogData';
import {nonCapturableCreatures} from './creatureCatalogExtras';
import {creatureDescription,creatureName} from './i18nCore';
import {RESOURCE_RECORDS} from './resourceResearchData';
import {CHAMBER_RECORDS} from './chamberResearchData';
import {MECHANIC_RECORDS} from './mechanicResearchData';
import {GUIDE_RECORDS} from './guideResearchData';
import './resourceDatabasePage.css';
import './globalSearchPage.css';

const TOOL_RECORDS=[
  {id:'fusion',icon:'🧬',name:{pt:'Calculadora de fusão',en:'Fusion calculator'},summary:{pt:'Chance de fusão com Chamber, Honeydew, Clan, flores, skin e Gems.',en:'Fusion chance with Chamber, Honeydew, Clan, flowers, skin and Gems.'}},
  {id:'queen-resin',icon:'👑',name:{pt:'Planner Queen ↔ Resin',en:'Queen ↔ Resin planner'},summary:{pt:'Custos, tempo e capacidade de Resin necessária para subir a Queen.',en:'Costs, time and Resin capacity required to upgrade the Queen.'}},
  {id:'farm',icon:'🌾',name:{pt:'Planejador de farm',en:'Farm planner'},summary:{pt:'Estime runs e tempo usando sua média real.',en:'Estimate runs and time using your real average.'}},
  {id:'battle-tokens',icon:'🎟️',name:{pt:'Planner de Battle Tokens',en:'Battle Token planner'},summary:{pt:'Planeje entradas, saldo e reset diário.',en:'Plan entries, balance and daily reset.'}},
  {id:'daily',icon:'📅',name:{pt:'Ganhos diários',en:'Daily gains'},summary:{pt:'Some recompensas fixas das rotinas diárias e co-ops.',en:'Add fixed rewards from daily routines and co-ops.'}},
  {id:'legions',icon:'🛡️',name:{pt:'Planner de Legions',en:'Legions planner'},summary:{pt:'Calcule Resin e Silk para slots e novas espécies.',en:'Calculate Resin and Silk for slots and new ant species.'}},
  {id:'collection',icon:'🪲',name:{pt:'Tracker de coleção',en:'Collection tracker'},summary:{pt:'Marque criaturas obtidas e acompanhe sua coleção.',en:'Mark owned creatures and track your collection.'}}
];

const tr=(value,language)=>value&&typeof value==='object'?(language==='en'?(value.en??value.pt):(value.pt??value.en)):value;
const normalize=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

function queryFromHash(){
  const params=new URLSearchParams((window.location.hash.split('?')[1]||''));
  return params.get('q') || params.get('dbq') || '';
}

function typeLabel(type,t){
  return ({creature:t('Criatura','Creature'),resource:t('Recurso','Resource'),chamber:t('Câmara','Chamber'),mechanic:t('Mecânica','Mechanic'),guide:t('Guia','Guide'),tool:t('Ferramenta','Tool')})[type]||type;
}

function buildIndex(language){
  const creatures=[...allCatalogCreatures,...nonCapturableCreatures].map(item=>({
    id:`creature:${item.id}`,type:'creature',icon:item.icon||'🪲',title:creatureName(item.id,item.name,language),
    text:creatureDescription(item.id,item.description||item.note||'',language),
    extra:[item.rarity,item.attraction,item.category,item.captureStatus].filter(Boolean).join(' '),path:`#/creatures/${item.id}`
  }));
  const resources=RESOURCE_RECORDS.map(item=>({id:`resource:${item.id}`,type:'resource',icon:item.icon,title:tr(item.name,language),text:tr(item.summary,language),extra:[item.category,item.priority,item.stage,...(item.systems||[])].join(' '),path:`#/resources/${item.id}`}));
  const chambers=CHAMBER_RECORDS.map(item=>({id:`chamber:${item.id}`,type:'chamber',icon:item.icon,title:tr(item.name,language),text:tr(item.summary,language),extra:[item.category,item.priority,item.stage,...(item.effects||[]).map(v=>tr(v,language))].join(' '),path:`#/chambers/${item.id}`}));
  const mechanics=MECHANIC_RECORDS.map(item=>({id:`mechanic:${item.id}`,type:'mechanic',icon:item.icon,title:tr(item.name,language),text:tr(item.summary,language),extra:[item.category,item.stage,item.kind,item.search,...(item.facts||[]).map(v=>tr(v,language))].join(' '),path:`#/mechanics/${item.id}`}));
  const guides=GUIDE_RECORDS.map(item=>({id:`guide:${item.id}`,type:'guide',icon:item.icon,title:tr(item.title,language),text:tr(item.summary,language),extra:[item.category,item.stage,tr(item.outcome,language),...(item.steps||[]).map(v=>tr(v,language))].join(' '),path:`#/guides/${item.id}`}));
  const tools=TOOL_RECORDS.map(item=>({id:`tool:${item.id}`,type:'tool',icon:item.icon,title:tr(item.name,language),text:tr(item.summary,language),extra:item.id.replaceAll('-',' '),path:`#/tools/${item.id}`}));
  return [...creatures,...resources,...chambers,...mechanics,...guides,...tools];
}

function scoreItem(item,tokens){
  const title=normalize(item.title);
  const text=normalize(`${item.text} ${item.extra} ${item.type}`);
  let score=0;
  for(const token of tokens){
    if(title===token) score+=20;
    else if(title.startsWith(token)) score+=12;
    else if(title.includes(token)) score+=8;
    if(text.includes(token)) score+=2;
  }
  return score;
}

export default function GlobalSearchPage(){
  const {language,t}=useLanguage();
  const [query,setQuery]=useState(queryFromHash);
  useEffect(()=>{const sync=()=>setQuery(queryFromHash());window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);

  const index=useMemo(()=>buildIndex(language),[language]);
  const results=useMemo(()=>{
    const tokens=normalize(query).trim().split(/\s+/).filter(Boolean);
    if(!tokens.length) return [];
    return index.map(item=>({...item,score:scoreItem(item,tokens)})).filter(item=>item.score>0).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title,language==='en'?'en':'pt-BR')).slice(0,60);
  },[index,query,language]);

  const submit=event=>{
    event.preventDefault();
    const q=query.trim();
    window.location.hash=q?`/search?q=${encodeURIComponent(q)}`:'/search';
  };

  return <div className="rdb-page gs-page">
    <section className="rdb-identity gs-identity">
      <div className="rdb-title-row"><span className="rdb-db-icon"><Search size={22}/></span><div><span className="rdb-kicker">{t('Busca unificada','Unified search')}</span><h1>{t('Busca Global','Global Search')}</h1></div></div>
      <p>{t('Pesquisa as bases atuais de Criaturas, Recursos, Câmaras, Mecânicas, Guias e Ferramentas — já no idioma selecionado.','Searches the current Creatures, Resources, Chambers, Mechanics, Guides and Tools databases — in the selected language.')}</p>
      <div className="rdb-principles"><span><Sparkles size={15}/>{t('Dados atuais','Current data')}</span><span><BookOpen size={15}/>{t('Todas as categorias','All categories')}</span></div>
    </section>

    <form className="gs-search" onSubmit={submit} role="search">
      <Search size={20}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Ex.: resina, escorpião, fusão, clã…','E.g.: resin, scorpion, fusion, clan…')} aria-label={t('Buscar em toda a wiki','Search the whole wiki')}/><button type="submit">{t('Buscar','Search')}</button>
    </form>

    {query.trim()?<div className="gs-count"><b>{results.length}</b> {t('resultados','results')}</div>:<div className="gs-hint">{t('Digite um recurso, criatura, sistema, objetivo ou ferramenta.','Type a resource, creature, system, goal or tool.')}</div>}

    {results.length>0&&<section className="gs-results">{results.map(item=><a href={item.path} key={item.id} className="gs-result"><span className="gs-icon">{item.icon||'🐜'}</span><div><small>{typeLabel(item.type,t)}</small><strong>{item.title}</strong><p>{item.text||t('Abrir ficha','Open profile')}</p></div><ChevronRight size={18}/></a>)}</section>}
    {query.trim()&&results.length===0&&<div className="rdb-empty"><Search size={28}/><b>{t('Nada encontrado','Nothing found')}</b><span>{t('Tente outro nome, termo ou objetivo.','Try another name, term or goal.')}</span></div>}
  </div>;
}
