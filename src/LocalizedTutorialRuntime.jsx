import { useEffect } from 'react';
import { useLanguage } from './LanguageProviderLite';
import { CREATURE_NAMES } from './i18nCore';
import { isCreatureRoute } from './routeUtils';

const CREATURE_PATH = /#\/creatures\/([^?/#]+)/i;

function creatureIdFromHref(href=''){
  const match = String(href).match(CREATURE_PATH);
  return match ? decodeURIComponent(match[1]) : null;
}

function currentCreatureId(){
  return creatureIdFromHref(window.location.hash || '');
}

function localizedName(id,language,fallback=''){
  const names = CREATURE_NAMES[id];
  if(!names) return fallback || id || 'Pocket Ants';
  return language === 'en' ? names.en : names.pt;
}

function tutorialSearchUrl(id,language,fallback=''){
  const name = localizedName(id,language,fallback);
  const query = language === 'en'
    ? `Pocket Ants ${name} guide how to get capture tutorial`
    : `Pocket Ants ${name} tutorial como conseguir como capturar português Brasil`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function remember(anchor){
  if(!anchor.dataset.tutorialOriginalHref) anchor.dataset.tutorialOriginalHref = anchor.getAttribute('href') || '';
  if(!anchor.dataset.tutorialOriginalLabel) anchor.dataset.tutorialOriginalLabel = anchor.textContent?.trim() || '';
}

function cardCreatureId(anchor){
  const card = anchor.closest('.ce3-card');
  const cover = card?.querySelector('.ce3-card-cover[href*="#/creatures/"]');
  return creatureIdFromHref(cover?.getAttribute('href') || '') || currentCreatureId();
}

function setTutorialButton(anchor,language){
  remember(anchor);
  const id = cardCreatureId(anchor);
  if(!id) return;
  const name = localizedName(id,language,anchor.closest('.ce3-card')?.querySelector('.ce3-card-head h2')?.textContent?.trim() || '');

  if(language === 'pt'){
    anchor.href = tutorialSearchUrl(id,'pt',name);
    const label = anchor.classList.contains('compact') ? 'Tutorial PT-BR' : 'Buscar tutorial em português';
    const textNode = [...anchor.childNodes].find(node=>node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim());
    if(textNode) textNode.nodeValue = ` ${label}`;
    anchor.setAttribute('aria-label',`${label}: ${name}`);
    anchor.title = `Pesquisar no YouTube em português: ${name}`;
    anchor.dataset.tutorialLanguage = 'pt-BR';
    return;
  }

  const originalHref = anchor.dataset.tutorialOriginalHref;
  if(originalHref) anchor.setAttribute('href',originalHref);
  const originalLabel = anchor.dataset.tutorialOriginalLabel;
  const textNode = [...anchor.childNodes].find(node=>node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim());
  if(textNode && originalLabel){
    const withoutIcon = originalLabel.replace(/^\s*/,'').trim();
    textNode.nodeValue = ` ${withoutIcon}`;
  }
  anchor.setAttribute('aria-label',`Tutorial in English: ${name}`);
  anchor.title = `Open English tutorial: ${name}`;
  anchor.dataset.tutorialLanguage = 'en';
}

function isSearchRow(anchor){
  const href = anchor.getAttribute('href') || '';
  return href.includes('/results?search_query=') || Boolean(anchor.querySelector('.lucide-search'));
}

function syncDetailVideos(language){
  const list = document.querySelector('.ce3-detail-page .ce3-video-list');
  if(!list) return;
  const id = currentCreatureId();
  if(!id) return;
  const name = localizedName(id,language,document.querySelector('.ce3-detail-copy h1')?.textContent?.trim() || '');
  const anchors = [...list.querySelectorAll(':scope > a')];
  const search = anchors.find(isSearchRow);

  anchors.forEach(anchor=>{
    remember(anchor);
    if(isSearchRow(anchor)) return;
    if(language === 'pt'){
      anchor.hidden = true;
      anchor.setAttribute('aria-hidden','true');
      anchor.tabIndex = -1;
      anchor.dataset.tutorialLanguageHidden = 'true';
    }else{
      anchor.hidden = false;
      anchor.removeAttribute('aria-hidden');
      anchor.removeAttribute('tabindex');
      delete anchor.dataset.tutorialLanguageHidden;
      const originalHref = anchor.dataset.tutorialOriginalHref;
      if(originalHref) anchor.setAttribute('href',originalHref);
    }
  });

  if(search){
    search.href = tutorialSearchUrl(id,language,name);
    search.dataset.tutorialLanguage = language === 'en' ? 'en' : 'pt-BR';
    search.setAttribute('aria-label',language === 'en' ? `Search English tutorials for ${name}` : `Pesquisar tutoriais em português sobre ${name}`);
    const title = search.querySelector('b');
    const meta = search.querySelector('span');
    if(title) title.textContent = language === 'en' ? 'Search more tutorials in English' : 'Pesquisar tutoriais em português';
    if(meta) meta.textContent = language === 'en' ? `YouTube · English results for ${name}` : `YouTube · resultados em português para ${name}`;
  }
}

function sync(language){
  if(!isCreatureRoute()) return;
  document.querySelectorAll('.ce3-tutorial').forEach(anchor=>setTutorialButton(anchor,language));
  syncDetailVideos(language);
}

export default function LocalizedTutorialRuntime(){
  const {language} = useLanguage();

  useEffect(()=>{
    let raf = 0;

    const schedule = () => {
      if(!isCreatureRoute()) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        raf=0;
        sync(language);
      });
    };
    const onClick=event=>{
      if(event.target.closest?.('.ce3-page,.ce3-detail-page,.cth-root')) schedule();
    };

    schedule();
    window.addEventListener('hashchange',schedule);
    window.addEventListener('app:navigation',schedule);
    document.addEventListener('click',onClick,true);

    return ()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener('hashchange',schedule);
      window.removeEventListener('app:navigation',schedule);
      document.removeEventListener('click',onClick,true);
    };
  },[language]);

  return null;
}
