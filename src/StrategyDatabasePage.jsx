import React,{useEffect,useMemo,useState} from 'react';
import {BookOpen,ChevronLeft,ChevronRight,ExternalLink,Filter,Search,ShieldCheck,Sparkles,Users} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {STRATEGY_CATEGORIES,STRATEGY_META,STRATEGY_RECORDS,STRATEGY_SOURCES} from './strategyResearchData';
import './resourceDatabasePage.css';
import './knowledgeExpansion.css';

const tr=(value,language)=>value&&typeof value==='object'?(language==='en'?(value.en??value.pt):(value.pt??value.en)):value;
const normalize=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const headerQuery=()=>new URLSearchParams((window.location.hash.split('?')[1]||'')).get('dbq')||'';

function catLabel(id,t){return ({all:t('Todas','All'),progression:t('Progressão','Progression'),economy:t('Economia','Economy'),farm:t('Farm','Farming'),creatures:t('Criaturas','Creatures'),combat:t('Combate','Combat'),social:t('Clã / Co-op','Clan / Co-op'),event:t('Eventos','Events')})[id]||id;}
function statusLabel(id,t){return ({consensus:t('Consenso forte','Strong consensus'),community:t('Comunidade','Community'),conflict:t('Opiniões em conflito','Conflicting opinions'),pattern:t('Padrão histórico','Historical pattern'),high:t('Alta confiança','High confidence')})[id]||id;}
function statusClass(id){return id==='conflict'?'conflict':id==='consensus'||id==='high'?'strong':'community';}

function SourceLinks({record,t}){
  return <div className="kx-source-row">{record.sources.map(key=>STRATEGY_SOURCES[key]?<a key={`${record.id}-${key}`} href={STRATEGY_SOURCES[key]} target="_blank" rel="noreferrer"><BookOpen size={14}/>{key.startsWith('reddit')?'Reddit':key==='official'?t('Oficial','Official'):t('Referência','Reference')}<ExternalLink size={12}/></a>:null)}</div>;
}

function StrategyDetail({record}){
  const {language,t}=useLanguage();
  return <div className="rdb-page kx-page">
    <a className="rdb-back" href="#/strategies"><ChevronLeft size={17}/>{t('Voltar para Estratégias','Back to Strategies')}</a>
    <section className="rdb-detail-hero kx-detail-hero"><div className="rdb-detail-icon">{record.icon}</div><div className="rdb-detail-copy"><div className="rdb-detail-badges"><span>{catLabel(record.category,t)}</span><span className={`kx-status-${statusClass(record.status)}`}><Users size={13}/>{statusLabel(record.status,t)}</span></div><h1>{tr(record.title,language)}</h1><p>{tr(record.summary,language)}</p><SourceLinks record={record} t={t}/></div></section>

    {record.status==='conflict'&&<div className="kx-conflict-note"><span>⚖️</span><div><b>{t('Esta dica não tem uma resposta única','This tip does not have one universal answer')}</b><p>{t('As fontes comunitárias discordam. Use como hipótese para testar, não como regra do jogo.','Community sources disagree. Use it as a hypothesis to test, not as a game rule.')}</p></div></div>}

    <div className="kx-detail-grid">
      <section className="rdb-panel"><div className="kx-section-title"><Sparkles size={17}/><h2>{t('O que fazer','What to do')}</h2></div><ol className="kx-steps">{record.actions.map((item,i)=><li key={i}><span>{i+1}</span><p>{tr(item,language)}</p></li>)}</ol></section>
      <section className="rdb-panel"><div className="kx-section-title"><ShieldCheck size={17}/><h2>{t('Por que faz sentido','Why it makes sense')}</h2></div><ul className="kx-list">{record.why.map((item,i)=><li key={i}>{tr(item,language)}</li>)}</ul></section>
      <section className="rdb-panel kx-avoid"><div className="kx-section-title"><span>⚠️</span><h2>{t('Não transforme em regra','Do not turn it into a rule')}</h2></div><ul className="kx-list">{record.avoid.map((item,i)=><li key={i}>{tr(item,language)}</li>)}</ul></section>
    </div>
  </div>;
}

function StrategyHub(){
  const {language,t}=useLanguage();
  const [query,setQuery]=useState(headerQuery);
  const [category,setCategory]=useState('all');
  useEffect(()=>{const sync=()=>setQuery(headerQuery());window.addEventListener('hashchange',sync);window.addEventListener('app:navigation',sync);return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('app:navigation',sync);};},[]);
  const filtered=useMemo(()=>{const q=normalize(query);return STRATEGY_RECORDS.filter(record=>(category==='all'||record.category===category)&&(!q||normalize(`${tr(record.title,language)} ${tr(record.summary,language)} ${record.category} ${record.actions.map(x=>tr(x,language)).join(' ')}`).includes(q)));},[query,category,language]);
  const conflicts=STRATEGY_RECORDS.filter(x=>x.status==='conflict').length;
  return <div className="rdb-page kx-page">
    <section className="rdb-identity"><div className="rdb-title-row"><span className="rdb-db-icon">🧠</span><div><span className="rdb-kicker">{t('Playbook comunitário','Community playbook')}</span><h1>{t('Estratégias','Strategies')}</h1></div></div><p>{t('Dicas recentes da comunidade organizadas por fase e objetivo. Consenso, opinião e conflito aparecem com rótulos diferentes para não transformar comentário em verdade absoluta.','Recent community advice organized by stage and goal. Consensus, opinion and conflict use different labels so a comment never becomes absolute truth.')}</p><div className="rdb-principles"><span><Users size={15}/>{t('Comunidade recente','Recent community')}</span><span><ShieldCheck size={15}/>{t('Consenso separado','Consensus separated')}</span><span>⚖️ {t('Conflitos visíveis','Visible conflicts')}</span></div></section>

    <section className="kx-dashboard"><article><small>{t('Estratégias','Strategies')}</small><strong>{STRATEGY_RECORDS.length}</strong></article><article><small>{t('Conflitos sinalizados','Flagged conflicts')}</small><strong>{conflicts}</strong></article><article><small>{t('Revisão','Review')}</small><strong>06/09</strong><span>v{STRATEGY_META.version}</span></article></section>

    <section className="kx-discovery"><label className="rdb-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar early game, Gems, defesa, clã…','Search early game, Gems, defense, clan…')} aria-label={t('Buscar estratégias','Search strategies')}/></label><div className="kx-filter-row" role="group" aria-label={t('Categorias de estratégia','Strategy categories')}><Filter size={15}/>{STRATEGY_CATEGORIES.map(id=><button key={id} type="button" className={category===id?'active':''} onClick={()=>setCategory(id)}>{catLabel(id,t)}</button>)}</div></section>

    <section className="kx-grid">{filtered.map(record=><a className="kx-card" href={`#/strategies/${record.id}`} key={record.id}><span className="kx-icon">{record.icon}</span><div><div className="kx-card-meta"><small>{catLabel(record.category,t)}</small><span className={`kx-status-${statusClass(record.status)}`}>{statusLabel(record.status,t)}</span></div><h2>{tr(record.title,language)}</h2><p>{tr(record.summary,language)}</p></div><ChevronRight size={18}/></a>)}</section>
    {filtered.length===0&&<div className="rdb-empty"><Search size={26}/><b>{t('Nenhuma estratégia encontrada','No strategy found')}</b><span>{t('Limpe o filtro ou tente outro termo.','Clear the filter or try another term.')}</span></div>}
    <section className="kx-trust"><BookOpen size={18}/><div><b>{t('Política desta categoria','Category policy')}</b><span>{t('Dado oficial fica nas bases principais; aqui entram decisões práticas e consenso comunitário. Uma recomendação pode mudar com meta, eventos e atualização.','Official facts stay in the main databases; this area contains practical decisions and community consensus. A recommendation can change with meta, events and updates.')}</span></div></section>
  </div>;
}

export default function StrategyDatabasePage({routeId}){
  if(!routeId)return <StrategyHub/>;
  const record=STRATEGY_RECORDS.find(item=>item.id===routeId);
  if(!record)return <div className="rdb-page"><div className="rdb-empty"><Search size={26}/><b>404</b><a href="#/strategies">{routeId}</a></div></div>;
  return <StrategyDetail record={record}/>;
}
