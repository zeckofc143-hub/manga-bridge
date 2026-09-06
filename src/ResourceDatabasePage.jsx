import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  Filter,
  Lightbulb,
  MapPin,
  PackageOpen,
  PlayCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Warehouse
} from 'lucide-react';
import { chambers, gameMeta, resources, sources } from './wikiData';
import { useLanguage } from './LanguageProviderLite';
import './resourceDatabasePage.css';

const RESOURCE_META = {
  leaves:{priority:'high',stage:'early',wiki:'Leaves',related:['leaf-storage','food-processing']},
  fungus:{priority:'high',stage:'early',wiki:'Fungus',related:['food-processing','queen','nursery']},
  seeds:{priority:'high',stage:'early',wiki:'Seeds',related:['seed-storage']},
  resin:{priority:'critical',stage:'mid-late',wiki:'Resin',related:['resin','queen','body-parts']},
  honeydew:{priority:'high',stage:'mid',wiki:'Honeydew',related:['honeydew']},
  'body-parts':{priority:'high',stage:'mid-late',wiki:'Body Parts',related:['body-parts','creatures','resin']},
  water:{priority:'medium',stage:'mid',wiki:'Water',related:['water']},
  gems:{priority:'situational',stage:'all',wiki:'Gems',related:['creatures']},
  pheromones:{priority:'medium',stage:'early-mid',wiki:'Pheromones',related:['creatures']},
  'battle-tokens':{priority:'situational',stage:'mid-late',wiki:'Battle Tokens',related:[]}
};

const RESOURCE_EN = {
  leaves:{name:'Leaves',category:'Basic',summary:'A core progression resource. Workers collect leaves on the map and carry them back to the colony.',uses:['Chamber upgrades','Fungus production'],obtain:['Large leaves on the map'],tip:'Keep workers gathering whenever your storage is not full.'},
  fungus:{name:'Fungus',category:'Basic',summary:'Food produced from leaves in the Food Processing Chamber.',uses:['Feed the queen','Create workers and soldiers','Upgrades'],obtain:['Processing leaves'],tip:'The Food Processing Chamber also increases your worker limit.'},
  seeds:{name:'Seeds',category:'Basic',summary:'A resource used for chamber upgrades as the colony progresses.',uses:['Chamber upgrades'],obtain:['Seed sources on the map'],tip:'The Seed Storage Chamber increases capacity and gathering.'},
  resin:{name:'Resin',category:'Advanced',summary:'One of the main progression bottlenecks, tied to important upgrades and advanced systems.',uses:['Important upgrades','Soldier-related progression','Beehive / progression'],obtain:['Termite tree','Termite co-op','Beehive','Daily missions'],tip:'The community base recommends prioritizing the Resin Chamber before heavy Creature Lab investment.'},
  honeydew:{name:'Honeydew',category:'Advanced',summary:'A progression resource obtained mainly from aphid-related content and other activities.',uses:['Honeydew Shop','Effectiveness upgrades'],obtain:['Aphid Farm','Daily missions','Beehive','Other rewards'],tip:'Aphid Farms begin appearing after building the Honeydew Chamber.'},
  'body-parts':{name:'Creature Parts',category:'Creatures',summary:'Material connected to creatures, the lab and advanced chamber progression.',uses:['Creature Lab','Some advanced upgrades'],obtain:['Defeated creatures','Battles','Vinegaroon','Crab co-op'],tip:'Defeating a creature is not always the best value; capture can matter more for fusion.'},
  water:{name:'Water',category:'Garden',summary:'Stored in the Water Storage Chamber and connected to the flower seed system.',uses:['Garden','Unlocking flower seeds'],obtain:['Water sources on the map'],tip:'Higher Water Storage levels unlock different seeds.'},
  gems:{name:'Gems',category:'Premium',summary:'A currency used for several upgrades and convenience options.',uses:['Advanced Creature Lab upgrades','Shops and bonuses'],obtain:['Rewards and in-game systems'],tip:'Avoid spending before checking whether an upgrade is permanent or temporary.'},
  pheromones:{name:'Pheromones',category:'Creatures',summary:'Used to attract creatures; some types are connected to better variants or special conditions.',uses:['Attract creatures'],obtain:['Red Ant Queen','PvP / leagues depending on type'],tip:'Some creatures also require time, weather or an extra item.'},
  'battle-tokens':{name:'Battle Tokens',category:'Combat',summary:'Consumables used to enter certain battle activities.',uses:['Specific activities and entries'],obtain:['Game rewards'],tip:'Keep some available for activities that matter to your current progression.'}
};

const priorityRank={critical:0,high:1,medium:2,situational:3};
const stageRank={early:0,'early-mid':1,mid:2,'mid-late':3,all:4};

function normalize(value=''){
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}

function translatedResource(resource,language){
  if(language!=='en') return resource;
  const en=RESOURCE_EN[resource.id];
  return en ? {...resource,...en} : resource;
}

function priorityLabel(value,t){
  return ({critical:t('Crítica','Critical'),high:t('Alta','High'),medium:t('Média','Medium'),situational:t('Situacional','Situational')})[value] || value;
}

function stageLabel(value,t){
  return ({early:t('Início','Early game'),'early-mid':t('Início / meio','Early / mid'),mid:t('Meio','Mid game'),'mid-late':t('Meio / avançado','Mid / late'),all:t('Todas as fases','All stages')})[value] || value;
}

function sourceLabel(resource,t){
  if(resource.source==='official') return t('Oficial','Official');
  if(resource.source==='review') return t('A revisar','Needs review');
  if(resource.source==='consensus') return t('Consenso da comunidade','Community consensus');
  return t('Wiki comunitária','Community wiki');
}

function SourceBadge({resource,t}){
  const review=resource.source==='review';
  return <span className={`rdb-source ${review?'review':'ok'}`} title={sources?.[resource.source]?.detail || ''}>
    {review?<AlertTriangle size={13}/>:<ShieldCheck size={13}/>} {sourceLabel(resource,t)}
  </span>;
}

function youtubeSearch(resource,language){
  const name=language==='en' ? (RESOURCE_EN[resource.id]?.name || resource.name) : resource.name;
  const query=language==='en'
    ? `Pocket Ants ${name} guide how to get farm`
    : `Pocket Ants ${name} guia como conseguir farm português Brasil`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function wikiSearch(resource){
  const term=RESOURCE_META[resource.id]?.wiki || resource.name;
  return `https://pocketants.fandom.com/wiki/Special:Search?query=${encodeURIComponent(term)}`;
}

function readHeaderQuery(){
  const hash=window.location.hash || '';
  const query=hash.split('?')[1] || '';
  return new URLSearchParams(query).get('dbq') || '';
}

function relatedChambers(resource){
  const ids=RESOURCE_META[resource.id]?.related || [];
  return ids.map(id=>chambers.find(c=>c.id===id)).filter(Boolean);
}

function ResourceCard({resource,language,t}){
  const item=translatedResource(resource,language);
  const meta=RESOURCE_META[resource.id] || {priority:'medium',stage:'all',related:[]};
  const related=relatedChambers(resource);
  return <article className="rdb-card">
    <div className="rdb-card-top">
      <span className="rdb-icon" aria-hidden="true">{resource.icon}</span>
      <div className="rdb-card-badges">
        <span>{item.category}</span>
        <span className={`priority-${meta.priority}`}>{priorityLabel(meta.priority,t)}</span>
      </div>
    </div>
    <div className="rdb-card-head"><div><h2>{item.name}</h2><small>{stageLabel(meta.stage,t)}</small></div><SourceBadge resource={resource} t={t}/></div>
    <p className="rdb-summary">{item.summary}</p>
    <div className="rdb-quick-grid">
      <div><span>{t('Onde pega','Get it from')}</span><b>{item.obtain?.[0] || '—'}</b></div>
      <div><span>{t('Uso principal','Main use')}</span><b>{item.uses?.[0] || '—'}</b></div>
      <div><span>{t('Fase','Stage')}</span><b>{stageLabel(meta.stage,t)}</b></div>
      <div><span>{t('Câmaras ligadas','Related chambers')}</span><b>{related.length}</b></div>
    </div>
    <div className="rdb-tip"><Lightbulb size={15}/><span>{item.tip}</span></div>
    <div className="rdb-card-actions">
      <a className="rdb-open" href={`#/resources/${encodeURIComponent(resource.id)}`}>{t('Ficha completa','Full profile')} <ChevronRight size={16}/></a>
      <a className="rdb-tutorial" href={youtubeSearch(resource,language)} target="_blank" rel="noreferrer"><PlayCircle size={15}/>{language==='en'?'Guide EN':'Tutorial PT-BR'}</a>
    </div>
  </article>;
}

function ResourceList(){
  const {language,t}=useLanguage();
  const [query,setQuery]=useState(readHeaderQuery);
  const [category,setCategory]=useState('all');
  const [priority,setPriority]=useState('all');
  const [stage,setStage]=useState('all');
  const [sort,setSort]=useState('priority');

  useEffect(()=>{
    const sync=()=>{const next=readHeaderQuery(); if(next) setQuery(next);};
    window.addEventListener('hashchange',sync);
    return ()=>window.removeEventListener('hashchange',sync);
  },[]);

  const categoryOptions=useMemo(()=>['all',...new Set(resources.map(r=>r.category))],[]);
  const filtered=useMemo(()=>{
    const q=normalize(query.trim());
    const list=resources.filter(resource=>{
      const item=translatedResource(resource,language);
      const meta=RESOURCE_META[resource.id] || {};
      const haystack=normalize([item.name,item.category,item.summary,item.tip,...(item.obtain||[]),...(item.uses||[]),stageLabel(meta.stage,t),priorityLabel(meta.priority,t)].join(' '));
      return (!q || haystack.includes(q)) &&
        (category==='all' || resource.category===category) &&
        (priority==='all' || meta.priority===priority) &&
        (stage==='all' || meta.stage===stage || (stage==='mid' && meta.stage==='mid-late'));
    });
    return [...list].sort((a,b)=>{
      const am=RESOURCE_META[a.id]||{}, bm=RESOURCE_META[b.id]||{};
      const an=translatedResource(a,language).name, bn=translatedResource(b,language).name;
      if(sort==='priority') return (priorityRank[am.priority]??9)-(priorityRank[bm.priority]??9) || an.localeCompare(bn,language==='en'?'en':'pt-BR');
      if(sort==='stage') return (stageRank[am.stage]??9)-(stageRank[bm.stage]??9) || an.localeCompare(bn,language==='en'?'en':'pt-BR');
      return an.localeCompare(bn,language==='en'?'en':'pt-BR');
    });
  },[query,category,priority,stage,sort,language,t]);

  const critical=resources.filter(r=>RESOURCE_META[r.id]?.priority==='critical').length;
  const advanced=resources.filter(r=>r.category==='Avançado').length;
  const linked=resources.filter(r=>relatedChambers(r).length>0).length;

  return <div className="rdb-page">
    <section className="rdb-identity" aria-labelledby="resource-db-title">
      <div className="rdb-title-row"><span className="rdb-db-icon"><Database size={22}/></span><div><span className="rdb-kicker">{t('Recursos','Resources')}</span><h1 id="resource-db-title">{t('Banco de Dados de Recursos','Resource Database')}</h1></div></div>
      <p>{t('Uma enciclopédia prática para entender onde cada recurso entra na progressão, como obter, onde gastar e quais câmaras dependem dele.','A practical encyclopedia showing where each resource fits into progression, how to obtain it, where to spend it and which chambers depend on it.')}</p>
      <div className="rdb-principles"><span><PackageOpen size={15}/>{t('Obtenção clara','Clear acquisition')}</span><span><Target size={15}/>{t('Uso + prioridade','Use + priority')}</span><span><Warehouse size={15}/>{t('Câmaras relacionadas','Related chambers')}</span></div>
    </section>

    <section className="rdb-hero">
      <div className="rdb-summary-grid">
        <div><strong>{resources.length}</strong><span>{t('recursos catalogados','resources catalogued')}</span></div>
        <div><strong>{advanced}</strong><span>{t('avançados','advanced')}</span></div>
        <div><strong>{critical}</strong><span>{t('gargalos críticos','critical bottlenecks')}</span></div>
        <div><strong>{linked}</strong><span>{t('ligados a câmaras','linked to chambers')}</span></div>
      </div>
    </section>

    <nav className="rdb-tabs" aria-label={t('Categorias de recursos','Resource categories')}>
      {categoryOptions.map(value=>{
        const label=value==='all'?t('Todos','All'):(language==='en' ? ({'Básico':'Basic','Avançado':'Advanced','Criaturas':'Creatures','Jardim':'Garden','Premium':'Premium','Combate':'Combat'}[value]||value) : value);
        return <button key={value} className={category===value?'active':''} onClick={()=>setCategory(value)} aria-pressed={category===value}>{label}</button>;
      })}
    </nav>

    <section className="rdb-focus"><Sparkles size={18}/><div><b>{t('Leia primeiro os gargalos','Start with the bottlenecks')}</b><span>{t('Resina, Honeydew e Partes de criatura conectam várias áreas da progressão. A página agora deixa essas relações visíveis em vez de esconder tudo em texto corrido.','Resin, Honeydew and Creature Parts connect multiple progression systems. The page now makes those relationships visible instead of burying them in plain text.')}</span></div></section>

    <div className="rdb-filter-row">
      <label className="rdb-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar recurso, uso, fonte, câmara…','Search resource, use, source, chamber…')} aria-label={t('Buscar recursos','Search resources')}/></label>
      <details className="rdb-filters">
        <summary><SlidersHorizontal size={17}/>{t('Filtros','Filters')} <span>{filtered.length}</span></summary>
        <div>
          <label><span>{t('Prioridade','Priority')}</span><select value={priority} onChange={e=>setPriority(e.target.value)}><option value="all">{t('Todas','All')}</option><option value="critical">{t('Crítica','Critical')}</option><option value="high">{t('Alta','High')}</option><option value="medium">{t('Média','Medium')}</option><option value="situational">{t('Situacional','Situational')}</option></select></label>
          <label><span>{t('Fase','Stage')}</span><select value={stage} onChange={e=>setStage(e.target.value)}><option value="all">{t('Todas','All')}</option><option value="early">{t('Início','Early game')}</option><option value="early-mid">{t('Início / meio','Early / mid')}</option><option value="mid">{t('Meio','Mid game')}</option><option value="mid-late">{t('Meio / avançado','Mid / late')}</option></select></label>
          <label><span>{t('Ordenar','Sort')}</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="priority">{t('Prioridade','Priority')}</option><option value="stage">{t('Fase do jogo','Game stage')}</option><option value="name">{t('Nome A–Z','Name A–Z')}</option></select></label>
        </div>
      </details>
    </div>

    <div className="rdb-result-line"><b>{filtered.length}</b> {t('resultados','results')}<span> · {t('cada card mostra o essencial sem precisar abrir','each card shows the essentials without opening it')}</span></div>
    {filtered.length ? <section className="rdb-grid">{filtered.map(resource=><ResourceCard key={resource.id} resource={resource} language={language} t={t}/>)}</section> : <div className="rdb-empty"><Search size={28}/><b>{t('Nada encontrado','Nothing found')}</b><span>{t('Remova um filtro ou pesquise outro termo.','Remove a filter or search for another term.')}</span></div>}
  </div>;
}

function ResourceDetail({id}){
  const {language,t}=useLanguage();
  const resource=resources.find(r=>r.id===id);
  if(!resource) return <div className="rdb-page"><a className="rdb-back" href="#/resources"><ChevronLeft size={17}/>{t('Voltar','Back')}</a><div className="rdb-empty"><Database size={28}/><b>{t('Recurso não encontrado','Resource not found')}</b></div></div>;
  const item=translatedResource(resource,language);
  const meta=RESOURCE_META[resource.id] || {priority:'medium',stage:'all'};
  const related=relatedChambers(resource);

  return <div className="rdb-page rdb-detail-page">
    <a className="rdb-back" href="#/resources"><ChevronLeft size={17}/>{t('Voltar para Recursos','Back to Resources')}</a>
    <section className="rdb-detail-hero">
      <div className="rdb-detail-icon" aria-hidden="true">{resource.icon}</div>
      <div className="rdb-detail-copy">
        <div className="rdb-detail-badges"><span>{item.category}</span><span className={`priority-${meta.priority}`}>{priorityLabel(meta.priority,t)}</span><SourceBadge resource={resource} t={t}/></div>
        <h1>{item.name}</h1>
        <p>{item.summary}</p>
        <div className="rdb-detail-actions"><a href={youtubeSearch(resource,language)} target="_blank" rel="noreferrer"><PlayCircle size={16}/>{language==='en'?'Guide EN':'Tutorial PT-BR'}</a><a href={wikiSearch(resource)} target="_blank" rel="noreferrer"><BookOpen size={16}/>{t('Pesquisar na Wiki','Search community wiki')}</a></div>
      </div>
    </section>

    <section className="rdb-detail-grid">
      <article className="rdb-panel"><div className="rdb-panel-title"><MapPin/><div><h2>{t('Onde conseguir','How to obtain')}</h2><span>{t('Fontes registradas na base atual','Sources recorded in the current database')}</span></div></div><ol className="rdb-steps">{(item.obtain||[]).map((text,index)=><li key={`${index}-${text}`}><span>{index+1}</span><p>{text}</p></li>)}</ol></article>
      <article className="rdb-panel"><div className="rdb-panel-title"><Target/><div><h2>{t('Para que serve','What it is used for')}</h2><span>{t('Principais usos registrados','Main recorded uses')}</span></div></div><ul className="rdb-use-list">{(item.uses||[]).map(text=><li key={text}><ArrowRight size={15}/><span>{text}</span></li>)}</ul></article>
    </section>

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><Filter/><div><h2>{t('Fluxo de progressão','Progression flow')}</h2><span>{t('Visão simplificada para entender onde o recurso entra','Simplified view of where this resource fits')}</span></div></div><div className="rdb-flow"><div><small>{t('1 · Obter','1 · Get')}</small><strong>{item.obtain?.[0] || '—'}</strong></div><ArrowRight/><div><small>{t('2 · Armazenar / liberar','2 · Store / unlock')}</small><strong>{related[0] ? (language==='en'?related[0].name:related[0].pt) : t('Sistema associado','Related system')}</strong></div><ArrowRight/><div><small>{t('3 · Gastar','3 · Spend')}</small><strong>{item.uses?.[0] || '—'}</strong></div></div></section>

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><Warehouse/><div><h2>{t('Câmaras relacionadas','Related chambers')}</h2><span>{t('Onde esse recurso cruza a progressão da colônia','Where this resource connects to colony progression')}</span></div></div>{related.length ? <div className="rdb-chambers">{related.map(chamber=><a href="#/chambers" key={chamber.id}><span>{chamber.icon}</span><div><b>{language==='en'?chamber.name:chamber.pt}</b><small>{t('Prioridade','Priority')}: {chamber.priority} · Lv. {chamber.maxLevel}</small></div><ChevronRight size={16}/></a>)}</div> : <p className="rdb-muted">{t('Nenhuma câmara direta registrada para este recurso.','No direct chamber relationship is currently recorded for this resource.')}</p>}</section>

    <section className="rdb-panel rdb-wide rdb-tip-panel"><div className="rdb-panel-title"><Lightbulb/><div><h2>{t('Dica prática','Practical tip')}</h2><span>{t('Orientação da base comunitária, não regra absoluta','Community guidance, not an absolute rule')}</span></div></div><p>{item.tip}</p></section>

    <section className="rdb-panel rdb-wide"><div className="rdb-panel-title"><PlayCircle/><div><h2>{t('Tutoriais e fontes','Tutorials and sources')}</h2><span>{t('Links acompanham o idioma selecionado quando aplicável','Links follow the selected language when applicable')}</span></div></div><div className="rdb-source-links"><a href={youtubeSearch(resource,language)} target="_blank" rel="noreferrer"><PlayCircle size={18}/><div><b>{language==='en'?'Search English tutorials':'Buscar tutoriais PT-BR'}</b><span>YouTube · {item.name}</span></div><ExternalLink size={14}/></a><a href={wikiSearch(resource)} target="_blank" rel="noreferrer"><BookOpen size={18}/><div><b>{t('Pesquisar na PocketAnts Wiki','Search PocketAnts Wiki')}</b><span>{RESOURCE_META[resource.id]?.wiki || item.name}</span></div><ExternalLink size={14}/></a><a href={gameMeta.officialGameUrl} target="_blank" rel="noreferrer"><ShieldCheck size={18}/><div><b>{t('Página oficial do jogo','Official game page')}</b><span>Google Play · Ariel Games</span></div><ExternalLink size={14}/></a></div></section>

    <section className="rdb-panel rdb-wide rdb-review"><div><h2>{t('Fonte e revisão','Source and review')}</h2><p>{t(`Base revisada em ${gameMeta.dataCheckedAt}. Os dados desta ficha vêm da base comunitária já usada pelo projeto; opiniões e prioridades continuam identificadas como orientação.`,`Database reviewed on ${gameMeta.dataCheckedAt}. This profile uses the community data already adopted by the project; opinions and priorities remain identified as guidance.`)}</p></div><SourceBadge resource={resource} t={t}/></section>
  </div>;
}

export default function ResourceDatabasePage({routeId=null}){
  return routeId ? <ResourceDetail id={routeId}/> : <ResourceList/>;
}
