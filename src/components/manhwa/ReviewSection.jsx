import React,{useState} from 'react';
import { useMutation,useQuery,useQueryClient } from '@tanstack/react-query';
import { backend } from '@/api/localBackend';
import { useAuth } from '@/lib/AuthContext';
export default function ReviewSection({manhwaId}){
 const {user}=useAuth(),qc=useQueryClient();const [rating,setRating]=useState(8),[content,setContent]=useState('');
 const {data:reviews=[]}=useQuery({queryKey:['reviews',manhwaId],queryFn:()=>backend.entities.Review.filter({manhwa_id:manhwaId})});
 const mut=useMutation({mutationFn:()=>backend.entities.Review.create({manhwa_id:manhwaId,user_email:user.email,rating,title:'Minha avaliação',content,story_rating:rating,art_rating:rating,characters_rating:rating,has_spoilers:false,helpful_count:0}),onSuccess:()=>{setContent('');qc.invalidateQueries({queryKey:['reviews']})}});
 return <section className="mt-10"><h2 className="font-display text-2xl font-bold">Avaliações</h2><div className="mt-4 soft-card p-4"><div className="flex items-center gap-4"><span className="text-sm">Nota: <b>{rating}</b></span><input type="range" min="1" max="10" value={rating} onChange={e=>setRating(+e.target.value)} className="flex-1"/></div><textarea value={content} onChange={e=>setContent(e.target.value)} rows="3" placeholder="Sua resenha..." className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3"/><button onClick={()=>mut.mutate()} disabled={!content} className="mt-3 rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold disabled:opacity-40">Avaliar</button></div><div className="mt-4 space-y-3">{reviews.map(r=><div key={r.id} className="soft-card p-4"><b>{r.rating}/10</b><p className="mt-2 text-sm text-zinc-400">{r.content}</p></div>)}</div></section>;
}
