import React,{useMemo,useState} from 'react';
import {
  AlertTriangle,ArrowRight,BookOpen,CalendarDays,Calculator,Check,ChevronRight,
  ClipboardCheck,Database,ExternalLink,Info,Search,ShieldCheck,SlidersHorizontal,
  Sparkles,Swords,Target,TimerReset,Waypoints,WifiOff
} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import MechanicDatabasePageV2 from './MechanicDatabasePageV2';
import {MECHANIC_RECORDS as BASE_RECORDS,mechanicSourceUrl as baseSourceUrl} from './mechanicResearchData';
import {
  MECHANIC_EXPANSION_META,MECHANIC_EXTRA_RECORDS,MECHANIC_OVERRIDES,LEAGUE_TABLE,
  OFFLINE_MATRIX,MECHANIC_SOURCE_URLS
} from './mechanicExpansionData';
import './resourceDatabasePage.css';
import './resourceResearchExpansion.css';
import './mechanicDatabasePage.css';
import './mechanicDatabaseV2.css';
import './mechanicFinal.css';

const OFFICIAL_URL='https://apps.apple.com/us/app/pocket-ants-colony-simulator/id1532712160';
const tr=(v,l)=>v&&typeof v==='object'&&('pt' in v||'en' in v)?(l==='en'?v.en:v.pt):v;
const norm=(v='')=>String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const L=(pt,en)=>({pt,en});

function mergeRecords(){
  const map=new Map(BASE_RECORDS.map(r=>[r.id,{...r}]));
  for(const patch of MECHANIC_OVERRIDES){const old=map.get(patch.id)||{};map.set(patch.id,{...old,...patch,related:patch.related||old.related||{resources:[],chambers:[],creatures:[]}});}
  for(const extra of MECHANIC_EXTRA_RECORDS){const old=map.get(extra.id)||{};map.set(extra.id,{...old,...extra,related:extra.related||old.related||{resources:[],chambers:[],creatures:[]}});}
  return [...map.values()];
}
const RECORDS=mergeRecords();

const PLAN_BASE={
  early:[['daily-quests','📋'],['acorns','🌰'],['red-ants','🐜'],['offline-gathering','🌙']],
  mid:[['daily-quests','📋'],['battle-tokens','🎟️'],['coop-mode','🤝'],['aphid-farm','🍯']],
  late:[['daily-quests','📋'],['coop-mode','🤝'],['pvp','⚔️'],['clan-wars','🏕️']]
};
const FOCUS_STEP={
  resin:['termite-coop','🟠',L('Priorize Termite Nest público/clã e Daily Quests.','Prioritize public/clan Termite Nest and Daily Quests.')],
  honeydew:['frog-pond','🍯',L('Aphid Farm + Frog Pond + Daily Quests formam o núcleo fixo.','Aphid Farm + Frog Pond + Daily Quests form the fixed core.')],
  parts:['crab-beach','🧩',L('Crab Beach é a conversão direta de co-op para Body Parts.','Crab Beach directly converts co-op into Body Parts.')],
  pheromones:['pvp','🧪',L('Reserve tokens para batalhas que consigam chegar a pelo menos 50%.','Reserve tokens for battles you can push to at least 50%.')],
  silk:['clan-wars','🧵',L('Silk vem do ciclo de Clan Wars; organize a semana ao redor dele.','Silk comes from the Clan Wars cycle; organize the week around it.')]
};

const COOP_BOOSTERS={
  termite:[
    {id:'soldiers',label:L('+3 soldados','+3 soldiers'),cost:75,detail:L('Leva três soldados extras.','Bring three extra soldiers.')},
    {id:'speed',label:L('+25% velocidade','+25% speed'),cost:50,detail:L('Player ant e soldados ganham velocidade.','Player ant and soldiers gain speed.')},
    {id:'spit',label:L('Spit skill','Spit skill'),cost:50,detail:L('Permite usar o líquido amarelo com soldados vivos.','Allows yellow-liquid spit while soldiers are alive.')}
  ],
  crab:null,
  frog:[
    {id:'speed',label:L('+25% velocidade','+25% speed'),cost:75,detail:L('Aumenta a velocidade da player ant.','Increases player ant speed.')},
    {id:'charge',label:L('Carga instantânea','Instant charge'),cost:75,detail:L('Canhões de flor carregam instantaneamente.','Small flower cannons charge instantly.')},
    {id:'pet',label:L('Pet Aphid ×2','Pet Aphid ×2'),cost:75,detail:L('Dobra os stats do pet Aphid.','Doubles pet Aphid stats.')}
  ]
};
COOP_BOOSTERS.crab=COOP_BOOSTERS.termite;

const WAR_WEEK=[
  {day:5,icon:'📝',name:L('Sexta','Friday'),title:L('Registro','Registration'),text:L('Registro até 22:00 UTC; matchmaking depois.','Registration until 22:00 UTC; matchmaking follows.')},
  {day:6,icon:'🧱',name:L('Sábado','Saturday'),title:L('Preparação','Preparation'),text:L('Prepare lineup e organização do clã.','Prepare lineup and clan organization.')},
  {day:0,icon:'⚔️',name:L('Domingo','Sunday'),title:L('Guerra','War'),text:L('Cada participante possui 3 ataques.','Each participant has 3 attacks.')},
  {day:1,icon:'🎁',name:L('Segunda','Monday'),title:L('Recompensas','Rewards'),text:L('Resultados e janela para reivindicar recompensas.','Results and reward-claim window.')}
];

function sourceUrl(r){return r.sourceUrl||baseSourceUrl(r);}
function categoryLabel(v,t){return ({all:t('Todas','All'),combat:t('Combate','Combat'),creatures:t('Criaturas','Creatures'),farm:t('Farm / economia','Farm / economy'),coop:'Co-op',garden:t('Jardim','Garden'),clan:t('Clã / late game','Clan / late game')})[v]||v;}
function resourceLabel(id,t){return ({leaves:t('Folhas','Leaves'),seeds:t('Sementes','Seeds'),fungus:t('Fungo','Fungus'),'body-parts':'Body Parts',water:t('Água','Water'),resin:'Resin',honeydew:'Honeydew',gems:'Gems',pheromones:t('Feromônios','Pheromones'),'battle-tokens':'Battle Tokens',silk:t('Seda','Silk')})[id]||id;}

function Trust({record,t}){
  if(record.source==='official')return <span className="mf-trust official"><ShieldCheck size={13}/>{t('Oficial','Official')}</span>;
  if(record.source==='recent')return <span className="mf-trust recent"><Sparkles size={13}/>{t('2026','2026')}</span>;
  if(record.source==='review')return <span className="mf-trust review"><AlertTriangle size={13}/>{t('Em revisão','Under review')}</span>;
  return <span className="mf-trust"><Database size={13}/>{t('Wiki revisada','Reviewed wiki')}</span>;
}

function TodayPlanner({language,t}){
  const [stage,setStage]=useState('mid');
  const [focus,setFocus]=useState('resin');
  const focusStep=FOCUS_STEP[focus];
  return <section id="today" className="mf-panel mf-planner">
    <div className="mf-section-head"><div><span><Target size={17}/>{t('Planejador inteligente','Smart planner')}</span><h2>{t('O que fazer hoje?','What should I do today?')}</h2><p>{t('Escolha sua fase e o recurso que está travando seu progresso.','Choose your stage and the resource bottlenecking your progress.')}</p></div></div>
    <div className="mf-inline-controls"><label><span>{t('Fase','Stage')}</span><select value={stage} onChange={e=>setStage(e.target.value)}><option value="early">{t('Início','Early')}</option><option value="mid">{t('Meio','Mid')}</option><option value="late">{t('Avançado','Late')}</option></select></label><label><span>{t('Foco','Focus')}</span><select value={focus} onChange={e=>setFocus(e.target.value)}><option value="resin">Resin</option><option value="honeydew">Honeydew</option><option value="parts">Body Parts</option><option value="pheromones">{t('Feromônios','Pheromones')}</option><option value="silk">Silk</option></select></label></div>
    <div className="mf-route">{PLAN_BASE[stage].map(([id,icon],i)=><React.Fragment key={id}><a href={`#/mechanics/${id}`}><span>{icon}</span><div><small>{i+1}</small><strong>{tr((RECORDS.find(x=>x.id===id)||{}).name,language)||id}</strong></div></a>{i<PLAN_BASE[stage].length-1&&<ArrowRight size={16}/>}</React.Fragment>)}</div>
    <div className="mf-focus-note"><span>{focusStep[1]}</span><div><strong>{t('Depois, ataque seu gargalo','Then hit your bottleneck')}</strong><p>{tr(focusStep[2],language)}</p></div></div>
  </section>;
}

function DailyGains({t}){
  const [daily,setDaily]=useState(true),[tp,setTp]=useState(true),[tc,setTc]=useState(false),[cp,setCp]=useState(false),[cc,setCc]=useState(false),[frog,setFrog]=useState(false),[beeResin,setBeeResin]=useState(0),[beeHoney,setBeeHoney]=useState(0);
  const beeValid=beeResin+beeHoney<=5;
  const termite=Number(tp)+Number(tc),crab=Number(cp)+Number(cc);
  const resin=(daily?1500:0)+termite*2000+(beeValid?beeResin*2000:0);
  const honey=(daily?150:0)+(frog?250:0)+(beeValid?beeHoney*75:0);
  const parts=crab*100,gems=daily?10:0,tokens=(termite+crab+Number(frog))*3;
  const toggle=(value,setter,label)=><button type="button" className={value?'active':''} onClick={()=>setter(v=>!v)}><span>{value?<Check size={14}/>:null}</span>{label}</button>;
  return <section className="mf-panel">
    <div className="mf-section-head"><div><span><Calculator size={17}/>{t('Ganhos fixos','Fixed gains')}</span><h2>{t('Calculadora diária','Daily gains calculator')}</h2><p>{t('Soma apenas recompensas fixas documentadas — nada de estimar loot aleatório.','Adds only documented fixed rewards — no random-loot guessing.')}</p></div></div>
    <div className="mf-toggle-grid">{toggle(daily,setDaily,'4 Daily Quests')}{toggle(tp,setTp,'Termite · public')}{toggle(tc,setTc,'Termite · clan')}{toggle(cp,setCp,'Crab · public')}{toggle(cc,setCc,'Crab · clan')}{toggle(frog,setFrog,'Frog · public')}</div>
    <div className="mf-bee-row"><label><span>Beehive → Resin</span><input type="number" min="0" max="5" value={beeResin} onChange={e=>setBeeResin(Math.max(0,Math.min(5,+e.target.value||0)))}/></label><label><span>Beehive → Honeydew</span><input type="number" min="0" max="5" value={beeHoney} onChange={e=>setBeeHoney(Math.max(0,Math.min(5,+e.target.value||0)))}/></label><small className={beeValid?'':'bad'}>{beeValid?t('Máximo de 5 escolhas totais por dia.','Maximum 5 total choices per day.'):t('Resin + Honeydew passou de 5 escolhas.','Resin + Honeydew exceeds 5 choices.')}</small></div>
    <div className="mf-result-grid"><div><span>Resin</span><strong>{resin.toLocaleString()}</strong></div><div><span>Honeydew</span><strong>{honey.toLocaleString()}</strong></div><div><span>Body Parts</span><strong>{parts.toLocaleString()}</strong></div><div><span>Gems</span><strong>{gems}</strong></div><div><span>{t('Tokens gastos','Tokens spent')}</span><strong>{tokens}</strong></div></div>
  </section>;
}

function TokenPlanner({t}){
  const [tokens,setTokens]=useState(3),[focus,setFocus]=useState('resin');
  const cost=focus==='pheromones'?1:3;
  const label={resin:'Termite Nest',parts:'Crab Beach',honeydew:'Frog Pond',pheromones:'PvP'}[focus];
  const runs=Math.floor(Math.max(0,tokens)/cost),freeAtReset=tokens<3?3-tokens:0;
  return <section className="mf-panel">
    <div className="mf-section-head"><div><span><TimerReset size={17}/>{t('Economia de tokens','Token economy')}</span><h2>{t('Planejador de Battle Tokens','Battle Token planner')}</h2><p>{t('0–2 tokens voltam para 3 no reset de 00:00 UTC; acima de 3 o excedente permanece.','0–2 tokens restore to 3 at the 00:00 UTC reset; anything above 3 remains.')}</p></div></div>
    <div className="mf-inline-controls"><label><span>{t('Tokens atuais','Current tokens')}</span><input type="number" min="0" value={tokens} onChange={e=>setTokens(Math.max(0,+e.target.value||0))}/></label><label><span>{t('Quero farmar','I want to farm')}</span><select value={focus} onChange={e=>setFocus(e.target.value)}><option value="resin">Resin</option><option value="parts">Body Parts</option><option value="honeydew">Honeydew</option><option value="pheromones">{t('Feromônios','Pheromones')}</option></select></label></div>
    <div className="mf-token-answer"><div><span>{t('Ação','Action')}</span><strong>{label}</strong></div><div><span>{t('Custo','Cost')}</span><strong>{cost}</strong></div><div><span>{t('Entradas agora','Runs now')}</span><strong>{runs}</strong></div><div><span>{t('Tokens grátis no reset','Free at reset')}</span><strong>+{freeAtReset}</strong></div></div>
    <p className="mf-note">{focus==='pheromones'?t('Em PvP, 1 Battle Token é necessário para receber feromônios; sem token ainda é possível obter recursos/troféus.','In PvP, 1 Battle Token is required to receive pheromones; without one you can still obtain resources/trophies.'):t('Termite, Crab e Frog usam 3 Battle Tokens por entrada.','Termite, Crab and Frog use 3 Battle Tokens per entry.')}</p>
  </section>;
}

function CoopBoosters({language,t}){
  const [mode,setMode]=useState('termite'),[maxSoldiers,setMaxSoldiers]=useState(60),[selected,setSelected]=useState({});
  const boosters=COOP_BOOSTERS[mode];
  const base=mode==='frog'?0:Math.floor(maxSoldiers/10);
  const selectedList=boosters.filter(b=>selected[b.id]);
  const gemCost=selectedList.reduce((n,b)=>n+b.cost,0);
  const soldiers=mode==='frog'?0:base+(selected.soldiers?3:0);
  const required=mode==='frog'?null:base+1;
  const setModeSafe=v=>{setMode(v);setSelected({});};
  return <section className="mf-panel">
    <div className="mf-section-head"><div><span><Swords size={17}/>{t('Co-op','Co-op')}</span><h2>{t('Soldados e boosters','Soldiers & boosters')}</h2><p>{t('Boosters são de uso único e só podem ser escolhidos antes do lobby começar.','Boosters are one-time use and can only be selected before the lobby starts.')}</p></div><strong className="mf-cost">💎 {gemCost}</strong></div>
    <div className="mf-inline-controls"><label><span>{t('Mapa','Map')}</span><select value={mode} onChange={e=>setModeSafe(e.target.value)}><option value="termite">Termite Nest</option><option value="crab">Crab Beach</option><option value="frog">Frog Pond</option></select></label>{mode!=='frog'&&<label><span>{t('Exército máximo','Max army')}</span><input type="number" min="0" value={maxSoldiers} onChange={e=>setMaxSoldiers(Math.max(0,+e.target.value||0))}/></label>}</div>
    {mode!=='frog'&&<div className="mf-coop-stats"><div><span>{t('Soldados base no co-op','Base soldiers in co-op')}</span><strong>{base}</strong></div><div><span>{t('Com boosters','With boosters')}</span><strong>{soldiers}</strong></div><div><span>{t('Soldados vivos mínimos para entrar','Minimum living soldiers to join')}</span><strong>{required}</strong></div></div>}
    <div className="mf-booster-grid">{boosters.map(b=><button key={b.id} type="button" className={selected[b.id]?'active':''} onClick={()=>setSelected(s=>({...s,[b.id]:!s[b.id]}))}><span>{selected[b.id]?<Check size={14}/>:null}</span><div><strong>{tr(b.label,language)}</strong><small>{tr(b.detail,language)}</small></div><b>💎 {b.cost}</b></button>)}</div>
    <p className="mf-note">{mode==='frog'?t('Frog Pond sempre exige 8 jogadores; não usa soldados do exército.','Frog Pond always requires 8 players; it does not use army soldiers.'):t('A regra documentada leva 10% do exército máximo para Termite/Crab; o lobby exige pelo menos esse número + 1 soldado vivo.','The documented rule brings 10% of max army to Termite/Crab; joining requires at least that amount + 1 living soldier.')}</p>
  </section>;
}

function PvpTool({t}){
  const [completion,setCompletion]=useState(75),[token,setToken]=useState(true),[league,setLeague]=useState('Bronze'),[premium,setPremium]=useState(false);
  const pheromones=token?(completion>=100?3:completion>=75?2:completion>=50?1:0):0;
  const row=LEAGUE_TABLE.find(x=>x.name===league)||LEAGUE_TABLE[0];
  const rank=Math.max(1,LEAGUE_TABLE.findIndex(x=>x.name===league)+1);
  const seasonPoints=pheromones*rank*(premium?2:1);
  return <section className="mf-panel">
    <div className="mf-section-head"><div><span><Swords size={17}/>{t('PvP','PvP')}</span><h2>{t('Resultado de batalha','Battle result')}</h2><p>{t('50% = 1 feromônio, 75% = 2, 100%/rainha = 3.','50% = 1 pheromone, 75% = 2, 100%/queen = 3.')}</p></div><strong className="mf-big">{pheromones} 🧪</strong></div>
    <div className="mf-inline-controls"><label><span>{t('Destruição','Completion')}</span><input type="number" min="0" max="100" value={completion} onChange={e=>setCompletion(Math.max(0,Math.min(100,+e.target.value||0)))}/></label><label><span>{t('Liga','League')}</span><select value={league} onChange={e=>setLeague(e.target.value)}>{LEAGUE_TABLE.map(x=><option key={x.name}>{x.name}</option>)}</select></label></div>
    <div className="mf-toggle-grid compact"><button type="button" className={token?'active':''} onClick={()=>setToken(v=>!v)}><span>{token?<Check size={14}/>:null}</span>{t('Usar Battle Token','Use Battle Token')}</button><button type="button" className={premium?'active':''} onClick={()=>setPremium(v=>!v)}><span>{premium?<Check size={14}/>:null}</span>{t('Season Pass ×2','Season Pass ×2')}</button></div>
    <div className="mf-result-grid pvp"><div><span>{t('Feromônio','Pheromone')}</span><strong>{row.pheromone}</strong></div><div><span>{t('Bônus da liga','League bonus')}</span><strong>{row.bonus}</strong></div><div><span>{t('Battle Season pts*','Battle Season pts*')}</span><strong>{seasonPoints}</strong></div></div>
    <div className="mf-source-warning"><AlertTriangle size={15}/><span>{t('*Battle Seasons ainda é marcada como página comunitária incompleta; o cálculo segue a tabela atual de pontos por liga e dobra com o passe.','*Battle Seasons is still marked as an incomplete community page; this calculation follows its current league-point table and doubles with the pass.')}</span></div>
    <p className="mf-note">{t('Loot documentado: até 15% de Fungi/Leaves/Seeds (cap 1.500 cada) e 5% de Body Parts (cap 500). O valor real depende do alvo e da conclusão.','Documented loot: up to 15% of Fungi/Leaves/Seeds (1,500 cap each) and 5% of Body Parts (500 cap). Actual value depends on target and completion.')}</p>
  </section>;
}

function WarCalendar({language,t}){
  const utcDay=new Date().getUTCDay();
  const current=WAR_WEEK.find(x=>x.day===utcDay);
  return <section className="mf-panel mf-war">
    <div className="mf-section-head"><div><span><CalendarDays size={17}/>{t('Semana do clã','Clan week')}</span><h2>{t('Calendário de Clan Wars','Clan Wars calendar')}</h2><p>{current?`${t('Hoje em UTC','Today in UTC')}: ${tr(current.name,language)} · ${tr(current.title,language)}`:t('Hoje está fora da janela principal; prepare recursos e lineup para sexta.','Today is outside the main window; prepare resources and lineup for Friday.')}</p></div><a href="#/mechanics/clan-wars">{t('Guia completo','Full guide')} <ChevronRight size={15}/></a></div>
    <div className="mf-war-grid">{WAR_WEEK.map(x=><div key={x.day} className={utcDay===x.day?'active':''}><span>{x.icon}</span><small>{tr(x.name,language)}</small><strong>{tr(x.title,language)}</strong><p>{tr(x.text,language)}</p></div>)}</div>
  </section>;
}

function OfflineStrip({t}){return <section className="mf-panel"><div className="mf-section-head"><div><span><WifiOff size={17}/>{t('Matriz offline','Offline matrix')}</span><h2>{t('Saiu do jogo? Isto continua coletando','Away from game? These keep gathering')}</h2><p>{t('Regra-base: ~10 min offline, chamber relacionada Lv.2+ e workers atribuídos.','Base rule: ~10 min offline, related chamber Lv.2+ and assigned workers.')}</p></div></div><div className="mf-offline">{OFFLINE_MATRIX.map(([id,yes])=><a href={`#/resources/${id}`} key={id} className={yes?'yes':'no'}><span>{yes?'✓':'×'}</span><strong>{resourceLabel(id,t)}</strong></a>)}</div></section>}

function MechanicsLibrary({language,t}){
  const [q,setQ]=useState(''),[cat,setCat]=useState('all');
  const categories=['all','combat','creatures','farm','coop','garden','clan'];
  const list=useMemo(()=>RECORDS.filter(r=>{const hay=norm([tr(r.name,language),tr(r.summary,language),...(r.facts||[]).map(x=>tr(x,language)),...(r.steps||[]).map(x=>tr(x,language))].join(' '));return(cat==='all'||r.category===cat)&&(!q||hay.includes(norm(q)));}),[q,cat,language]);
  return <section id="library" className="mf-library">
    <div className="mf-library-head"><div><span><Waypoints size={17}/>{t('Biblioteca final','Final library')}</span><h2>{t('Todas as mecânicas','All mechanics')}</h2><p>{t('Ferramentas em cima; explicações profundas aqui embaixo.','Tools above; deep explanations below.')}</p></div><b>{list.length}/{RECORDS.length}</b></div>
    <div className="mf-filter"><label><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t('Buscar PvP, co-op, Garden, Silk…','Search PvP, co-op, Garden, Silk…')}/></label><div>{categories.map(x=><button type="button" key={x} className={cat===x?'active':''} onClick={()=>setCat(x)}>{categoryLabel(x,t)}</button>)}</div></div>
    <div className="mf-cards">{list.map(r=><article key={r.id}><div className="mf-card-top"><span>{r.icon}</span><Trust record={r} t={t}/></div><small>{categoryLabel(r.category,t)}</small><h3>{tr(r.name,language)}</h3><p>{tr(r.summary,language)}</p>{r.facts?.[0]&&<div className="mf-card-fact"><Info size={14}/>{tr(r.facts[0],language)}</div>}<div className="mf-card-actions"><a className="primary" href={`#/mechanics/${r.id}`}>{t('Abrir mecânica','Open mechanic')} <ChevronRight size={15}/></a><a href={sourceUrl(r)} target="_blank" rel="noreferrer"><BookOpen size={14}/>{t('Fonte','Source')}</a></div></article>)}</div>
  </section>;
}

function Sources({t}){return <section className="mf-sources"><div><ShieldCheck size={18}/><p><strong>{t(`Revisão final · v${MECHANIC_EXPANSION_META.version}`,`Final review · v${MECHANIC_EXPANSION_META.version}`)}</strong><br/>{t('A versão oficial 0.1153 é de 26/08/2026. Dados numéricos detalhados vêm da wiki comunitária e conflitos ficam sinalizados, não escondidos.','Official version 0.1153 is dated Aug 26, 2026. Detailed numeric data comes from the community wiki and conflicts are flagged rather than hidden.')}</p></div><div className="mf-source-links"><a href={OFFICIAL_URL} target="_blank" rel="noreferrer">{t('Versão oficial','Official version')} <ExternalLink size={13}/></a><a href={MECHANIC_SOURCE_URLS.coop} target="_blank" rel="noreferrer">Co-op <ExternalLink size={13}/></a><a href={MECHANIC_SOURCE_URLS.attacking} target="_blank" rel="noreferrer">PvP <ExternalLink size={13}/></a><a href={MECHANIC_SOURCE_URLS.tokens} target="_blank" rel="noreferrer">Tokens <ExternalLink size={13}/></a><a href={MECHANIC_SOURCE_URLS.wars} target="_blank" rel="noreferrer">Clan Wars <ExternalLink size={13}/></a></div></section>}

function FinalHub(){
  const {language,t}=useLanguage();
  return <div className="mf-page">
    <section className="mf-hero"><div><span className="mf-kicker"><Sparkles size={15}/>{t('Mecânicas · versão final','Mechanics · final version')}</span><h1>{t('Central de Mecânicas','Mechanics Hub')}</h1><p>{t('Entenda o jogo e já faça a conta: rotina diária, Battle Tokens, co-op, boosters, PvP, Battle Seasons, Clan Wars e coleta offline em uma tela feita para celular.','Understand the game and do the math immediately: daily routine, Battle Tokens, co-op, boosters, PvP, Battle Seasons, Clan Wars and offline gathering in a mobile-first screen.')}</p></div><div className="mf-hero-stats"><div><strong>{RECORDS.length}</strong><span>{t('mecânicas','mechanics')}</span></div><div><strong>6</strong><span>{t('ferramentas práticas','practical tools')}</span></div><div><strong>0.1153</strong><span>{t('base atual','current base')}</span></div></div></section>
    <nav className="mf-jump"><a href="#today"><Target size={15}/>{t('Hoje','Today')}</a><a href="#tools"><Calculator size={15}/>{t('Ferramentas','Tools')}</a><a href="#library"><Database size={15}/>{t('Biblioteca','Library')}</a></nav>
    <TodayPlanner language={language} t={t}/>
    <div id="tools" className="mf-tools-grid"><DailyGains t={t}/><TokenPlanner t={t}/><CoopBoosters language={language} t={t}/><PvpTool t={t}/></div>
    <WarCalendar language={language} t={t}/>
    <OfflineStrip t={t}/>
    <MechanicsLibrary language={language} t={t}/>
    <Sources t={t}/>
  </div>;
}

export default function MechanicDatabasePageFinal({routeId}){
  if(routeId)return <MechanicDatabasePageV2 routeId={routeId}/>;
  return <FinalHub/>;
}
