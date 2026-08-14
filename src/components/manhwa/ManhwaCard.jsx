import React from 'react';
import { Link } from 'react-router-dom';
import { Eye,Star } from 'lucide-react';
import { formatNumber,statusLabel,typeLabel } from '@/lib/utils';
export default function ManhwaCard({m}){
  return <Link to={`/ManhwaDetail/${m.id}`} className="group block">
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition group-hover:-translate-y-1 group-hover:border-violet-500/60 group-hover:shadow-xl group-hover:shadow-violet-950/30">
      <img src={m.cover_image} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/25"/>
      <span className="absolute left-2 top-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold">{typeLabel[m.type]||m.type}</span>
      <span className="absolute right-2 top-2 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-[10px]"><Star size={11} fill="#facc15" className="text-yellow-400"/>{m.rating}</span>
      <div className="absolute inset-x-0 bottom-0 p-3"><h3 className="line-clamp-2 font-display font-bold">{m.title}</h3><div className="mt-2 flex items-center text-[11px] text-zinc-400"><span>{statusLabel[m.status]}</span><span className="ml-auto flex items-center gap-1"><Eye size={12}/>{formatNumber(m.views)}</span></div></div>
    </div>
  </Link>;
}
