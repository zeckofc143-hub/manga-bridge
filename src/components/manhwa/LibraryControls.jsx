import React from 'react';
import { Heart,X } from 'lucide-react';
import { useMutation,useQuery,useQueryClient } from '@tanstack/react-query';
import { backend } from '@/api/localBackend';
import { useAuth } from '@/lib/AuthContext';
export default function LibraryControls({manhwaId}){
  const {user}=useAuth(); const qc=useQueryClient();
  const {data:rows=[]}=useQuery({queryKey:['library',user?.email,manhwaId],queryFn:()=>backend.entities.UserLibrary.filter({user_email:user.email,manhwa_id:manhwaId}),enabled:!!user});
  const row=rows[0];
  const up=useMutation({mutationFn:async data=>row?backend.entities.UserLibrary.update(row.id,data):backend.entities.UserLibrary.create({user_email:user.email,manhwa_id:manhwaId,status:'reading',is_favorite:false,...data}),onSuccess:()=>qc.invalidateQueries({queryKey:['library']})});
  const del=useMutation({mutationFn:()=>backend.entities.UserLibrary.delete(row.id),onSuccess:()=>qc.invalidateQueries({queryKey:['library']})});
  return <div className="flex flex-wrap gap-2">
    <select value={row?.status||''} onChange={e=>up.mutate({status:e.target.value})} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"><option value="">Adicionar à biblioteca</option><option value="reading">Lendo</option><option value="completed">Completo</option><option value="plan_to_read">Quero ler</option><option value="on_hold">Pausado</option><option value="dropped">Dropado</option></select>
    <button onClick={()=>up.mutate({is_favorite:!row?.is_favorite})} className={`rounded-xl border px-3 py-2 ${row?.is_favorite?'border-fuchsia-500 bg-fuchsia-500/15 text-fuchsia-300':'border-zinc-700 bg-zinc-900'}`}><Heart size={18} fill={row?.is_favorite?'currentColor':'none'}/></button>
    {row&&<button onClick={()=>del.mutate()} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-400"><X size={18}/></button>}
  </div>;
}
