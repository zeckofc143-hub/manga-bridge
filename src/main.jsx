import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Enhancements from './Enhancements';
import AdvancedPlanner from './AdvancedPlanner';
import CommunityResearchHub from './CommunityResearchHub';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Enhancements />
    <AdvancedPlanner />
    <CommunityResearchHub />
  </React.StrictMode>
);
