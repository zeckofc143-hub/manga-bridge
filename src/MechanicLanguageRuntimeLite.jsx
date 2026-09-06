import {useEffect} from 'react';

export default function MechanicLanguageRuntimeLite(){
  useEffect(()=>{
    let frame=0;
    const sync=()=>{
      if(frame) cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        frame=0;
        document.querySelectorAll('.mechanic-database-shell,.md-page').forEach(node=>node.setAttribute('data-no-auto-i18n','true'));
      });
    };
    sync();
    window.addEventListener('hashchange',sync);
    window.addEventListener('app:navigation',sync);
    return()=>{
      if(frame) cancelAnimationFrame(frame);
      window.removeEventListener('hashchange',sync);
      window.removeEventListener('app:navigation',sync);
    };
  },[]);
  return null;
}
