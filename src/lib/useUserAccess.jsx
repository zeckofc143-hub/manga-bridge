import { useQuery } from '@tanstack/react-query';
import { backend } from '@/api/localBackend';
import { useAuth } from './AuthContext';

export default function useUserAccess(){
  const {user}=useAuth();
  const {data:badges=[]}=useQuery({queryKey:['badges',user?.email],queryFn:()=>backend.entities.UserBadge.filter({user_email:user?.email}),enabled:!!user?.email});
  const types=new Set(badges.map(b=>b.badge_type));
  const isFounder=types.has('founder');
  const isAdmin=isFounder||user?.role==='admin'||types.has('admin');
  const isSupport=isAdmin||types.has('support');
  const isTranslator=isAdmin||types.has('translator');
  return {isFounder,isAdmin,isSupport,isTranslator,badges};
}
