import { useEffect } from 'react';

const CREATURE_FILTER_KEY = 'pa-creature-filters-v1';
const LAST_ROUTE_KEY = 'pa-last-route';

const DIALOGS = [
  { overlay: '.x-overlay', panel: '.x-panel', close: '.x-close' },
  { overlay: '.adv-overlay', panel: '.adv-modal', close: '.adv-header button' },
  { overlay: '.research-overlay', panel: '.research-modal', close: '.research-close' },
  { overlay: '.pa-settings-backdrop', panel: '.pa-settings-panel', close: '.pa-settings-close' },
  { overlay: '.mobile-drawer-backdrop', panel: '.mobile-drawer', close: '.drawer-head .icon-button' }
];

const TRIGGER_SELECTOR = '.x-fab,.adv-fab,.research-fab,.pa-settings-fab,.mobile-menu-button';
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]:not([tabindex="-1"])';

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

function isCreatureListRoute(){
  return /^#\/creatures(?:\?|$)/i.test(window.location.hash || '');
}

function paramsForCreatureList(){
  const hash = window.location.hash || '';
  const queryIndex = hash.indexOf('?');
  return new URLSearchParams(queryIndex >= 0 ? hash.slice(queryIndex + 1) : '');
}

export default function UxBehaviorRuntime(){
  useEffect(()=>{
    let lastTrigger = null;
    let previousOverflow = '';
    let saveTimer = 0;
    let applyTimer = 0;
    let modalActive = false;

    const backgroundNodes = () => [...document.querySelectorAll('.site-header,.site-main,.site-footer')];

    const unlockBackground = (restore=true) => {
      if(!modalActive) return;
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
      if(restore && lastTrigger?.isConnected){
        requestAnimationFrame(()=>lastTrigger.focus({preventScroll:true}));
      }
    };

    const activateDialog = () => {
      const dialog = getDialog();
      if(!dialog){
        unlockBackground(false);
        return;
      }

      const {panel,close} = dialog;
      if(!modalActive){
        previousOverflow = document.body.style.overflow;
        modalActive = true;
      }
      document.body.dataset.modalOpen = 'true';
      document.body.style.overflow = 'hidden';

      panel.setAttribute('role','dialog');
      panel.setAttribute('aria-modal','true');
      if(!panel.hasAttribute('aria-label') && !panel.hasAttribute('aria-labelledby')){
        const title = panel.querySelector('h1,h2,h3')?.textContent?.trim();
        if(title) panel.setAttribute('aria-label',title);
      }

      backgroundNodes().forEach(node => {
        if(node.contains(panel)) return;
        node.setAttribute('inert','');
        if(!node.hasAttribute('aria-hidden')){
          node.setAttribute('aria-hidden','true');
          node.dataset.uxAriaHidden = 'true';
        }
      });

      requestAnimationFrame(()=>{
        const first = panel.querySelector(close) || panel.querySelector(FOCUSABLE) || panel;
        if(first === panel && !panel.hasAttribute('tabindex')) panel.setAttribute('tabindex','-1');
        first?.focus?.({preventScroll:true});
      });
    };

    const scheduleDialogSync = () => {
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        if(getDialog()) activateDialog();
        else unlockBackground();
      }));
    };

    const trapFocus = event => {
      if(event.key === 'Escape'){
        const dialog = getDialog();
        if(dialog){
          event.preventDefault();
          const closeButton = dialog.panel.querySelector(dialog.close);
          closeButton?.click();
          scheduleDialogSync();
        }
        return;
      }
      if(event.key !== 'Tab') return;
      const dialog = getDialog();
      if(!dialog) return;
      const items = [...dialog.panel.querySelectorAll(FOCUSABLE)].filter(item => !item.hasAttribute('disabled') && item.getClientRects().length);
      if(!items.length){
        event.preventDefault();
        dialog.panel.focus?.();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if(event.shiftKey && document.activeElement === first){
        event.preventDefault();
        last.focus();
      }else if(!event.shiftKey && document.activeElement === last){
        event.preventDefault();
        first.focus();
      }
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
          q: params.get('dbq') || '',
          category: Number(params.get('cat') || 0),
          rarity: params.get('rarity') || 'all',
          acquisition: params.get('get') || 'all',
          sort: params.get('sort') || 'rarity'
        } : {
          q: saved.q || '',
          category: Number(saved.category || 0),
          rarity: saved.rarity || 'all',
          acquisition: saved.acquisition || 'all',
          sort: saved.sort || 'rarity'
        };

        setNativeInputValue(search,state.q);
        const safeCategory = Math.max(0,Math.min(categoryButtons.length - 1,Number(state.category)||0));
        if(!categoryButtons[safeCategory]?.classList.contains('active')) categoryButtons[safeCategory]?.click();
        setNativeSelectValue(selects[0],state.rarity);
        setNativeSelectValue(selects[1],state.acquisition);
        setNativeSelectValue(selects[2],state.sort);
        window.setTimeout(()=>saveCreatureFilters(false),0);
      },80);
    };

    const onDocumentClick = event => {
      const trigger = event.target.closest?.(TRIGGER_SELECTOR);
      if(trigger) lastTrigger = trigger;

      if(event.target.closest?.(TRIGGER_SELECTOR) || event.target.closest?.('.x-close,.adv-header button,.research-close,.pa-settings-close,.drawer-head .icon-button') || DIALOGS.some(item=>event.target.matches?.(item.overlay))){
        scheduleDialogSync();
      }

      if(event.target.closest?.('.ce3-tabs button')) scheduleSaveFilters();
    };

    const onDocumentInput = event => {
      if(event.target.matches?.('.ce3-search input')) scheduleSaveFilters();
    };

    const onDocumentChange = event => {
      if(event.target.matches?.('.ce3-filters select')) scheduleSaveFilters();
    };

    const onRoute = () => {
      const hash = window.location.hash || '#/';
      if(hash && hash !== '#/'){
        try{ localStorage.setItem(LAST_ROUTE_KEY,hash); }catch{}
      }
      unlockBackground(false);
      applyCreatureFilters();
    };

    document.addEventListener('click',onDocumentClick,true);
    document.addEventListener('input',onDocumentInput,true);
    document.addEventListener('change',onDocumentChange,true);
    document.addEventListener('keydown',trapFocus,true);
    window.addEventListener('hashchange',onRoute);
    window.addEventListener('app:navigation',onRoute);

    applyCreatureFilters();

    return ()=>{
      window.clearTimeout(saveTimer);
      window.clearTimeout(applyTimer);
      document.removeEventListener('click',onDocumentClick,true);
      document.removeEventListener('input',onDocumentInput,true);
      document.removeEventListener('change',onDocumentChange,true);
      document.removeEventListener('keydown',trapFocus,true);
      window.removeEventListener('hashchange',onRoute);
      window.removeEventListener('app:navigation',onRoute);
      unlockBackground(false);
    };
  },[]);

  return null;
}
