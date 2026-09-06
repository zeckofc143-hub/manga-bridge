import React,{useEffect,useMemo,useState} from 'react';
import {
  AlertTriangle,ArrowRight,BookOpen,Check,ChevronLeft,ChevronRight,Clock,Database,
  ExternalLink,Filter,GitBranch,Info,Search,ShieldCheck,SlidersHorizontal,Sparkles,
  Target,TimerReset,Waypoints
} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {
  MECHANIC_CATEGORIES,MECHANIC_FLOW,MECHANIC_PATHS,MECHANIC_RECORDS,MECHANIC_RESEARCH_META,
  MECHANIC_TIMERS,mechanicSourceUrl
} from './mechanicResearchData';
import './resourceDatabasePage.css';
import './resourceResearchExpansion.css';
import './mechanicDatabasePage.css';

const stageRank={early:0,'early-mid':1,mid:2,'mid-late':3,late:4,all:5};
const normalize=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const tr=(value,language)=>value&&typeof value==='object'&&('pt' in value||'en' in value)?(language==='en'?value.en:value.pt):value;
const mechanicById=id=>MECHANIC_RECORDS.find(m=>m.id===id);

function readHeaderQuery(){
  const hash=window.location.hash||'';
  return new URLSearchParams(hash.split('?')[1]||'').get('dbq')||'';
}
function categoryLabel(value,t){return ({all:t('Todas','All'),creatures:t('Criaturas','Creatures'),combat:t('Combate','Combat'),farm:t('Farm / economia','Farm / economy'),coop:t('Co-op','Co-op'),garden:t('Jardim','Garden'),clan:t('Clã / late game','Clan / late game')})[value]||value;}
function stageLabel(value,t){return ({early:t('Início','Early'),'early-mid':t('Início / meio','Early / mid'),mid:t('Meio','Mid'),'mid-late':t('Meio / avançado','Mid / late'),late:t('Avançado','Late'),all:t('Todas as fases','All stages')})[value]||value;}
function kindLabel(value,t){return ({system:t('Sistema','System'),progression:t('Progressão','Progression'),battle:t('Batalha','Battle'),daily:t('Diário','Daily'),control:t('Controle','Control'),timer:t('Timer','Timer'),offline:t('Offline','Offline'),recent:t('Novo','New')})[value]||value;}
function resourceLabel(id,t){return ({leaves:t('Folhas','Leaves'),seeds:t('Sementes','Seeds'),fungus:t('Fungo','Fungus'),'body-parts':t('Partes de criatura','Creature Parts'),water:t('Água','Water'),resin:t('Resina','Resin'),honeydew:'Honeydew',gems:t('Gemas','Gems'),pheromones:t('Feromônios','Pheromones'),'battle-tokens':t('Fichas de batalha','Battle Tokens'),silk:t('Seda','Silk')})[id]||id;}
function chamberLabel(id,t){return ({creatures:t('Câmara de criaturas','Creatures Chamber'),resin:t('Câmara de resina','Resin Chamber'),'body-parts':t('Câmara de partes','Body Parts Chamber'),honeydew:t('Câmara de Honeydew','Honeydew Chamber'),queen:t('Câmara da rainha',"Queen's Chamber"),water:t('Câmara de água','Water Storage Chamber'),'food-processing':t('Câmara de processamento','Food Processing Chamber'),'leaf-storage':t('Armazém de folhas','Leaf Storage Chamber'),'seed-storage':t('Armazém de sementes','Seed Storage Chamber')})[id]||id;}
function creatureLabel(id){return ({dragonfly:'Dragonfly',scorpion:'Scorpion',hornet:'Asian Giant Hornet',crab:'Crab'})[id]||id;}

function TrustBadge({record,t}){
  if(record.source==='official') return <span className="rr-trust official"><ShieldCheck size={13}/>{t('Oficial','Official')}</span>;
  if(record.source==='recent') return <span className="rr-trust md-recent"><Sparkles size={13}/>{t('Atualização 2026','2026 update')}</span>;
  return <span className="rr-trust community"><Database size={13}/>{t('Wiki revisada','Reviewed wiki')}</span>;
}

function PathPlanner({language,t}){
  const [goal,setGoal]=useState('daily');
  const plan=MECHANIC_PATHS[goal];
  return <section className="rr-tool-panel md-path-panel">
    <div className="rr-section-title"><div><span><Waypoints size={17}/>{t('Rotas rápidas','Quick paths')}</span><h2>{t('O que você quer resolver?','What are you trying to solve?')}</h2><p>{t('Escolha um objetivo e siga só os sistemas que importam para ele.','Pick a goal and follow only the systems that matter for it.')}</p></div></div>
    <div className="md-goal-tabs" role="tablist" aria-label={t('Objetivos de mecânicas','Mechanics goals')}>{Object.entries(MECHANIC_PATHS).map(([id,item])=><button key={id} type="button" role="tab" aria-selected={goal===id} className={goal===id?'active':''} onClick={()=>setGoal(id)}>{tr(item.label,language)}</button>)}</div>
    <div className="md-path-flow">{plan.ids.map((id,index)=>{const m=mechanicById(id);if(!m)return null;return <React.Fragment key={id}><a href={`#/mechanics/${id}`}><span>{m.icon}</span><div><small>{index+1}</small><strong>{tr(m.name,language)}</strong></div></a>{index<plan.ids.length-1&&<ArrowRight className="md-path-arrow" size={17}/>}</React.Fragment>;})}</div>
  </section>;
}

function TimerPanel({language,t}){
  return <section className="rr-tool-panel md-timers"><div className="rr-section-title"><div><span><TimerReset size={17}/>{t('Relógios e limites','Timers & limits')}</span><h2>{t('Coisas fáceis de esquecer','Easy things to forget')}</h2><p>{t('Reset, respawn, limite diário e a exceção de Resin offline em um lugar só.','Reset, respawn, daily cap and the offline Resin exception in one place.')}</p></div></div><div className="md-timer-grid">{MECHANIC_TIMERS.map(item=><a key={item.id} href={`#/mechanics/${item.mechanic}`}><span className="md-timer-icon">{item.icon}</span><div><small>{tr(item.title,language)}</small><strong>{tr(item.value,language)}</strong><p>{tr(item.note,language)}</p></div><ChevronRight size={16}/></a>)}</div></section>;
}

function FlowNode({id,language,t}){
  const mechanic=mechanicById(id);
  if(mechanic)return <a href={`#/mechanics/${id}`}>{mechanic.icon} {tr(mechanic.name,language)}</a>;
  return <a href={`#/resources/${id}`}>{resourceLabel(id,t)}</a>;
}
function SystemFlow({language,t}){
  return <section className="rr-tool-panel md-flow"><div className="rr-section-title"><div><span><GitBranch size={17}/>{t('Mapa do jogo','Game map')}</span><h2>{t('Como uma mecânica vira outra coisa','How one mechanic turns into another')}</h2><p>{t('As conexões que explicam por que um sistema importa para outro.','Connections that explain why one system matters to another.')}</p></div></div><div className="rr-economy-grid md-flow-grid">{MECHANIC_FLOW.map((edge,index)=><div key={`${edge.from}-${edge.to}-${index}`}><FlowNode id={edge.from} language={language} t={t}/><span><ArrowRight size={14}/>{tr(edge.label,language)}</span><FlowNode id={edge.to} language={language} t={t}/></div>)}</div></section>;
}

function MechanicCard({record,language,t}){
  return <article className="rr-card md-card">
    <div className="rr-card-top"><span className="rr-resource-icon">{record.icon}</span><div className="rr-badges"><span>{categoryLabel(record.category,t)}</span><span>{kindLabel(record.kind,t)}</span></div></div>
    <div className="rr-card-title"><div><h2>{tr(record.name,language)}</h2><small>{stageLabel(record.stage,t)}</small></div><TrustBadge record={record} t={t}/></div>
    <p>{tr(record.summary,language)}</p>
    <div className="rr-facts-grid md-facts"><div><span>{t('Pontos-chave','Key facts')}</span><b>{record.facts.length}</b></div><div><span>{t('Passos','Steps')}</span><b>{record.steps.length}</b></div><div><span>{t('Erros comuns','Common mistakes')}</span><b>{record.mistakes.length}</b></div><div><span>{t('Conexões','Connections')}</span><b>{Object.values(record.related).reduce((n,list)=>n+list.length,0)}</b></div></div>
    {record.facts[0]&&<div className="rr-use-preview"><Info size={15}/><span>{tr(record.facts[0],language)}</span></div>}
    <div className="rr-card-actions"><a className="rr-primary" href={`#/mechanics/${record.id}`}>{t('Entender mecânica','Open mechanic')} <ChevronRight size={16}/></a><a href={mechanicSourceUrl(record)} target="_blank" rel="noreferrer"><BookOpen size={15}/>{t('Fonte','Source')}</a></div>
  </article>;
}

function MechanicList(){
  const {language,t}=useLanguage();
  const [query,setQuery]=useState(readHeaderQuery);
  const [category,setCategory]=useState('all');
  const [stage,setStage]=useState('all');
  const [sort,setSort]=useState('stage');
  useEffect(()=>{const sync=()=>setQuery(readHeaderQuery());window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);
  const filtered=useMemo(()=>{
    const q=normalize(query.trim());
    const list=MECHANIC_RECORDS.filter(record=>{
      const haystack=normalize([tr(record.name,language),tr(record.summary,language),categoryLabel(record.category,t),stageLabel(record.stage,t),kindLabel(record.kind,t),...(record.facts||[]).map(x=>tr(x,language)),...(record.steps||[]).map(x=>tr(x,language)),...(record.mistakes||[]).map(x=>tr(x,language)),...record.related.resources,...record.related.chambers,...record.related.creatures].join(' '));
      return(!q||haystack.includes(q))&&(category==='all'||record.category===category)&&(stage==='all'||record.stage===stage);
    });
    return [...list].sort((a,b)=>sort==='name'?tr(a.name,language).localeCompare(tr(b.name,language),language==='en'?'en':'pt-BR'):sort==='category'?a.category.localeCompare(b.category):(stageRank[a.stage]??9)-(stageRank[b.stage]??9));
  },[query,category,stage,sort,language,t]);
  const recent=MECHANIC_RECORDS.filter(m=>m.source==='recent').length;
  const timed=MECHANIC_RECORDS.filter(m=>['daily','timer','offline'].includes(m.kind)).length;
  const connected=MECHANIC_RECORDS.filter(m=>Object.values(m.related).some(list=>list.length)).length;
  return <div className="rdb-page rr-page md-page">
    <section className="rdb-identity md-identity"><div className="rdb-title-row"><span className="rdb-db-icon"><Waypoints size={22}/></span><div><span className="rdb-kicker">{t('Mecânicas · como o jogo funciona','Mechanics · how the game works')}</span><h1>{t('Central de Mecânicas','Mechanics Hub')}</h1></div></div><p>{t('Combate, criaturas, farm, timers, co-op, Garden e late game organizados como sistemas conectados — com explicação curta primeiro e detalhe quando você quiser.','Combat, creatures, farming, timers, co-op, Garden and late game organized as connected systems — short explanation first, details when you want them.')}</p><div className="rdb-principles"><span><Target size={15}/>{t('Objetivo primeiro','Goal first')}</span><span><Clock size={15}/>{t('Timers visíveis','Visible timers')}</span><span><GitBranch size={15}/>{t('Conexões reais','Real connections')}</span><span><ShieldCheck size={15}/>{t('Fonte separada','Sources separated')}</span></div></section>

    <section className="rr-update-banner"><Sparkles size={20}/><div><strong>{t(`Base v${MECHANIC_RESEARCH_META.version} · revisada em ${MECHANIC_RESEARCH_META.checkedAt.split('-').reverse().join('/')}`,`Database v${MECHANIC_RESEARCH_META.version} · reviewed on ${MECHANIC_RESEARCH_META.checkedAt}`)}</strong><p>{t('Fatos oficiais, dados comunitários e mecânicas recentes ficam rotulados separadamente.','Official facts, community data and recent mechanics are labeled separately.')}</p></div><a href={MECHANIC_RESEARCH_META.officialUrl} target="_blank" rel="noreferrer">{t('Jogo oficial','Official game')} <ExternalLink size={14}/></a></section>

    <section className="rdb-hero"><div className="rdb-summary-grid"><div><strong>{MECHANIC_RECORDS.length}</strong><span>{t('mecânicas catalogadas','mechanics catalogued')}</span></div><div><strong>{MECHANIC_CATEGORIES.length-1}</strong><span>{t('grupos de sistemas','system groups')}</span></div><div><strong>{timed}</strong><span>{t('com timer/reset/offline','with timer/reset/offline')}</span></div><div><strong>{recent}</strong><span>{t('sistemas recentes de 2026','recent 2026 systems')}</span></div></div></section>

    <PathPlanner language={language} t={t}/>
    <TimerPanel language={language} t={t}/>
    <SystemFlow language={language} t={t}/>

    <nav className="rdb-tabs" aria-label={t('Categorias de mecânicas','Mechanic categories')}>{MECHANIC_CATEGORIES.map(value=><button key={value} type="button" className={category===value?'active':''} aria-pressed={category===value} onClick={()=>setCategory(value)}>{categoryLabel(value,t)}</button>)}</nav>
    <div className="rdb-filter-row"><label className="rdb-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar PvP, Resin, fusão, co-op…','Search PvP, Resin, fusion, co-op…')}/></label><details className="rdb-filters"><summary><SlidersHorizontal size={17}/>{t('Filtros','Filters')} <span>{filtered.length}</span></summary><div><label><span>{t('Fase','Stage')}</span><select value={stage} onChange={e=>setStage(e.target.value)}><option value="all">{t('Todas','All')}</option><option value="early-mid">{t('Início / meio','Early / mid')}</option><option value="mid">{t('Meio','Mid')}</option><option value="mid-late">{t('Meio / avançado','Mid / late')}</option><option value="late">{t('Avançado','Late')}</option><option value="all">{t('Todas as fases','All stages')}</option></select></label><label><span>{t('Ordenar','Sort')}</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="stage">{t('Fase do jogo','Game stage')}</option><option value="category">{t('Categoria','Category')}</option><option value="name">A–Z</option></select></label></div></details></div>
    <div className="rdb-result-line"><b>{filtered.length}</b> {t('resultados','results')} · <span>{connected} {t('mecânicas ligadas a outros bancos','mechanics linked to other databases')}</span></div>
    {filtered.length?<section className="rr-grid md-grid">{filtered.map(record=><MechanicCard key={record.id} record={record} language={language} t={t}/>)}</section>:<div className="rdb-empty"><Search size={28}/><b>{t('Nada encontrado','Nothing found')}</b><span>{t('Mude os filtros ou tente outro termo.','Change filters or try another term.')}</span></div>}

    <section className="rr-source-note"><ShieldCheck size={18}/><div><b>{t('Mecânica, recompensa e estratégia não são a mesma coisa','Mechanic, reward and strategy are not the same thing')}</b><p>{t('A página separa regra do jogo, valor/recompensa documentado e recomendação de uso. Quando algo é comunitário, continua identificado como comunitário.','The page separates game rules, documented reward values and usage recommendations. Community-sourced claims remain identified as community-sourced.')}</p></div></section>
  </div>;
}

function LinkGroup({title,items,type,language,t}){
  if(!items?.length)return null;
  return <div className="md-link-group"><span>{title}</span><div>{items.map(id=>{const href=type==='resources'?`#/resources/${id}`:type==='chambers'?`#/chambers/${id}`:`#/creatures/${id}`;const label=type==='resources'?resourceLabel(id,t):type==='chambers'?chamberLabel(id,t):creatureLabel(id);return <a key={id} href={href}>{label}<ChevronRight size={14}/></a>;})}</div></div>;
}

function MechanicDetail({id}){
  const {language,t}=useLanguage();
  const record=mechanicById(id);
  if(!record)return <div className="rdb-page rdb-detail-page md-page"><a className="rdb-back" href="#/mechanics"><ChevronLeft size={17}/>{t('Voltar às Mecânicas','Back to Mechanics')}</a><div className="rdb-empty"><AlertTriangle size={28}/><b>{t('Mecânica não encontrada','Mechanic not found')}</b></div></div>;
  const sourceUrl=mechanicSourceUrl(record);
  return <div className="rdb-page rr-page rdb-detail-page md-page">
    <a className="rdb-back" href="#/mechanics"><ChevronLeft size={17}/>{t('Voltar às Mecânicas','Back to Mechanics')}</a>
    <section className="rdb-detail-hero rr-detail-hero md-detail-hero"><div className="rdb-detail-icon">{record.icon}</div><div className="rdb-detail-copy"><div className="rdb-detail-badges"><span>{categoryLabel(record.category,t)}</span><span>{stageLabel(record.stage,t)}</span><TrustBadge record={record} t={t}/></div><h1>{tr(record.name,language)}</h1><p>{tr(record.summary,language)}</p><div className="rdb-detail-actions"><a href={sourceUrl} target="_blank" rel="noreferrer"><BookOpen size={15}/>{t('Abrir fonte','Open source')}</a></div></div></section>

    <section className="rdb-detail-grid"><article className="rdb-panel"><div className="rdb-panel-title"><Info/><div><h2>{t('Como funciona','How it works')}</h2><span>{t('Regras e fatos importantes','Important rules and facts')}</span></div></div><ul className="rdb-use-list">{record.facts.map((fact,index)=><li key={index}><Check size={15}/><span>{tr(fact,language)}</span></li>)}</ul></article><article className="rdb-panel"><div className="rdb-panel-title"><Target/><div><h2>{t('Jeito simples de usar','Simple way to use it')}</h2><span>{t('Passo a passo sem enrolação','Straightforward steps')}</span></div></div><div className="rr-fact-list md-step-list">{record.steps.map((step,index)=><div key={index}><span>{index+1}</span><p>{tr(step,language)}</p></div>)}</div></article></section>

    <section className="rdb-panel rdb-wide md-warning-panel"><div className="rdb-panel-title"><AlertTriangle/><div><h2>{t('Erro comum','Common mistake')}</h2><span>{t('O que costuma fazer jogador perder recurso/tempo','What often wastes player resources/time')}</span></div></div><ul className="rdb-use-list">{record.mistakes.map((mistake,index)=><li key={index}><AlertTriangle size={15}/><span>{tr(mistake,language)}</span></li>)}</ul></section>

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><GitBranch/><div><h2>{t('Conectado a','Connected to')}</h2><span>{t('Abra diretamente Recursos, Câmaras ou Criaturas relacionadas','Open related Resources, Chambers or Creatures directly')}</span></div></div><div className="md-related-grid"><LinkGroup title={t('Recursos','Resources')} items={record.related.resources} type="resources" language={language} t={t}/><LinkGroup title={t('Câmaras','Chambers')} items={record.related.chambers} type="chambers" language={language} t={t}/><LinkGroup title={t('Criaturas','Creatures')} items={record.related.creatures} type="creatures" language={language} t={t}/></div></section>

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><BookOpen/><div><h2>{t('Fonte e revisão','Source & review')}</h2><span>{t(`Revisado em ${MECHANIC_RESEARCH_META.checkedAt.split('-').reverse().join('/')}`,`Reviewed on ${MECHANIC_RESEARCH_META.checkedAt}`)}</span></div></div><div className="rr-source-links"><a href={sourceUrl} target="_blank" rel="noreferrer"><span>{record.source==='official'||record.source==='recent'?t('Google Play / atualização oficial','Google Play / official update'):t('PocketAnts Wiki · busca direcionada','PocketAnts Wiki · targeted search')}</span><ExternalLink size={14}/></a><a href={MECHANIC_RESEARCH_META.wikiUrl} target="_blank" rel="noreferrer"><span>PocketAnts Wiki</span><ExternalLink size={14}/></a></div></section>
  </div>;
}

export default function MechanicDatabasePage({routeId=null}){return routeId?<MechanicDetail id={routeId}/>:<MechanicList/>;}
