import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';
import { useAuth } from './AuthContext';

const dict = {
  'pt-BR': {home:'Início',search:'Pesquisar',library:'Biblioteca',favorites:'Favoritos',community:'Comunidade',profile:'Perfil',settings:'Configurações',popular:'Populares',recent:'Recentes',readNow:'Ler agora',continueReading:'Continuar lendo',all:'Todos',save:'Salvar',support:'Suporte'},
  en: {home:'Home',search:'Search',library:'Library',favorites:'Favorites',community:'Community',profile:'Profile',settings:'Settings',popular:'Popular',recent:'Recent',readNow:'Read now',continueReading:'Continue reading',all:'All',save:'Save',support:'Support'},
  es: {home:'Inicio',search:'Buscar',library:'Biblioteca',favorites:'Favoritos',community:'Comunidad',profile:'Perfil',settings:'Configuración',popular:'Populares',recent:'Recientes',readNow:'Leer ahora',continueReading:'Continuar leyendo',all:'Todos',save:'Guardar',support:'Soporte'}
};
const C=createContext(null);
export function I18nProvider({children}){
  const {user,updateUser}=useAuth();
  const [lang,setLang]=useState(()=>localStorage.getItem('reak_lang')||user?.language||'pt-BR');
  useEffect(()=>{ if(user?.language && !localStorage.getItem('reak_lang')) setLang(user.language); },[user]);
  const changeLang=async l=>{ setLang(l);localStorage.setItem('reak_lang',l); if(user) await updateUser({language:l}); };
  const value=useMemo(()=>({lang,changeLang,t:k=>dict[lang]?.[k]??dict['pt-BR'][k]??k}),[lang]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useI18n=()=>useContext(C);
