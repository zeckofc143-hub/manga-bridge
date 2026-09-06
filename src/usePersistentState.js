import {useCallback,useEffect,useState} from 'react';

export function readStoredJson(key,fallback){
  if(typeof window==='undefined') return typeof fallback==='function'?fallback():fallback;
  try{
    const raw=window.localStorage.getItem(key);
    if(raw==null) return typeof fallback==='function'?fallback():fallback;
    return JSON.parse(raw);
  }catch{
    return typeof fallback==='function'?fallback():fallback;
  }
}

export function writeStoredJson(key,value){
  try{
    window.localStorage.setItem(key,JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('pa:storage-sync',{detail:{key,value}}));
    return true;
  }catch{
    return false;
  }
}

export function removeStoredValue(key){
  try{
    window.localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent('pa:storage-sync',{detail:{key,value:null}}));
    return true;
  }catch{
    return false;
  }
}

export function usePersistentState(key,initialValue){
  const makeInitial=useCallback(()=>typeof initialValue==='function'?initialValue():initialValue,[initialValue]);
  const [value,setValue]=useState(()=>readStoredJson(key,makeInitial));

  useEffect(()=>{
    writeStoredJson(key,value);
  },[key,value]);

  useEffect(()=>{
    const onStorage=event=>{
      if(event.key!==key) return;
      if(event.newValue==null){setValue(makeInitial());return;}
      try{setValue(JSON.parse(event.newValue));}catch{}
    };
    const onLocalSync=event=>{
      if(event.detail?.key!==key) return;
      if(event.detail.value==null){setValue(makeInitial());return;}
      setValue(event.detail.value);
    };
    window.addEventListener('storage',onStorage);
    window.addEventListener('pa:storage-sync',onLocalSync);
    return()=>{
      window.removeEventListener('storage',onStorage);
      window.removeEventListener('pa:storage-sync',onLocalSync);
    };
  },[key,makeInitial]);

  const reset=useCallback(()=>setValue(makeInitial()),[makeInitial]);
  return [value,setValue,reset];
}
