import React, { useMemo, useState } from 'react';
import { Bug, Search, X, PlayCircle, ExternalLink, ShieldCheck, AlertTriangle, ChevronRight, ArrowLeft, Filter, ImageOff } from 'lucide-react';
import { allCatalogCreatures, catalogMeta, acquisitionKind, acquisitionFilters } from './creatureCatalogData';
import { nonCapturableCreatures, enrichCreature, statusFilters, statusMatches, captureStatusMeta } from './creatureCatalogExtras';
import './creatureCatalog.css';

const rarityOrder = ['Todas','Comum','Incomum','Rara','Lendária','Especial','Boss','Sem raridade'];
const verifyLabel = { high:'Verificado', medium:'Comunidade verificada', review:'A revisar' };
const catalog = [...allCatalogCreatures.map(enrichCreature), ...nonCapturableCreatures];
const FALLBACK_IMAGE = 'https://img.youtube.com/vi/ubfv-IkrBuk/hqdefault.jpg';

function VerifyBadge({level}){
  return <span className={`cc-verify ${level}`}>
    {level==='review'?<AlertTriangle size={12}/>:<ShieldCheck size={12}/>} {verifyLabel[level] || 'A revisar'}
  </span>;
}

function SmartImage({creature,className='',alt=''}){
  const candidates = useMemo(()=>[...(creature.imageCandidates||[]),creature.imageUrl,FALLBACK_IMAGE].filter(Boolean).filter((v,i,a)=>a.indexOf(v)===i),[creature]);
  const [index,setIndex] = useState(0);
  const [dead,setDead] = useState(false);
  const src = candidates[index];

  if(dead || !src){
    return <div className={`cc-image-dead ${className}`}><ImageOff size={26}/><span>Imagem não encontrada</span></div>;
  }

  return <img
    className={className}
    src={src}
    alt={alt || creature.name}
    loading="lazy"
    referrerPolicy="no-referrer"
    onError={()=>{
      if(index < candidates.length-1) setIndex(index+1);
      else setDead(true);
    }}
  />;
}

function StatBar({label,value}){
  if(value === undefined || value === null) return null;
  const safe = Math.max(0, Math.min(100, Number(value)));
  return <div className="cc-stat">
    <div><span>{label}</span><strong>{safe}%</strong></div>
    <div className="cc-stat-track"><i style={{width:`${safe}%`}} /></div>
  </div>;
}

function StatusBadge({creature}){
  const meta = captureStatusMeta[creature.captureStatus] || captureStatusMeta.noncapturable;
  return <span className={`cc-status-badge s-${creature.captureStatus||'noncapturable'}`}>{meta.label}</span>;
}

function kindText(creature){
  if(creature.captureStatus==='noncapturable') return creature.entityType==='boss'?'Boss':'Hostil / NPC';
  if(creature.captureStatus==='ally') return 'Pet / aliado';
  if(creature.captureStatus==='direct') return 'Recompensa / Co-op';
  const kind = acquisitionKind(creature);
  if(kind==='event') return 'Evento';
  if(kind==='coop') return 'Co-op';
  if(kind==='special-item') return 'Item especial';
  return 'Feromônios';
}

function CreatureCard({creature,onOpen}){
  return <button className="cc-card" onClick={()=>onOpen(creature)}>
    <div className="cc-card-image">
      <SmartImage creature={creature} alt={`Imagem de ${creature.name} em Pocket Ants`} />
      <span className={`cc-rarity r-${String(creature.rarity).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-')}`}>{creature.rarity}</span>
      <StatusBadge creature={creature}/>
    </div>
    <div className="cc-card-body">
      <div className="cc-card-title"><div><h3>{creature.name}</h3>{creature.variantOf && creature.variantOf!=='—' && <small>Variante de {creature.variantOf}</small>}</div><ChevronRight size={18}/></div>
      <p>{creature.description}</p>
      <div className="cc-chip-row">
        <span>{kindText(creature)}</span>
        {creature.captureTime && <span>{creature.captureStatus==='capturable'?`Captura: ${creature.captureTime}`:creature.captureTime}</span>}
        {creature.goldenAvailable && <span>Possui versão Golden</span>}
      </div>
      <VerifyBadge level={creature.verification}/>
    </div>
  </button>
}

function Detail({creature,onBack}){
  const status = creature.captureStatus || 'noncapturable';
  const obtainingTitle = status==='capturable' ? 'Como obter e capturar' : status==='direct' ? 'Como obter' : status==='ally' ? 'Como aparece / obter' : 'Onde aparece / como enfrentar';
  const hasStats = ['damage','health','attackRate','speed'].some(k=>creature.stats?.[k]!==undefined && creature.stats?.[k]!==null);

  return <div className="cc-detail">
    <button className="cc-back" onClick={onBack}><ArrowLeft size={18}/> Voltar ao catálogo</button>
    <div className="cc-detail-hero">
      <div className="cc-detail-image-wrap"><SmartImage creature={creature} alt={`Imagem de ${creature.name} em Pocket Ants`} /><StatusBadge creature={creature}/></div>
      <div>
        <div className="cc-detail-badges"><span className="cc-rarity static">{creature.rarity}</span><VerifyBadge level={creature.verification}/></div>
        <h2>{creature.name}</h2>
        {creature.variantOf && creature.variantOf!=='—' && <p className="cc-muted">Variante de <b>{creature.variantOf}</b></p>}
        <p className="cc-lead">{creature.description}</p>
        <div className="cc-role-row">{(creature.roles||[]).map(role=><span key={role}>{role}</span>)}</div>
        {creature.goldenAvailable && <p className="cc-golden-note">Versão Golden existente: é a mesma espécie, com +1 estrela; não é contada como criatura separada.</p>}
      </div>
    </div>

    <div className="cc-detail-grid">
      <section className="cc-panel">
        <h3>📍 {obtainingTitle}</h3>
        <p className="cc-attraction"><b>Local/condição:</b> {creature.attraction}</p>
        {(creature.obtain||[]).length>0 ? <ol>{creature.obtain.map((step,i)=><li key={i}>{step}</li>)}</ol> : <p>Não há processo de captura: esta entidade faz parte do mapa, de uma atividade ou da colônia.</p>}
        {creature.eventHistory?.length>0 && <div className="cc-event-box"><b>Evento(s) confirmado(s)</b>{creature.eventHistory.map(e=><span key={e}>{e}</span>)}</div>}
        {creature.researchWarning && <div className="cc-warning"><AlertTriangle size={16}/><span>{creature.researchWarning}</span></div>}
      </section>

      <section className="cc-panel">
        <h3>📊 Dados</h3>
        {hasStats ? <>
          <StatBar label="Dano" value={creature.stats?.damage}/>
          <StatBar label="Vida" value={creature.stats?.health}/>
          <StatBar label="Attack Rate" value={creature.stats?.attackRate}/>
          <StatBar label="Velocidade" value={creature.stats?.speed}/>
        </> : <p className="cc-muted">Esta entidade não usa a mesma tabela de stats das criaturas capturáveis ou os números ainda não são comparáveis.</p>}
        <div className="cc-mini-facts">
          <div><span>Status</span><strong>{captureStatusMeta[status]?.short || 'Não capturável'}</strong></div>
          <div><span>Body Parts</span><strong>{creature.bodyParts ?? 'N/A'}</strong></div>
          <div><span>Captura</span><strong>{creature.captureTime || (status==='capturable'?'A revisar':'Não capturável')}</strong></div>
          {creature.ability && <div><span>Habilidade</span><strong>{creature.ability}</strong></div>}
        </div>
      </section>
    </div>

    {(creature.battleNotes||[]).length>0 && <section className="cc-panel cc-wide"><h3>⚔️ Observações</h3><ul>{creature.battleNotes.map((n,i)=><li key={i}>{n}</li>)}</ul></section>}

    <section className="cc-panel cc-wide">
      <h3>🎬 Tutoriais e vídeos</h3>
      <div className="cc-video-grid">
        {(creature.videos||[]).map((v,i)=><a key={`${v.url}-${i}`} href={v.url} target="_blank" rel="noreferrer" className="cc-video-card">
          <div className="cc-video-thumb"><SmartImage creature={creature} alt=""/><PlayCircle size={34}/></div>
          <div><b>{v.title}</b><span>{v.creator} · {v.type==='dedicado'?'vídeo específico':v.type==='evento'?'vídeo do evento':'guia geral'}</span></div>
        </a>)}
        <a href={creature.youtubeSearchUrl} target="_blank" rel="noreferrer" className="cc-video-card cc-search-video">
          <Search size={24}/><div><b>Buscar tutorial específico</b><span>YouTube · {creature.name}</span></div>
        </a>
      </div>
    </section>

    <section className="cc-panel cc-wide cc-source-panel">
      <div><h3>🔎 Apuração</h3><p>Revisado em {creature.verifiedAt?.split('-').reverse().join('/')} para a base {catalogMeta.gameVersion}. Imagens tentam usar primeiro arquivos reais da PocketAnts Wiki; se um arquivo histórico não existir, o site cai para a referência de vídeo disponível.</p></div>
      <a href={creature.sourceUrl} target="_blank" rel="noreferrer">Abrir fonte principal <ExternalLink size={14}/></a>
    </section>
  </div>
}

export default function CreatureCatalog(){
  const [open,setOpen] = useState(false);
  const [query,setQuery] = useState('');
  const [rarity,setRarity] = useState('Todas');
  const [acquisition,setAcquisition] = useState('all');
  const [status,setStatus] = useState('all');
  const [selected,setSelected] = useState(null);

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase();
    return catalog.filter(c=>{
      const hay = [c.name,c.rarity,c.variantOf,c.description,c.attraction,c.subcategory,...(c.roles||[]),...(c.eventHistory||[])].filter(Boolean).join(' ').toLowerCase();
      const acquisitionOk = acquisition==='all' || (c.category!=='noncapturable' && acquisitionKind(c)===acquisition);
      return (!q || hay.includes(q)) && (rarity==='Todas' || c.rarity===rarity) && acquisitionOk && statusMatches(c,status);
    });
  },[query,rarity,acquisition,status]);

  const counts = useMemo(()=>({
    army: catalog.filter(c=>c.category!=='noncapturable').length,
    capturable: catalog.filter(c=>c.captureStatus==='capturable').length,
    special: catalog.filter(c=>c.category==='event').length,
    noncapturable: catalog.filter(c=>c.captureStatus==='noncapturable').length,
    bosses: catalog.filter(c=>c.entityType==='boss').length
  }),[]);

  const close = ()=>{setOpen(false);setSelected(null)};

  return <>
    <button className="cc-fab" onClick={()=>setOpen(true)}><Bug size={19}/><span>Catálogo de criaturas</span></button>
    {open && <div className="cc-overlay" onClick={close}>
      <main className="cc-shell" onClick={e=>e.stopPropagation()}>
        <header className="cc-header">
          <div><span className="cc-kicker">Pocket Ants Wiki BR</span><h1>Enciclopédia de criaturas</h1><p>Capturáveis, especiais, lendárias, bosses, hostis, NPCs, pets e unidades da colônia — com imagens, obtenção, tutoriais e fontes.</p></div>
          <button className="cc-close" onClick={close} aria-label="Fechar"><X size={22}/></button>
        </header>

        {!selected ? <>
          <div className="cc-summary cc-summary-five">
            <div><strong>{catalog.length}</strong><span>entidades catalogadas</span></div>
            <div><strong>{counts.army}</strong><span>criaturas do exército</span></div>
            <div><strong>{counts.special}</strong><span>especiais/evento</span></div>
            <div><strong>{counts.noncapturable}</strong><span>não capturáveis</span></div>
            <div><strong>{counts.bosses}</strong><span>bosses</span></div>
          </div>

          <div className="cc-research-note"><ShieldCheck size={18}/><div><b>Revisão histórica + atual · 05/09/2026</b><span>Golden não é duplicado como espécie. Criaturas com conflito de fonte ficam marcadas para revisão em vez de ganhar um número inventado.</span></div></div>

          <div className="cc-controls">
            <label className="cc-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar Hornet, Queen Bee, boss, Valentine..." /></label>
            <div className="cc-filter-title"><Filter size={15}/> Classificação</div>
            <div className="cc-filter-row">{statusFilters.map(f=><button key={f.id} onClick={()=>setStatus(f.id)} className={status===f.id?'active':''}>{f.label}</button>)}</div>
            <div className="cc-filter-title"><Filter size={15}/> Raridade / tipo</div>
            <div className="cc-filter-row">{rarityOrder.map(r=><button key={r} onClick={()=>setRarity(r)} className={rarity===r?'active':''}>{r}</button>)}</div>
            <div className="cc-filter-title"><Filter size={15}/> Como consegue a criatura do exército</div>
            <div className="cc-filter-row">{acquisitionFilters.map(f=><button key={f.id} onClick={()=>setAcquisition(f.id)} className={acquisition===f.id?'active':''}>{f.label}</button>)}</div>
          </div>

          <div className="cc-results-head"><h2>{filtered.length} resultado{filtered.length!==1?'s':''}</h2><span>Versão verificada: {catalogMeta.gameVersion}</span></div>
          <div className="cc-grid">{filtered.map(c=><CreatureCard key={c.id} creature={c} onOpen={setSelected}/>)}</div>
          {filtered.length===0 && <div className="cc-empty">Nenhuma entidade bate com esses filtros.</div>}
        </> : <Detail creature={selected} onBack={()=>setSelected(null)}/>} 
      </main>
    </div>}
  </>;
}
