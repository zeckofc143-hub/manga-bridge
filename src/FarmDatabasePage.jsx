import React,{useEffect,useMemo,useState} from 'react';
import {BookOpen,ChevronDown,ChevronLeft,ChevronRight,ExternalLink,Filter,Search,ShieldCheck,Sparkles,Target} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {FARM_CATEGORIES,FARM_META,FARM_RECORDS,FARM_SOURCES} from './farmResearchData';
import './resourceDatabasePage.css';
import './knowledgeExpansion.css';

const tr=(value,language)=>value&&typeof value==='object'?(language==='en'?(value.en??value.pt):(value.pt??value.en)):value;
const normalize=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const headerQuery=()=>new URLSearchParams((window.location.hash.split('?')[1]||'')).get('dbq')||'';

function catLabel(id,t){return ({all:t('Todos','All'),economy:t('Economia','Economy'),currency:t('Moedas','Currency'),garden:t('Jardim','Garden'),clan:t('Clã','Clan'),event:t('Eventos','Events'),combat:t('Combate','Combat')})[id]||id;}
function confidenceLabel(id,t){return ({high:t('Alta confiança','High confidence'),reviewed:t('Revisado','Reviewed'),pattern:t('Padrão histórico','Historical pattern')})[id]||id;}
const toolFor={resin:'resin-session',honeydew:'aphid-yield',gems:'gem-budget','event-points':'event-points',silk:'clan-week'};

function SourceLinks({record,t}){
  return <div className="kx-source-row">{record.links.map(([key,label])=>FARM_SOURCES[key]?<a key={`${record.id}-${key}`} href={FARM_SOURCES[key]} target="_blank" rel="noreferrer"><BookOpen size={14}/>{label}<ExternalLink size={12}/></a>:null)}</div>;
}

function Disclosure({title,icon='•',children}){
  return <details className="kx-disclosure"><summary><span>{icon}</span><b>{title}</b><ChevronDown size={16}/></summary><div className="kx-disclosure-body">{children}</div></details>;
}

function FarmDetail({record}){
  const {language,t}=useLanguage();
  const fact=record.facts[0],firstStep=record.route[0],warning=record.avoid[0];
  return <div className="rdb-page kx-page">
    <a className="rdb-back" href="#/farms"><ChevronLeft size={17}/>{t('Voltar para Farms','Back to Farms')}</a>
    <section className="rdb-detail-hero kx-detail-hero"><div className="rdb-detail-icon">{record.icon}</div><div className="rdb-detail-copy"><div className="rdb-detail-badges"><span>{catLabel(record.category,t)}</span><span><ShieldCheck size={13}/>{confidenceLabel(record.confidence,t)}</span></div><h1>{tr(record.name,language)}</h1><p>{tr(record.summary,language)}</p></div></section>

    <section className="kx-quick-summary" aria-label={t('Resumo rápido','Quick summary')}>
      <header><Sparkles size={17}/><div><span>{t('Em 20 segundos','In 20 seconds')}</span><h2>{t('O que importa agora','What matters now')}</h2></div></header>
      <div className="kx-quick-grid"><article><small>{t('Dado-chave','Key fact')}</small><p>{tr(fact,language)}</p></article><article><small>{t('Primeiro passo','First step')}</small><p>{tr(firstStep,language)}</p></article><article className="warn"><small>{t('Cuidado','Watch out')}</small><p>{tr(warning,language)}</p></article></div>
    </section>

    {toolFor[record.id]&&<a className="kx-tool-cta" href={`#/tools/${toolFor[record.id]}`}><span>🧮</span><div><b>{t('Calcular com meus números','Calculate with my numbers')}</b><small>{t('Abra a ferramenta relacionada sem perder esta explicação.','Open the related tool without losing this explanation.')}</small></div><ChevronRight size={18}/></a>}

    <section className="rdb-panel kx-primary-panel"><div className="kx-section-title"><Target size={17}/><div><span>{t('Faça primeiro','Do this first')}</span><h2>{t('Rota prática','Practical route')}</h2></div></div><ol className="kx-steps">{record.route.map((item,i)=><li key={i}><span>{i+1}</span><p>{tr(item,language)}</p></li>)}</ol></section>

    <section className="kx-more" aria-label={t('Aprofundar','Go deeper')}>
      <div className="kx-more-head"><span>{t('Quando quiser aprofundar','When you want more detail')}</span><p>{t('Essas partes ajudam a conferir números e entender exceções, mas não são necessárias para seguir a rota acima.','These sections help verify numbers and understand exceptions, but are not required to follow the route above.')}</p></div>
      <Disclosure title={t('Dados confirmados','Confirmed facts')} icon="✓"><ul className="kx-list">{record.facts.map((item,i)=><li key={i}>{tr(item,language)}</li>)}</ul></Disclosure>
      <Disclosure title={t('Dicas da comunidade','Community tips')} icon="💬"><ul className="kx-list">{record.communityTips.map((item,i)=><li key={i}>{tr(item,language)}</li>)}</ul></Disclosure>
      <Disclosure title={t('Erros para evitar','Mistakes to avoid')} icon="⚠️"><ul className="kx-list">{record.avoid.map((item,i)=><li key={i}>{tr(item,language)}</li>)}</ul></Disclosure>
      <Disclosure title={t('Fontes e confiança','Sources and confidence')} icon="↗"><SourceLinks record={record} t={t}/><p className="kx-source-note">{t(`Revisão ${FARM_META.reviewed}. Valores fixos e conselhos da comunidade são tratados separadamente.`,`Reviewed ${FARM_META.reviewed}. Fixed values and community advice are treated separately.`)}</p></Disclosure>
    </section>
  </div>;
}

function FarmHub(){
  const {language,t}=useLanguage();
  const [query,setQuery]=useState(headerQuery);
  const [category,setCategory]=useState('all');
  useEffect(()=>{const sync=()=>setQuery(headerQuery());window.addEventListener('hashchange',sync);window.addEventListener('app:navigation',sync);return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('app:navigation',sync);};},[]);
  const filtered=useMemo(()=>{const q=normalize(query);return FARM_RECORDS.filter(record=>(category==='all'||record.category===category)&&(!q||normalize(`${tr(record.name,language)} ${tr(record.summary,language)} ${record.category} ${record.facts.map(x=>tr(x,language)).join(' ')}`).includes(q)));},[query,category,language]);
  const quickIds=['resin','honeydew','gems','silk'];
  const quick=quickIds.map(id=>FARM_RECORDS.find(x=>x.id===id)).filter(Boolean);
  return <div className="rdb-page kx-page">
    <section className="rdb-identity"><div className="rdb-title-row"><span className="rdb-db-icon">🌾</span><div><span className="rdb-kicker">{t('Rotas de recursos','Resource routes')}</span><h1>Farms</h1></div></div><p>{t('Escolha o recurso que está faltando. Cada página mostra primeiro a rota curta; números, comunidade e exceções ficam disponíveis depois.','Choose the resource you are missing. Each page shows the short route first; numbers, community advice and exceptions stay available after that.')}</p><div className="rdb-principles"><span><Target size={15}/>{t('Ação primeiro','Action first')}</span><span><ShieldCheck size={15}/>{t('Fato separado de dica','Facts separated from tips')}</span></div></section>

    <section className="kx-start"><div className="kx-section-title"><Target size={17}/><div><span>{t('Atalhos comuns','Common shortcuts')}</span><h2>{t('O que está faltando?','What are you missing?')}</h2></div></div><div className="kx-start-row">{quick.map(record=><a key={record.id} href={`#/farms/${record.id}`}><span>{record.icon}</span><b>{tr(record.name,language)}</b></a>)}</div></section>

    <section className="kx-discovery"><label className="rdb-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar Resin, Honeydew, Gems, Silk…','Search Resin, Honeydew, Gems, Silk…')} aria-label={t('Buscar farms','Search farms')}/></label><details className="kx-filter-disclosure"><summary><Filter size={15}/><span>{category==='all'?t('Filtrar por categoria','Filter by category'):catLabel(category,t)}</span><ChevronDown size={16}/></summary><div className="kx-filter-row" role="group" aria-label={t('Categorias de farm','Farm categories')}>{FARM_CATEGORIES.map(id=><button key={id} type="button" className={category===id?'active':''} onClick={()=>setCategory(id)}>{catLabel(id,t)}</button>)}</div></details></section>

    <div className="kx-result-count" aria-live="polite">{filtered.length} {t('rotas encontradas','routes found')}</div>
    <section className="kx-grid">{filtered.map(record=><a className="kx-card" href={`#/farms/${record.id}`} key={record.id}><span className="kx-icon">{record.icon}</span><div><div className="kx-card-meta"><small>{catLabel(record.category,t)}</small><span>{confidenceLabel(record.confidence,t)}</span></div><h2>{tr(record.name,language)}</h2><p>{tr(record.summary,language)}</p><div className="kx-card-foot"><span>{t('Abrir rota','Open route')}</span></div></div><ChevronRight size={18}/></a>)}</section>
    {filtered.length===0&&<div className="rdb-empty"><Search size={26}/><b>{t('Nenhum farm encontrado','No farm found')}</b><span>{t('Limpe o filtro ou tente outro recurso.','Clear the filter or try another resource.')}</span></div>}
  </div>;
}

function FarmNotFound(){const {t}=useLanguage();return <div className="rdb-page"><div className="rdb-empty"><Search size={26}/><b>404</b><span>{t('Esse farm não existe ou mudou de endereço.','This farm does not exist or moved.')}</span><a href="#/farms">{t('Voltar para Farms','Back to Farms')}</a></div></div>;}

export default function FarmDatabasePage({routeId}){
  if(!routeId)return <FarmHub/>;
  const record=FARM_RECORDS.find(item=>item.id===routeId);
  if(!record)return <FarmNotFound/>;
  return <FarmDetail record={record}/>;
}
