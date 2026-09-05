import React, { useEffect, useMemo, useState } from 'react';
import {
  Archive,
  BarChart3,
  Check,
  Clipboard,
  FlaskConical,
  GitCompareArrows,
  Heart,
  Info,
  ListChecks,
  PackageOpen,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Swords,
  Target,
  Users,
  Zap
} from 'lucide-react';
import {
  fusionBaseChance,
  fusionBodyPartCost,
  fusionHoneydewBonuses,
  fusionClanBonuses,
  fusionTemporaryBonuses
} from './upgradeData';
import './creatureToolsHub.css';

const PROFILE_KEY = 'pa-creature-profile-v2';
const LEGACY_COLLECTION_KEY = 'pa-collection';

const HIGH_LAB = new Set([
  'Tarantula','Praying Mantis','Tiger Beetle','Scorpion','Dragonfly','Asian Giant Hornet','Hornet','Butterfly','Centipede',
  'Christmas Spider','Ghost Mantis','Festive Tiger Beetle','Monarch Butterfly','Halloween Pennant','Shocking Pink Dragon Millipede',
  'Emerald Cockroach Wasp','Skull Spider','Red Costate Tiger Moth','Roseate Skimmer Dragonfly','Manticora Tiger Beetle',
  'Trilobite Beetle','Antlered Wasp','Red Scorpion'
]);
const LOW_LAB = new Set([
  'Bombardier Beetle','Rhinoceros Beetle','Crab','Paussinae Beetle','Christmas Beetle','Flower Chafer Beetle',
  'Lugubrious Bombardier Beetle','Christmas Crab'
]);
const HEALERS = new Set(['Butterfly','Monarch Butterfly','Red Costate Tiger Moth']);
const HIGH_SEQUENCE = [0,10,15,20,25,30,35,40,45,50,60];
const LOW_SEQUENCE = [0,2,4,6,8,10,12,14,16,18,20];
const HEALER_ATTACK_SEQUENCE = [0,5,10,15,20,25,30,35,40,45,50];
const LAB_COST = [
  {parts:0,gems:0},{parts:500,gems:0},{parts:1000,gems:0},{parts:2500,gems:0},{parts:4000,gems:0},{parts:5000,gems:0},
  {parts:6000,gems:50},{parts:6500,gems:100},{parts:7000,gems:150},{parts:8000,gems:200},{parts:9500,gems:350}
];

const ATTRACTION_RULES = {
  'tarantula': { phases:['dawn','day','dusk','night'], weather:['normal','rain','snow'], ideal:['day'], note:'Pode aparecer a qualquer hora; a referência atual indica chance maior durante o dia.' },
  'praying mantis': { phases:['dawn','day','dusk','night'], weather:['normal','rain','snow'], ideal:['day'], note:'Pode aparecer a qualquer hora; a referência atual indica chance maior durante o dia.' },
  'tiger beetle': { phases:['dawn','day','dusk','night'], weather:['normal','rain','snow'], ideal:['dawn','day'], conflict:true, note:'A página atual de condições diz qualquer horário, com maior chance no amanhecer/dia; outra tabela antiga ainda diverge.' },
  'scorpion': { phases:['dusk','night'], weather:['normal','rain','snow'], ideal:['dusk','night'], note:'Melhor no anoitecer/noite.' },
  'butterfly': { phases:['dawn','day'], weather:['normal','rain','snow'], ideal:['dawn','day'], note:'Amanhecer ou dia.' },
  'bombardier beetle': { phases:['dawn','day','dusk','night'], weather:['normal','rain','snow'], ideal:['dawn','day'], conflict:true, note:'A página atual de condições diz qualquer horário e melhor no amanhecer/dia; a tabela antiga diverge.' },
  'rhinoceros beetle': { phases:['dusk','night'], weather:['normal','rain','snow'], ideal:['dusk','night'], note:'Anoitecer/noite.' },
  'centipede': { phases:['dusk','night'], weather:['normal','rain','snow'], ideal:['dusk','night'], note:'Anoitecer/noite.' },
  'dragonfly': { phases:['dawn','day','dusk','night'], weather:['rain','snow'], ideal:['night'], note:'Exige chuva ou neve; pode aparecer em qualquer horário, com chance maior à noite.' },
  'hornet': { phases:['dawn','day','dusk','night'], weather:['normal','rain','snow'], ideal:['dawn','day','dusk','night'], honeycomb:true, note:'Exige estar segurando Honeycomb da Beehive.' },
  'asian giant hornet': { phases:['dawn','day','dusk','night'], weather:['normal','rain','snow'], ideal:['dawn','day','dusk','night'], honeycomb:true, note:'Exige estar segurando Honeycomb da Beehive.' }
};

const COMMUNITY_META = {
  'scorpion': 'Muito citado pela comunidade como uma das melhores criaturas normais para early game.',
  'bombardier beetle': 'Frequentemente recomendado no early game pelo dano em área, embora jogadores avançados citem power creep.',
  'centipede': 'Aparece com frequência em recomendações de early game ao lado de Scorpion e Bombardier.',
  'hornet': 'É citado como bom starter; perde valor quando o adversário começa a usar Frog.',
  'crab': 'É muito valorizado no late game por resistência e ataque em área; a comunidade costuma priorizar o co-op diário.',
  'frog': 'É muito valorizado por sua utilidade contra criaturas voadoras e costuma aparecer como objetivo de progressão avançada.'
};

function normalize(value='') {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}

function defaultEntry() {
  return { owned:false, favorite:false, quantity:0, stars:1, golden:false, lab:{health:0,attackRate:0,speed:0} };
}

function loadProfile(creatures) {
  const base = {
    creatures:{},
    storageUnlocked:3,
    crabProgress:0,
    frogProgress:0,
    viewMode:'detailed',
    armies:{attack:Array(12).fill(''),defense:Array(12).fill('')}
  };
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null');
    if(saved && typeof saved === 'object') Object.assign(base,saved);
  } catch {}
  try {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_COLLECTION_KEY) || '{}');
    for(const creature of creatures || []) {
      if(legacy?.[creature.id] && !base.creatures?.[creature.id]) {
        base.creatures[creature.id] = {...defaultEntry(),owned:true,quantity:1};
      }
    }
  } catch {}
  base.creatures ||= {};
  base.armies ||= {attack:Array(12).fill(''),defense:Array(12).fill('')};
  base.armies.attack = Array.from({length:12},(_,i)=>base.armies.attack?.[i] || '');
  base.armies.defense = Array.from({length:12},(_,i)=>base.armies.defense?.[i] || '');
  return base;
}

function useProfile(creatures) {
  const [profile,setProfile] = useState(()=>loadProfile(creatures));
  useEffect(()=>{
    localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent('pa-creature-profile-changed'));
  },[profile]);
  const patchCreature = (id,patch) => setProfile(prev=>{
    const current = {...defaultEntry(),...(prev.creatures?.[id]||{})};
    const next = typeof patch === 'function' ? patch(current) : {...current,...patch};
    return {...prev,creatures:{...prev.creatures,[id]:next}};
  });
  return {profile,setProfile,patchCreature};
}

function collectible(creature) {
  return creature && (creature.captureStatus === 'capturable' || creature.captureStatus === 'direct' || creature.category === 'event');
}

function entryFor(profile,id) {
  return {...defaultEntry(),...(profile.creatures?.[id]||{})};
}

function readableRarity(creature) {
  return creature.rarity || (creature.category === 'event' ? 'Especial' : '—');
}

function acquisitionLabel(creature) {
  if(creature.captureStatus === 'direct' || creature.rarity === 'Lendária') return 'Co-op / barra';
  if(creature.category === 'event') return 'Evento';
  if(creature.captureStatus === 'noncapturable') return 'Não capturável';
  if(creature.captureStatus === 'ally') return 'Aliado / sistema';
  if(normalize(creature.name).includes('hornet')) return 'Feromônios + Honeycomb';
  return 'Feromônios';
}

function labClass(creature) {
  if(!creature) return 'unknown';
  if(LOW_LAB.has(creature.name)) return 'low';
  if(HIGH_LAB.has(creature.name)) return 'high';
  return 'unknown';
}

function labBoost(creature,stat,level) {
  const safe = Math.max(0,Math.min(10,Number(level)||0));
  if(stat === 'attackRate' && HEALERS.has(creature.name)) return HEALER_ATTACK_SEQUENCE[safe];
  const type = labClass(creature);
  if(type === 'high') return HIGH_SEQUENCE[safe];
  if(type === 'low') return LOW_SEQUENCE[safe];
  return null;
}

function labMaxForChamber(level) {
  const cc = Math.max(1,Math.min(12,Number(level)||1));
  return cc < 4 ? 1 : Math.min(10,cc - 2);
}

function labCostTo(level) {
  const safe = Math.max(0,Math.min(10,Number(level)||0));
  let parts = 0, gems = 0;
  for(let i=1;i<=safe;i++){ parts += LAB_COST[i].parts; gems += LAB_COST[i].gems; }
  return {parts,gems};
}

function quickStatLabel(value) {
  const n = Number(value);
  if(Number.isNaN(n)) return 'Sem dado';
  if(n >= 85) return 'Muito alto';
  if(n >= 70) return 'Alto';
  if(n >= 50) return 'Médio';
  if(n >= 30) return 'Baixo';
  return 'Muito baixo';
}

function aiLabel(creature) {
  const text = normalize([...(creature.roles||[]),...(creature.battleNotes||[]),creature.ability].join(' '));
  if(text.includes('curand') || text.includes('heal')) return 'Healer';
  if(text.includes('ranged') || text.includes('distancia') || text.includes('sniper')) return 'Ranged';
  if(text.includes('area') || text.includes('aoe')) return 'AoE / habilidade';
  if(normalize(creature.name) === 'scorpion' || normalize(creature.name) === 'centipede') return 'Lock & Charge';
  return 'Não catalogada';
}

function attractionEvaluation(creature,{phase,weather,flower,honeycomb}) {
  if(!['Comum','Incomum','Rara'].includes(creature.rarity)) return null;
  const key = normalize(creature.name);
  const rule = ATTRACTION_RULES[key];
  if(!rule) return {status:'unknown',reason:'Condição ainda não estruturada no planner.'};

  if(flower === 'blue') {
    if(creature.rarity === 'Comum') return {status:'blocked',reason:'Blue Columbine impede comuns e força Uncommon/Rare.'};
    if(key.includes('hornet')) return rule.honeycomb && !honeycomb ? {status:'blocked',reason:'Hornet continua exigindo Honeycomb.'} : {status:'possible',reason:rule.note};
    return {status:'ideal',reason:'Blue Columbine ignora horário/clima para Uncommon/Rare.'};
  }
  if(flower === 'silver') {
    if(creature.rarity !== 'Rara') return {status:'blocked',reason:'Silver Dollar força apenas criaturas raras.'};
    if(key.includes('hornet')) return rule.honeycomb && !honeycomb ? {status:'blocked',reason:'Hornet continua exigindo Honeycomb.'} : {status:'possible',reason:rule.note};
    return {status:'ideal',reason:'Silver Dollar ignora horário/clima para raras.'};
  }
  if(rule.honeycomb && !honeycomb) return {status:'blocked',reason:'Precisa estar segurando Honeycomb.'};
  if(!rule.weather.includes(weather)) return {status:'blocked',reason:rule.note};
  if(!rule.phases.includes(phase)) return {status:'blocked',reason:rule.note};
  return {status:rule.ideal?.includes(phase)?'ideal':'possible',reason:rule.note,conflict:rule.conflict};
}

function ToolTabs({tab,setTab}) {
  const tabs = [
    ['collection','Coleção',Archive],['attract','Atrair agora',Target],['compare','Comparar',GitCompareArrows],
    ['army','Exército',Users],['fusion','Fusão + Lab',FlaskConical],['progress','Progresso',ListChecks]
  ];
  return <nav className="cth-tabs" aria-label="Ferramentas de criaturas">{tabs.map(([id,label,Icon])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}><Icon size={15}/>{label}</button>)}</nav>;
}

function CollectionPanel({creatures,profile,setProfile,patchCreature}) {
  const all = creatures.filter(collectible);
  const [filter,setFilter] = useState('all');
  const [query,setQuery] = useState('');
  const owned = all.filter(c=>entryFor(profile,c.id).owned);
  const favorites = all.filter(c=>entryFor(profile,c.id).favorite);
  const used = all.reduce((sum,c)=>sum + (entryFor(profile,c.id).owned ? Math.max(1,Number(entryFor(profile,c.id).quantity)||1) : 0),0);
  const capacity = 12 + Math.max(3,Math.min(78,Number(profile.storageUnlocked)||3));
  const filtered = all.filter(c=>{
    const e = entryFor(profile,c.id);
    if(filter==='owned'&&!e.owned) return false;
    if(filter==='missing'&&e.owned) return false;
    if(filter==='favorites'&&!e.favorite) return false;
    if(filter==='fusion'&&(!e.owned || Number(e.quantity)<2)) return false;
    return !query || normalize(`${c.name} ${c.rarity}`).includes(normalize(query));
  });
  const backup = JSON.stringify(profile);
  const copyBackup = async()=>{ try{ await navigator.clipboard.writeText(backup); }catch{} };
  const importBackup = ()=>{
    const raw = window.prompt('Cole aqui o backup JSON da coleção:');
    if(!raw) return;
    try { const parsed = JSON.parse(raw); if(parsed?.creatures) setProfile(parsed); else alert('Backup inválido.'); } catch { alert('Backup inválido.'); }
  };
  return <div className="cth-panel">
    <div className="cth-summary-grid">
      <div><span>Coleção</span><strong>{owned.length}/{all.length}</strong></div>
      <div><span>Favoritas</span><strong>{favorites.length}</strong></div>
      <div><span>Espaço usado</span><strong>{used}/{capacity}</strong></div>
      <div><span>Fusão possível</span><strong>{all.filter(c=>entryFor(profile,c.id).owned&&Number(entryFor(profile,c.id).quantity)>=2).length}</strong></div>
    </div>
    <div className="cth-toolbar">
      <label className="cth-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Filtrar coleção..."/></label>
      <select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">Todas</option><option value="owned">Tenho</option><option value="missing">Faltando</option><option value="favorites">Favoritas</option><option value="fusion">Prontas para fusão</option></select>
      <label className="cth-inline">Storage desbloqueado <input type="number" min="3" max="78" value={profile.storageUnlocked} onChange={e=>setProfile(p=>({...p,storageUnlocked:Math.max(3,Math.min(78,Number(e.target.value)||3))}))}/></label>
    </div>
    <div className="cth-collection-list">{filtered.map(c=>{
      const e = entryFor(profile,c.id);
      return <article key={c.id} className={`cth-collection-row ${e.owned?'owned':''}`}>
        <button className="cth-check" onClick={()=>patchCreature(c.id,{owned:!e.owned,quantity:!e.owned?Math.max(1,e.quantity):e.quantity})}>{e.owned?<Check size={15}/>:''}</button>
        <div className="cth-collection-name"><a href={`#/creatures/${encodeURIComponent(c.id)}`}><strong>{c.name}</strong></a><span>{readableRarity(c)} · {acquisitionLabel(c)}</span></div>
        <button className={`cth-heart ${e.favorite?'active':''}`} onClick={()=>patchCreature(c.id,{favorite:!e.favorite})}><Heart size={16}/></button>
        <label>Qtd<input type="number" min="0" max="99" value={e.quantity} onChange={ev=>patchCreature(c.id,{quantity:Math.max(0,Number(ev.target.value)||0),owned:Number(ev.target.value)>0})}/></label>
        <label>★<select value={e.stars} onChange={ev=>patchCreature(c.id,{stars:Number(ev.target.value)})}>{[1,2,3,4].map(s=><option key={s} value={s}>{s}★</option>)}</select></label>
        <button className={`cth-golden ${e.golden?'active':''}`} disabled={c.category==='event'} onClick={()=>patchCreature(c.id,{golden:!e.golden})}>Golden</button>
      </article>;
    })}</div>
    <div className="cth-backup"><button onClick={copyBackup}><Clipboard size={15}/> Copiar backup</button><button onClick={importBackup}>Importar backup</button><span>12 vagas de exército + até 78 slots de storage. Seu progresso fica salvo neste aparelho.</span></div>
  </div>;
}

function AttractionPanel({creatures}) {
  const [phase,setPhase] = useState('day');
  const [weather,setWeather] = useState('normal');
  const [flower,setFlower] = useState('none');
  const [honeycomb,setHoneycomb] = useState(false);
  const base = creatures.filter(c=>['Comum','Incomum','Rara'].includes(c.rarity));
  const results = base.map(c=>({creature:c,result:attractionEvaluation(c,{phase,weather,flower,honeycomb})})).sort((a,b)=>{
    const rank={ideal:0,possible:1,unknown:2,blocked:3};
    return (rank[a.result?.status]??9)-(rank[b.result?.status]??9)||a.creature.name.localeCompare(b.creature.name,'pt-BR');
  });
  return <div className="cth-panel">
    <div className="cth-fields">
      <label>Horário<select value={phase} onChange={e=>setPhase(e.target.value)}><option value="dawn">Amanhecer</option><option value="day">Dia</option><option value="dusk">Anoitecer</option><option value="night">Noite</option></select></label>
      <label>Clima<select value={weather} onChange={e=>setWeather(e.target.value)}><option value="normal">Normal</option><option value="rain">Chuva</option><option value="snow">Neve</option></select></label>
      <label>Flor<select value={flower} onChange={e=>setFlower(e.target.value)}><option value="none">Nenhuma</option><option value="blue">Blue Columbine</option><option value="silver">Silver Dollar</option></select></label>
      <label className="cth-switch"><input type="checkbox" checked={honeycomb} onChange={e=>setHoneycomb(e.target.checked)}/> Estou segurando Honeycomb</label>
    </div>
    <div className="cth-attract-results">{results.map(({creature,result})=><article key={creature.id} className={`cth-attract ${result?.status||'unknown'}`}><div><strong>{creature.name}</strong><span>{creature.rarity}</span></div><b>{result?.status==='ideal'?'Boa condição':result?.status==='possible'?'Pode aparecer':result?.status==='blocked'?'Bloqueada':'A revisar'}</b><p>{result?.reason}</p>{result?.conflict&&<small>⚠ Há conflito entre páginas comunitárias antigas/atuais.</small>}</article>)}</div>
    <p className="cth-note"><Info size={14}/> Blue Columbine ignora horário/clima para Uncommon/Rare e impede comuns; Silver Dollar força raras. Hornet continua exigindo Honeycomb.</p>
  </div>;
}

function ComparePanel({creatures,profile}) {
  const list = creatures.filter(collectible);
  const defaults = list.slice(0,4).map(c=>c.id);
  const [ids,setIds] = useState(defaults);
  const selected = ids.map(id=>list.find(c=>c.id===id)).filter(Boolean);
  const change=(index,id)=>setIds(prev=>prev.map((v,i)=>i===index?id:v));
  const rows = [
    ['Raridade',c=>readableRarity(c)],['Método',c=>acquisitionLabel(c)],['Dano',c=>c.stats?.damage!=null?`${Math.round(c.stats.damage)}%`:'—'],
    ['Vida',c=>c.stats?.health!=null?`${Math.round(c.stats.health)}%`:'—'],['Attack Rate',c=>c.stats?.attackRate!=null?`${Math.round(c.stats.attackRate)}%`:'—'],
    ['Velocidade',c=>c.stats?.speed!=null?`${Math.round(c.stats.speed)}%`:'—'],['AI',c=>aiLabel(c)],['Funções',c=>(c.roles||[]).join(', ')||'—'],
    ['Sua versão',c=>{const e=entryFor(profile,c.id);return e.owned?`${e.stars}★${e.golden?' Golden':''}`:'Não marcada';}]
  ];
  return <div className="cth-panel">
    <div className="cth-compare-selects">{[0,1,2,3].map(i=><select key={i} value={ids[i]||''} onChange={e=>change(i,e.target.value)}>{list.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>)}</div>
    <div className="cth-compare-table"><div className="cth-compare-head"><span>Campo</span>{selected.map(c=><a key={c.id} href={`#/creatures/${encodeURIComponent(c.id)}`}>{c.name}</a>)}</div>{rows.map(([label,get])=><div className="cth-compare-row" key={label}><b>{label}</b>{selected.map(c=><span key={c.id}>{get(c)}</span>)}</div>)}</div>
    <p className="cth-note"><Info size={14}/> O comparador não declara “melhor no geral”: habilidade, alvo, AoE e composição mudam o resultado.</p>
  </div>;
}

function ArmyPanel({creatures,profile,setProfile}) {
  const [mode,setMode] = useState('attack');
  const candidates = creatures.filter(collectible);
  const slots = profile.armies?.[mode] || Array(12).fill('');
  const updateSlot=(index,id)=>setProfile(prev=>({...prev,armies:{...prev.armies,[mode]:slots.map((v,i)=>i===index?id:v)}}));
  const selected = slots.map(id=>candidates.find(c=>c.id===id)).filter(Boolean);
  const roleCounts = {};
  selected.forEach(c=>(c.roles||['Sem função']).forEach(r=>roleCounts[r]=(roleCounts[r]||0)+1));
  return <div className="cth-panel">
    <div className="cth-mode"><button className={mode==='attack'?'active':''} onClick={()=>setMode('attack')}>Ataque</button><button className={mode==='defense'?'active':''} onClick={()=>setMode('defense')}>Defesa</button><span>{selected.length}/12 slots</span></div>
    <div className="cth-army-grid">{slots.map((id,i)=><label key={i}><span>Slot {i+1}</span><select value={id} onChange={e=>updateSlot(i,e.target.value)}><option value="">Vazio</option>{candidates.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>)}</div>
    <div className="cth-role-summary">{Object.entries(roleCounts).sort((a,b)=>b[1]-a[1]).map(([role,count])=><span key={role}>{role} <b>{count}</b></span>)}</div>
    <p className="cth-note"><Users size={14}/> O exército de criaturas tem 12 vagas. Este builder é um planner; recomendações de composição são rotuladas como comunidade, não regra oficial.</p>
  </div>;
}

function FusionLabPanel({creatures}) {
  const list = creatures.filter(collectible);
  const [creatureId,setCreatureId] = useState(list[0]?.id||'');
  const creature = list.find(c=>c.id===creatureId) || list[0];
  const [cc,setCc] = useState(4);
  const [targetStars,setTargetStars] = useState(3);
  const [honeydew,setHoneydew] = useState(0);
  const [clan,setClan] = useState(0);
  const [bluebell,setBluebell] = useState(0);
  const [rock,setRock] = useState(0);
  const [gems,setGems] = useState(0);
  const [lab,setLab] = useState({health:0,attackRate:0,speed:0});
  const maxLab = labMaxForChamber(cc);
  useEffect(()=>setLab(prev=>Object.fromEntries(Object.entries(prev).map(([k,v])=>[k,Math.min(v,maxLab)]))),[maxLab]);
  const base = fusionBaseChance[cc]?.[targetStars] ?? fusionBaseChance[4][targetStars];
  const bonus = Number(honeydew)+Number(clan)+Number(bluebell)+Number(rock)+Number(gems);
  const total = Math.min(100,base+bonus);
  const partCost = fusionBodyPartCost[targetStars]||0;
  const expected = total>0?100/total:null;
  const risk = total>=80?'Baixo risco':total>=50?'Risco moderado':total>=25?'Alto risco':'Risco extremo';
  const type = labClass(creature);
  const healthBoost = labBoost(creature,'health',lab.health);
  const attackBoost = labBoost(creature,'attackRate',lab.attackRate);
  const speedBoost = labBoost(creature,'speed',lab.speed);
  const totalLevels = lab.health+lab.attackRate+lab.speed;
  const arrow = totalLevels>=20?'↑↑↑':totalLevels>=10?'↑↑':totalLevels>0?'↑':'—';
  const costs = ['health','attackRate','speed'].map(k=>labCostTo(lab[k])).reduce((a,b)=>({parts:a.parts+b.parts,gems:a.gems+b.gems}),{parts:0,gems:0});
  return <div className="cth-panel cth-fusion-lab">
    <div className="cth-fields"><label>Criatura<select value={creatureId} onChange={e=>setCreatureId(e.target.value)}>{list.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Creatures Chamber<select value={cc} onChange={e=>setCc(Number(e.target.value))}>{Array.from({length:12},(_,i)=>i+1).map(v=><option key={v}>{v}</option>)}</select></label></div>
    <div className="cth-two-columns">
      <section className="cth-subcard"><h3><Sparkles size={17}/> Fusão</h3><div className="cth-fields compact"><label>Meta<select value={targetStars} onChange={e=>setTargetStars(Number(e.target.value))}><option value="2">2★</option><option value="3">3★</option><option value="4">4★</option></select></label><label>Honeydew<select value={honeydew} onChange={e=>setHoneydew(Number(e.target.value))}>{fusionHoneydewBonuses.map(v=><option key={v} value={v}>{v?`+${v}%`:'Nenhum'}</option>)}</select></label><label>Clã<select value={clan} onChange={e=>setClan(Number(e.target.value))}>{fusionClanBonuses.map(v=><option key={v} value={v}>{v?`+${v}%`:'Nenhum'}</option>)}</select></label><label>Bluebell<select value={bluebell} onChange={e=>setBluebell(Number(e.target.value))}><option value="0">Não</option><option value={fusionTemporaryBonuses.bluebells}>+{fusionTemporaryBonuses.bluebells}%</option></select></label><label>Rock Skin<select value={rock} onChange={e=>setRock(Number(e.target.value))}><option value="0">Não</option><option value={fusionTemporaryBonuses.rockSkin}>+{fusionTemporaryBonuses.rockSkin}%</option></select></label><label>Gemas<select value={gems} onChange={e=>setGems(Number(e.target.value))}>{fusionTemporaryBonuses.gems.map(v=><option key={v} value={v}>{v?`+${v}%`:'Nenhum'}</option>)}</select></label></div><div className="cth-score"><strong>{total}%</strong><span>{risk}</span></div><div className="cth-mini-grid"><span>Base <b>{base}%</b></span><span>Body Parts <b>{partCost}</b></span><span>Média matemática <b>{expected?expected.toFixed(2):'—'} tent.</b></span></div><p>Falha consome uma das duas criaturas. “Risco” aqui é só leitura matemática, não recomendação de gastar recursos.</p></section>
      <section className="cth-subcard"><h3><FlaskConical size={17}/> Creature Lab</h3><p className="cth-lab-type">Categoria: <b>{type==='high'?'High-increase':type==='low'?'Low-increase':'Ainda não classificada'}</b> · limite atual pelo CC: <b>Lv {maxLab}</b></p><div className="cth-lab-sliders">{[['health','Vida'],['attackRate','Attack Rate'],['speed','Velocidade']].map(([key,label])=><label key={key}><span>{label} Lv {lab[key]} {labBoost(creature,key,lab[key])!=null?`(+${labBoost(creature,key,lab[key])}%)`:''}</span><input type="range" min="0" max={maxLab} value={lab[key]} onChange={e=>setLab(p=>({...p,[key]:Number(e.target.value)}))}/></label>)}</div><div className="cth-mini-grid"><span>Indicador <b>{arrow}</b></span><span>Body Parts <b>{costs.parts.toLocaleString('pt-BR')}</b></span><span>Gemas <b>{costs.gems}</b></span></div><p>Dano não recebe upgrade do Lab. Normal e Golden compartilham upgrades; especial é separado.</p></section>
    </div>
  </div>;
}

function ProgressPanel({creatures,profile,setProfile}) {
  const specials = creatures.filter(c=>c.category==='event'&&collectible(c));
  const ownedSpecials = specials.filter(c=>entryFor(profile,c.id).owned).length;
  const verified = creatures.filter(c=>c.verification!=='review').length;
  const conflicts = creatures.filter(c=>c.verification==='review').length;
  const setProgress=(key,max,value)=>setProfile(p=>({...p,[key]:Math.max(0,Math.min(max,Number(value)||0))}));
  return <div className="cth-panel">
    <div className="cth-progress-cards"><article><h3>Crab</h3><strong>{profile.crabProgress}/15</strong><div className="cth-progressbar"><i style={{width:`${(profile.crabProgress/15)*100}%`}}/></div><div><button onClick={()=>setProgress('crabProgress',15,profile.crabProgress-1)}>−</button><button onClick={()=>setProgress('crabProgress',15,profile.crabProgress+1)}>+</button></div><p>Crab Beach: +1 ponto na barra; 15 pontos para reivindicar Crab.</p></article><article><h3>Frog</h3><strong>{profile.frogProgress}/10</strong><div className="cth-progressbar"><i style={{width:`${(profile.frogProgress/10)*100}%`}}/></div><div><button onClick={()=>setProgress('frogProgress',10,profile.frogProgress-1)}>−</button><button onClick={()=>setProgress('frogProgress',10,profile.frogProgress+1)}>+</button></div><p>Frog Pond: a referência atual registra 10 conclusões para preencher a barra.</p></article><article><h3>Especiais</h3><strong>{ownedSpecials}/{specials.length}</strong><p>Checklist automático com base no que você marcou em “Coleção”.</p></article><article><h3>Qualidade dos dados</h3><strong>{verified} revisadas</strong><p>{conflicts} entradas ainda sinalizam conflito de fonte.</p></article></div>
    <div className="cth-event-list">{specials.slice().sort((a,b)=>String(b.eventHistory?.[0]||'').localeCompare(String(a.eventHistory?.[0]||''))).slice(0,20).map(c=><a key={c.id} href={`#/creatures/${encodeURIComponent(c.id)}`}><span>{entryFor(profile,c.id).owned?'✓':'○'}</span><div><b>{c.name}</b><small>{c.eventHistory?.[0]||'Evento especial · data a revisar'}</small></div></a>)}</div>
    <p className="cth-note"><ShieldCheck size={14}/> “Disponível agora” só deve aparecer quando houver evento atual confirmado; o banco não assume disponibilidade apenas porque a criatura já voltou no passado.</p>
  </div>;
}

export function CreatureToolsHub({creatures=[]}) {
  const [tab,setTab] = useState('collection');
  const {profile,setProfile,patchCreature} = useProfile(creatures);
  useEffect(()=>{
    document.body.classList.toggle('creature-view-compact',profile.viewMode==='compact');
    return ()=>document.body.classList.remove('creature-view-compact');
  },[profile.viewMode]);
  return <section className="cth-root">
    <header className="cth-head"><div><span className="cth-kicker">Ferramentas do banco</span><h2>Central de Criaturas</h2><p>Planeje captura, coleção, fusão, Creature Lab, exército e progresso sem sair da categoria.</p></div><div className="cth-view"><button className={profile.viewMode==='detailed'?'active':''} onClick={()=>setProfile(p=>({...p,viewMode:'detailed'}))}>Detalhado</button><button className={profile.viewMode==='compact'?'active':''} onClick={()=>setProfile(p=>({...p,viewMode:'compact'}))}>Compacto</button></div></header>
    <ToolTabs tab={tab} setTab={setTab}/>
    {tab==='collection'&&<CollectionPanel creatures={creatures} profile={profile} setProfile={setProfile} patchCreature={patchCreature}/>} 
    {tab==='attract'&&<AttractionPanel creatures={creatures}/>} 
    {tab==='compare'&&<ComparePanel creatures={creatures} profile={profile}/>} 
    {tab==='army'&&<ArmyPanel creatures={creatures} profile={profile} setProfile={setProfile}/>} 
    {tab==='fusion'&&<FusionLabPanel creatures={creatures}/>} 
    {tab==='progress'&&<ProgressPanel creatures={creatures} profile={profile} setProfile={setProfile}/>} 
  </section>;
}

export function CreatureRecordPanel({creature,creatures=[]}) {
  const {profile,patchCreature} = useProfile(creatures);
  if(!creature) return null;
  const e = entryFor(profile,creature.id);
  const type = labClass(creature);
  const [cc,setCc] = useState(12);
  const maxLab = labMaxForChamber(cc);
  const patchLab=(key,value)=>patchCreature(creature.id,current=>({...current,lab:{...current.lab,[key]:Math.min(maxLab,Number(value)||0)}}));
  const totalLevels = Object.values(e.lab||{}).reduce((a,b)=>a+(Number(b)||0),0);
  const arrow = totalLevels>=20?'↑↑↑':totalLevels>=10?'↑↑':totalLevels>0?'↑':'—';
  const meta = COMMUNITY_META[normalize(creature.name)];
  const isCollectible = collectible(creature);
  return <section className="cth-record">
    <header><span className="cth-kicker">Seu registro</span><h2>Minha {creature.name}</h2><p>Este painel é pessoal e fica salvo só neste aparelho.</p></header>
    {isCollectible ? <>
      <div className="cth-record-actions"><button className={e.owned?'active':''} onClick={()=>patchCreature(creature.id,{owned:!e.owned,quantity:!e.owned?Math.max(1,e.quantity):e.quantity})}><Check size={15}/> {e.owned?'Na coleção':'Marcar como obtida'}</button><button className={e.favorite?'active':''} onClick={()=>patchCreature(creature.id,{favorite:!e.favorite})}><Heart size={15}/> Favorita</button><label>Quantidade<input type="number" min="0" max="99" value={e.quantity} onChange={ev=>patchCreature(creature.id,{quantity:Math.max(0,Number(ev.target.value)||0),owned:Number(ev.target.value)>0})}/></label><label>Estrelas<select value={e.stars} onChange={ev=>patchCreature(creature.id,{stars:Number(ev.target.value)})}>{[1,2,3,4].map(s=><option key={s} value={s}>{s}★</option>)}</select></label>{creature.category!=='event'&&<button className={e.golden?'gold active':'gold'} onClick={()=>patchCreature(creature.id,{golden:!e.golden})}><Star size={15}/> Golden</button>}</div>
      <div className="cth-record-grid"><article><h3><Sparkles size={16}/> Estrelas / Golden</h3><strong>{e.stars}★{e.golden?' Golden':''}</strong><p>{e.golden?`Equivalência de força por estrela: aproximadamente ${Math.min(5,e.stars+1)}★ normal.`:'Golden soma o equivalente a +1 nível de estrela em relação à normal.'}</p><small>O banco não inventa números por estrela quando a tabela exata daquela espécie não está carregada.</small></article><article><h3><FlaskConical size={16}/> Creature Lab</h3><label>Creatures Chamber <select value={cc} onChange={ev=>setCc(Number(ev.target.value))}>{Array.from({length:12},(_,i)=>i+1).map(v=><option key={v}>{v}</option>)}</select></label><div className="cth-record-lab">{[['health','Vida'],['attackRate','Attack Rate'],['speed','Velocidade']].map(([key,label])=><label key={key}><span>{label} Lv {e.lab?.[key]||0}{labBoost(creature,key,e.lab?.[key]||0)!=null?` · +${labBoost(creature,key,e.lab?.[key]||0)}%`:''}</span><input type="range" min="0" max={maxLab} value={Math.min(maxLab,e.lab?.[key]||0)} onChange={ev=>patchLab(key,ev.target.value)}/></label>)}</div><small>{type==='unknown'?'A sequência de bônus desta espécie ainda não foi classificada com segurança.':`Categoria ${type==='high'?'high-increase':'low-increase'} · indicador em batalha: ${arrow}`}</small></article><article><h3><Swords size={16}/> Leitura de combate</h3><div className="cth-record-facts"><span>AI <b>{aiLabel(creature)}</b></span><span>Funções <b>{(creature.roles||[]).join(' / ')||'—'}</b></span><span>Vida <b>{quickStatLabel(creature.stats?.health)}</b></span><span>Dano <b>{quickStatLabel(creature.stats?.damage)}</b></span></div>{meta?<p><b>Comunidade:</b> {meta}</p>:<p>Sem consenso comunitário forte o bastante para uma recomendação curta nesta ficha.</p>}</article></div>
    </> : <div className="cth-noncollectible"><Info size={18}/><div><b>Esta entrada não faz parte da coleção de criaturas capturáveis.</b><p>Bosses, NPCs, hostis e aliados continuam documentados no banco, mas não recebem estrelas/Golden/inventário como uma criatura de exército.</p></div></div>}
  </section>;
}
