import { useEffect } from 'react';
import { useLanguage } from './LanguageProviderLite';
import { isCreatureRoute } from './routeUtils';

function routeTitle(language){
  const en=language==='en';
  const hash=window.location.hash || '#/';
  if(/^#\/creatures\/[^?/#]+/i.test(hash)){
    const heading=document.querySelector('.ce3-detail-page h1')?.textContent?.trim();
    if(heading) return `${heading} · Pocket Ants ${en?'Wiki EN':'Wiki BR'}`;
    return `${en?'Creature':'Criatura'} · Pocket Ants ${en?'Wiki EN':'Wiki BR'}`;
  }
  const routes=[
    [/^#\/creatures/i,en?'Creatures':'Criaturas'],
    [/^#\/resources/i,en?'Resources':'Recursos'],
    [/^#\/chambers/i,en?'Chambers':'Câmaras'],
    [/^#\/mechanics/i,en?'Mechanics':'Mecânicas'],
    [/^#\/guides/i,en?'Guides':'Guias'],
    [/^#\/tools/i,en?'Tools':'Ferramentas'],
    [/^#\/farms/i,'Farms'],
    [/^#\/strategies/i,en?'Strategies':'Estratégias'],
    [/^#\/clans/i,en?'Clans & Social':'Clãs & Social'],
    [/^#\/world/i,en?'World & Environment':'Mundo & Ambiente'],
    [/^#\/upgrades/i,en?'Shops & Upgrades':'Lojas & Upgrades'],
    [/^#\/events/i,en?'Events & History':'Eventos & Histórico'],
    [/^#\/quests/i,en?'Quests & Rewards':'Quests & Recompensas'],
    [/^#\/glossary/i,en?'Glossary':'Glossário'],
    [/^#\/search/i,en?'Search':'Busca']
  ];
  const match=routes.find(([pattern])=>pattern.test(hash));
  const suffix=`Pocket Ants ${en?'Wiki EN':'Wiki BR'}`;
  return match?`${match[1]} · ${suffix}`:suffix;
}

function syncSkip(language){
  const button=document.querySelector('.ux-skip-link');
  if(button) button.textContent=language==='en'?'Skip to content':'Pular para o conteúdo';
}

function syncStatus(language){
  const en=language==='en';
  const offline=document.querySelector('.ux-status-offline');
  if(offline){
    const strong=offline.querySelector('strong');
    const span=offline.querySelector('span');
    if(strong) strong.textContent=en?'Offline':'Sem internet';
    if(span) span.textContent=en?'Cached content remains available.':'O que já estiver em cache continua disponível.';
  }
  const online=document.querySelector('.ux-status-online');
  if(online){
    const strong=online.querySelector('strong');
    const span=online.querySelector('span');
    if(strong) strong.textContent=en?'Connection restored':'Conexão restaurada';
    if(span) span.textContent=en?'The wiki is updating normally again.':'A wiki voltou a atualizar normalmente.';
  }
  const update=document.querySelector('.ux-status-update');
  if(update){
    const strong=update.querySelector('strong');
    const span=update.querySelector('span');
    const button=update.querySelector('button');
    if(strong) strong.textContent=en?'New version available':'Nova versão disponível';
    if(span) span.textContent=en?'Update when you want to use the latest improvements.':'Atualize quando quiser para usar as melhorias mais recentes.';
    if(button) button.textContent=en?'Update':'Atualizar';
  }
}

export default function GlobalUiLanguageRuntime(){
  const {language}=useLanguage();

  useEffect(()=>{
    let frame=0;
    const sync=()=>{
      if(frame) cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        frame=0;
        const nextTitle=routeTitle(language);
        if(document.title!==nextTitle) document.title=nextTitle;
        syncSkip(language);
        syncStatus(language);
      });
    };

    const titleNode=document.querySelector('title');
    const titleObserver=titleNode?new MutationObserver(()=>{
      const next=routeTitle(language);
      if(document.title!==next) document.title=next;
    }):null;
    titleObserver?.observe(titleNode,{childList:true,characterData:true,subtree:true});

    const root=document.getElementById('root');
    const uiObserver=root?new MutationObserver(records=>{
      let relevant=false;
      for(const record of records){
        for(const node of record.addedNodes){
          if(node.nodeType!==Node.ELEMENT_NODE) continue;
          if(node.matches?.('.ux-status-stack,.ux-status,.ux-skip-link') || node.querySelector?.('.ux-status-stack,.ux-status,.ux-skip-link')){
            relevant=true;
            break;
          }
        }
        if(relevant) break;
      }
      if(relevant) sync();
    }):null;
    uiObserver?.observe(root,{childList:true,subtree:true});

    sync();
    if(isCreatureRoute()) requestAnimationFrame(sync);
    window.addEventListener('hashchange',sync);
    window.addEventListener('app:navigation',sync);
    window.addEventListener('online',sync);
    window.addEventListener('offline',sync);

    return()=>{
      if(frame) cancelAnimationFrame(frame);
      titleObserver?.disconnect();
      uiObserver?.disconnect();
      window.removeEventListener('hashchange',sync);
      window.removeEventListener('app:navigation',sync);
      window.removeEventListener('online',sync);
      window.removeEventListener('offline',sync);
    };
  },[language]);

  return null;
}
