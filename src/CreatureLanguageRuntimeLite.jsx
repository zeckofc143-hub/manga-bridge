import React, { useEffect } from 'react';
import { allCatalogCreatures } from './creatureCatalogData';
import { enrichCreature, nonCapturableCreatures } from './creatureCatalogExtras';
import { creatureDescription, creatureName, translateRawText, CREATURE_NAMES } from './i18n';
import { useLanguage } from './LanguageProviderLite';

const RAW_CREATURES=[...allCatalogCreatures.map(enrichCreature),...nonCapturableCreatures];
const BY_ID=new Map(RAW_CREATURES.map(c=>[c.id,c]));
const BY_EN_NAME=new Map(Object.entries(CREATURE_NAMES).map(([id,n])=>[n.en,id]));

function idFromHref(href=''){
  const match=String(href).match(/#\/creatures\/([^?/#]+)/i);
  return match?decodeURIComponent(match[1]):null;
}

function translateLocation(text='',language='pt'){
  if(language!=='en') return text;
  const exact={
    'Qualquer horário e qualquer clima':'Any time and any weather',
    'Qualquer horário; condição de clima sem restrição conhecida':'Any time; no known weather restriction',
    'Crepúsculo ou noite; qualquer clima':'Dusk or night; any weather',
    'Dia ou amanhecer; qualquer clima':'Day or dawn; any weather',
    'Somente durante chuva ou neve; qualquer horário':'Only during rain or snow; any time',
    'Exige Honeycomb da Beehive':'Requires Honeycomb from the Beehive',
    'Não usa feromônios; vem da barra do Crab Beach Co-op':'Does not use pheromones; obtained from the Crab Beach Co-op bar',
    'Não usa feromônios; vem da barra do Frog Pond Co-op':'Does not use pheromones; obtained from the Frog Pond Co-op bar',
    'Barra de atividade do evento / mini-evento quando disponível':'Event / mini-event activity bar when available',
    'Mapa principal, apenas nos fins de semana':'Main map, weekends only',
    '15ª câmara do Fire Ant Nest':'15th chamber of the Fire Ant Nest',
    'Termite Nest Co-op':'Termite Nest Co-op',
    'Última câmara do Termite Nest Co-op':'Final chamber of the Termite Nest Co-op',
    'Crab Beach Co-op':'Crab Beach Co-op',
    'Frog Pond Co-op':'Frog Pond Co-op',
    'Red Ant Nest e arredores':'Red Ant Nest and surrounding area',
    'Interior do Red Ant Nest':'Inside the Red Ant Nest',
    'Aphid Farms e Fire Ant Nest':'Aphid Farms and Fire Ant Nest',
    'Árvore / Resin source':'Tree / Resin source',
    'Ao redor da Beehive':'Around the Beehive',
    'Beehive':'Beehive',
    'Ao lado do formigueiro / batalhas':'Beside the anthill / battles',
    'Aphid Farm / comboio':'Aphid Farm / convoy',
    'Garden / flores':'Garden / flowers',
    'Black Ant Colony / mapa principal':'Black Ant Colony / main map',
    'Black Ant Colony':'Black Ant Colony',
    'Queen’s Chamber':'Queen’s Chamber'
  };
  if(exact[text]) return exact[text];
  if(text.startsWith('Conflito entre fontes comunitárias:')) return 'Community sources conflict on the best attraction time/weather. Treat this condition as requiring in-game confirmation.';
  if(text.startsWith('Não usa atração/captura comum.')) return 'Does not use normal attraction/capture. It is added directly to the army after completing its event requirements.';
  return translateRawText(text,language);
}

function englishObtain(creature){
  if(!creature) return [];
  if(creature.id==='hornet') return [
    'Enter the Beehive using Bee Essence.',
    'Complete the maze, put the Queen Bee to sleep with Geranium and collect the Honeycomb.',
    'Leave the Beehive while still carrying the Honeycomb.',
    'Use pheromones: the Honeycomb is consumed and the Hornet appears.',
    'Defeat it and capture it if you have a free slot.'
  ];
  if(creature.id==='crab') return ['Play and win Crab Beach Co-op.','Each valid completion adds progress to the Crab activity bar.','Fill the bar and make sure you have a free creature slot.','Claim the 1★ Crab directly into your army.'];
  if(creature.id==='frog') return ['Play Frog Pond Co-op.','Earn valid daily progress for the Frog activity bar.','Fill the bar and make sure you have a free creature slot.','Claim the 1★ Frog directly into your army.'];
  if(creature.id==='christmas-crab') return ['Wait for a Christmas event edition where Christmas Crab is available.','Complete the required Christmas Crab / Crab Beach co-op progress.','Obtain the Crab Token required by that event edition.','With a full bar, the token and a free slot, add Christmas Crab directly to the army.'];
  if(creature.captureStatus==='noncapturable') return ['This entity cannot be captured or added to the creature army.',creature.attraction?`Encounter location: ${translateLocation(creature.attraction,'en')}.`:'It appears as part of a map activity, NPC encounter or boss fight.'];
  if(creature.captureStatus==='ally') return ['This unit is not captured through the Creatures Chamber.',creature.attraction?`It appears or is obtained at: ${translateLocation(creature.attraction,'en')}.`:'Follow the activity or colony system associated with this ally.'];
  if(creature.category==='event') return ['Wait for the original event or a returning Creature Event / mini-event where this special is available.','Fill the event activity bar required to make the creature appear.','Defeat it and choose Capture if a creature slot is free.'];
  return [creature.attraction?`Use pheromones while meeting this condition: ${translateLocation(creature.attraction,'en')}.`:'Use pheromones to attract the creature.','Defeat the creature with your soldier ants.','Choose Capture and keep a free creature slot until the process is complete.'];
}

function applyCreatureCard(card,language){
  const href=card.querySelector('a[href*="#/creatures/"]')?.getAttribute('href') || '';
  const id=idFromHref(href);
  const creature=BY_ID.get(id);
  if(!creature) return;
  const displayName=creatureName(id,creature.name,language);
  const title=card.querySelector('.ce3-card-head h2');
  const description=card.querySelector('.ce3-description');
  const cover=card.querySelector('.ce3-card-cover');
  const img=card.querySelector('.ce3-image-host img');
  if(title && title.textContent!==displayName) title.textContent=displayName;
  const nextDescription=creatureDescription(id,creature.description,language);
  if(description && description.textContent!==nextDescription) description.textContent=nextDescription;
  if(cover) cover.setAttribute('aria-label',language==='en'?`Open ${displayName} profile`:`Abrir ficha de ${displayName}`);
  if(img) img.setAttribute('alt',language==='en'?`${displayName} in Pocket Ants`:`Imagem de ${displayName} em Pocket Ants`);

  const variant=card.querySelector('.ce3-card-head small');
  if(variant && creature.variantOf && creature.variantOf!=='—'){
    const variantId=BY_EN_NAME.get(creature.variantOf);
    const variantName=variantId?creatureName(variantId,creature.variantOf,language):creature.variantOf;
    const next=language==='en'?`Variant of ${variantName}`:`Variante de ${variantName}`;
    if(variant.textContent!==next) variant.textContent=next;
  }

  const obtainPreview=card.querySelector('.ce3-obtain-preview span');
  const steps=language==='en'?englishObtain(creature):creature.obtain;
  if(obtainPreview && steps?.length && obtainPreview.textContent!==steps[0]) obtainPreview.textContent=steps[0];
  const condition=card.querySelector('.ce3-condition span');
  if(condition && creature.attraction){
    const next=translateLocation(creature.attraction,language);
    if(condition.textContent!==next) condition.textContent=next;
  }
}

function applyCreatureDetail(root,language){
  const id=idFromHref(window.location.hash);
  const creature=BY_ID.get(id);
  if(!creature || !root) return;
  const displayName=creatureName(id,creature.name,language);
  const h1=root.querySelector('.ce3-detail-copy h1');
  const lead=root.querySelector('.ce3-lead');
  const img=root.querySelector('.ce3-image-host img');
  if(h1 && h1.textContent!==displayName) h1.textContent=displayName;
  const nextDescription=creatureDescription(id,creature.description,language);
  if(lead && lead.textContent!==nextDescription) lead.textContent=nextDescription;
  if(img) img.setAttribute('alt',language==='en'?`${displayName} in Pocket Ants`:`Imagem de ${displayName} em Pocket Ants`);

  const variant=root.querySelector('.ce3-variant b');
  if(variant && creature.variantOf && creature.variantOf!=='—'){
    const variantId=BY_EN_NAME.get(creature.variantOf);
    const next=variantId?creatureName(variantId,creature.variantOf,language):creature.variantOf;
    if(variant.textContent!==next) variant.textContent=next;
  }

  const stepNodes=[...root.querySelectorAll('.ce3-obtain-panel ol li p')];
  const steps=language==='en'?englishObtain(creature):creature.obtain;
  stepNodes.forEach((node,index)=>{ if(steps?.[index] && node.textContent!==steps[index]) node.textContent=steps[index]; });

  const location=root.querySelector('.ce3-location span');
  if(location && creature.attraction){
    const label=language==='en'?'Condition / location:':'Condição / local:';
    const value=translateLocation(creature.attraction,language);
    const next=`${label} ${value}`;
    if(location.textContent?.replace(/\s+/g,' ').trim()!==next.replace(/\s+/g,' ').trim()) location.innerHTML=`<b>${label}</b> ${value}`;
  }
}

function processRoot(root,language){
  if(!root || root.nodeType!==Node.ELEMENT_NODE) return;
  if(root.matches?.('.ce3-card')) applyCreatureCard(root,language);
  root.querySelectorAll?.('.ce3-card').forEach(card=>applyCreatureCard(card,language));
  if(root.matches?.('.ce3-detail-page')) applyCreatureDetail(root,language);
  else {
    const detail=root.querySelector?.('.ce3-detail-page');
    if(detail) applyCreatureDetail(detail,language);
  }
}

export default function CreatureLanguageRuntimeLite(){
  const {language}=useLanguage();
  useEffect(()=>{
    let frame=0;
    const pending=new Set();
    const flush=()=>{
      frame=0;
      const roots=[...pending]; pending.clear();
      if(!roots.length){
        document.querySelectorAll('.ce3-card').forEach(card=>applyCreatureCard(card,language));
        const detail=document.querySelector('.ce3-detail-page');
        if(detail) applyCreatureDetail(detail,language);
        return;
      }
      roots.forEach(root=>processRoot(root,language));
    };
    const queue=root=>{
      if(root?.nodeType===Node.ELEMENT_NODE) pending.add(root);
      if(!frame) frame=requestAnimationFrame(flush);
    };

    flush();
    const observer=new MutationObserver(records=>{
      for(const record of records){
        for(const node of record.addedNodes) queue(node);
      }
    });
    observer.observe(document.body,{subtree:true,childList:true});
    const onHash=()=>{
      pending.clear();
      if(frame) cancelAnimationFrame(frame);
      frame=requestAnimationFrame(flush);
    };
    window.addEventListener('hashchange',onHash);
    return ()=>{
      observer.disconnect();
      window.removeEventListener('hashchange',onHash);
      if(frame) cancelAnimationFrame(frame);
    };
  },[language]);
  return null;
}
