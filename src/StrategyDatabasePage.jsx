import React,{useEffect,useMemo,useState} from 'react';
import {BookOpen,ChevronDown,ChevronLeft,ChevronRight,ExternalLink,Filter,Search,ShieldCheck,Sparkles,Target,Users} from 'lucide-react';
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

function Disclosure({title,icon='•',children}){
  return <details className="kx-disclosure"><summary><span>{icon}</span><b>{title}</b><ChevronDown size={16}/></summary><div className="kx-disclosure-body">{children}</div></details>;
}

function StrategyDetail({record}){
  const {language,t}=useLanguage();
  const action=record.actions[0],reason=record.why[0],limit=record.avoid[0];
  return <div className="rdb-page kx-page">
    <a className="rdb-back" href="#/strategies"><ChevronLeft size={17}/>{t('Voltar para Estratégias','Back to Strategies')}</a>
    <section className="rdb-detail-hero kx-detail-hero"><div className="rdb-detail-icon">{record.icon}</div><div className="rdb-detail-copy"><div className="rdb-detail-badges"><span>{catLabel(record.category,t)}</span><span className={`kx-status-${statusClass(record.status)}`}><Users size={13}/>{statusLabel(record.status,t)}</span></div><h1>{tr(record.title,language)}</h1><p>{tr(record.summary,language)}</p></div></section>

    {record.status==='conflict'&&<div className="kx-conflict-note"><span>⚖️</span><div><b>{t('Não existe uma resposta única aqui','There is no single answer here')}</b><p>{t('A comunidade discorda. Trate como algo para testar no seu caso, não como regra do jogo.','The community disagrees. Treat this as something to test in your situation, not as a game rule.')}</p></div></div>}

    <section className="kx-quick-summary" aria-label={t('Resumo rápido','Quick summary')}>
      <header><Sparkles size={17}/><div><span>{t('Em 20 segundos','In 20 seconds')}</span><h2>{t('A decisão em poucas palavras','The decision in a few words')}</h2></div></header>
      <div className="kx-quick-grid"><article><small>{t('Faça','Do')}</small><p>{tr(action,language)}</p></article><article><small>{t('Por quê','Why')}</small><p>{tr(reason,language)}</p></article><article className="warn"><small>{t('Limite','Limit')}</small><p>{tr(limit,language)}</p></article></div>
    </section>

    <section className="rdb-panel kx-primary-panel"><div className="kx-section-title"><Target size={17}/><div><span>{t('Aplicação prática','Practical use')}</span><h2>{t('O que fazer','What to do')}</h2></div></div><ol className="kx-steps">{record.actions.map((item,i)=><li key={i}><span>{i+1}</span><p>{tr(item,language)}</p></li>)}</ol></section>

    <section className="kx-more" aria-label={t('Aprofundar','Go deeper')}>
      <div className="kx-more-head"><span>{t('Quando quiser entender melhor','When you want more context')}</span><p>{t('A ação acima funciona sem ler tudo. Abra estas partes para entender justificativa, limites e origem da recomendação.','The action above stands on its own. Open these sections to understand the reasoning, limits and where the recommendation came from.')}</p></div>
      <Disclosure title={t('Por que faz sentido','Why it makes sense')} icon="✓"><ul className="kx-list">{record.why.map((item,i)=><li key={i}>{tr(item,language)}</li>)}</ul></Disclosure>
      <Disclosure title={t('Quando não usar como regra','When not to treat it as a rule')} icon="⚠️"><ul className="kx-list">{record.avoid.map((item,i)=><li key={i}>{tr(item,language)}</li>)}</ul></Disclosure>
      <Disclosure title={t('Fontes e nível de confiança','Sources and confidence level')} icon="↗"><SourceLinks record={record} t={t}/><p className="kx-source-note">{t(`Status: ${statusLabel(record.status,t)} · revisão ${STRATEGY_META.reviewed}.`,`Status: ${statusLabel(record.status,t)} · reviewed ${STRATEGY_META.reviewed}.`)}</p></Disclosure>
    </section>
  </div>;
}

function StrategyHub(){
  const {language,t}=useLanguage();
  const [query,setQuery]=useState(headerQuery);
  const [category,setCategory]=useState('all');
  useEffect(()=>{const sync=()=>setQuery(headerQuery());window.addEventListener('hashchange',sync);window.addEventListener('app:navigation',sync);return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('app:navigation',sync);};},[]);
  const filtered=useMemo(()=>{const q=normalize(query);return STRATEGY_RECORDS.filter(record=>(category==='all'||record.category===category)&&(!q||normalize(`${tr(record.title,language)} ${tr(record.summary,language)} ${record.category} ${record.actions.map(x=>tr(x,language)).join(' ')}`).includes(q)));},[query,category,language]);
  const quickIds=['colony-first','resin-window','gem-priority','organized-coops'];
  const quick=quickIds.map(id=>STRATEGY_RECORDS.find(x=>x.id===id)).filter(Boolean);
  return <div className="rdb-page kx-page">
    <section className="rdb-identity"><div className="rdb-title-row"><span className="rdb-db-icon">🧠</span><div><span className="rdb-kicker">{t('Playbook comunitário','Community playbook')}</span><h1>{t('Estratégias','Strategies')}</h1></div></div><p>{t('Use esta área quando você já conhece o sistema, mas quer decidir o que vale fazer. Consenso, opinião e conflito continuam separados.','Use this area when you know the system but need to decide what is worth doing. Consensus, opinion and conflict remain separated.')}</p><div className="rdb-principles"><span><Target size={15}/>{t('Decisão primeiro','Decision first')}</span><span><Users size={15}/>{t('Opinião rotulada','Labeled opinions')}</span><span>⚖️ {t('Conflitos visíveis','Visible conflicts')}</span></div></section>

    <section className="kx-start"><div className="kx-section-title"><Sparkles size={17}/><div><span>{t('Perguntas comuns','Common questions')}</span><h2>{t('Escolha uma situação','Choose a situation')}</h2></div></div><div className="kx-start-row">{quick.map(record=><a key={record.id} href={`#/strategies/${record.id}`}><span>{record.icon}</span><b>{tr(record.title,language)}</b></a>)}</div></section>

    <section className="kx-discovery"><label className="rdb-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar early game, Gems, defesa, clã…','Search early game, Gems, defense, clan…')} aria-label={t('Buscar estratégias','Search strategies')}/></label><details className="kx-filter-disclosure"><summary><Filter size={15}/><span>{category==='all'?t('Filtrar por categoria','Filter by category'):catLabel(category,t)}</span><ChevronDown size={16}/></summary><div className="kx-filter-row" role="group" aria-label={t('Categorias de estratégia','Strategy categories')}>{STRATEGY_CATEGORIES.map(id=><button key={id} type="button" className={category===id?'active':''} onClick={()=>setCategory(id)}>{catLabel(id,t)}</button>)}</div></details></section>

    <div className="kx-result-count" aria-live="polite">{filtered.length} {t('estratégias encontradas','strategies found')}</div>
    <section className="kx-grid">{filtered.map(record=><a className="kx-card" href={`#/strategies/${record.id}`} key={record.id}><span className="kx-icon">{record.icon}</span><div><div className="kx-card-meta"><small>{catLabel(record.category,t)}</small><span className={`kx-status-${statusClass(record.status)}`}>{statusLabel(record.status,t)}</span></div><h2>{tr(record.title,language)}</h2><p>{tr(record.summary,language)}</p><div className="kx-card-foot"><span>{t('Abrir estratégia','Open strategy')}</span></div></div><ChevronRight size={18}/></a>)}</section>
    {filtered.length===0&&<div className="rdb-empty"><Search size={26}/><b>{t('Nenhuma estratégia encontrada','No strategy found')}</b><span>{t('Limpe o filtro ou tente outro termo.','Clear the filter or try another term.')}</span></div>}
  </div>;
}

function StrategyNotFound(){const {t}=useLanguage();return <div className="rdb-page"><div className="rdb-empty"><Search size={26}/><b>404</b><span>{t('Essa estratégia não existe ou mudou de endereço.','This strategy does not exist or moved.')}</span><a href="#/strategies">{t('Voltar para Estratégias','Back to Strategies')}</a></div></div>;}

export default function StrategyDatabasePage({routeId}){
  if(!routeId)return <StrategyHub/>;
  const record=STRATEGY_RECORDS.find(item=>item.id===routeId);
  if(!record)return <StrategyNotFound/>;
  return <StrategyDetail record={record}/>;
}
