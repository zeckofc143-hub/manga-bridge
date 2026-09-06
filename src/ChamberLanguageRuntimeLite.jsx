import {useEffect} from 'react';
import {useLanguage} from './LanguageProviderLite';

const RESOURCE_NAMES={
  leaves:['Folhas','Leaves'],fungus:['Fungo','Fungus'],seeds:['Sementes','Seeds'],resin:['Resina','Resin'],
  honeydew:['Honeydew','Honeydew'],'body-parts':['Partes de criatura','Creature Parts'],water:['Água','Water'],
  gems:['Gemas','Gems'],pheromones:['Feromônios','Pheromones'],'battle-tokens':['Fichas de batalha','Battle Tokens'],silk:['Seda','Silk']
};
const isChamberRoute=()=>/^#\/chambers(?:\/|$|\?)/i.test(window.location.hash||'#/');

function sync(language){
  if(!isChamberRoute()) return;
  document.querySelectorAll('.cc-page').forEach(root=>root.setAttribute('data-no-auto-i18n','true'));
  document.querySelectorAll('.cc-resource-links a[href*="#/resources/"]').forEach(anchor=>{
    const match=anchor.getAttribute('href')?.match(/#\/resources\/([^?/#]+)/i);
    const id=match?decodeURIComponent(match[1]):null;
    const label=RESOURCE_NAMES[id];
    const node=anchor.querySelector('span');
    if(node&&label){const next=language==='en'?label[1]:label[0];if(node.textContent!==next)node.textContent=next;}
  });
}

export default function ChamberLanguageRuntimeLite(){
  const {language}=useLanguage();
  useEffect(()=>{
    let frame=0,timer=0;
    const run=()=>{
      if(frame)cancelAnimationFrame(frame);
      if(timer)window.clearTimeout(timer);
      frame=requestAnimationFrame(()=>{frame=0;sync(language);timer=window.setTimeout(()=>sync(language),80);});
    };
    run();
    window.addEventListener('hashchange',run);
    window.addEventListener('app:navigation',run);
    return()=>{window.removeEventListener('hashchange',run);window.removeEventListener('app:navigation',run);if(frame)cancelAnimationFrame(frame);if(timer)window.clearTimeout(timer);};
  },[language]);
  return null;
}
