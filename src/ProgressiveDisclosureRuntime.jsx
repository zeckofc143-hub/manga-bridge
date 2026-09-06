import { useEffect } from 'react';

const MOBILE_QUERY = '(max-width: 760px)';
const CARD_CONFIG = [
  { selector: '.resource-card', details: '.resource-columns', kind: { pt:'Recurso', en:'Resource' } },
  { selector: '.guide-card', details: 'ul', kind: { pt:'Guia', en:'Guide' } }
];

function language(){
  return document.documentElement.lang?.toLowerCase().startsWith('en') ? 'en' : 'pt';
}

function labels(){
  return language() === 'en'
    ? { show:'Show details', hide:'Hide details' }
    : { show:'Mostrar detalhes', hide:'Ocultar detalhes' };
}

function cardName(card){
  return card.querySelector('h1,h2,h3,strong')?.textContent?.trim() || '';
}

function setExpanded(card,expanded,config){
  const detail = card.querySelector(config.details);
  if(!detail) return;
  const copy = labels();
  const kind = config.kind[language()];
  card.setAttribute('aria-expanded',expanded ? 'true' : 'false');
  card.dataset.uxDisclosureLabel = expanded ? copy.hide : copy.show;
  card.setAttribute('aria-label',`${kind}${cardName(card) ? `: ${cardName(card)}` : ''}. ${expanded ? copy.hide : copy.show}`);
  detail.toggleAttribute('hidden',!expanded);
}

function enhanceCard(card,config,mobile){
  const detail = card.querySelector(config.details);
  if(!detail) return;

  if(!mobile){
    detail.removeAttribute('hidden');
    card.classList.remove('ux-disclosure-card');
    card.removeAttribute('role');
    card.removeAttribute('tabindex');
    card.removeAttribute('aria-expanded');
    card.removeAttribute('aria-label');
    delete card.dataset.uxDisclosureLabel;
    return;
  }

  card.classList.add('ux-disclosure-card');
  card.setAttribute('role','button');
  card.setAttribute('tabindex','0');
  const expanded = card.getAttribute('aria-expanded') === 'true';
  setExpanded(card,expanded,config);
}

function syncAll(media){
  CARD_CONFIG.forEach(config=>{
    document.querySelectorAll(config.selector).forEach(card=>enhanceCard(card,config,media.matches));
  });
}

function configFor(card){
  return CARD_CONFIG.find(config=>card.matches(config.selector));
}

export default function ProgressiveDisclosureRuntime(){
  useEffect(()=>{
    const media = window.matchMedia(MOBILE_QUERY);
    let timer = 0;

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(()=>syncAll(media),70);
    };

    const toggle = card => {
      const config = configFor(card);
      if(!config || !media.matches) return;
      const expanded = card.getAttribute('aria-expanded') === 'true';
      setExpanded(card,!expanded,config);
    };

    const onClick = event => {
      const card = event.target.closest?.('.ux-disclosure-card');
      if(card && !event.target.closest?.('a,button,input,select,textarea,summary')) toggle(card);
      schedule();
    };

    const onKey = event => {
      const card = event.target.closest?.('.ux-disclosure-card');
      if(!card || event.target !== card || !['Enter',' '].includes(event.key)) return;
      event.preventDefault();
      toggle(card);
    };

    const onMedia = () => syncAll(media);

    schedule();
    window.addEventListener('hashchange',schedule);
    window.addEventListener('app:navigation',schedule);
    window.addEventListener('pa:language',schedule);
    document.addEventListener('click',onClick,true);
    document.addEventListener('change',schedule,true);
    document.addEventListener('input',schedule,true);
    document.addEventListener('keydown',onKey,true);
    media.addEventListener?.('change',onMedia);

    return ()=>{
      window.clearTimeout(timer);
      window.removeEventListener('hashchange',schedule);
      window.removeEventListener('app:navigation',schedule);
      window.removeEventListener('pa:language',schedule);
      document.removeEventListener('click',onClick,true);
      document.removeEventListener('change',schedule,true);
      document.removeEventListener('input',schedule,true);
      document.removeEventListener('keydown',onKey,true);
      media.removeEventListener?.('change',onMedia);
      syncAll({matches:false});
    };
  },[]);

  return null;
}
