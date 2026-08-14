import React, { createContext, useContext, useEffect, useState } from 'react';
import { backend } from '@/api/localBackend';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,setUser] = useState(null);
  const [isLoadingAuth,setLoading] = useState(true);
  const [authError,setAuthError] = useState(null);

  const checkAppState = async () => {
    try {
      setLoading(true);
      setUser(await backend.auth.me());
      setAuthError(null);
    } catch (e) {
      setAuthError({type:'unknown',message:e.message});
    } finally { setLoading(false); }
  };

  useEffect(()=>{ checkAppState(); },[]);

  const updateUser = async data => {
    const next=await backend.auth.updateMe(data); setUser(next); return next;
  };
  const logout = async () => { await backend.auth.logout(); await checkAppState(); };
  const navigateToLogin = () => location.assign('/Profile');

  return <AuthContext.Provider value={{user,isLoadingAuth,isLoadingPublicSettings:false,authError,navigateToLogin,logout,checkAppState,updateUser}}>
    {children}
  </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
