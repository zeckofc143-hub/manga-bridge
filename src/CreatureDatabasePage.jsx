import React from 'react';
import { Database, Filter, Search, Rows3 } from 'lucide-react';
import CreatureEncyclopediaPageV3, { encyclopediaCreatures } from './CreatureEncyclopediaPageV3';
import { CreatureToolsHub, CreatureRecordPanel } from './CreatureToolsHub';
import CreatureAdvancedPanel from './CreatureAdvancedPanel';
import './creatureDatabasePage.css';
import './creatureMotion.css';

export default function CreatureDatabasePage({ routeId = null }) {
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
      <p>Banco completo de criaturas com imagens, descrição, obtenção, stats, habilidades, eventos, fontes e ferramentas pessoais. Use a Central de Criaturas para montar coleção, planejar captura, comparar criaturas, organizar exército, calcular fusão/Lab e acompanhar lendárias.</p>
      <div className="creature-db-principles" aria-label="Recursos do banco de dados">
        <span><Rows3 size={15}/> Registros completos</span>
        <span><Filter size={15}/> Filtros + coleção</span>
        <span><Search size={15}/> Busca + planners</span>
      </div>
    </section>}

    {!routeId && <CreatureToolsHub creatures={encyclopediaCreatures}/>} 
    <CreatureEncyclopediaPageV3 routeId={routeId}/>
    {routeId && activeCreature && <CreatureAdvancedPanel creature={activeCreature}/>} 
    {routeId && activeCreature && <CreatureRecordPanel creature={activeCreature} creatures={encyclopediaCreatures}/>} 
  </div>;
}
