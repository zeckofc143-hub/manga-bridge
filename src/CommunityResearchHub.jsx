import React, { useMemo, useState } from 'react';
import { BookOpen, ChevronDown, ExternalLink, Search, ShieldAlert, Sparkles, Users, X } from 'lucide-react';
import { researchSnapshot, communityConsensus, knowledgeSections, sourceRegistry } from './communityResearchData';
import { latestResearchStatus, expansionKnowledgeSections, expansionSources, executiveResearchCoverage } from './researchExpansionData';
import './communityResearchHub.css';

const tabs = [
  ['all', 'Tudo'],
  ['Fundamentos', 'Fundamentos'],
  ['Farm', 'Farm'],
  ['Diário', 'Diário'],
  ['Honeydew', 'Honeydew'],
  ['Mapa', 'Mapa'],
  ['Dungeon', 'Dungeon'],
  ['Bosses', 'Bosses'],
  ['Shops', 'Shops'],
  ['Multiplayer', 'Multiplayer'],
  ['PvP', 'PvP'],
  ['Garden', 'Garden'],
  ['Eventos', 'Eventos']
];

function confidenceLabel(value) {
  if (value === 'alto') return 'Consenso forte';
  if (value === 'médio-alto') return 'Consenso frequente';
  return 'Opinião recorrente';
}

function coverageLabel(status) {
  if (status === 'forte') return 'Implementado';
  if (status === 'expandindo') return 'Em expansão';
  if (status === 'parcial') return 'Parcial';
  return 'Secundário';
}

export default function CommunityResearchHub() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('Todos');
  const normalized = query.trim().toLowerCase();

  const allKnowledgeSections = useMemo(() => [...knowledgeSections, ...expansionKnowledgeSections], []);
  const allSources = useMemo(() => [...sourceRegistry, ...expansionSources], []);

  const filteredSections = useMemo(() => allKnowledgeSections.filter(section => {
    const byTab = tab === 'all' || section.category === tab;
    const haystack = `${section.title} ${section.category} ${section.items.join(' ')}`.toLowerCase();
    return byTab && (!normalized || haystack.includes(normalized));
  }), [tab, normalized, allKnowledgeSections]);

  const filteredConsensus = useMemo(() => communityConsensus.filter(item => {
    const haystack = `${item.title} ${item.category} ${item.summary} ${item.bullets.join(' ')}`.toLowerCase();
    return !normalized || haystack.includes(normalized);
  }), [normalized]);

  const sourceTypes = ['Todos', ...Array.from(new Set(allSources.map(s => s.type)))];
  const filteredSources = allSources.filter(source => {
    const typeOk = sourceFilter === 'Todos' || source.type === sourceFilter;
    const haystack = `${source.name} ${source.topic} ${source.type}`.toLowerCase();
    return typeOk && (!normalized || haystack.includes(normalized));
  });

  return (
    <>
      <button className="research-fab" onClick={() => setOpen(true)} aria-label="Abrir centro de pesquisa Pocket Ants">
        <BookOpen size={18}/><span>Pesquisa + Comunidade</span>
      </button>

      {open && <div className="research-overlay" onClick={() => setOpen(false)}>
        <section className="research-modal" onClick={e => e.stopPropagation()}>
          <header className="research-header">
            <div>
              <span className="research-kicker">Pocket Ants Wiki BR</span>
              <h2>Centro de Pesquisa + Comunidade</h2>
              <p>Conteúdo cruzado entre fontes oficiais, wiki comunitária, Reddit e guias públicos. Revisão mais recente em {latestResearchStatus.verifiedAt.split('-').reverse().join('/')}.</p>
            </div>
            <button className="research-close" onClick={() => setOpen(false)} aria-label="Fechar centro de pesquisa"><X size={21}/></button>
          </header>

          <div className="research-searchbar">
            <Search size={17}/>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar: resin, frog, pvp, beehive, Vinegaroon, shop..."/>
          </div>

          <section className="research-stats">
            <article><span>Versão atual</span><strong>{latestResearchStatus.gameVersion}</strong><small>Google Play · {latestResearchStatus.storeUpdatedAt}</small></article>
            <article><span>Downloads</span><strong>{researchSnapshot.game.downloads}</strong><small>Google Play</small></article>
            <article><span>Google Play</span><strong>{researchSnapshot.game.googlePlayRating}</strong><small>centenas de milhares de avaliações</small></article>
            <article><span>Modelo</span><strong>F2P</strong><small>anúncios + compras no app</small></article>
          </section>

          <section className="research-block">
            <div className="research-title-row"><Sparkles size={18}/><div><span>Execução dos dois levantamentos aprofundados</span><h3>O que já virou site e o que ainda falta</h3></div></div>
            <div className="knowledge-grid">
              {executiveResearchCoverage.map(item => <article className="knowledge-card" key={item.id}>
                <div className="knowledge-cat">{coverageLabel(item.status)}</div>
                <h4>{item.label}</h4>
                <p>{item.detail}</p>
              </article>)}
            </div>
          </section>

          <section className="research-sentiment">
            <div className="sentiment-card positive">
              <div className="sentiment-head"><Sparkles size={18}/><strong>O que a comunidade curte</strong></div>
              {researchSnapshot.sentiment.positive.map(item => <p key={item}>• {item}</p>)}
            </div>
            <div className="sentiment-card negative">
              <div className="sentiment-head"><ShieldAlert size={18}/><strong>O que mais incomoda</strong></div>
              {researchSnapshot.sentiment.negative.map(item => <p key={item}>• {item}</p>)}
            </div>
          </section>

          <section className="research-block">
            <div className="research-title-row"><Users size={18}/><div><span>Meta vivo</span><h3>O que os jogadores estão recomendando</h3></div></div>
            <div className="consensus-grid">
              {filteredConsensus.map(item => <article className="consensus-card" key={item.id}>
                <div className="consensus-top"><span>{item.category}</span><b>{confidenceLabel(item.confidence)}</b></div>
                <h4>{item.title}</h4>
                <p>{item.summary}</p>
                <details><summary>Ver detalhes <ChevronDown size={14}/></summary>{item.bullets.map(x => <div className="consensus-line" key={x}>• {x}</div>)}</details>
              </article>)}
            </div>
          </section>

          <section className="research-block">
            <div className="research-title-row"><BookOpen size={18}/><div><span>Enciclopédia rápida</span><h3>Mecânicas e sistemas</h3></div></div>
            <nav className="research-tabs">{tabs.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={tab === id ? 'active' : ''}>{label}</button>)}</nav>
            <div className="knowledge-grid">
              {filteredSections.map(section => <article className="knowledge-card" key={section.id}>
                <div className="knowledge-cat">{section.category}</div>
                <h4>{section.title}</h4>
                {section.items.map(item => <p key={item}>• {item}</p>)}
              </article>)}
              {!filteredSections.length && <div className="research-empty">Nada encontrado nesse filtro.</div>}
            </div>
          </section>

          <section className="research-block sources-block">
            <div className="research-title-row"><ExternalLink size={18}/><div><span>Transparência</span><h3>Fontes usadas na pesquisa</h3></div></div>
            <div className="source-filters">{sourceTypes.map(type => <button key={type} className={sourceFilter === type ? 'active' : ''} onClick={() => setSourceFilter(type)}>{type}</button>)}</div>
            <div className="source-list">
              {filteredSources.map(source => <a key={`${source.url}-${source.topic}`} href={source.url} target="_blank" rel="noreferrer" className="source-row">
                <div><span>{source.type}</span><strong>{source.name}</strong><small>{source.topic}</small></div><ExternalLink size={15}/>
              </a>)}
            </div>
          </section>

          <footer className="research-footer">
            <strong>Regra da wiki:</strong> fato oficial, dado comunitário e opinião de meta não são tratados como a mesma coisa. Estratégias podem mudar com atualização, evento e balanceamento. {latestResearchStatus.note}
          </footer>
        </section>
      </div>}
    </>
  );
}
