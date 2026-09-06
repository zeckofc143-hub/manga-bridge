import React, { Suspense, lazy, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './creatureAuditRuntime';
import AppV2 from './AppV2';
import CreatureLanguageRuntime from './CreatureLanguageRuntime';
import TranslationCoverage from './TranslationCoverage';
import { LanguageProvider, SiteSettings } from './i18n';
import './index.css';
import './sitePolish.css';

const Enhancements = lazy(() => import('./Enhancements'));
const AdvancedPlanner = lazy(() => import('./AdvancedPlanner'));
const CommunityResearchHub = lazy(() => import('./CommunityResearchHub'));

function isCreatureDatabaseRoute(){
  return /^#\/creatures(?:\/|$|\?)/i.test(window.location.hash || '#/');
}

function DeferredExtras(){
  const [ready,setReady] = useState(false);
  const [blocked,setBlocked] = useState(()=>isCreatureDatabaseRoute());

  useEffect(()=>{
    const onHashChange = () => setBlocked(isCreatureDatabaseRoute());
    window.addEventListener('hashchange',onHashChange);
    return ()=>window.removeEventListener('hashchange',onHashChange);
  },[]);

  useEffect(()=>{
    if(blocked){
      setReady(false);
      return;
    }

    let timeoutId;
    let idleId;
    const show = () => setReady(true);

    if('requestIdleCallback' in window){
      idleId = window.requestIdleCallback(show,{timeout:1400});
    }else{
      timeoutId = window.setTimeout(show,650);
    }

    return ()=>{
      if(idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if(timeoutId) window.clearTimeout(timeoutId);
    };
  },[blocked]);

  if(blocked || !ready) return null;
  return <Suspense fallback={null}>
    <Enhancements />
    <AdvancedPlanner />
    <CommunityResearchHub />
  </Suspense>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AppV2 />
      <CreatureLanguageRuntime />
      <TranslationCoverage />
      <DeferredExtras />
      <SiteSettings />
    </LanguageProvider>
  </React.StrictMode>
);
