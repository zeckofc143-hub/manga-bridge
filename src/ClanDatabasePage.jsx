import React,{useEffect,useMemo,useState} from 'react';
import {AlertTriangle,BookOpen,Calculator,Check,ChevronLeft,ChevronRight,ExternalLink,Filter,Search,ShieldCheck,Sparkles,Target,Users} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {CLAN_BONUSES,CLAN_CATEGORIES,CLAN_LEVELS,CLAN_META,CLAN_RECORDS,CLAN_ROLES,CLAN_VISUAL,CLAN_WAR_SCHEDULE,clanBonusTier,clanLevel,clanRecord} from './clanResearchData';
import './resourceDatabasePage.css';
import './clanDatabasePage.css';

const tr=(value,language)=>value&&typeof value==='object'?(language==='en'?(value.en??value.pt):(value.pt??value.en)):value;
const norm=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const fmt=(n,language)=>Number(n||0).toLocaleString(language==='en'?'en-US':'pt-BR');
const readQuery=()=>new URLSearchParams((window.location.hash.split('?')[1]||'')).get('dbq')||'';

function catLabel(id,t){return ({all:t('Todos','All'),basics:t('Básico','Basics'),recruitment:t('Entrada','Joining'),progression:t('Progressão','Progression'),management:t('Gestão','Management'),economy:t('Economia','Economy'),coop:'Co-op',war:t('Guerra','War'),social:t('Social','Social')})[id]||id;}

function SourceLinks({sources,t}){return <div className="cl-source-row">{(sources||[]).map((url,i)=><a key={`${url}-${i}`} href={url} target="_blank" rel="noreferrer"><BookOpen size={13}/>{t('Fonte','Source')} {i+1}<ExternalLink size={11}/></a>)}</div>;}

function ClanFitTool(){
  const {language,t}=useLanguage();
  const [state,setState]=useState({myTrophies:700,myQc:6,maxDaily:999,reqTrophies:700,reqQc:5,reqDaily:900});
  const set=(key,val)=>setState(s=>({...s,[key]:Math.max(0,Number(val)||0)}));
  const trophyOk=state.myTrophies>=state.reqTrophies,qcOk=state.myQc>=state.reqQc,donationOk=state.reqDaily<=state.maxDaily;
  const directInviteOnly=(!trophyOk||!qcOk)&&donationOk;
  return <section className="cl-tool">
    <div className="cl-tool-head"><Target size={18}/><div><small>{t('Ferramenta de entrada','Join fit tool')}</small><h2>{t('Esse clã combina comigo?','Does this clan fit me?')}</h2><p>{t('Compare seus limites com o anúncio do clã. Os valores ficam só nesta tela.','Compare your limits with the clan listing. Values stay only on this screen.')}</p></div></div>
    <div className="cl-form-grid">
      <label><span>{t('Meus troféus','My trophies')}</span><input type="number" min="0" value={state.myTrophies} onChange={e=>set('myTrophies',e.target.value)}/></label>
      <label><span>{t('Minha Queen Chamber','My Queen Chamber')}</span><input type="number" min="1" max="12" value={state.myQc} onChange={e=>set('myQc',e.target.value)}/></label>
      <label><span>{t('Máx. que aceito doar/dia','Max donation I accept/day')}</span><input type="number" min="0" value={state.maxDaily} onChange={e=>set('maxDaily',e.target.value)}/></label>
      <label><span>{t('Troféus exigidos pelo clã','Clan trophy requirement')}</span><input type="number" min="0" value={state.reqTrophies} onChange={e=>set('reqTrophies',e.target.value)}/></label>
      <label><span>{t('QC exigida pelo clã','Clan QC requirement')}</span><input type="number" min="0" max="12" value={state.reqQc} onChange={e=>set('reqQc',e.target.value)}/></label>
      <label><span>{t('Doação diária pedida','Daily donation requested')}</span><input type="number" min="0" value={state.reqDaily} onChange={e=>set('reqDaily',e.target.value)}/></label>
    </div>
    <div className="cl-fit-results" aria-live="polite">
      <span className={trophyOk?'ok':'bad'}>{trophyOk?'✓':'✕'} {t('Troféus','Trophies')}</span><span className={qcOk?'ok':'bad'}>{qcOk?'✓':'✕'} QC</span><span className={donationOk?'ok':'bad'}>{donationOk?'✓':'✕'} {t('Doação','Donation')}</span>
    </div>
    <div className={`cl-fit-answer ${trophyOk&&qcOk&&donationOk?'good':directInviteOnly?'warn':'bad'}`}>
      {trophyOk&&qcOk&&donationOk?<><Check size={18}/><b>{t('Você atende aos três critérios informados.','You meet all three listed criteria.')}</b></>:directInviteOnly?<><AlertTriangle size={18}/><b>{t('A doação cabe no seu limite; um convite direto pode contornar QC/troféus.','Donation fits your limit; a direct invite can bypass QC/trophies.')}</b></>:<><AlertTriangle size={18}/><b>{t('Esse anúncio não encaixa no limite que você definiu.','This listing does not fit the limits you set.')}</b></>}
    </div>
    <p className="cl-tool-note">{t('Convite direto ignora requisitos automáticos de Queen Chamber/troféus, mas não muda regras internas de doação, atividade ou horário de co-op do clã.','A direct invite bypasses automatic Queen Chamber/trophy requirements, but it does not change the clan’s internal donation, activity or co-op-time rules.')}</p>
  </section>;
}

function BonusPlanner(){
  const {language,t}=useLanguage();
  const [level,setLevel]=useState(12),[bonusCount,setBonusCount]=useState(1),[members,setMembers]=useState(40),[coops,setCoops]=useState(2);
  const tier=clanBonusTier(level);
  const perResource=tier.costEach*bonusCount,total=perResource*3;
  const coopWeekly=level>=12?Math.min(2,Math.max(0,coops))*7*15000:0;
  const remainingPerResource=Math.max(0,perResource-coopWeekly);
  const shareEach=members>0?Math.ceil(remainingPerResource/members/7):0;
  const shareTotal=shareEach*3;
  return <section className="cl-tool">
    <div className="cl-tool-head"><Calculator size={18}/><div><small>{t('Economia do clã','Clan economy')}</small><h2>{t('Planner de bônus semanal','Weekly bonus planner')}</h2><p>{t('Mostra custo real em Fungus + Leaves + Seeds e uma divisão simples entre membros.','Shows the real Fungus + Leaves + Seeds cost and a simple per-member split.')}</p></div></div>
    <div className="cl-form-grid">
      <label><span>{t('Nível do clã','Clan level')}</span><select value={level} onChange={e=>setLevel(Number(e.target.value))}>{Array.from({length:15},(_,i)=>i+1).map(x=><option key={x} value={x}>Lv.{x}</option>)}</select></label>
      <label><span>{t('Bônus que quer manter','Bonuses to maintain')}</span><select value={bonusCount} onChange={e=>setBonusCount(Number(e.target.value))}>{[1,2,3,4,5].map(x=><option key={x} value={x}>{x}/5</option>)}</select></label>
      <label><span>{t('Membros contribuindo','Contributing members')}</span><input type="number" min="1" max="60" value={members} onChange={e=>setMembers(Math.max(1,Math.min(60,Number(e.target.value)||1)))}/></label>
      <label><span>{t('Clan co-ops/dia concluídos','Clan co-ops/day completed')}</span><select value={coops} onChange={e=>setCoops(Number(e.target.value))}><option value="0">0</option><option value="1">1</option><option value="2">2</option></select></label>
    </div>
    <div className="cl-result-grid">
      <div><small>{t('Valor do bônus','Bonus value')}</small><strong>{tier.speed}% / {tier.fusion}%</strong></div>
      <div><small>{t('Por recurso/semana','Per resource/week')}</small><strong>{fmt(perResource,language)}</strong></div>
      <div><small>{t('Total dos 3 recursos','All 3 resources')}</small><strong>{fmt(total,language)}</strong></div>
      <div><small>{t('Co-op cobre por recurso','Co-op covers/resource')}</small><strong>{fmt(coopWeekly,language)}</strong></div>
      <div><small>{t('Meta por membro/dia/recurso','Per member/day/resource')}</small><strong>{fmt(shareEach,language)}</strong></div>
      <div><small>{t('Meta total por membro/dia','Total per member/day')}</small><strong>{fmt(shareTotal,language)}</strong></div>
    </div>
    <p className="cl-tool-note">{level>=12?t('No Lv12+, cada clan co-op concluído adiciona 15.000 Fungus + 15.000 Leaves + 15.000 Seeds ao armazenamento; o cálculo desconta isso antes de dividir entre membros.','At Lv12+, each completed clan co-op adds 15,000 Fungus + 15,000 Leaves + 15,000 Seeds to storage; this calculation subtracts that before splitting the remainder among members.'):t('Até Lv11, clan co-op dá Clan Points em vez dos 15.000 de cada recurso, então ele não reduz o custo de bônus neste cálculo.','Through Lv11, clan co-op gives Clan Points instead of 15,000 of each resource, so it does not reduce bonus cost in this calculation.')}</p>
  </section>;
}

function LevelTable(){const {language,t}=useLanguage();return <section className="rdb-panel cl-table-panel"><div className="cl-section-head"><span>📈</span><div><small>{t('Tabela completa','Full table')}</small><h2>{t('Nível, membros, doações e Clan Points','Level, members, donations and Clan Points')}</h2></div></div><div className="cl-table-wrap"><table><thead><tr><th>Lv</th><th>{t('Membros','Members')}</th><th>{t('Doações/dia','Donations/day')}</th><th>{t('CP p/ próximo','CP to next')}</th><th>{t('Clan co-op','Clan co-op')}</th></tr></thead><tbody>{CLAN_LEVELS.map(row=><tr key={row.level}><td>{row.level}</td><td>{row.members}</td><td>{row.donations}</td><td>{row.points?fmt(row.points,language):'—'}</td><td>{row.level===12?t('15k de cada recurso','15k each resource'):row.coopReward?`${fmt(row.coopReward,language)} CP`:'—'}</td></tr>)}</tbody></table></div></section>}

function RoleTable(){const {language,t}=useLanguage();return <section className="rdb-panel"><div className="cl-section-head"><span>👑</span><div><small>{t('Permissões','Permissions')}</small><h2>{t('Cargos do clã','Clan roles')}</h2></div></div><div className="cl-role-grid">{CLAN_ROLES.map(role=><article key={role.id}><span>{role.icon}</span><div><b>{tr(role.name,language)}</b><ul>{role.facts.map((fact,i)=><li key={i}>{tr(fact,language)}</li>)}</ul></div></article>)}</div></section>}

function WarSchedule(){const {language,t}=useLanguage();return <section className="rdb-panel"><div className="cl-section-head"><span>⚔️</span><div><small>{t('UTC','UTC')}</small><h2>{t('Semana de Clan Wars','Clan Wars week')}</h2></div></div><div className="cl-war-grid">{CLAN_WAR_SCHEDULE.map((row,i)=><article key={i}><span>{i+1}</span><div><small>{tr(row.day,language)}</small><b>{tr(row.title,language)}</b><p>{tr(row.text,language)}</p></div></article>)}</div></section>}

function BonusScreenExplainer(){const {language,t}=useLanguage();const tier=clanBonusTier(12);return <section className="rdb-panel cl-screen-explain"><div className="cl-section-head"><span>🖥️</span><div><small>{t('A tela que você mostrou','The screen you showed')}</small><h2>{t('Como ler a aba Bônus','How to read the Bonus tab')}</h2></div></div><div className="cl-bonus-grid">{CLAN_BONUSES.map(item=><article key={item.id}><span>{item.icon}</span><div><b>{tr(item.name,language)}</b><small>{item.id==='fusion'?`+${tier.fusion}%`:`+${tier.speed}%`}</small><p>{t('No Lv12, ativar este bônus custa 500.000 Fungus + 500.000 Leaves + 500.000 Seeds e dura 7 dias.','At Lv12, activating this bonus costs 500,000 Fungus + 500,000 Leaves + 500,000 Seeds and lasts 7 days.')}</p></div></article>)}</div><div className="cl-screen-note"><b>{t('Barra 238/50.000.000','238/50,000,000 bar')}</b><span>{t('É a barra de atividade/Clan Points do clã Lv12 rumo ao próximo nível documentado.','It is the Lv12 clan activity/Clan Points bar toward the next documented level.')}</span></div><div className="cl-screen-note"><b>{t('“Bônus de vitória na guerra”','“War victory bonus”')}</b><span>{t('Clan Wars também pode conceder um bônus temporário exclusivo ao clã. O efeito e o tempo restantes devem ser lidos exatamente no jogo, porque variam com a recompensa recebida.','Clan Wars can also grant a temporary exclusive clan bonus. Read the exact effect and remaining time in-game because it depends on the reward received.')}</span></div></section>}

function ClanDetail({record}){const {language,t}=useLanguage();return <div className="rdb-page cl-page"><a className="rdb-back" href="#/clans"><ChevronLeft size={17}/>{t('Voltar para Clãs','Back to Clans')}</a><section className="rdb-detail-hero"><div className="rdb-detail-icon">{record.icon}</div><div className="rdb-detail-copy"><div className="rdb-detail-badges"><span>{catLabel(record.category,t)}</span><span><ShieldCheck size={13}/>{t('Revisado','Reviewed')}</span></div><h1>{tr(record.title,language)}</h1><p>{tr(record.summary,language)}</p></div></section><section className="cl-quick"><div><Sparkles size={17}/><b>{t('Em 20 segundos','In 20 seconds')}</b></div><div>{record.facts.slice(0,3).map((fact,i)=><article key={i}><span>{i+1}</span><p>{tr(fact,language)}</p></article>)}</div></section><section className="rdb-panel"><div className="cl-section-head"><span>ℹ️</span><div><small>{t('Detalhes','Details')}</small><h2>{t('Tudo que importa nesta parte','Everything that matters here')}</h2></div></div><ul className="cl-fact-list">{record.facts.map((fact,i)=><li key={i}>{tr(fact,language)}</li>)}</ul><SourceLinks sources={record.sources} t={t}/></section>{record.id==='levels'&&<LevelTable/>}{record.id==='roles'&&<RoleTable/>}{record.id==='bonuses'&&<><BonusScreenExplainer/><BonusPlanner/></>}{record.id==='joining'&&<ClanFitTool/>}{record.id==='clan-wars'&&<WarSchedule/>}</div>}

function ClanHub(){
  const {language,t}=useLanguage();const [query,setQuery]=useState(readQuery),[category,setCategory]=useState('all');
  useEffect(()=>{const sync=()=>setQuery(readQuery());window.addEventListener('hashchange',sync);window.addEventListener('app:navigation',sync);return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('app:navigation',sync);};},[]);
  const filtered=useMemo(()=>{const q=norm(query);return CLAN_RECORDS.filter(item=>(category==='all'||item.category===category)&&(!q||norm(`${tr(item.title,language)} ${tr(item.summary,language)} ${(item.facts||[]).map(x=>tr(x,language)).join(' ')}`).includes(q)));},[query,category,language]);
  const quick=['joining','donations','bonuses','clan-coop','clan-wars'].map(clanRecord).filter(Boolean);
  return <div className="rdb-page cl-page"><section className="rdb-identity"><div className="rdb-title-row"><span className="rdb-db-icon">🏳️</span><div><span className="rdb-kicker">{t('Social · Clãs · Guildas','Social · Clans · Guilds')}</span><h1>{t('Clãs & Social','Clans & Social')}</h1></div></div><p>{t('Tudo sobre entrar, doar, subir o clã, ativar bônus, co-op, Clan Wars, cargos, base e gestão — com ferramentas para avaliar exigências e custos.','Everything about joining, donating, leveling the clan, bonuses, co-op, Clan Wars, roles, base and management — with tools to evaluate requirements and costs.')}</p><div className="rdb-principles"><span><ShieldCheck size={15}/>{t('Dados revisados','Reviewed data')}</span><span><Calculator size={15}/>{t('Planners de doação/bônus','Donation/bonus planners')}</span><span><Users size={15}/>{t('Entrada e cargos','Joining & roles')}</span></div></section>
  <figure className="cl-visual"><a href={CLAN_VISUAL.image} target="_blank" rel="noreferrer"><img src={CLAN_VISUAL.image} alt={tr(CLAN_VISUAL.alt,language)} loading="lazy" decoding="async" referrerPolicy="no-referrer"/></a><figcaption><span>{tr(CLAN_VISUAL.caption,language)}</span><a href={CLAN_VISUAL.source} target="_blank" rel="noreferrer">{t('Fonte da imagem','Image source')} <ExternalLink size={11}/></a></figcaption></figure>
  <section className="cl-start"><div className="cl-section-head"><span>⚡</span><div><small>{t('Comece pela sua dúvida','Start with your question')}</small><h2>{t('As partes mais usadas','Most-used topics')}</h2></div></div><div>{quick.map(item=><a key={item.id} href={`#/clans/${item.id}`}><span>{item.icon}</span><div><b>{tr(item.title,language)}</b><p>{tr(item.summary,language)}</p></div><ChevronRight size={16}/></a>)}</div></section>
  <ClanFitTool/><BonusPlanner/>
  <section className="cl-discovery"><label className="rdb-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar doação, bônus, cargo, guerra, co-op…','Search donation, bonus, role, war, co-op…')} aria-label={t('Buscar em Clãs','Search Clans')}/></label><details><summary><Filter size={15}/>{t('Filtrar assunto','Filter topic')} <span>{filtered.length}/{CLAN_RECORDS.length}</span></summary><div className="cl-filter-row"><button type="button" className={category==='all'?'active':''} onClick={()=>setCategory('all')}>{t('Todos','All')}</button>{CLAN_CATEGORIES.filter(x=>x!=='all').map(id=><button key={id} type="button" className={category===id?'active':''} onClick={()=>setCategory(id)}>{catLabel(id,t)}</button>)}</div></details></section>
  <section className="cl-grid">{filtered.map(item=><a className="cl-card" key={item.id} href={`#/clans/${item.id}`}><span className="cl-card-icon">{item.icon}</span><div><small>{catLabel(item.category,t)}</small><h2>{tr(item.title,language)}</h2><p>{tr(item.summary,language)}</p><b>{t('Abrir ficha','Open entry')} <ChevronRight size={14}/></b></div></a>)}</section>
  <section className="cl-links"><a href={CLAN_META.officialDiscord} target="_blank" rel="noreferrer"><Users size={15}/>{t('Discord oficial / recrutamento','Official Discord / recruitment')}</a><a href={CLAN_META.clansUrl} target="_blank" rel="noreferrer"><BookOpen size={15}/>{t('Fonte principal de Clãs','Main Clans source')}</a><a href="#/tools/clan-week"><Target size={15}/>{t('Planner de Clan Wars','Clan Wars planner')}</a></section>
  </div>;
}

export default function ClanDatabasePage({routeId}){if(!routeId)return <ClanHub/>;const record=clanRecord(routeId);if(!record)return <div className="rdb-page cl-page"><div className="rdb-empty"><AlertTriangle size={26}/><b>404</b><a href="#/clans">{t=>'Clans'}</a></div></div>;return <ClanDetail record={record}/>;}
