import { useEffect } from 'react';
import { useLanguage } from './LanguageProviderLite';

const TOKEN_LABELS = {
  map: ['Mapa','Map'],
  offline: ['Offline','Offline'],
  special: ['Especial','Special'],
  processing: ['Processamento','Processing'],
  rewards: ['Recompensas','Rewards'],
  creatures: ['Criaturas','Creatures'],
  battle: ['Batalha','Battle'],
  coop: ['Co-op','Co-op'],
  daily: ['Diário','Daily'],
  beehive: ['Colmeia','Beehive'],
  clan: ['Clã','Clan'],
  aphid: ['Pulgões','Aphids'],
  events: ['Eventos','Events'],
  premium: ['Premium','Premium'],
  ads: ['Anúncios','Ads'],
  fungus: ['Fungo','Fungus'],
  army: ['Exército','Army'],
  fusion: ['Fusão','Fusion'],
  'offline-gathering': ['Coleta offline','Offline gathering'],
  'creature-lab': ['Laboratório de criaturas','Creature Lab'],
  'resin-shop': ['Loja de resina','Resin Shop'],
  garden: ['Jardim','Garden'],
  legions: ['Legiões','Legions'],
  'honeydew-shop': ['Loja de Honeydew','Honeydew Shop'],
  'aphid-farm': ['Fazenda de pulgões','Aphid Farm'],
  'fire-ant-nest': ['Ninho de formigas-de-fogo','Fire Ant Nest'],
  'frog-pond': ['Lago do sapo','Frog Pond'],
  pvp: ['PvP','PvP'],
  'gem-shop': ['Loja de gemas','Gem Shop'],
  'termite-nest': ['Ninho de cupins','Termite Nest'],
  'crab-beach': ['Praia do caranguejo','Crab Beach'],
  'clan-wars': ['Guerras de clã','Clan Wars']
};

const isResourceRoute = () => /^#\/resources(?:\/|$|\?)/i.test(window.location.hash || '#/');

function tokenFromText(value=''){
  const text=String(value).trim();
  if(TOKEN_LABELS[text]) return text;
  for(const [token,[pt,en]] of Object.entries(TOKEN_LABELS)){
    if(text===pt || text===en) return token;
  }
  return null;
}

function labelFor(token,language){
  const labels=TOKEN_LABELS[token];
  if(!labels) return null;
  return language==='en' ? labels[1] : labels[0];
}

function syncResourceLanguage(language){
  if(!isResourceRoute()) return;
  const root=document.querySelector('.rr-page');
  if(!root) return;

  root.querySelectorAll('select option[value]').forEach(option=>{
    const next=labelFor(option.value,language);
    if(next && option.textContent!==next) option.textContent=next;
  });

  root.querySelectorAll('.rr-source-routes small,.rr-system-chips span').forEach(node=>{
    const token=tokenFromText(node.textContent);
    const next=token ? labelFor(token,language) : null;
    if(next && node.textContent!==next) node.textContent=next;
  });
}

export default function ResourceLanguageRuntimeLite(){
  const {language}=useLanguage();

  useEffect(()=>{
    let frame=0;
    let timer=0;
    const sync=()=>{
      if(frame) cancelAnimationFrame(frame);
      if(timer) window.clearTimeout(timer);
      frame=requestAnimationFrame(()=>{
        frame=0;
        syncResourceLanguage(language);
        timer=window.setTimeout(()=>syncResourceLanguage(language),80);
      });
    };

    sync();
    window.addEventListener('hashchange',sync);
    window.addEventListener('app:navigation',sync);
    return ()=>{
      window.removeEventListener('hashchange',sync);
      window.removeEventListener('app:navigation',sync);
      if(frame) cancelAnimationFrame(frame);
      if(timer) window.clearTimeout(timer);
    };
  },[language]);

  return null;
}
