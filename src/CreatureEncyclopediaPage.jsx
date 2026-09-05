import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck, AlertTriangle, SlidersHorizontal, Sparkles, MapPin, Clock3, PackageOpen, Swords, Info, ImageOff } from 'lucide-react';
import './creatureAuditRuntime';
import { allCatalogCreatures, catalogMeta, acquisitionKind } from './creatureCatalogData';
import { enrichCreature, nonCapturableCreatures, captureStatusMeta } from './creatureCatalogExtras';
import './creatureEncyclopedia.css';

const normalize = (value='') => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

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
      'Espere um evento/mini-evento em que esta criatura esteja disponível.',
      'Complete a barra de atividade exigida pelo evento.',
      'Derrote a criatura quando ela aparecer e escolha capturar se houver vaga.'
    ];
  }

  return [
    creature.attraction ? `Use feromônios respeitando esta condição: ${creature.attraction}.` : 'Use feromônios para atrair uma criatura.',
    'Derrote a criatura com seus soldados.',
    'Escolha “Capturar” e mantenha espaço livre na coleção/exército para concluir o processo.'
  ];
}

const encyclopediaCreatures = [
  ...allCatalogCreatures.map(enrichCreature),
  ...nonCapturableCreatures
].map(c => ({...c, obtain: guaranteedObtain(c)}));

export { encyclopediaCreatures };

function statusLabel(creature){
  return captureStatusMeta?.[creature.captureStatus]?.label || (creature.entityType === 'boss' ? 'Boss' : 'Entidade');
}

function acquisitionLabel(creature){
  if(creature.captureStatus === 'noncapturable') return creature.entityType === 'boss' ? 'Boss / atividade' : 'Mapa / NPC';
  if(creature.captureStatus === 'ally') return 'Aliado / sistema';
  if(creature.captureStatus === 'direct') return 'Co-op / recompensa direta';
  const kind = acquisitionKind(creature);
  if(kind === 'event') return 'Evento';
  if(kind === 'special-item') return 'Item especial';
  if(kind === 'coop') return 'Co-op';
  return 'Feromônios';
}

function CreatureImage({creature, className=''}){
  const candidates = useMemo(() => (creature.imageCandidates || [creature.imageUrl]).filter(Boolean).filter((v,i,a)=>a.indexOf(v)===i), [creature]);
  const [index,setIndex] = useState(0);
  const [failed,setFailed] = useState(false);
  if(failed || !candidates[index]) return <div className={`ce-image-fallback ${className}`}><ImageOff size={22}/><span>{creature.name}</span></div>;
  return <img
    className={className}
    src={candidates[index]}
    alt={`Imagem de ${creature.name} em Pocket Ants`}
    loading="lazy"
    decoding="async"
    fetchPriority="low"
    referrerPolicy="no-referrer"
    onError={()=> index < candidates.length-1 ? setIndex(index+1) : setFailed(true)}
  />;
}

function Stat({label,value}){
  if(value === undefined || value === null) return null;
  const safe = Math.max(0,Math.min(100,Number(value)));
  return <div className="ce-stat"><div><span>{label}</span><strong>{safe}%</strong></div><div className="ce-stat-track"><i style={{width:`${safe}%`}}/></div></div>;
}

function Verification({creature}){
  const review = creature.verification === 'review';
  return <span className={`ce-verify ${review?'review':'ok'}`}>{review?<AlertTriangle size={13}/>:<ShieldCheck size={13}/>} {review?'Fonte conflitante / revisar':'Revisado'}</span>;
}

function CreatureCard({creature}){
  return <a className="ce-card" href={`#/creatures/${encodeURIComponent(creature.id)}`}>
    <div className="ce-card-image"><CreatureImage creature={creature}/><span className="ce-rarity">{creature.rarity}</span></div>
    <div className="ce-card-body">
      <div className="ce-card-title"><div><h2>{creature.name}</h2><span>{statusLabel(creature)}</span></div><ChevronRight size={19}/></div>
      <p>{creature.description}</p>
      <div className="ce-card-obtain"><PackageOpen size={15}/><span><b>Como obter:</b> {creature.obtain[0]}</span></div>
      <div className="ce-role-scroll">{(creature.roles||[]).map(r=><span key={r}>{r}</span>)}</div>
      <div className="ce-card-footer"><span>{acquisitionLabel(creature)}</span><Verification creature={creature}/></div>
    </div>
  </a>;
}

function EncyclopediaList(){
  const [query,setQuery] = useState('');
  const [status,setStatus] = useState('all');
  const [rarity,setRarity] = useState('all');
  const [acquisition,setAcquisition] = useState('all');
  const [sort,setSort] = useState('name');

  const rarities = useMemo(()=>['all',...new Set(encyclopediaCreatures.map(c=>c.rarity).filter(Boolean))],[]);
  const filtered = useMemo(()=>{
    const q = normalize(query.trim());
    const list = encyclopediaCreatures.filter(c=>{
      const text = normalize([c.name,c.description,c.rarity,c.attraction,c.subcategory,...(c.roles||[]),...(c.eventHistory||[]),...(c.obtain||[])].filter(Boolean).join(' '));
      const statusOk = status === 'all' ||
        (status === 'capturable' && c.captureStatus === 'capturable') ||
        (status === 'direct' && c.captureStatus === 'direct') ||
        (status === 'boss' && c.entityType === 'boss') ||
        (status === 'world' && ['noncapturable','ally'].includes(c.captureStatus));
      const rarityOk = rarity === 'all' || c.rarity === rarity;
      const kind = acquisitionKind(c);
      const acquisitionOk = acquisition === 'all' ||
        (acquisition === 'pheromone' && kind === 'pheromone') ||
        (acquisition === 'event' && kind === 'event') ||
        (acquisition === 'coop' && (kind === 'coop' || c.captureStatus === 'direct')) ||
        (acquisition === 'world' && ['noncapturable','ally'].includes(c.captureStatus));
      return (!q || text.includes(q)) && statusOk && rarityOk && acquisitionOk;
    });
    return [...list].sort((a,b)=>{
      if(sort === 'rarity') return String(a.rarity).localeCompare(String(b.rarity),'pt-BR') || a.name.localeCompare(b.name,'pt-BR');
      if(sort === 'newest') return (Number(b.eventHistory?.[0]?.match(/\d{4}/)?.[0])||0) - (Number(a.eventHistory?.[0]?.match(/\d{4}/)?.[0])||0) || a.name.localeCompare(b.name,'pt-BR');
      return a.name.localeCompare(b.name,'pt-BR');
    });
  },[query,status,rarity,acquisition,sort]);

  const count = encyclopediaCreatures.length;
  const specials = encyclopediaCreatures.filter(c=>c.category==='event').length;
  const bosses = encyclopediaCreatures.filter(c=>c.entityType==='boss').length;

  return <main className="ce-page">
    <section className="ce-hero">
      <div className="ce-hero-copy"><span className="ce-kicker"><Sparkles size={14}/> Criaturas · navegação principal</span><h1>Enciclopédia de criaturas</h1><p>Uma única base para criaturas normais, especiais, lendárias, bosses, hostis, NPCs e aliados — com descrição revisada e <b>Como obter</b> em todas as fichas.</p></div>
      <div className="ce-summary"><div><strong>{count}</strong><span>entidades</span></div><div><strong>{specials}</strong><span>especiais</span></div><div><strong>{bosses}</strong><span>bosses</span></div></div>
    </section>

    <section className="ce-research-note"><ShieldCheck size={18}/><div><b>Revisão 05/09/2026</b><span>O jogo oficial foi atualizado em 25/08/2026. Dados finos vêm da PocketAnts Wiki; quando páginas comunitárias discordam, a ficha mostra o conflito em vez de inventar uma resposta.</span></div></section>

    <section className="ce-general-guide">
      <div><PackageOpen/><span><b>Normais / incomuns / raras:</b> usam feromônios; algumas dependem de horário, clima ou item especial.</span></div>
      <div><Swords/><span><b>Lendárias:</b> são reivindicadas por barra de atividade/co-op, não por feromônio.</span></div>
      <div><Sparkles/><span><b>Especiais:</b> dependem de evento/mini-evento e da barra de atividade correspondente.</span></div>
    </section>

    <details className="ce-filter-shell" open>
      <summary><SlidersHorizontal size={17}/><span>Pesquisar e filtrar</span><small>{filtered.length} resultados</small></summary>
      <div className="ce-filter-grid">
        <label className="ce-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar criatura, habilidade, evento, condição..."/></label>
        <label><span>Tipo</span><select value={status} onChange={e=>setStatus(e.target.value)}><option value="all">Todos</option><option value="capturable">Capturáveis</option><option value="direct">Obtidas direto</option><option value="boss">Bosses</option><option value="world">Hostis / NPCs / aliados</option></select></label>
        <label><span>Raridade</span><select value={rarity} onChange={e=>setRarity(e.target.value)}>{rarities.map(r=><option key={r} value={r}>{r==='all'?'Todas':r}</option>)}</select></label>
        <label><span>Como consegue</span><select value={acquisition} onChange={e=>setAcquisition(e.target.value)}><option value="all">Todos os métodos</option><option value="pheromone">Feromônios</option><option value="event">Eventos</option><option value="coop">Co-op / barra</option><option value="world">Mapa / NPC</option></select></label>
        <label><span>Ordenar</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="name">Nome A–Z</option><option value="rarity">Raridade</option><option value="newest">Eventos mais recentes</option></select></label>
      </div>
    </details>

    {filtered.length ? <section className="ce-grid">{filtered.map(c=><CreatureCard key={c.id} creature={c}/>)}</section> : <div className="ce-empty"><Search size={26}/><b>Nenhuma criatura encontrada</b><span>Tente remover um filtro ou usar outro termo.</span></div>}
  </main>;
}

function EncyclopediaDetail({id}){
  const creature = encyclopediaCreatures.find(c=>c.id===id);
  if(!creature) return <main className="ce-page"><a className="ce-back" href="#/creatures"><ChevronLeft size={17}/> Voltar à enciclopédia</a><div className="ce-empty"><Info/><b>Criatura não encontrada</b></div></main>;
  const hasStats = ['damage','health','attackRate','speed'].some(k=>creature.stats?.[k]!==undefined && creature.stats?.[k]!==null);
  return <main className="ce-page ce-detail-page">
    <a className="ce-back" href="#/creatures"><ChevronLeft size={17}/> Voltar à enciclopédia</a>
    <section className="ce-detail-hero">
      <div className="ce-detail-image"><CreatureImage creature={creature}/></div>
      <div className="ce-detail-copy"><div className="ce-badge-row"><span className="ce-rarity static">{creature.rarity}</span><span>{statusLabel(creature)}</span><Verification creature={creature}/></div><h1>{creature.name}</h1>{creature.variantOf && creature.variantOf!=='—' && <p className="ce-variant">Variante de <b>{creature.variantOf}</b></p>}<p className="ce-lead">{creature.description}</p><div className="ce-role-scroll large">{(creature.roles||[]).map(r=><span key={r}>{r}</span>)}</div></div>
    </section>

    <section className="ce-detail-grid">
      <article className="ce-panel ce-obtain-panel"><div className="ce-panel-title"><PackageOpen size={20}/><div><h2>Como obter</h2><span>{acquisitionLabel(creature)}</span></div></div><ol>{creature.obtain.map((step,i)=><li key={`${step}-${i}`}><span>{i+1}</span><p>{step}</p></li>)}</ol>{creature.attraction && <div className="ce-location"><MapPin size={16}/><span><b>Condição/local:</b> {creature.attraction}</span></div>}{creature.researchWarning && <div className="ce-warning"><AlertTriangle size={16}/><span>{creature.researchWarning}</span></div>}</article>

      <article className="ce-panel"><div className="ce-panel-title"><Swords size={20}/><div><h2>Dados e combate</h2><span>Valores de referência</span></div></div>{hasStats ? <div className="ce-stats"><Stat label="Dano" value={creature.stats?.damage}/><Stat label="Vida" value={creature.stats?.health}/><Stat label="Attack Rate" value={creature.stats?.attackRate}/><Stat label="Velocidade" value={creature.stats?.speed}/></div> : <p className="ce-muted">Esta entidade não usa a mesma tabela de stats das criaturas capturáveis ou ainda não possui números comparáveis confirmados.</p>}<div className="ce-facts"><div><Clock3/><span>Captura</span><b>{creature.captureTime || '—'}</b></div><div><PackageOpen/><span>Body Parts</span><b>{creature.bodyParts ?? 'N/A'}</b></div>{creature.ability && <div><Sparkles/><span>Habilidade</span><b>{creature.ability}</b></div>}</div></article>
    </section>

    {(creature.battleNotes||[]).length>0 && <section className="ce-panel ce-wide"><div className="ce-panel-title"><Info size={20}/><div><h2>Como funciona / observações</h2><span>Mecânicas e notas separadas da descrição principal</span></div></div><ul className="ce-notes">{creature.battleNotes.map((n,i)=><li key={`${n}-${i}`}>{n}</li>)}</ul></section>}

    {creature.eventHistory?.length>0 && <section className="ce-panel ce-wide"><h2>Histórico de eventos</h2><div className="ce-event-scroll">{creature.eventHistory.map(e=><span key={e}>{e}</span>)}</div></section>}

    <section className="ce-panel ce-wide ce-source"><div><h2>Fonte e revisão</h2><p>Última revisão da ficha: {creature.verifiedAt?.split('-').reverse().join('/') || '05/09/2026'}. A página evita transformar opinião de meta em atributo oficial.</p></div>{creature.sourceUrl && <a href={creature.sourceUrl} target="_blank" rel="noreferrer">Abrir fonte principal <ExternalLink size={14}/></a>}</section>
  </main>;
}

export default function CreatureEncyclopediaPage({routeId=null}){
  return routeId ? <EncyclopediaDetail id={routeId}/> : <EncyclopediaList/>;
}
