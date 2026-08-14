const KEY = 'reak_toons_db_v1';
const USER_KEY = 'reak_toons_user_v1';

const now = () => new Date().toISOString();
const id = () => crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const svgPage = (title, chapter, page) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1300">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#18181b"/>
        <stop offset=".55" stop-color="#312e81"/>
        <stop offset="1" stop-color="#86198f"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <circle cx="720" cy="210" r="180" fill="#8b5cf6" opacity=".2"/>
    <circle cx="140" cy="1080" r="240" fill="#d946ef" opacity=".12"/>
    <text x="70" y="170" fill="white" font-size="54" font-family="Arial" font-weight="700">${title}</text>
    <text x="70" y="250" fill="#d4d4d8" font-size="34" font-family="Arial">Capítulo ${chapter} · Página ${page}</text>
    <rect x="70" y="360" width="760" height="530" rx="30" fill="#09090b" opacity=".55"/>
    <text x="450" y="610" text-anchor="middle" fill="#c4b5fd" font-size="42" font-family="Arial">Página demonstrativa</text>
    <text x="450" y="670" text-anchor="middle" fill="#a1a1aa" font-size="28" font-family="Arial">Substitua pelas páginas reais da obra</text>
  </svg>`)}`;

const cover = (title, a='#7c3aed', b='#c026d3') =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="800">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
    <rect width="600" height="800" fill="#18181b"/>
    <rect x="24" y="24" width="552" height="752" rx="28" fill="url(#g)" opacity=".9"/>
    <circle cx="470" cy="180" r="145" fill="white" opacity=".1"/>
    <text x="48" y="610" fill="white" font-size="44" font-family="Arial" font-weight="800">${title}</text>
    <text x="48" y="665" fill="#f4f4f5" font-size="24" font-family="Arial">Reak toons</text>
  </svg>`)}`;

const seed = () => {
  const m1 = id(), m2 = id(), m3 = id(), m4 = id();
  const c11 = id(), c12 = id(), c21 = id(), c31 = id(), c41 = id();
  return {
    Manhwa: [
      {id:m1,title:'Lâmina do Eclipse',alternative_titles:'Eclipse Blade',cover_image:cover('Lâmina do Eclipse'),banner_image:cover('Lâmina do Eclipse','#312e81','#7e22ce'),synopsis:'Um espadachim marcado por um eclipse desperta em uma cidade onde memórias são negociadas como moeda.',author:'A. Kuro',artist:'M. Sena',status:'ongoing',type:'manhwa',genres:['Ação','Fantasia','Mistério'],rating:9.1,views:48210,is_featured:true,featured_all:true,release_year:2026,created_date:now()},
      {id:m2,title:'Cidade Sem Sol',alternative_titles:'Sunless City',cover_image:cover('Cidade Sem Sol','#0f172a','#7c3aed'),banner_image:cover('Cidade Sem Sol','#020617','#4c1d95'),synopsis:'Investigadores exploram uma metrópole subterrânea onde nenhuma câmera consegue registrar o céu.',author:'Rin Sato',artist:'K. Mono',status:'ongoing',type:'manga',genres:['Thriller','Mistério','Sobrenatural'],rating:8.7,views:32690,is_featured:true,featured_all:false,release_year:2025,created_date:new Date(Date.now()-86400000).toISOString()},
      {id:m3,title:'Rei das Ruínas',alternative_titles:'King of Ruins',cover_image:cover('Rei das Ruínas','#7f1d1d','#ea580c'),banner_image:cover('Rei das Ruínas','#450a0a','#9a3412'),synopsis:'Depois do colapso dos portais, um antigo carregador retorna como o único capaz de comandar monstros esquecidos.',author:'Lee Han',artist:'Studio Nova',status:'ongoing',type:'manhua',genres:['Ação','Aventura','Pós-apocalíptico'],rating:8.9,views:55380,is_featured:false,featured_all:false,release_year:2026,created_date:new Date(Date.now()-2*86400000).toISOString()},
      {id:m4,title:'Arquivos de Lyra',alternative_titles:'Lyra Files',cover_image:cover('Arquivos de Lyra','#164e63','#6d28d9'),banner_image:cover('Arquivos de Lyra','#083344','#581c87'),synopsis:'Uma novel sobre uma maga de pavio curto presa entre arquivos proibidos e uma guerra que ninguém admite que começou.',author:'N. Vale',artist:'—',status:'ongoing',type:'novel',genres:['Fantasia','Drama','Comédia'],rating:8.5,views:12100,is_featured:false,featured_all:false,release_year:2026,created_date:new Date(Date.now()-3*86400000).toISOString()},
    ],
    Chapter: [
      {id:c11,manhwa_id:m1,number:1,title:'A marca',pages:[1,2,3].map(p=>svgPage('Lâmina do Eclipse',1,p)),release_date:'2026-08-01'},
      {id:c12,manhwa_id:m1,number:2,title:'Mercado de memórias',pages:[1,2,3].map(p=>svgPage('Lâmina do Eclipse',2,p)),release_date:'2026-08-08'},
      {id:c21,manhwa_id:m2,number:1,title:'A câmera apagada',pages:[1,2,3].map(p=>svgPage('Cidade Sem Sol',1,p)),release_date:'2026-08-02'},
      {id:c31,manhwa_id:m3,number:1,title:'O primeiro portal',pages:[1,2,3].map(p=>svgPage('Rei das Ruínas',1,p)),release_date:'2026-08-03'},
      {id:c41,manhwa_id:m4,number:1,title:'Arquivo 001',pages:[],text_content:'Lyra odiava duas coisas: arquivos sem índice e pessoas que diziam “calma”. Naquela manhã, recebeu os dois de uma vez. O documento em suas mãos não deveria existir — e, ainda assim, carregava o selo real.',release_date:'2026-08-04'},
    ],
    Comment: [],
    Review: [],
    CommunityPost: [
      {id:id(),group_id:null,group_name:null,title:'Qual lançamento vocês estão acompanhando?',content:'Tô entre Lâmina do Eclipse e Rei das Ruínas. O que vocês recomendam?',author_name:'Kaito',author_email:'kaito@reak.local',like_count:12,liked_by:[],comment_count:3,created_date:now()},
    ],
    UserLibrary: [],
    ReadingHistory: [],
    UserView: [],
    UserBadge: [{id:id(),user_email:'demo@reaktoons.local',badge_type:'founder',assigned_by:'system'}],
    BannedUser: [],
    SupportTicket: [],
    SiteSettings: [{id:id(),discord_url:'https://discord.gg/',twitter_url:'https://twitter.com/',instagram_url:'https://instagram.com/',facebook_url:'https://facebook.com/',site_name:'Reak toons',footer_message:'Todos os direitos reservados.',theme:'base',genres:['Shonen','Shojo','Seinen','Josei','Isekai','Fantasia','Sci-Fi','Horror','Mistério','Ação','Aventura','Romance','Comédia','Drama','Slice of Life','Esportes','Artes Marciais','Mecha','Psicológico','Sobrenatural','Thriller','Histórico','Militar','Crime','Yaoi','Yuri','Harém','Ecchi','Gore','Cyberpunk','Pós-apocalíptico','Musical','Culinary','Todos'],types:['manhwa','manga','manhua','webtoon','novel'],statuses:['ongoing','completed','hiatus','cancelled']}],
  };
};

function readDB() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    const data = seed();
    localStorage.setItem(KEY, JSON.stringify(data));
    return data;
  }
  try { return JSON.parse(raw); } catch { const data=seed(); localStorage.setItem(KEY,JSON.stringify(data)); return data; }
}
function writeDB(db) { localStorage.setItem(KEY, JSON.stringify(db)); }

function entity(name) {
  return {
    async list(sort) {
      const items = [...(readDB()[name] || [])];
      if (sort) {
        const desc = sort.startsWith('-'); const field = desc ? sort.slice(1) : sort;
        items.sort((a,b)=> String(a[field]??'').localeCompare(String(b[field]??'')) * (desc?-1:1));
      }
      return items;
    },
    async filter(query={}) {
      return (readDB()[name] || []).filter(item =>
        Object.entries(query).every(([k,v]) => Array.isArray(v) ? v.includes(item[k]) : item[k] === v)
      );
    },
    async get(itemId) { return (readDB()[name] || []).find(x=>x.id===itemId) || null; },
    async create(data) {
      const db=readDB(); db[name]=db[name]||[];
      const item={id:id(),created_date:now(),...data}; db[name].push(item); writeDB(db); return item;
    },
    async update(itemId, data) {
      const db=readDB(); const idx=(db[name]||[]).findIndex(x=>x.id===itemId);
      if(idx<0) throw new Error(`${name} não encontrado`);
      db[name][idx]={...db[name][idx],...data,updated_date:now()}; writeDB(db); return db[name][idx];
    },
    async delete(itemId) {
      const db=readDB(); db[name]=(db[name]||[]).filter(x=>x.id!==itemId); writeDB(db); return {success:true};
    },
  };
}

const defaultUser = {
  id:'demo-user',
  email:'demo@reaktoons.local',
  name:'Demo Founder',
  role:'admin',
  avatar_url:'',
  bio:'Leitor, fundador e tester desta versão independente do Reak toons.',
  language:'pt-BR',
  created_date:'2026-08-14',
  preferences:{reader_mode:'scroll',reader_quality:'high',font_size:16,notifications:true,spoilers:false,performance:'balanced'}
};

function readUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)) || defaultUser; } catch { return defaultUser; }
}

export const backend = {
  entities: new Proxy({}, { get:(_,name)=>entity(name) }),
  auth: {
    async me(){ return readUser(); },
    async updateMe(data){ const u={...readUser(),...data}; localStorage.setItem(USER_KEY,JSON.stringify(u)); return u; },
    async logout(){ localStorage.removeItem(USER_KEY); return true; },
  },
  integrations: {
    Core: {
      async UploadFile({file}) {
        return new Promise((resolve,reject)=>{
          const reader=new FileReader();
          reader.onload=()=>resolve({file_url:reader.result});
          reader.onerror=reject;
          reader.readAsDataURL(file);
        });
      }
    }
  },
  resetDemo() {
    localStorage.removeItem(KEY);
    localStorage.removeItem(USER_KEY);
    return readDB();
  }
};

export { readDB };
