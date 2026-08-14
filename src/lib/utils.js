export const cn=(...x)=>x.filter(Boolean).join(' ');
export const formatNumber=n=>Intl.NumberFormat('pt-BR',{notation:n>999?'compact':'standard',maximumFractionDigits:1}).format(n||0);
export const formatDate=d=>d?new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(d)):'—';
export const statusLabel={ongoing:'Em andamento',completed:'Completo',hiatus:'Hiato',cancelled:'Cancelado'};
export const typeLabel={manhwa:'Manhwa',manga:'Manga',manhua:'Manhua',webtoon:'Webtoon',novel:'Novel'};
