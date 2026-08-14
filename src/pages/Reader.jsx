import React,{useEffect,useState} from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom';
import {useQuery,useQueryClient} from '@tanstack/react-query';
import {backend} from '@/api/localBackend';
import {ArrowLeft,ChevronLeft,ChevronRight,Comments,Expand,ZoomIn,ZoomOut,List,ArrowUp} from 'lucide-react';
import {useAuth} from '@/lib/AuthContext';
import CommentSection from '@/components/manhwa/CommentSection';

export default function Reader(){
 const {manhwaId,chapterId}=useParams(),nav=useNavigate(),{user}=useAuth(),qc=useQueryClient();
 const [ui,setUi]=useState(true),[zoom,setZoom]=useState(100),[drawer,setDrawer]=useState(false),[comments,setComments]=useState(false);
 const {data:m}=useQuery({queryKey:['manhwa',manhwaId],queryFn:()=>backend.entities.Manhwa.get(manhwaId)});
 const {data:c}=useQuery({queryKey:['chapter',chapterId],queryFn:()=>backend.entities.Chapter.get(chapterId)});
 const {data:chapters=[]}=useQuery({queryKey:['chapters',manhwaId],queryFn:()=>backend.entities.Chapter.filter({manhwa_id:manhwaId})});
 useEffect(()=>{if(!c||!user)return;(async()=>{const rows=await backend.entities.ReadingHistory.filter({user_email:user.email,chapter_id:c.id});if(rows[0])await backend.entities.ReadingHistory.update(rows[0].id,{page_number:c.pages?.length||1,completed:true});else await backend.entities.ReadingHistory.create({user_email:user.email,manhwa_id:manhwaId,chapter_id:c.id,chapter_number:c.number,page_number:c.pages?.length||1,completed:true});const views=await backend.entities.UserView.filter({user_email:user.email,manhwa_id:manhwaId});if(!views.length){await backend.entities.UserView.create({user_email:user.email,manhwa_id:manhwaId,viewed_at:new Date().toISOString()});const mm=await backend.entities.Manhwa.get(manhwaId);await backend.entities.Manhwa.update(manhwaId,{views:(mm.views||0)+1});}qc.invalidateQueries({queryKey:['readingHistory']})})()},[c?.id,user?.email]);
 if(!m||!c)return <div className="p-8">Carregando...</div>;
 const sorted=[...chapters].sort((a,b)=>a.number-b.number),idx=sorted.findIndex(x=>x.id===c.id),prev=sorted[idx-1],next=sorted[idx+1];
 return <div className="min-h-screen bg-black text-white" onClick={()=>setUi(v=>!v)}>
  {ui&&<div onClick={e=>e.stopPropagation()} className="fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-3 border-b border-zinc-800 bg-zinc-950/90 px-3 backdrop-blur-xl"><Link to={`/ManhwaDetail/${m.id}`} className="rounded-lg p-2 hover:bg-zinc-800"><ArrowLeft/></Link><div className="min-w-0"><b className="block truncate">{m.title}</b><span className="text-xs text-zinc-500">Capítulo {c.number}</span></div><div className="ml-auto flex gap-1"><button onClick={()=>setZoom(z=>Math.max(50,z-10))} className="rounded-lg p-2 hover:bg-zinc-800"><ZoomOut/></button><span className="hidden self-center text-xs text-zinc-500 sm:block">{zoom}%</span><button onClick={()=>setZoom(z=>Math.min(150,z+10))} className="rounded-lg p-2 hover:bg-zinc-800"><ZoomIn/></button><button onClick={()=>document.documentElement.requestFullscreen?.()} className="rounded-lg p-2 hover:bg-zinc-800"><Expand/></button><button onClick={()=>setDrawer(v=>!v)} className="rounded-lg p-2 hover:bg-zinc-800"><List/></button></div></div>}
  <div className="mx-auto flex min-h-screen max-w-[1100px] flex-col items-center pt-16">
   {c.text_content?<article onClick={e=>e.stopPropagation()} className="mx-auto max-w-3xl px-6 py-16 font-serif text-lg leading-9 text-zinc-200"><h1 className="mb-8 font-display text-3xl font-bold">{c.title}</h1><p>{c.text_content}</p></article>:c.pages?.map((p,i)=><img key={i} src={p} style={{width:`${zoom}%`,maxWidth:'1100px'}} className="block h-auto"/>)}
   <div onClick={e=>e.stopPropagation()} className="flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-10">{prev?<button onClick={()=>nav(`/Reader/${m.id}/${prev.id}`)} className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-3"><ChevronLeft/>Anterior</button>:<span/>}{next&&<button onClick={()=>nav(`/Reader/${m.id}/${next.id}`)} className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3">Próximo<ChevronRight/></button>}</div>
   <button onClick={e=>{e.stopPropagation();setComments(v=>!v)}} className="mb-10 flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-3"><Comments/>Ver comentários</button>
   {comments&&<div onClick={e=>e.stopPropagation()} className="w-full max-w-4xl px-4 pb-20"><CommentSection manhwaId={m.id} chapterId={c.id}/></div>}
  </div>
  {drawer&&<div onClick={e=>e.stopPropagation()} className="fixed right-0 top-16 z-30 max-h-[calc(100vh-4rem)] w-80 overflow-y-auto border-l border-zinc-800 bg-zinc-950 p-4">{sorted.map(x=><Link key={x.id} to={`/Reader/${m.id}/${x.id}`} className={`block rounded-lg px-3 py-2 ${x.id===c.id?'bg-violet-600':'hover:bg-zinc-800'}`}>Capítulo {x.number} · {x.title}</Link>)}</div>}
  <button onClick={e=>{e.stopPropagation();scrollTo({top:0,behavior:'smooth'})}} className="fixed bottom-5 left-5 rounded-full bg-zinc-900 p-3"><ArrowUp/></button>
 </div>;
}
