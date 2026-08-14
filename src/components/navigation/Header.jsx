import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Menu,Search,Bell,User,BookOpen,Settings,LogOut } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { backend } from '@/api/localBackend';
import { useAuth } from '@/lib/AuthContext';

export default function Header({onMenuClick,transparent=false}){
  const nav=useNavigate(); const {user,logout}=useAuth();
  const {data:s=[]}=useQuery({queryKey:['siteSettings'],queryFn:()=>backend.entities.SiteSettings.list()});
  const name=s[0]?.site_name||'Reak toons';
  return <header className={`fixed inset-x-0 top-0 z-40 h-16 border-b border-zinc-800/60 ${transparent?'bg-zinc-950/35':'bg-zinc-950/88'} backdrop-blur-xl`}>
    <div className="mx-auto flex h-full max-w-7xl items-center gap-3 px-4">
      <button onClick={onMenuClick} className="rounded-xl p-2 hover:bg-zinc-800"><Menu/></button>
      <Link to="/" className="font-display text-lg font-extrabold"><span className="gradient-text">{name}</span></Link>
      <div className="ml-auto flex items-center gap-1">
        <button onClick={()=>nav('/Search')} className="rounded-xl p-2 hover:bg-zinc-800"><Search/></button>
        <button className="rounded-xl p-2 hover:bg-zinc-800"><Bell/></button>
        <div className="group relative">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 font-bold">{user?.name?.[0]||'U'}</button>
          <div className="invisible absolute right-0 top-11 w-52 rounded-xl border border-zinc-700 bg-zinc-900 p-2 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
            <Link className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-zinc-800" to="/Profile"><User size={16}/> Perfil</Link>
            <Link className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-zinc-800" to="/Library"><BookOpen size={16}/> Biblioteca</Link>
            <Link className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-zinc-800" to="/Settings"><Settings size={16}/> Configurações</Link>
            <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-zinc-800"><LogOut size={16}/> Sair</button>
          </div>
        </div>
      </div>
    </div>
  </header>;
}
