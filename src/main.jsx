import React, { Suspense, lazy, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './creatureAuditRuntime';
import AppV2 from './AppV2';
import CreatureLanguageRuntimeLite from './CreatureLanguageRuntimeLite';
import TranslationCoverageLite from './TranslationCoverageLite';
import UxBehaviorRuntime from './UxBehaviorRuntime';
import AccessibilityPolishRuntime from './AccessibilityPolishRuntime';
import ProgressiveDisclosureRuntime from './ProgressiveDisclosureRuntime';
import ViewTransitionRuntime from './ViewTransitionRuntime';
import InteractionMotionRuntime from './InteractionMotionRuntime';
import LocalizedTutorialRuntime from './LocalizedTutorialRuntime';
import { LanguageProvider, SiteSettings } from './LanguageProviderLite';
import './index.css';
import './sitePolish.css';
import './uxProfessional.css';
import './visualComfort.css';
import './interactionMotion.css';
import './responsiveComfort.css';
import './denseUiComfort.css';

const Enhancements = lazy(() => import('./Enhancements'));
const AdvancedPlanner = lazy(() => import('./AdvancedPlanner'));
const CommunityResearchHub = lazy(() => import('./CommunityResearchHub'));

function isCreatureDatabaseRoute(){
  return /^#\/creatures(?:\/|$|\?)/i.test(window.location.hash || '#/');
}

function DeferredExtras(){
  const [stage,setStage] = useState(0);
  const [blocked,setBlocked] = useState(()=>isCreatureDatabaseRoute());

  useEffect(()=>{
    const onHashChange = () => setBlocked(isCreatureDatabaseRoute());
    window.addEventListener('hashchange',onHashChange);
    return ()=>window.removeEventListener('hashchange',onHashChange);
  },[]);

  useEffect(()=>{
    if(blocked){
      setStage(0);
      return;
    }

    let idleId;
    let firstTimer;
    let secondTimer;
    let thirdTimer;
    const begin = () => {
      setStage(1);
      secondTimer = window.setTimeout(()=>setStage(2),700);
      thirdTimer = window.setTimeout(()=>setStage(3),1500);
    };

    if('requestIdleCallback' in window){
      idleId = window.requestIdleCallback(begin,{timeout:2200});
    }else{
      firstTimer = window.setTimeout(begin,1200);
    }

    return ()=>{
      if(idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if(firstTimer) window.clearTimeout(firstTimer);
      if(secondTimer) window.clearTimeout(secondTimer);
      if(thirdTimer) window.clearTimeout(thirdTimer);
    };
  },[blocked]);

  if(blocked || stage===0) return null;
  return <Suspense fallback={null}>
    {stage>=1 && <Enhancements />}
    {stage>=2 && <AdvancedPlanner />}
    {stage>=3 && <CommunityResearchHub />}
  </Suspense>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AppV2 />
      <CreatureLanguageRuntimeLite />
      <TranslationCoverageLite />
      <UxBehaviorRuntime />
      <AccessibilityPolishRuntime />
      <ProgressiveDisclosureRuntime />
      <ViewTransitionRuntime />
      <InteractionMotionRuntime />
      <LocalizedTutorialRuntime />
      <DeferredExtras />
      <SiteSettings />
    </LanguageProvider>
  </React.StrictMode>
);
