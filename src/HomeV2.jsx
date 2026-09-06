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
import './homeV2.css';

const tr=(value,language)=>value&&typeof value==='object'?(language==='en'?(value.en??value.pt):(value.pt??value.en)):value;

export default function HomeV2(){
  const {language,t}=useLanguage();
  const groups=[
    {
      id:'learn',
      label:t('Consultar o jogo','Look things up'),
      help:t('Quando você quer entender o que algo é, onde consegue ou como funciona.','When you want to understand what something is, where to get it or how it works.'),
      items:[
        ['#/creatures','🪲',t('Criaturas','Creatures'),t('Fichas, captura e condições.','Profiles, capture and conditions.'),allCatalogCreatures.length],
        ['#/resources','🍃',t('Recursos','Resources'),t('Onde conseguir e onde gastar.','Where to get and spend them.'),RESOURCE_RECORDS.length],
        ['#/chambers','🏠',t('Câmaras','Chambers'),t('Níveis, limites e gargalos.','Levels, limits and bottlenecks.'),CHAMBER_RECORDS.length],
        ['#/mechanics','⚙️',t('Mecânicas','Mechanics'),t('Regras, timers e sistemas.','Rules, timers and systems.'),MECHANIC_RECORDS.length]
      ]
    },
    {
      id:'decide',
      label:t('Decidir o próximo passo','Decide what to do next'),
      help:t('Quando você está travado ou quer uma rota prática em vez de teoria.','When you are stuck or want a practical route instead of theory.'),
      items:[
        ['#/guides','🧭',t('Guias','Guides'),t('Passo a passo por objetivo.','Step-by-step by goal.'),GUIDE_RECORDS.length],
        ['#/farms','🌾','Farms',t('Rotas para conseguir recursos.','Routes to obtain resources.'),FARM_RECORDS.length],
        ['#/strategies','🧠',t('Estratégias','Strategies'),t('Consenso e dicas da comunidade.','Community consensus and tips.'),STRATEGY_RECORDS.length]
      ]
    },
    {
      id:'act',
      label:t('Calcular e acompanhar','Calculate and track'),
      help:t('Quando você já sabe o objetivo e quer transformar seus números em decisão.','When you know the goal and want to turn your numbers into a decision.'),
      items:[['#/tools','🧮',t('Ferramentas','Tools'),t('Calculadoras, planners e trackers.','Calculators, planners and trackers.'),TOOL_RECORDS.length]]
    }
  ];
  const quick=[
    ['#/guides/starter-roadmap','🌱',t('Estou começando','I am starting'),t('Siga uma ordem simples sem espalhar recursos.','Follow a simple order without spreading resources.')],
    ['#/farms/resin','🟠',t('Preciso de Resin','I need Resin'),t('Veja a rota prática de Resin.','See the practical Resin route.')],
    ['#/tools/gem-budget','💎',t('Quero economizar Gems','I want to save Gems'),t('Planeje antes de gastar.','Plan before spending.')],
    ['#/tools/clan-week','🧵',t('Estou em Clan Wars','I am in Clan Wars'),t('Veja a fase atual e o checklist.','See the current phase and checklist.')]
  ];
  const tips=['colony-first','resin-window'].map(id=>STRATEGY_RECORDS.find(x=>x.id===id)).filter(Boolean);

  return <div className="hv2-page">
    <section className="hv2-hero">
      <div className="hv2-hero-copy">
        <span className="hv2-pill"><Sparkles size={15}/>{t('Encontre a resposta sem decorar a wiki','Find the answer without memorizing the wiki')}</span>
        <h1>{t('O que você quer resolver no Pocket Ants?','What do you want to solve in Pocket Ants?')}</h1>
        <p>{t('Comece pelo objetivo. A wiki mostra o essencial primeiro e deixa detalhes, fontes e teoria para quando você quiser aprofundar.','Start with your goal. The wiki shows the essentials first and leaves details, sources and theory for when you want to go deeper.')}</p>
        <div className="hv2-actions"><a className="button primary" href="#/search"><Search size={18}/>{t('Buscar uma coisa específica','Search for something specific')}</a><a className="button secondary" href="#/guides"><BookOpen size={18}/>{t('Não sei o que fazer agora','I do not know what to do next')}</a></div>
      </div>
      <aside className="hv2-confidence" aria-label={t('Como ler a wiki','How to read the wiki')}>
        <ShieldCheck size={22}/><div><b>{t('Você não precisa adivinhar o que é fato.','You do not need to guess what is a fact.')}</b><p>{t('Dados confirmados, estratégia da comunidade e conflitos aparecem separados.','Confirmed data, community strategy and conflicts are shown separately.')}</p></div>
      </aside>
    </section>

    <section className="hv2-section hv2-priority"><div className="hv2-section-head"><div><span>{t('Comece daqui','Start here')}</span><h2>{t('O que está acontecendo com você agora?','What is happening for you right now?')}</h2></div></div><div className="hv2-quick">{quick.map(([href,icon,title,desc])=><a href={href} key={href}><span>{icon}</span><div><b>{title}</b><p>{desc}</p></div><ChevronRight size={17}/></a>)}</div></section>

    <section className="hv2-section"><div className="hv2-section-head"><div><span>{t('Mapa da wiki','Wiki map')}</span><h2>{t('Escolha pelo tipo de ajuda','Choose by the kind of help')}</h2></div><a href="#/search">{t('Busca Global','Global Search')} <ChevronRight size={15}/></a></div>
      <div className="hv2-groups">{groups.map(group=><section className={`hv2-group hv2-group-${group.id}`} key={group.id}><header><h3>{group.label}</h3><p>{group.help}</p></header><div className="hv2-grid">{group.items.map(([href,icon,title,desc,count])=><a href={href} className="hv2-category" key={href}><span className="hv2-icon">{icon}</span><div><h4>{title}</h4><p>{desc}</p><small>{count} {t('entradas','entries')}</small></div><ChevronRight size={17}/></a>)}</div></section>)}</div>
    </section>

    <section className="hv2-split"><div><div className="hv2-section-head"><div><span>{t('Comunidade revisada','Reviewed community')}</span><h2>{t('Duas ideias úteis para começar','Two useful ideas to start')}</h2></div><a href="#/strategies">{t('Ver todas','See all')} <ChevronRight size={15}/></a></div><div className="hv2-tips">{tips.map(item=><a href={`#/strategies/${item.id}`} key={item.id}><span>{item.icon}</span><div><b>{tr(item.title,language)}</b><p>{tr(item.summary,language)}</p></div></a>)}</div></div><aside className="hv2-policy"><Target size={23}/><h2>{t('Regra de navegação','Navigation rule')}</h2><p>{t('Quer entender? Consulte. Quer decidir? Abra um guia, farm ou estratégia. Quer calcular? Use Ferramentas.','Want to understand? Look it up. Want to decide? Open a guide, farm or strategy. Want to calculate? Use Tools.')}</p><a href="#/tools"><Wrench size={16}/>{t('Abrir ferramentas','Open tools')}</a></aside></section>
  </div>;
}
