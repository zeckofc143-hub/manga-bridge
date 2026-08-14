import React,{useEffect,useState} from 'react';
import { Bell,X } from 'lucide-react';
export default function NotificationPrompt(){
  const [show,setShow]=useState(false);
  useEffect(()=>{ if(localStorage.getItem('reak_notification_prompt'))return; const t=setTimeout(()=>setShow(true),3000);return()=>clearTimeout(t)},[]);
  if(!show)return null;
  const done=()=>{localStorage.setItem('reak_notification_prompt','1');setShow(false)};
  return <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-violet-500/30 bg-zinc-900 p-4 shadow-2xl">
    <button onClick={done} className="absolute right-3 top-3 text-zinc-500"><X size={18}/></button>
    <div className="flex gap-3"><div className="rounded-xl bg-violet-500/15 p-3 text-violet-300"><Bell/></div><div><b>Ativar notificações?</b><p className="mt-1 text-sm text-zinc-400">Receba avisos sobre novos capítulos e respostas.</p><button onClick={done} className="mt-3 rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-semibold">Entendi</button></div></div>
  </div>;
}
