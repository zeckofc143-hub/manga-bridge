import {MECHANIC_RECORDS} from './mechanicResearchData';

const L=(pt,en)=>({pt,en});
const get=id=>MECHANIC_RECORDS.find(item=>item.id===id);
const addFact=(id,fact)=>{const record=get(id);if(record&&!record.facts.some(item=>item?.pt===fact.pt))record.facts.push(fact);};

const acorns=get('acorns');
if(acorns){
  acorns.related.resources=['leaves','fungus','seeds'];
  addFact('acorns',L('Acorns normais rendem Leaves, Fungus ou Seeds; a referência estima cerca de 7% da capacidade da chamber correspondente.','Regular Acorns yield Leaves, Fungus or Seeds; the reference estimates roughly 7% of the corresponding chamber capacity.'));
  acorns.mistakes=[L('Coletar com a chamber cheia: a recompensa daquele Acorn pode ser perdida.','Collecting while the chamber is full: that Acorn reward can be lost.'),...acorns.mistakes];
}

const vinegaroon=get('vinegaroon');
if(vinegaroon){
  addFact('vinegaroon',L('É um mini-boss de fim de semana e pode reaparecer em ciclos de aproximadamente 4 horas durante o período ativo.','It is a weekend mini-boss and can reappear in roughly 4-hour cycles during the active period.'));
  addFact('vinegaroon',L('Ele não pode ser capturado e não ataca até você iniciar a luta.','It cannot be captured and does not attack until you start the fight.'));
}

// These records contain detailed community mechanics, so label the whole profile conservatively.
for(const id of ['capture','pvp','red-ants']){
  const record=get(id);
  if(record)record.source='reviewed';
}
