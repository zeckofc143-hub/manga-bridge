import React from 'react';
import {BookOpen,ChevronRight,Search,ShieldCheck,Sparkles,Target,Wrench} from 'lucide-react';
import {useLanguage} from './LanguageProviderLite';
import {allCatalogCreatures} from './creatureCatalogData';
import {RESOURCE_RECORDS} from './resourceResearchData';
import {CHAMBER_RECORDS} from './chamberResearchData';
import {MECHANIC_RECORDS} from './mechanicResearchData';
import {GUIDE_RECORDS} from './guideResearchData';
import {TOOL_RECORDS} from './toolResearchData';
import {FARM_RECORDS} from './farmResearchData';
import {STRATEGY_RECORDS} from './strategyResearchData';
import {REFERENCE_SECTIONS} from './referenceResearchData';
import './homeV2.css';

const tr=(value,language)=>value&&typeof value==='object'?(language==='en'?(value.en??value.pt):(value.pt??value.en)):value;

export default function HomeV2(){
  const {language,t}=useLanguage();
  const groups=[
    {
      id:'learn',
      label:t('Entender o jogo','Understand the game'),
      help:t('Quando você quer saber o que algo é, onde fica ou como funciona.','When you want to know what something is, where it is or how it works.'),
      items:[
        ['#/creatures','🪲',t('Criaturas','Creatures'),t('Fichas, captura, roles e condições.','Profiles, capture, roles and conditions.'),allCatalogCreatures.length],
        ['#/resources','🍃',t('Recursos','Resources'),t('Onde conseguir, usos e prioridades.','Where to get them, uses and priorities.'),RESOURCE_RECORDS.length],
        ['#/world','🗺️',t('Mundo & Ambiente','World & Environment'),t('Mapa, Garden, Tree, inimigos e objetos.','Map, Garden, Tree, hostiles and objects.'),REFERENCE_SECTIONS.world.records.length],
        ['#/mechanics','⚙️',t('Mecânicas','Mechanics'),t('Regras, timers, combate e sistemas.','Rules, timers, combat and systems.'),MECHANIC_RECORDS.length]
      ]
    },
    {
      id:'progress',
      label:t('Evoluir a conta','Progress your account'),
      help:t('Quando você quer entender progressão, custos e o que vale fazer em seguida.','When you want to understand progression, costs and what is worth doing next.'),
      items:[
        ['#/chambers','🏠',t('Câmaras','Chambers'),t('Níveis, limites e gargalos.','Levels, limits and bottlenecks.'),CHAMBER_RECORDS.length],
        ['#/upgrades','🛒',t('Lojas & Upgrades','Shops & Upgrades'),t('Moedas, custos e bônus permanentes.','Currencies, costs and permanent bonuses.'),REFERENCE_SECTIONS.upgrades.records.length],
        ['#/quests','📜',t('Quests & Recompensas','Quests & Rewards'),t('Daily, login, resets e rewards.','Daily, login, resets and rewards.'),REFERENCE_SECTIONS.quests.records.length],
        ['#/guides','🧭',t('Guias','Guides'),t('Passo a passo por objetivo.','Step-by-step by goal.'),GUIDE_RECORDS.length]
      ]
    },
    {
      id:'act',
      label:t('Decidir e executar','Decide and act'),
      help:t('Quando você já sabe o objetivo e quer uma rota, opinião revisada ou cálculo.','When you know the goal and want a route, reviewed advice or calculation.'),
      items:[
        ['#/farms','🌾','Farms',t('Rotas para conseguir recursos.','Routes to obtain resources.'),FARM_RECORDS.length],
        ['#/strategies','🧠',t('Estratégias','Strategies'),t('Consenso, opiniões e conflitos.','Consensus, opinions and conflicts.'),STRATEGY_RECORDS.length],
        ['#/tools','🧮',t('Ferramentas','Tools'),t('Calculadoras, planners e trackers.','Calculators, planners and trackers.'),TOOL_RECORDS.length],
        ['#/events','🎉',t('Eventos & Histórico','Events & History'),t('Eventos, especiais, seasons e versões.','Events, specials, seasons and versions.'),REFERENCE_SECTIONS.events.records.length]
      ]
    }
  ];
  const quick=[
    ['#/guides/starter-roadmap','🌱',t('Estou começando','I am starting'),t('Siga uma ordem simples sem espalhar recursos.','Follow a simple order without spreading resources.')],
    ['#/farms/resin','🟠',t('Preciso de Resin','I need Resin'),t('Veja a rota prática de Resin.','See the practical Resin route.')],
    ['#/world/garden','🌺',t('Quero entender o Garden','I want to understand the Garden'),t('Plots, flores, água e pets em uma ficha.','Plots, flowers, water and pets in one entry.')],
    ['#/events/events-2026','🎉',t('Quero ver as novidades de 2026','I want 2026 updates'),t('Especiais e eventos já documentados.','Specials and events already documented.')]
  ];
  const tips=['colony-first','resin-window'].map(id=>STRATEGY_RECORDS.find(x=>x.id===id)).filter(Boolean);
  const total=groups.flatMap(group=>group.items).reduce((sum,item)=>sum+(Number(item[4])||0),0);

  return <div className="hv2-page">
    <section className="hv2-hero">
      <div className="hv2-hero-copy">
        <span className="hv2-pill"><Sparkles size={15}/>{t('Enciclopédia + decisão + comunidade','Encyclopedia + decisions + community')}</span>
        <h1>{t('O que você quer resolver no Pocket Ants?','What do you want to solve in Pocket Ants?')}</h1>
        <p>{t('Agora a wiki cobre também mundo, lojas, eventos, quests e recompensas. Comece pelo objetivo; detalhes e fontes ficam disponíveis sem lotar a primeira tela.','The wiki now also covers the world, shops, events, quests and rewards. Start with your goal; details and sources stay available without crowding the first screen.')}</p>
        <div className="hv2-actions"><a className="button primary" href="#/search"><Search size={18}/>{t('Buscar uma coisa específica','Search for something specific')}</a><a className="button secondary" href="#/guides"><BookOpen size={18}/>{t('Não sei o que fazer agora','I do not know what to do next')}</a></div>
      </div>
      <aside className="hv2-confidence" aria-label={t('Como ler a wiki','How to read the wiki')}>
        <ShieldCheck size={22}/><div><b>{t(`${total}+ entradas organizadas em 12 áreas.`,`${total}+ entries organized across 12 areas.`)}</b><p>{t('Fato, estratégia comunitária, conflito e dado incompleto continuam separados.','Facts, community strategy, conflicts and incomplete data remain separated.')}</p></div>
      </aside>
    </section>

    <section className="hv2-section hv2-priority"><div className="hv2-section-head"><div><span>{t('Comece daqui','Start here')}</span><h2>{t('O que você quer resolver agora?','What do you want to solve right now?')}</h2></div></div><div className="hv2-quick">{quick.map(([href,icon,title,desc])=><a href={href} key={href}><span>{icon}</span><div><b>{title}</b><p>{desc}</p></div><ChevronRight size={17}/></a>)}</div></section>

    <section className="hv2-section"><div className="hv2-section-head"><div><span>{t('Mapa da wiki','Wiki map')}</span><h2>{t('Escolha pelo tipo de ajuda','Choose by the kind of help')}</h2></div><a href="#/search">{t('Busca Global','Global Search')} <ChevronRight size={15}/></a></div>
      <div className="hv2-groups">{groups.map(group=><section className={`hv2-group hv2-group-${group.id}`} key={group.id}><header><h3>{group.label}</h3><p>{group.help}</p></header><div className="hv2-grid">{group.items.map(([href,icon,title,desc,count])=><a href={href} className="hv2-category" key={href}><span className="hv2-icon">{icon}</span><div><h4>{title}</h4><p>{desc}</p><small>{count} {t('entradas','entries')}</small></div><ChevronRight size={17}/></a>)}</div></section>)}</div>
    </section>

    <section className="hv2-split"><div><div className="hv2-section-head"><div><span>{t('Comunidade revisada','Reviewed community')}</span><h2>{t('Duas ideias úteis para começar','Two useful ideas to start')}</h2></div><a href="#/strategies">{t('Ver todas','See all')} <ChevronRight size={15}/></a></div><div className="hv2-tips">{tips.map(item=><a href={`#/strategies/${item.id}`} key={item.id}><span>{item.icon}</span><div><b>{tr(item.title,language)}</b><p>{tr(item.summary,language)}</p></div></a>)}</div></div><aside className="hv2-policy"><Target size={23}/><h2>{t('Regra de navegação','Navigation rule')}</h2><p>{t('Quer entender? Consulte as bases. Quer evoluir? Chambers, Upgrades, Quests e Guias. Quer decidir? Farms, Estratégias e Ferramentas.','Want to understand? Use the databases. Want to progress? Chambers, Upgrades, Quests and Guides. Want to decide? Farms, Strategies and Tools.')}</p><a href="#/tools"><Wrench size={16}/>{t('Abrir ferramentas','Open tools')}</a></aside></section>
  </div>;
}
