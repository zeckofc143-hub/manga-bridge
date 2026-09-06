import { useEffect } from 'react';

const ROUTE_CLASS = 'ux-route-enter';
const ROUTE_CLEANUP_MS = 280;
const SCHEDULE_DEBOUNCE_MS = 8;

function motionAllowed(){
  if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  return document.documentElement.dataset.uxEffects !== 'reduced';
}

function nativeTransitionActive(){
  return document.documentElement.dataset.uxViewTransition === 'active' || Boolean(document.activeViewTransition);
}

function isDedicatedDatabaseRoute(){
  return /^#\/(?:creatures|resources|chambers)(?:\/|$|\?)/i.test(window.location.hash || '#/');
}

export default function InteractionMotionRuntime(){
  useEffect(()=>{
    let rafA = 0;
    let cleanupTimer = 0;
    let scheduleTimer = 0;
    let scrollTimer = 0;

    const animate = () => {
      const main = document.querySelector('.site-main');
      if(!main || !motionAllowed() || nativeTransitionActive()) return;
      main.classList.remove(ROUTE_CLASS);
      rafA = requestAnimationFrame(()=>{
        const currentMain = document.querySelector('.site-main');
        if(!currentMain || !motionAllowed() || nativeTransitionActive()) return;
        currentMain.classList.add(ROUTE_CLASS);
        window.clearTimeout(cleanupTimer);
        cleanupTimer = window.setTimeout(()=>currentMain.classList.remove(ROUTE_CLASS),ROUTE_CLEANUP_MS);
      });
    };

    const run = () => {
      cancelAnimationFrame(rafA);
      window.clearTimeout(scrollTimer);
      if(!isDedicatedDatabaseRoute()){
        requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'auto'}));
        scrollTimer = window.setTimeout(()=>window.scrollTo({top:0,left:0,behavior:'auto'}),40);
      }
      animate();
    };

    const schedule = () => {
      window.clearTimeout(scheduleTimer);
      scheduleTimer = window.setTimeout(run,SCHEDULE_DEBOUNCE_MS);
    };

    schedule();
    window.addEventListener('hashchange',schedule);
    window.addEventListener('app:navigation',schedule);

    return ()=>{
      cancelAnimationFrame(rafA);
      window.clearTimeout(cleanupTimer);
      window.clearTimeout(scheduleTimer);
      window.clearTimeout(scrollTimer);
      window.removeEventListener('hashchange',schedule);
      window.removeEventListener('app:navigation',schedule);
      document.querySelector('.site-main')?.classList.remove(ROUTE_CLASS);
    };
  },[]);

  return null;
}
