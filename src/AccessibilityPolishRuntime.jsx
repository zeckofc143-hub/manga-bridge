import { useEffect } from 'react';
import { useLanguage } from './LanguageProviderLite';
import { isCreatureRoute, isNativeI18nRoute } from './routeUtils';

function setLabel(node,label){
  if(!node || node.getAttribute('aria-labelledby')) return;
  node.setAttribute('aria-label',label);
}

function setTableSemantics(root,{label,headSelector,rowSelector}){
  if(!root) return;
  root.setAttribute('role','table');
  root.setAttribute('aria-label',label);
  root.querySelectorAll(headSelector).forEach(row=>{
    row.setAttribute('role','row');
    [...row.children].forEach(cell=>cell.setAttribute('role','columnheader'));
  });
  root.querySelectorAll(rowSelector).forEach(row=>{
    row.setAttribute('role','row');
    [...row.children].forEach((cell,index)=>cell.setAttribute('role',index===0?'rowheader':'cell'));
  });
}

function syncSemantics(language){
  if(isNativeI18nRoute()) return;
  const en=language==='en';
  const creature=isCreatureRoute();

  if(!creature){
    document.querySelectorAll('.header-search,.drawer-search,.big-search').forEach(form=>form.setAttribute('role','search'));
    document.querySelectorAll('.header-search input,.drawer-search input').forEach(input=>setLabel(input,en?'Search the wiki':'Buscar na wiki'));
    document.querySelectorAll('.big-search input').forEach(input=>setLabel(input,en?'Search the whole wiki':'Buscar em toda a wiki'));

    const legacyFilters=[...document.querySelectorAll('.filter-panel select')];
    setLabel(legacyFilters[0],en?'Filter by rarity':'Filtrar por raridade');
    setLabel(legacyFilters[1],en?'Filter by role':'Filtrar por função');

    const compareSelects=[...document.querySelectorAll('.compare-selects select')];
    setLabel(compareSelects[0],en?'First creature in comparison':'Primeira criatura da comparação');
    setLabel(compareSelects[1],en?'Second creature in comparison':'Segunda criatura da comparação');

    document.querySelectorAll('.compare-table').forEach(table=>setTableSemantics(table,{
      label:en?'Creature attribute comparison':'Comparação de atributos das criaturas',
      headSelector:'.compare-header',
      rowSelector:'.compare-row'
    }));
  }

  document.querySelectorAll('.compact-search input,.cth-search input').forEach(input=>setLabel(input,en?'Filter collection':'Filtrar coleção'));
  document.querySelectorAll('.drawer-head .icon-button').forEach(button=>{
    if(!button.getAttribute('aria-label')) setLabel(button,en?'Close menu':'Fechar menu');
  });
  document.querySelectorAll('.icon-button svg,.tool-icon svg,.source-box-icon svg,.mechanic-icon svg,.adv-icon svg').forEach(icon=>icon.setAttribute('aria-hidden','true'));

  document.querySelectorAll('.result-count,.progress-label,.cth-backup span,.cth-score,.adv-result-grid,.adv-fusion-score').forEach(node=>{
    node.setAttribute('aria-live','polite');
    node.setAttribute('aria-atomic','true');
  });

  document.querySelectorAll('.cth-compare-table').forEach(table=>setTableSemantics(table,{
    label:en?'Comparison of up to four creatures':'Comparação de até quatro criaturas',
    headSelector:'.cth-compare-head',
    rowSelector:'.cth-compare-row'
  }));

  document.querySelectorAll('.cth-army-grid').forEach(grid=>{
    grid.setAttribute('role','group');
    grid.setAttribute('aria-label',en?'Army slots':'Slots do exército');
  });
}

export default function AccessibilityPolishRuntime(){
  const {language}=useLanguage();

  useEffect(()=>{
    let frame=0;
    let observer=null;

    const schedule=()=>{
      if(isNativeI18nRoute()) return;
      if(frame) cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        frame=0;
        syncSemantics(language);
      });
    };

    const connect=()=>{
      observer?.disconnect();
      if(isNativeI18nRoute()) return;
      const root=document.getElementById('root');
      if(!root) return;
      observer=new MutationObserver(records=>{
        if(records.some(record=>record.addedNodes.length || record.removedNodes.length)) schedule();
      });
      observer.observe(root,{childList:true,subtree:true});
      schedule();
    };

    const onRoute=()=>requestAnimationFrame(connect);
    connect();
    window.addEventListener('hashchange',onRoute);
    window.addEventListener('app:navigation',onRoute);

    return()=>{
      if(frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('hashchange',onRoute);
      window.removeEventListener('app:navigation',onRoute);
    };
  },[language]);

  return null;
}
