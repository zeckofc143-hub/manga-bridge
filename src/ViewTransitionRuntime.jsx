import { useEffect } from 'react';

const INTERNAL_HASH = /^#\//i;

function motionAllowed(){
  if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  return document.documentElement.dataset.uxEffects !== 'reduced';
}

function eligibleAnchor(event){
  if(event.defaultPrevented || event.button !== 0) return null;
  if(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;
  const anchor = event.target.closest?.('a[href]');
  if(!anchor || anchor.hasAttribute('download')) return null;
  if(anchor.target && anchor.target !== '_self') return null;
  if(anchor.getAttribute('aria-disabled') === 'true') return null;

  let url;
  try{ url = new URL(anchor.href,window.location.href); }catch{ return null; }
  if(url.origin !== window.location.origin || url.pathname !== window.location.pathname) return null;
  if(!INTERNAL_HASH.test(url.hash) || url.hash === window.location.hash) return null;
  return {anchor,url};
}

function nextFrame(){
  return new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
}

export default function ViewTransitionRuntime(){
  useEffect(()=>{
    let serial = 0;

    const onClick = event => {
      const target = eligibleAnchor(event);
      if(!target || !motionAllowed() || typeof document.startViewTransition !== 'function') return;

      event.preventDefault();
      document.activeViewTransition?.skipTransition?.();

      const token = String(++serial);
      const root = document.documentElement;
      const main = document.querySelector('.site-main');
      root.dataset.uxViewTransition = 'active';
      root.dataset.uxViewTransitionToken = token;
      main?.setAttribute('aria-busy','true');

      let navigated = false;
      const clear = () => {
        if(root.dataset.uxViewTransitionToken !== token) return;
        delete root.dataset.uxViewTransition;
        delete root.dataset.uxViewTransitionToken;
        main?.removeAttribute('aria-busy');
      };

      try{
        const transition = document.startViewTransition(async()=>{
          navigated = true;
          window.location.hash = target.url.hash;
          await nextFrame();
        });
        transition.finished.then(clear,clear);
      }catch{
        clear();
        if(!navigated) window.location.hash = target.url.hash;
      }
    };

    document.addEventListener('click',onClick,true);
    return ()=>document.removeEventListener('click',onClick,true);
  },[]);

  return null;
}
