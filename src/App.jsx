import React,{useEffect} from 'react';
import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {Toaster} from 'sonner';
import {AuthProvider} from '@/lib/AuthContext';
import {I18nProvider} from '@/lib/i18n';
import Layout from '@/Layout';

import Home from '@/pages/Home';import Search from '@/pages/Search';import ManhwaDetail from '@/pages/ManhwaDetail';import Reader from '@/pages/Reader';import Popular from '@/pages/Popular';import Recent from '@/pages/Recent';import Library from '@/pages/Library';import Favorites from '@/pages/Favorites';import Settings from '@/pages/Settings';import Profile from '@/pages/Profile';import UserProfile from '@/pages/UserProfile';import Community from '@/pages/Community';
import PanelAdmin from '@/pages/PanelAdmin';import PanelSupport from '@/pages/PanelSupport';import PanelTranslator from '@/pages/PanelTranslator';import PanelFounder from '@/pages/PanelFounder';
import AdminFeatured from '@/pages/AdminFeatured';import AdminUploadEdit from '@/pages/AdminUploadEdit';import AdminUpload from '@/pages/AdminUpload';import AdminManage from '@/pages/AdminManage';import AdminSiteSettings from '@/pages/AdminSiteSettings';import AdminStats from '@/pages/AdminStats';import AdminBans from '@/pages/AdminBans';import AdminBadges from '@/pages/AdminBadges';

const qc=new QueryClient({defaultOptions:{queries:{staleTime:1500,retry:false}}});
const routeName=p=>p.startsWith('/Reader/')?'Reader':p.startsWith('/ManhwaDetail/')?'ManhwaDetail':(p.split('/')[1]||'Home');

function NavigationTracker(){const l=useLocation();useEffect(()=>{sessionStorage.setItem('reak_last_route',l.pathname)},[l.pathname]);return null}
function LayoutWrapper({children}){const l=useLocation();return <Layout currentPageName={routeName(l.pathname)}>{children}</Layout>}
const Wrap=({children})=><LayoutWrapper>{children}</LayoutWrapper>;

function RouterTree(){return <><NavigationTracker/><Routes>
  <Route path="/" element={<Wrap><Home/></Wrap>}/>
  <Route path="/Home" element={<Wrap><Home/></Wrap>}/>
  <Route path="/Search" element={<Wrap><Search/></Wrap>}/>
  <Route path="/ManhwaDetail/:id" element={<Wrap><ManhwaDetail/></Wrap>}/>
  <Route path="/Reader/:manhwaId/:chapterId" element={<Wrap><Reader/></Wrap>}/>
  <Route path="/Popular" element={<Wrap><Popular/></Wrap>}/>
  <Route path="/Recent" element={<Wrap><Recent/></Wrap>}/>
  <Route path="/Library" element={<Wrap><Library/></Wrap>}/>
  <Route path="/Favorites" element={<Wrap><Favorites/></Wrap>}/>
  <Route path="/Settings" element={<Wrap><Settings/></Wrap>}/>
  <Route path="/Profile" element={<Wrap><Profile/></Wrap>}/>
  <Route path="/UserProfile/:email" element={<Wrap><UserProfile/></Wrap>}/>
  <Route path="/Community" element={<Wrap><Community/></Wrap>}/>
  <Route path="/PanelAdmin" element={<Wrap><PanelAdmin/></Wrap>}/>
  <Route path="/PanelSupport" element={<Wrap><PanelSupport/></Wrap>}/>
  <Route path="/PanelTranslator" element={<Wrap><PanelTranslator/></Wrap>}/>
  <Route path="/PanelFounder" element={<Wrap><PanelFounder/></Wrap>}/>
  <Route path="/AdminFeatured" element={<Wrap><AdminFeatured/></Wrap>}/>
  <Route path="/AdminUploadEdit" element={<Wrap><AdminUploadEdit/></Wrap>}/>
  <Route path="/AdminUpload" element={<Wrap><AdminUpload/></Wrap>}/>
  <Route path="/AdminManage" element={<Wrap><AdminManage/></Wrap>}/>
  <Route path="/AdminSiteSettings" element={<Wrap><AdminSiteSettings/></Wrap>}/>
  <Route path="/AdminStats" element={<Wrap><AdminStats/></Wrap>}/>
  <Route path="/AdminBans" element={<Wrap><AdminBans/></Wrap>}/>
  <Route path="/AdminBadges" element={<Wrap><AdminBadges/></Wrap>}/>
  <Route path="*" element={<Wrap><div className="mx-auto max-w-7xl px-4 py-24 text-center"><div className="text-7xl font-black gradient-text">404</div><h1 className="mt-4 font-display text-2xl font-bold">Página não encontrada</h1></div></Wrap>}/>
</Routes></>}

export default function App(){return <AuthProvider><QueryClientProvider client={qc}><I18nProvider><BrowserRouter><RouterTree/><Toaster richColors theme="dark"/></BrowserRouter></I18nProvider></QueryClientProvider></AuthProvider>}
