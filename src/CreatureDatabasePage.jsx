import React from 'react';
import { Database, Filter, Search, Rows3 } from 'lucide-react';
import CreatureEncyclopediaPageV3 from './CreatureEncyclopediaPageV3';
import './creatureDatabasePage.css';

export default function CreatureDatabasePage({ routeId = null }) {
  return <div className={`creature-db-root ${routeId ? 'db-detail' : 'db-list'}`}>
    {!routeId && <section className="creature-db-identity" aria-labelledby="creature-db-title">
      <div className="creature-db-title-row">
        <span className="creature-db-icon"><Database size={22}/></span>
        <div>
          <span className="creature-db-kicker">Criaturas</span>
          <h1 id="creature-db-title">Banco de Dados de Criaturas</h1>
        </div>
      </div>
      <p>Este é o banco de dados completo da categoria Criaturas. Cada card abaixo é um registro com imagem, descrição, obtenção, stats, habilidade, origem, tutorial e fonte. As abas apenas filtram o banco — não abrem outra enciclopédia.</p>
      <div className="creature-db-principles" aria-label="Recursos do banco de dados">
        <span><Rows3 size={15}/> Registros completos</span>
        <span><Filter size={15}/> Filtros por tipo e obtenção</span>
        <span><Search size={15}/> Busca em todos os campos</span>
      </div>
    </section>}
    <CreatureEncyclopediaPageV3 routeId={routeId}/>
  </div>;
}
