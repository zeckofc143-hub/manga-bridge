import React, { useMemo, useState } from 'react';
import { AlertTriangle, Bot, CheckCircle2, Crosshair, Image as ImageIcon, ShieldCheck, Sparkles, Star, Swords } from 'lucide-react';
import { currentAvailability, galleryCandidates, matchupFor, starDamageFor, verifiedAiType } from './creatureAdvancedData';
import './creatureAdvancedPanel.css';

function StarDamage({creature}) {
  const data = starDamageFor(creature);
  const [level,setLevel] = useState(1);
  const max = data?.values?.[4] != null ? 5 : 4;
  const value = data?.values?.[level-1];
  return <article className="cap-card">
    <div className="cap-title"><Star/><div><h3>Stats por estrela</h3><span>Tabela comunitária medida em combate</span></div></div>
    <div className="cap-stars">{Array.from({length:max},(_,i)=>i+1).map(v=><button key={v} className={level===v?'active':''} onClick={()=>setLevel(v)}>{v===5?'4★ Golden':`${v}★`}</button>)}</div>
    {data ? <>
      <div className="cap-big-number"><strong>{value != null ? `${value.toFixed(2)}%` : 'Sem dado'}</strong><span>{String(creature.name).toLowerCase().includes('butterfly') ? 'cura registrada' : 'dano por golpe registrado'}</span></div>
      <p>{data.note}</p>
      <small>Os valores não são “tier score”: são medições da tabela de Creature Stats. Quando a fonte não confirma Golden, o banco mostra “Sem dado”.</small>
    </> : <div className="cap-empty"><AlertTriangle/><div><b>Tabela exata por estrela ainda não carregada para esta criatura.</b><span>O seletor pessoal continua disponível na seção “Meu registro”, mas o site não inventa números ausentes.</span></div></div>}
  </article>;
}

function AiPanel({creature}) {
  const ai = verifiedAiType(creature);
  return <article className="cap-card">
    <div className="cap-title"><Bot/><div><h3>AI / comportamento</h3><span>Como a criatura escolhe e persegue o alvo</span></div></div>
    <div className="cap-pill">{ai.label}</div>
    <p>{ai.description}</p>
    <small>{ai.source === 'A revisar' ? 'Ainda não classificada pela página comunitária de Creature AI.' : 'Classificação cruzada com a página Creature AI.'}</small>
  </article>;
}

function MatchupPanel({creature}) {
  const meta = matchupFor(creature);
  return <article className="cap-card">
    <div className="cap-title"><Swords/><div><h3>Meta, counters e sinergias</h3><span>Opinião da comunidade — separada dos fatos</span></div></div>
    {meta ? <>
      <div className="cap-meta-stage">{(meta.stages||[]).map(x=><span key={x}>{x}</span>)}</div>
      {(meta.strengths||[]).length>0 && <div className="cap-list good"><b>Pontos fortes citados</b>{meta.strengths.map(x=><span key={x}><CheckCircle2/> {x}</span>)}</div>}
      {(meta.weaknesses||[]).length>0 && <div className="cap-list warn"><b>Limitações citadas</b>{meta.weaknesses.map(x=><span key={x}><AlertTriangle/> {x}</span>)}</div>}
      {(meta.counters||[]).length>0 && <div className="cap-list"><b>Counters citados</b>{meta.counters.map(x=><span key={x}><Crosshair/> {x}</span>)}</div>}
      {(meta.synergies||[]).length>0 && <div className="cap-list"><b>Sinergias sugeridas</b>{meta.synergies.map(x=><span key={x}><Sparkles/> {x}</span>)}</div>}
      <small>{meta.label}. Isso pode mudar conforme update/meta e não é regra oficial.</small>
    </> : <div className="cap-empty"><ShieldCheck/><div><b>Sem consenso forte cadastrado.</b><span>Preferimos deixar vazio a transformar uma opinião isolada em “tier oficial”.</span></div></div>}
  </article>;
}

function AvailabilityPanel({creature}) {
  const availability = currentAvailability(creature);
  return <article className="cap-card">
    <div className="cap-title"><Sparkles/><div><h3>Disponibilidade</h3><span>Evento / sistema de obtenção</span></div></div>
    <div className={`cap-availability ${availability.tone}`}>{availability.status}</div>
    <p>{availability.detail}</p>
    {creature.eventHistory?.length ? <div className="cap-history"><b>Histórico cadastrado</b><div>{creature.eventHistory.map(e=><span key={e}>{e}</span>)}</div></div> : null}
  </article>;
}

function GalleryPanel({creature}) {
  const candidates = useMemo(()=>galleryCandidates(creature),[creature]);
  const [failed,setFailed] = useState({});
  const visible = candidates.filter((_,i)=>!failed[i]).slice(0,6);
  return <article className="cap-card cap-gallery-card">
    <div className="cap-title"><ImageIcon/><div><h3>Galeria</h3><span>Imagens disponíveis na base/fonte</span></div></div>
    {visible.length ? <div className="cap-gallery">{visible.map((src,i)=><a href={src} target="_blank" rel="noreferrer" key={`${src}-${i}`}><img src={src} loading="lazy" decoding="async" alt={`${creature.name} - imagem ${i+1}`} onError={()=>setFailed(p=>({...p,[i]:true}))}/></a>)}</div> : <div className="cap-empty"><ImageIcon/><div><b>Sem galeria adicional confiável.</b><span>A imagem principal da ficha continua acima. Não usamos foto de inseto real como substituta.</span></div></div>}
    <small>Golden e especial só aparecem aqui quando existe um arquivo visual claramente associado; o site não recolore imagens artificialmente.</small>
  </article>;
}

export default function CreatureAdvancedPanel({creature}) {
  if(!creature) return null;
  return <section className="cap-root">
    <header><span>Dados avançados</span><h2>Análise completa de {creature.name}</h2><p>Estrelas, AI, disponibilidade, galeria e leitura comunitária ficam separados por tipo de evidência.</p></header>
    <div className="cap-grid"><StarDamage creature={creature}/><AiPanel creature={creature}/><MatchupPanel creature={creature}/><AvailabilityPanel creature={creature}/><GalleryPanel creature={creature}/></div>
  </section>;
}
