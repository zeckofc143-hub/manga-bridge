import React,{useEffect,useMemo} from 'react';
import {AlertTriangle,BookOpen,Check,ChevronLeft,Circle,ExternalLink,Info,RotateCcw,ShieldCheck} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {usePersistentState,writeStoredJson} from './usePersistentState';
import {RESIN_SOURCE_AMOUNT,RESIN_STORAGE,TOOL_RECORDS,TOOL_SOURCE_URLS} from './toolResearchData';
import './resourceDatabasePage.css';
import './extraToolPages.css';

const EXTRA_IDS=new Set(['aphid-yield','resin-session','gem-budget','event-points','clan-week']);
const fmt=(n,language)=>Number(n||0).toLocaleString(language==='en'?'en-US':'pt-BR');
const clamp=(value,min,max)=>Math.min(max,Math.max(min,Number(value)||0));

export const isExtraToolRoute=id=>EXTRA_IDS.has(id);

function Field({label,value,onChange,min=0,max,step=1,help}){
  return <label className="xt-field"><span>{label}</span><input type="number" inputMode="decimal" min={min} max={max} step={step} value={value} onChange={e=>onChange(e.target.value)}/>{help&&<small>{help}</small>}</label>;
}
function Select({label,value,onChange,children,help}){
  return <label className="xt-field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{children}</select>{help&&<small>{help}</small>}</label>;
}
function Toggle({active,onClick,children}){
  return <button type="button" className={`xt-toggle${active?' active':''}`} aria-pressed={active} onClick={onClick}>{active?<Check size={16}/>:<Circle size={16}/>}<span>{children}</span></button>;
}
function Result({label,value,tone=''}){return <div className={`xt-result ${tone}`}><span>{label}</span><strong>{value}</strong></div>;}
function Notice({kind='info',children}){return <div className={`xt-notice ${kind}`} role="note">{kind==='warn'?<AlertTriangle size={18}/>:<Info size={18}/>}<span>{children}</span></div>;}

function Frame({id,icon,title,desc,sources=[],onReset,children}){
  const {t}=useLanguage();
  useEffect(()=>{writeStoredJson('pa-tool-recent-v1',id);},[id]);
  return <div className="rdb-page xt-page">
    <a className="rdb-back" href="#/tools"><ChevronLeft size={17}/>{t('Voltar para Ferramentas','Back to Tools')}</a>
    <section className="rdb-detail-hero xt-hero"><div className="rdb-detail-icon">{icon}</div><div className="rdb-detail-copy"><div className="rdb-detail-badges"><span><ShieldCheck size={13}/>{t('Cálculo local','Local calculation')}</span><span>{t('Fórmula visível','Visible formula')}</span></div><h1>{title}</h1><p>{desc}</p><div className="xt-sources">{sources.map(key=>TOOL_SOURCE_URLS[key]?<a key={key} href={TOOL_SOURCE_URLS[key]} target="_blank" rel="noreferrer"><BookOpen size={14}/>{t('Fonte','Source')}<ExternalLink size={12}/></a>:null)}</div></div></section>
    <section className="rdb-panel xt-body"><div className="xt-toolbar"><span>{t('Tudo fica salvo neste aparelho.','Everything is saved on this device.')}</span>{onReset&&<button type="button" onClick={onReset}><RotateCcw size={15}/>{t('Resetar','Reset')}</button>}</div>{children}</section>
  </div>;
}

function AphidTool(){
  const {language,t}=useLanguage();
  const defaults={delivered:10,perAphid:10,farms:1,eventMode:false};
  const [state,setState,reset]=usePersistentState('pa-tool-aphid-yield-v1',defaults);
  const delivered=clamp(state.delivered,0,10),perAphid=clamp(state.perAphid,1,15),farms=Math.max(1,Math.floor(Number(state.farms)||1));
  const perFarm=delivered*perAphid,total=perFarm*farms,interval=state.eventMode?3:6,wait=Math.max(0,farms-1)*interval;
  const lost=(10-delivered)*perAphid;
  return <Frame id="aphid-yield" icon="🍯" title={t('Calculadora de Aphid Farm','Aphid Farm calculator')} desc={t('Veja quanto Honeydew seu convoy realmente entrega e quanto cada carrier perdido custa.','See how much Honeydew your convoy actually delivers and how much each lost carrier costs.')} sources={['aphid']} onReset={reset}>
    <div className="xt-form-grid"><Field label={t('Aphids entregues','Aphids delivered')} value={state.delivered} min={0} max={10} onChange={v=>setState(s=>({...s,delivered:clamp(v,0,10)}))}/><Field label={t('Honeydew por aphid','Honeydew per aphid')} value={state.perAphid} min={1} max={15} onChange={v=>setState(s=>({...s,perAphid:clamp(v,1,15)}))}/><Field label={t('Número de farms','Number of farms')} value={state.farms} min={1} max={30} onChange={v=>setState(s=>({...s,farms:clamp(v,1,30)}))}/></div>
    <div className="xt-toggle-row"><Toggle active={Boolean(state.eventMode)} onClick={()=>setState(s=>({...s,eventMode:!s.eventMode}))}>{t('Modo de evento regular: respawn de referência 3h','Regular event mode: reference respawn 3h')}</Toggle></div>
    <div className="xt-results" aria-live="polite"><Result label={t('Por farm','Per farm')} value={`${fmt(perFarm,language)} Honeydew`} tone="accent"/><Result label={t('Total','Total')} value={fmt(total,language)}/><Result label={t('Perda por carriers','Carrier loss')} value={fmt(lost,language)} tone={lost?'warn':''}/><Result label={t('Espera entre farms','Wait between farms')} value={`${wait}h`}/><Result label={t('Pontos de evento*','Event points*')} value={fmt(total,language)}/></div>
    <Notice>{t('A farm normal reaparece 6h depois da anterior; a página atual da Aphid Farm registra 3h em eventos regulares. Cada convoy tem 10 aphids e o máximo documentado é 15 Honeydew por aphid.','A normal farm respawns 6h after the previous one; the current Aphid Farm page records 3h during regular events. Each convoy has 10 aphids and the documented maximum is 15 Honeydew per aphid.')}</Notice>
    <Notice kind="warn">{t('Os pontos de evento só valem igual ao Honeydew quando a edição atual disser que Honeydew da Aphid Farm vale 1 ponto por unidade. Confira o evento antes de usar essa coluna.','Event points only equal Honeydew when the current edition says Aphid Farm Honeydew is worth 1 point per unit. Check the event before using that column.')}</Notice>
    <details className="xt-formula"><summary>{t('Fórmula','Formula')}</summary><p>{t('Honeydew por farm = aphids entregues × Honeydew por aphid. Total = por farm × número de farms. Perda = (10 − entregues) × Honeydew por aphid.','Honeydew per farm = delivered aphids × Honeydew per aphid. Total = per farm × number of farms. Loss = (10 − delivered) × Honeydew per aphid.')}</p></details>
  </Frame>;
}

function ResinSessionTool(){
  const {language,t}=useLanguage();
  const defaults={current:0,target:25000,chamber:6,daily:true,publicTermite:true,clanTermite:false,beehive:0};
  const [state,setState,reset]=usePersistentState('pa-tool-resin-session-v1',defaults);
  const current=Math.max(0,Number(state.current)||0),target=Math.max(0,Number(state.target)||0),level=clamp(state.chamber,1,12),beehive=clamp(state.beehive,0,5);
  const fixed=(state.daily?1500:0)+(state.publicTermite?2000:0)+(state.clanTermite?2000:0)+beehive*2000;
  const missingBefore=Math.max(0,target-current),afterFixed=Math.max(0,target-(current+fixed));
  const source=RESIN_SOURCE_AMOUNT[level]||0,loads=source?Math.ceil(afterFixed/source):0,projected=current+fixed+loads*source,cap=RESIN_STORAGE[level]||0;
  return <Frame id="resin-session" icon="🟠" title={t('Planner de sessão de Resin','Resin session planner')} desc={t('Junte as fontes fixas do dia com a Resin da árvore e veja quantas cargas completas faltam.','Combine fixed daily sources with tree Resin and see how many full source loads remain.')} sources={['resin','resinChamber','coop','daily']} onReset={reset}>
    <div className="xt-form-grid"><Field label={t('Resin atual','Current Resin')} value={state.current} onChange={v=>setState(s=>({...s,current:Math.max(0,Number(v)||0)}))}/><Field label={t('Meta de Resin','Resin target')} value={state.target} onChange={v=>setState(s=>({...s,target:Math.max(0,Number(v)||0)}))}/><Select label="Resin Chamber" value={level} onChange={v=>setState(s=>({...s,chamber:Number(v)}))}>{Array.from({length:12},(_,i)=>i+1).map(x=><option key={x} value={x}>Lv.{x} · {fmt(RESIN_SOURCE_AMOUNT[x],language)} / {fmt(RESIN_STORAGE[x],language)}</option>)}</Select><Field label={t('Beehive escolhendo Resin','Beehive Resin choices')} value={beehive} min={0} max={5} onChange={v=>setState(s=>({...s,beehive:clamp(v,0,5)}))}/></div>
    <div className="xt-toggle-row"><Toggle active={Boolean(state.daily)} onClick={()=>setState(s=>({...s,daily:!s.daily}))}>4 Daily Quests · +1.500</Toggle><Toggle active={Boolean(state.publicTermite)} onClick={()=>setState(s=>({...s,publicTermite:!s.publicTermite}))}>{t('Termite público','Public Termite')} · +2.000</Toggle><Toggle active={Boolean(state.clanTermite)} onClick={()=>setState(s=>({...s,clanTermite:!s.clanTermite}))}>{t('Termite do clã','Clan Termite')} · +2.000</Toggle></div>
    <div className="xt-results" aria-live="polite"><Result label={t('Faltava no início','Initial shortage')} value={fmt(missingBefore,language)}/><Result label={t('Ganho fixo marcado','Selected fixed gain')} value={`+${fmt(fixed,language)}`} tone="accent"/><Result label={t('Depois dos fixos','After fixed sources')} value={fmt(afterFixed,language)}/><Result label={t('Resin por carga da árvore','Tree source per load')} value={fmt(source,language)}/><Result label={t('Cargas completas','Full tree loads')} value={loads}/><Result label={t('Projeção final','Projected final')} value={fmt(projected,language)}/></div>
    {target>cap&&<Notice kind="warn">{t(`Sua Resin Chamber Lv.${level} guarda ${fmt(cap,language)}. A meta de ${fmt(target,language)} não cabe inteira sem gastar Resin durante o caminho ou melhorar a chamber.`,`Your Lv.${level} Resin Chamber stores ${fmt(cap,language)}. The ${fmt(target,language)} target cannot be held all at once unless you spend Resin along the way or upgrade the chamber.`)}</Notice>}
    <Notice>{t('Termite Nest também abre 30 minutos sem termites na árvore. O timer reinicia, não acumula, e Resin da árvore não é coletada offline.','Termite Nest also opens a 30-minute termite-free tree window. The timer resets rather than stacking, and tree Resin is not collected offline.')}</Notice>
    <details className="xt-formula"><summary>{t('Fórmula','Formula')}</summary><p>{t('Ganho fixo = Daily + Termites marcados + 2.000 × escolhas de Resin na Beehive. Cargas = teto((meta − atual − fixos) ÷ Resin por source do seu nível).','Fixed gain = Daily + selected Termites + 2,000 × Beehive Resin choices. Loads = ceil((target − current − fixed sources) ÷ Resin per source at your level).')}</p></details>
  </Frame>;
}

function GemBudgetTool(){
  const {language,t}=useLanguage();
  const defaults={current:0,earlySlots:3,laterSlots:0,boost25:0,boost50:0,daily:10};
  const [state,setState,reset]=usePersistentState('pa-tool-gem-budget-v1',defaults);
  const current=Math.max(0,Number(state.current)||0),early=clamp(state.earlySlots,0,9),later=clamp(state.laterSlots,0,66),b25=Math.max(0,Math.floor(Number(state.boost25)||0)),b50=Math.max(0,Math.floor(Number(state.boost50)||0)),daily=Math.max(0,Number(state.daily)||0);
  const slots=early*200+later*400,fusion=b25*300+b50*500,total=slots+fusion,short=Math.max(0,total-current),days=daily>0?Math.ceil(short/daily):null;
  return <Frame id="gem-budget" icon="💎" title={t('Orçamento de Gems','Gem budget planner')} desc={t('Planeje gastos permanentes e boosts antes de usar Gems em conveniência.','Plan permanent spending and boosts before using Gems on convenience.')} sources={['gems']} onReset={reset}>
    <div className="xt-form-grid"><Field label={t('Gems atuais','Current Gems')} value={state.current} onChange={v=>setState(s=>({...s,current:Math.max(0,Number(v)||0)}))}/><Field label={t('Slots de 200 Gems restantes','200-Gem slots remaining')} value={state.earlySlots} min={0} max={9} onChange={v=>setState(s=>({...s,earlySlots:clamp(v,0,9)}))}/><Field label={t('Slots de 400 Gems restantes','400-Gem slots remaining')} value={state.laterSlots} min={0} max={66} onChange={v=>setState(s=>({...s,laterSlots:clamp(v,0,66)}))}/><Field label={t('Boosts +25% planejados','Planned +25% boosts')} value={state.boost25} min={0} onChange={v=>setState(s=>({...s,boost25:Math.max(0,Math.floor(Number(v)||0))}))}/><Field label={t('Boosts +50% planejados','Planned +50% boosts')} value={state.boost50} min={0} onChange={v=>setState(s=>({...s,boost50:Math.max(0,Math.floor(Number(v)||0))}))}/><Field label={t('Gems/dia usadas na estimativa','Gems/day used in estimate')} value={state.daily} min={0} onChange={v=>setState(s=>({...s,daily:Math.max(0,Number(v)||0)}))} help={t('10 = pacote das 4 Daily Quests. Outros ganhos não são somados automaticamente.','10 = the 4 Daily Quests package. Other gains are not added automatically.')}/></div>
    <div className="xt-results" aria-live="polite"><Result label={t('Custo de slots','Slot cost')} value={fmt(slots,language)}/><Result label={t('Custo de fusão','Fusion cost')} value={fmt(fusion,language)}/><Result label={t('Plano total','Total plan')} value={fmt(total,language)} tone="accent"/><Result label={t('Déficit','Shortage')} value={fmt(short,language)} tone={short?'warn':''}/><Result label={t('Dias na taxa escolhida','Days at selected rate')} value={days==null?'—':days}/></div>
    <Notice>{t('A wiki atual recomenda priorizar storage slots, boosts de fusão importantes e Creature Lab. Compras de comida, Battle Tokens e spawn de Aphid Farm costumam ter valor pior.','The current wiki recommends prioritizing storage slots, important fusion boosts and Creature Lab. Food, Battle Token and Aphid Farm spawn purchases are usually poorer value.')}</Notice>
    <Notice kind="warn">{t('Esta ferramenta não inclui custos de Creature Lab, eventos ou compras especiais. Ela calcula apenas o que você marcou.','This tool does not include Creature Lab, event or special-purchase costs. It only calculates what you selected.')}</Notice>
  </Frame>;
}

function EventPointsTool(){
  const {language,t}=useLanguage();
  const defaults={target:1000,redQueens:0,honeydew:0,acorns:0,pheromones:0,ads:0,processed:0};
  const [state,setState,reset]=usePersistentState('pa-tool-event-points-v1',defaults);
  const n=key=>Math.max(0,Math.floor(Number(state[key])||0));
  const target=Math.max(1,n('target')),red=n('redQueens')*200,honey=n('honeydew'),acorns=n('acorns')*20,pher=n('pheromones'),ads=n('ads'),processed=n('processed');
  const total=red+honey+acorns+pher+ads+processed,remaining=Math.max(0,target-total),pct=Math.min(100,Math.round(total/target*100));
  return <Frame id="event-points" icon="🎉" title={t('Calculadora de pontos de evento','Event points calculator')} desc={t('Use o template recorrente de Major Events e troque a meta conforme a edição atual.','Use the recurring Major Event template and change the target for the current edition.')} sources={['event','faq']} onReset={reset}>
    <div className="xt-event-warning"><AlertTriangle size={19}/><div><b>{t('Template histórico — não é tabela garantida do evento atual','Historical template — not a guaranteed table for the current event')}</b><p>{t('Eventos mudam. Confira a tela/regras da edição atual antes de gastar Gems ou recursos com base neste cálculo.','Events change. Check the current edition screen/rules before spending Gems or resources based on this calculation.')}</p></div></div>
    <div className="xt-form-grid"><Field label={t('Meta de pontos','Point target')} value={state.target} min={1} onChange={v=>setState(s=>({...s,target:Math.max(1,Number(v)||1)}))}/><Field label={t('Red Ant Queens × 200','Red Ant Queens × 200')} value={state.redQueens} min={0} onChange={v=>setState(s=>({...s,redQueens:Math.max(0,Number(v)||0)}))}/><Field label={t('Honeydew de Aphid × 1','Aphid Honeydew × 1')} value={state.honeydew} min={0} onChange={v=>setState(s=>({...s,honeydew:Math.max(0,Number(v)||0)}))}/><Field label={t('Acorns × 20','Acorns × 20')} value={state.acorns} min={0} onChange={v=>setState(s=>({...s,acorns:Math.max(0,Number(v)||0)}))}/><Field label={t('Pheromones × 1','Pheromones × 1')} value={state.pheromones} min={0} onChange={v=>setState(s=>({...s,pheromones:Math.max(0,Number(v)||0)}))}/><Field label={t('Anúncios de Battle Token × 1','Battle Token ads × 1')} value={state.ads} min={0} onChange={v=>setState(s=>({...s,ads:Math.max(0,Number(v)||0)}))}/><Field label={t('Fonte do evento processada × 1','Processed event source × 1')} value={state.processed} min={0} onChange={v=>setState(s=>({...s,processed:Math.max(0,Number(v)||0)}))}/></div>
    <div className="xt-progress" aria-label={`${pct}%`}><div style={{width:`${pct}%`}}/></div><div className="xt-results" aria-live="polite"><Result label={t('Pontos calculados','Calculated points')} value={fmt(total,language)} tone="accent"/><Result label={t('Faltam','Remaining')} value={fmt(remaining,language)}/><Result label={t('Progresso','Progress')} value={`${pct}%`}/><Result label="Red Ants" value={fmt(red,language)}/><Result label="Acorns" value={fmt(acorns,language)}/></div>
    <details className="xt-formula"><summary>{t('Template usado','Template used')}</summary><p>{t('Padrão visto em vários Major Events: Red Ant Queen 200; Acorn 20; Honeydew de Aphid, Pheromone, anúncio de Battle Token e item processado da fonte do evento = 1 cada. Cada edição pode substituir ou remover fontes.','Pattern seen across several Major Events: Red Ant Queen 200; Acorn 20; Aphid Honeydew, Pheromone, Battle Token ad and processed event-source item = 1 each. Each edition may replace or remove sources.')}</p></details>
  </Frame>;
}

function clanPhase(now=new Date()){
  const day=now.getUTCDay(),hour=now.getUTCHours();
  if(day===5&&hour<22)return 'registration';
  if(day===5)return 'matchmaking';
  if(day===6)return 'preparation';
  if(day===0)return 'war';
  if(day===1)return 'results';
  return 'between';
}
function ClanWeekTool(){
  const {t}=useLanguage();
  const defaults={registered:false,defense:false,attack1:false,attack2:false,superqueen:false,claimed:false};
  const [state,setState,reset]=usePersistentState('pa-tool-clan-week-v1',defaults);
  const phase=clanPhase();
  const labels={registration:t('Registro · sexta 00:00–22:00 UTC','Registration · Friday 00:00–22:00 UTC'),matchmaking:t('Matchmaking · sexta 22:00–24:00 UTC','Matchmaking · Friday 22:00–24:00 UTC'),preparation:t('Preparação · sábado','Preparation · Saturday'),war:t('War Day · domingo','War Day · Sunday'),results:t('Resultados e recompensa · segunda','Results and rewards · Monday'),between:t('Entre guerras · terça a quinta','Between wars · Tuesday to Thursday')};
  const tasks=[['registered',t('Confirmar registro na guerra','Confirm war registration')],['defense',t('Revisar defesa durante a preparação','Review defense during preparation')],['attack1',t('Ataque 1 ao ninho inimigo','Attack 1 on enemy nest')],['attack2',t('Ataque 2 ao ninho inimigo','Attack 2 on enemy nest')],['superqueen',t('Ataque à base / Superqueen','Attack clan base / Superqueen')],['claimed',t('Coletar a recompensa de Silk','Claim Silk reward')]];
  const done=tasks.filter(([key])=>state[key]).length,pct=Math.round(done/tasks.length*100);
  return <Frame id="clan-week" icon="🧵" title={t('Semana de Clan Wars','Clan War week')} desc={t('Um calendário UTC + checklist para não perder ataque nem Silk por esquecer a coleta.','A UTC calendar + checklist so you do not lose an attack or Silk by forgetting to claim.')} sources={['war','clan','legions']} onReset={reset}>
    <div className={`xt-phase xt-phase-${phase}`}><small>{t('Fase UTC agora','Current UTC phase')}</small><strong>{labels[phase]}</strong></div>
    <div className="xt-week"><div className={phase==='registration'||phase==='matchmaking'?'active':''}><b>{t('Sex','Fri')}</b><span>{t('Registro / match','Register / match')}</span></div><div className={phase==='preparation'?'active':''}><b>{t('Sáb','Sat')}</b><span>{t('Preparação','Preparation')}</span></div><div className={phase==='war'?'active':''}><b>{t('Dom','Sun')}</b><span>{t('3 ataques','3 attacks')}</span></div><div className={phase==='results'?'active':''}><b>{t('Seg','Mon')}</b><span>{t('Coletar Silk','Claim Silk')}</span></div></div>
    <div className="xt-progress" aria-label={`${pct}%`}><div style={{width:`${pct}%`}}/></div><div className="xt-checklist">{tasks.map(([key,label])=><Toggle key={key} active={Boolean(state[key])} onClick={()=>setState(s=>({...s,[key]:!s[key]))}>{label}</Toggle>)}</div>
    <Notice>{t('Cada participante registrado recebe 3 ataques no domingo: 2 ataques contra nests inimigos e 1 contra a base do clã/Superqueen.','Each registered participant gets 3 Sunday attacks: 2 against enemy nests and 1 against the clan base/Superqueen.')}</Notice>
    <Notice kind="warn">{t('A recompensa precisa ser reivindicada a partir de segunda-feira antes do próximo registro. A wiki alerta que recompensa não coletada é perdida.','The reward must be claimed starting Monday before the next registration. The wiki warns that unclaimed rewards are lost.')}</Notice>
  </Frame>;
}

const COMPONENTS={'aphid-yield':AphidTool,'resin-session':ResinSessionTool,'gem-budget':GemBudgetTool,'event-points':EventPointsTool,'clan-week':ClanWeekTool};

export default function ExtraToolPage({routeId}){
  const Component=COMPONENTS[routeId];
  if(!Component){const record=TOOL_RECORDS.find(x=>x.id===routeId);return <div className="rdb-page"><div className="rdb-empty"><AlertTriangle size={28}/><b>404</b><span>{record?.title?.pt||routeId}</span><a href="#/tools">Tools</a></div></div>;}
  return <Component/>;
}
