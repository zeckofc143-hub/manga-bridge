import React,{useEffect,useMemo,useRef,useState} from 'react';
import {
  AlertTriangle,BookOpen,Calculator,Check,ChevronLeft,ChevronRight,Circle,Download,ExternalLink,
  Filter,Gauge,Info,RotateCcw,Search,ShieldCheck,Sparkles,Target,Upload,Wrench
} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {allCatalogCreatures} from './creatureCatalogData';
import {creatureName} from './i18nCore';
import {usePersistentState,writeStoredJson} from './usePersistentState';
import {
  DAILY_ACTIVITIES,FUSION_BASE,FUSION_CLAN,FUSION_COST,FUSION_GEMS,FUSION_HD,
  LEGION_SLOT_COSTS,LEGION_SPECIES,QUEEN_UPGRADES,RESIN_STORAGE,
  TOOL_GOALS,TOOL_META,TOOL_RECORDS,TOOL_SOURCE_URLS
} from './toolResearchData';
import './resourceDatabasePage.css';
import './toolDatabasePage.css';

const tr=(value,language)=>value&&typeof value==='object'?(language==='en'?(value.en??value.pt):(value.pt??value.en)):value;
const fmt=(n,language)=>Number(n||0).toLocaleString(language==='en'?'en-US':'pt-BR');
const normalize=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const readHeaderQuery=()=>new URLSearchParams((window.location.hash.split('?')[1]||'')).get('dbq')||'';
const toolById=id=>TOOL_RECORDS.find(tool=>tool.id===id);
const sumField=(items,field)=>items.reduce((sum,item)=>sum+(item?.[field]||0),0);

function categoryLabel(id,t){
  return ({combat:t('Combate','Combat'),progression:t('Progressão','Progression'),farm:t('Farm','Farming'),routine:t('Rotina','Routine'),late:t('Late game','Late game'),tracker:t('Coleção','Collection')})[id]||id;
}

function SourceLink({sourceKey,label,t}){
  const href=TOOL_SOURCE_URLS[sourceKey];
  if(!href)return null;
  return <a className="td-source" href={href} target="_blank" rel="noreferrer"><BookOpen size={14}/>{label||t('Fonte','Source')}<ExternalLink size={12}/></a>;
}

function NumberField({label,value,onChange,min=0,max,step=1,help}){
  const {t}=useLanguage();
  const invalid=Number(value)<min || (max!=null&&Number(value)>max) || !Number.isFinite(Number(value));
  const id=useMemo(()=>`td-${Math.random().toString(36).slice(2,8)}`,[]);
  return <label className={`td-field ${invalid?'has-error':''}`} htmlFor={id}>
    <span>{label}</span>
    <input id={id} type="number" inputMode="decimal" min={min} max={max} step={step} value={value} aria-invalid={invalid||undefined} onChange={e=>onChange(Number(e.target.value))}/>
    {help&&<small>{help}</small>}
    {invalid&&<small className="td-field-error">{t('Use um valor dentro do limite mostrado.','Use a value within the shown limit.')}</small>}
  </label>;
}

function SelectField({label,value,onChange,children,help}){
  const id=useMemo(()=>`td-${Math.random().toString(36).slice(2,8)}`,[]);
  return <label className="td-field" htmlFor={id}><span>{label}</span><select id={id} value={value} onChange={e=>onChange(e.target.value)}>{children}</select>{help&&<small>{help}</small>}</label>;
}

function Result({label,value,sub,tone='normal'}){
  return <div className={`td-result td-result-${tone}`}><span>{label}</span><strong>{value}</strong>{sub&&<small>{sub}</small>}</div>;
}

function Formula({title,children}){
  const {t}=useLanguage();
  return <details className="td-formula"><summary><Info size={15}/><span>{title||t('Como este resultado é calculado','How this result is calculated')}</span></summary><div>{children}</div></details>;
}

function Status({kind='good',children}){
  return <div className={`td-status ${kind}`} role="status">{kind==='bad'?<AlertTriangle size={18}/>:kind==='info'?<Info size={18}/>:<Check size={18}/>}<span>{children}</span></div>;
}

function ToolFrame({toolId,title,icon,desc,sources=[],onReset,children,formula}){
  const {t}=useLanguage();
  const record=toolById(toolId);
  return <div className="rdb-page td-detail">
    <a className="rdb-back" href="#/tools"><ChevronLeft size={17}/>{t('Voltar para Ferramentas','Back to Tools')}</a>
    <section className="rdb-detail-hero td-hero">
      <div className="rdb-detail-icon">{icon}</div>
      <div className="rdb-detail-copy">
        <div className="rdb-detail-badges"><span>{record?categoryLabel(record.category,t):t('Ferramenta','Tool')}</span><span><ShieldCheck size={13}/>{t('Cálculo local','Local calculation')}</span></div>
        <h1>{title}</h1><p>{desc}</p>
        <div className="td-source-row">{sources.map(source=><SourceLink key={source} sourceKey={source} t={t}/>)}</div>
      </div>
    </section>
    <section className="rdb-panel td-tool-body">
      <div className="td-toolbar"><span><Gauge size={16}/>{t('Resultado atualiza na hora','Results update instantly')}</span>{onReset&&<button type="button" onClick={onReset}><RotateCcw size={15}/>{t('Resetar','Reset')}</button>}</div>
      {children}
      {formula&&<Formula>{formula}</Formula>}
    </section>
  </div>;
}

function FarmTool(){
  const {language,t}=useLanguage();
  const defaults={current:0,target:5000,perRun:250,minutes:8};
  const [state,setState,reset]=usePersistentState('pa-tool-farm-v2',defaults);
  const patch=(key,value)=>setState(current=>({...current,[key]:Math.max(0,Number(value)||0)}));
  const missing=Math.max(0,state.target-state.current);
  const valid=state.perRun>0;
  const runs=valid?Math.ceil(missing/state.perRun):0;
  const total=runs*state.minutes;
  const next=state.perRun>0?Math.min(state.target,state.current+state.perRun):state.current;
  return <ToolFrame toolId="farm" title={t('Planejador de farm','Farm planner')} icon="🌾" desc={t('Use sua média observada. A ferramenta não inventa drop rate e continua útil quando o jogo muda.','Use your observed average. The tool does not invent a drop rate and stays useful when the game changes.')} onReset={reset}>
    <div className="td-form-grid"><NumberField label={t('Tenho agora','Current amount')} value={state.current} onChange={v=>patch('current',v)}/><NumberField label={t('Meta','Target')} value={state.target} onChange={v=>patch('target',v)}/><NumberField label={t('Ganho por run','Gain per run')} value={state.perRun} onChange={v=>patch('perRun',v)} min={1}/><NumberField label={t('Minutos por run','Minutes per run')} value={state.minutes} onChange={v=>patch('minutes',v)} min={0}/></div>
    <div className="td-results" aria-live="polite"><Result label={t('Faltam','Remaining')} value={fmt(missing,language)} tone={missing===0?'success':'normal'}/><Result label={t('Runs necessários','Runs needed')} value={valid?runs:'—'}/><Result label={t('Tempo estimado','Estimated time')} value={valid?`${Math.floor(total/60)}h ${Math.round(total%60)}m`:'—'}/><Result label={t('Após 1 run','After 1 run')} value={fmt(next,language)}/></div>
    {!valid&&<Status kind="bad">{t('Ganho por run precisa ser maior que zero.','Gain per run must be greater than zero.')}</Status>}
    <Formula><p>{t('Faltante = meta − atual. Runs = arredondar o faltante para cima dividido pelo ganho médio informado por você. Tempo = runs × minutos por run.','Remaining = target − current. Runs = remaining divided by your observed average, rounded up. Time = runs × minutes per run.')}</p></Formula>
  </ToolFrame>;
}

function FusionTool(){
  const {language,t}=useLanguage();
  const defaults={star:4,cc:4,hd:0,clan:0,blue:false,rock:false,gem:0};
  const [state,setState,reset]=usePersistentState('pa-tool-fusion-v2',defaults);
  const patch=(key,value)=>setState(current=>({...current,[key]:value}));
  const star=Number(state.star),cc=Number(state.cc),hd=Number(state.hd),clan=Number(state.clan),gem=Number(state.gem);
  const base=FUSION_BASE[star]?.[cc]??0;
  const honey=FUSION_HD[hd]??0;
  const clanBonus=FUSION_CLAN[clan]??0;
  const gemData=FUSION_GEMS[gem]||FUSION_GEMS[0];
  const temporary=(state.blue?5:0)+(state.rock?1:0)+gemData.bonus;
  const raw=base+honey+clanBonus+temporary;
  const chance=Math.min(100,raw);
  const wasted=Math.max(0,raw-100);
  const withoutGem=Math.min(100,raw-gemData.bonus);
  return <ToolFrame toolId="fusion" title={t('Calculadora de fusão','Fusion calculator')} icon="🧬" desc={t('Mostra a fórmula completa, separando chance base, bônus permanentes e boosts temporários.','Shows the full formula, separating base chance, permanent bonuses and temporary boosts.')} sources={['fusion','clan','gems']} onReset={reset}>
    <div className="td-form-grid">
      <SelectField label={t('Fusão alvo','Fusion target')} value={state.star} onChange={v=>patch('star',Number(v))}><option value="2">1★ → 2★</option><option value="3">2★ → 3★</option><option value="4">3★ → 4★</option></SelectField>
      <SelectField label="Creatures Chamber" value={state.cc} onChange={v=>patch('cc',Number(v))}>{[1,2,3,4].map(x=><option key={x} value={x}>Lv.{x}</option>)}</SelectField>
      <SelectField label="Honeydew Fusion Success" value={state.hd} onChange={v=>patch('hd',Number(v))}>{[0,1,2,3,4,5].map(x=><option key={x} value={x}>Lv.{x} (+{FUSION_HD[x]}%)</option>)}</SelectField>
      <SelectField label={t('Bônus de Clan','Clan bonus')} value={state.clan} onChange={v=>patch('clan',Number(v))}><option value="0">0%</option><option value="1">Lv.1–5 · +2%</option><option value="6">Lv.6–11 · +3%</option><option value="12">Lv.12 · +5%</option></SelectField>
      <SelectField label={t('Boost de Gems','Gem boost')} value={state.gem} onChange={v=>patch('gem',Number(v))}><option value="0">0%</option><option value="25">+25% · 300 💎</option><option value="50">+50% · 500 💎</option></SelectField>
    </div>
    <div className="td-toggle-row"><button className={state.blue?'active':''} aria-pressed={state.blue} onClick={()=>patch('blue',!state.blue)} type="button">🌸 Bluebells +5%</button><button className={state.rock?'active':''} aria-pressed={state.rock} onClick={()=>patch('rock',!state.rock)} type="button">🪨 Rock skin +1%</button></div>
    <div className="td-results" aria-live="polite"><Result label={t('Chance base','Base chance')} value={`${base}%`}/><Result label={t('Bônus permanentes','Permanent bonuses')} value={`+${honey+clanBonus}%`}/><Result label={t('Boosts temporários','Temporary boosts')} value={`+${temporary}%`}/><Result label={t('Chance final','Final chance')} value={`${chance}%`} tone={chance===100?'success':'accent'}/><Result label="Body Parts" value={FUSION_COST[star]}/><Result label={t('Gems gastas','Gems spent')} value={fmt(gemData.cost,language)}/></div>
    {wasted>0&&<Status kind="info">{t(`A soma chega a ${raw}%. ${wasted} ponto(s) percentual(is) ficam acima do limite de 100%.`,`The sum reaches ${raw}%. ${wasted} percentage point(s) are above the 100% cap.`)}</Status>}
    {gemData.bonus>0&&withoutGem===100&&<Status kind="info">{t('Você já chega a 100% sem o boost de Gems; neste cenário ele não aumenta a chance final.','You already reach 100% without the Gem boost; in this setup it does not increase the final chance.')}</Status>}
    <Formula><p>{t(`Chance = ${base}% base + ${honey}% Honeydew + ${clanBonus}% Clan + ${state.blue?5:0}% Bluebells + ${state.rock?1:0}% Rock + ${gemData.bonus}% Gems. O resultado é limitado a 100%.`,`Chance = ${base}% base + ${honey}% Honeydew + ${clanBonus}% Clan + ${state.blue?5:0}% Bluebells + ${state.rock?1:0}% Rock + ${gemData.bonus}% Gems. The result is capped at 100%.`)}</p></Formula>
  </ToolFrame>;
}

function QueenResinTool(){
  const {language,t}=useLanguage();
  const defaults={current:5,target:10,resinLv:6};
  const [state,setState,reset]=usePersistentState('pa-tool-queen-resin-v2',defaults);
  const patch=(key,value)=>setState(current=>({...current,[key]:Number(value)}));
  useEffect(()=>{if(state.target<=state.current&&state.current<12)setState(current=>({...current,target:current.current+1}));},[state.current,state.target,setState]);
  const from=Math.max(1,Math.min(11,state.current));
  const to=Math.max(from+1,Math.min(12,state.target));
  const rows=Object.entries(QUEEN_UPGRADES).filter(([level])=>Number(level)>from&&Number(level)<=to).map(([level,data])=>({level:Number(level),...data}));
  const seeds=sumField(rows,'seeds'),resin=sumField(rows,'resin'),hours=sumField(rows,'hours');
  const peak=Math.max(0,...rows.map(row=>row.resin));
  const minResin=Number(Object.entries(RESIN_STORAGE).find(([,cap])=>cap>=peak)?.[0]||12);
  const cap=RESIN_STORAGE[state.resinLv]||0;
  const blocked=peak>cap;
  const finalSoldier=QUEEN_UPGRADES[to]?.soldier||0;
  return <ToolFrame toolId="queen-resin" title={t('Planner Queen ↔ Resin','Queen ↔ Resin planner')} icon="👑" desc={t('Calcula o caminho completo da Queen e mostra exatamente quando a capacidade da Resin Chamber vira gargalo.','Calculates the full Queen path and shows exactly when Resin Chamber capacity becomes the bottleneck.')} sources={['queen','resin']} onReset={reset}>
    <div className="td-form-grid"><SelectField label={t('Queen atual','Current Queen')} value={state.current} onChange={v=>patch('current',v)}>{Array.from({length:11},(_,i)=>i+1).map(x=><option key={x} value={x}>Lv.{x}</option>)}</SelectField><SelectField label={t('Queen alvo','Target Queen')} value={to} onChange={v=>patch('target',v)}>{Array.from({length:11},(_,i)=>i+2).filter(x=>x>from).map(x=><option key={x} value={x}>Lv.{x}</option>)}</SelectField><SelectField label={t('Resin Chamber atual','Current Resin Chamber')} value={state.resinLv} onChange={v=>patch('resinLv',v)}>{Array.from({length:12},(_,i)=>i+1).map(x=><option key={x} value={x}>Lv.{x} · {fmt(RESIN_STORAGE[x],language)}</option>)}</SelectField></div>
    <div className="td-results" aria-live="polite"><Result label={t('Sementes totais','Total seeds')} value={fmt(seeds,language)}/><Result label={t('Resina total','Total resin')} value={fmt(resin,language)}/><Result label={t('Tempo total','Total time')} value={`${Math.floor(hours/24)}d ${Math.round(hours%24)}h`}/><Result label={t('Maior custo único','Largest single cost')} value={fmt(peak,language)}/><Result label={t('Resin Chamber mínima','Minimum Resin Chamber')} value={`Lv.${minResin}`} tone={blocked?'danger':'success'}/><Result label={t('Soldado no final','Final soldier level')} value={`Lv.${finalSoldier}`}/></div>
    <Status kind={blocked?'bad':'good'}>{blocked?t(`Sua capacidade atual é ${fmt(cap,language)}, mas este caminho exige guardar até ${fmt(peak,language)} Resin de uma vez.`,`Your current capacity is ${fmt(cap,language)}, but this path requires holding up to ${fmt(peak,language)} Resin at once.`):t('Sua Resin Chamber atual comporta todos os custos individuais desse caminho.','Your current Resin Chamber can hold every individual cost on this path.')}</Status>
    <Formula><p>{t('Somamos os custos dos níveis da Queen entre o nível atual e o alvo. Para o gargalo, comparamos o maior custo individual de Resin com a capacidade de cada nível da Resin Chamber. A tabela dedicada da Resin Chamber usa 99.999 no Lv.12.','We sum Queen upgrade costs between the current and target levels. For the bottleneck, we compare the largest single Resin cost with each Resin Chamber capacity. The dedicated Resin Chamber table uses 99,999 at Lv.12.')}</p></Formula>
  </ToolFrame>;
}

function TokenTool(){
  const {t}=useLanguage();
  const defaults={current:3,runs:1};
  const [state,setState,reset]=usePersistentState('pa-tool-tokens-v2',defaults);
  const patch=(key,value)=>setState(current=>({...current,[key]:Math.max(0,Number(value)||0)}));
  const cost=state.runs*3;
  const possible=Math.floor(state.current/3);
  const missing=Math.max(0,cost-state.current);
  const affordable=missing===0;
  const after=affordable?state.current-cost:null;
  const resetValue=affordable?(after<3?3:after):null;
  return <ToolFrame toolId="battle-tokens" title={t('Planner de Battle Tokens','Battle Token planner')} icon="🎟️" desc={t('Planeje entradas sem fingir que você consegue gastar tokens que não possui.','Plan entries without pretending you can spend tokens you do not have.')} sources={['tokens','coop']} onReset={reset}>
    <div className="td-form-grid"><NumberField label={t('Tokens agora','Tokens now')} value={state.current} onChange={v=>patch('current',v)}/><NumberField label={t('Entradas planejadas','Planned entries')} value={state.runs} onChange={v=>patch('runs',v)}/></div>
    <div className="td-results" aria-live="polite"><Result label={t('Entradas possíveis agora','Entries possible now')} value={possible}/><Result label={t('Custo planejado','Planned cost')} value={`${cost} 🎟️`}/><Result label={t('Tokens faltando','Missing tokens')} value={missing} tone={missing>0?'danger':'success'}/><Result label={t('Saldo depois','Balance after')} value={after==null?'—':after}/><Result label={t('Após 00:00 UTC','After 00:00 UTC')} value={resetValue==null?'—':resetValue}/></div>
    <Status kind={affordable?'good':'bad'}>{affordable?t('Seu saldo cobre as entradas planejadas. Se terminar abaixo de 3 tokens, o reset diário leva o saldo para 3.','Your balance covers the planned entries. If you end below 3 tokens, the daily reset brings the balance to 3.'):t(`Faltam ${missing} token(s) para executar esse plano.`,`You are ${missing} token(s) short for this plan.`)}</Status>
    <Formula><p>{t('Termite Nest, Crab Beach e Frog Pond usam 3 Battle Tokens por entrada. Às 00:00 UTC, saldos abaixo de 3 voltam para 3; saldos com 3 ou mais permanecem.','Termite Nest, Crab Beach and Frog Pond use 3 Battle Tokens per entry. At 00:00 UTC, balances below 3 reset to 3; balances of 3 or more remain unchanged.')}</p></Formula>
  </ToolFrame>;
}

function DailyTool(){
  const {language,t}=useLanguage();
  const defaults={quests:true,'termite-public':false,'termite-clan':false,'crab-public':false,'crab-clan':false,'frog-public':false};
  const [selected,setSelected,reset]=usePersistentState('pa-tool-daily-v2',defaults);
  const active=DAILY_ACTIVITIES.filter(item=>selected[item.id]);
  const reward={resin:sumField(active.map(x=>x.reward),'resin'),honeydew:sumField(active.map(x=>x.reward),'honeydew'),bodyParts:sumField(active.map(x=>x.reward),'bodyParts'),gems:sumField(active.map(x=>x.reward),'gems'),crabPoint:sumField(active.map(x=>x.reward),'crabPoint'),frogPoint:sumField(active.map(x=>x.reward),'frogPoint'),redSage:sumField(active.map(x=>x.reward),'redSage')};
  const cost={tokens:sumField(active.map(x=>x.cost),'tokens'),leaves:sumField(active.map(x=>x.cost),'leaves'),seeds:sumField(active.map(x=>x.cost),'seeds'),bodyParts:sumField(active.map(x=>x.cost),'bodyParts'),resin:sumField(active.map(x=>x.cost),'resin')};
  const netResin=reward.resin-cost.resin;
  const netParts=reward.bodyParts-cost.bodyParts;
  return <ToolFrame toolId="daily" title={t('Rotina e ganhos diários','Daily routine & gains')} icon="📅" desc={t('Marque o que pretende concluir e veja recompensas fixas e custos de entrada separados.','Mark what you plan to clear and see fixed rewards and entry costs separately.')} sources={['daily','coop']} onReset={reset}>
    <div className="td-activity-grid">{DAILY_ACTIVITIES.map(item=>{const on=Boolean(selected[item.id]);return <button type="button" key={item.id} className={on?'active':''} aria-pressed={on} onClick={()=>setSelected(current=>({...current,[item.id]:!current[item.id]}))}><span className="td-activity-icon">{item.icon}</span><span><strong>{tr(item.label,language)}</strong><small>{item.mode==='clan'?t('Clã','Clan'):item.mode==='public'?t('Público','Public'):t('Diário','Daily')}</small></span>{on?<Check size={17}/>:<Circle size={17}/>}</button>})}</div>
    <h3 className="td-subtitle">{t('Recompensas fixas','Fixed rewards')}</h3>
    <div className="td-results" aria-live="polite"><Result label="Resin" value={fmt(reward.resin,language)}/><Result label="Honeydew" value={fmt(reward.honeydew,language)}/><Result label="Body Parts" value={fmt(reward.bodyParts,language)}/><Result label="Gems" value={fmt(reward.gems,language)}/><Result label={t('Crab points','Crab points')} value={reward.crabPoint}/><Result label={t('Frog points','Frog points')} value={reward.frogPoint}/></div>
    <h3 className="td-subtitle">{t('Custos de entrada','Entry costs')}</h3>
    <div className="td-results"><Result label="Battle Tokens" value={cost.tokens}/><Result label={t('Folhas','Leaves')} value={fmt(cost.leaves,language)}/><Result label={t('Sementes','Seeds')} value={fmt(cost.seeds,language)}/><Result label="Body Parts" value={fmt(cost.bodyParts,language)}/><Result label="Resin" value={fmt(cost.resin,language)}/></div>
    <div className="td-net"><span>{t('Saldo líquido só do que é fixo','Net balance from fixed values only')}</span><b className={netResin<0?'negative':''}>Resin {netResin>=0?'+':''}{fmt(netResin,language)}</b><b className={netParts<0?'negative':''}>Body Parts {netParts>=0?'+':''}{fmt(netParts,language)}</b></div>
    <Status kind="info">{t('Frog Pond custa 3 Tokens + 150 Body Parts + 1.500 Resin; Termite/Crab usam 3 Tokens + 500 Leaves + 500 Seeds. Recompensas variáveis e skins continuam fora da soma.','Frog Pond costs 3 Tokens + 150 Body Parts + 1,500 Resin; Termite/Crab use 3 Tokens + 500 Leaves + 500 Seeds. Variable rewards and skins remain excluded.')}</Status>
  </ToolFrame>;
}

function LegionTool(){
  const {language,t}=useLanguage();
  const defaults={slots:1,resin:0,silk:0,species:{carpenter:false,bullet:false,exploding:false}};
  const [state,setState,reset]=usePersistentState('pa-tool-legions-v2',defaults);
  const slot=LEGION_SLOT_COSTS[state.slots]||LEGION_SLOT_COSTS[1];
  const species=LEGION_SPECIES.filter(item=>state.species?.[item.id]);
  const speciesResin=sumField(species,'resin'),speciesSilk=sumField(species,'silk');
  const totalResin=slot.resin+speciesResin,totalSilk=slot.silk+speciesSilk;
  const missingResin=Math.max(0,totalResin-(state.resin||0)),missingSilk=Math.max(0,totalSilk-(state.silk||0));
  const toggle=id=>setState(current=>({...current,species:{...(current.species||{}),[id]:!current.species?.[id]}}));
  return <ToolFrame toolId="legions" title={t('Planner de Legions','Legions planner')} icon="🛡️" desc={t('Slots e espécies aparecem separados para você enxergar de onde vem cada custo.','Slots and species are separated so you can see where each cost comes from.')} sources={['legions']} onReset={reset}>
    <div className="td-form-grid"><SelectField label={t('Slots desejados','Desired slots')} value={state.slots} onChange={v=>setState(current=>({...current,slots:Number(v)}))}>{[1,2,3,4].map(x=><option key={x} value={x}>{x}</option>)}</SelectField><NumberField label={t('Resin disponível','Available Resin')} value={state.resin} onChange={v=>setState(current=>({...current,resin:Math.max(0,v||0)}))}/><NumberField label={t('Silk disponível','Available Silk')} value={state.silk} onChange={v=>setState(current=>({...current,silk:Math.max(0,v||0)}))}/></div>
    <div className="td-toggle-row">{LEGION_SPECIES.map(item=><button key={item.id} className={state.species?.[item.id]?'active':''} aria-pressed={Boolean(state.species?.[item.id])} onClick={()=>toggle(item.id)} type="button">{item.icon} {item.label}</button>)}</div>
    <div className="td-cost-split"><article><small>{t('Só slots','Slots only')}</small><b>{fmt(slot.resin,language)} Resin</b><span>{fmt(slot.silk,language)} Silk</span></article><article><small>{t('Espécies marcadas','Selected species')}</small><b>{fmt(speciesResin,language)} Resin</b><span>{fmt(speciesSilk,language)} Silk</span></article></div>
    <div className="td-results" aria-live="polite"><Result label={t('Resin total','Total Resin')} value={fmt(totalResin,language)}/><Result label={t('Silk total','Total Silk')} value={fmt(totalSilk,language)}/><Result label={t('Falta Resin','Missing Resin')} value={fmt(missingResin,language)} tone={missingResin?'danger':'success'}/><Result label={t('Falta Silk','Missing Silk')} value={fmt(missingSilk,language)} tone={missingSilk?'danger':'success'}/></div>
    <Status kind="info">{t('A wiki lista o desbloqueio dos slots e o desbloqueio das espécies com custos próprios. O total acima assume que os itens marcados são compras separadas; por isso mostramos as duas parcelas antes da soma.','The wiki lists slot unlocks and species unlocks with their own costs. The total above assumes the selected items are separate purchases, so both parts are shown before the sum.')}</Status>
  </ToolFrame>;
}

function collectionGroup(creature){
  if(creature.category==='event')return 'event';
  if(normalize(creature.rarity).includes('lend'))return 'legendary';
  return 'normal';
}
function rarityLabel(value,t){
  const n=normalize(value);
  if(n.includes('comum')&&!n.includes('incomum'))return t('Comum','Common');
  if(n.includes('incomum'))return t('Incomum','Uncommon');
  if(n.includes('rara'))return t('Rara','Rare');
  if(n.includes('lend'))return t('Lendária','Legendary');
  if(n.includes('especial'))return t('Especial','Special');
  return value;
}

function CollectionTool(){
  const {language,t}=useLanguage();
  const fileRef=useRef(null);
  const [owned,setOwned,resetOwned]=usePersistentState('pa-collection',{});
  const [query,setQuery]=useState('');
  const [group,setGroup]=useState('all');
  const [status,setStatus]=useState('all');
  const [notice,setNotice]=useState('');
  const all=useMemo(()=>allCatalogCreatures.map(creature=>({id:creature.id,name:creatureName(creature.id,creature.name,language),rarity:creature.rarity,group:collectionGroup(creature),icon:creature.category==='event'?'✨':normalize(creature.rarity).includes('lend')?'👑':'🪲'})),[language]);
  const filtered=useMemo(()=>{const q=normalize(query);return all.filter(item=>(!q||normalize(item.name).includes(q))&&(group==='all'||item.group===group)&&(status==='all'||(status==='owned'?owned[item.id]:!owned[item.id])));},[all,query,group,status,owned]);
  const count=all.filter(item=>owned[item.id]).length;
  const stats=['normal','event','legendary'].map(id=>{const items=all.filter(item=>item.group===id);const have=items.filter(item=>owned[item.id]).length;return {id,total:items.length,have,pct:items.length?Math.round(have/items.length*100):0};});
  const setFiltered=value=>setOwned(current=>{const next={...current};filtered.forEach(item=>{next[item.id]=value;});return next;});
  const exportData=()=>{const blob=new Blob([JSON.stringify({version:2,exportedAt:new Date().toISOString(),owned},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='pocket-ants-collection.json';a.click();URL.revokeObjectURL(url);setNotice(t('Backup exportado.','Backup exported.'));};
  const importData=async event=>{const file=event.target.files?.[0];if(!file)return;try{const parsed=JSON.parse(await file.text());const source=parsed?.owned&&typeof parsed.owned==='object'?parsed.owned:parsed;const validIds=new Set(all.map(item=>item.id));const next={...owned};Object.entries(source||{}).forEach(([id,value])=>{if(validIds.has(id))next[id]=Boolean(value);});setOwned(next);setNotice(t('Backup importado sem apagar criaturas desconhecidas.','Backup imported without deleting unknown creatures.'));}catch{setNotice(t('Não consegui ler esse JSON.','Could not read that JSON.'));}event.target.value='';};
  return <ToolFrame toolId="collection" title={t('Coleção de criaturas','Creature collection')} icon="🪲" desc={t('Usa a mesma base moderna da enciclopédia, incluindo criaturas especiais de 2026.','Uses the same modern database as the encyclopedia, including 2026 special creatures.')} onReset={resetOwned}>
    <div className="td-collection-overview"><div className="td-collection-total"><span>{t('Coleção total','Total collection')}</span><strong>{count}/{all.length}</strong><b>{all.length?Math.round(count/all.length*100):0}%</b></div>{stats.map(item=><div key={item.id}><span>{item.id==='normal'?t('Normais','Normal'):item.id==='event'?t('Eventos','Events'):t('Lendárias','Legendary')}</span><strong>{item.have}/{item.total}</strong><i><em style={{width:`${item.pct}%`}}/></i></div>)}</div>
    <div className="td-collection-controls"><label className="rdb-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Filtrar criaturas…','Filter creatures…')}/></label><div className="td-filter-row" role="group" aria-label={t('Filtros da coleção','Collection filters')}><button className={group==='all'?'active':''} onClick={()=>setGroup('all')} type="button">{t('Todas','All')}</button><button className={group==='normal'?'active':''} onClick={()=>setGroup('normal')} type="button">{t('Normais','Normal')}</button><button className={group==='event'?'active':''} onClick={()=>setGroup('event')} type="button">{t('Eventos','Events')}</button><button className={group==='legendary'?'active':''} onClick={()=>setGroup('legendary')} type="button">{t('Lendárias','Legendary')}</button></div><div className="td-filter-row"><button className={status==='all'?'active':''} onClick={()=>setStatus('all')} type="button">{t('Todas','All')}</button><button className={status==='owned'?'active':''} onClick={()=>setStatus('owned')} type="button">{t('Obtidas','Owned')}</button><button className={status==='missing'?'active':''} onClick={()=>setStatus('missing')} type="button">{t('Faltando','Missing')}</button></div></div>
    <div className="td-collection-actions"><button type="button" onClick={()=>setFiltered(true)}><Check size={15}/>{t('Marcar filtradas','Mark filtered')}</button><button type="button" onClick={()=>setFiltered(false)}><Circle size={15}/>{t('Desmarcar filtradas','Unmark filtered')}</button><button type="button" onClick={exportData}><Download size={15}/>{t('Exportar JSON','Export JSON')}</button><button type="button" onClick={()=>fileRef.current?.click()}><Upload size={15}/>{t('Importar JSON','Import JSON')}</button><input ref={fileRef} hidden type="file" accept="application/json,.json" onChange={importData}/></div>
    {notice&&<div className="td-inline-notice" aria-live="polite">{notice}</div>}
    <div className="td-collection" aria-label={t('Lista de criaturas','Creature list')}>{filtered.map(item=>{const isOwned=Boolean(owned[item.id]);return <button type="button" key={item.id} className={isOwned?'owned':''} aria-pressed={isOwned} onClick={()=>setOwned(current=>({...current,[item.id]:!current[item.id]}))}><span className="td-creature-icon">{item.icon}</span>{isOwned?<Check size={16}/>:<Circle size={16}/>}<span><strong>{item.name}</strong><small>{rarityLabel(item.rarity,t)}</small></span></button>})}</div>
    {filtered.length===0&&<div className="rdb-empty"><Search size={24}/><b>{t('Nenhuma criatura nesses filtros','No creatures match these filters')}</b></div>}
  </ToolFrame>;
}

const TOOL_COMPONENTS={fusion:FusionTool,'queen-resin':QueenResinTool,farm:FarmTool,'battle-tokens':TokenTool,daily:DailyTool,legions:LegionTool,collection:CollectionTool};

function ToolHub(){
  const {language,t}=useLanguage();
  const [query,setQuery]=useState(readHeaderQuery);
  const [category,setCategory]=useState('all');
  const [goal,setGoal]=useState('all');
  const [recent]=usePersistentState('pa-tool-recent-v1',null);
  useEffect(()=>{const fn=()=>setQuery(readHeaderQuery());window.addEventListener('hashchange',fn);return()=>window.removeEventListener('hashchange',fn);},[]);
  const goalRecord=TOOL_GOALS.find(item=>item.id===goal);
  const filtered=useMemo(()=>{const q=normalize(query);return TOOL_RECORDS.filter(tool=>(!q||normalize(`${tr(tool.title,language)} ${tr(tool.desc,language)} ${tool.keywords} ${tool.category}`).includes(q))&&(category==='all'||tool.category===category)&&(!goalRecord||goalRecord.tools.includes(tool.id))).sort((a,b)=>a.priority-b.priority);},[query,category,goalRecord,language]);
  const recentTool=toolById(recent);
  const categories=['all','combat','progression','farm','routine','late','tracker'];
  return <div className="rdb-page td-page">
    <section className="rdb-identity td-identity"><div className="rdb-title-row"><span className="rdb-db-icon"><Wrench size={22}/></span><div><span className="rdb-kicker">{t('Ferramentas · decisões, não planilhas','Tools · decisions, not spreadsheets')}</span><h1>{t('Central de Ferramentas','Tools Hub')}</h1></div></div><p>{t('Calculadoras e trackers com estado salvo, fórmula visível e dados revisados. Escolha pelo problema que quer resolver.','Calculators and trackers with saved state, visible formulas and reviewed data. Choose by the problem you want to solve.')}</p><div className="rdb-principles"><span><Calculator size={15}/>{t('Cálculo transparente','Transparent calculations')}</span><span><Target size={15}/>{t('Resposta primeiro','Answer first')}</span><span><ShieldCheck size={15}/>{t('v0.1153 revisada','v0.1153 reviewed')}</span></div></section>

    <section className="td-dashboard"><article><small>{t('Ferramentas','Tools')}</small><strong>{TOOL_RECORDS.length}</strong><span>{t('calculadoras + trackers','calculators + trackers')}</span></article><article><small>{t('Processamento','Processing')}</small><strong>100%</strong><span>{t('no seu aparelho','on your device')}</span></article><article><small>{t('Revisão','Review')}</small><strong>06/09</strong><span>v{TOOL_META.version}</span></article></section>

    {recentTool&&<a className="td-recent" href={`#/tools/${recentTool.id}`}><span>{recentTool.icon}</span><div><small>{t('Continuar de onde parou','Continue where you left off')}</small><b>{tr(recentTool.title,language)}</b><p>{tr(recentTool.outcome,language)}</p></div><ChevronRight size={18}/></a>}

    <section className="td-goals"><div className="td-section-head"><div><Sparkles size={17}/><span><b>{t('O que você quer resolver?','What do you want to solve?')}</b><small>{t('Isso reduz a lista sem esconder a busca.','This narrows the list without hiding search.')}</small></span></div>{goal!=='all'&&<button type="button" onClick={()=>setGoal('all')}>{t('Limpar','Clear')}</button>}</div><div className="td-goal-row"><button className={goal==='all'?'active':''} onClick={()=>setGoal('all')} type="button">✨ {t('Tudo','Everything')}</button>{TOOL_GOALS.map(item=><button className={goal===item.id?'active':''} key={item.id} onClick={()=>setGoal(item.id)} type="button">{item.icon} {tr(item.label,language)}</button>)}</div></section>

    <section className="td-discovery"><label className="rdb-search td-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Buscar fusão, Resin, tokens, coleção…','Search fusion, Resin, tokens, collection…')}/></label><div className="td-category-row" role="group" aria-label={t('Categorias de ferramentas','Tool categories')}><Filter size={15}/>{categories.map(id=><button type="button" key={id} className={category===id?'active':''} onClick={()=>setCategory(id)}>{id==='all'?t('Todas','All'):categoryLabel(id,t)}</button>)}</div></section>

    <section className="td-grid">{filtered.map(tool=><a className="td-card" href={`#/tools/${tool.id}`} key={tool.id}><span className="td-card-icon">{tool.icon}</span><div className="td-card-copy"><div className="td-card-meta"><small>{categoryLabel(tool.category,t)}</small><span>{tr(tool.outcome,language)}</span></div><h2>{tr(tool.title,language)}</h2><p>{tr(tool.desc,language)}</p></div><ChevronRight size={18}/></a>)}</section>
    {filtered.length===0&&<div className="rdb-empty"><Search size={26}/><b>{t('Nenhuma ferramenta encontrada','No tools found')}</b><span>{t('Limpe um filtro ou use outro termo.','Clear a filter or use another term.')}</span></div>}

    <section className="td-trust"><BookOpen size={18}/><div><b>{t(`Base ${TOOL_META.version} · revisada em 06/09/2026`,`Database ${TOOL_META.version} · reviewed 2026-09-06`)}</b><span>{tr(TOOL_META.note,language)}</span></div></section>
  </div>;
}

export default function ToolDatabasePage({routeId}){
  useEffect(()=>{if(routeId&&TOOL_COMPONENTS[routeId])writeStoredJson('pa-tool-recent-v1',routeId);},[routeId]);
  if(!routeId)return <ToolHub/>;
  const Component=TOOL_COMPONENTS[routeId];
  if(!Component)return <div className="rdb-page"><div className="rdb-empty"><AlertTriangle size={28}/><b>404</b><a href="#/tools">{routeId}</a></div></div>;
  return <Component/>;
}
