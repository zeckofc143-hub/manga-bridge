import React, { useEffect, useMemo, useState } from 'react';
import App from './App';
import CreatureEncyclopediaPage from './CreatureEncyclopediaPage';

function currentCreatureRoute(){
  const hash = window.location.hash || '#/';
  const match = hash.match(/^#\/creatures(?:\/([^?/#]+))?/i);
  return match ? { active:true, id:match[1] ? decodeURIComponent(match[1]) : null } : { active:false, id:null };
}

export default function AppV2(){
  const [hash,setHash] = useState(()=>window.location.hash || '#/');
  useEffect(()=>{
    const onHash = ()=>setHash(window.location.hash || '#/');
    window.addEventListener('hashchange',onHash);
    return ()=>window.removeEventListener('hashchange',onHash);
  },[]);

  const route = useMemo(currentCreatureRoute,[hash]);

  useEffect(()=>{
    document.body.classList.toggle('encyclopedia-route',route.active);
    return ()=>document.body.classList.remove('encyclopedia-route');
  },[route.active]);

  return <>
    <App />
    {route.active && <CreatureEncyclopediaPage routeId={route.id}/>} 
  </>;
}
