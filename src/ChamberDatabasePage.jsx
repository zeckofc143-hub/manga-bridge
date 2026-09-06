import React,{useEffect,useMemo,useState} from 'react';
import {
  AlertTriangle,ArrowRight,BookOpen,Check,ChevronLeft,ChevronRight,Database,ExternalLink,
  Gauge,GitBranch,Minus,Plus,RotateCcw,Search,ShieldCheck,SlidersHorizontal,Sparkles,
  Target,Warehouse
} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {CHAMBER_RECORDS,CHAMBER_RESEARCH_META} from './chamberResearchData';
import {
  CHAMBER_GOAL_STEPS,CHAMBER_LEVEL_TABLES,CHAMBER_MIN_LEVELS,CHAMBER_SOURCE_URLS,
  CHAMBER_TYPED_RELATIONS,WATER_SEED_UNLOCKS,nextMilestoneFor,recommendationFor
} from './chamberAdvancedData';
import './resourceDatabasePage.css';
import './resourceResearchExpansion.css';
import './chamberDatabasePage.css';
import './chamberAdvanced.css';

const STORAGE_KEY='pa-chamber-levels-v1';
const priorityRank={critical:0,high:1,medium:2,situational:3};
const stageRank={early:0,'early-mid':1,mid:2,'mid-late':3,late:4,all:5};
const categoryOrder=['core','economy','creatures','advanced','garden'];
const normalize=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const tr=(value,language)=>value&&typeof value==='object'&&('pt' in value||'en' in value)?(language==='en'?value.en:value.pt):value;
const chamberById=id=>CHAMBER_RECORDS.find(c=>c.id===id);
const minLevel=id=>CHAMBER_MIN_LEVELS[id]||0;

function readHeaderQuery(){
  const hash=window.location.hash||'';
  return new URLSearchParams(hash.split('?')[1]||'').get('dbq')||'';
}
function clampLevel(id,value){return Math.max(minLevel(id),Math.min(12,Number(value)||0));}
function initialLevels(){
  try{
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
    return Object.fromEntries(CHAMBER_RECORDS.map(c=>[c.id,clampLevel(c.id,parsed[c.id]??minLevel(c.id))]));
  }catch{
    return Object.fromEntries(CHAMBER_RECORDS.map(c=>[c.id,minLevel(c.id)]));
  }
}
function categoryLabel(value,t){return ({core:t('Núcleo','Core'),economy:t('Economia','Economy'),creatures:t('Criaturas','Creatures'),advanced:t('Avançadas','Advanced'),garden:t('Jardim','Garden')})[value]||value;}
function priorityLabel(value,t){return ({critical:t('Crítica','Critical'),high:t('Alta','High'),medium:t('Média','Medium'),situational:t('Situacional','Situational')})[value]||value;}
function stageLabel(value,t){return ({early:t('Início','Early'),'early-mid':t('Início / meio','Early / mid'),mid:t('Meio','Mid'),'mid-late':t('Meio / avançado','Mid / late'),late:t('Avançado','Late'),all:t('Todas as fases','All stages')})[value]||value;}
function sourceHref(chamber){return CHAMBER_SOURCE_URLS[chamber.id]||CHAMBER_RESEARCH_META.colonyUrl;}
function resourceLabel(id,t){return ({leaves:t('Folhas','Leaves'),fungus:t('Fungo','Fungus'),seeds:t('Sementes','Seeds'),'body-parts':t('Partes de criatura','Creature parts'),honeydew:'Honeydew',resin:t('Resina','Resin'),water:t('Água','Water')})[id]||id;}
function relationTypeLabel(type,t){return ({requirement:t('Requisito','Requirement'),capacity:t('Capacidade','Capacity'),unlock:t('Desbloqueio','Unlock'),feeds:t('Alimenta','Feeds'),synergy:t('Sinergia','Synergy'),currency:t('Custo','Cost')})[type]||type;}

function TrustBadge({chamber,t}){
  if(chamber.source==='conflict') return <span className="rr-trust cc-conflict"><AlertTriangle size={13}/>{t('Conflito de fonte','Source conflict')}</span>;
  return <span className="rr-trust community"><ShieldCheck size={13}/>{t('Wiki revisada','Reviewed wiki')}</span>;
}

function NextMilestone({chamber,level,language,t,compact=false}){
  const milestone=nextMilestoneFor(chamber.id,level);
  if(!milestone)return <div className="cc-next"><Check size={17}/><div><small>{t('Progresso','Progress')}</small><strong>{t('Câmara no último marco catalogado.','Chamber at the last catalogued milestone.')}</strong></div></div>;
  return <div className="cc-next"><Target size={17}/><div><small>{t('Próximo marco','Next milestone')}</small><strong>{tr(milestone.label,language)}</strong>{!compact&&<span className="cc-target">Lv. {level} → {milestone.level}</span>}</div></div>;
}

function ChamberCard({chamber,level,language,t}){
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
    <NextMilestone chamber={chamber} level={level} language={language} t={t} compact/>
    <div className="rr-card-actions"><a className="rr-primary" href={`#/chambers/${chamber.id}`}>{t('Abrir ficha','Open profile')} <ChevronRight size={16}/></a><a href={sourceHref(chamber)} target="_blank" rel="noreferrer"><BookOpen size={15}/>{t('Fonte','Source')}</a></div>
  </article>;
}

function LevelTracker({levels,setLevels,language,t}){
  const total=Object.values(levels).reduce((a,b)=>a+b,0);
  const max=CHAMBER_RECORDS.length*12;
  const change=(id,delta)=>setLevels(current=>({...current,[id]:clampLevel(id,(current[id]??minLevel(id))+delta)}));
  const reset=()=>setLevels(Object.fromEntries(CHAMBER_RECORDS.map(c=>[c.id,minLevel(c.id)])));
  return <section className="rr-tool-panel cc-tracker">
    <div className="rr-section-title"><div><span><Gauge size={17}/>{t('Painel da colônia','Colony dashboard')}</span><h2>{t('Níveis das suas câmaras','Your chamber levels')}</h2><p>{t('Fica salvo neste aparelho. A Queen começa no nível 1 e não pode ser marcada abaixo disso.','Saved on this device. The Queen starts at level 1 and cannot be set below it.')}</p></div><button onClick={reset} type="button"><RotateCcw size={15}/>{t('Resetar','Reset')}</button></div>
    <div className="cc-progress"><div><span>{total}/{max}</span><b>{Math.round(total/max*100)}%</b></div><i style={{width:`${total/max*100}%`}}/></div>
    <div className="cc-level-grid">{CHAMBER_RECORDS.map(chamber=>{const level=levels[chamber.id]??minLevel(chamber.id);return <div key={chamber.id} className={level===12?'maxed':''}><span className="cc-mini-icon">{chamber.icon}</span><div><strong>{tr(chamber.name,language)}</strong><small>{level===0?t('Não construída','Not built'):level===12?t('MAX','MAX'):`Lv. ${level}`}</small></div><div className="rr-counter"><button disabled={level<=minLevel(chamber.id)} onClick={()=>change(chamber.id,-1)} aria-label={t('Diminuir nível','Decrease level')}><Minus size={15}/></button><b>{level}</b><button disabled={level>=12} onClick={()=>change(chamber.id,1)} aria-label={t('Aumentar nível','Increase level')}><Plus size={15}/></button></div></div>})}</div>
  </section>;
}

function UpgradeAdvisor({levels,language,t}){
  const [goal,setGoal]=useState('economy');
  const rec=recommendationFor(goal,levels);
  const recommendation=chamberById(rec.id);
  return <section className="rr-tool-panel cc-advisor">
    <div className="rr-section-title"><div><span><Target size={17}/>{t('Recomendador por marcos','Milestone advisor')}</span><h2>{t('Qual câmara subir agora?','Which chamber should I upgrade now?')}</h2><p>{t('Agora ele mira o próximo marco útil em vez de mandar uma única câmara direto ao 12. A estratégia continua marcada como orientação, não como regra do jogo.','It now targets the next useful milestone instead of sending one chamber straight to 12. Strategy remains guidance, not a game rule.')}</p></div></div>
    <label className="rr-goal-select"><span>{t('Objetivo','Goal')}</span><select value={goal} onChange={e=>setGoal(e.target.value)}>{Object.entries(CHAMBER_GOAL_STEPS).map(([id,item])=><option key={id} value={id}>{tr(item.label,language)}</option>)}</select></label>
    <div className="cc-recommend"><span>{recommendation.icon}</span><div><small>{t('Próxima prioridade','Next priority')}</small><h3>{tr(recommendation.name,language)} · Lv. {levels[recommendation.id]??minLevel(recommendation.id)} → {rec.target}</h3><p>{tr(rec.reason,language)}</p></div><a href={`#/chambers/${recommendation.id}`}>{t('Ver ficha','View profile')} <ChevronRight size={15}/></a></div>
    <div className="cc-order">{rec.plan.steps.map(([id,target])=>{const c=chamberById(id);const current=levels[id]??minLevel(id);return <div key={`${id}-${target}`} className={current>=target?'maxed':''}><span>{current>=target?<Check size={13}/>:target}</span><a href={`#/chambers/${id}`}>{c.icon} {tr(c.name,language)}</a><b>{current}/{target}</b></div>})}</div>
  </section>;
}

function HardLocks({levels,t}){
  const bp=levels['body-parts']||0,resin=levels.resin||0,creatures=levels.creatures||0,water=levels.water||0;
  const cards=[
    {done:bp>=12,title:t('Body Parts 12 → Resin 11/12','Body Parts 12 → Resin 11/12'),text:t('É um requisito real para passar Resin Chamber do nível 10.','This is a real requirement for taking Resin Chamber beyond level 10.')},
    {done:creatures>=4,title:t('Creatures 4 → fusão base máxima','Creatures 4 → max base fusion'),text:t('Depois do nível 4, a chance base não sobe mais; os níveis seguintes avançam o Creature Lab.','After level 4, base fusion chance stops increasing; later levels advance Creature Lab.')},
    {done:water>=10,title:t('Water 10 → sementes raras','Water 10 → rare seeds'),text:t('Níveis 1, 6 e 10 são os grandes marcos de raridade do Garden.','Levels 1, 6 and 10 are the major Garden rarity milestones.')}
  ];
  return <section className="rr-tool-panel"><div className="rr-section-title"><div><span><AlertTriangle size={17}/>{t('Bloqueios e marcos reais','Real gates and milestones')}</span><h2>{t('O que realmente muda a progressão','What actually changes progression')}</h2></div></div><div className="cc-hard-grid">{cards.map((card,index)=><div key={index} className={`cc-hard-card ${card.done?'done':''}`}><span>{card.done?t('Concluído','Done'):t('Pendente','Pending')}</span><b>{card.title}</b><p>{card.text}</p></div>)}</div></section>;
}

function DependencyMap({language,t}){
  const special={'aphid-farm':t('🐞 Aphid Farm','🐞 Aphid Farm'),'termite-nest':t('🐜 Termite Nest','🐜 Termite Nest'),garden:t('🌸 Garden','🌸 Garden')};
  const nodeLabel=id=>{const c=chamberById(id);return c?`${c.icon} ${tr(c.name,language)}`:(special[id]||id);};
  const Node=({id})=>chamberById(id)?<a href={`#/chambers/${id}`}>{nodeLabel(id)}</a>:<span className="cc-node">{nodeLabel(id)}</span>;
  return <section className="rr-tool-panel cc-deps"><div className="rr-section-title"><div><span><GitBranch size={17}/>{t('Relações tipadas','Typed relationships')}</span><h2>{t('Requisito não é a mesma coisa que sinergia','A requirement is not the same as synergy')}</h2><p>{t('Agora o mapa separa requisito, capacidade, desbloqueio, custo e sinergia para não criar dependências falsas.','The map now separates requirements, capacity, unlocks, costs and synergies so it does not invent false dependencies.')}</p></div></div><div className="rr-economy-grid">{CHAMBER_TYPED_RELATIONS.map((path,index)=><div key={`${path.from}-${path.to}-${index}`}><Node id={path.from}/><span><ArrowRight size={14}/><em className="cc-relation-type">{relationTypeLabel(path.type,t)}</em>{tr(path.label,language)}</span><Node id={path.to}/></div>)}</div></section>;
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
      const milestoneText=(c.id in CHAMBER_LEVEL_TABLES?' level table ':'')+(nextMilestoneFor(c.id,levels[c.id]||0)?.label?.[language]||'');
      const haystack=normalize([tr(c.name,language),tr(c.summary,language),categoryLabel(c.category,t),priorityLabel(c.priority,t),stageLabel(c.stage,t),...(c.effects||[]).map(x=>tr(x,language)),...(c.milestones||[]).map(x=>tr(x,language)),...(c.resources||[]),...(c.unlocks||[]),milestoneText].join(' '));
      return (!q||haystack.includes(q))&&(category==='all'||c.category===category)&&(priority==='all'||c.priority===priority);
    });
    return [...list].sort((a,b)=>sort==='name'?tr(a.name,language).localeCompare(tr(b.name,language),language==='en'?'en':'pt-BR'):sort==='stage'?(stageRank[a.stage]??9)-(stageRank[b.stage]??9):(priorityRank[a.priority]??9)-(priorityRank[b.priority]??9));
  },[query,category,priority,sort,language,t,levels]);

  const built=CHAMBER_RECORDS.filter(c=>(levels[c.id]??minLevel(c.id))>0).length;
  const maxed=CHAMBER_RECORDS.filter(c=>(levels[c.id]??minLevel(c.id))===12).length;
  const conflicts=CHAMBER_RECORDS.filter(c=>c.source==='conflict').length;
  return <div className="rdb-page rr-page cc-page">
    <section className="rdb-identity cc-identity"><div className="rdb-title-row"><span className="rdb-db-icon"><Warehouse size={22}/></span><div><span className="rdb-kicker">{t('Câmaras · progressão da colônia','Chambers · colony progression')}</span><h1>{t('Central de Câmaras','Chamber Hub')}</h1></div></div><p>{t('Banco de dados e painel de progressão com níveis salvos, marcos, bloqueios reais e recomendações simples de entender.','A database and progression dashboard with saved levels, milestones, real gates and easy-to-understand recommendations.')}</p><div className="rdb-principles"><span><Gauge size={15}/>{t('Níveis 0–12','Levels 0–12')}</span><span><Target size={15}/>{t('Marcos úteis','Useful milestones')}</span><span><GitBranch size={15}/>{t('Relações claras','Clear relationships')}</span><span><ShieldCheck size={15}/>{t('Fontes individuais','Individual sources')}</span></div></section>

    <section className="rr-update-banner"><Sparkles size={20}/><div><strong>{t(`Base revisada em ${CHAMBER_RESEARCH_META.checkedAt.split('-').reverse().join('/')}`,`Database reviewed on ${CHAMBER_RESEARCH_META.checkedAt}`)}</strong><p>{t('Tabelas completas só aparecem onde a fonte atual está completa. Onde há lacunas, mostramos marcos confirmados em vez de inventar custos.','Full tables only appear where the current source is complete. Where data is missing, confirmed milestones are shown instead of invented costs.')}</p></div><a href={CHAMBER_RESEARCH_META.colonyUrl} target="_blank" rel="noreferrer">{t('Fonte geral','General source')} <ExternalLink size={14}/></a></section>

    <section className="rdb-hero"><div className="rdb-summary-grid"><div><strong>{CHAMBER_RECORDS.length}</strong><span>{t('câmaras catalogadas','chambers catalogued')}</span></div><div><strong>{built}</strong><span>{t('marcadas como construídas','marked as built')}</span></div><div><strong>{maxed}</strong><span>{t('no nível máximo','at max level')}</span></div><div><strong>{Object.keys(CHAMBER_LEVEL_TABLES).length}</strong><span>{t('tabelas Lv.1–12 verificadas','verified Lv.1–12 tables')}</span></div></div></section>

    <LevelTracker levels={levels} setLevels={setLevels} language={language} t={t}/>
    <UpgradeAdvisor levels={levels} language={language} t={t}/>
    <HardLocks levels={levels} t={t}/>

    <nav className="rdb-tabs" aria-label={t('Categorias de câmaras','Chamber categories')}><button className={category==='all'?'active':''} onClick={()=>setCategory('all')}>{t('Todas','All')}</button>{categoryOrder.map(value=><button key={value} className={category===value?'active':''} onClick={()=>setCategory(value)}>{categoryLabel(value,t)}</button>)}</nav>
    <div className="rdb-filter-row"><label className="rdb-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar câmara, recurso, desbloqueio…','Search chamber, resource, unlock…')}/></label><details className="rdb-filters"><summary><SlidersHorizontal size={17}/>{t('Filtros','Filters')} <span>{filtered.length}</span></summary><div><label><span>{t('Prioridade','Priority')}</span><select value={priority} onChange={e=>setPriority(e.target.value)}><option value="all">{t('Todas','All')}</option><option value="critical">{t('Crítica','Critical')}</option><option value="high">{t('Alta','High')}</option><option value="medium">{t('Média','Medium')}</option><option value="situational">{t('Situacional','Situational')}</option></select></label><label><span>{t('Ordenar','Sort')}</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="priority">{t('Prioridade','Priority')}</option><option value="stage">{t('Fase do jogo','Game stage')}</option><option value="name">A–Z</option></select></label></div></details></div>
    <div className="rdb-result-line"><b>{filtered.length}</b> {t('resultados','results')}</div>
    {filtered.length?<section className="rr-grid cc-grid">{filtered.map(c=><ChamberCard key={c.id} chamber={c} level={levels[c.id]??minLevel(c.id)} language={language} t={t}/>)}</section>:<div className="rdb-empty"><Search size={28}/><b>{t('Nada encontrado','Nothing found')}</b><span>{t('Mude os filtros ou tente outro termo.','Change filters or try another term.')}</span></div>}
    <DependencyMap language={language} t={t}/>
    <section className="rr-source-note"><ShieldCheck size={18}/><div><b>{t('Estratégia não vira fato','Strategy does not become fact')}</b><p>{t('Prioridade de upgrade é orientação do planejador; requisitos, capacidades, desbloqueios e tabelas verificadas ficam separados.','Upgrade priority is planner guidance; verified requirements, capacities, unlocks and tables stay separate.')}</p></div></section>
  </div>;
}

function LevelTable({chamber,level,language,t}){
  const table=CHAMBER_LEVEL_TABLES[chamber.id];
  if(!table)return null;
  return <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><Warehouse/><div><h2>{t('Tabela por nível','Level-by-level table')}</h2><span>{t('Dados completos disponíveis para esta câmara','Complete data available for this chamber')}</span></div></div><div className="cc-table-wrap"><table><thead><tr>{table.columns.map((col,index)=><th key={index}>{tr(col,language)}</th>)}</tr></thead><tbody>{table.rows.map((row,index)=><tr key={index} className={row[0]===level?'current':''}>{row.map((cell,cellIndex)=><td key={cellIndex}>{tr(cell,language)}</td>)}</tr>)}</tbody></table></div><p className="cc-table-note">{t('A linha do seu nível atual fica destacada. Valores só entram aqui quando a tabela da fonte está completa o bastante para não preencher buracos no chute.','Your current level row is highlighted. Values only appear here when the source table is complete enough to avoid filling gaps by guessing.')}</p></section>;
}

function SpecialDetailPanel({chamber,level,levels,language,t}){
  if(chamber.id==='water')return <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><Sparkles/><div><h2>{t('Sementes desbloqueadas','Unlocked seeds')}</h2><span>{t('Marcos do Garden nos níveis 1, 6 e 10','Garden milestones at levels 1, 6 and 10')}</span></div></div><div className="cc-water-groups">{Object.entries(WATER_SEED_UNLOCKS).map(([required,names])=><div key={required} className={`cc-water-group ${level>=Number(required)?'unlocked':''}`}><h3>Lv. {required} · {level>=Number(required)?t('desbloqueado','unlocked'):t('bloqueado','locked')}</h3><div>{names.map(name=><span key={name}>{name}</span>)}</div></div>)}</div></section>;
  if(chamber.id==='body-parts'){
    const row=CHAMBER_LEVEL_TABLES['body-parts'].rows.find(item=>item[0]===level);const cap=row?Number(String(row[4]).replace(/\./g,'')):0;
    return <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><Target/><div><h2>{t('Estimativa do Vinegaroon','Vinegaroon estimate')}</h2><span>{t('A recompensa fica perto de 4% da capacidade da câmara','Reward is around 4% of chamber capacity')}</span></div></div>{level<6?<div className="cc-estimator"><strong>Lv. 6</strong><div><b>{t('Ainda bloqueado','Still locked')}</b><p>{t('Vinegaroon só começa a aparecer com Body Parts Chamber nível 6 ou maior.','Vinegaroon only starts appearing with Body Parts Chamber level 6 or higher.')}</p></div></div>:<div className="cc-estimator"><strong>{Math.floor(cap*.036)}–{Math.ceil(cap*.044)}</strong><div><b>{t('partes estimadas por derrota','estimated parts per defeat')}</b><p>{t('Faixa calculada a partir dos 3,6%–4,4% documentados para a recompensa.','Range calculated from the documented 3.6%–4.4% reward range.')}</p></div></div>}</section>;
  }
  if(chamber.id==='creatures')return <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><Database/><div><h2>{t('Fase desta câmara','This chamber phase')}</h2></div></div><div className="cc-phase"><b>{level===0?t('Não construída','Not built'):level<=4?t('Fase de fusão','Fusion phase'):t('Fase de Creature Lab','Creature Lab phase')}</b><p>{level===0?t('Construir libera captura de criaturas.','Building unlocks creature capture.'):level<=4?t('Até o nível 4, cada upgrade aumenta a chance base de fusão.','Through level 4, each upgrade raises base fusion chance.'):t('Do nível 5 em diante, a chance base de fusão permanece igual e o ganho é o nível permitido do Creature Lab.','From level 5 onward, base fusion chance stays the same and the gain is the allowed Creature Lab level.')}</p></div></section>;
  if(chamber.id==='resin')return <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><AlertTriangle/><div><h2>{t('Gate do Resin tardio','Late Resin gate')}</h2></div></div><div className={`cc-hard-card ${(levels['body-parts']||0)>=12?'done':''}`}><span>{(levels['body-parts']||0)>=12?t('Requisito cumprido','Requirement met'):t('Requisito pendente','Requirement pending')}</span><b>Body Parts Chamber Lv. {levels['body-parts']||0}/12</b><p>{t('Para passar Resin Chamber do nível 10, Body Parts Chamber precisa estar no 12. A tabela dedicada registra 99.999 no Lv.12, enquanto textos-resumo antigos divergem.','To take Resin Chamber beyond level 10, Body Parts Chamber must be level 12. The dedicated table records 99,999 at Lv.12 while older summary text disagrees.')}</p></div></section>;
  return null;
}

function ChamberDetail({id}){
  const {language,t}=useLanguage();
  const chamber=chamberById(id);
  const [levels,setLevels]=useState(initialLevels);
  useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(levels));}catch{}},[levels]);
  if(!chamber)return <div className="rdb-page rdb-detail-page"><a className="rdb-back" href="#/chambers"><ChevronLeft size={17}/>{t('Voltar às Câmaras','Back to Chambers')}</a><div className="rdb-empty"><AlertTriangle size={28}/><b>{t('Câmara não encontrada','Chamber not found')}</b></div></div>;
  const level=levels[chamber.id]??minLevel(chamber.id);
  const setLevel=next=>setLevels(current=>({...current,[chamber.id]:clampLevel(chamber.id,next)}));
  return <div className="rdb-page rr-page rdb-detail-page cc-page">
    <a className="rdb-back" href="#/chambers"><ChevronLeft size={17}/>{t('Voltar às Câmaras','Back to Chambers')}</a>
    <section className="rdb-detail-hero rr-detail-hero"><div className="rdb-detail-icon">{chamber.icon}</div><div className="rdb-detail-copy"><div className="rdb-detail-badges"><span>{categoryLabel(chamber.category,t)}</span><span className={`rr-priority p-${chamber.priority}`}>{priorityLabel(chamber.priority,t)}</span><TrustBadge chamber={chamber} t={t}/></div><h1>{tr(chamber.name,language)}</h1><p>{tr(chamber.summary,language)}</p><div className="cc-detail-level"><span>{t('Seu nível','Your level')}</span><button disabled={level<=minLevel(chamber.id)} onClick={()=>setLevel(level-1)}><Minus size={15}/></button><b>{level}/12</b><button disabled={level>=12} onClick={()=>setLevel(level+1)}><Plus size={15}/></button></div><div className="rdb-detail-actions"><a href={sourceHref(chamber)} target="_blank" rel="noreferrer"><BookOpen size={15}/>{t('Abrir fonte da câmara','Open chamber source')}</a></div></div></section>

    <NextMilestone chamber={chamber} level={level} language={language} t={t}/>
    <section className="rdb-detail-grid"><article className="rdb-panel"><div className="rdb-panel-title"><Gauge/><div><h2>{t('O que melhora','What improves')}</h2><span>{t('Efeito real do upgrade','What upgrading actually changes')}</span></div></div><ul className="rdb-use-list">{chamber.effects.map((effect,index)=><li key={index}><Check size={15}/><span>{tr(effect,language)}</span></li>)}</ul></article><article className="rdb-panel"><div className="rdb-panel-title"><Target/><div><h2>{t('Marcos importantes','Important milestones')}</h2><span>{t('Desbloqueios e limites conhecidos','Known unlocks and limits')}</span></div></div><div className="rr-fact-list cc-facts">{chamber.milestones.map((fact,index)=><div key={index}><span>{index+1}</span><p>{tr(fact,language)}</p></div>)}</div></article></section>

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><Database/><div><h2>{t('Recursos relacionados','Related resources')}</h2><span>{t('Clique para abrir o banco de Recursos','Open the Resource database')}</span></div></div><div className="cc-resource-links">{chamber.resources.map(resource=><a key={resource} href={`#/resources/${resource}`}><span>{resourceLabel(resource,t)}</span><ChevronRight size={15}/></a>)}</div></section>

    <LevelTable chamber={chamber} level={level} language={language} t={t}/>
    <SpecialDetailPanel chamber={chamber} level={level} levels={levels} language={language} t={t}/>

    {chamber.conflict&&<section className="cc-conflict-panel"><AlertTriangle size={19}/><div><b>{t('Conflito mantido visível','Conflict kept visible')}</b><p>{tr(chamber.conflict,language)}</p></div></section>}

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><BookOpen/><div><h2>{t('Fontes e revisão','Sources and review')}</h2><span>{t(`Revisado em ${CHAMBER_RESEARCH_META.checkedAt.split('-').reverse().join('/')}`,`Reviewed on ${CHAMBER_RESEARCH_META.checkedAt}`)}</span></div></div><div className="rr-source-links"><a href={sourceHref(chamber)} target="_blank" rel="noreferrer"><span>{t('PocketAnts Wiki · página dedicada','PocketAnts Wiki · dedicated page')}</span><ExternalLink size={14}/></a><a href={CHAMBER_RESEARCH_META.colonyUrl} target="_blank" rel="noreferrer"><span>{t('Colony Chambers · visão geral','Colony Chambers · overview')}</span><ExternalLink size={14}/></a></div></section>
  </div>;
}

export default function ChamberDatabasePage({routeId=null}){return routeId?<ChamberDetail id={routeId}/>:<ChamberList/>;}
