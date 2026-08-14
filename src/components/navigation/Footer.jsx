import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer(){
  return <footer className="relative mt-16 border-t border-zinc-800 bg-zinc-950/70">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div><div className="font-display text-2xl font-extrabold gradient-text">Reak toons</div><p className="mt-3 text-sm text-zinc-400">Sua biblioteca dark para manhwa, manga, manhua e novels.</p></div>
      <div><h3 className="font-bold">Explorar</h3><div className="mt-3 space-y-2 text-sm text-zinc-400"><Link className="block hover:text-white" to="/Recent">Recentes</Link><Link className="block hover:text-white" to="/Popular">Populares</Link><Link className="block hover:text-white" to="/Search">Buscar</Link></div></div>
      <div><h3 className="font-bold">Conta</h3><div className="mt-3 space-y-2 text-sm text-zinc-400"><Link className="block hover:text-white" to="/Profile">Perfil</Link><Link className="block hover:text-white" to="/Library">Biblioteca</Link><Link className="block hover:text-white" to="/Settings">Configurações</Link></div></div>
      <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5"><h3 className="font-bold">Comunidade</h3><p className="mt-2 text-sm text-zinc-400">Converse sobre suas obras favoritas.</p><Link to="/Community" className="mt-4 inline-block rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-bold">Entrar</Link></div>
    </div>
    <div className="border-t border-zinc-800 px-4 py-5 text-center text-xs text-zinc-500">© 2026 Reak toons · Feito com ◆</div>
  </footer>;
}
