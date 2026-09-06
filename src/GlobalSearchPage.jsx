import React,{useEffect,useMemo,useState} from 'react';
import {BookOpen,ChevronRight,Search,Sparkles,X} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {allCatalogCreatures} from './creatureCatalogData';
import {nonCapturableCreatures} from './creatureCatalogExtras';
import {creatureDescription,creatureName} from './i18nCore';
import {RESOURCE_RECORDS} from './resourceResearchData';
import {CHAMBER_RECORDS} from './chamberResearchData';
import {MECHANIC_RECORDS} from './mechanicResearchData';
import {GUIDE_RECORDS} from './guideResearchData';
import {TOOL_RECORDS} from './toolResearchData';
import {FARM_RECORDS} from './farmResearchData';
import {STRATEGY_RECORDS} from './strategyResearchData';
import './resourceDatabasePage.css';
import './globalSearchPage.css';

const tr=(value,language)=>value&&typeof value==='object'?(language==='en'?(value.en??value.pt):(value.pt??value.en)):value;
const normalize=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

function queryFromHash(){
  const params=new URLSearchParams((window.location.hash.split('?')[1]||''));
  return params.get('q') || params.get('dbq') || '';
}

function typeLabel(type,t){
  return ({creature:t('Criatura','Creature'),resource:t('Recurso','Resource'),chamber:t('Câmara','Chamber'),mechanic:t('Mecânica','Mechanic'),guide:t('Guia','Guide'),tool:t('Ferramenta','Tool'),farm:'Farm',strategy:t('Estratégia','Strategy')})[type]||type;
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
  const tools=TOOL_RECORDS.map(item=>({id:`tool:${item.id}`,type:'tool',icon:item.icon,title:tr(item.title,language),text:tr(item.desc,language),extra:`${item.keywords||''} ${item.category||''} ${tr(item.outcome,language)||''}`,path:`#/tools/${item.id}`}));
  const farms=FARM_RECORDS.map(item=>({id:`farm:${item.id}`,type:'farm',icon:item.icon,title:tr(item.name,language),text:tr(item.summary,language),extra:[item.category,item.stage,item.confidence,...(item.facts||[]).map(v=>tr(v,language)),...(item.communityTips||[]).map(v=>tr(v,language))].join(' '),path:`#/farms/${item.id}`}));
  const strategies=STRATEGY_RECORDS.map(item=>({id:`strategy:${item.id}`,type:'strategy',icon:item.icon,title:tr(item.title,language),text:tr(item.summary,language),extra:[item.category,item.stage,item.status,...(item.actions||[]).map(v=>tr(v,language)),...(item.why||[]).map(v=>tr(v,language))].join(' '),path:`#/strategies/${item.id}`}));
  return [...creatures,...resources,...chambers,...mechanics,...guides,...tools,...farms,...strategies];
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
  useEffect(()=>{
    const sync=()=>setQuery(queryFromHash());
    window.addEventListener('hashchange',sync);
    window.addEventListener('app:navigation',sync);
    return()=>{
      window.removeEventListener('hashchange',sync);
      window.removeEventListener('app:navigation',sync);
    };
  },[]);

  const index=useMemo(()=>buildIndex(language),[language]);
  const results=useMemo(()=>{
    const tokens=normalize(query).trim().split(/\s+/).filter(Boolean);
    if(!tokens.length) return [];
    return index.map(item=>({...item,score:scoreItem(item,tokens)})).filter(item=>item.score>0).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title,language==='en'?'en':'pt-BR')).slice(0,60);
  },[index,query,language]);

  const suggestions=language==='en'
    ? [['resin farm','Resin farm'],['gems','Gems'],['clan wars','Clan Wars'],['fusion','Fusion'],['frog','Frog'],['beginner','Beginner']]
    : [['farm resina','Farm de Resin'],['gems','Gems'],['clan wars','Clan Wars'],['fusão','Fusão'],['frog','Frog'],['iniciante','Iniciante']];

  const submit=event=>{
    event.preventDefault();
    const q=query.trim();
    window.location.hash=q?`/search?q=${encodeURIComponent(q)}`:'/search';
  };

  const clear=()=>{
    setQuery('');
    window.location.hash='/search';
  };

  return <div className="rdb-page gs-page">
    <section className="rdb-identity gs-identity">
      <div className="rdb-title-row"><span className="rdb-db-icon"><Search size={22}/></span><div><span className="rdb-kicker">{t('Busca unificada','Unified search')}</span><h1>{t('Busca Global','Global Search')}</h1></div></div>
      <p>{t('Pesquisa Criaturas, Recursos, Câmaras, Mecânicas, Guias, Ferramentas, Farms e Estratégias — tudo no idioma selecionado.','Searches Creatures, Resources, Chambers, Mechanics, Guides, Tools, Farms and Strategies — all in the selected language.')}</p>
      <div className="rdb-principles"><span><Sparkles size={15}/>{t('Dados atuais','Current data')}</span><span><BookOpen size={15}/>{t('8 bases em um índice','8 databases in one index')}</span></div>
    </section>

    <form className="gs-search" onSubmit={submit} role="search">
      <Search size={20} aria-hidden="true"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Ex.: farm resina, Gems, escorpião, defesa, clã…','E.g.: resin farm, Gems, scorpion, defense, clan…')} aria-label={t('Buscar em toda a wiki','Search the whole wiki')} autoComplete="off" enterKeyHint="search" inputMode="search"/>
      <div className="gs-search-actions">{query&&<button className="gs-clear" type="button" onClick={clear} aria-label={t('Limpar busca','Clear search')} title={t('Limpar','Clear')}><X size={17}/></button>}<button className="gs-submit" type="submit">{t('Buscar','Search')}</button></div>
    </form>

    {!query.trim()&&<section className="gs-start" aria-label={t('Buscas rápidas','Quick searches')}><span>{t('Comece por algo comum','Start with something common')}</span><div>{suggestions.map(([q,label])=><a key={q} href={`#/search?q=${encodeURIComponent(q)}`}>{label}</a>)}</div></section>}
    {query.trim()?<div className="gs-count"><b>{results.length}</b> {t('resultados','results')}</div>:<div className="gs-hint">{t('Busque recurso, criatura, farm, sistema, dica, objetivo ou ferramenta.','Search for a resource, creature, farm, system, tip, goal or tool.')}</div>}

    {results.length>0&&<section className="gs-results">{results.map(item=><a href={item.path} key={item.id} className="gs-result"><span className="gs-icon">{item.icon||'🐜'}</span><div><small>{typeLabel(item.type,t)}</small><strong>{item.title}</strong><p>{item.text||t('Abrir ficha','Open profile')}</p></div><ChevronRight size={18}/></a>)}</section>}
    {query.trim()&&results.length===0&&<div className="rdb-empty"><Search size={28}/><b>{t('Nada encontrado','Nothing found')}</b><span>{t('Tente outro nome, termo ou objetivo.','Try another name, term or goal.')}</span></div>}
  </div>;
}
