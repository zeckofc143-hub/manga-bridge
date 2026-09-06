import React from 'react';
import {BookOpen,ChevronRight,Database,Search,ShieldCheck,Sparkles,Target,Wrench} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {allCatalogCreatures} from './creatureCatalogData';
import {RESOURCE_RECORDS} from './resourceResearchData';
import {CHAMBER_RECORDS} from './chamberResearchData';
import {MECHANIC_RECORDS} from './mechanicResearchData';
import {GUIDE_RECORDS} from './guideResearchData';
import {TOOL_RECORDS} from './toolResearchData';
import {FARM_RECORDS} from './farmResearchData';
import {STRATEGY_RECORDS} from './strategyResearchData';
import './homeV2.css';

const tr=(value,language)=>value&&typeof value==='object'?(language==='en'?(value.en??value.pt):(value.pt??value.en)):value;

export default function HomeV2(){
  const {language,t}=useLanguage();
  const categories=[
    ['#/creatures','🪲',t('Criaturas','Creatures'),t('Captura, raridade, condições e fichas.','Capture, rarity, conditions and profiles.'),allCatalogCreatures.length],
    ['#/resources','🍃',t('Recursos','Resources'),t('Onde conseguir, usos e prioridades.','Where to get them, uses and priorities.'),RESOURCE_RECORDS.length],
    ['#/chambers','🏠',t('Câmaras','Chambers'),t('Níveis, gargalos e dependências.','Levels, bottlenecks and dependencies.'),CHAMBER_RECORDS.length],
    ['#/mechanics','⚙️',t('Mecânicas','Mechanics'),t('Sistemas, timers, co-op e combate.','Systems, timers, co-op and combat.'),MECHANIC_RECORDS.length],
    ['#/guides','🧭',t('Guias','Guides'),t('Rotas por fase, objetivo e problema.','Routes by stage, goal and problem.'),GUIDE_RECORDS.length],
    ['#/tools','🧮',t('Ferramentas','Tools'),t('Calculadoras, planners e trackers.','Calculators, planners and trackers.'),TOOL_RECORDS.length],
    ['#/farms','🌾','Farms',t('Resin, Honeydew, Gems, Silk e mais.','Resin, Honeydew, Gems, Silk and more.'),FARM_RECORDS.length],
    ['#/strategies','🧠',t('Estratégias','Strategies'),t('Consenso, dicas e conflitos da comunidade.','Community consensus, tips and conflicts.'),STRATEGY_RECORDS.length]
  ];
  const quick=[
    ['#/guides/starter-roadmap','🌱',t('Estou começando','I am starting'),t('Uma rota limpa para não espalhar recursos cedo.','A clean route so you do not spread resources too early.')],
    ['#/farms/resin','🟠',t('Preciso de Resin','I need Resin'),t('Daily + Termite + árvore + Beehive em uma ordem prática.','Daily + Termite + tree + Beehive in a practical order.')],
    ['#/tools/gem-budget','💎',t('Quero economizar Gems','I want to save Gems'),t('Veja slots, boosts e déficit antes de gastar.','See slots, boosts and shortage before spending.')],
    ['#/tools/clan-week','🧵',t('Estou em Clan Wars','I am in Clan Wars'),t('Fase UTC, 3 ataques e coleta de Silk.','UTC phase, 3 attacks and Silk claim.')]
  ];
  const tips=['colony-first','resin-window','gem-priority','organized-coops'].map(id=>STRATEGY_RECORDS.find(x=>x.id===id)).filter(Boolean);

  return <div className="hv2-page">
    <section className="hv2-hero"><div className="hv2-hero-copy"><span className="hv2-pill"><Sparkles size={15}/>{t('Wiki organizada para decidir rápido','A wiki organized for fast decisions')}</span><h1>{t('Pocket Ants sem ficar caçando informação em vinte lugares.','Pocket Ants without hunting information across twenty places.')}</h1><p>{t('Dados, farms, estratégias da comunidade e ferramentas ficam separados pelo tipo de confiança — para você encontrar a resposta e saber de onde ela veio.','Data, farms, community strategies and tools are separated by confidence type — so you can find the answer and know where it came from.')}</p><div className="hv2-actions"><a className="button primary" href="#/guides"><BookOpen size={18}/>{t('Começar pelos guias','Start with guides')}</a><a className="button secondary" href="#/search"><Search size={18}/>{t('Buscar na wiki','Search the wiki')}</a></div><div className="hv2-trust"><span><ShieldCheck size={15}/>{t('Fatos separados de opinião','Facts separated from opinion')}</span><span><Database size={15}/>{t('Fontes visíveis','Visible sources')}</span><span><Target size={15}/>{t('Ferramentas com fórmula','Tools with formulas')}</span></div></div><aside className="hv2-snapshot"><small>{t('Base atual','Current database')}</small><strong>{categories.reduce((sum,x)=>sum+x[4],0)}+</strong><span>{t('entradas entre 8 áreas modernas','entries across 8 modern areas')}</span><div><b>{TOOL_RECORDS.length}</b><span>{t('ferramentas','tools')}</span><b>{FARM_RECORDS.length}</b><span>farms</span><b>{STRATEGY_RECORDS.length}</b><span>{t('estratégias','strategies')}</span></div></aside></section>

    <section className="hv2-section"><div className="hv2-section-head"><div><span>{t('Explorar','Explore')}</span><h2>{t('Escolha o tipo de resposta','Choose the kind of answer')}</h2></div><a href="#/search">{t('Busca Global','Global Search')} <ChevronRight size={15}/></a></div><div className="hv2-grid">{categories.map(([href,icon,title,desc,count])=><a href={href} className="hv2-category" key={href}><span className="hv2-icon">{icon}</span><div><small>{count} {t('entradas','entries')}</small><h3>{title}</h3><p>{desc}</p></div><ChevronRight size={18}/></a>)}</div></section>

    <section className="hv2-section"><div className="hv2-section-head"><div><span>{t('Atalhos','Shortcuts')}</span><h2>{t('O que você quer resolver agora?','What do you want to solve now?')}</h2></div></div><div className="hv2-quick">{quick.map(([href,icon,title,desc])=><a href={href} key={href}><span>{icon}</span><div><b>{title}</b><p>{desc}</p></div><ChevronRight size={17}/></a>)}</div></section>

    <section className="hv2-split"><div><div className="hv2-section-head"><div><span>{t('Comunidade revisada','Reviewed community')}</span><h2>{t('Dicas que aparecem de novo e de novo','Advice that keeps coming up')}</h2></div><a href="#/strategies">{t('Ver todas','See all')} <ChevronRight size={15}/></a></div><div className="hv2-tips">{tips.map(item=><a href={`#/strategies/${item.id}`} key={item.id}><span>{item.icon}</span><div><b>{tr(item.title,language)}</b><p>{tr(item.summary,language)}</p></div></a>)}</div></div><aside className="hv2-policy"><ShieldCheck size={24}/><h2>{t('Uma regra simples da wiki','One simple wiki rule')}</h2><p>{t('Se é número confirmado, aparece como dado. Se é conselho de jogador, aparece como estratégia. Se a comunidade discorda, o conflito fica visível.','If it is a confirmed number, it appears as data. If it is player advice, it appears as strategy. If the community disagrees, the conflict stays visible.')}</p><a href="#/tools"><Wrench size={16}/>{t('Abrir ferramentas','Open tools')}</a></aside></section>
  </div>;
}
