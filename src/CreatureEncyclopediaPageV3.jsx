import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  ImageOff,
  Info,
  MapPin,
  PackageOpen,
  PlayCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Swords,
  Target,
  Zap
} from 'lucide-react';
import './creatureAuditRuntime';
import { allCatalogCreatures, acquisitionKind, catalogMeta } from './creatureCatalogData';
import { enrichCreature, nonCapturableCreatures, captureStatusMeta } from './creatureCatalogExtras';
import './creatureEncyclopediaV3.css';

const GENERIC_VIDEO_ID = 'ubfv-IkrBuk';
const wikiImageCache = new Map();

const normalize = (value='') => String(value)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g,'')
  .toLowerCase();

function guaranteedObtain(creature){
  if(Array.isArray(creature.obtain) && creature.obtain.length) return creature.obtain;

  if(creature.captureStatus === 'noncapturable') {
    return [
      'Esta entidade não pode ser capturada nem adicionada ao exército de criaturas.',
      creature.attraction ? `Para encontrá-la, vá até: ${creature.attraction}.` : 'Ela aparece como parte do mapa, de uma atividade ou de uma luta específica.'
    ];
  }

  if(creature.captureStatus === 'ally') {
    return [
      'Não é capturada pela Creatures Chamber.',
      creature.attraction ? `Ela aparece/é obtida em: ${creature.attraction}.` : 'Siga a atividade associada a esta unidade aliada.'
    ];
  }

  if(creature.captureStatus === 'direct') {
    return [
      'Complete a atividade ou co-op associado até preencher a barra da criatura.',
      'Tenha uma vaga livre no exército quando a recompensa estiver disponível.',
      'Reivindique a criatura diretamente; ela não usa o processo normal de captura por feromônios.'
    ];
  }

  if(creature.category === 'event') {
    return [
      'Espere um evento ou mini-evento em que esta criatura esteja disponível.',
      'Complete a barra de atividade exigida pelo evento.',
      'Derrote a criatura quando ela aparecer e escolha capturar se houver vaga.'
    ];
  }

  return [
    creature.attraction ? `Use feromônios respeitando esta condição: ${creature.attraction}.` : 'Use feromônios para atrair uma criatura.',
    'Derrote a criatura com seus soldados.',
    'Escolha “Capturar” e mantenha espaço livre para concluir o processo.'
  ];
}

const encyclopediaCreatures = [
  ...allCatalogCreatures.map(enrichCreature),
  ...nonCapturableCreatures
].map(c => ({...c, obtain: guaranteedObtain(c)}));

export { encyclopediaCreatures };

function wikiTitle(creature){
  if(!creature.sourceUrl) return creature.name;
  try{
    const url = new URL(creature.sourceUrl);
    const marker = '/wiki/';
    const index = url.pathname.indexOf(marker);
    if(index === -1) return creature.name;
    return decodeURIComponent(url.pathname.slice(index + marker.length)).replaceAll('_',' ');
  }catch{
    return creature.name;
  }
}

async function fetchWikiPageImage(creature){
  const key = creature.id;
  if(wikiImageCache.has(key)) return wikiImageCache.get(key);

  const title = wikiTitle(creature);
  const endpoint = `https://pocketants.fandom.com/api.php?action=query&prop=pageimages&piprop=original|thumbnail&pithumbsize=900&redirects=1&format=json&origin=*&titles=${encodeURIComponent(title)}`;
  try{
    const response = await fetch(endpoint, { mode:'cors' });
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const pages = Object.values(data?.query?.pages || {});
    const page = pages.find(p => !p.missing) || pages[0];
    const source = page?.original?.source || page?.thumbnail?.source || null;
    wikiImageCache.set(key, source);
    return source;
  }catch{
    wikiImageCache.set(key, null);
    return null;
  }
}

function useInView(rootMargin='320px'){
  const ref = useRef(null);
  const [visible,setVisible] = useState(false);
  useEffect(()=>{
    const node = ref.current;
    if(!node || visible) return;
    if(!('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){
        setVisible(true);
        observer.disconnect();
      }
    },{rootMargin});
    observer.observe(node);
    return ()=>observer.disconnect();
  },[visible,rootMargin]);
  return [ref,visible];
}

function CreatureImage({creature, eager=false, className=''}){
  const [hostRef,inView] = useInView(eager ? '1200px' : '320px');
  const [wikiSrc,setWikiSrc] = useState(()=>wikiImageCache.get(creature.id) || null);
  const [wikiResolved,setWikiResolved] = useState(()=>wikiImageCache.has(creature.id));
  const [candidateIndex,setCandidateIndex] = useState(0);

  const fallbackCandidates = useMemo(() => {
    const candidates = (creature.imageCandidates || [creature.imageUrl])
      .filter(Boolean)
      .filter(src => !String(src).includes(GENERIC_VIDEO_ID));
    return [...new Set(candidates)];
  },[creature]);

  useEffect(()=>{
    if(!(eager || inView) || wikiResolved) return;
    let cancelled = false;
    fetchWikiPageImage(creature).then(src=>{
      if(cancelled) return;
      setWikiSrc(src);
      setWikiResolved(true);
    });
    return ()=>{ cancelled = true; };
  },[creature,eager,inView,wikiResolved]);

  const fallback = fallbackCandidates[candidateIndex] || null;
  const src = wikiSrc || fallback;

  const handleError = () => {
    if(wikiSrc){
      wikiImageCache.set(creature.id,null);
      setWikiSrc(null);
      setWikiResolved(true);
      return;
    }
    if(candidateIndex < fallbackCandidates.length - 1){
      setCandidateIndex(i=>i+1);
    }else{
      setCandidateIndex(fallbackCandidates.length);
    }
  };

  return <div ref={hostRef} className={`ce3-image-host ${className}`}>
    {src ? <img
      src={src}
      alt={`Imagem de ${creature.name} em Pocket Ants`}
      loading={eager?'eager':'lazy'}
      decoding="async"
      fetchPriority={eager?'high':'low'}
      onError={handleError}
    /> : <div className="ce3-image-fallback"><ImageOff size={25}/><strong>{creature.name}</strong><span>{wikiResolved?'Imagem não encontrada na fonte principal':'Carregando imagem da ficha…'}</span></div>}
  </div>;
}

function statusLabel(creature){
  if(creature.entityType === 'boss') return 'Boss · não capturável';
  return captureStatusMeta?.[creature.captureStatus]?.label || (creature.captureStatus === 'ally' ? 'Aliado' : 'Entidade');
}

function acquisitionLabel(creature){
  if(creature.entityType === 'boss') return 'Boss / atividade';
  if(creature.captureStatus === 'noncapturable') return 'Mapa / atividade';
  if(creature.captureStatus === 'ally') return 'Aliado / sistema';
  if(creature.captureStatus === 'direct') return 'Co-op / barra';
  const kind = acquisitionKind(creature);
  if(kind === 'event') return 'Evento';
  if(kind === 'special-item') return 'Item especial';
  if(kind === 'coop') return 'Co-op';
  return 'Feromônios';
}

function Verification({creature}){
  const review = creature.verification === 'review';
  return <span className={`ce3-verify ${review?'review':'ok'}`}>
    {review?<AlertTriangle size={13}/>:<ShieldCheck size={13}/>} {review?'Conflito de fonte':'Revisado'}
  </span>;
}

function MiniStat({label,value}){
  if(value === undefined || value === null || Number.isNaN(Number(value))) return null;
  return <div className="ce3-mini-stat"><span>{label}</span><b>{Math.round(Number(value))}%</b></div>;
}

function FullStat({label,value}){
  if(value === undefined || value === null || Number.isNaN(Number(value))) return null;
  const safe = Math.max(0,Math.min(100,Number(value)));
  return <div className="ce3-stat"><div><span>{label}</span><strong>{safe}%</strong></div><div className="ce3-stat-track"><i style={{width:`${safe}%`}}/></div></div>;
}

function TutorialLink({creature, compact=false}){
  const dedicated = creature.videos?.find(v=>v.type==='dedicado') || creature.videos?.[0];
  const href = dedicated?.url || creature.youtubeSearchUrl;
  if(!href) return null;
  return <a className={compact?'ce3-tutorial compact':'ce3-tutorial'} href={href} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}>
    <PlayCircle size={15}/> {compact?'Tutorial':(dedicated?.title || 'Buscar tutorial')}
  </a>;
}

function CreatureCard({creature}){
  const stats = creature.stats || {};
  const firstEvent = creature.eventHistory?.[0];
  return <article className="ce3-card">
    <a className="ce3-card-cover" href={`#/creatures/${encodeURIComponent(creature.id)}`} aria-label={`Abrir ficha de ${creature.name}`}>
      <CreatureImage creature={creature}/>
      <div className="ce3-cover-badges"><span>{creature.rarity}</span><span>{statusLabel(creature)}</span></div>
    </a>

    <div className="ce3-card-body">
      <div className="ce3-card-head">
        <div><h2>{creature.name}</h2>{creature.variantOf && creature.variantOf !== '—' && <small>Variante de {creature.variantOf}</small>}</div>
        <Verification creature={creature}/>
      </div>

      <p className="ce3-description">{creature.description}</p>

      <div className="ce3-quick-grid">
        <div><span>Método</span><b>{acquisitionLabel(creature)}</b></div>
        <div><span>Captura</span><b>{creature.captureTime || '—'}</b></div>
        <div><span>Body Parts</span><b>{creature.bodyParts ?? 'N/A'}</b></div>
        <div><span>Origem</span><b>{firstEvent || creature.subcategory || creature.category || 'Jogo base'}</b></div>
      </div>

      <div className="ce3-obtain-preview"><PackageOpen size={16}/><div><b>Como obter</b><span>{creature.obtain?.[0]}</span></div></div>

      {creature.attraction && <div className="ce3-condition"><MapPin size={15}/><span>{creature.attraction}</span></div>}

      {['damage','health','attackRate','speed'].some(k=>stats[k]!==undefined && stats[k]!==null) && <div className="ce3-mini-stats">
        <MiniStat label="Dano" value={stats.damage}/>
        <MiniStat label="Vida" value={stats.health}/>
        <MiniStat label="Atk" value={stats.attackRate}/>
        <MiniStat label="Vel" value={stats.speed}/>
      </div>}

      {creature.ability && <div className="ce3-ability"><Zap size={15}/><span><b>Habilidade:</b> {creature.ability}</span></div>}

      {(creature.roles||[]).length>0 && <div className="ce3-role-scroll">{creature.roles.map(role=><span key={role}>{role}</span>)}</div>}

      <div className="ce3-card-actions">
        <a className="ce3-open" href={`#/creatures/${encodeURIComponent(creature.id)}`}>Ficha completa <ChevronRight size={16}/></a>
        <TutorialLink creature={creature} compact/>
      </div>
    </div>
  </article>;
}

const categoryShortcuts = [
  {id:'all',label:'Todas'},
  {id:'capturable',label:'Capturáveis'},
  {id:'special',label:'Especiais / Eventos'},
  {id:'legendary',label:'Lendárias / Co-op'},
  {id:'boss',label:'Bosses'},
  {id:'hostile',label:'Hostis / NPCs'},
  {id:'ally',label:'Pets / Aliados'}
];

function EncyclopediaList(){
  const [query,setQuery] = useState('');
  const [shortcut,setShortcut] = useState('all');
  const [rarity,setRarity] = useState('all');
  const [acquisition,setAcquisition] = useState('all');
  const [sort,setSort] = useState('name');

  const rarities = useMemo(()=>['all',...new Set(encyclopediaCreatures.map(c=>c.rarity).filter(Boolean))],[]);

  const filtered = useMemo(()=>{
    const q = normalize(query.trim());
    const list = encyclopediaCreatures.filter(c=>{
      const text = normalize([
        c.name,c.description,c.rarity,c.attraction,c.subcategory,c.ability,
        ...(c.roles||[]),...(c.eventHistory||[]),...(c.obtain||[]),...(c.battleNotes||[])
      ].filter(Boolean).join(' '));

      const shortcutOk = shortcut === 'all' ||
        (shortcut === 'capturable' && c.captureStatus === 'capturable' && c.category !== 'event') ||
        (shortcut === 'special' && c.category === 'event') ||
        (shortcut === 'legendary' && (c.captureStatus === 'direct' || c.rarity === 'Lendária')) ||
        (shortcut === 'boss' && c.entityType === 'boss') ||
        (shortcut === 'hostile' && c.captureStatus === 'noncapturable' && c.entityType !== 'boss') ||
        (shortcut === 'ally' && c.captureStatus === 'ally');

      const rarityOk = rarity === 'all' || c.rarity === rarity;
      const kind = acquisitionKind(c);
      const acquisitionOk = acquisition === 'all' ||
        (acquisition === 'pheromone' && kind === 'pheromone') ||
        (acquisition === 'event' && kind === 'event') ||
        (acquisition === 'coop' && (kind === 'coop' || c.captureStatus === 'direct')) ||
        (acquisition === 'world' && ['noncapturable','ally'].includes(c.captureStatus));

      return (!q || text.includes(q)) && shortcutOk && rarityOk && acquisitionOk;
    });

    return [...list].sort((a,b)=>{
      if(sort === 'rarity') return String(a.rarity).localeCompare(String(b.rarity),'pt-BR') || a.name.localeCompare(b.name,'pt-BR');
      if(sort === 'newest') {
        const ay = Number(a.eventHistory?.[0]?.match(/\d{4}/)?.[0]) || 0;
        const by = Number(b.eventHistory?.[0]?.match(/\d{4}/)?.[0]) || 0;
        return by-ay || a.name.localeCompare(b.name,'pt-BR');
      }
      return a.name.localeCompare(b.name,'pt-BR');
    });
  },[query,shortcut,rarity,acquisition,sort]);

  const specials = encyclopediaCreatures.filter(c=>c.category==='event').length;
  const capturable = encyclopediaCreatures.filter(c=>c.captureStatus==='capturable').length;
  const bosses = encyclopediaCreatures.filter(c=>c.entityType==='boss').length;

  return <main className="ce3-page">
    <section className="ce3-hero">
      <div><span className="ce3-kicker"><Sparkles size={14}/> Categoria · Criaturas</span><h1>Enciclopédia de criaturas</h1><p>A categoria mostra a imagem, descrição, obtenção e dados principais de cada criatura. Toque em uma ficha para abrir o conteúdo completo.</p></div>
      <div className="ce3-summary"><div><strong>{encyclopediaCreatures.length}</strong><span>entradas</span></div><div><strong>{capturable}</strong><span>capturáveis</span></div><div><strong>{specials}</strong><span>especiais</span></div><div><strong>{bosses}</strong><span>bosses</span></div></div>
    </section>

    <nav className="ce3-tabs" aria-label="Subcategorias de criaturas">
      {categoryShortcuts.map(item=><button key={item.id} className={shortcut===item.id?'active':''} onClick={()=>setShortcut(item.id)}>{item.label}</button>)}
    </nav>

    <section className="ce3-research"><ShieldCheck size={18}/><div><b>Dados revisados em 05/09/2026</b><span>Condições, stats e formas de obtenção são cruzados com a wiki comunitária atual. Divergências continuam marcadas na própria ficha.</span></div></section>

    <div className="ce3-search-row">
      <label className="ce3-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar criatura, habilidade, evento, condição…"/></label>
      <details className="ce3-filters">
        <summary><SlidersHorizontal size={17}/> Filtros <span>{filtered.length}</span></summary>
        <div>
          <label><span>Raridade</span><select value={rarity} onChange={e=>setRarity(e.target.value)}>{rarities.map(r=><option key={r} value={r}>{r==='all'?'Todas':r}</option>)}</select></label>
          <label><span>Como consegue</span><select value={acquisition} onChange={e=>setAcquisition(e.target.value)}><option value="all">Todos</option><option value="pheromone">Feromônios</option><option value="event">Evento</option><option value="coop">Co-op / barra</option><option value="world">Mapa / NPC</option></select></label>
          <label><span>Ordenar</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="name">Nome A–Z</option><option value="rarity">Raridade</option><option value="newest">Mais recentes</option></select></label>
        </div>
      </details>
    </div>

    <div className="ce3-result-line"><b>{filtered.length}</b> resultados <span>· cards agora mostram os dados principais sem precisar abrir</span></div>

    {filtered.length ? <section className="ce3-grid">{filtered.map(c=><CreatureCard key={c.id} creature={c}/>)}</section> : <div className="ce3-empty"><Search size={28}/><b>Nada encontrado</b><span>Remova um filtro ou pesquise outro termo.</span></div>}
  </main>;
}

function Fact({icon:Icon,label,value}){
  if(value===undefined || value===null || value==='') return null;
  return <div className="ce3-fact"><Icon size={16}/><span>{label}</span><b>{value}</b></div>;
}

function EncyclopediaDetail({id}){
  const creature = encyclopediaCreatures.find(c=>c.id===id);
  if(!creature) return <main className="ce3-page"><a className="ce3-back" href="#/creatures"><ChevronLeft size={17}/> Voltar</a><div className="ce3-empty"><Info/><b>Criatura não encontrada</b></div></main>;

  const stats = creature.stats || {};
  const hasStats = ['damage','health','attackRate','speed'].some(k=>stats[k]!==undefined && stats[k]!==null);
  const videos = creature.videos || [];

  return <main className="ce3-page ce3-detail-page">
    <a className="ce3-back" href="#/creatures"><ChevronLeft size={17}/> Voltar para Criaturas</a>

    <section className="ce3-detail-hero">
      <CreatureImage creature={creature} eager className="detail"/>
      <div className="ce3-detail-copy">
        <div className="ce3-badges"><span>{creature.rarity}</span><span>{statusLabel(creature)}</span><Verification creature={creature}/></div>
        <h1>{creature.name}</h1>
        {creature.variantOf && creature.variantOf !== '—' && <p className="ce3-variant">Variante de <b>{creature.variantOf}</b></p>}
        <p className="ce3-lead">{creature.description}</p>
        {(creature.roles||[]).length>0 && <div className="ce3-role-scroll large">{creature.roles.map(r=><span key={r}>{r}</span>)}</div>}
        <div className="ce3-hero-actions"><TutorialLink creature={creature}/>{creature.sourceUrl && <a href={creature.sourceUrl} target="_blank" rel="noreferrer"><BookOpen size={15}/> Fonte principal</a>}</div>
      </div>
    </section>

    <section className="ce3-detail-grid">
      <article className="ce3-panel ce3-obtain-panel">
        <div className="ce3-panel-title"><PackageOpen/><div><h2>Como obter</h2><span>{acquisitionLabel(creature)}</span></div></div>
        <ol>{creature.obtain.map((step,i)=><li key={`${i}-${step}`}><span>{i+1}</span><p>{step}</p></li>)}</ol>
        {creature.attraction && <div className="ce3-location"><MapPin size={16}/><span><b>Condição / local:</b> {creature.attraction}</span></div>}
        {creature.researchWarning && <div className="ce3-warning"><AlertTriangle size={16}/><span>{creature.researchWarning}</span></div>}
      </article>

      <article className="ce3-panel">
        <div className="ce3-panel-title"><BarChart3/><div><h2>Stats e dados</h2><span>Valores de referência</span></div></div>
        {hasStats ? <div className="ce3-stats"><FullStat label="Dano" value={stats.damage}/><FullStat label="Vida" value={stats.health}/><FullStat label="Attack Rate" value={stats.attackRate}/><FullStat label="Velocidade" value={stats.speed}/></div> : <p className="ce3-muted">Ainda não há stats comparáveis confirmados para esta entrada.</p>}
        <div className="ce3-facts">
          <Fact icon={Clock3} label="Tempo de captura" value={creature.captureTime || '—'}/>
          <Fact icon={PackageOpen} label="Body Parts" value={creature.bodyParts ?? 'N/A'}/>
          <Fact icon={Target} label="Método" value={acquisitionLabel(creature)}/>
          {creature.eventHistory?.[0] && <Fact icon={Sparkles} label="Origem" value={creature.eventHistory[0]}/>} 
        </div>
      </article>
    </section>

    {creature.ability && <section className="ce3-panel ce3-wide ce3-ability-panel"><div className="ce3-panel-title"><Zap/><div><h2>Habilidade</h2><span>Mecânica especial conhecida</span></div></div><p>{creature.ability}</p></section>}

    {(creature.battleNotes||[]).length>0 && <section className="ce3-panel ce3-wide"><div className="ce3-panel-title"><Swords/><div><h2>Como funciona / combate</h2><span>Detalhes separados da descrição principal</span></div></div><ul className="ce3-notes">{creature.battleNotes.map((n,i)=><li key={`${i}-${n}`}>{n}</li>)}</ul></section>}

    {creature.eventHistory?.length>0 && <section className="ce3-panel ce3-wide"><div className="ce3-panel-title"><Sparkles/><div><h2>Histórico de eventos</h2><span>Ocorrências registradas na base</span></div></div><div className="ce3-event-scroll">{creature.eventHistory.map(e=><span key={e}>{e}</span>)}</div></section>}

    <section className="ce3-panel ce3-wide">
      <div className="ce3-panel-title"><PlayCircle/><div><h2>Tutoriais e vídeos</h2><span>Material para ver a criatura e o processo no jogo</span></div></div>
      <div className="ce3-video-list">
        {videos.map((video,i)=><a href={video.url} target="_blank" rel="noreferrer" key={`${video.url}-${i}`}><PlayCircle size={18}/><div><b>{video.title}</b><span>{video.creator || 'YouTube'}{video.type ? ` · ${video.type}` : ''}</span></div><ExternalLink size={14}/></a>)}
        {creature.youtubeSearchUrl && <a href={creature.youtubeSearchUrl} target="_blank" rel="noreferrer"><Search size={18}/><div><b>Pesquisar mais tutoriais</b><span>YouTube · busca por {creature.name}</span></div><ExternalLink size={14}/></a>}
      </div>
    </section>

    <section className="ce3-panel ce3-wide ce3-source">
      <div><h2>Fonte e revisão</h2><p>Revisado em {creature.verifiedAt?.split('-').reverse().join('/') || catalogMeta.checkedAt?.split('-').reverse().join('/') || '05/09/2026'}. Opinião comunitária não é apresentada como atributo oficial.</p></div>
      <div className="ce3-source-actions"><Verification creature={creature}/>{creature.sourceUrl && <a href={creature.sourceUrl} target="_blank" rel="noreferrer">Abrir fonte <ExternalLink size={14}/></a>}</div>
    </section>
  </main>;
}

export default function CreatureEncyclopediaPageV3({routeId=null}){
  return routeId ? <EncyclopediaDetail id={routeId}/> : <EncyclopediaList/>;
}
