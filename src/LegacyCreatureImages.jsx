import { useEffect } from 'react';
import './legacyCreatureImages.css';

const FALLBACK = 'https://static.wikia.nocookie.net/pocketants/images/f/fd/Creature_attract_guide.png/revision/latest/scale-to-width-down/1200?cb=20231230231004';
const titleAliases = {
  'Asian Giant Hornet':'Hornet',
  'Crab':'Crab_(creature)',
  'Frog':'Frog_(creature)'
};
const cache = new Map();

async function resolveWikiImage(name){
  if(cache.has(name)) return cache.get(name);
  const title = titleAliases[name] || name.replaceAll(' ','_');
  const url = `https://pocketants.fandom.com/api.php?action=query&redirects=1&prop=pageimages&piprop=original|thumbnail&pithumbsize=700&titles=${encodeURIComponent(title)}&format=json&origin=*`;
  try{
    const response = await fetch(url);
    if(!response.ok) throw new Error('image api');
    const data = await response.json();
    const page = Object.values(data?.query?.pages || {})[0];
    const src = page?.original?.source || page?.thumbnail?.source || FALLBACK;
    cache.set(name,src);
    return src;
  }catch{
    cache.set(name,FALLBACK);
    return FALLBACK;
  }
}

function upgradeBox(box,name){
  if(!box || !name || box.dataset.realCreatureImage===name) return;
  box.dataset.realCreatureImage = name;
  box.textContent = '';
  const img = document.createElement('img');
  img.src = FALLBACK;
  img.alt = `Imagem de ${name} em Pocket Ants`;
  img.loading = 'lazy';
  img.referrerPolicy = 'no-referrer';
  box.appendChild(img);
  resolveWikiImage(name).then(src=>{ if(img.isConnected) img.src = src || FALLBACK; });
}

function applyLegacyImages(){
  document.querySelectorAll('.mini-creature-card').forEach(card=>{
    const name = card.querySelector('strong')?.textContent?.trim();
    upgradeBox(card.querySelector('.mini-creature-avatar'),name);
  });
  document.querySelectorAll('.creature-card').forEach(card=>{
    const name = card.querySelector('h3')?.textContent?.trim();
    upgradeBox(card.querySelector('.creature-visual'),name);
  });
  const detail = document.querySelector('.detail-page .detail-hero');
  if(detail){
    const name = detail.querySelector('h1')?.textContent?.trim();
    upgradeBox(detail.querySelector('.detail-icon'),name);
  }
}

function openFullCatalogOnCreatureRoute(){
  const hash = window.location.hash || '';
  if(!/^#\/creatures\/?(?:\?.*)?$/.test(hash)) return;
  window.setTimeout(()=>{
    const overlay = document.querySelector('.cc-overlay');
    if(!overlay) document.querySelector('.cc-fab')?.click();
  },220);
}

export default function LegacyCreatureImages(){
  useEffect(()=>{
    const run = ()=>{ applyLegacyImages(); openFullCatalogOnCreatureRoute(); };
    run();
    const observer = new MutationObserver(()=>applyLegacyImages());
    observer.observe(document.getElementById('root') || document.body,{childList:true,subtree:true});
    window.addEventListener('hashchange',run);
    return ()=>{
      observer.disconnect();
      window.removeEventListener('hashchange',run);
    };
  },[]);
  return null;
}
