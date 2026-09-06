import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Check, Eye, Languages, Settings, X } from 'lucide-react';
import { creatureDescription, creatureName } from './i18n';
import './settings.css';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'pa-language';
const COMFORT_KEY = 'pa-visual-comfort-v1';

const defaultComfort = {
  text: 'standard',
  density: 'comfortable',
  effects: 'normal'
};

function readComfort(){
  try{
    const parsed = JSON.parse(localStorage.getItem(COMFORT_KEY) || '{}');
    return {
      text: parsed.text === 'large' ? 'large' : 'standard',
      density: parsed.density === 'compact' ? 'compact' : 'comfortable',
      effects: parsed.effects === 'reduced' ? 'reduced' : 'normal'
    };
  }catch{
    return defaultComfort;
  }
}

export function LanguageProvider({ children }) {
  const [language,setLanguageState] = useState(()=>localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'pt');
  const setLanguage = next => setLanguageState(next === 'en' ? 'en' : 'pt');

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY,language);
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    document.documentElement.dataset.language = language;
    window.dispatchEvent(new CustomEvent('pa:language',{detail:{language}}));
  },[language]);

  const value = useMemo(()=>({
    language,
    setLanguage,
    t:(pt,en)=>language === 'en' ? (en ?? pt) : pt,
    name:(id,fallback)=>creatureName(id,fallback,language),
    description:(id,fallback)=>creatureDescription(id,fallback,language)
  }),[language]);

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
    const onKey = e => { if(e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown',onKey);
    return ()=>window.removeEventListener('keydown',onKey);
  },[open]);

  useEffect(()=>{
    document.documentElement.dataset.uxText = comfort.text;
    document.documentElement.dataset.uxDensity = comfort.density;
    document.documentElement.dataset.uxEffects = comfort.effects;
    try{ localStorage.setItem(COMFORT_KEY,JSON.stringify(comfort)); }catch{}
  },[comfort]);

  const updateComfort = (key,value) => setComfort(current=>({...current,[key]:value}));

  return <>
    <button className="pa-settings-fab" onClick={()=>setOpen(true)} aria-label={t('Abrir configurações','Open settings')} title={t('Configurações','Settings')}><Settings size={20}/></button>
    {open && <div className="pa-settings-backdrop" onClick={()=>setOpen(false)}>
      <aside className="pa-settings-panel" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="pa-settings-title">
        <div className="pa-settings-head">
          <div><span className="pa-settings-kicker"><Settings size={15}/>{t('Configurações','Settings')}</span><h2 id="pa-settings-title">{t('Configurações do site','Site settings')}</h2></div>
          <button className="pa-settings-close" onClick={()=>setOpen(false)} aria-label={t('Fechar configurações','Close settings')}><X size={20}/></button>
        </div>

        <section className="pa-settings-section">
          <div className="pa-settings-section-title"><Languages size={18}/><div><strong>{t('Idioma','Language')}</strong><span>{t('A linguagem é salva neste aparelho.','Language is saved on this device.')}</span></div></div>
          <div className="pa-language-options">
            <button className={language==='pt'?'active':''} onClick={()=>setLanguage('pt')} aria-pressed={language==='pt'}>
              <span className="pa-language-flag">🇧🇷</span><div><strong>Português (Brasil)</strong><small>PT-BR</small></div>{language==='pt'&&<Check size={18}/>} 
            </button>
            <button className={language==='en'?'active':''} onClick={()=>setLanguage('en')} aria-pressed={language==='en'}>
              <span className="pa-language-flag">🇺🇸</span><div><strong>English</strong><small>EN</small></div>{language==='en'&&<Check size={18}/>} 
            </button>
          </div>
        </section>

        <section className="pa-settings-section pa-comfort-section">
          <div className="pa-settings-section-title"><Eye size={18}/><div><strong>{t('Conforto visual','Visual comfort')}</strong><span>{t('Ajuste leitura e densidade sem mudar o conteúdo.','Tune reading comfort and density without changing content.')}</span></div></div>

          <div className="pa-comfort-row">
            <div className="pa-comfort-label"><strong>{t('Tamanho do texto','Text size')}</strong><span>{t('Aumente a leitura sem usar zoom do navegador.','Increase readability without browser zoom.')}</span></div>
            <div className="pa-segmented" role="group" aria-label={t('Tamanho do texto','Text size')}>
              <button className={comfort.text==='standard'?'active':''} onClick={()=>updateComfort('text','standard')} aria-pressed={comfort.text==='standard'}>{t('Padrão','Standard')}</button>
              <button className={comfort.text==='large'?'active':''} onClick={()=>updateComfort('text','large')} aria-pressed={comfort.text==='large'}>{t('Grande','Large')}</button>
            </div>
          </div>

          <div className="pa-comfort-row">
            <div className="pa-comfort-label"><strong>{t('Espaçamento','Spacing')}</strong><span>{t('Confortável reduz aperto visual; compacto mostra mais por tela.','Comfortable reduces visual crowding; compact shows more per screen.')}</span></div>
            <div className="pa-segmented" role="group" aria-label={t('Espaçamento','Spacing')}>
              <button className={comfort.density==='comfortable'?'active':''} onClick={()=>updateComfort('density','comfortable')} aria-pressed={comfort.density==='comfortable'}>{t('Confortável','Comfortable')}</button>
              <button className={comfort.density==='compact'?'active':''} onClick={()=>updateComfort('density','compact')} aria-pressed={comfort.density==='compact'}>{t('Compacto','Compact')}</button>
            </div>
          </div>

          <div className="pa-comfort-row">
            <div className="pa-comfort-label"><strong>{t('Efeitos visuais','Visual effects')}</strong><span>{t('Reduz transparência, sombras e movimento decorativo.','Reduce transparency, shadows and decorative motion.')}</span></div>
            <div className="pa-segmented" role="group" aria-label={t('Efeitos visuais','Visual effects')}>
              <button className={comfort.effects==='normal'?'active':''} onClick={()=>updateComfort('effects','normal')} aria-pressed={comfort.effects==='normal'}>{t('Normal','Normal')}</button>
              <button className={comfort.effects==='reduced'?'active':''} onClick={()=>updateComfort('effects','reduced')} aria-pressed={comfort.effects==='reduced'}>{t('Reduzidos','Reduced')}</button>
            </div>
          </div>
        </section>

        <div className="pa-settings-note">{t('Preferências de idioma e conforto ficam salvas só neste aparelho.','Language and comfort preferences are saved only on this device.')}</div>
      </aside>
    </div>}
  </>;
}
