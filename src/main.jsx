import React, { Suspense, lazy, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './creatureAuditRuntime';
import AppV2 from './AppV2';
import './index.css';
import './sitePolish.css';

const Enhancements = lazy(() => import('./Enhancements'));
const AdvancedPlanner = lazy(() => import('./AdvancedPlanner'));
const CommunityResearchHub = lazy(() => import('./CommunityResearchHub'));

function DeferredExtras(){
  const [ready,setReady] = useState(false);

  useEffect(()=>{
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
  },[]);

  if(!ready) return null;
  return <Suspense fallback={null}>
    <Enhancements />
    <AdvancedPlanner />
    <CommunityResearchHub />
  </Suspense>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppV2 />
    <DeferredExtras />
  </React.StrictMode>
);
