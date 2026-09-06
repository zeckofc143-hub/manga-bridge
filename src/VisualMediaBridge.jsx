import React,{useEffect,useState} from 'react';
import {createPortal} from 'react-dom';
import SiteVisualMedia from './SiteVisualMedia';
import {getDatabaseRoute} from './routeUtils';
import {siteVisualMedia} from './siteVisualMediaData';

const SUPPORTED=new Set(['resources','chambers','mechanics','guides','tools','farms','strategies']);

function currentRoute(){return getDatabaseRoute(window.location.hash||'#/');}

export default function VisualMediaBridge(){
  const [route,setRoute]=useState(currentRoute);
  const [host,setHost]=useState(null);

  useEffect(()=>{
    const sync=()=>setRoute(currentRoute());
    window.addEventListener('hashchange',sync);
    window.addEventListener('app:navigation',sync);
    return()=>{
      window.removeEventListener('hashchange',sync);
      window.removeEventListener('app:navigation',sync);
    };
  },[]);

  useEffect(()=>{
    setHost(null);
    document.querySelectorAll('.svm-bridge-host').forEach(node=>node.remove());
    if(!route.active||!route.id||!SUPPORTED.has(route.kind)||!siteVisualMedia(route.kind,route.id))return;

    let frame=0;
    let observer=null;
    const attach=()=>{
      const main=document.querySelector('.site-main');
      if(!main)return false;
      const hero=main.querySelector('.rdb-detail-hero,.td-hero,.kx-detail-hero,.gd-detail-hero');
      if(!hero||!hero.parentNode)return false;
      const node=document.createElement('div');
      node.className='svm-bridge-host';
      node.dataset.visualRoute=`${route.kind}:${route.id}`;
      hero.insertAdjacentElement('afterend',node);
      setHost(node);
      return true;
    };

    frame=requestAnimationFrame(()=>{
      if(attach())return;
      const root=document.getElementById('root');
      if(!root)return;
      observer=new MutationObserver(()=>{
        if(attach())observer?.disconnect();
      });
      observer.observe(root,{childList:true,subtree:true});
    });

    return()=>{
      cancelAnimationFrame(frame);
      observer?.disconnect();
      document.querySelectorAll('.svm-bridge-host').forEach(node=>node.remove());
    };
  },[route.active,route.kind,route.id]);

  if(!host||!route.id)return null;
  return createPortal(<SiteVisualMedia kind={route.kind} id={route.id}/>,host);
}
