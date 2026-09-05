import React, { useMemo, useState } from 'react';
import { X, Calculator, Clock3, Sparkles, FlaskConical, Info, ExternalLink } from 'lucide-react';
import {
  upgradeTables,
  fusionBaseChance,
  fusionBodyPartCost,
  fusionHoneydewBonuses,
  fusionClanBonuses,
  fusionTemporaryBonuses,
  creatureLabFacts
} from './upgradeData';
import './advancedPlanner.css';

function formatMinutes(total) {
  const value = Math.max(0, Number(total || 0));
  if (value > 0 && value < 1) return `${Math.round(value * 60)}s`;
  const minutes = Math.round(value);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (mins || !parts.length) parts.push(`${mins}min`);
  return parts.join(' ');
}

function targetMetric(final, fallback) {
  if (final?.soldierLevel != null) return ['Soldado na meta', final.soldierLevel];
  if (final?.workers != null) return ['Trabalhadoras na meta', final.workers];
  if (final?.labLevel != null) return ['Creature Lab liberado', final.labLevel];
  if (final?.storage != null) return ['Capacidade na meta', final.storage.toLocaleString('pt-BR')];
  return ['Nível final', fallback];
}

function UpgradeCalculator() {
  const keys = Object.keys(upgradeTables);
  const [tableId, setTableId] = useState('queen');
  const table = upgradeTables[tableId];
  const [levels, setLevels] = useState(() => Object.fromEntries(
    Object.entries(upgradeTables).map(([id, item]) => [id, item.currentMin])
  ));
  const current = Math.max(table.currentMin, Number(levels[tableId] ?? table.currentMin));
  const [target, setTarget] = useState(12);
  const safeTarget = Math.max(current + 1, Math.min(12, target));

  const result = useMemo(() => {
    const rows = table.levels.filter(row => row.level > current && row.level <= safeTarget);
    const minutes = rows.reduce((sum, row) => sum + row.minutes, 0);
    const final = table.levels.find(row => row.level === safeTarget);
    return { rows, minutes, final };
  }, [table, current, safeTarget]);

  const changeTable = (id) => {
    setTableId(id);
    const min = upgradeTables[id].currentMin;
    if (target <= min) setTarget(Math.min(12, min + 1));
  };

  const [metricLabel, metricValue] = targetMetric(result.final, safeTarget);

  return (
    <div className="adv-card">
      <div className="adv-card-head">
        <div className="adv-icon"><Clock3 size={19}/></div>
        <div><span className="adv-kicker">Tempo acumulado</span><h3>Planner de upgrades</h3></div>
      </div>
      <div className="adv-fields">
        <label>Câmara<select value={tableId} onChange={e => changeTable(e.target.value)}>{keys.map(id => <option key={id} value={id}>{upgradeTables[id].name}</option>)}</select></label>
        <label>Nível atual<select value={current} onChange={e => setLevels(prev => ({...prev, [tableId]: Number(e.target.value)}))}>{Array.from({length: 12 - table.currentMin}, (_, i) => table.currentMin + i).map(level => <option key={level} value={level}>{level}</option>)}</select></label>
        <label>Meta<select value={safeTarget} onChange={e => setTarget(Number(e.target.value))}>{Array.from({length: 12 - current}, (_, i) => current + i + 1).map(level => <option key={level} value={level}>{level}</option>)}</select></label>
      </div>
      <div className="adv-result-grid">
        <div><span>Upgrades</span><strong>{result.rows.length}</strong></div>
        <div><span>Tempo base</span><strong>{formatMinutes(result.minutes)}</strong></div>
        <div><span>{metricLabel}</span><strong>{metricValue}</strong></div>
      </div>
      <div className="adv-level-list">
        {result.rows.map(row => (
          <div key={row.level}>
            <span>→ nível {row.level}{row.unlock ? ` · ${row.unlock}` : ''}</span>
            <strong>{formatMinutes(row.minutes)}</strong>
          </div>
        ))}
      </div>
      <a className="adv-source-link" href={table.sourceUrl} target="_blank" rel="noreferrer">Tabela comunitária verificada em {table.verifiedAt.split('-').reverse().join('/')} <ExternalLink size={12}/></a>
    </div>
  );
}

function FusionCalculator() {
  const [chamberLevel, setChamberLevel] = useState(4);
  const [targetStars, setTargetStars] = useState(3);
  const [honeydew, setHoneydew] = useState(0);
  const [clan, setClan] = useState(0);
  const [bluebells, setBluebells] = useState(0);
  const [rockSkin, setRockSkin] = useState(0);
  const [gem, setGem] = useState(0);

  const base = fusionBaseChance[chamberLevel]?.[targetStars] ?? 0;
  const bonus = Number(honeydew) + Number(clan) + Number(bluebells) + Number(rockSkin) + Number(gem);
  const total = Math.min(100, base + bonus);
  const bodyParts = fusionBodyPartCost[targetStars] || 0;
  const expected = total > 0 ? 100 / total : null;
  const expectedParts = expected ? expected * bodyParts : null;

  return (
    <div className="adv-card">
      <div className="adv-card-head">
        <div className="adv-icon"><Sparkles size={19}/></div>
        <div><span className="adv-kicker">Creatures Chamber</span><h3>Chance de fusão</h3></div>
      </div>
      <div className="adv-fields fusion-fields">
        <label>Nível da Creatures Chamber<select value={chamberLevel} onChange={e=>setChamberLevel(Number(e.target.value))}>{Array.from({length:12},(_,i)=>i+1).map(v=><option key={v} value={v}>{v}</option>)}</select></label>
        <label>Tentar obter<select value={targetStars} onChange={e=>setTargetStars(Number(e.target.value))}><option value={2}>2 estrelas</option><option value={3}>3 estrelas</option><option value={4}>4 estrelas</option></select></label>
        <label>Honeydew Shop<select value={honeydew} onChange={e=>setHoneydew(Number(e.target.value))}>{fusionHoneydewBonuses.map(v=><option key={v} value={v}>{v ? `+${v}%` : 'Nenhum'}</option>)}</select></label>
        <label>Bônus de clã<select value={clan} onChange={e=>setClan(Number(e.target.value))}>{fusionClanBonuses.map(v=><option key={v} value={v}>{v ? `+${v}%` : 'Nenhum'}</option>)}</select></label>
        <label>Bluebells (Water 10+)<select value={bluebells} onChange={e=>setBluebells(Number(e.target.value))}><option value={0}>Inativa</option><option value={fusionTemporaryBonuses.bluebells}>+{fusionTemporaryBonuses.bluebells}%</option></select></label>
        <label>Rock Skin<select value={rockSkin} onChange={e=>setRockSkin(Number(e.target.value))}><option value={0}>Não equipado</option><option value={fusionTemporaryBonuses.rockSkin}>+{fusionTemporaryBonuses.rockSkin}%</option></select></label>
        <label>Extra de gemas<select value={gem} onChange={e=>setGem(Number(e.target.value))}>{fusionTemporaryBonuses.gems.map(v=><option key={v} value={v}>{v ? `+${v}% (uso único)` : 'Nenhum'}</option>)}</select></label>
      </div>
      <div className="adv-fusion-score">
        <div className="adv-ring" style={{'--fusion': `${total * 3.6}deg`}}><strong>{total}%</strong><span>chance</span></div>
        <div className="adv-fusion-breakdown">
          <div><span>Chance-base</span><strong>{base}%</strong></div>
          <div><span>Bônus somados</span><strong>+{bonus}%</strong></div>
          <div><span>Body Parts / tentativa</span><strong>{bodyParts}</strong></div>
          <div><span>Tentativas médias matemáticas*</span><strong>{expected ? expected.toFixed(2) : '—'}</strong></div>
          <div><span>Body Parts médios matemáticos*</span><strong>{expectedParts ? expectedParts.toFixed(1) : '—'}</strong></div>
          <div><span>Chance final aplicada</span><strong>{total}%</strong></div>
        </div>
      </div>
      <p className="adv-note"><Info size={14}/><span>*Valores esperados são matemática, não garantia. A chance-base para de subir após Creatures Chamber nível 4. Bluebells adiciona +5%, Rock Skin +1%, o bônus de clã pode chegar a +5% e o bônus de gemas é de uso único.</span></p>
    </div>
  );
}

function LabReference() {
  return (
    <div className="adv-card">
      <div className="adv-card-head"><div className="adv-icon"><FlaskConical size={19}/></div><div><span className="adv-kicker">Referência</span><h3>Creature Lab</h3></div></div>
      <div className="adv-lab-stats"><div><span>Nível máximo por stat</span><strong>{creatureLabFacts.maxStatLevel}</strong></div><div><span>Máx. em criaturas high-increase</span><strong>+{creatureLabFacts.highIncreaseMaxPercentPerStat}%</strong></div></div>
      <p className="adv-copy">{creatureLabFacts.note}</p>
      <div className="adv-unlocks">{creatureLabFacts.chamberUnlocks.map(item=><span key={item.chamberLevel}>Chamber {item.chamberLevel} <b>→</b> Lab {item.labLevel}</span>)}</div>
    </div>
  );
}

export default function AdvancedPlanner() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('upgrade');
  return (
    <>
      <button className="adv-fab" onClick={()=>setOpen(true)} aria-label="Abrir calculadoras avançadas"><Calculator size={18}/><span>Calculadoras</span></button>
      {open && <div className="adv-overlay" onClick={()=>setOpen(false)}>
        <section className="adv-modal" onClick={e=>e.stopPropagation()}>
          <header className="adv-header"><div><span className="adv-kicker">Ferramentas avançadas</span><h2>Calculadoras Pocket Ants</h2></div><button onClick={()=>setOpen(false)}><X size={20}/></button></header>
          <nav className="adv-tabs"><button className={tab==='upgrade'?'active':''} onClick={()=>setTab('upgrade')}><Clock3 size={15}/> Upgrades</button><button className={tab==='fusion'?'active':''} onClick={()=>setTab('fusion')}><Sparkles size={15}/> Fusão</button><button className={tab==='lab'?'active':''} onClick={()=>setTab('lab')}><FlaskConical size={15}/> Creature Lab</button></nav>
          <div className="adv-body">{tab==='upgrade'&&<UpgradeCalculator/>}{tab==='fusion'&&<FusionCalculator/>}{tab==='lab'&&<LabReference/>}</div>
        </section>
      </div>}
    </>
  );
}
