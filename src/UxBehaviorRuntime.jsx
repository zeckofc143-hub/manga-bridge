import { useEffect, useRef, useState } from 'react';
import './uxBehavior.css';

const CREATURE_FILTER_KEY = 'pa-creature-filters-v1';
const LAST_ROUTE_KEY = 'pa-last-route';
const CREATURE_SCROLL_KEY = 'pa-creature-list-scroll';

const DIALOGS = [
  { overlay: '.x-overlay', panel: '.x-panel', close: '.x-close' },
  { overlay: '.adv-overlay', panel: '.adv-modal', close: '.adv-header button' },
  { overlay: '.research-overlay', panel: '.research-modal', close: '.research-close' },
  { overlay: '.pa-settings-backdrop', panel: '.pa-settings-panel', close: '.pa-settings-close' },
  { overlay: '.mobile-drawer-backdrop', panel: '.mobile-drawer', close: '.drawer-head .icon-button' }
];

const TRIGGER_SELECTOR = '.x-fab,.adv-fab,.research-fab,.pa-settings-fab,.mobile-menu-button';
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]:not([tabindex="-1"])';
const CHOICE_BUTTONS = '.ce3-tabs button,.cth-tabs button,.cth-view button,.cth-mode button,.cap-stars button,.adv-tabs button,.research-tabs button,.x-tabs button,.source-filters button,.chip-filter button';

function getDialog(){
  for(const config of DIALOGS){
    const overlay = document.querySelector(config.overlay);
    const panel = overlay?.querySelector(config.panel) || document.querySelector(config.panel);
    if(overlay && panel) return {...config,overlay,panel};
  }
  return null;
}

function setNativeInputValue(input,value){
  if(!input) return;
  const descriptor = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value');
  descriptor?.set?.call(input,String(value ?? ''));
  input.dispatchEvent(new Event('input',{bubbles:true}));
}

function setNativeSelectValue(select,value){
  if(!select || value == null) return;
  const optionExists = [...select.options].some(option => option.value === String(value));
  if(!optionExists) return;
  const descriptor = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype,'value');
  descriptor?.set?.call(select,String(value));
  select.dispatchEvent(new Event('change',{bubbles:true}));
}

function readCreatureFilters(){
  const search = document.querySelector('.ce3-search input');
  const categoryButtons = [...document.querySelectorAll('.ce3-tabs button')];
  const activeIndex = Math.max(0,categoryButtons.findIndex(button => button.classList.contains('active')));
  const selects = [...document.querySelectorAll('.ce3-filters select')];
  if(!search && !categoryButtons.length && !selects.length) return null;
  return {
    q: search?.value || '',
    category: activeIndex,
    rarity: selects[0]?.value || 'all',
    acquisition: selects[1]?.value || 'all',
    sort: selects[2]?.value || 'rarity'
  };
}

function safeSavedFilters(){
  try{
    const parsed = JSON.parse(localStorage.getItem(CREATURE_FILTER_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  }catch{
    return {};
  }
}

function isCreatureListRoute(hash=window.location.hash || ''){
  return /^#\/creatures(?:\?|$)/i.test(hash);
}

function isCreatureDetailRoute(hash=window.location.hash || ''){
  return /^#\/creatures\/[^?/#]+/i.test(hash);
}

function paramsForCreatureList(){
  const hash = window.location.hash || '';
  const queryIndex = hash.indexOf('?');
  return new URLSearchParams(queryIndex >= 0 ? hash.slice(queryIndex + 1) : '');
}

function routeTitle(){
  const hash = window.location.hash || '#/';
  if(isCreatureDetailRoute(hash)){
    const heading = document.querySelector('.ce3-detail-page h1');
    return heading?.textContent?.trim() ? `${heading.textContent.trim()} · Pocket Ants Wiki BR` : 'Criatura · Pocket Ants Wiki BR';
  }
  const routes = [
    [/^#\/creatures/i,'Criaturas'],[/^#\/resources/i,'Recursos'],[/^#\/chambers/i,'Câmaras'],
    [/^#\/mechanics/i,'Mecânicas'],[/^#\/guides/i,'Guias'],[/^#\/tools/i,'Ferramentas'],
    [/^#\/glossary/i,'Glossário'],[/^#\/search/i,'Busca']
  ];
  const match = routes.find(([pattern])=>pattern.test(hash));
  return match ? `${match[1]} · Pocket Ants Wiki BR` : 'Pocket Ants Wiki BR';
}

export default function UxBehaviorRuntime(){
  const [networkState,setNetworkState] = useState(()=>navigator.onLine ? null : 'offline');
  const [updateReady,setUpdateReady] = useState(false);
  const registrationRef = useRef(null);

  useEffect(()=>{
    let lastTrigger = null;
    let previousOverflow = '';
    let saveTimer = 0;
    let applyTimer = 0;
    let statusTimer = 0;
    let restoreTimer = 0;
    let modalActive = false;
    let previousHash = window.location.hash || '#/';
    let skipButton = null;

    const backgroundNodes = () => [...document.querySelectorAll('.site-header,.site-main,.site-footer')];

    const ensureSkipControl = () => {
      const main = document.querySelector('.site-main');
      if(main){
        main.id = 'ux-main-content';
        if(!main.hasAttribute('tabindex')) main.setAttribute('tabindex','-1');
      }
      if(document.querySelector('.ux-skip-link')) return;
      skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.className = 'ux-skip-link';
      skipButton.textContent = 'Pular para o conteúdo';
      skipButton.addEventListener('click',()=>{
        const target = document.querySelector('.site-main');
        if(!target) return;
        target.focus({preventScroll:true});
        target.scrollIntoView({block:'start'});
      });
      document.body.prepend(skipButton);
    };

    const syncChoiceSemantics = () => {
      document.querySelectorAll(CHOICE_BUTTONS).forEach(button=>{
        button.setAttribute('aria-pressed',button.classList.contains('active') ? 'true' : 'false');
      });
    };

    const syncTriggerStates = () => {
      const pairs = [
        ['.x-fab','.x-overlay'],['.adv-fab','.adv-overlay'],['.research-fab','.research-overlay'],
        ['.pa-settings-fab','.pa-settings-backdrop'],['.mobile-menu-button','.mobile-drawer-backdrop']
      ];
      pairs.forEach(([triggerSelector,overlaySelector])=>{
        document.querySelectorAll(triggerSelector).forEach(trigger=>{
          trigger.setAttribute('aria-haspopup','dialog');
          trigger.setAttribute('aria-expanded',document.querySelector(overlaySelector) ? 'true' : 'false');
        });
      });
    };

    const syncSemantics = () => {
      ensureSkipControl();
      syncChoiceSemantics();
      syncTriggerStates();
    };

    const unlockBackground = (restore=true) => {
      if(!modalActive){ syncTriggerStates(); return; }
      modalActive = false;
      document.body.dataset.modalOpen = 'false';
      document.body.style.overflow = previousOverflow;
      backgroundNodes().forEach(node => {
        node.removeAttribute('inert');
        if(node.dataset.uxAriaHidden === 'true'){
          node.removeAttribute('aria-hidden');
          delete node.dataset.uxAriaHidden;
        }
      });
      syncTriggerStates();
      if(restore && lastTrigger?.isConnected){
        requestAnimationFrame(()=>lastTrigger.focus({preventScroll:true}));
      }
    };

    const activateDialog = () => {
      const dialog = getDialog();
      if(!dialog){ unlockBackground(false); return; }
      const {panel,close} = dialog;
      if(!modalActive){ previousOverflow = document.body.style.overflow; modalActive = true; }
      document.body.dataset.modalOpen = 'true';
      document.body.style.overflow = 'hidden';
      panel.setAttribute('role','dialog');
      panel.setAttribute('aria-modal','true');
      const title = panel.querySelector('h1,h2,h3');
      if(title && !panel.hasAttribute('aria-labelledby')){
        if(!title.id) title.id = `ux-dialog-title-${Math.random().toString(36).slice(2,8)}`;
        panel.setAttribute('aria-labelledby',title.id);
        panel.removeAttribute('aria-label');
      }
      backgroundNodes().forEach(node => {
        if(node.contains(panel)) return;
        node.setAttribute('inert','');
        if(!node.hasAttribute('aria-hidden')){
          node.setAttribute('aria-hidden','true');
          node.dataset.uxAriaHidden = 'true';
        }
      });
      syncTriggerStates();
      requestAnimationFrame(()=>{
        const first = panel.querySelector(close) || panel.querySelector(FOCUSABLE) || panel;
        if(first === panel && !panel.hasAttribute('tabindex')) panel.setAttribute('tabindex','-1');
        first?.focus?.({preventScroll:true});
      });
    };

    const scheduleDialogSync = () => {
      requestAnimationFrame(()=>requestAnimationFrame(()=>getDialog() ? activateDialog() : unlockBackground()));
    };

    const trapFocus = event => {
      if(event.key === 'Escape'){
        const dialog = getDialog();
        if(dialog){
          event.preventDefault();
          dialog.panel.querySelector(dialog.close)?.click();
          scheduleDialogSync();
        }
        return;
      }
      if(event.key !== 'Tab') return;
      const dialog = getDialog();
      if(!dialog) return;
      const items = [...dialog.panel.querySelectorAll(FOCUSABLE)].filter(item => !item.hasAttribute('disabled') && item.getClientRects().length);
      if(!items.length){ event.preventDefault(); dialog.panel.focus?.(); return; }
      const first = items[0];
      const last = items[items.length - 1];
      if(event.shiftKey && document.activeElement === first){ event.preventDefault(); last.focus(); }
      else if(!event.shiftKey && document.activeElement === last){ event.preventDefault(); first.focus(); }
    };

    const syncCreatureUrl = state => {
      if(!state || !isCreatureListRoute()) return;
      const params = new URLSearchParams();
      if(state.q) params.set('dbq',state.q);
      if(Number(state.category) > 0) params.set('cat',String(state.category));
      if(state.rarity && state.rarity !== 'all') params.set('rarity',state.rarity);
      if(state.acquisition && state.acquisition !== 'all') params.set('get',state.acquisition);
      if(state.sort && state.sort !== 'rarity') params.set('sort',state.sort);
      const next = `#/creatures${params.toString() ? `?${params}` : ''}`;
      if(next !== window.location.hash) window.history.replaceState(null,'',next);
    };

    const saveCreatureFilters = (syncUrl=true) => {
      const state = readCreatureFilters();
      if(!state) return;
      try{ localStorage.setItem(CREATURE_FILTER_KEY,JSON.stringify(state)); }catch{}
      if(syncUrl) syncCreatureUrl(state);
    };

    const scheduleSaveFilters = () => {
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(()=>saveCreatureFilters(true),260);
    };

    const applyCreatureFilters = () => {
      window.clearTimeout(applyTimer);
      if(!isCreatureListRoute()) return;
      applyTimer = window.setTimeout(()=>{
        const search = document.querySelector('.ce3-search input');
        const categoryButtons = [...document.querySelectorAll('.ce3-tabs button')];
        const selects = [...document.querySelectorAll('.ce3-filters select')];
        if(!search || !categoryButtons.length) return;
        const params = paramsForCreatureList();
        const hasUrlState = ['dbq','cat','rarity','get','sort'].some(key=>params.has(key));
        const saved = safeSavedFilters();
        const state = hasUrlState ? {
          q: params.get('dbq') || '', category: Number(params.get('cat') || 0), rarity: params.get('rarity') || 'all',
          acquisition: params.get('get') || 'all', sort: params.get('sort') || 'rarity'
        } : {
          q: saved.q || '', category: Number(saved.category || 0), rarity: saved.rarity || 'all',
          acquisition: saved.acquisition || 'all', sort: saved.sort || 'rarity'
        };
        setNativeInputValue(search,state.q);
        const safeCategory = Math.max(0,Math.min(categoryButtons.length - 1,Number(state.category)||0));
        if(!categoryButtons[safeCategory]?.classList.contains('active')) categoryButtons[safeCategory]?.click();
        setNativeSelectValue(selects[0],state.rarity);
        setNativeSelectValue(selects[1],state.acquisition);
        setNativeSelectValue(selects[2],state.sort);
        window.setTimeout(()=>{ saveCreatureFilters(false); syncChoiceSemantics(); },0);
      },80);
    };

    const updateTitle = () => window.setTimeout(()=>{ document.title = routeTitle(); },60);

    const saveCreatureScroll = () => {
      if(!isCreatureListRoute()) return;
      try{ sessionStorage.setItem(CREATURE_SCROLL_KEY,String(Math.max(0,window.scrollY || 0))); }catch{}
    };

    const restoreCreatureScroll = () => {
      window.clearTimeout(restoreTimer);
      restoreTimer = window.setTimeout(()=>{
        let value = 0;
        try{ value = Number(sessionStorage.getItem(CREATURE_SCROLL_KEY) || 0); }catch{}
        if(Number.isFinite(value) && value > 0) window.scrollTo({top:value,behavior:'auto'});
      },160);
    };

    const onDocumentClick = event => {
      const trigger = event.target.closest?.(TRIGGER_SELECTOR);
      if(trigger) lastTrigger = trigger;

      const creatureDetailLink = event.target.closest?.('a[href^="#/creatures/"]');
      if(creatureDetailLink && isCreatureListRoute()) saveCreatureScroll();

      if(trigger || event.target.closest?.('.x-close,.adv-header button,.research-close,.pa-settings-close,.drawer-head .icon-button') || DIALOGS.some(item=>event.target.matches?.(item.overlay))){
        scheduleDialogSync();
      }
      if(event.target.closest?.(CHOICE_BUTTONS)) requestAnimationFrame(syncChoiceSemantics);
      if(event.target.closest?.('.ce3-tabs button')) scheduleSaveFilters();
    };

    const onDocumentInput = event => { if(event.target.matches?.('.ce3-search input')) scheduleSaveFilters(); };
    const onDocumentChange = event => { if(event.target.matches?.('.ce3-filters select')) scheduleSaveFilters(); };

    const onShortcut = event => {
      const target = event.target;
      if(event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      if(target?.matches?.('input,textarea,select,[contenteditable="true"]')) return;
      if(event.key === '/'){
        const search = document.querySelector('.ce3-search input,.header-search input,.drawer-search input');
        if(search){ event.preventDefault(); search.focus({preventScroll:false}); search.select?.(); }
      }
    };

    const onRoute = () => {
      const hash = window.location.hash || '#/';
      const shouldRestore = isCreatureDetailRoute(previousHash) && isCreatureListRoute(hash);
      previousHash = hash;
      if(hash && hash !== '#/') try{ localStorage.setItem(LAST_ROUTE_KEY,hash); }catch{}
      unlockBackground(false);
      applyCreatureFilters();
      updateTitle();
      window.setTimeout(syncSemantics,90);
      if(shouldRestore) restoreCreatureScroll();
    };

    const onOffline = () => { window.clearTimeout(statusTimer); setNetworkState('offline'); };
    const onOnline = () => {
      setNetworkState('online');
      window.clearTimeout(statusTimer);
      statusTimer = window.setTimeout(()=>setNetworkState(null),2400);
    };

    document.addEventListener('click',onDocumentClick,true);
    document.addEventListener('input',onDocumentInput,true);
    document.addEventListener('change',onDocumentChange,true);
    document.addEventListener('keydown',trapFocus,true);
    document.addEventListener('keydown',onShortcut,true);
    window.addEventListener('hashchange',onRoute);
    window.addEventListener('app:navigation',onRoute);
    window.addEventListener('offline',onOffline);
    window.addEventListener('online',onOnline);
    applyCreatureFilters();
    updateTitle();
    window.setTimeout(syncSemantics,0);

    return ()=>{
      window.clearTimeout(saveTimer); window.clearTimeout(applyTimer); window.clearTimeout(statusTimer); window.clearTimeout(restoreTimer);
      document.removeEventListener('click',onDocumentClick,true);
      document.removeEventListener('input',onDocumentInput,true);
      document.removeEventListener('change',onDocumentChange,true);
      document.removeEventListener('keydown',trapFocus,true);
      document.removeEventListener('keydown',onShortcut,true);
      window.removeEventListener('hashchange',onRoute);
      window.removeEventListener('app:navigation',onRoute);
      window.removeEventListener('offline',onOffline);
      window.removeEventListener('online',onOnline);
      skipButton?.remove();
      unlockBackground(false);
    };
  },[]);

  useEffect(()=>{
    if(!('serviceWorker' in navigator)) return;
    let cancelled = false;
    const register = async () => {
      try{
        const registration = await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`,{scope:import.meta.env.BASE_URL});
        registrationRef.current = registration;
        if(cancelled) return;
        const watch = worker => worker?.addEventListener('statechange',()=>{
          if(worker.state === 'installed' && navigator.serviceWorker.controller) setUpdateReady(true);
        });
        if(registration.waiting && navigator.serviceWorker.controller) setUpdateReady(true);
        registration.addEventListener('updatefound',()=>watch(registration.installing));
      }catch{}
    };
    if(document.readyState === 'complete') register();
    else window.addEventListener('load',register,{once:true});
    return ()=>{ cancelled = true; window.removeEventListener('load',register); };
  },[]);

  const applyUpdate = () => {
    const waiting = registrationRef.current?.waiting;
    if(!waiting){ window.location.reload(); return; }
    navigator.serviceWorker.addEventListener('controllerchange',()=>window.location.reload(),{once:true});
    waiting.postMessage({type:'SKIP_WAITING'});
  };

  if(!networkState && !updateReady) return null;
  return <div className="ux-status-stack" aria-live="polite" aria-atomic="true">
    {networkState === 'offline' && <div className="ux-status ux-status-offline"><strong>Sem internet</strong><span>O que já estiver em cache continua disponível.</span></div>}
    {networkState === 'online' && <div className="ux-status ux-status-online"><strong>Conexão restaurada</strong><span>A wiki voltou a atualizar normalmente.</span></div>}
    {updateReady && <div className="ux-status ux-status-update"><div><strong>Nova versão disponível</strong><span>Atualize quando quiser para usar as melhorias mais recentes.</span></div><button type="button" onClick={applyUpdate}>Atualizar</button></div>}
  </div>;
}
