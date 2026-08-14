import React,{useEffect,useState} from 'react';
import { AnimatePresence,motion } from 'framer-motion';
import { ChevronLeft,ChevronRight,Play } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function FeaturedSlider({items=[]}){
  const [i,setI]=useState(0);
  useEffect(()=>{if(items.length<2)return;const t=setInterval(()=>setI(x=>(x+1)%items.length),7000);return()=>clearInterval(t)},[items.length]);
  if(!items.length)return null; const m=items[i%items.length];
  return <section className="relative h-[66vh] min-h-[500px] overflow-hidden rounded-b-[2rem]">
    <AnimatePresence mode="wait"><motion.div key={m.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0">
      <img src={m.banner_image||m.cover_image} className="h-full w-full object-cover opacity-45"/>
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-zinc-950/20"/>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"/>
      <div className="absolute inset-x-0 bottom-12 mx-auto max-w-7xl px-5">
        <div className="max-w-2xl"><div className="mb-3 flex gap-2"><span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-bold text-violet-200">{m.type?.toUpperCase()}</span><span className="rounded-full bg-zinc-900/60 px-3 py-1 text-xs">★ {m.rating}</span></div>
        <h1 className="font-display text-4xl font-extrabold sm:text-6xl">{m.title}</h1><p className="mt-4 line-clamp-3 text-zinc-300 sm:text-lg">{m.synopsis}</p>
        <Link to={`/ManhwaDetail/${m.id}`} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 font-bold"><Play size={18} fill="currentColor"/> Ler Agora</Link></div>
      </div>
    </motion.div></AnimatePresence>
    {items.length>1&&<><button onClick={()=>setI((i-1+items.length)%items.length)} className="absolute left-4 top-1/2 rounded-full bg-black/40 p-3"><ChevronLeft/></button><button onClick={()=>setI((i+1)%items.length)} className="absolute right-4 top-1/2 rounded-full bg-black/40 p-3"><ChevronRight/></button><div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">{items.map((_,x)=><button key={x} onClick={()=>setI(x)} className={`h-2 rounded-full transition-all ${x===i?'w-8 bg-violet-400':'w-2 bg-zinc-500'}`}/>)}</div></>}
  </section>;
}
