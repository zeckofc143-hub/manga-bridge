import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { backend } from '@/api/localBackend';
import Header from '@/components/navigation/Header';
import Sidebar from '@/components/navigation/Sidebar';
import Footer from '@/components/navigation/Footer';
import NotificationPrompt from '@/components/notifications/NotificationPrompt';
import ThemeBackground from '@/components/theme/ThemeBackground';
import ProfessionalSupportChat from '@/components/support/ProfessionalSupportChat';

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: settings = [] } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => backend.entities.SiteSettings.list(),
  });

  const theme = settings[0]?.theme || 'base';
  const transparentHeaderPages = ['Home', 'ManhwaDetail'];
  const isTransparent = transparentHeaderPages.includes(currentPageName);
  const hideHeader = currentPageName === 'Reader';

  const themeBackgrounds = {
    inverno: 'from-blue-950 via-zinc-900 to-zinc-900',
    verao: 'from-amber-900 via-zinc-900 to-zinc-900',
    primavera: 'from-pink-950 via-zinc-900 to-zinc-900',
    outono: 'from-orange-950 via-zinc-900 to-zinc-900',
    natal: 'from-red-950 via-zinc-900 to-zinc-900',
    ano_novo: 'from-purple-950 via-zinc-900 to-zinc-900'
  };

  const bgClass = themeBackgrounds[theme]
    ? `min-h-screen bg-gradient-to-b ${themeBackgrounds[theme]}`
    : 'min-h-screen bg-zinc-900';

  return (
    <div className={bgClass}>
      <ThemeBackground />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {!hideHeader && <Header onMenuClick={() => setSidebarOpen(true)} transparent={isTransparent} />}
      <main className={`relative z-10 ${!hideHeader ? 'pt-16' : ''}`}>{children}</main>
      {!hideHeader && <Footer />}
      <NotificationPrompt />
      <ProfessionalSupportChat />
    </div>
  );
}
