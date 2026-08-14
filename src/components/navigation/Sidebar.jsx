import React from 'react';
import { AnimatePresence,motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X,Home,Search,BookOpen,Heart,Users,User,Settings,Shield,Headphones,Languages,Crown,Star } from 'lucide-react';
import useUserAccess from '@/lib/useUserAccess';

const Item=({to,icon:Icon,children,onClick})=><Link to={to} onClick={onClick} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-zinc-300 hover:bg-zinc-800 hover:text-white"><Icon size={19}/>{children}</Link>;
export default function Sidebar({isOpen,onClose}){
  const a=useUserAccess();
  return <AnimatePresence>{isOpen&&<>
    <motion.div className="fixed inset-0 z-50 bg-black/60" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}/>
    <motion.aside initial={{x:-330}} animate={{x:0}} exit={{x:-330}} transition={{type:'spring',damping:28}} className="fixed inset-y-0 left-0 z-[60] w-[310px] overflow-y-auto border-r border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-5 flex items-center justify-between"><div className="font-display text-xl font-extrabold gradient-text">Reak toons</div><button onClick={onClose} className="rounded-lg p-2 hover:bg-zinc-800"><X/></button></div>
      <div className="space-y-1">
        <Item to="/" icon={Home} onClick={onClose}>Início</Item><Item to="/Search" icon={Search} onClick={onClose}>Pesquisar</Item><Item to="/Library" icon={BookOpen} onClick={onClose}>Biblioteca</Item><Item to="/Favorites" icon={Heart} onClick={onClose}>Favoritos</Item><Item to="/Community" icon={Users} onClick={onClose}>Comunidade</Item>
      </div>
      <div className="my-4 border-t border-zinc-800"/>
      <p className="mb-2 px-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Conta</p>
      <Item to="/Profile" icon={User} onClick={onClose}>Perfil</Item><Item to="/Settings" icon={Settings} onClick={onClose}>Configurações</Item>
      {(a.isAdmin||a.isSupport||a.isTranslator||a.isFounder)&&<><div className="my-4 border-t border-zinc-800"/><p className="mb-2 px-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Painéis</p></>}
      {a.isAdmin&&<Item to="/PanelAdmin" icon={Shield} onClick={onClose}>Admin</Item>}
      {a.isSupport&&<Item to="/PanelSupport" icon={Headphones} onClick={onClose}>Suporte</Item>}
      {a.isTranslator&&<Item to="/PanelTranslator" icon={Languages} onClick={onClose}>Tradutor</Item>}
      {a.isFounder&&<><Item to="/PanelFounder" icon={Crown} onClick={onClose}>Fundador</Item><Item to="/AdminFeatured" icon={Star} onClick={onClose}>Destaques</Item></>}
    </motion.aside>
  </>}</AnimatePresence>;
}
