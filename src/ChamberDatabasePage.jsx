import React,{useEffect,useMemo,useState} from 'react';
import {
  AlertTriangle,ArrowRight,BookOpen,Check,ChevronLeft,ChevronRight,Database,ExternalLink,
  Gauge,GitBranch,Minus,Plus,RotateCcw,Search,ShieldCheck,SlidersHorizontal,Sparkles,
  Target,Warehouse
} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {CHAMBER_DEPENDENCY_PATHS,CHAMBER_GOALS,CHAMBER_RECORDS,CHAMBER_RESEARCH_META} from './chamberResearchData';
import './resourceDatabasePage.css';
import './resourceResearchExpansion.css';
import './chamberDatabasePage.css';

const STORAGE_KEY='pa-chamber-levels-v1';
const priorityRank={critical:0,high:1,medium:2,situational:3};
const stageRank={early:0,'early-mid':1,mid:2,'mid-late':3,late:4,all:5};
const categoryOrder=['core','economy','creatures','advanced','garden'];
const normalize=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const tr=(value,language)=>value&&typeof value==='object'&&('pt' in value||'en' in value)?(language==='en'?value.en:value.pt):value;
const chamberById=id=>CHAMBER_RECORDS.find(c=>c.id===id);

function readHeaderQuery(){
  const hash=window.location.hash||'';
  return new URLSearchParams(hash.split('?')[1]||'').get('dbq')||'';
}
function initialLevels(){
  try{
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
    return Object.fromEntries(CHAMBER_RECORDS.map(c=>[c.id,Math.max(0,Math.min(12,Number(parsed[c.id])||0))]));
  }catch{
    return Object.fromEntries(CHAMBER_RECORDS.map(c=>[c.id,c.id==='queen'?1:0]));
  }
}
function categoryLabel(value,t){return ({core:t('Núcleo','Core'),economy:t('Economia','Economy'),creatures:t('Criaturas','Creatures'),advanced:t('Avançadas','Advanced'),garden:t('Jardim','Garden')})[value]||value;}
function priorityLabel(value,t){return ({critical:t('Crítica','Critical'),high:t('Alta','High'),medium:t('Média','Medium'),situational:t('Situacional','Situational')})[value]||value;}
function stageLabel(value,t){return ({early:t('Início','Early'),'early-mid':t('Início / meio','Early / mid'),mid:t('Meio','Mid'),'mid-late':t('Meio / avançado','Mid / late'),late:t('Avançado','Late'),all:t('Todas as fases','All stages')})[value]||value;}
function sourceHref(chamber){
  if(chamber.id==='resin') return CHAMBER_RESEARCH_META.resinUrl;
  if(chamber.id==='honeydew') return CHAMBER_RESEARCH_META.aphidUrl;
  if(chamber.id==='body-parts') return CHAMBER_RESEARCH_META.faqUrl;
  return CHAMBER_RESEARCH_META.colonyUrl;
}

function TrustBadge({chamber,t}){
  if(chamber.source==='conflict') return <span className="rr-trust cc-conflict"><AlertTriangle size={13}/>{t('Conflito de fonte','Source conflict')}</span>;
  return <span className="rr-trust community"><ShieldCheck size={13}/>{t('Wiki revisada','Reviewed wiki')}</span>;
}

function ChamberCard({chamber,level,language,t}){
  const nextMilestone=chamber.milestones?.[0];
  return <article className="rr-card cc-card">
    <div className="rr-card-top"><span className="rr-resource-icon">{chamber.icon}</span><div className="rr-badges"><span>{categoryLabel(chamber.category,t)}</span><span className={`rr-priority p-${chamber.priority}`}>{priorityLabel(chamber.priority,t)}</span></div></div>
    <div className="rr-card-title"><div><h2>{tr(chamber.name,language)}</h2><small>{stageLabel(chamber.stage,t)}</small></div><TrustBadge chamber={chamber} t={t}/></div>
    <p>{tr(chamber.summary,language)}</p>
    <div className="rr-facts-grid">
      <div><span>{t('Seu nível','Your level')}</span><b>{level}/12</b></div>
      <div><span>{t('Máximo conhecido','Known maximum')}</span><b>{tr(chamber.maxStat,language)}</b></div>
      <div><span>{t('Efeitos','Effects')}</span><b>{chamber.effects.length}</b></div>
      <div><span>{t('Recursos ligados','Related resources')}</span><b>{chamber.resources.length}</b></div>
    </div>
    {nextMilestone&&<div className="rr-use-preview"><Target size={15}/><span>{tr(nextMilestone,language)}</span></div>}
    <div className="rr-card-actions"><a className="rr-primary" href={`#/chambers/${chamber.id}`}>{t('Abrir ficha','Open profile')} <ChevronRight size={16}/></a><a href={sourceHref(chamber)} target="_blank" rel="noreferrer"><BookOpen size={15}/>{t('Fonte','Source')}</a></div>
  </article>;
}

function LevelTracker({levels,setLevels,language,t}){
  const total=Object.values(levels).reduce((a,b)=>a+b,0);
  const max=CHAMBER_RECORDS.length*12;
  const change=(id,delta)=>setLevels(current=>({...current,[id]:Math.max(0,Math.min(12,(current[id]||0)+delta))}));
  const reset=()=>setLevels(Object.fromEntries(CHAMBER_RECORDS.map(c=>[c.id,c.id==='queen'?1:0])));
  return <section className="rr-tool-panel cc-tracker">
    <div className="rr-section-title"><div><span><Gauge size={17}/>{t('Painel da colônia','Colony dashboard')}</span><h2>{t('Níveis das suas câmaras','Your chamber levels')}</h2><p>{t('Fica salvo neste aparelho. Use para o recomendador entender onde sua progressão está travando.','Saved on this device. The advisor uses it to understand where your progression is bottlenecked.')}</p></div><button onClick={reset} type="button"><RotateCcw size={15}/>{t('Resetar','Reset')}</button></div>
    <div className="cc-progress"><div><span>{total}/{max}</span><b>{Math.round(total/max*100)}%</b></div><i style={{width:`${total/max*100}%`}}/></div>
    <div className="cc-level-grid">{CHAMBER_RECORDS.map(chamber=>{const level=levels[chamber.id]||0;return <div key={chamber.id} className={level===12?'maxed':''}><span className="cc-mini-icon">{chamber.icon}</span><div><strong>{tr(chamber.name,language)}</strong><small>{level===0?t('Não construída','Not built'):level===12?t('MAX','MAX'):`Lv. ${level}`}</small></div><div className="rr-counter"><button onClick={()=>change(chamber.id,-1)} aria-label={t('Diminuir nível','Decrease level')}><Minus size={15}/></button><b>{level}</b><button onClick={()=>change(chamber.id,1)} aria-label={t('Aumentar nível','Increase level')}><Plus size={15}/></button></div></div>})}</div>
  </section>;
}

function UpgradeAdvisor({levels,language,t}){
  const [goal,setGoal]=useState('economy');
  const plan=CHAMBER_GOALS[goal];
  const candidates=plan.order.map(id=>chamberById(id)).filter(Boolean);
  const recommendation=candidates.find(c=>(levels[c.id]||0)<12)||candidates[0];
  return <section className="rr-tool-panel cc-advisor">
    <div className="rr-section-title"><div><span><Target size={17}/>{t('Recomendador','Advisor')}</span><h2>{t('Qual câmara subir agora?','Which chamber should I upgrade now?')}</h2><p>{t('É uma orientação transparente baseada no objetivo escolhido e nos níveis que você marcou — não uma “IA” inventando prioridade.','A transparent recommendation based on your chosen goal and saved levels — not an AI inventing priorities.')}</p></div></div>
    <label className="rr-goal-select"><span>{t('Objetivo','Goal')}</span><select value={goal} onChange={e=>setGoal(e.target.value)}>{Object.entries(CHAMBER_GOALS).map(([id,item])=><option key={id} value={id}>{tr(item.label,language)}</option>)}</select></label>
    <div className="cc-recommend"><span>{recommendation.icon}</span><div><small>{t('Próxima prioridade','Next priority')}</small><h3>{tr(recommendation.name,language)} · Lv. {levels[recommendation.id]||0}/12</h3><p>{tr(plan.note,language)}</p></div><a href={`#/chambers/${recommendation.id}`}>{t('Ver ficha','View profile')} <ChevronRight size={15}/></a></div>
    <div className="cc-order">{candidates.map((c,index)=><div key={c.id}><span>{index+1}</span><a href={`#/chambers/${c.id}`}>{c.icon} {tr(c.name,language)}</a><b>Lv. {levels[c.id]||0}</b></div>)}</div>
  </section>;
}

function DependencyMap({language,t}){
  const nodeLabel=id=>{const c=chamberById(id);if(c)return `${c.icon} ${tr(c.name,language)}`;return ({'aphid-farm':t('🐞 Aphid Farm','🐞 Aphid Farm'),garden:t('🌸 Garden','🌸 Garden')})[id]||id;};
  return <section className="rr-tool-panel cc-deps"><div className="rr-section-title"><div><span><GitBranch size={17}/>{t('Dependências','Dependencies')}</span><h2>{t('Como as câmaras puxam a progressão','How chambers feed progression')}</h2><p>{t('Uma visão curta dos gargalos que fazem uma câmara depender da outra.','A compact view of the bottlenecks that make one chamber depend on another.')}</p></div></div><div className="rr-economy-grid">{CHAMBER_DEPENDENCY_PATHS.map((path,index)=><div key={`${path.from}-${path.to}-${index}`}><a href={chamberById(path.from)?`#/chambers/${path.from}`:undefined}>{nodeLabel(path.from)}</a><span><ArrowRight size={14}/>{tr(path.label,language)}</span><a href={chamberById(path.to)?`#/chambers/${path.to}`:undefined}>{nodeLabel(path.to)}</a></div>)}</div></section>;
}

function ChamberList(){
  const {language,t}=useLanguage();
  const [query,setQuery]=useState(readHeaderQuery);
  const [category,setCategory]=useState('all');
  const [priority,setPriority]=useState('all');
  const [sort,setSort]=useState('priority');
  const [levels,setLevels]=useState(initialLevels);
  useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(levels));}catch{}},[levels]);
  useEffect(()=>{const sync=()=>setQuery(readHeaderQuery());window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);

  const filtered=useMemo(()=>{
    const q=normalize(query.trim());
    const list=CHAMBER_RECORDS.filter(c=>{
      const haystack=normalize([tr(c.name,language),tr(c.summary,language),categoryLabel(c.category,t),priorityLabel(c.priority,t),stageLabel(c.stage,t),...(c.effects||[]).map(x=>tr(x,language)),...(c.milestones||[]).map(x=>tr(x,language)),...(c.resources||[]),...(c.unlocks||[])].join(' '));
      return (!q||haystack.includes(q))&&(category==='all'||c.category===category)&&(priority==='all'||c.priority===priority);
    });
    return [...list].sort((a,b)=>sort==='name'?tr(a.name,language).localeCompare(tr(b.name,language),language==='en'?'en':'pt-BR'):sort==='stage'?(stageRank[a.stage]??9)-(stageRank[b.stage]??9):(priorityRank[a.priority]??9)-(priorityRank[b.priority]??9));
  },[query,category,priority,sort,language,t]);

  const built=CHAMBER_RECORDS.filter(c=>(levels[c.id]||0)>0).length;
  const maxed=CHAMBER_RECORDS.filter(c=>(levels[c.id]||0)===12).length;
  const conflicts=CHAMBER_RECORDS.filter(c=>c.source==='conflict').length;
  return <div className="rdb-page rr-page cc-page">
    <section className="rdb-identity cc-identity"><div className="rdb-title-row"><span className="rdb-db-icon"><Warehouse size={22}/></span><div><span className="rdb-kicker">{t('Câmaras · progressão da colônia','Chambers · colony progression')}</span><h1>{t('Central de Câmaras','Chamber Hub')}</h1></div></div><p>{t('Agora Câmaras funciona como banco de dados e painel de progressão: níveis salvos, gargalos, marcos, dependências e recomendação de próximo upgrade.','Chambers is now both a database and a progression dashboard: saved levels, bottlenecks, milestones, dependencies and next-upgrade guidance.')}</p><div className="rdb-principles"><span><Gauge size={15}/>{t('Níveis 1–12','Levels 1–12')}</span><span><Target size={15}/>{t('Prioridade','Priority')}</span><span><GitBranch size={15}/>{t('Dependências','Dependencies')}</span><span><ShieldCheck size={15}/>{t('Fontes visíveis','Visible sources')}</span></div></section>

    <section className="rr-update-banner"><Sparkles size={20}/><div><strong>{t(`Base revisada em ${CHAMBER_RESEARCH_META.checkedAt.split('-').reverse().join('/')}`,`Database reviewed on ${CHAMBER_RESEARCH_META.checkedAt}`)}</strong><p>{t('Dados atuais da PocketAnts Wiki foram cruzados com a base já revisada do projeto. Conflitos continuam sinalizados.','Current PocketAnts Wiki data was cross-checked with the project database. Conflicts remain flagged.')}</p></div><a href={CHAMBER_RESEARCH_META.colonyUrl} target="_blank" rel="noreferrer">{t('Fonte geral','General source')} <ExternalLink size={14}/></a></section>

    <section className="rdb-hero"><div className="rdb-summary-grid"><div><strong>{CHAMBER_RECORDS.length}</strong><span>{t('câmaras catalogadas','chambers catalogued')}</span></div><div><strong>{built}</strong><span>{t('marcadas como construídas','marked as built')}</span></div><div><strong>{maxed}</strong><span>{t('no nível máximo','at max level')}</span></div><div><strong>{conflicts}</strong><span>{t('conflito de fonte visível','visible source conflict')}</span></div></div></section>

    <LevelTracker levels={levels} setLevels={setLevels} language={language} t={t}/>
    <UpgradeAdvisor levels={levels} language={language} t={t}/>

    <nav className="rdb-tabs" aria-label={t('Categorias de câmaras','Chamber categories')}><button className={category==='all'?'active':''} onClick={()=>setCategory('all')}>{t('Todas','All')}</button>{categoryOrder.map(value=><button key={value} className={category===value?'active':''} onClick={()=>setCategory(value)}>{categoryLabel(value,t)}</button>)}</nav>
    <div className="rdb-filter-row"><label className="rdb-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar câmara, recurso, desbloqueio…','Search chamber, resource, unlock…')}/></label><details className="rdb-filters"><summary><SlidersHorizontal size={17}/>{t('Filtros','Filters')} <span>{filtered.length}</span></summary><div><label><span>{t('Prioridade','Priority')}</span><select value={priority} onChange={e=>setPriority(e.target.value)}><option value="all">{t('Todas','All')}</option><option value="critical">{t('Crítica','Critical')}</option><option value="high">{t('Alta','High')}</option><option value="medium">{t('Média','Medium')}</option><option value="situational">{t('Situacional','Situational')}</option></select></label><label><span>{t('Ordenar','Sort')}</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="priority">{t('Prioridade','Priority')}</option><option value="stage">{t('Fase do jogo','Game stage')}</option><option value="name">A–Z</option></select></label></div></details></div>
    <div className="rdb-result-line"><b>{filtered.length}</b> {t('resultados','results')}</div>
    {filtered.length?<section className="rr-grid cc-grid">{filtered.map(c=><ChamberCard key={c.id} chamber={c} level={levels[c.id]||0} language={language} t={t}/>)}</section>:<div className="rdb-empty"><Search size={28}/><b>{t('Nada encontrado','Nothing found')}</b><span>{t('Mude os filtros ou tente outro termo.','Change filters or try another term.')}</span></div>}
    <DependencyMap language={language} t={t}/>
    <section className="rr-source-note"><ShieldCheck size={18}/><div><b>{t('Estratégia não vira fato','Strategy does not become fact')}</b><p>{t('Prioridade de upgrade é orientação comunitária e do planejador; capacidades, desbloqueios e relações documentadas ficam separadas.','Upgrade priority is community/planner guidance; documented capacities, unlocks and relationships stay separate.')}</p></div></section>
  </div>;
}

function ChamberDetail({id}){
  const {language,t}=useLanguage();
  const chamber=chamberById(id);
  const [levels,setLevels]=useState(initialLevels);
  useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(levels));}catch{}},[levels]);
  if(!chamber)return <div className="rdb-page rdb-detail-page"><a className="rdb-back" href="#/chambers"><ChevronLeft size={17}/>{t('Voltar às Câmaras','Back to Chambers')}</a><div className="rdb-empty"><AlertTriangle size={28}/><b>{t('Câmara não encontrada','Chamber not found')}</b></div></div>;
  const level=levels[chamber.id]||0;
  const setLevel=next=>setLevels(current=>({...current,[chamber.id]:Math.max(0,Math.min(12,next))}));
  return <div className="rdb-page rr-page rdb-detail-page cc-page">
    <a className="rdb-back" href="#/chambers"><ChevronLeft size={17}/>{t('Voltar às Câmaras','Back to Chambers')}</a>
    <section className="rdb-detail-hero rr-detail-hero"><div className="rdb-detail-icon">{chamber.icon}</div><div className="rdb-detail-copy"><div className="rdb-detail-badges"><span>{categoryLabel(chamber.category,t)}</span><span className={`rr-priority p-${chamber.priority}`}>{priorityLabel(chamber.priority,t)}</span><TrustBadge chamber={chamber} t={t}/></div><h1>{tr(chamber.name,language)}</h1><p>{tr(chamber.summary,language)}</p><div className="cc-detail-level"><span>{t('Seu nível','Your level')}</span><button onClick={()=>setLevel(level-1)}><Minus size={15}/></button><b>{level}/12</b><button onClick={()=>setLevel(level+1)}><Plus size={15}/></button></div><div className="rdb-detail-actions"><a href={sourceHref(chamber)} target="_blank" rel="noreferrer"><BookOpen size={15}/>{t('Abrir fonte','Open source')}</a></div></div></section>

    <section className="rdb-detail-grid"><article className="rdb-panel"><div className="rdb-panel-title"><Gauge/><div><h2>{t('O que melhora','What improves')}</h2><span>{t('Efeito real do upgrade','What upgrading actually changes')}</span></div></div><ul className="rdb-use-list">{chamber.effects.map((effect,index)=><li key={index}><Check size={15}/><span>{tr(effect,language)}</span></li>)}</ul></article><article className="rdb-panel"><div className="rdb-panel-title"><Target/><div><h2>{t('Marcos importantes','Important milestones')}</h2><span>{t('Desbloqueios e limites conhecidos','Known unlocks and limits')}</span></div></div><div className="rr-fact-list cc-facts">{chamber.milestones.map((fact,index)=><div key={index}><span>{index+1}</span><p>{tr(fact,language)}</p></div>)}</div></article></section>

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><Database/><div><h2>{t('Recursos envolvidos','Resources involved')}</h2><span>{t('Clique para abrir o banco de Recursos','Open the Resource database')}</span></div></div><div className="cc-resource-links">{chamber.resources.map(id=><a key={id} href={`#/resources/${id}`}><span>{id}</span><ChevronRight size={15}/></a>)}</div></section>

    {chamber.levelTable&&<section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><Warehouse/><div><h2>{t('Tabela da Resin Chamber','Resin Chamber table')}</h2><span>{t('Capacidade e tamanho da fonte por nível na página dedicada','Capacity and source amount by level in the dedicated page')}</span></div></div><div className="cc-table-wrap"><table><thead><tr><th>{t('Nível','Level')}</th><th>{t('Capacidade','Capacity')}</th><th>{t('Fonte de resina','Resin source')}</th></tr></thead><tbody>{chamber.levelTable.map(([lv,capacity,source])=><tr key={lv} className={lv===level?'current':''}><td>{lv}</td><td>{capacity.toLocaleString(language==='en'?'en-US':'pt-BR')}</td><td>{source.toLocaleString(language==='en'?'en-US':'pt-BR')}</td></tr>)}</tbody></table></div></section>}

    {chamber.conflict&&<section className="cc-conflict-panel"><AlertTriangle size={19}/><div><b>{t('Conflito mantido visível','Conflict kept visible')}</b><p>{tr(chamber.conflict,language)}</p></div></section>}

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><BookOpen/><div><h2>{t('Fontes e revisão','Sources and review')}</h2><span>{t(`Revisado em ${CHAMBER_RESEARCH_META.checkedAt.split('-').reverse().join('/')}`,`Reviewed on ${CHAMBER_RESEARCH_META.checkedAt}`)}</span></div></div><div className="rr-source-links"><a href={sourceHref(chamber)} target="_blank" rel="noreferrer"><span>{t('PocketAnts Wiki · página relacionada','PocketAnts Wiki · related page')}</span><ExternalLink size={14}/></a><a href={CHAMBER_RESEARCH_META.blackAntsUrl} target="_blank" rel="noreferrer"><span>{t('Black Ants / colônia','Black Ants / colony')}</span><ExternalLink size={14}/></a></div></section>
  </div>;
}

export default function ChamberDatabasePage({routeId=null}){return routeId?<ChamberDetail id={routeId}/>:<ChamberList/>;}
