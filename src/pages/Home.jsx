import React,{useMemo,useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import { backend } from '@/api/localBackend';
import FeaturedSlider from '@/components/home/FeaturedSlider';
import ContinueReading from '@/components/home/ContinueReading';
import SectionHeader from '@/components/home/SectionHeader';
import Pagination from '@/components/home/Pagination';
import ManhwaCard from '@/components/manhwa/ManhwaCard';

export default function Home(){
 const [type,setType]=useState('all'),[page,setPage]=useState(1);
 const {data:manhwas=[]}=useQuery({queryKey:['manhwas'],queryFn:()=>backend.entities.Manhwa.list('-created_date')});
 const {data:chapters=[]}=useQuery({queryKey:['chapters'],queryFn:()=>backend.entities.Chapter.list()});
 const {data:history=[]}=useQuery({queryKey:['readingHistory'],queryFn:()=>backend.entities.ReadingHistory.list()});
 const featured=manhwas.filter(m=>m.featured_all||(m.is_featured&&(type==='all'||m.type===type)));
 const filtered=useMemo(()=>manhwas.filter(m=>type==='all'||m.type===type),[manhwas,type]);
 const per=30,pages=Math.max(1,Math.ceil(filtered.length/per)),show=filtered.slice((page-1)*per,page*per);
 return <><FeaturedSlider items={featured.length?featured:manhwas.slice(0,3)}/><ContinueReading history={history} manhwas={manhwas} chapters={chapters}/>
 <section className="mx-auto max-w-7xl px-4 py-8"><SectionHeader eyebrow="Lançamentos" title="Descubra sua próxima leitura" href="/Recent"/>
 <div className="mt-5 flex flex-wrap gap-2">{[['all','Todos'],['manhwa','Manhwa'],['manga','Manga'],['manhua','Manhua'],['novel','Novel']].map(([k,l])=><button key={k} onClick={()=>{setType(k);setPage(1)}} className={`rounded-full px-4 py-2 text-sm ${type===k?'bg-violet-600':'bg-zinc-800 text-zinc-400'}`}>{l}</button>)}</div>
 <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">{show.map(m=><ManhwaCard key={m.id} m={m}/>)}</div>
 <Pagination page={page} pages={pages} onChange={setPage}/></section></>;
}
