import React from 'react';
export default function Pagination({page=1,pages=1,onChange}){if(pages<=1)return null;return <div className="mt-8 flex justify-center gap-2">{Array.from({length:pages},(_,i)=>i+1).map(p=><button key={p} onClick={()=>onChange(p)} className={`h-9 min-w-9 rounded-lg px-3 ${p===page?'bg-violet-600':'bg-zinc-800 hover:bg-zinc-700'}`}>{p}</button>)}</div>}
