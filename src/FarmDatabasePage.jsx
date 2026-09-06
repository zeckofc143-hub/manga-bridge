import React,{useEffect,useMemo,useState} from 'react';
import {BookOpen,ChevronLeft,ChevronRight,ExternalLink,Filter,Search,ShieldCheck,Sparkles,Target} from 'lucide-react';
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

function FarmDetail({record}){
  const {language,t}=useLanguage();
  return <div className="rdb-page kx-page">
    <a className="rdb-back" href="#/farms"><ChevronLeft size={17}/>{t('Voltar para Farms','Back to Farms')}</a>
    <section className="rdb-detail-hero kx-detail-hero"><div className="rdb-detail-icon">{record.icon}</div><div className="rdb-detail-copy"><div className="rdb-detail-badges"><span>{catLabel(record.category,t)}</span><span><ShieldCheck size={13}/>{confidenceLabel(record.confidence,t)}</span></div><h1>{tr(record.name,language)}</h1><p>{tr(record.summary,language)}</p><SourceLinks record={record} t={t}/></div></section>

    {toolFor[record.id]&&<a className="kx-tool-cta" href={`#/tools/${toolFor[record.id]}`}><span>🧮</span><div><b>{t('Abrir ferramenta relacionada','Open related tool')}</b><small>{t('Calcule com seus próprios números e veja a fórmula.','Calculate with your own numbers and see the formula.')}</small></div><ChevronRight size={18}/></a>}

    <div className="kx-detail-grid">
      <section className="rdb-panel"><div className="kx-section-title"><ShieldCheck size={17}/><h2>{t('Dados fixos','Fixed facts')}</h2></div><ul className="kx-list">{record.facts.map((item,i)=><li key={i}>{tr(item,language)}</li>)}</ul></section>
      <section className="rdb-panel"><div className="kx-section-title"><Target size={17}/><h2>{t('Rota prática','Practical route')}</h2></div><ol className="kx-steps">{record.route.map((item,i)=><li key={i}><span>{i+1}</span><p>{tr(item,language)}</p></li>)}</ol></section>
      <section className="rdb-panel"><div className="kx-section-title"><Sparkles size={17}/><h2>{t('Dicas da comunidade','Community tips')}</h2></div><ul className="kx-list">{record.communityTips.map((item,i)=><li key={i}>{tr(item,language)}</li>)}</ul></section>
      <section className="rdb-panel kx-avoid"><div className="kx-section-title"><span>⚠️</span><h2>{t('Evite','Avoid')}</h2></div><ul className="kx-list">{record.avoid.map((item,i)=><li key={i}>{tr(item,language)}</li>)}</ul></section>
    </div>
  </div>;
}

function FarmHub(){
  const {language,t}=useLanguage();
  const [query,setQuery]=useState(headerQuery);
  const [category,setCategory]=useState('all');
  useEffect(()=>{const sync=()=>setQuery(headerQuery());window.addEventListener('hashchange',sync);window.addEventListener('app:navigation',sync);return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('app:navigation',sync);};},[]);
  const filtered=useMemo(()=>{const q=normalize(query);return FARM_RECORDS.filter(record=>(category==='all'||record.category===category)&&(!q||normalize(`${tr(record.name,language)} ${tr(record.summary,language)} ${record.category} ${record.facts.map(x=>tr(x,language)).join(' ')}`).includes(q)));},[query,category,language]);
  return <div className="rdb-page kx-page">
    <section className="rdb-identity"><div className="rdb-title-row"><span className="rdb-db-icon">🌾</span><div><span className="rdb-kicker">{t('Rotas de recursos','Resource routes')}</span><h1>{t('Farms','Farms')}</h1></div></div><p>{t('Métodos de farm separados por recurso, com valores confirmados, ordem prática, erros comuns e o que a comunidade realmente recomenda.','Farming methods separated by resource, with confirmed values, practical order, common mistakes and what the community actually recommends.')}</p><div className="rdb-principles"><span><ShieldCheck size={15}/>{t('Número ≠ opinião','Number ≠ opinion')}</span><span><Sparkles size={15}/>{t('Dicas rotuladas','Labeled tips')}</span><span><Target size={15}/>{t('Rota prática','Practical route')}</span></div></section>

    <section className="kx-dashboard"><article><small>{t('Farms catalogados','Catalogued farms')}</small><strong>{FARM_RECORDS.length}</strong></article><article><small>{t('Versão revisada','Reviewed version')}</small><strong>v{FARM_META.version}</strong></article><article><small>{t('Revisão','Review')}</small><strong>06/09</strong></article></section>

    <section className="kx-discovery"><label className="rdb-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar Resin, Honeydew, Gems, Silk…','Search Resin, Honeydew, Gems, Silk…')} aria-label={t('Buscar farms','Search farms')}/></label><div className="kx-filter-row" role="group" aria-label={t('Categorias de farm','Farm categories')}><Filter size={15}/>{FARM_CATEGORIES.map(id=><button key={id} type="button" className={category===id?'active':''} onClick={()=>setCategory(id)}>{catLabel(id,t)}</button>)}</div></section>

    <section className="kx-grid">{filtered.map(record=><a className="kx-card" href={`#/farms/${record.id}`} key={record.id}><span className="kx-icon">{record.icon}</span><div><div className="kx-card-meta"><small>{catLabel(record.category,t)}</small><span>{confidenceLabel(record.confidence,t)}</span></div><h2>{tr(record.name,language)}</h2><p>{tr(record.summary,language)}</p><div className="kx-card-foot"><span>{record.facts.length} {t('dados','facts')}</span><span>{record.communityTips.length} {t('dicas','tips')}</span></div></div><ChevronRight size={18}/></a>)}</section>
    {filtered.length===0&&<div className="rdb-empty"><Search size={26}/><b>{t('Nenhum farm encontrado','No farm found')}</b><span>{t('Limpe o filtro ou tente outro recurso.','Clear the filter or try another resource.')}</span></div>}
    <section className="kx-trust"><BookOpen size={18}/><div><b>{t('Como esta categoria funciona','How this category works')}</b><span>{tr(FARM_META.note,language)}</span></div></section>
  </div>;
}

export default function FarmDatabasePage({routeId}){
  if(!routeId)return <FarmHub/>;
  const record=FARM_RECORDS.find(item=>item.id===routeId);
  if(!record)return <div className="rdb-page"><div className="rdb-empty"><Search size={26}/><b>404</b><a href="#/farms">{routeId}</a></div></div>;
  return <FarmDetail record={record}/>;
}
