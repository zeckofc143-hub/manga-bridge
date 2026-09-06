import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Check, Eye, Languages, RotateCcw, Settings, X } from 'lucide-react';
import { creatureDescription, creatureName } from './i18nCore';
import './settings.css';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'pa-language';
const COMFORT_KEY = 'pa-visual-comfort-v1';

const defaultComfort = {
  text: 'standard',
  density: 'comfortable',
  effects: 'normal'
};

function safeGet(key,fallback=null){
  try{return localStorage.getItem(key) ?? fallback;}catch{return fallback;}
}
function safeSet(key,value){
  try{localStorage.setItem(key,value);}catch{}
}
function readLanguage(){ return safeGet(STORAGE_KEY)==='en' ? 'en' : 'pt'; }
function readComfort(){
  try{
    const parsed = JSON.parse(safeGet(COMFORT_KEY,'{}') || '{}');
    return {
      text: parsed.text === 'large' ? 'large' : 'standard',
      density: parsed.density === 'compact' ? 'compact' : 'comfortable',
      effects: parsed.effects === 'reduced' ? 'reduced' : 'normal'
    };
  }catch{
    return {...defaultComfort};
  }
}

export function LanguageProvider({ children }) {
  const [language,setLanguageState] = useState(readLanguage);
  const setLanguage = useCallback(next=>setLanguageState(next === 'en' ? 'en' : 'pt'),[]);
  const t = useCallback((pt,en)=>language === 'en' ? (en ?? pt) : pt,[language]);
  const name = useCallback((id,fallback)=>creatureName(id,fallback,language),[language]);
  const description = useCallback((id,fallback)=>creatureDescription(id,fallback,language),[language]);

  useEffect(()=>{
    safeSet(STORAGE_KEY,language);
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    document.documentElement.dataset.language = language;
    window.dispatchEvent(new CustomEvent('pa:language',{detail:{language}}));
  },[language]);

  useEffect(()=>{
    const onStorage=event=>{
      if(event.key!==STORAGE_KEY) return;
      const next=event.newValue==='en'?'en':'pt';
      setLanguageState(current=>current===next?current:next);
    };
    window.addEventListener('storage',onStorage);
    return()=>window.removeEventListener('storage',onStorage);
  },[]);

  const value = useMemo(()=>({language,setLanguage,t,name,description}),[language,setLanguage,t,name,description]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(){
  const ctx = useContext(LanguageContext);
  if(!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

export function SiteSettings(){
  const {language,setLanguage,t} = useLanguage();
  const [open,setOpen] = useState(false);
  const [comfort,setComfort] = useState(readComfort);

  useEffect(()=>{
    if(!open) return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const onKey = e => { if(e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown',onKey);
    return ()=>{
      document.body.style.overflow=previousOverflow;
      window.removeEventListener('keydown',onKey);
    };
  },[open]);

  useEffect(()=>{
    document.documentElement.dataset.uxText = comfort.text;
    document.documentElement.dataset.uxDensity = comfort.density;
    document.documentElement.dataset.uxEffects = comfort.effects;
    safeSet(COMFORT_KEY,JSON.stringify(comfort));
  },[comfort]);

  const updateComfort = (key,value) => setComfort(current=>({...current,[key]:value}));
  const resetComfort = () => setComfort({...defaultComfort});

  return <>
    <button type="button" className={`pa-settings-fab${open?' is-open':''}`} onClick={()=>setOpen(true)} aria-label={t('Abrir configurações','Open settings')} aria-haspopup="dialog" aria-expanded={open} aria-controls="pa-settings-panel" title={t('Configurações','Settings')}><Settings size={20}/></button>
    {open && <div className="pa-settings-backdrop" onClick={()=>setOpen(false)}>
      <aside id="pa-settings-panel" className="pa-settings-panel" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="pa-settings-title" aria-describedby="pa-settings-note">
        <div className="pa-settings-head">
          <div><span className="pa-settings-kicker"><Settings size={15}/>{t('Configurações','Settings')}</span><h2 id="pa-settings-title">{t('Configurações do site','Site settings')}</h2></div>
          <button type="button" className="pa-settings-close" onClick={()=>setOpen(false)} aria-label={t('Fechar configurações','Close settings')}><X size={20}/></button>
        </div>

        <section className="pa-settings-section">
          <div className="pa-settings-section-title"><Languages size={18}/><div><strong>{t('Idioma','Language')}</strong><span>{t('Muda o site inteiro e fica salvo neste aparelho.','Changes the whole site and is saved on this device.')}</span></div></div>
          <div className="pa-language-options">
            <button type="button" className={language==='pt'?'active':''} onClick={()=>setLanguage('pt')} aria-pressed={language==='pt'}>
              <span className="pa-language-flag">🇧🇷</span><div><strong>Português (Brasil)</strong><small>PT-BR</small></div>{language==='pt'&&<Check size={18}/>} 
            </button>
            <button type="button" className={language==='en'?'active':''} onClick={()=>setLanguage('en')} aria-pressed={language==='en'}>
              <span className="pa-language-flag">🇺🇸</span><div><strong>English</strong><small>EN</small></div>{language==='en'&&<Check size={18}/>} 
            </button>
          </div>
        </section>

        <section className="pa-settings-section pa-comfort-section">
          <div className="pa-settings-section-title pa-settings-section-title-actions"><Eye size={18}/><div><strong>{t('Conforto visual','Visual comfort')}</strong><span>{t('Ajuste leitura, espaço e movimento sem mudar o conteúdo.','Tune reading, spacing and motion without changing content.')}</span></div><button type="button" className="pa-reset-comfort" onClick={resetComfort}><RotateCcw size={14}/>{t('Padrão','Reset')}</button></div>

          <div className="pa-comfort-row">
            <div className="pa-comfort-label"><strong>{t('Tamanho do texto','Text size')}</strong><span>{t('Grande ajuda a leitura sem precisar ampliar toda a página.','Large improves readability without zooming the whole page.')}</span></div>
            <div className="pa-segmented" role="group" aria-label={t('Tamanho do texto','Text size')}>
              <button type="button" className={comfort.text==='standard'?'active':''} onClick={()=>updateComfort('text','standard')} aria-pressed={comfort.text==='standard'}>{t('Padrão','Standard')}</button>
              <button type="button" className={comfort.text==='large'?'active':''} onClick={()=>updateComfort('text','large')} aria-pressed={comfort.text==='large'}>{t('Grande','Large')}</button>
            </div>
          </div>

          <div className="pa-comfort-row">
            <div className="pa-comfort-label"><strong>{t('Espaçamento','Spacing')}</strong><span>{t('Confortável deixa as ações mais separadas; compacto mostra mais por tela.','Comfortable separates actions more; compact shows more per screen.')}</span></div>
            <div className="pa-segmented" role="group" aria-label={t('Espaçamento','Spacing')}>
              <button type="button" className={comfort.density==='comfortable'?'active':''} onClick={()=>updateComfort('density','comfortable')} aria-pressed={comfort.density==='comfortable'}>{t('Confortável','Comfortable')}</button>
              <button type="button" className={comfort.density==='compact'?'active':''} onClick={()=>updateComfort('density','compact')} aria-pressed={comfort.density==='compact'}>{t('Compacto','Compact')}</button>
            </div>
          </div>

          <div className="pa-comfort-row">
            <div className="pa-comfort-label"><strong>{t('Movimento e efeitos','Motion & effects')}</strong><span>{t('Reduzido corta animações, transparência e sombras que não são necessárias para usar a wiki.','Reduced cuts animations, transparency and shadows that are not needed to use the wiki.')}</span></div>
            <div className="pa-segmented" role="group" aria-label={t('Movimento e efeitos','Motion and effects')}>
              <button type="button" className={comfort.effects==='normal'?'active':''} onClick={()=>updateComfort('effects','normal')} aria-pressed={comfort.effects==='normal'}>{t('Equilibrado','Balanced')}</button>
              <button type="button" className={comfort.effects==='reduced'?'active':''} onClick={()=>updateComfort('effects','reduced')} aria-pressed={comfort.effects==='reduced'}>{t('Reduzido','Reduced')}</button>
            </div>
          </div>
        </section>

        <div id="pa-settings-note" className="pa-settings-note">{t('Idioma e conforto ficam salvos apenas neste aparelho. Você pode restaurar o conforto padrão quando quiser.','Language and comfort are saved only on this device. You can restore the default comfort settings at any time.')}</div>
      </aside>
    </div>}
  </>;
}
