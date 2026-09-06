import React,{useEffect,useMemo,useState} from 'react';
import {AlertTriangle,BookOpen,ChevronLeft,ChevronRight,ExternalLink,Filter,Image as ImageIcon,Info,Search,ShieldCheck,Sparkles} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {REFERENCE_META,REFERENCE_SECTIONS,referenceRecord} from './referenceResearchData';
import './resourceDatabasePage.css';
import './referenceDatabasePage.css';

const tr=(value,language)=>value&&typeof value==='object'?(language==='en'?(value.en??value.pt):(value.pt??value.en)):value;
const normalize=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const readQuery=()=>new URLSearchParams((window.location.hash.split('?')[1]||'')).get('dbq')||'';

const REFERENCE_VISUALS={
  'world:environment':{
    src:'https://pocketants.fandom.com/wiki/Special:Redirect/file/Sandbox_Map_3.png',
    source:'https://pocketants.fandom.com/wiki/Screenshots_Guide',
    alt:{pt:'Mapa normal do mundo principal de Pocket Ants',en:'Normal main-world map in Pocket Ants'},
    title:{pt:'Mapa normal do mundo principal',en:'Normal main-world map'},
    caption:{pt:'Imagem real do jogo catalogada pela PocketAnts Wiki como “Sandbox Map 3”. Use para localizar visualmente as áreas principais do mapa.',en:'Real in-game image cataloged by the PocketAnts Wiki as “Sandbox Map 3”. Use it to visually locate the main areas of the map.'}
  }
};

function confidenceLabel(value,t){
  return ({high:t('Revisado','Reviewed'),medium:t('Parcialmente revisado','Partly reviewed'),review:t('Em revisão','Under review')})[value]||t('Revisado','Reviewed');
}
function stageLabel(value,t){
  return ({all:t('Qualquer fase','Any stage'),early:t('Início','Early'),mid:t('Meio','Mid'),late:t('Late game','Late game')})[value]||value;
}
function categoryLabel(value,t){
  const map={map:t('Mapa','Map'),garden:'Garden',farm:'Farm',hostile:t('Hostis','Hostiles'),army:t('Exército','Army'),shop:t('Lojas','Shops'),lab:'Lab',cosmetic:t('Cosméticos','Cosmetics'),late:'Late game',calendar:t('Calendário','Calendar'),mechanic:t('Mecânica','Mechanic'),history:t('Histórico','History'),season:t('Temporadas','Seasons'),version:t('Versões','Versions'),quest:'Quests',daily:t('Diário','Daily'),warning:t('Cuidados','Warnings')};
  return map[value]||value;
}

function SourceList({sources,t}){
  if(!sources?.length)return null;
  return <div className="ref-sources">{sources.map((href,index)=><a key={`${href}-${index}`} href={href} target="_blank" rel="noreferrer"><BookOpen size={14}/>{t('Fonte','Source')} {index+1}<ExternalLink size={11}/></a>)}</div>;
}

function ReferenceVisual({kind,id,language,t}){
  const visual=REFERENCE_VISUALS[`${kind}:${id}`];
  const [failed,setFailed]=useState(false);
  if(!visual)return null;
  return <figure className="ref-visual-card">
    <div className="ref-visual-head"><ImageIcon size={17}/><div><small>{t('Imagem real do jogo','Real in-game image')}</small><b>{tr(visual.title,language)}</b></div></div>
    {!failed?<a className="ref-visual-image-link" href={visual.src} target="_blank" rel="noreferrer" aria-label={t('Abrir imagem em tamanho maior','Open larger image')}><img src={visual.src} alt={tr(visual.alt,language)} loading="eager" decoding="async" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/></a>:<div className="ref-visual-fallback"><ImageIcon size={26}/><b>{t('A imagem não carregou neste navegador','The image did not load in this browser')}</b><span>{t('Abra a fonte abaixo para ver o arquivo original.','Open the source below to view the original file.')}</span></div>}
    <figcaption><p>{tr(visual.caption,language)}</p><a href={visual.source} target="_blank" rel="noreferrer"><BookOpen size={14}/>{t('Página-fonte da imagem','Image source page')}<ExternalLink size={11}/></a></figcaption>
  </figure>;
}

function ReferenceDetail({kind,id}){
  const {language,t}=useLanguage();
  const section=REFERENCE_SECTIONS[kind];
  const item=referenceRecord(kind,id);
  if(!section||!item)return <div className="rdb-page ref-page"><a className="rdb-back" href={`#/${kind}`}><ChevronLeft size={17}/>{t('Voltar','Back')}</a><div className="rdb-empty"><Info size={28}/><b>{t('Ficha não encontrada','Entry not found')}</b><span>{t('A rota existe, mas esta ficha não está catalogada.','The route exists, but this entry is not cataloged.')}</span></div></div>;

  const quickFacts=item.facts.slice(0,3);
  const extraFacts=item.facts.slice(3);
  return <div className="rdb-page ref-page ref-detail-page">
    <a className="rdb-back" href={`#/${kind}`}><ChevronLeft size={17}/>{tr(section.title,language)}</a>
    <section className="rdb-detail-hero ref-detail-hero">
      <div className="rdb-detail-icon">{item.icon}</div>
      <div className="rdb-detail-copy"><div className="rdb-detail-badges"><span>{categoryLabel(item.category,t)}</span><span><ShieldCheck size={13}/>{confidenceLabel(item.confidence,t)}</span><span>{stageLabel(item.stage,t)}</span></div><h1>{tr(item.title,language)}</h1><p>{tr(item.summary,language)}</p></div>
    </section>

    <ReferenceVisual kind={kind} id={id} language={language} t={t}/>

    <section className="ref-scan" aria-label={t('Resumo rápido','Quick summary')}>
      <div className="ref-scan-head"><Sparkles size={17}/><div><small>{t('Em 20 segundos','In 20 seconds')}</small><b>{t('O que vale guardar na cabeça','What is worth remembering')}</b></div></div>
      <div className="ref-scan-grid">{quickFacts.map((fact,index)=><article key={index}><span>{index+1}</span><p>{tr(fact,language)}</p></article>)}</div>
    </section>

    {item.warning&&<div className="ref-warning"><AlertTriangle size={19}/><div><b>{t('Atenção à confiança','Confidence note')}</b><p>{tr(item.warning,language)}</p></div></div>}

    <section className="rdb-panel ref-main-panel">
      <div className="ref-section-title"><Info size={18}/><div><small>{t('Detalhes verificados','Verified details')}</small><h2>{t('Informação completa','Full information')}</h2></div></div>
      <div className="ref-fact-list">{[...quickFacts,...extraFacts].map((fact,index)=><div key={index}><span>•</span><p>{tr(fact,language)}</p></div>)}</div>
      {item.details?.length>0&&<div className="ref-detail-notes">{item.details.map((detail,index)=><article key={index}><b>{t('Como usar isso','How to use this')}</b><p>{tr(detail,language)}</p></article>)}</div>}
    </section>

    <details className="ref-more"><summary>{t('Fontes e referências','Sources & references')}</summary><div><p>{tr(REFERENCE_META.note,language)}</p><SourceList sources={item.sources} t={t}/></div></details>
  </div>;
}

function ReferenceHub({kind}){
  const {language,t}=useLanguage();
  const section=REFERENCE_SECTIONS[kind];
  const [query,setQuery]=useState(readQuery);
  const [category,setCategory]=useState('all');
  const [stage,setStage]=useState('all');

  useEffect(()=>{const sync=()=>setQuery(readQuery());window.addEventListener('hashchange',sync);window.addEventListener('app:navigation',sync);return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('app:navigation',sync);};},[]);
  if(!section)return null;
  const categories=[...new Set(section.records.map(item=>item.category))];
  const filtered=useMemo(()=>{
    const q=normalize(query);
    return section.records.filter(item=>{
      const hay=normalize(`${tr(item.title,language)} ${tr(item.summary,language)} ${item.category} ${item.stage} ${(item.facts||[]).map(x=>tr(x,language)).join(' ')}`);
      return (!q||hay.includes(q))&&(category==='all'||item.category===category)&&(stage==='all'||item.stage===stage||item.stage==='all');
    });
  },[section,query,category,stage,language]);

  const priorities=section.records.slice(0,4);
  return <div className="rdb-page ref-page">
    <section className="rdb-identity ref-identity"><div className="rdb-title-row"><span className="rdb-db-icon">{section.icon}</span><div><span className="rdb-kicker">{t('Enciclopédia pesquisada · v0.1153','Researched encyclopedia · v0.1153')}</span><h1>{tr(section.title,language)}</h1></div></div><p>{tr(section.subtitle,language)}</p><div className="rdb-principles"><span><ShieldCheck size={15}/>{t('Confiança visível','Visible confidence')}</span><span><BookOpen size={15}/>{t('Fontes por ficha','Sources per entry')}</span><span><Sparkles size={15}/>{t('Detalhe sem sobrecarga','Detail without overload')}</span></div></section>

    <section className="ref-start"><div className="ref-section-title"><Sparkles size={18}/><div><small>{t('Comece por aqui','Start here')}</small><h2>{t('Assuntos que resolvem mais dúvidas','Topics that answer the most questions')}</h2></div></div><div>{priorities.map(item=><a href={`#/${kind}/${item.id}`} key={item.id}><span>{item.icon}</span><div><b>{tr(item.title,language)}</b><p>{tr(item.summary,language)}</p></div><ChevronRight size={17}/></a>)}</div></section>

    <section className="ref-discovery">
      <label className="rdb-search ref-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar nesta categoria…','Search this category…')} aria-label={t('Buscar nesta categoria','Search this category')}/></label>
      <details className="ref-filters"><summary><Filter size={15}/>{t('Refinar resultados','Refine results')} <span>{filtered.length}/{section.records.length}</span></summary><div className="ref-filter-groups"><div><small>{t('Tema','Topic')}</small><div><button className={category==='all'?'active':''} type="button" onClick={()=>setCategory('all')}>{t('Todos','All')}</button>{categories.map(id=><button className={category===id?'active':''} type="button" onClick={()=>setCategory(id)} key={id}>{categoryLabel(id,t)}</button>)}</div></div><div><small>{t('Fase','Stage')}</small><div>{['all','early','mid','late'].map(id=><button className={stage===id?'active':''} type="button" onClick={()=>setStage(id)} key={id}>{id==='all'?t('Todas','All'):stageLabel(id,t)}</button>)}</div></div></div></details>
    </section>

    <section className="ref-grid">{filtered.map(item=><a className="ref-card" href={`#/${kind}/${item.id}`} key={item.id}><span className="ref-card-icon">{item.icon}</span><div><div className="ref-card-meta"><small>{categoryLabel(item.category,t)}</small><span>{confidenceLabel(item.confidence,t)}</span></div><h2>{tr(item.title,language)}</h2><p>{tr(item.summary,language)}</p><b>{t('Abrir ficha','Open entry')} <ChevronRight size={14}/></b></div></a>)}</section>
    {filtered.length===0&&<div className="rdb-empty"><Search size={26}/><b>{t('Nada encontrado','Nothing found')}</b><span>{t('Limpe um filtro ou tente outro termo.','Clear a filter or try another term.')}</span></div>}
  </div>;
}

export default function ReferenceDatabasePage({kind,routeId}){return routeId?<ReferenceDetail kind={kind} id={routeId}/>:<ReferenceHub kind={kind}/>;}
