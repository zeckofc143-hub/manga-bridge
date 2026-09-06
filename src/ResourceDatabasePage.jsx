import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Database,
  ExternalLink,
  Gauge,
  GitBranch,
  Leaf,
  Lightbulb,
  Minus,
  PackageOpen,
  PlayCircle,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  WifiOff,
  Warehouse
} from 'lucide-react';
import { chambers } from './wikiData';
import { useLanguage } from './LanguageProviderLite';
import {
  DAILY_FARM_TASKS,
  ECONOMY_PATHS,
  GOAL_PRESETS,
  RESOURCE_RECORDS,
  RESOURCE_RESEARCH_META,
  RESOURCE_SOURCE_LINKS,
  SPECIAL_RESOURCE_ENTRIES
} from './resourceResearchData';
import './resourceDatabasePage.css';
import './resourceResearchExpansion.css';

const categoryOrder=['colony','progression','combat','garden','currency','clan'];
const priorityRank={critical:0,high:1,medium:2,situational:3};
const stageRank={early:0,'early-mid':1,mid:2,'mid-late':3,late:4,all:5};

const normalize=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const tr=(value,language)=>value && typeof value==='object' && ('pt' in value || 'en' in value) ? (language==='en' ? value.en : value.pt) : value;
const utcDay=()=>new Date().toISOString().slice(0,10);

function categoryLabel(value,t){
  return ({colony:t('Colônia','Colony'),progression:t('Progressão','Progression'),combat:t('Combate','Combat'),garden:t('Jardim','Garden'),currency:t('Moedas','Currencies'),clan:t('Clã','Clan')})[value] || value;
}
function stageLabel(value,t){
  return ({early:t('Início','Early'),'early-mid':t('Início / meio','Early / mid'),mid:t('Meio','Mid'),'mid-late':t('Meio / avançado','Mid / late'),late:t('Avançado','Late'),all:t('Todas as fases','All stages')})[value] || value;
}
function priorityLabel(value,t){
  return ({critical:t('Crítica','Critical'),high:t('Alta','High'),medium:t('Média','Medium'),situational:t('Situacional','Situational')})[value] || value;
}
function offlineLabel(value,t){ return value ? t('Offline: sim','Offline: yes') : t('Offline: não','Offline: no'); }
function resourceById(id){ return RESOURCE_RECORDS.find(r=>r.id===id); }
function relatedChambers(resource){ return (resource.chambers||[]).map(id=>chambers.find(c=>c.id===id)).filter(Boolean); }
function sourceByKey(key){ return RESOURCE_SOURCE_LINKS[key] || null; }
function youtubeSearch(resource,language){
  const query=language==='en'
    ? `Pocket Ants ${tr(resource.name,language)} guide farm how to get`
    : `Pocket Ants ${tr(resource.name,language)} guia farm como conseguir português Brasil`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
function readHeaderQuery(){
  const hash=window.location.hash || '';
  return new URLSearchParams(hash.split('?')[1] || '').get('dbq') || '';
}

function TrustBadge({official=false,t}){
  return <span className={`rr-trust ${official?'official':'community'}`}>
    {official?<ShieldCheck size={13}/>:<BookOpen size={13}/>} {official?t('Oficial','Official'):t('Wiki revisada','Reviewed wiki')}
  </span>;
}

function ResourceCard({resource,language,t}){
  const chambersLinked=relatedChambers(resource);
  const firstSource=resource.obtain?.[0];
  return <article className="rr-card">
    <div className="rr-card-top">
      <span className="rr-resource-icon" aria-hidden="true">{resource.icon}</span>
      <div className="rr-badges">
        {resource.new2026 && <span className="rr-new">{t('NOVO 2026','NEW 2026')}</span>}
        <span>{categoryLabel(resource.category,t)}</span>
        <span className={`rr-priority p-${resource.priority}`}>{priorityLabel(resource.priority,t)}</span>
      </div>
    </div>
    <div className="rr-card-title"><div><h2>{tr(resource.name,language)}</h2><small>{stageLabel(resource.stage,t)}</small></div><TrustBadge official={resource.official} t={t}/></div>
    <p>{tr(resource.summary,language)}</p>
    <div className="rr-facts-grid">
      <div><span>{t('Melhor ponto de entrada','Primary source')}</span><b>{firstSource ? tr(firstSource.name,language) : '—'}</b></div>
      <div><span>{t('Coleta offline','Offline gathering')}</span><b className={resource.offline?'yes':'no'}>{resource.offline?t('Sim','Yes'):t('Não','No')}</b></div>
      <div><span>{t('Câmaras ligadas','Related chambers')}</span><b>{chambersLinked.length}</b></div>
      <div><span>{t('Rotas de farm','Farm routes')}</span><b>{resource.obtain?.length || 0}</b></div>
    </div>
    <div className="rr-use-preview"><Target size={15}/><span>{tr(resource.uses?.[0],language)}</span></div>
    <div className="rr-card-actions">
      <a href={`#/resources/${encodeURIComponent(resource.id)}`} className="rr-primary">{t('Abrir ficha','Open profile')} <ChevronRight size={16}/></a>
      <a href={youtubeSearch(resource,language)} target="_blank" rel="noreferrer"><PlayCircle size={15}/>{language==='en'?'Guide EN':'Tutorial PT-BR'}</a>
    </div>
  </article>;
}

function DailyFarmPlanner({language,t}){
  const storageKey=`pa-resource-daily-${utcDay()}`;
  const [counts,setCounts]=useState(()=>{
    try{return JSON.parse(localStorage.getItem(storageKey)||'{}');}catch{return {};}
  });
  useEffect(()=>{ try{localStorage.setItem(storageKey,JSON.stringify(counts));}catch{} },[counts,storageKey]);
  const change=(id,delta,max)=>setCounts(current=>({...current,[id]:Math.max(0,Math.min(max,(current[id]||0)+delta))}));
  const reset=()=>setCounts({});
  const totals=useMemo(()=>{
    const result={resin:0,honeydew:0,gems:0,bodyParts:0};
    DAILY_FARM_TASKS.forEach(task=>{
      const count=counts[task.id]||0;
      if(!task.reward) return;
      const multiplier=task.id==='daily-quests' ? (count>=task.max?1:0) : count;
      Object.entries(task.reward).forEach(([key,value])=>{result[key]=(result[key]||0)+value*multiplier;});
    });
    return result;
  },[counts]);
  const done=DAILY_FARM_TASKS.reduce((sum,task)=>sum+Math.min(task.max,counts[task.id]||0),0);
  const max=DAILY_FARM_TASKS.reduce((sum,task)=>sum+task.max,0);
  return <section className="rr-tool-panel" id="daily-farm">
    <div className="rr-section-title"><div><span><Check size={17}/>{t('Ferramenta pessoal','Personal tool')}</span><h2>{t('Farm diário','Daily farm')}</h2><p>{t('Checklist salvo neste aparelho e separado por dia UTC. Valores somados abaixo são só recompensas fixas documentadas.','Checklist saved on this device and separated by UTC day. Totals below only include documented fixed rewards.')}</p></div><button onClick={reset} type="button"><RotateCcw size={15}/>{t('Resetar','Reset')}</button></div>
    <div className="rr-progress"><div><span>{done}/{max}</span><b>{Math.round((done/max)*100)}%</b></div><i style={{width:`${(done/max)*100}%`}}/></div>
    <div className="rr-daily-grid">
      {DAILY_FARM_TASKS.map(task=>{
        const count=counts[task.id]||0;
        return <div className={count>=task.max?'done':''} key={task.id}>
          <div><strong>{tr(task.label,language)}</strong><small>{tr(task.note,language)}</small></div>
          <div className="rr-counter"><button onClick={()=>change(task.id,-1,task.max)} aria-label={t('Diminuir','Decrease')}><Minus size={15}/></button><b>{count}/{task.max}</b><button onClick={()=>change(task.id,1,task.max)} aria-label={t('Aumentar','Increase')}><Plus size={15}/></button></div>
        </div>;
      })}
    </div>
    <div className="rr-known-yield">
      <span>{t('Ganhos fixos já marcados','Known fixed rewards marked')}</span>
      <div><b>🟠 {totals.resin.toLocaleString(language==='en'?'en-US':'pt-BR')}</b><b>🍯 {totals.honeydew.toLocaleString(language==='en'?'en-US':'pt-BR')}</b><b>💎 {totals.gems}</b><b>🧩 {totals.bodyParts}</b></div>
    </div>
  </section>;
}

function GoalPlanner({language,t}){
  const [goal,setGoal]=useState('resin');
  const preset=GOAL_PRESETS[goal];
  return <section className="rr-tool-panel">
    <div className="rr-section-title"><div><span><Gauge size={17}/>{t('Planejador','Planner')}</span><h2>{t('O que devo farmar?','What should I farm?')}</h2><p>{t('Escolha um objetivo e veja a rota de obtenção mais útil da base atual.','Choose a goal and see the most useful acquisition route in the current database.')}</p></div></div>
    <label className="rr-goal-select"><span>{t('Objetivo','Goal')}</span><select value={goal} onChange={e=>setGoal(e.target.value)}>{Object.keys(GOAL_PRESETS).map(id=><option key={id} value={id}>{tr(resourceById(id)?.name || GOAL_PRESETS[id].title,language)}</option>)}</select></label>
    <div className="rr-goal-route"><h3>{tr(preset.title,language)}</h3>{preset.steps.map((step,index)=><div key={index}><span>{index+1}</span><p>{tr(step,language)}</p></div>)}</div>
  </section>;
}

function QuickCalculators({t}){
  const [fungus,setFungus]=useState(0);
  const [parts,setParts]=useState(0);
  const [tokens,setTokens]=useState(0);
  return <section className="rr-tool-panel">
    <div className="rr-section-title"><div><span><Calculator size={17}/>{t('Calculadoras rápidas','Quick calculators')}</span><h2>{t('Gasto sem fazer conta na cabeça','Spend without mental math')}</h2></div></div>
    <div className="rr-calcs">
      <label><span>🍄 {t('Fungo disponível','Available fungus')}</span><input type="number" min="0" value={fungus} onChange={e=>setFungus(Math.max(0,Number(e.target.value)||0))}/><b>{Math.floor(fungus/15)} {t('soldados','soldiers')} · {Math.floor(fungus)} {t('trabalhadoras','workers')}</b><small>{t('Referência: 15 por soldado, 1 por trabalhadora.','Reference: 15 per soldier, 1 per worker.')}</small></label>
      <label><span>🧩 {t('Partes disponíveis','Available parts')}</span><input type="number" min="0" value={parts} onChange={e=>setParts(Math.max(0,Number(e.target.value)||0))}/><b>{Math.floor(parts/50)} × 4★ · {Math.floor(parts/95)} {t('ciclos 2★→4★','2★→4★ ladders')}</b><small>{t('Custos documentados: 15 + 30 + 50.','Documented costs: 15 + 30 + 50.')}</small></label>
      <label><span>🎟️ {t('Tokens disponíveis','Available tokens')}</span><input type="number" min="0" value={tokens} onChange={e=>setTokens(Math.max(0,Number(e.target.value)||0))}/><b>{Math.floor(tokens/3)} {t('entradas de dungeon','dungeon entries')}</b><small>{t('Fire Ant / Termite / Crab usam 3 tokens.','Fire Ant / Termite / Crab use 3 tokens.')}</small></label>
    </div>
  </section>;
}

function EconomyMap({language,t}){
  const nodeName=id=>{
    const r=resourceById(id); if(r) return `${r.icon} ${tr(r.name,language)}`;
    return ({army:t('🐜 Exército','🐜 Army'),beehive:t('🐝 Beehive','🐝 Beehive'),'clan-wars':t('⚔️ Clan Wars','⚔️ Clan Wars'),legions:t('🛡️ Legions','🛡️ Legions'),garden:t('🌸 Garden','🌸 Garden'),'resin-chamber':t('🏠 Resin Chamber','🏠 Resin Chamber')})[id] || id;
  };
  return <section className="rr-tool-panel rr-economy">
    <div className="rr-section-title"><div><span><GitBranch size={17}/>{t('Mapa econômico','Economy map')}</span><h2>{t('Como um recurso vira outro sistema','How resources feed other systems')}</h2><p>{t('Use isso para entender dependências sem abrir dez páginas.','Use this to understand dependencies without opening ten pages.')}</p></div></div>
    <div className="rr-economy-grid">{ECONOMY_PATHS.map((path,index)=><div key={`${path.from}-${path.to}-${index}`}><a href={resourceById(path.from)?`#/resources/${path.from}`:undefined}>{nodeName(path.from)}</a><span><ArrowRight size={14}/>{tr(path.label,language)}</span><a href={resourceById(path.to)?`#/resources/${path.to}`:undefined}>{nodeName(path.to)}</a></div>)}</div>
  </section>;
}

function SpecialEntries({language,t}){
  return <section className="rr-tool-panel">
    <div className="rr-section-title"><div><span><PackageOpen size={17}/>{t('Itens e fontes especiais','Special items and sources')}</span><h2>{t('Nem tudo é moeda','Not everything is a currency')}</h2><p>{t('Separamos fontes e consumíveis para não misturar tudo no grid principal.','Sources and consumables are separated so the main resource grid stays meaningful.')}</p></div></div>
    <div className="rr-special-grid">{SPECIAL_RESOURCE_ENTRIES.map(item=>{const source=sourceByKey(item.source);return <article key={item.id}><span>{item.icon}</span><div><small>{tr(item.type,language)}</small><h3>{tr(item.name,language)}</h3><p>{tr(item.summary,language)}</p>{source&&<a href={source.url} target="_blank" rel="noreferrer">{tr(source.label,language)} <ExternalLink size={13}/></a>}</div></article>})}</div>
  </section>;
}

function ResourceList(){
  const {language,t}=useLanguage();
  const [query,setQuery]=useState(readHeaderQuery);
  const [category,setCategory]=useState('all');
  const [priority,setPriority]=useState('all');
  const [offline,setOffline]=useState('all');
  const [sourceKind,setSourceKind]=useState('all');
  const [sort,setSort]=useState('priority');

  useEffect(()=>{const sync=()=>setQuery(readHeaderQuery());window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);

  const sourceKinds=useMemo(()=>['all',...new Set(RESOURCE_RECORDS.flatMap(r=>r.sourceKinds||[]))],[]);
  const filtered=useMemo(()=>{
    const q=normalize(query.trim());
    const list=RESOURCE_RECORDS.filter(resource=>{
      const haystack=normalize([
        tr(resource.name,language),tr(resource.summary,language),categoryLabel(resource.category,t),priorityLabel(resource.priority,t),stageLabel(resource.stage,t),
        ...(resource.obtain||[]).flatMap(x=>[tr(x.name,language),tr(x.detail,language)]),...(resource.uses||[]).map(x=>tr(x,language)),...(resource.facts||[]).map(x=>tr(x,language)),...(resource.systems||[])
      ].join(' '));
      return (!q||haystack.includes(q)) && (category==='all'||resource.category===category) && (priority==='all'||resource.priority===priority) && (offline==='all'||String(resource.offline)===offline) && (sourceKind==='all'||resource.sourceKinds?.includes(sourceKind));
    });
    return [...list].sort((a,b)=>{
      if(sort==='priority') return (priorityRank[a.priority]??9)-(priorityRank[b.priority]??9) || (stageRank[a.stage]??9)-(stageRank[b.stage]??9);
      if(sort==='stage') return (stageRank[a.stage]??9)-(stageRank[b.stage]??9) || (priorityRank[a.priority]??9)-(priorityRank[b.priority]??9);
      return tr(a.name,language).localeCompare(tr(b.name,language),language==='en'?'en':'pt-BR');
    });
  },[query,category,priority,offline,sourceKind,sort,language,t]);

  const offlineCount=RESOURCE_RECORDS.filter(r=>r.offline).length;
  const criticalCount=RESOURCE_RECORDS.filter(r=>r.priority==='critical').length;
  return <div className="rdb-page rr-page">
    <section className="rdb-identity rr-identity">
      <div className="rdb-title-row"><span className="rdb-db-icon"><Database size={22}/></span><div><span className="rdb-kicker">{t('Recursos · pesquisa 2026','Resources · 2026 research')}</span><h1>{t('Central de Recursos','Resource Hub')}</h1></div></div>
      <p>{t('Banco atualizado para organizar recursos, moedas, fontes, farms, limites diários e dependências da economia do Pocket Ants — com ferramentas que ajudam a decidir o que fazer, não só textos para ler.','An updated database organizing resources, currencies, sources, farms, daily limits and Pocket Ants economy dependencies — with tools that help you decide what to do, not just text to read.')}</p>
      <div className="rdb-principles"><span><Target size={15}/>{t('Rotas de farm','Farm routes')}</span><span><WifiOff size={15}/>{t('Coleta offline','Offline gathering')}</span><span><GitBranch size={15}/>{t('Dependências','Dependencies')}</span><span><Calculator size={15}/>{t('Calculadoras','Calculators')}</span></div>
    </section>

    <section className="rr-update-banner"><Sparkles size={20}/><div><strong>{t(`Base alinhada à v${RESOURCE_RESEARCH_META.version}`,`Database aligned with v${RESOURCE_RESEARCH_META.version}`)}</strong><p>{t('Silk entrou como recurso principal de 2026 porque Clan Wars e Legions mudaram a economia avançada do jogo.','Silk is now a core 2026 resource because Clan Wars and Legions changed the advanced game economy.')}</p></div><a href={RESOURCE_RESEARCH_META.officialReleaseUrl} target="_blank" rel="noreferrer">{t('Histórico oficial','Official history')} <ExternalLink size={14}/></a></section>

    <section className="rdb-hero"><div className="rdb-summary-grid"><div><strong>{RESOURCE_RECORDS.length}</strong><span>{t('recursos principais','core resources')}</span></div><div><strong>{criticalCount}</strong><span>{t('prioridade crítica','critical priority')}</span></div><div><strong>{offlineCount}</strong><span>{t('compatíveis com offline','offline-compatible')}</span></div><div><strong>{SPECIAL_RESOURCE_ENTRIES.length}</strong><span>{t('itens/fontes separados','separate items/sources')}</span></div></div></section>

    <nav className="rdb-tabs" aria-label={t('Categorias de recursos','Resource categories')}>
      <button className={category==='all'?'active':''} onClick={()=>setCategory('all')}>{t('Todos','All')}</button>
      {categoryOrder.map(value=><button key={value} className={category===value?'active':''} onClick={()=>setCategory(value)}>{categoryLabel(value,t)}</button>)}
    </nav>

    <div className="rdb-filter-row">
      <label className="rdb-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar recurso, farm, sistema, custo…','Search resource, farm, system, cost…')}/></label>
      <details className="rdb-filters"><summary><SlidersHorizontal size={17}/>{t('Filtros','Filters')} <span>{filtered.length}</span></summary><div>
        <label><span>{t('Prioridade','Priority')}</span><select value={priority} onChange={e=>setPriority(e.target.value)}><option value="all">{t('Todas','All')}</option><option value="critical">{t('Crítica','Critical')}</option><option value="high">{t('Alta','High')}</option><option value="medium">{t('Média','Medium')}</option><option value="situational">{t('Situacional','Situational')}</option></select></label>
        <label><span>{t('Offline','Offline')}</span><select value={offline} onChange={e=>setOffline(e.target.value)}><option value="all">{t('Todos','All')}</option><option value="true">{t('Pode coletar','Can gather')}</option><option value="false">{t('Não pode','Cannot gather')}</option></select></label>
        <label><span>{t('Tipo de fonte','Source type')}</span><select value={sourceKind} onChange={e=>setSourceKind(e.target.value)}><option value="all">{t('Todos','All')}</option>{sourceKinds.filter(x=>x!=='all').map(x=><option key={x} value={x}>{x}</option>)}</select></label>
        <label><span>{t('Ordenar','Sort')}</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="priority">{t('Prioridade','Priority')}</option><option value="stage">{t('Fase do jogo','Game stage')}</option><option value="name">A–Z</option></select></label>
      </div></details>
    </div>
    <div className="rdb-result-line"><b>{filtered.length}</b> {t('resultados','results')}</div>
    {filtered.length ? <section className="rr-grid">{filtered.map(resource=><ResourceCard key={resource.id} resource={resource} language={language} t={t}/>)}</section> : <div className="rdb-empty"><Search size={28}/><b>{t('Nada encontrado','Nothing found')}</b><span>{t('Mude os filtros ou tente outro termo.','Change filters or try another term.')}</span></div>}

    <GoalPlanner language={language} t={t}/>
    <DailyFarmPlanner language={language} t={t}/>
    <QuickCalculators t={t}/>
    <EconomyMap language={language} t={t}/>
    <SpecialEntries language={language} t={t}/>

    <section className="rr-source-note"><ShieldCheck size={18}/><div><b>{t('Como tratamos as fontes','How sources are handled')}</b><p>{t('Atualizações oficiais definem novidades como Silk e versão atual. Valores detalhados de farm vêm da PocketAnts Wiki e ficam marcados como referência comunitária revisada; conflitos continuam visíveis em vez de serem escondidos.','Official updates define new features such as Silk and the current version. Detailed farm values come from the PocketAnts Wiki and are marked as reviewed community references; conflicts stay visible instead of being hidden.')}</p></div></section>
  </div>;
}

function ResourceDetail({id}){
  const {language,t}=useLanguage();
  const resource=resourceById(id);
  if(!resource) return <div className="rdb-page rdb-detail-page"><a className="rdb-back" href="#/resources"><ChevronLeft size={17}/>{t('Voltar aos Recursos','Back to Resources')}</a><div className="rdb-empty"><AlertTriangle size={28}/><b>{t('Recurso não encontrado','Resource not found')}</b></div></div>;
  const linked=relatedChambers(resource);
  return <div className="rdb-page rr-page rdb-detail-page">
    <a className="rdb-back" href="#/resources"><ChevronLeft size={17}/>{t('Voltar aos Recursos','Back to Resources')}</a>
    <section className="rdb-detail-hero rr-detail-hero"><div className="rdb-detail-icon">{resource.icon}</div><div className="rdb-detail-copy"><div className="rdb-detail-badges"><span>{categoryLabel(resource.category,t)}</span><span className={`rr-priority p-${resource.priority}`}>{priorityLabel(resource.priority,t)}</span>{resource.new2026&&<span className="rr-new">{t('NOVO 2026','NEW 2026')}</span>}<TrustBadge official={resource.official} t={t}/></div><h1>{tr(resource.name,language)}</h1><p>{tr(resource.summary,language)}</p><div className="rr-detail-meta"><span><Clock3 size={14}/>{stageLabel(resource.stage,t)}</span><span className={resource.offline?'yes':'no'}><WifiOff size={14}/>{offlineLabel(resource.offline,t)}</span><span><PackageOpen size={14}/>{resource.obtain.length} {t('rotas','routes')}</span></div><div className="rdb-detail-actions"><a href={youtubeSearch(resource,language)} target="_blank" rel="noreferrer"><PlayCircle size={15}/>{language==='en'?'Guide EN':'Tutorial PT-BR'}</a>{resource.sources.map(key=>sourceByKey(key)).filter(Boolean).slice(0,2).map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer"><BookOpen size={15}/>{tr(source.label,language)}</a>)}</div></div></section>

    <section className="rdb-detail-grid">
      <article className="rdb-panel"><div className="rdb-panel-title"><PackageOpen/><div><h2>{t('Como conseguir','How to get')}</h2><span>{t('Fontes e recompensas conhecidas','Known sources and rewards')}</span></div></div><div className="rr-source-routes">{resource.obtain.map((entry,index)=><div key={`${entry.kind}-${index}`}><span>{index+1}</span><div><b>{tr(entry.name,language)}</b><p>{tr(entry.detail,language)}</p><small>{entry.kind}</small></div></div>)}</div></article>
      <article className="rdb-panel"><div className="rdb-panel-title"><Target/><div><h2>{t('Onde gastar','Where to spend')}</h2><span>{t('Usos que movem a progressão','Progression uses')}</span></div></div><ul className="rdb-use-list">{resource.uses.map((use,index)=><li key={index}><Check size={15}/><span>{tr(use,language)}</span></li>)}</ul></article>
    </section>

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><Lightbulb/><div><h2>{t('O que importa saber','What matters')}</h2><span>{t('Regras, limites e pegadinhas','Rules, limits and gotchas')}</span></div></div><div className="rr-fact-list">{resource.facts.map((fact,index)=><div key={index}><span>{index+1}</span><p>{tr(fact,language)}</p></div>)}</div></section>

    {linked.length>0 && <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><Warehouse/><div><h2>{t('Câmaras relacionadas','Related chambers')}</h2><span>{t('Onde esse recurso encosta na colônia','Where this resource touches the colony')}</span></div></div><div className="rdb-chambers">{linked.map(chamber=><a href={`#/chambers/${chamber.id}`} key={chamber.id}><span>{chamber.icon}</span><div><b>{language==='en'?chamber.name:(chamber.pt||chamber.name)}</b><small>{t('Nível máximo','Max level')}: {chamber.maxLevel}</small></div><ChevronRight size={15}/></a>)}</div></section>}

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><GitBranch/><div><h2>{t('Sistemas conectados','Connected systems')}</h2><span>{t('Dependências e destinos','Dependencies and destinations')}</span></div></div><div className="rr-system-chips">{resource.systems.map(system=><span key={system}>{system}</span>)}</div></section>

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><BookOpen/><div><h2>{t('Fontes e revisão','Sources and review')}</h2><span>{t(`Revisado em ${RESOURCE_RESEARCH_META.checkedAt.split('-').reverse().join('/')}`,`Reviewed on ${RESOURCE_RESEARCH_META.checkedAt}`)}</span></div></div><div className="rr-source-links">{resource.sources.map(key=>sourceByKey(key)).filter(Boolean).map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer"><span>{tr(source.label,language)}</span><ExternalLink size={14}/></a>)}</div></section>
  </div>;
}

export default function ResourceDatabasePage({routeId=null}){
  return routeId ? <ResourceDetail id={routeId}/> : <ResourceList/>;
}
