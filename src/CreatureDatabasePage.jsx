import React, { Suspense, lazy, useState } from 'react';
import { Database, Filter, Search, Rows3, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import CreatureEncyclopediaPageV3, { encyclopediaCreatures } from './CreatureEncyclopediaPageV3';
import './creatureDatabasePage.css';
import './creatureMotion.css';

const CreatureToolsHub = lazy(()=>import('./CreatureToolsHubV2').then(mod=>({default:mod.CreatureToolsHub})));
const CreatureRecordPanel = lazy(()=>import('./CreatureToolsHubV2').then(mod=>({default:mod.CreatureRecordPanel})));
const CreatureAdvancedPanel = lazy(()=>import('./CreatureAdvancedPanel'));

function LazyFallback(){
  return <div className="creature-db-lazy-fallback" aria-live="polite">Carregando…</div>;
}

export default function CreatureDatabasePage({ routeId = null }) {
  const [toolsOpen,setToolsOpen] = useState(false);
  const activeCreature = routeId ? encyclopediaCreatures.find(c => c.id === routeId) : null;

  return <div className={`creature-db-root ${routeId ? 'db-detail' : 'db-list'}`}>
    {!routeId && <section className="creature-db-identity" aria-labelledby="creature-db-title">
      <div className="creature-db-title-row">
        <span className="creature-db-icon"><Database size={22}/></span>
        <div>
          <span className="creature-db-kicker">Criaturas</span>
          <h1 id="creature-db-title">Banco de Dados de Criaturas</h1>
        </div>
      </div>
      <p>Banco completo de criaturas com imagens, descrição, obtenção, stats, habilidades, eventos, fontes e ferramentas pessoais. A Central de Criaturas continua disponível, mas agora só carrega quando você abrir.</p>
      <div className="creature-db-principles" aria-label="Recursos do banco de dados">
        <span><Rows3 size={15}/> Registros completos</span>
        <span><Filter size={15}/> Filtros + coleção</span>
        <span><Search size={15}/> Busca + planners</span>
      </div>
      <button className="creature-db-tools-toggle" type="button" aria-expanded={toolsOpen} onClick={()=>setToolsOpen(v=>!v)}>
        <span><Wrench size={17}/>{toolsOpen?'Fechar Central de Criaturas':'Abrir Central de Criaturas'}</span>
        {toolsOpen?<ChevronUp size={18}/>:<ChevronDown size={18}/>} 
      </button>
    </section>}

    {!routeId && toolsOpen && <Suspense fallback={<LazyFallback/>}><CreatureToolsHub creatures={encyclopediaCreatures}/></Suspense>}
    <CreatureEncyclopediaPageV3 routeId={routeId}/>
    {routeId && activeCreature && <Suspense fallback={<LazyFallback/>}>
      <CreatureAdvancedPanel creature={activeCreature}/>
      <CreatureRecordPanel creature={activeCreature} creatures={encyclopediaCreatures}/>
    </Suspense>}
  </div>;
}
