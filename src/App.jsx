import React, { useEffect, useMemo, useState } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  Home as HomeIcon,
  Bug,
  Leaf,
  Warehouse,
  BookOpen,
  Wrench,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Circle,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Swords,
  SlidersHorizontal,
  RotateCcw,
  Moon,
  Sun,
  Database,
  ListChecks,
  GitCompareArrows,
  Calculator,
  Sparkles,
  Info,
  Target,
  Filter,
  Map,
  Library,
  Github
} from 'lucide-react';
import {
  gameMeta,
  sources,
  resources,
  chambers,
  creatures,
  specialCreatures,
  mechanics,
  beginnerSteps,
  guides,
  glossary,
  dailyTasks,
  sourceNotes
} from './wikiData';

const navItems = [
  ['/', 'Início', HomeIcon],
  ['/creatures', 'Criaturas', Bug],
  ['/resources', 'Recursos', Leaf],
  ['/chambers', 'Câmaras', Warehouse],
  ['/mechanics', 'Mecânicas', Map],
  ['/guides', 'Guias', BookOpen],
  ['/tools', 'Ferramentas', Wrench]
];

const normalize = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

const rarityOrder = ['Comum', 'Incomum', 'Rara', 'Lendária', 'Especial'];

function SourceBadge({ type = 'community' }) {
  const source = sources[type] || sources.community;
  return (
    <span className={`source-badge source-${source.tone}`} title={source.detail}>
      {source.tone === 'official' ? <ShieldCheck size={13} /> : source.tone === 'review' ? <AlertTriangle size={13} /> : <Database size={13} />}
      {source.label}
    </span>
  );
}

function PageTitle({ eyebrow, title, text, children }) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {children && <div className="page-heading-actions">{children}</div>}
    </div>
  );
}

function EmptyState({ text = 'Nada encontrado com esses filtros.' }) {
  return (
    <div className="empty-state">
      <Search size={30} />
      <strong>Nenhum resultado</strong>
      <span>{text}</span>
    </div>
  );
}

function Shell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('pa-theme') || 'dark');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('pa-theme', theme);
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const submitSearch = (event) => {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="Pocket Ants Wiki BR">
            <span className="brand-mark">🐜</span>
            <span className="brand-copy">
              <strong>Pocket Ants</strong>
              <small>Wiki BR</small>
            </span>
          </Link>

          <form className="header-search" onSubmit={submitSearch}>
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar criatura, recurso, câmara..."
              aria-label="Buscar na wiki"
            />
            <kbd>↵</kbd>
          </form>

          <nav className="desktop-nav">
            {navItems.slice(1).map(([path, label]) => (
              <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Alternar tema">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="icon-button mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)}>
          <aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <div className="brand"><span className="brand-mark">🐜</span><strong>Pocket Ants Wiki BR</strong></div>
              <button className="icon-button" onClick={() => setMobileOpen(false)}><X size={20} /></button>
            </div>
            <form className="drawer-search" onSubmit={submitSearch}>
              <Search size={18} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar na wiki" />
            </form>
            <nav className="mobile-nav">
              {navItems.map(([path, label, Icon]) => (
                <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''}>
                  <Icon size={19} /> {label}
                </NavLink>
              ))}
              <NavLink to="/glossary" className={({ isActive }) => isActive ? 'active' : ''}><Library size={19} /> Glossário</NavLink>
            </nav>
          </aside>
        </div>
      )}

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand"><span className="brand-mark">🐜</span><strong>Pocket Ants Wiki BR</strong></div>
            <p>Wiki comunitária independente, feita para organizar dados, guias e ferramentas do Pocket Ants.</p>
          </div>
          <div>
            <strong>Explorar</strong>
            <Link to="/creatures">Criaturas</Link>
            <Link to="/resources">Recursos</Link>
            <Link to="/chambers">Câmaras</Link>
            <Link to="/tools">Ferramentas</Link>
          </div>
          <div>
            <strong>Fontes</strong>
            <a href={gameMeta.officialGameUrl} target="_blank" rel="noreferrer">Google Play <ExternalLink size={13} /></a>
            <a href={gameMeta.communityWikiUrl} target="_blank" rel="noreferrer">PocketAnts Wiki <ExternalLink size={13} /></a>
            <a href={gameMeta.redditUrl} target="_blank" rel="noreferrer">r/PocketAnts <ExternalLink size={13} /></a>
          </div>
        </div>
        <div className="footer-bottom">Dados revisados em {gameMeta.dataCheckedAt}. Pocket Ants pertence aos seus respectivos criadores.</div>
      </footer>
    </div>
  );
}

function Home() {
  const featured = creatures.filter(c => ['scorpion', 'bombardier-beetle', 'centipede', 'dragonfly'].includes(c.id));
  return (
    <>
      <section className="hero section-full">
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
        <div className="content-width hero-grid">
          <div className="hero-copy">
            <span className="hero-pill"><Sparkles size={15} /> Base atualizada em setembro de 2026</span>
            <h1>A wiki de Pocket Ants que tenta <em>organizar o jogo de verdade.</em></h1>
            <p>Recursos, câmaras, criaturas, farm, progressão, guias e ferramentas num lugar só — com fonte e nível de confiança visíveis.</p>
            <div className="hero-actions">
              <Link to="/guides" className="button primary"><BookOpen size={18} /> Começar pelo guia</Link>
              <Link to="/tools" className="button secondary"><Wrench size={18} /> Abrir ferramentas</Link>
            </div>
            <div className="trust-row">
              <span><ShieldCheck size={16} /> Fonte oficial separada</span>
              <span><AlertTriangle size={16} /> Conflitos sinalizados</span>
              <span><Database size={16} /> Dados comunitários rotulados</span>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-head"><span>Visão rápida</span><span className="live-dot">Base v0.1</span></div>
            <div className="hero-stats">
              <div><strong>{creatures.length}</strong><span>criaturas base</span></div>
              <div><strong>{specialCreatures.length}+</strong><span>especiais catalogadas</span></div>
              <div><strong>{chambers.length}</strong><span>câmaras</span></div>
              <div><strong>{resources.length}</strong><span>recursos</span></div>
            </div>
            <div className="hero-panel-note">
              <Info size={17} />
              <span>A página oficial confirma coleta, upgrades, criação de formigas, captura de criaturas e invasões. Detalhes finos recebem fonte comunitária.</span>
            </div>
          </div>
        </div>
      </section>

      <div className="content-width page-stack home-stack">
        <section>
          <div className="section-title-row">
            <div><span className="eyebrow">Navegação</span><h2>O que você quer resolver?</h2></div>
          </div>
          <div className="category-grid">
            {[
              ['/creatures','🪲','Criaturas','Stats, raridade, função, captura e filtros.'],
              ['/resources','🍃','Recursos','Onde conseguir e para que serve cada recurso.'],
              ['/chambers','🏠','Câmaras','Prioridade, limite e função de cada sala.'],
              ['/guides','📚','Guias','Early, mid, late game, resina e honeydew.'],
              ['/tools','🧮','Ferramentas','Comparador, farm planner e checklists.'],
              ['/mechanics','⚔️','Mecânicas','PvP, co-op, Garrison, Beehive e mais.']
            ].map(([path, icon, title, text]) => (
              <Link className="category-card" to={path} key={path}>
                <span className="category-icon">{icon}</span>
                <div><strong>{title}</strong><p>{text}</p></div>
                <ChevronRight size={19} />
              </Link>
            ))}
          </div>
        </section>

        <section className="split-section">
          <div>
            <div className="section-title-row"><div><span className="eyebrow">Primeiros passos</span><h2>Progressão sem gastar recurso à toa</h2></div><Link to="/guides" className="text-link">Todos os guias <ChevronRight size={15}/></Link></div>
            <div className="timeline-card">
              {beginnerSteps.map(item => (
                <div className="timeline-item" key={item.step}>
                  <span>{item.step}</span>
                  <div><strong>{item.title}</strong><p>{item.text}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="section-title-row"><div><span className="eyebrow">Early / mid game</span><h2>Criaturas para conhecer</h2></div></div>
            <div className="mini-creature-list">
              {featured.map(creature => <CreatureMiniCard creature={creature} key={creature.id} />)}
            </div>
          </div>
        </section>

        <section className="source-box">
          <div className="source-box-icon"><Database size={24} /></div>
          <div>
            <span className="eyebrow">Política de dados</span>
            <h2>Sem transformar opinião em “fato da wiki”.</h2>
            <div className="source-notes">
              {sourceNotes.map(note => <div key={note}><CheckCircle2 size={16}/><span>{note}</span></div>)}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function CreatureMiniCard({ creature }) {
  return (
    <Link to={`/creatures/${creature.id}`} className="mini-creature-card">
      <div className="mini-creature-avatar">{creature.rarity === 'Lendária' ? '👑' : '🪲'}</div>
      <div><strong>{creature.name}</strong><span>{creature.rarity} · {creature.roles.join(' / ')}</span></div>
      <ChevronRight size={17}/>
    </Link>
  );
}

function CreaturesPage() {
  const [query, setQuery] = useState('');
  const [rarity, setRarity] = useState('Todas');
  const [role, setRole] = useState('Todos');
  const roles = useMemo(() => [...new Set(creatures.flatMap(c => c.roles))].sort(), []);

  const filtered = useMemo(() => creatures.filter(creature => {
    const haystack = normalize([creature.name, creature.rarity, creature.phase, creature.roles.join(' '), creature.attraction].join(' '));
    return (!query || haystack.includes(normalize(query))) && (rarity === 'Todas' || creature.rarity === rarity) && (role === 'Todos' || creature.roles.includes(role));
  }), [query, rarity, role]);

  return (
    <div className="content-width page-stack">
      <PageTitle eyebrow="Banco de dados" title="Criaturas" text="Filtre por raridade e função. Stats numéricos usam a escala registrada pela wiki comunitária e ficam separados de recomendações de meta." />
      <div className="filter-panel">
        <label className="search-field"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar criatura, fase ou condição..." /></label>
        <select value={rarity} onChange={e=>setRarity(e.target.value)}>
          <option>Todas</option>{rarityOrder.filter(r=>r!=='Especial').map(r=><option key={r}>{r}</option>)}
        </select>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option>Todos</option>{roles.map(r=><option key={r}>{r}</option>)}
        </select>
        <span className="result-count">{filtered.length} resultados</span>
      </div>

      {filtered.length ? <div className="creature-grid">{filtered.map(c => <CreatureCard creature={c} key={c.id}/>)}</div> : <EmptyState />}

      <section className="special-section">
        <div className="section-title-row"><div><span className="eyebrow">Eventos</span><h2>Criaturas especiais</h2><p>A referência comunitária informa dezenas de variantes especiais exclusivas de eventos. Esta primeira base já indexa as confirmadas na pesquisa.</p></div></div>
        <div className="tag-cloud">{specialCreatures.map(c => <span key={c.id}>{c.name}</span>)}</div>
      </section>
    </div>
  );
}

function RatingBar({ label, value }) {
  const pct = value == null ? 0 : Math.min(100, value * 10);
  return (
    <div className="rating-row">
      <span>{label}</span>
      <div className="rating-track"><div style={{ width: `${pct}%` }}/></div>
      <strong>{value ?? '?'}</strong>
    </div>
  );
}

function CreatureCard({ creature }) {
  return (
    <Link to={`/creatures/${creature.id}`} className="creature-card">
      <div className="creature-card-top">
        <span className={`rarity rarity-${normalize(creature.rarity).replaceAll(' ','-')}`}>{creature.rarity}</span>
        <SourceBadge type={creature.source}/>
      </div>
      <div className="creature-visual">{creature.rarity === 'Lendária' ? '🦀' : creature.roles.includes('Curandeiro') ? '🦋' : '🪲'}</div>
      <h3>{creature.name}</h3>
      <div className="role-row">{creature.roles.map(r=><span key={r}>{r}</span>)}</div>
      <div className="rating-block compact">
        <RatingBar label="HP" value={creature.hp}/>
        <RatingBar label="ATK" value={creature.atk}/>
        <RatingBar label="VEL" value={creature.speed}/>
      </div>
      <div className="creature-meta"><span><Clock size={14}/>{creature.capture}</span><span><Target size={14}/>{creature.phase}</span></div>
    </Link>
  );
}

function CreatureDetail() {
  const { id } = useParams();
  const creature = creatures.find(c => c.id === id);
  if (!creature) return <NotFound />;
  return (
    <div className="content-width page-stack detail-page">
      <Link to="/creatures" className="back-link">← Voltar para criaturas</Link>
      <section className="detail-hero">
        <div className="detail-icon">{creature.rarity === 'Lendária' ? '👑' : '🪲'}</div>
        <div className="detail-copy">
          <div className="detail-badges"><span className={`rarity rarity-${normalize(creature.rarity)}`}>{creature.rarity}</span><SourceBadge type={creature.source}/></div>
          <h1>{creature.name}</h1>
          <p>{creature.note}</p>
          <div className="role-row">{creature.roles.map(r=><span key={r}>{r}</span>)}</div>
        </div>
      </section>
      <div className="detail-grid">
        <section className="panel-card">
          <h2>Stats relativos</h2>
          <p className="muted">Escala comunitária usada para comparação entre criaturas.</p>
          <div className="rating-block">
            <RatingBar label="Vida" value={creature.hp}/>
            <RatingBar label="Ataque" value={creature.atk}/>
            <RatingBar label="Velocidade" value={creature.speed}/>
          </div>
        </section>
        <section className="panel-card">
          <h2>Captura e obtenção</h2>
          <dl className="info-list">
            <div><dt>Tempo</dt><dd>{creature.capture}</dd></div>
            <div><dt>Condição</dt><dd>{creature.attraction}</dd></div>
            <div><dt>Partes</dt><dd>{creature.bodyParts ?? '—'}</dd></div>
            <div><dt>Fase</dt><dd>{creature.phase}</dd></div>
          </dl>
        </section>
      </div>
      <section className="note-card"><Info size={20}/><div><strong>Como ler esta página</strong><p>Stats e condições são dados de referência. A frase de estratégia é tratada como orientação comunitária e pode mudar conforme eventos, counters e atualizações.</p></div></section>
    </div>
  );
}

function ResourcesPage() {
  const [category, setCategory] = useState('Todos');
  const categories = ['Todos', ...new Set(resources.map(r=>r.category))];
  const filtered = category === 'Todos' ? resources : resources.filter(r=>r.category === category);
  return (
    <div className="content-width page-stack">
      <PageTitle eyebrow="Economia" title="Recursos" text="O que cada recurso faz, onde obter e qual é o papel dele na progressão." />
      <div className="chip-filter">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
      <div className="resource-grid">
        {filtered.map(resource => (
          <article className="resource-card" key={resource.id}>
            <div className="resource-head"><span className="resource-icon">{resource.icon}</span><div><span>{resource.category}</span><h2>{resource.name}</h2></div><SourceBadge type={resource.source}/></div>
            <p>{resource.summary}</p>
            <div className="resource-columns">
              <div><strong>Como obter</strong>{resource.obtain.map(x=><span key={x}>• {x}</span>)}</div>
              <div><strong>Usos</strong>{resource.uses.map(x=><span key={x}>• {x}</span>)}</div>
            </div>
            <div className="tip-line"><Sparkles size={16}/><span>{resource.tip}</span></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ChambersPage() {
  const priorities = ['Todas','Crítica','Alta','Média','Situacional'];
  const [priority, setPriority] = useState('Todas');
  const filtered = priority === 'Todas' ? chambers : chambers.filter(c=>c.priority===priority);
  return (
    <div className="content-width page-stack">
      <PageTitle eyebrow="Colônia" title="Câmaras" text="Função, prioridade e limites em uma visão feita para decidir o próximo upgrade." />
      <div className="chip-filter">{priorities.map(p=><button key={p} className={priority===p?'active':''} onClick={()=>setPriority(p)}>{p}</button>)}</div>
      <div className="chamber-grid">
        {filtered.map(chamber => (
          <Link to={`/chambers/${chamber.id}`} className="chamber-card" key={chamber.id}>
            <div className="chamber-icon">{chamber.icon}</div>
            <div className="chamber-card-main"><div className="chamber-labels"><span className={`priority priority-${normalize(chamber.priority)}`}>{chamber.priority}</span><SourceBadge type={chamber.source}/></div><h2>{chamber.pt}</h2><small>{chamber.name}</small><p>{chamber.summary}</p></div>
            <div className="chamber-level"><span>MAX</span><strong>{chamber.maxLevel}</strong><ChevronRight size={18}/></div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ChamberDetail() {
  const { id } = useParams();
  const chamber = chambers.find(c=>c.id===id);
  if (!chamber) return <NotFound/>;
  return (
    <div className="content-width page-stack detail-page">
      <Link to="/chambers" className="back-link">← Voltar para câmaras</Link>
      <section className="detail-hero compact-detail">
        <div className="detail-icon">{chamber.icon}</div>
        <div className="detail-copy"><div className="detail-badges"><span className={`priority priority-${normalize(chamber.priority)}`}>{chamber.priority}</span><SourceBadge type={chamber.source}/></div><h1>{chamber.pt}</h1><span className="latin-name">{chamber.name}</span><p>{chamber.summary}</p></div>
      </section>
      <div className="detail-grid">
        <section className="panel-card"><h2>Por que importa</h2><p>{chamber.why}</p><div className="big-stat"><span>Nível máximo</span><strong>{chamber.maxLevel}</strong></div></section>
        <section className="panel-card"><h2>Fatos rápidos</h2><div className="fact-list">{chamber.facts.map(f=><div key={f}><CheckCircle2 size={17}/><span>{f}</span></div>)}</div></section>
      </div>
      {chamber.source === 'review' && <section className="warning-card"><AlertTriangle size={22}/><div><strong>Existe conflito entre páginas comunitárias</strong><p>Em vez de escolher silenciosamente um valor, esta wiki mostra o conflito e mantém o dado marcado para revisão. Isso é intencional.</p></div></section>}
    </div>
  );
}

function MechanicsPage() {
  return (
    <div className="content-width page-stack">
      <PageTitle eyebrow="Sistemas do jogo" title="Mecânicas" text="Um mapa rápido dos sistemas mais importantes para entender onde cada recurso e upgrade entra." />
      <div className="mechanics-grid">
        {mechanics.map(item => <article key={item.id} className="mechanic-card"><div className="mechanic-icon">{item.icon}</div><div className="mechanic-title"><h2>{item.name}</h2><SourceBadge type={item.source}/></div><p>{item.summary}</p></article>)}
      </div>
      <section className="map-flow">
        <span>Coleta</span><ChevronRight/><span>Colônia</span><ChevronRight/><span>Soldados</span><ChevronRight/><span>Criaturas</span><ChevronRight/><span>Co-op / PvP</span><ChevronRight/><span>Late game</span>
      </section>
    </div>
  );
}

function GuidesPage() {
  const [level, setLevel] = useState('Todos');
  const levels = ['Todos','Iniciante','Iniciante / intermediário','Intermediário','Todos'];
  const unique = [...new Set(levels)];
  const filtered = level === 'Todos' ? guides : guides.filter(g=>g.level===level);
  return (
    <div className="content-width page-stack">
      <PageTitle eyebrow="Biblioteca" title="Guias" text="Dado confirmado fica separado de estratégia comunitária. Assim um conselho de meta não vira regra eterna só porque entrou numa página." />
      <div className="chip-filter">{unique.map(l=><button key={l} className={level===l?'active':''} onClick={()=>setLevel(l)}>{l}</button>)}</div>
      <div className="guide-grid">
        {filtered.map(guide => <article className="guide-card" key={guide.id}><div className="guide-top"><span>{guide.level}</span><SourceBadge type={guide.source}/></div><h2>{guide.title}</h2><p>{guide.summary}</p><ul>{guide.bullets.map(b=><li key={b}><CheckCircle2 size={16}/><span>{b}</span></li>)}</ul></article>)}
      </div>
      <section className="beginner-roadmap">
        <div className="section-title-row"><div><span className="eyebrow">Roadmap</span><h2>Primeiros passos em 5 decisões</h2></div></div>
        <div className="roadmap-grid">{beginnerSteps.map(item=><article key={item.step}><span>{item.step}</span><strong>{item.title}</strong><p>{item.text}</p></article>)}</div>
      </section>
    </div>
  );
}

function CreatureComparer() {
  const [aId, setAId] = useState('scorpion');
  const [bId, setBId] = useState('centipede');
  const a = creatures.find(c=>c.id===aId);
  const b = creatures.find(c=>c.id===bId);
  const rows = [['Vida','hp'],['Ataque','atk'],['Velocidade','speed']];
  return (
    <div className="tool-card">
      <div className="tool-card-head"><div className="tool-icon"><GitCompareArrows/></div><div><h2>Comparador de criaturas</h2><p>Compare ratings relativos lado a lado.</p></div></div>
      <div className="compare-selects"><select value={aId} onChange={e=>setAId(e.target.value)}>{creatures.map(c=><option value={c.id} key={c.id}>{c.name}</option>)}</select><span>VS</span><select value={bId} onChange={e=>setBId(e.target.value)}>{creatures.map(c=><option value={c.id} key={c.id}>{c.name}</option>)}</select></div>
      <div className="compare-table"><div className="compare-header"><strong>{a.name}</strong><span></span><strong>{b.name}</strong></div>{rows.map(([label,key])=><div className="compare-row" key={key}><strong className={(a[key]??-1)>(b[key]??-1)?'winner':''}>{a[key] ?? '?'}</strong><span>{label}</span><strong className={(b[key]??-1)>(a[key]??-1)?'winner':''}>{b[key] ?? '?'}</strong></div>)}</div>
      <div className="compare-footer"><span>{a.roles.join(' / ')}</span><span>{b.roles.join(' / ')}</span></div>
    </div>
  );
}

function FarmCalculator() {
  const [current, setCurrent] = useState(0);
  const [target, setTarget] = useState(5000);
  const [perRun, setPerRun] = useState(250);
  const [minutes, setMinutes] = useState(8);
  const missing = Math.max(0, Number(target || 0) - Number(current || 0));
  const runs = perRun > 0 ? Math.ceil(missing / perRun) : 0;
  const totalMinutes = runs * Number(minutes || 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = Math.round(totalMinutes % 60);
  return (
    <div className="tool-card">
      <div className="tool-card-head"><div className="tool-icon"><Calculator/></div><div><h2>Planejador de farm</h2><p>Use sua média real por run para estimar quanto falta.</p></div></div>
      <div className="form-grid">
        <label>Tenho agora<input type="number" min="0" value={current} onChange={e=>setCurrent(e.target.value)}/></label>
        <label>Meta<input type="number" min="0" value={target} onChange={e=>setTarget(e.target.value)}/></label>
        <label>Ganho por run<input type="number" min="1" value={perRun} onChange={e=>setPerRun(e.target.value)}/></label>
        <label>Minutos por run<input type="number" min="0" value={minutes} onChange={e=>setMinutes(e.target.value)}/></label>
      </div>
      <div className="calc-results"><div><span>Faltam</span><strong>{missing.toLocaleString('pt-BR')}</strong></div><div><span>Runs</span><strong>{runs}</strong></div><div><span>Tempo estimado</span><strong>{hours ? `${hours}h ${mins}m` : `${mins}m`}</strong></div></div>
      <p className="tool-disclaimer">A calculadora não inventa drop rate: você coloca a sua média, então ela continua útil mesmo se o jogo mudar.</p>
    </div>
  );
}

function DailyChecklist() {
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pa-daily') || '{}'); } catch { return {}; }
  });
  const toggle = id => {
    const next = { ...done, [id]: !done[id] };
    setDone(next);
    localStorage.setItem('pa-daily', JSON.stringify(next));
  };
  const reset = () => { setDone({}); localStorage.setItem('pa-daily','{}'); };
  const count = dailyTasks.filter(t=>done[t.id]).length;
  return (
    <div className="tool-card">
      <div className="tool-card-head"><div className="tool-icon"><ListChecks/></div><div><h2>Checklist diário</h2><p>Fica salvo neste aparelho.</p></div><button className="tiny-button" onClick={reset}><RotateCcw size={14}/> Resetar</button></div>
      <div className="progress-line"><div style={{width:`${(count/dailyTasks.length)*100}%`}}/></div>
      <span className="progress-label">{count}/{dailyTasks.length} concluídos</span>
      <div className="checklist">{dailyTasks.map(task=><button key={task.id} onClick={()=>toggle(task.id)} className={done[task.id]?'done':''}>{done[task.id]?<CheckCircle2/>:<Circle/>}<span>{task.label}</span></button>)}</div>
    </div>
  );
}

function CollectionTracker() {
  const all = [...creatures.map(c=>({id:c.id,name:c.name,kind:c.rarity})), ...specialCreatures.map(c=>({id:c.id,name:c.name,kind:'Especial'}))];
  const [owned, setOwned] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pa-collection') || '{}'); } catch { return {}; }
  });
  const [query, setQuery] = useState('');
  const toggle = id => { const next={...owned,[id]:!owned[id]}; setOwned(next); localStorage.setItem('pa-collection',JSON.stringify(next)); };
  const filtered = all.filter(c=>normalize(c.name).includes(normalize(query)));
  const count = all.filter(c=>owned[c.id]).length;
  return (
    <div className="tool-card collection-card">
      <div className="tool-card-head"><div className="tool-icon"><Bug/></div><div><h2>Tracker de coleção</h2><p>{count}/{all.length} marcadas como obtidas.</p></div></div>
      <label className="search-field compact-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Filtrar coleção..."/></label>
      <div className="collection-list">{filtered.map(c=><button key={c.id} className={owned[c.id]?'owned':''} onClick={()=>toggle(c.id)}>{owned[c.id]?<CheckCircle2/>:<Circle/>}<span><strong>{c.name}</strong><small>{c.kind}</small></span></button>)}</div>
    </div>
  );
}

function ToolsPage() {
  return (
    <div className="content-width page-stack">
      <PageTitle eyebrow="Utilidades" title="Ferramentas" text="Coisas que uma wiki tradicional quase nunca entrega: comparação, planejamento e trackers salvos no navegador." />
      <div className="tools-grid"><CreatureComparer/><FarmCalculator/><DailyChecklist/><CollectionTracker/></div>
    </div>
  );
}

function GlossaryPage() {
  return (
    <div className="content-width page-stack narrow-page">
      <PageTitle eyebrow="Referência" title="Glossário" text="Siglas e termos que aparecem em guias e conversas da comunidade." />
      <div className="glossary-list">{glossary.map(([term,desc])=><div key={term}><strong>{term}</strong><p>{desc}</p></div>)}</div>
    </div>
  );
}

function buildSearchIndex() {
  return [
    ...creatures.map(x=>({type:'Criatura',title:x.name,text:`${x.rarity} · ${x.roles.join(', ')} · ${x.attraction}`,path:`/creatures/${x.id}`,source:x.source})),
    ...resources.map(x=>({type:'Recurso',title:x.name,text:x.summary,path:'/resources',source:x.source})),
    ...chambers.map(x=>({type:'Câmara',title:x.pt,text:`${x.name} · ${x.summary}`,path:`/chambers/${x.id}`,source:x.source})),
    ...mechanics.map(x=>({type:'Mecânica',title:x.name,text:x.summary,path:'/mechanics',source:x.source})),
    ...guides.map(x=>({type:'Guia',title:x.title,text:x.summary,path:'/guides',source:x.source}))
  ];
}

function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initial = new URLSearchParams(location.search).get('q') || '';
  const [query, setQuery] = useState(initial);
  useEffect(()=>setQuery(initial),[initial]);
  const index = useMemo(buildSearchIndex, []);
  const results = query.trim() ? index.filter(item=>normalize(`${item.title} ${item.text} ${item.type}`).includes(normalize(query))).slice(0,50) : [];
  const submit=e=>{e.preventDefault(); navigate(`/search?q=${encodeURIComponent(query.trim())}`)};
  return (
    <div className="content-width page-stack narrow-page">
      <PageTitle eyebrow="Busca global" title={`Resultados${initial ? ` para “${initial}”` : ''}`} text="A busca cobre criaturas, recursos, câmaras, mecânicas e guias." />
      <form className="big-search" onSubmit={submit}><Search/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ex.: resina, scorpion, rainha..."/><button className="button primary">Buscar</button></form>
      {results.length ? <div className="search-results">{results.map((item,i)=><Link to={item.path} key={`${item.type}-${item.title}-${i}`}><span className="search-type">{item.type}</span><div><strong>{item.title}</strong><p>{item.text}</p></div><SourceBadge type={item.source}/><ChevronRight/></Link>)}</div> : <EmptyState text={query ? 'Tente outro nome, função, raridade ou sistema.' : 'Digite algo para buscar em toda a wiki.'}/>} 
    </div>
  );
}

function NotFound() {
  return <div className="content-width not-found"><span>404</span><h1>Página não encontrada</h1><p>Essa formiga cavou para o lado errado.</p><Link to="/" className="button primary">Voltar ao início</Link></div>;
}

function AppRoutes() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/creatures" element={<CreaturesPage/>}/>
        <Route path="/creatures/:id" element={<CreatureDetail/>}/>
        <Route path="/resources" element={<ResourcesPage/>}/>
        <Route path="/chambers" element={<ChambersPage/>}/>
        <Route path="/chambers/:id" element={<ChamberDetail/>}/>
        <Route path="/mechanics" element={<MechanicsPage/>}/>
        <Route path="/guides" element={<GuidesPage/>}/>
        <Route path="/tools" element={<ToolsPage/>}/>
        <Route path="/glossary" element={<GlossaryPage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Shell>
  );
}

export default function App() {
  return <HashRouter><AppRoutes/></HashRouter>;
}
