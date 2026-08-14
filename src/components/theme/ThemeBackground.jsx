import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { backend } from '@/api/localBackend';

const tones={
  inverno:'from-blue-950/40 via-transparent to-transparent',
  verao:'from-amber-950/40 via-transparent to-transparent',
  primavera:'from-pink-950/40 via-transparent to-transparent',
  outono:'from-orange-950/40 via-transparent to-transparent',
  natal:'from-red-950/40 via-transparent to-transparent',
  ano_novo:'from-purple-950/50 via-transparent to-transparent',
};
export default function ThemeBackground(){
  const {data:s=[]}=useQuery({queryKey:['siteSettings'],queryFn:()=>backend.entities.SiteSettings.list()});
  const theme=s[0]?.theme||'base';
  return <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
    {theme!=='base'&&<div className={`absolute inset-0 bg-gradient-to-b ${tones[theme]||''}`}/>}
    <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl"/>
    <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-3xl"/>
  </div>;
}
