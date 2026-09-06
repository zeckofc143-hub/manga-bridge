import { useEffect } from 'react';

function setLabel(node,label){
  if(node && !node.getAttribute('aria-label') && !node.getAttribute('aria-labelledby')) node.setAttribute('aria-label',label);
}

function syncLegacySemantics(){
  document.querySelectorAll('.header-search,.drawer-search,.big-search').forEach(form=>form.setAttribute('role','search'));

  document.querySelectorAll('.header-search input').forEach(input=>setLabel(input,'Buscar na wiki'));
  document.querySelectorAll('.drawer-search input').forEach(input=>setLabel(input,'Buscar na wiki'));
  document.querySelectorAll('.big-search input').forEach(input=>setLabel(input,'Buscar em toda a wiki'));
  document.querySelectorAll('.compact-search input').forEach(input=>setLabel(input,'Filtrar coleção'));

  const legacyFilters = [...document.querySelectorAll('.filter-panel select')];
  setLabel(legacyFilters[0],'Filtrar por raridade');
  setLabel(legacyFilters[1],'Filtrar por função');

  const compareSelects = [...document.querySelectorAll('.compare-selects select')];
  setLabel(compareSelects[0],'Primeira criatura da comparação');
  setLabel(compareSelects[1],'Segunda criatura da comparação');

  document.querySelectorAll('.drawer-head .icon-button').forEach(button=>setLabel(button,'Fechar menu'));
  document.querySelectorAll('.icon-button svg,.tool-icon svg,.source-box-icon svg,.mechanic-icon svg').forEach(icon=>icon.setAttribute('aria-hidden','true'));

  document.querySelectorAll('.result-count,.progress-label').forEach(node=>{
    node.setAttribute('aria-live','polite');
    node.setAttribute('aria-atomic','true');
  });

  document.querySelectorAll('.compare-table').forEach(table=>{
    table.setAttribute('role','table');
    table.setAttribute('aria-label','Comparação de atributos das criaturas');
  });
  document.querySelectorAll('.compare-header').forEach(row=>{
    row.setAttribute('role','row');
    const cells = [...row.children];
    cells.forEach((cell,index)=>cell.setAttribute('role',index===1?'presentation':'columnheader'));
  });
  document.querySelectorAll('.compare-row').forEach(row=>{
    row.setAttribute('role','row');
    const cells = [...row.children];
    if(cells[0]) cells[0].setAttribute('role','cell');
    if(cells[1]) cells[1].setAttribute('role','rowheader');
    if(cells[2]) cells[2].setAttribute('role','cell');
  });
}

export default function AccessibilityPolishRuntime(){
  useEffect(()=>{
    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(syncLegacySemantics,80);
    };

    schedule();
    window.addEventListener('hashchange',schedule);
    window.addEventListener('app:navigation',schedule);
    window.addEventListener('pa:language',schedule);
    document.addEventListener('click',schedule,true);

    return ()=>{
      window.clearTimeout(timer);
      window.removeEventListener('hashchange',schedule);
      window.removeEventListener('app:navigation',schedule);
      window.removeEventListener('pa:language',schedule);
      document.removeEventListener('click',schedule,true);
    };
  },[]);

  return null;
}
