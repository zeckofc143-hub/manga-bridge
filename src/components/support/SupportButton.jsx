import React,{useState} from 'react';
import { Headphones,Plus,ArrowLeft,X } from 'lucide-react';
import { useMutation,useQuery,useQueryClient } from '@tanstack/react-query';
import { backend } from '@/api/localBackend';
import { useAuth } from '@/lib/AuthContext';
import { formatDate } from '@/lib/utils';

const P={low:['Baixa','text-emerald-300'],normal:['Normal','text-sky-300'],high:['Alta','text-rose-300']};
const S={open:'Aberto',in_progress:'Em atendimento',resolved:'Resolvido',closed:'Fechado'};
export default function SupportButton(){
  const [open,setOpen]=useState(false),[form,setForm]=useState(false),[subject,setSubject]=useState(''),[priority,setPriority]=useState('normal'),[message,setMessage]=useState('');
  const {user}=useAuth(); const qc=useQueryClient();
  const {data:tickets=[]}=useQuery({queryKey:['tickets',user?.email],queryFn:()=>backend.entities.SupportTicket.filter({user_email:user.email}),enabled:!!user});
  const mut=useMutation({mutationFn:()=>backend.entities.SupportTicket.create({user_email:user.email,user_name:user.name,subject,message,status:'open',priority,deleted:false,responses:[]}),onSuccess:()=>{qc.invalidateQueries({queryKey:['tickets']});setSubject('');setMessage('');setForm(false)}});
  return <>
    <button onClick={()=>setOpen(true)} className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-xl shadow-violet-950/50"><Headphones/></button>
    {open&&<div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/65 p-3 sm:items-center">
      <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-950 p-5 shadow-2xl">
        <div className="flex items-center gap-2">{form&&<button onClick={()=>setForm(false)}><ArrowLeft/></button>}<h2 className="font-display text-xl font-bold">Central de Suporte</h2><button className="ml-auto" onClick={()=>setOpen(false)}><X/></button></div>
        {!form?<><button onClick={()=>setForm(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-bold"><Plus size={18}/>Abrir Novo Ticket</button>
          <div className="mt-5 space-y-3">{tickets.length===0&&<p className="text-sm text-zinc-500">Nenhum ticket ainda.</p>}{tickets.filter(t=>!t.deleted).map(t=><div key={t.id} className="soft-card p-4"><div className="flex gap-2"><b className="truncate">{t.subject}</b><span className="ml-auto text-xs text-zinc-400">{S[t.status]}</span></div><p className="mt-2 line-clamp-2 text-sm text-zinc-400">{t.message}</p><div className="mt-3 flex text-xs"><span className={P[t.priority]?.[1]}>{P[t.priority]?.[0]}</span><span className="ml-auto text-zinc-600">{formatDate(t.created_date)}</span></div>{t.responses?.length>0&&<p className="mt-3 rounded-lg bg-zinc-900 p-2 text-xs text-zinc-300">Última resposta: {t.responses.at(-1).message}</p>}</div>)}</div>
        </>:<div className="mt-5 space-y-3">
          <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Assunto" className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-violet-500"/>
          <select value={priority} onChange={e=>setPriority(e.target.value)} className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3"><option value="low">Baixa</option><option value="normal">Normal</option><option value="high">Alta</option></select>
          <textarea value={message} onChange={e=>setMessage(e.target.value)} rows="5" placeholder="Mensagem" className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-violet-500"/>
          <button disabled={!subject||!message||mut.isPending} onClick={()=>mut.mutate()} className="w-full rounded-xl bg-violet-600 py-3 font-bold disabled:opacity-40">Enviar ticket</button>
        </div>}
      </div>
    </div>}
  </>;
}
