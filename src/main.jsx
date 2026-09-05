import React from 'react';
import ReactDOM from 'react-dom/client';
import './creatureAuditRuntime';
import App from './App';
import Enhancements from './Enhancements';
import AdvancedPlanner from './AdvancedPlanner';
import CommunityResearchHub from './CommunityResearchHub';
import CreatureCatalog from './CreatureCatalog';
import LegacyCreatureImages from './LegacyCreatureImages';
import './index.css';
import './creatureCatalogV2.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Enhancements />
    <AdvancedPlanner />
    <CommunityResearchHub />
    <CreatureCatalog />
    <LegacyCreatureImages />
  </React.StrictMode>
);
