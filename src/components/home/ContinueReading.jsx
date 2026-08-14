import React from 'react';
import { Link } from 'react-router-dom';
export default function ContinueReading({history=[],manhwas=[],chapters=[]}){
  const rows=history.slice(-4).reverse().map(h=>({h,m:manhwas.find(x=>x.id===h.manhwa_id),c:chapters.find(x=>x.id===h.chapter_id)})).filter(x=>x.m&&x.c);
  if(!rows.length)return null;
  return <section className="mx-auto max-w-7xl px-4 py-8"><h2 className="font-display text-2xl font-bold">Continuar lendo</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{rows.map(({h,m,c})=><Link key={h.id} to={`/Reader/${m.id}/${c.id}`} className="soft-card flex gap-3 p-3 hover:border-violet-500/40"><img src={m.cover_image} className="h-24 w-16 rounded-lg object-cover"/><div className="min-w-0"><b className="line-clamp-2">{m.title}</b><p className="mt-1 text-xs text-zinc-500">Cap. {c.number}</p><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-800"><div className="h-full w-2/3 bg-gradient-to-r from-violet-600 to-fuchsia-600"/></div></div></Link>)}</div></section>;
}
