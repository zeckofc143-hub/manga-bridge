import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import CreatureDatabasePage from './CreatureDatabasePage';

const LegacyApp = lazy(() => import('./App'));

const creatureNav = [
  ['#/', 'Início'],
  ['#/creatures', 'Criaturas'],
  ['#/resources', 'Recursos'],
  ['#/chambers', 'Câmaras'],
  ['#/mechanics', 'Mecânicas'],
  ['#/guides', 'Guias'],
  ['#/tools', 'Ferramentas']
];

function currentCreatureRoute(){
  const hash = window.location.hash || '#/';
  const match = hash.match(/^#\/creatures(?:\/([^?/#]+))?/i);
  return match ? { active:true, id:match[1] ? decodeURIComponent(match[1]) : null } : { active:false, id:null };
}

function CreatureDatabaseShell({ routeId }){
  const [mobileOpen,setMobileOpen] = useState(false);
  const [theme,setTheme] = useState(()=>localStorage.getItem('pa-theme') || 'dark');
  const [query,setQuery] = useState('');

  useEffect(()=>{
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('pa-theme',theme);
  },[theme]);

  useEffect(()=>{
    setMobileOpen(false);
    window.scrollTo({top:0,behavior:'instant'});
  },[routeId]);

  const submitSearch = event => {
    event.preventDefault();
    const q = query.trim();
    if(!q) return;
    window.location.hash = `/creatures?dbq=${encodeURIComponent(q)}`;
  };

  return <div className="app-shell creature-database-shell">
    <header className="site-header">
      <div className="header-inner">
        <a href="#/" className="brand" aria-label="Voltar ao início da Pocket Ants Wiki BR">
          <span className="brand-mark">🐜</span>
          <span className="brand-copy"><strong>Pocket Ants</strong><small>Wiki BR</small></span>
        </a>

        <form className="header-search" onSubmit={submitSearch}>
          <Search size={18}/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar no banco de criaturas..." aria-label="Buscar criaturas"/>
          <kbd>↵</kbd>
        </form>

        <nav className="desktop-nav">
          {creatureNav.slice(1).map(([href,label])=><a key={href} href={href} className={href==='#/creatures'?'active':''}>{label}</a>)}
        </nav>

        <div className="header-actions">
          <button className="icon-button" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label="Alternar tema">
            {theme==='dark'?<Sun size={18}/>:<Moon size={18}/>} 
          </button>
          <button className="icon-button mobile-menu-button" onClick={()=>setMobileOpen(true)} aria-label="Abrir menu"><Menu size={20}/></button>
        </div>
      </div>
    </header>

    {mobileOpen && <div className="mobile-drawer-backdrop" onClick={()=>setMobileOpen(false)}>
      <aside className="mobile-drawer" onClick={e=>e.stopPropagation()}>
        <div className="drawer-head">
          <div className="brand"><span className="brand-mark">🐜</span><strong>Pocket Ants Wiki BR</strong></div>
          <button className="icon-button" onClick={()=>setMobileOpen(false)} aria-label="Fechar menu"><X size={20}/></button>
        </div>
        <nav className="mobile-nav">
          {creatureNav.map(([href,label])=><a key={href} href={href} className={href==='#/creatures'?'active':''}>{label}</a>)}
        </nav>
      </aside>
    </div>}

    <main className="site-main creature-db-main">
      <CreatureDatabasePage routeId={routeId}/>
    </main>

    <footer className="site-footer creature-db-footer">
      <div className="footer-bottom">Banco de Dados de Criaturas · Pocket Ants Wiki BR · dados comunitários revisados e conflitos sinalizados.</div>
    </footer>
  </div>;
}

export default function AppV2(){
  const [hash,setHash] = useState(()=>window.location.hash || '#/');

  useEffect(()=>{
    const onHash = ()=>setHash(window.location.hash || '#/');
    window.addEventListener('hashchange',onHash);
    return ()=>window.removeEventListener('hashchange',onHash);
  },[]);

  const route = useMemo(currentCreatureRoute,[hash]);

  useEffect(()=>{
    document.body.classList.toggle('creature-database-route',route.active);
    document.body.classList.remove('encyclopedia-route');
    return ()=>document.body.classList.remove('creature-database-route');
  },[route.active]);

  if(route.active) return <CreatureDatabaseShell routeId={route.id}/>;
  return <Suspense fallback={null}><LegacyApp/></Suspense>;
}
