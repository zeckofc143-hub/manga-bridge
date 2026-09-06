import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import CreatureDatabasePage from './CreatureDatabasePage';
import ResourceDatabasePage from './ResourceDatabasePage';
import { useLanguage } from './LanguageProviderLite';

const LegacyApp = lazy(() => import('./App'));

const mainNav = [
  ['#/', 'Início', 'Home'],
  ['#/creatures', 'Criaturas', 'Creatures'],
  ['#/resources', 'Recursos', 'Resources'],
  ['#/chambers', 'Câmaras', 'Chambers'],
  ['#/mechanics', 'Mecânicas', 'Mechanics'],
  ['#/guides', 'Guias', 'Guides'],
  ['#/tools', 'Ferramentas', 'Tools']
];

function currentDatabaseRoute(hash){
  const value = hash || window.location.hash || '#/';
  const creature = value.match(/^#\/creatures(?:\/([^?/#]+))?/i);
  if(creature) return { active:true, kind:'creatures', id:creature[1] ? decodeURIComponent(creature[1]) : null };
  const resource = value.match(/^#\/resources(?:\/([^?/#]+))?/i);
  if(resource) return { active:true, kind:'resources', id:resource[1] ? decodeURIComponent(resource[1]) : null };
  return { active:false, kind:null, id:null };
}

function PageLoadingState(){
  return <main className="site-main ux-page-loading" role="status" aria-live="polite" aria-label="Carregando conteúdo">
    <div className="ux-loading-card">
      <div className="ux-loading-title" aria-hidden="true"/>
      <div className="ux-loading-line" aria-hidden="true"/>
      <div className="ux-loading-line" aria-hidden="true"/>
      <div className="ux-loading-line" aria-hidden="true"/>
      <span className="ux-loading-note">Organizando o conteúdo da wiki…</span>
    </div>
  </main>;
}

function DatabaseShell({ kind, routeId }){
  const {t} = useLanguage();
  const [mobileOpen,setMobileOpen] = useState(false);
  const [theme,setTheme] = useState(()=>localStorage.getItem('pa-theme') || 'dark');
  const [query,setQuery] = useState('');
  const resourceMode = kind === 'resources';
  const activeHref = resourceMode ? '#/resources' : '#/creatures';

  useEffect(()=>{
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('pa-theme',theme);
  },[theme]);

  useEffect(()=>{
    setMobileOpen(false);
    window.scrollTo({top:0,behavior:'auto'});
  },[routeId,kind]);

  const submitSearch = event => {
    event.preventDefault();
    const q = query.trim();
    if(!q) return;
    window.location.hash = `/${resourceMode?'resources':'creatures'}?dbq=${encodeURIComponent(q)}`;
  };

  return <div className={`app-shell database-shell ${resourceMode?'resource-database-shell':'creature-database-shell'}`}>
    <header className="site-header">
      <div className="header-inner">
        <a href="#/" className="brand" aria-label={t('Voltar ao início da Pocket Ants Wiki BR','Back to Pocket Ants Wiki home')}>
          <span className="brand-mark">🐜</span>
          <span className="brand-copy"><strong>Pocket Ants</strong><small>{t('Wiki BR','Wiki EN')}</small></span>
        </a>

        <form className="header-search" onSubmit={submitSearch} role="search">
          <Search size={18}/>
          <input
            value={query}
            onChange={e=>setQuery(e.target.value)}
            placeholder={resourceMode?t('Buscar no banco de recursos...','Search the resource database...'):t('Buscar no banco de criaturas...','Search the creature database...')}
            aria-label={resourceMode?t('Buscar recursos','Search resources'):t('Buscar criaturas','Search creatures')}
            autoComplete="off"
            enterKeyHint="search"
            inputMode="search"
          />
          <kbd>↵</kbd>
        </form>

        <nav className="desktop-nav" aria-label={t('Navegação principal','Main navigation')}>
          {mainNav.slice(1).map(([href,pt,en])=>{
            const active = href===activeHref;
            return <a key={href} href={href} className={active?'active':''} aria-current={active?'page':undefined}>{t(pt,en)}</a>;
          })}
        </nav>

        <div className="header-actions">
          <button className="icon-button" type="button" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label={t('Alternar tema','Toggle theme')}>
            {theme==='dark'?<Sun size={18}/>:<Moon size={18}/>} 
          </button>
          <button className="icon-button mobile-menu-button" type="button" onClick={()=>setMobileOpen(true)} aria-label={t('Abrir menu','Open menu')}><Menu size={20}/></button>
        </div>
      </div>
    </header>

    {mobileOpen && <div className="mobile-drawer-backdrop" onClick={()=>setMobileOpen(false)}>
      <aside className="mobile-drawer" onClick={e=>e.stopPropagation()} aria-label={t('Menu de navegação','Navigation menu')}>
        <div className="drawer-head">
          <div className="brand"><span className="brand-mark">🐜</span><strong>Pocket Ants {t('Wiki BR','Wiki EN')}</strong></div>
          <button className="icon-button" type="button" onClick={()=>setMobileOpen(false)} aria-label={t('Fechar menu','Close menu')}><X size={20}/></button>
        </div>
        <nav className="mobile-nav" aria-label={t('Navegação móvel','Mobile navigation')}>
          {mainNav.map(([href,pt,en])=>{
            const active = href===activeHref;
            return <a key={href} href={href} className={active?'active':''} aria-current={active?'page':undefined}>{t(pt,en)}</a>;
          })}
        </nav>
      </aside>
    </div>}

    <main className={`site-main ${resourceMode?'resource-db-main':'creature-db-main'}`}>
      {resourceMode ? <ResourceDatabasePage routeId={routeId}/> : <CreatureDatabasePage routeId={routeId}/>} 
    </main>

    <footer className={`site-footer ${resourceMode?'resource-db-footer':'creature-db-footer'}`}>
      <div className="footer-bottom">{resourceMode
        ? t('Banco de Dados de Recursos · Pocket Ants Wiki BR · obtenção, usos, prioridade e fontes organizadas.','Resource Database · Pocket Ants Wiki EN · acquisition, uses, priority and sources organized.')
        : t('Banco de Dados de Criaturas · Pocket Ants Wiki BR · dados comunitários revisados e conflitos sinalizados.','Creature Database · Pocket Ants Wiki EN · community data reviewed and conflicts flagged.')}</div>
    </footer>
  </div>;
}

export default function AppV2(){
  const [hash,setHash] = useState(()=>window.location.hash || '#/');

  useEffect(()=>{
    const syncRoute = ()=>setHash(window.location.hash || '#/');
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function(...args){
      const result = originalPushState.apply(this,args);
      window.dispatchEvent(new Event('app:navigation'));
      return result;
    };

    window.history.replaceState = function(...args){
      const result = originalReplaceState.apply(this,args);
      window.dispatchEvent(new Event('app:navigation'));
      return result;
    };

    window.addEventListener('hashchange',syncRoute);
    window.addEventListener('popstate',syncRoute);
    window.addEventListener('app:navigation',syncRoute);

    return ()=>{
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('hashchange',syncRoute);
      window.removeEventListener('popstate',syncRoute);
      window.removeEventListener('app:navigation',syncRoute);
    };
  },[]);

  const route = useMemo(()=>currentDatabaseRoute(hash),[hash]);

  useEffect(()=>{
    const creatureActive = route.active && route.kind==='creatures';
    const resourceActive = route.active && route.kind==='resources';
    document.body.classList.toggle('creature-database-route',creatureActive);
    document.body.classList.toggle('resource-database-route',resourceActive);
    document.body.classList.remove('encyclopedia-route');
    return ()=>{
      document.body.classList.remove('creature-database-route');
      document.body.classList.remove('resource-database-route');
    };
  },[route.active,route.kind]);

  if(route.active) return <DatabaseShell kind={route.kind} routeId={route.id}/>;
  return <Suspense fallback={<PageLoadingState/>}><LegacyApp/></Suspense>;
}
