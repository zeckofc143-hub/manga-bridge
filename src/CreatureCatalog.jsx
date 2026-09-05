import React, { useMemo, useState } from 'react';
import { Bug, Search, X, PlayCircle, ExternalLink, ShieldCheck, AlertTriangle, ChevronRight, ArrowLeft, Filter } from 'lucide-react';
import { allCatalogCreatures, catalogMeta, acquisitionKind, acquisitionFilters } from './creatureCatalogData';
import './creatureCatalog.css';

const rarityOrder = ['Todas','Comum','Incomum','Rara','Lendária','Especial'];
const verifyLabel = { high:'Verificado', medium:'Comunidade verificada', review:'A revisar' };

function VerifyBadge({level}){
  return <span className={`cc-verify ${level}`}>
    {level==='review'?<AlertTriangle size={12}/>:<ShieldCheck size={12}/>} {verifyLabel[level] || 'A revisar'}
  </span>;
}

function StatBar({label,value}){
  if(value === undefined || value === null) return null;
  const safe = Math.max(0, Math.min(100, Number(value)));
  return <div className="cc-stat">
    <div><span>{label}</span><strong>{safe}%</strong></div>
    <div className="cc-stat-track"><i style={{width:`${safe}%`}} /></div>
  </div>;
}

function CreatureCard({creature,onOpen}){
  const kind = acquisitionKind(creature);
  return <button className="cc-card" onClick={()=>onOpen(creature)}>
    <div className="cc-card-image">
      <img src={creature.imageUrl} alt={`Referência visual de ${creature.name}`} loading="lazy" />
      <span className={`cc-rarity r-${creature.rarity.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}`}>{creature.rarity}</span>
    </div>
    <div className="cc-card-body">
      <div className="cc-card-title"><div><h3>{creature.name}</h3>{creature.variantOf && creature.variantOf!=='—' && <small>Variante de {creature.variantOf}</small>}</div><ChevronRight size={18}/></div>
      <p>{creature.description}</p>
      <div className="cc-chip-row">
        <span>{kind==='event'?'🎉 Evento':kind==='coop'?'🤝 Co-op':kind==='special-item'?'🍯 Item especial':'🧪 Feromônios'}</span>
        {creature.captureTime && <span>⏱ {creature.captureTime}</span>}
      </div>
      <VerifyBadge level={creature.verification}/>
    </div>
  </button>
}

function Detail({creature,onBack}){
  return <div className="cc-detail">
    <button className="cc-back" onClick={onBack}><ArrowLeft size={18}/> Voltar ao catálogo</button>
    <div className="cc-detail-hero">
      <img src={creature.imageUrl} alt={`Imagem de referência de ${creature.name}`} />
      <div>
        <div className="cc-detail-badges"><span className="cc-rarity static">{creature.rarity}</span><VerifyBadge level={creature.verification}/></div>
        <h2>{creature.name}</h2>
        {creature.variantOf && creature.variantOf!=='—' && <p className="cc-muted">Variante de <b>{creature.variantOf}</b></p>}
        <p className="cc-lead">{creature.description}</p>
        <div className="cc-role-row">{(creature.roles||[]).map(role=><span key={role}>{role}</span>)}</div>
      </div>
    </div>

    <div className="cc-detail-grid">
      <section className="cc-panel">
        <h3>📍 Como obter</h3>
        <p className="cc-attraction"><b>Condição:</b> {creature.attraction}</p>
        <ol>{(creature.obtain||[]).map((step,i)=><li key={i}>{step}</li>)}</ol>
        {creature.eventHistory?.length>0 && <div className="cc-event-box"><b>Evento(s) confirmado(s)</b>{creature.eventHistory.map(e=><span key={e}>{e}</span>)}</div>}
      </section>

      <section className="cc-panel">
        <h3>📊 Status</h3>
        <StatBar label="Dano" value={creature.stats?.damage}/>
        <StatBar label="Vida" value={creature.stats?.health}/>
        <StatBar label="Attack Rate" value={creature.stats?.attackRate}/>
        <StatBar label="Velocidade" value={creature.stats?.speed}/>
        <div className="cc-mini-facts">
          <div><span>Body Parts</span><strong>{creature.bodyParts ?? 'N/A / a revisar'}</strong></div>
          <div><span>Captura</span><strong>{creature.captureTime || 'A revisar'}</strong></div>
          {creature.ability && <div><span>Habilidade</span><strong>{creature.ability}</strong></div>}
        </div>
      </section>
    </div>

    {(creature.battleNotes||[]).length>0 && <section className="cc-panel cc-wide"><h3>⚔️ Em batalha</h3><ul>{creature.battleNotes.map((n,i)=><li key={i}>{n}</li>)}</ul></section>}

    <section className="cc-panel cc-wide">
      <h3>🎬 Tutoriais e vídeos</h3>
      <div className="cc-video-grid">
        {(creature.videos||[]).map((v,i)=><a key={`${v.url}-${i}`} href={v.url} target="_blank" rel="noreferrer" className="cc-video-card">
          <div className="cc-video-thumb"><img src={creature.imageUrl} alt=""/><PlayCircle size={34}/></div>
          <div><b>{v.title}</b><span>{v.creator} · {v.type==='dedicado'?'vídeo específico':v.type==='evento'?'vídeo do evento':'guia geral'}</span></div>
        </a>)}
        <a href={creature.youtubeSearchUrl} target="_blank" rel="noreferrer" className="cc-video-card cc-search-video">
          <Search size={24}/><div><b>Buscar tutoriais recentes</b><span>YouTube · pesquisa por {creature.name}</span></div>
        </a>
      </div>
    </section>

    <section className="cc-panel cc-wide cc-source-panel">
      <div><h3>🔎 Apuração</h3><p>Revisado em {creature.verifiedAt?.split('-').reverse().join('/')} para a base do jogo {catalogMeta.gameVersion}. A wiki comunitária é útil, mas dados recentes podem mudar depois de updates.</p></div>
      <a href={creature.sourceUrl} target="_blank" rel="noreferrer">Abrir fonte principal <ExternalLink size={14}/></a>
    </section>
  </div>
}

export default function CreatureCatalog(){
  const [open,setOpen] = useState(false);
  const [query,setQuery] = useState('');
  const [rarity,setRarity] = useState('Todas');
  const [acquisition,setAcquisition] = useState('all');
  const [selected,setSelected] = useState(null);

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase();
    return allCatalogCreatures.filter(c=>{
      const hay = [c.name,c.rarity,c.variantOf,c.description,c.attraction,...(c.roles||[]),...(c.eventHistory||[])].join(' ').toLowerCase();
      return (!q || hay.includes(q)) && (rarity==='Todas' || c.rarity===rarity) && (acquisition==='all' || acquisitionKind(c)===acquisition);
    });
  },[query,rarity,acquisition]);

  const counts = useMemo(()=>({
    normal: allCatalogCreatures.filter(c=>c.category==='normal').length,
    event: allCatalogCreatures.filter(c=>c.category==='event').length,
    verified: allCatalogCreatures.filter(c=>c.verification==='high').length
  }),[]);

  const close = ()=>{setOpen(false);setSelected(null)};

  return <>
    <button className="cc-fab" onClick={()=>setOpen(true)}><Bug size={19}/><span>Catálogo de criaturas</span></button>
    {open && <div className="cc-overlay" onClick={close}>
      <main className="cc-shell" onClick={e=>e.stopPropagation()}>
        <header className="cc-header">
          <div><span className="cc-kicker">Pocket Ants Wiki BR</span><h1>Catálogo de criaturas</h1><p>Como obter, condições, eventos, stats, imagens, tutoriais e fontes.</p></div>
          <button className="cc-close" onClick={close} aria-label="Fechar"><X size={22}/></button>
        </header>

        {!selected ? <>
          <div className="cc-summary">
            <div><strong>{allCatalogCreatures.length}</strong><span>catalogadas</span></div>
            <div><strong>{counts.normal}</strong><span>normais/lendárias</span></div>
            <div><strong>{counts.event}</strong><span>de evento</span></div>
            <div><strong>{counts.verified}</strong><span>alta confiança</span></div>
          </div>

          <div className="cc-research-note"><ShieldCheck size={18}/><div><b>Apurado em 05/09/2026</b><span>Quando a própria fonte usa “placeholder” ou deixa stats em branco, o site mostra isso como A revisar em vez de inventar número.</span></div></div>

          <div className="cc-controls">
            <label className="cc-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar Hornet, Valentine, tanque..." /></label>
            <div className="cc-filter-title"><Filter size={15}/> Raridade</div>
            <div className="cc-filter-row">{rarityOrder.map(r=><button key={r} onClick={()=>setRarity(r)} className={rarity===r?'active':''}>{r}</button>)}</div>
            <div className="cc-filter-title"><Filter size={15}/> Como consegue</div>
            <div className="cc-filter-row">{acquisitionFilters.map(f=><button key={f.id} onClick={()=>setAcquisition(f.id)} className={acquisition===f.id?'active':''}>{f.label}</button>)}</div>
          </div>

          <div className="cc-results-head"><h2>{filtered.length} resultado{filtered.length!==1?'s':''}</h2><span>Versão verificada: {catalogMeta.gameVersion}</span></div>
          <div className="cc-grid">{filtered.map(c=><CreatureCard key={c.id} creature={c} onOpen={setSelected}/>)}</div>
          {filtered.length===0 && <div className="cc-empty">Nenhuma criatura bate com esses filtros.</div>}
        </> : <Detail creature={selected} onBack={()=>setSelected(null)}/>} 
      </main>
    </div>}
  </>;
}
