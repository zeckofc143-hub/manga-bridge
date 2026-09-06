import { useEffect } from 'react';

const ROUTE_CLASS = 'ux-route-enter';

function motionAllowed(){
  if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  return document.documentElement.dataset.uxEffects !== 'reduced';
}

function isCreatureRoute(){
  return /^#\/creatures(?:\/|$|\?)/i.test(window.location.hash || '#/');
}

export default function InteractionMotionRuntime(){
  useEffect(()=>{
    let rafA = 0;
    let rafB = 0;
    let cleanupTimer = 0;

    const animate = () => {
      const main = document.querySelector('.site-main');
      if(!main || !motionAllowed()) return;
      main.classList.remove(ROUTE_CLASS);
      rafA = requestAnimationFrame(()=>{
        rafB = requestAnimationFrame(()=>{
          const currentMain = document.querySelector('.site-main');
          if(!currentMain || !motionAllowed()) return;
          currentMain.classList.remove(ROUTE_CLASS);
          currentMain.classList.add(ROUTE_CLASS);
          window.clearTimeout(cleanupTimer);
          cleanupTimer = window.setTimeout(()=>currentMain.classList.remove(ROUTE_CLASS),190);
        });
      });
    };

    const schedule = () => {
      cancelAnimationFrame(rafA);
      cancelAnimationFrame(rafB);

      /* Legacy routes used smooth scroll after navigation, which can read as lag.
         Creature routes keep their own scroll restoration behavior. */
      if(!isCreatureRoute()){
        requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'auto'}));
      }

      animate();
    };

    schedule();
    window.addEventListener('hashchange',schedule);
    window.addEventListener('app:navigation',schedule);
    window.addEventListener('pa:language',schedule);

    return ()=>{
      cancelAnimationFrame(rafA);
      cancelAnimationFrame(rafB);
      window.clearTimeout(cleanupTimer);
      window.removeEventListener('hashchange',schedule);
      window.removeEventListener('app:navigation',schedule);
      window.removeEventListener('pa:language',schedule);
      document.querySelector('.site-main')?.classList.remove(ROUTE_CLASS);
    };
  },[]);

  return null;
}
