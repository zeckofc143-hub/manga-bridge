import React, { useMemo, useRef, useState } from 'react';
import {
  X,
  Layers3,
  HelpCircle,
  CalendarDays,
  Database,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Search,
  Minus,
  Plus,
  RotateCcw,
  Save,
  ChevronDown,
  ChevronUp,
  Info,
  BarChart3
} from 'lucide-react';
import { chambers, creatures, specialCreatures, gameMeta, sources } from './wikiData';
import {
  faqItems,
  eventArchive,
  extraSpecialCreatures,
  contentAreas,
  sourceRegistry,
  verificationRules
} from './extendedData';
import './enhancements.css';

const normalize = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

function SourcePill({ type = 'community' }) {
  const source = sources[type] || sources.community;
  return (
    <span className={`x-source-pill x-source-${source.tone}`}>
      {source.tone === 'official' ? <ShieldCheck size={12}/> : source.tone === 'review' ? <AlertTriangle size={12}/> : <Database size={12}/>}
      {source.label}
    </span>
  );
}

function ProgressTab() {
  const [levels, setLevels] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pa-chamber-levels') || '{}'); }
    catch { return {}; }
  });
  const fileInput = useRef(null);
  const [notice, setNotice] = useState('');

  const saveLevels = (next) => {
    setLevels(next);
    localStorage.setItem('pa-chamber-levels', JSON.stringify(next));
  };

  const adjust = (chamber, delta) => {
    const current = Number(levels[chamber.id] || 0);
    const nextValue = Math.max(0, Math.min(chamber.maxLevel, current + delta));
    saveLevels({ ...levels, [chamber.id]: nextValue });
  };

  const totalLevels = chambers.reduce((sum, chamber) => sum + Number(levels[chamber.id] || 0), 0);
  const maxLevels = chambers.reduce((sum, chamber) => sum + chamber.maxLevel, 0);
  const completion = maxLevels ? Math.round((totalLevels / maxLevels) * 100) : 0;

  const exportBackup = () => {
    const payload = {
      format: 'pocket-ants-wiki-br-backup',
      version: 1,
      exportedAt: new Date().toISOString(),
      dataCheckedAt: gameMeta.dataCheckedAt,
      localStorage: {
        collection: JSON.parse(localStorage.getItem('pa-collection') || '{}'),
        daily: JSON.parse(localStorage.getItem('pa-daily') || '{}'),
        chamberLevels: JSON.parse(localStorage.getItem('pa-chamber-levels') || '{}'),
        theme: localStorage.getItem('pa-theme') || 'dark'
      }
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `pocket-ants-wiki-backup-${new Date().toISOString().slice(0,10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice('Backup exportado. Guarde o arquivo para restaurar seu progresso depois.');
  };

  const importBackup = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (parsed?.format !== 'pocket-ants-wiki-br-backup' || !parsed?.localStorage) throw new Error('Formato inválido');
      const storage = parsed.localStorage;
      localStorage.setItem('pa-collection', JSON.stringify(storage.collection || {}));
      localStorage.setItem('pa-daily', JSON.stringify(storage.daily || {}));
      localStorage.setItem('pa-chamber-levels', JSON.stringify(storage.chamberLevels || {}));
      localStorage.setItem('pa-theme', storage.theme || 'dark');
      setLevels(storage.chamberLevels || {});
      setNotice('Backup importado. Recarregue a página para todos os painéis refletirem os dados restaurados.');
    } catch {
      setNotice('Não consegui importar esse arquivo. Use um backup exportado por esta wiki.');
    } finally {
      event.target.value = '';
    }
  };

  const resetChambers = () => {
    saveLevels({});
    setNotice('Progresso das câmaras zerado. Coleção e checklist não foram alterados.');
  };

  return (
    <div className="x-stack">
      <section className="x-hero-card">
        <div>
          <span className="x-kicker">Planner de colônia</span>
          <h3>{completion}% das câmaras marcadas</h3>
          <p>Ajuste o nível que você tem no jogo. O site salva neste aparelho e usa os máximos catalogados na wiki.</p>
        </div>
        <div className="x-progress-ring" style={{'--progress': `${completion * 3.6}deg`}}><strong>{completion}%</strong></div>
      </section>

      <section className="x-chamber-list">
        {chambers.map(chamber => {
          const level = Number(levels[chamber.id] || 0);
          const pct = Math.round((level / chamber.maxLevel) * 100);
          return (
            <article className="x-chamber-row" key={chamber.id}>
              <div className="x-chamber-symbol">{chamber.icon}</div>
              <div className="x-chamber-copy">
                <div className="x-chamber-title"><strong>{chamber.pt}</strong><span>{chamber.priority}</span></div>
                <div className="x-mini-progress"><div style={{width:`${pct}%`}}/></div>
                <small>Nível {level} de {chamber.maxLevel}</small>
              </div>
              <div className="x-stepper">
                <button onClick={() => adjust(chamber, -1)} disabled={level <= 0} aria-label={`Diminuir ${chamber.pt}`}><Minus size={15}/></button>
                <strong>{level}</strong>
                <button onClick={() => adjust(chamber, 1)} disabled={level >= chamber.maxLevel} aria-label={`Aumentar ${chamber.pt}`}><Plus size={15}/></button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="x-backup-card">
        <div className="x-section-heading"><div><span className="x-kicker">Backup local</span><h3>Não perca seus trackers</h3></div><Save size={22}/></div>
        <p>Exporta coleção, checklist diário, níveis das câmaras e tema para um arquivo JSON. Nenhuma conta é necessária.</p>
        <div className="x-button-row">
          <button className="x-primary" onClick={exportBackup}><Download size={16}/> Exportar backup</button>
          <button className="x-secondary" onClick={() => fileInput.current?.click()}><Upload size={16}/> Importar</button>
          <button className="x-danger-ghost" onClick={resetChambers}><RotateCcw size={15}/> Zerar câmaras</button>
          <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={importBackup}/>
        </div>
        {notice && <div className="x-notice"><Info size={15}/><span>{notice}</span></div>}
      </section>
    </div>
  );
}

function FaqTab() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [open, setOpen] = useState({});
  const categories = ['Todas', ...new Set(faqItems.map(item => item.category))];
  const filtered = useMemo(() => faqItems.filter(item => {
    const matchesQuery = !query || normalize(`${item.question} ${item.answer} ${item.category}`).includes(normalize(query));
    const matchesCategory = category === 'Todas' || item.category === category;
    return matchesQuery && matchesCategory;
  }), [query, category]);

  return (
    <div className="x-stack">
      <div className="x-search-row">
        <label><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar pergunta..."/></label>
        <select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select>
      </div>
      <div className="x-faq-list">
        {filtered.map(item => {
          const expanded = Boolean(open[item.id]);
          return (
            <article key={item.id} className={expanded ? 'open' : ''}>
              <button className="x-faq-question" onClick={() => setOpen(prev => ({...prev,[item.id]:!prev[item.id]}))}>
                <div><span>{item.category}</span><strong>{item.question}</strong></div>
                {expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
              </button>
              {expanded && <div className="x-faq-answer"><p>{item.answer}</p><div><SourcePill type={item.source}/><small>Verificado em {item.verifiedAt.split('-').reverse().join('/')}</small></div></div>}
            </article>
          );
        })}
        {!filtered.length && <div className="x-empty"><HelpCircle/><strong>Nada encontrado</strong><span>Tente outra palavra ou categoria.</span></div>}
      </div>
    </div>
  );
}

function EventsTab() {
  const allSpecial = [...extraSpecialCreatures];
  return (
    <div className="x-stack">
      <section className="x-info-banner"><CalendarDays size={20}/><div><strong>Arquivo por versão, não calendário inventado</strong><p>Eventos passados entram quando há fonte verificável. Datas ou detalhes incertos ficam de fora até serem confirmados.</p></div></section>
      <div className="x-event-grid">
        {eventArchive.sort((a,b)=>b.year-a.year).map(event => (
          <article key={event.id} className="x-event-card">
            <div className="x-event-top"><span>{event.year}</span><SourcePill type={event.source}/></div>
            <h3>{event.name}</h3>
            <p>{event.summary}</p>
            <div className="x-event-creature"><span>🪲</span><div><small>Criatura ligada ao evento</small><strong>{event.creature}</strong></div></div>
          </article>
        ))}
      </div>
      <section className="x-special-index">
        <div className="x-section-heading"><div><span className="x-kicker">Adições recentes</span><h3>Especiais confirmadas nesta rodada</h3></div></div>
        <div className="x-tag-row">{allSpecial.map(item=><span key={item.id}><strong>{item.name}</strong><small>{item.year} · {item.event}</small></span>)}</div>
      </section>
    </div>
  );
}

function DataTab() {
  const statusLabel = { bom:'Boa cobertura', medio:'Parcial', baixo:'Pendente' };
  const statusPct = { bom:85, medio:55, baixo:25 };
  const totalKnown = creatures.length + specialCreatures.length + extraSpecialCreatures.length + chambers.length;
  return (
    <div className="x-stack">
      <section className="x-data-summary">
        <div><span>Entidades indexadas</span><strong>{totalKnown}+</strong><small>criaturas + câmaras</small></div>
        <div><span>FAQ verificada</span><strong>{faqItems.length}</strong><small>perguntas nesta rodada</small></div>
        <div><span>Fontes registradas</span><strong>{sourceRegistry.length}</strong><small>tipos principais</small></div>
        <div><span>Última revisão</span><strong>{gameMeta.dataCheckedAt.slice(0,5)}</strong><small>2026</small></div>
      </section>

      <section className="x-quality-card">
        <div className="x-section-heading"><div><span className="x-kicker">Cobertura</span><h3>O que está forte e o que ainda falta</h3></div><BarChart3 size={22}/></div>
        <div className="x-coverage-list">
          {contentAreas.map(area => <div key={area.id} className="x-coverage-row"><div className="x-coverage-title"><strong>{area.name}</strong><span className={`x-status x-status-${area.status}`}>{statusLabel[area.status]}</span></div><div className="x-coverage-bar"><div style={{width:`${statusPct[area.status]}%`}}/></div><p>{area.note}</p></div>)}
        </div>
      </section>

      <section className="x-quality-card">
        <div className="x-section-heading"><div><span className="x-kicker">Fontes</span><h3>Registro de origem</h3></div><Database size={22}/></div>
        <div className="x-source-registry">{sourceRegistry.map(source=><article key={source.id}><SourcePill type={source.type}/><strong>{source.label}</strong><p>{source.purpose}</p><small>Checado em {source.checked.split('-').reverse().join('/')}</small></article>)}</div>
      </section>

      <section className="x-quality-card">
        <div className="x-section-heading"><div><span className="x-kicker">Governança</span><h3>Regras para não virar uma wiki de boato</h3></div></div>
        <div className="x-rule-list">{verificationRules.map(rule=><div key={rule}><CheckCircle2 size={16}/><span>{rule}</span></div>)}</div>
      </section>
    </div>
  );
}

export default function Enhancements() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('progress');
  const tabs = [
    ['progress','Progresso',Layers3],
    ['faq','FAQ',HelpCircle],
    ['events','Eventos',CalendarDays],
    ['data','Dados',Database]
  ];

  return (
    <>
      <button className="x-fab" onClick={() => setOpen(true)} aria-label="Abrir central da wiki">
        <Layers3 size={19}/><span>Central</span>
      </button>
      {open && (
        <div className="x-overlay" onClick={() => setOpen(false)}>
          <aside className="x-panel" onClick={event => event.stopPropagation()}>
            <header className="x-panel-header">
              <div><span className="x-kicker">Pocket Ants Wiki BR</span><h2>Central do jogador</h2></div>
              <button className="x-close" onClick={() => setOpen(false)} aria-label="Fechar"><X size={20}/></button>
            </header>
            <nav className="x-tabs">
              {tabs.map(([id,label,Icon])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}><Icon size={16}/><span>{label}</span></button>)}
            </nav>
            <div className="x-panel-body">
              {tab==='progress' && <ProgressTab/>}
              {tab==='faq' && <FaqTab/>}
              {tab==='events' && <EventsTab/>}
              {tab==='data' && <DataTab/>}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
