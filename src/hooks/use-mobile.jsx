import { useEffect,useState } from 'react';
export default function useIsMobile(){
  const [mobile,setMobile]=useState(()=>typeof window!=='undefined'&&window.matchMedia('(max-width: 768px)').matches);
  useEffect(()=>{const q=window.matchMedia('(max-width: 768px)');const f=()=>setMobile(q.matches);q.addEventListener('change',f);return()=>q.removeEventListener('change',f)},[]);
  return mobile;
}
