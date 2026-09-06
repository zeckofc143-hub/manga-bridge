import { useEffect } from 'react';

function setLabel(node,label){
  if(node && !node.getAttribute('aria-label') && !node.getAttribute('aria-labelledby')) node.setAttribute('aria-label',label);
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

function syncLegacySemantics(){
  document.querySelectorAll('.header-search,.drawer-search,.big-search').forEach(form=>form.setAttribute('role','search'));

  document.querySelectorAll('.header-search input').forEach(input=>setLabel(input,'Buscar na wiki'));
  document.querySelectorAll('.drawer-search input').forEach(input=>setLabel(input,'Buscar na wiki'));
  document.querySelectorAll('.big-search input').forEach(input=>setLabel(input,'Buscar em toda a wiki'));
  document.querySelectorAll('.compact-search input,.cth-search input').forEach(input=>setLabel(input,'Filtrar coleção'));

  const legacyFilters = [...document.querySelectorAll('.filter-panel select')];
  setLabel(legacyFilters[0],'Filtrar por raridade');
  setLabel(legacyFilters[1],'Filtrar por função');

  const compareSelects = [...document.querySelectorAll('.compare-selects select')];
  setLabel(compareSelects[0],'Primeira criatura da comparação');
  setLabel(compareSelects[1],'Segunda criatura da comparação');

  document.querySelectorAll('.drawer-head .icon-button').forEach(button=>setLabel(button,'Fechar menu'));
  document.querySelectorAll('.icon-button svg,.tool-icon svg,.source-box-icon svg,.mechanic-icon svg,.adv-icon svg').forEach(icon=>icon.setAttribute('aria-hidden','true'));

  document.querySelectorAll('.result-count,.progress-label,.cth-backup span,.cth-score,.adv-result-grid,.adv-fusion-score').forEach(node=>{
    node.setAttribute('aria-live','polite');
    node.setAttribute('aria-atomic','true');
  });

  document.querySelectorAll('.compare-table').forEach(table=>{
    setTableSemantics(table,{
      label:'Comparação de atributos das criaturas',
      headSelector:'.compare-header',
      rowSelector:'.compare-row'
    });
  });

  document.querySelectorAll('.cth-compare-table').forEach(table=>{
    setTableSemantics(table,{
      label:'Comparação de até quatro criaturas',
      headSelector:'.cth-compare-head',
      rowSelector:'.cth-compare-row'
    });
  });

  document.querySelectorAll('.cth-army-grid').forEach(grid=>{
    grid.setAttribute('role','group');
    grid.setAttribute('aria-label','Slots do exército');
  });
}

export default function AccessibilityPolishRuntime(){
  useEffect(()=>{
    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(syncLegacySemantics,70);
    };

    schedule();
    window.addEventListener('hashchange',schedule);
    window.addEventListener('app:navigation',schedule);
    window.addEventListener('pa:language',schedule);
    document.addEventListener('click',schedule,true);
    document.addEventListener('change',schedule,true);
    document.addEventListener('input',schedule,true);

    return ()=>{
      window.clearTimeout(timer);
      window.removeEventListener('hashchange',schedule);
      window.removeEventListener('app:navigation',schedule);
      window.removeEventListener('pa:language',schedule);
      document.removeEventListener('click',schedule,true);
      document.removeEventListener('change',schedule,true);
      document.removeEventListener('input',schedule,true);
    };
  },[]);

  return null;
}
