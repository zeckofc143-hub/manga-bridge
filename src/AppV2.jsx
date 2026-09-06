import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import CreatureDatabasePage from './CreatureDatabasePage';
import ResourceDatabasePage from './ResourceDatabasePage';
import ChamberDatabasePage from './ChamberDatabasePage';
import MechanicDatabasePage from './MechanicDatabasePage';
import GuideDatabasePage from './GuideDatabasePage';
import ToolDatabasePage from './ToolDatabasePage';
import ExtraToolPage, { isExtraToolRoute } from './ExtraToolPages';
import FarmDatabasePage from './FarmDatabasePage';
import StrategyDatabasePage from './StrategyDatabasePage';
import GlobalSearchPage from './GlobalSearchPage';
import { useLanguage } from './LanguageProviderLite';
import { DATABASE_KINDS, databaseRouteClass, getDatabaseRoute } from './routeUtils';
import './navigationExpansion.css';

const LegacyApp = lazy(() => import('./App'));

const coreNav = [
  ['#/creatures', 'Criaturas', 'Creatures'],
  ['#/resources', 'Recursos', 'Resources'],
  ['#/chambers', 'Câmaras', 'Chambers'],
  ['#/mechanics', 'Mecânicas', 'Mechanics'],
  ['#/guides', 'Guias', 'Guides'],
  ['#/tools', 'Ferramentas', 'Tools']
];
const extraNav = [
  ['#/farms', 'Farms', 'Farms', '🌾'],
  ['#/strategies', 'Estratégias', 'Strategies', '🧠']
];
const mobileNav = [['#/', 'Início', 'Home'],...coreNav,...extraNav.map(([href,pt,en])=>[href,pt,en])];

const databaseConfig = {
  creatures:{href:'#/creatures',route:'creatures',shell:'creature-database-shell',main:'creature-db-main',footer:'creature-db-footer',search:['Buscar criaturas nesta categoria...','Search creatures in this category...'],aria:['Buscar criaturas','Search creatures']},
  resources:{href:'#/resources',route:'resources',shell:'resource-database-shell',main:'resource-db-main',footer:'resource-db-footer',search:['Buscar recursos nesta categoria...','Search resources in this category...'],aria:['Buscar recursos','Search resources']},
  chambers:{href:'#/chambers',route:'chambers',shell:'chamber-database-shell',main:'chamber-db-main',footer:'chamber-db-footer',search:['Buscar câmaras nesta categoria...','Search chambers in this category...'],aria:['Buscar câmaras','Search chambers']},
  mechanics:{href:'#/mechanics',route:'mechanics',shell:'mechanic-database-shell',main:'mechanic-db-main',footer:'mechanic-db-footer',search:['Buscar mecânica ou sistema...','Search a mechanic or system...'],aria:['Buscar mecânicas','Search mechanics']},
  guides:{href:'#/guides',route:'guides',shell:'guide-database-shell',main:'guide-db-main',footer:'guide-db-footer',search:['Buscar guia ou objetivo...','Search a guide or goal...'],aria:['Buscar guias','Search guides']},
  tools:{href:'#/tools',route:'tools',shell:'tool-database-shell',main:'tool-db-main',footer:'tool-db-footer',search:['Buscar ferramenta ou cálculo...','Search a tool or calculation...'],aria:['Buscar ferramentas','Search tools']},
  farms:{href:'#/farms',route:'farms',shell:'farm-database-shell',main:'farm-db-main',footer:'farm-db-footer',search:['Buscar farm ou recurso...','Search a farm or resource...'],aria:['Buscar farms','Search farms']},
  strategies:{href:'#/strategies',route:'strategies',shell:'strategy-database-shell',main:'strategy-db-main',footer:'strategy-db-footer',search:['Buscar estratégia, dica ou objetivo...','Search a strategy, tip or goal...'],aria:['Buscar estratégias','Search strategies']},
  search:{href:'#/search',route:'search',shell:'search-database-shell',main:'search-db-main',footer:'search-db-footer',search:['Buscar em toda a wiki...','Search the whole wiki...'],aria:['Busca global','Global search']}
};

function safeGet(key,fallback){
  try{return localStorage.getItem(key) || fallback;}catch{return fallback;}
}
function safeSet(key,value){
  try{localStorage.setItem(key,value);}catch{}
}
function routeQuery(kind){
  try{
    const params=new URLSearchParams((window.location.hash.split('?')[1]||''));
    return kind==='search' ? (params.get('q') || params.get('dbq') || '') : (params.get('dbq') || '');
  }catch{return '';}
}

function PageLoadingState(){
  const {t}=useLanguage();
  return <main className="site-main ux-page-loading" role="status" aria-live="polite" aria-label={t('Carregando conteúdo','Loading content')}>
    <div className="ux-loading-card"><div className="ux-loading-title" aria-hidden="true"/><div className="ux-loading-line" aria-hidden="true"/><div className="ux-loading-line" aria-hidden="true"/><div className="ux-loading-line" aria-hidden="true"/><span className="ux-loading-note">{t('Organizando o conteúdo da wiki…','Organizing wiki content…')}</span></div>
  </main>;
}

function DatabaseContent({kind,routeId}){
  if(kind==='resources') return <ResourceDatabasePage routeId={routeId}/>;
  if(kind==='chambers') return <ChamberDatabasePage routeId={routeId}/>;
  if(kind==='mechanics') return <MechanicDatabasePage routeId={routeId}/>;
  if(kind==='guides') return <GuideDatabasePage routeId={routeId}/>;
  if(kind==='tools' && isExtraToolRoute(routeId)) return <ExtraToolPage routeId={routeId}/>;
  if(kind==='tools') return <ToolDatabasePage routeId={routeId}/>;
  if(kind==='farms') return <FarmDatabasePage routeId={routeId}/>;
  if(kind==='strategies') return <StrategyDatabasePage routeId={routeId}/>;
  if(kind==='search') return <GlobalSearchPage/>;
  return <CreatureDatabasePage routeId={routeId}/>;
}

function DatabaseFooter({kind,t}){
  if(kind==='resources') return t('Banco de Dados de Recursos · Pocket Ants Wiki BR · obtenção, usos, prioridade e fontes organizadas.','Resource Database · Pocket Ants Wiki EN · acquisition, uses, priority and sources organized.');
  if(kind==='chambers') return t('Central de Câmaras · Pocket Ants Wiki BR · níveis, gargalos, dependências e fontes organizadas.','Chamber Hub · Pocket Ants Wiki EN · levels, bottlenecks, dependencies and sources organized.');
  if(kind==='mechanics') return t('Central de Mecânicas · Pocket Ants Wiki BR · sistemas, timers, fluxos e fontes organizadas.','Mechanics Hub · Pocket Ants Wiki EN · systems, timers, flows and sources organized.');
  if(kind==='guides') return t('Central de Guias · Pocket Ants Wiki BR · rotas por fase, objetivo e gargalo.','Guides Hub · Pocket Ants Wiki EN · routes by stage, goal and bottleneck.');
  if(kind==='tools') return t('Central de Ferramentas · Pocket Ants Wiki BR · calculadoras, planners e trackers.','Tools Hub · Pocket Ants Wiki EN · calculators, planners and trackers.');
  if(kind==='farms') return t('Central de Farms · Pocket Ants Wiki BR · rotas de recursos, números fixos e dicas comunitárias separadas.','Farms Hub · Pocket Ants Wiki EN · resource routes, fixed values and separated community tips.');
  if(kind==='strategies') return t('Estratégias da Comunidade · Pocket Ants Wiki BR · consenso, opiniões e conflitos rotulados.','Community Strategies · Pocket Ants Wiki EN · labeled consensus, opinions and conflicts.');
  if(kind==='search') return t('Busca Global · Pocket Ants Wiki BR · todas as bases modernas em um único índice.','Global Search · Pocket Ants Wiki EN · every modern database in one index.');
  return t('Banco de Dados de Criaturas · Pocket Ants Wiki BR · dados comunitários revisados e conflitos sinalizados.','Creature Database · Pocket Ants Wiki EN · community data reviewed and conflicts flagged.');
}

function DatabaseShell({ kind, routeId }){
  const {t} = useLanguage();
  const config=databaseConfig[kind]||databaseConfig.creatures;
  const [mobileOpen,setMobileOpen] = useState(false);
  const [theme,setTheme] = useState(()=>safeGet('pa-theme','dark'));
  const [query,setQuery] = useState(()=>routeQuery(kind));
  const [drawerQuery,setDrawerQuery] = useState('');
  const extraActive=extraNav.some(([href])=>href===config.href);

  useEffect(()=>{document.documentElement.dataset.theme=theme;safeSet('pa-theme',theme);},[theme]);
  useEffect(()=>{
    setMobileOpen(false);
    setDrawerQuery('');
    setQuery(routeQuery(kind));
    window.scrollTo({top:0,left:0,behavior:'auto'});
  },[routeId,kind]);

  useEffect(()=>{
    const sync=()=>setQuery(routeQuery(kind));
    window.addEventListener('hashchange',sync);
    window.addEventListener('app:navigation',sync);
    return()=>{
      window.removeEventListener('hashchange',sync);
      window.removeEventListener('app:navigation',sync);
    };
  },[kind]);

  const submitSearch = event => {
    event.preventDefault();
    const q=query.trim();
    if(!q) return;
    const param=config.route==='search'?'q':'dbq';
    window.location.hash=`/${config.route}?${param}=${encodeURIComponent(q)}`;
  };

  const clearSearch=()=>{
    setQuery('');
    window.location.hash=`/${config.route}`;
  };

  const submitGlobalSearch=event=>{
    event.preventDefault();
    const q=drawerQuery.trim();
    if(!q) return;
    setMobileOpen(false);
    window.location.hash=`/search?q=${encodeURIComponent(q)}`;
  };

  return <div className={`app-shell database-shell ${config.shell}`}>
    <header className="site-header"><div className="header-inner">
      <a href="#/" className="brand" aria-label={t('Voltar ao início da Pocket Ants Wiki BR','Back to Pocket Ants Wiki home')}><span className="brand-mark">🐜</span><span className="brand-copy"><strong>Pocket Ants</strong><small>{t('Wiki BR','Wiki EN')}</small></span></a>
      <form className="header-search" onSubmit={submitSearch} role="search" data-search-scope={config.route}>
        <Search size={18} aria-hidden="true"/>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t(...config.search)} aria-label={t(...config.aria)} autoComplete="off" enterKeyHint="search" inputMode="search"/>
        {query?<button className="header-search-clear" type="button" onClick={clearSearch} aria-label={t('Limpar busca','Clear search')} title={t('Limpar','Clear')}><X size={16}/></button>:<kbd aria-hidden="true">↵</kbd>}
      </form>
      <nav className="desktop-nav" aria-label={t('Navegação principal','Main navigation')}>
        {coreNav.map(([href,pt,en])=>{const active=href===config.href;return <a key={href} href={href} className={active?'active':''} aria-current={active?'page':undefined}>{t(pt,en)}</a>;})}
        <details className={`desktop-more${extraActive?' active':''}`}>
          <summary>{t('Mais','More')}</summary>
          <div className="desktop-more-menu">{extraNav.map(([href,pt,en,icon])=>{const active=href===config.href;return <a key={href} href={href} className={active?'active':''} aria-current={active?'page':undefined} onClick={e=>e.currentTarget.closest('details')?.removeAttribute('open')}><span><b>{icon} {t(pt,en)}</b><small>{href==='#/farms'?t('Rotas de recursos','Resource routes'):t('Dicas e consenso','Tips & consensus')}</small></span></a>;})}</div>
        </details>
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label={t('Alternar tema','Toggle theme')} title={t('Alternar tema','Toggle theme')}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button>
        <button className="icon-button mobile-menu-button" type="button" onClick={()=>setMobileOpen(true)} aria-label={t('Abrir menu','Open menu')} aria-haspopup="dialog" aria-expanded={mobileOpen} aria-controls="pa-mobile-nav"><Menu size={20}/></button>
      </div>
    </div></header>

    {mobileOpen&&<div className="mobile-drawer-backdrop" onClick={()=>setMobileOpen(false)}>
      <aside id="pa-mobile-nav" className="mobile-drawer" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="pa-mobile-nav-title">
        <div className="drawer-head"><div className="brand"><span className="brand-mark">🐜</span><strong id="pa-mobile-nav-title">Pocket Ants {t('Wiki BR','Wiki EN')}</strong></div><button className="icon-button" type="button" onClick={()=>setMobileOpen(false)} aria-label={t('Fechar menu','Close menu')}><X size={20}/></button></div>
        <form className="drawer-search" role="search" onSubmit={submitGlobalSearch}>
          <Search size={18} aria-hidden="true"/>
          <input value={drawerQuery} onChange={e=>setDrawerQuery(e.target.value)} placeholder={t('Buscar em toda a wiki…','Search the whole wiki…')} aria-label={t('Busca global','Global search')} autoComplete="off" enterKeyHint="search" inputMode="search"/>
          <button className="drawer-search-button" type="submit" aria-label={t('Buscar','Search')}><Search size={17}/></button>
        </form>
        <p className="drawer-search-hint">{t('Use o menu para navegar; use a busca acima quando não souber em qual categoria está a informação.','Use the menu to browse; use the search above when you are not sure which category contains the information.')}</p>
        <nav className="mobile-nav" aria-label={t('Navegação móvel','Mobile navigation')}>{mobileNav.map(([href,pt,en])=>{const active=href===config.href;return <a key={href} href={href} onClick={()=>setMobileOpen(false)} className={active?'active':''} aria-current={active?'page':undefined}>{t(pt,en)}</a>;})}</nav>
        <a className="drawer-global-link" href="#/search" onClick={()=>setMobileOpen(false)}><Search size={17}/>{t('Abrir Busca Global','Open Global Search')}</a>
      </aside>
    </div>}

    <main className={`site-main ${config.main}`}><DatabaseContent kind={kind} routeId={routeId}/></main>
    <footer className={`site-footer ${config.footer}`}><div className="footer-bottom"><DatabaseFooter kind={kind} t={t}/></div></footer>
  </div>;
}

export default function AppV2(){
  const [hash,setHash] = useState(()=>window.location.hash || '#/');

  useEffect(()=>{
    const syncRoute=()=>setHash(window.location.hash||'#/');
    const originalPushState=window.history.pushState;
    const originalReplaceState=window.history.replaceState;
    window.history.pushState=function(...args){const result=originalPushState.apply(this,args);window.dispatchEvent(new Event('app:navigation'));return result;};
    window.history.replaceState=function(...args){const result=originalReplaceState.apply(this,args);window.dispatchEvent(new Event('app:navigation'));return result;};
    window.addEventListener('hashchange',syncRoute);window.addEventListener('popstate',syncRoute);window.addEventListener('app:navigation',syncRoute);
    return()=>{window.history.pushState=originalPushState;window.history.replaceState=originalReplaceState;window.removeEventListener('hashchange',syncRoute);window.removeEventListener('popstate',syncRoute);window.removeEventListener('app:navigation',syncRoute);};
  },[]);

  const route=useMemo(()=>getDatabaseRoute(hash),[hash]);

  useEffect(()=>{
    for(const kind of DATABASE_KINDS) document.body.classList.toggle(databaseRouteClass(kind),route.active&&route.kind===kind);
    document.body.classList.remove('encyclopedia-route');
    return()=>{DATABASE_KINDS.forEach(kind=>document.body.classList.remove(databaseRouteClass(kind)));};
  },[route.active,route.kind]);

  if(route.active) return <DatabaseShell kind={route.kind} routeId={route.id}/>;
  return <Suspense fallback={<PageLoadingState/>}><LegacyApp/></Suspense>;
}
