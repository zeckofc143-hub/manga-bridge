import React,{useEffect,useMemo,useState} from 'react';
import {BookOpen,ExternalLink,Image as ImageIcon,Maximize2} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {siteVisualMedia} from './siteVisualMediaData';
import {mediaLoadTimeoutMs,robustMediaCandidates} from './mediaCandidateUtils';
import './siteVisualMedia.css';

const tr=(value,language)=>value&&typeof value==='object'?(language==='en'?(value.en??value.pt):(value.pt??value.en)):value;

function MediaAsset({item,index,onStatus,compact}){
  const {language,t}=useLanguage();
  const candidates=useMemo(()=>robustMediaCandidates(item.candidates||[]),[item]);
  const [candidate,setCandidate]=useState(0);
  const [failed,setFailed]=useState(false);
  const [loaded,setLoaded]=useState(false);
  const src=candidates[candidate];

  useEffect(()=>{setCandidate(0);setFailed(false);setLoaded(false);onStatus(index,'loading');},[candidates,index,onStatus]);
  useEffect(()=>{
    if(!src||failed||loaded)return;
    const timer=window.setTimeout(()=>{
      if(candidate<candidates.length-1){setCandidate(value=>value+1);setLoaded(false);}
      else{setFailed(true);onStatus(index,'failed');}
    },mediaLoadTimeoutMs());
    return()=>window.clearTimeout(timer);
  },[src,candidate,candidates.length,failed,loaded,index,onStatus]);

  if(!src||failed)return null;

  const fail=()=>{
    setLoaded(false);
    if(candidate<candidates.length-1){setCandidate(value=>value+1);return;}
    setFailed(true);onStatus(index,'failed');
  };
  const success=()=>{setLoaded(true);onStatus(index,'loaded');};

  return <figure className={`svm-item${compact?' compact':''}`}>
    <a className="svm-image-link" href={src} target="_blank" rel="noreferrer" aria-label={t('Abrir captura em tamanho maior','Open larger screenshot')}>
      <img src={src} alt={tr(item.alt,language)||''} loading="lazy" decoding="async" referrerPolicy="no-referrer" onLoad={success} onError={fail}/>
      <span className="svm-zoom"><Maximize2 size={14}/>{t('Ampliar','Enlarge')}</span>
    </a>
    <figcaption>
      <p>{tr(item.caption,language)}</p>
      <div className="svm-item-actions"><span><ImageIcon size={13}/>{tr(item.label,language)||t('Imagem real do jogo','Real game image')}</span>{item.source&&<a href={item.source} target="_blank" rel="noreferrer"><BookOpen size={13}/>{t('Fonte','Source')}<ExternalLink size={10}/></a>}</div>
    </figcaption>
  </figure>;
}

export default function SiteVisualMedia({kind,id,compact=false}){
  const {language,t}=useLanguage();
  const media=siteVisualMedia(kind,id);
  const items=media?.items||[];
  const [status,setStatus]=useState(()=>items.map(()=> 'loading'));

  useEffect(()=>setStatus(items.map(()=> 'loading')),[kind,id,items.length]);
  const setItemStatus=React.useCallback((index,value)=>setStatus(current=>{
    if(current[index]===value)return current;
    const next=[...current];next[index]=value;return next;
  }),[]);

  if(!media||!items.length)return null;
  if(status.length===items.length&&status.every(value=>value==='failed'))return null;

  return <section className={`svm-block${compact?' svm-compact':''}`} aria-label={tr(media.title,language)||t('Referência visual','Visual reference')}>
    <header className="svm-head"><div><span><ImageIcon size={15}/>{t('Referência visual','Visual reference')}</span><h2>{tr(media.title,language)}</h2></div>{items.length>1&&<small>{t('Deslize para ver mais','Swipe for more')}</small>}</header>
    {media.note&&<p className="svm-note">{tr(media.note,language)}</p>}
    <div className={`svm-track${items.length===1?' single':''}`}>{items.map((item,index)=><MediaAsset key={`${kind}-${id}-${index}`} item={item} index={index} compact={compact} onStatus={setItemStatus}/>)}</div>
  </section>;
}
