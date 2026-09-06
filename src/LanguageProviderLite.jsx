import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Check, Languages, Settings, X } from 'lucide-react';
import { creatureDescription, creatureName } from './i18n';
import './settings.css';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'pa-language';

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

  useEffect(()=>{
    if(!open) return;
    const onKey = e => { if(e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown',onKey);
    return ()=>window.removeEventListener('keydown',onKey);
  },[open]);

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
            <button className={language==='pt'?'active':''} onClick={()=>setLanguage('pt')}>
              <span className="pa-language-flag">🇧🇷</span><div><strong>Português (Brasil)</strong><small>PT-BR</small></div>{language==='pt'&&<Check size={18}/>} 
            </button>
            <button className={language==='en'?'active':''} onClick={()=>setLanguage('en')}>
              <span className="pa-language-flag">🇺🇸</span><div><strong>English</strong><small>EN</small></div>{language==='en'&&<Check size={18}/>} 
            </button>
          </div>
        </section>

        <div className="pa-settings-note">{t('Os nomes das criaturas também acompanham o idioma selecionado.','Creature names also follow the selected language.')}</div>
      </aside>
    </div>}
  </>;
}
