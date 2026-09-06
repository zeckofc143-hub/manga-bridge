import {MECHANIC_FLOW,MECHANIC_PATHS,MECHANIC_RECORDS,MECHANIC_TIMERS} from './mechanicResearchData';

const L=(pt,en)=>({pt,en});
const get=id=>MECHANIC_RECORDS.find(item=>item.id===id);
const addRecord=record=>{if(!get(record.id))MECHANIC_RECORDS.push(record);};
const addFact=(id,fact)=>{const record=get(id);if(record&&!record.facts.some(item=>item?.pt===fact.pt))record.facts.push(fact);};
const addMistake=(id,item)=>{const record=get(id);if(record&&!record.mistakes.some(entry=>entry?.pt===item.pt))record.mistakes.push(item);};

addFact('battle-tokens',L('Fire Ant Nest, Termite Nest e Crab Beach custam 3 Battle Tokens + 500 Folhas + 500 Sementes por entrada.','Fire Ant Nest, Termite Nest and Crab Beach cost 3 Battle Tokens + 500 Leaves + 500 Seeds per entry.'));
addFact('offline-gathering',L('A coleta offline começa depois de 10 minutos fora do jogo e exige a chamber daquele recurso no nível 2 ou mais.','Offline gathering starts after 10 minutes away and requires that resource chamber at level 2 or higher.'));
addFact('offline-gathering',L('Água tem limite de 500 por sessão offline; Unlimited Sources têm limite conjunto de 2.000 folhas/fungo por sessão.','Water is capped at 500 per offline session; Unlimited Sources have a combined 2,000 leaves/fungus cap per session.'));
addMistake('offline-gathering',L('Fechar o jogo logo após receber a coleta offline sem salvar: a referência alerta que os recursos podem ser perdidos se o jogo fechar antes de salvar.','Closing the game immediately after receiving offline gathering without saving: the reference warns resources can be lost if the game closes before saving.'));
addFact('daily-quests',L('Completar as 4 Daily Quests libera a recompensa maior de 1.500 Resin + 150 Honeydew + 10 Gems.','Completing all 4 Daily Quests unlocks the major reward of 1,500 Resin + 150 Honeydew + 10 Gems.'));
addFact('beehive',L('O máximo diário documentado é 10.000 Resin, 375 Honeydew ou 5 Honeycomb se todas as cinco recompensas forem para a mesma opção.','The documented daily maximum is 10,000 Resin, 375 Honeydew or 5 Honeycomb if all five rewards use the same option.'));
addFact('fire-ant-nest',L('A entrada custa 3 Battle Tokens, 500 Folhas e 500 Sementes; as 15 chambers somam 150 Honeydew numa conclusão completa.','Entry costs 3 Battle Tokens, 500 Leaves and 500 Seeds; all 15 chambers total 150 Honeydew on a full clear.'));
addFact('termite-nest',L('A entrada usa o mesmo custo-base de dungeon: 3 Battle Tokens, 500 Folhas e 500 Sementes.','Entry uses the same dungeon base cost: 3 Battle Tokens, 500 Leaves and 500 Seeds.'));
addFact('capture',L('Só pode haver 1 criatura viva no mapa por vez (incluindo uma sendo capturada) e até 5 cadáveres; matar mais faz o cadáver mais antigo sumir.','Only 1 live creature can be on the map at a time (including one being captured) and up to 5 corpses; killing more removes the oldest corpse.'));
addFact('garden',L('Uma flor precisa ser regada duas vezes; após cada rega há cerca de 30 minutos de crescimento.','A flower needs to be watered twice; after each watering there is about 30 minutes of growth.'));
addFact('garden',L('Os custos de água documentados por rega são 50 no grupo Water Lv.1, 500 no grupo Lv.6 e 1.500 no grupo Lv.10.','Documented water costs per watering are 50 for the Water Lv.1 group, 500 for the Lv.6 group and 1,500 for the Lv.10 group.'));
addFact('clan-wars',L('A semana de guerra segue UTC: sexta registro/matchmaking, sábado preparação, domingo guerra e segunda resultados/recompensas.','The war week follows UTC: Friday registration/matchmaking, Saturday preparation, Sunday war and Monday results/rewards.'));
addFact('clan-wars',L('No War Day cada participante tem 3 ataques: 2 em nests inimigos e 1 na base/Superqueen.','On War Day each participant has 3 attacks: 2 on enemy nests and 1 on the base/Superqueen.'));
addFact('legions',L('Existem 4 Legion slots: o primeiro custa 50.000 Resin e os três seguintes custam 5.000 Silk cada.','There are 4 Legion slots: the first costs 50,000 Resin and the next three cost 5,000 Silk each.'));

addRecord({
  id:'acorns',icon:'🌰',name:L('Acorns e limite diário','Acorns & daily limit'),category:'farm',stage:'all',source:'reviewed',kind:'daily',
  summary:L('Acorns aparecem pelo mapa e funcionam como pequenas fontes aleatórias de recursos com um limite diário simples de acompanhar.','Acorns spawn around the map and act as small random resource sources with a simple daily collection cap.'),
  facts:[L('Só 1 Acorn pode existir no mapa por vez; ao coletar, outro pode aparecer em outro lugar.','Only 1 Acorn can exist on the map at once; after collecting it, another can spawn elsewhere.'),L('O limite é 10 Acorns por dia e reseta às 00:00 UTC.','The limit is 10 Acorns per day and resets at 00:00 UTC.'),L('Eles aparecem no minimapa, não no mapa grande.','They appear on the minimap, not the large map.')],
  steps:[L('Olhe o minimapa enquanto cruza o mapa.','Watch the minimap while moving around the map.'),L('Colete até 10 quando sua rotina permitir.','Collect up to 10 when your routine allows.')],
  mistakes:[L('Procurar só no mapa grande e achar que não há Acorn disponível.','Looking only at the large map and assuming no Acorn is available.')],
  related:{resources:['leaves','seeds','fungus','body-parts','gems'],chambers:[],creatures:[]},search:'Acorns'
});

addRecord({
  id:'frog-pond',icon:'🐸',name:L('Frog Pond','Frog Pond'),category:'coop',stage:'mid-late',source:'reviewed',kind:'battle',
  summary:L('Co-op de coordenação ligado ao Garden e à água, com recompensa forte de Honeydew e progresso para obter o Frog.','A coordination co-op tied to Garden and water, with a strong Honeydew reward and progress toward obtaining the Frog.'),
  facts:[L('Derrotar o Frog rende 250 Honeydew, 1 Red Sage seed e 1 ponto na barra de co-op do Frog.','Defeating the Frog yields 250 Honeydew, 1 Red Sage seed and 1 point on the Frog co-op bar.'),L('A vitória também concede um período em que o Frog não mata workers enviados à água.','Victory also grants a period when the Frog does not kill workers sent to gather water.'),L('É um co-op público; a referência atual não oferece modo dedicado de clã.','It is a public co-op; the current reference does not list a dedicated clan mode.')],
  steps:[L('Entre preparado para coordenação, não só dano bruto.','Enter prepared for coordination, not just raw damage.'),L('Use como rota de Honeydew quando Garden/Frog também forem seus objetivos.','Use it as a Honeydew route when Garden/Frog are also your goals.')],
  mistakes:[L('Ignorar a mecânica de bloquear veneno e deixar passar sementes durante a fase das flores.','Ignoring the poison-blocking mechanic and failing to let seeds pass during the flower phase.')],
  related:{resources:['honeydew','water'],chambers:['water'],creatures:['frog']},search:'Frog Pond'
});

addRecord({
  id:'vinegaroon',icon:'🦂',name:L('Vinegaroon e Body Parts','Vinegaroon & Body Parts'),category:'farm',stage:'mid',source:'reviewed',kind:'timer',
  summary:L('Vinegaroon transforma o nível/capacidade da Body Parts Chamber em uma fonte recorrente de partes de criatura.','Vinegaroon turns Body Parts Chamber level/capacity into a recurring source of creature parts.'),
  facts:[L('O Vinegaroon começa a aparecer quando a Body Parts Chamber chega ao nível 6 ou mais.','Vinegaroon begins appearing when the Body Parts Chamber reaches level 6 or higher.'),L('A recompensa é aproximadamente 4% da capacidade máxima atual da Body Parts Chamber.','The reward is roughly 4% of the current Body Parts Chamber maximum capacity.')],
  steps:[L('Chegue ao marco Lv.6 da Body Parts Chamber.','Reach the Body Parts Chamber Lv.6 milestone.'),L('Use a recompensa como complemento para fusão e upgrades, sem esquecer o gargalo Resin/Creatures.','Use the reward as a supplement for fusion and upgrades while keeping the Resin/Creatures bottleneck in mind.')],
  mistakes:[L('Gastar todas as partes em Creature Lab e faltar para Resin Chamber.','Spending all parts on Creature Lab and then lacking enough for Resin Chamber.')],
  related:{resources:['body-parts'],chambers:['body-parts','resin','creatures'],creatures:[]},search:'Vinegaroon'
});

addRecord({
  id:'daily-rewards',icon:'🎁',name:L('Daily Rewards','Daily Rewards'),category:'farm',stage:'all',source:'reviewed',kind:'daily',
  summary:L('A recompensa de login segue o reset das 00:00 UTC e escala parte de Fungus/Leaves/Seeds com a quantidade de workers.','The login reward follows the 00:00 UTC reset and scales some Fungus/Leaves/Seeds rewards with worker count.'),
  facts:[L('A tela aparece no primeiro login após o reset de 00:00 UTC.','The screen appears on the first login after the 00:00 UTC reset.'),L('O ciclo de 7 dias inclui Body Parts no dia 3 e, no dia 7, Body Parts, Pink Pheromones e Gems.','The 7-day cycle includes Body Parts on day 3 and Body Parts, Pink Pheromones and Gems on day 7.'),L('Fungus, Leaves e Seeds são multiplicados pela quantidade de workers conforme o multiplicador do dia.','Fungus, Leaves and Seeds are multiplied by worker count according to that day multiplier.')],
  steps:[L('Colete após o reset e mantenha workers/economia em mente para entender o valor real.','Collect after reset and keep worker count/economy in mind to understand the real value.')],
  mistakes:[L('Confundir Daily Rewards de login com as 4 Daily Quests.','Confusing login Daily Rewards with the 4 Daily Quests.')],
  related:{resources:['fungus','leaves','seeds','body-parts','pheromones','gems'],chambers:['food-processing'],creatures:[]},search:'Daily Rewards'
});

addRecord({
  id:'creature-map-limits',icon:'🗺️',name:L('Limites de criaturas no mapa','Creature map limits'),category:'creatures',stage:'early-mid',source:'reviewed',kind:'system',
  summary:L('O mapa limita quantas criaturas vivas e cadáveres podem coexistir, o que muda a forma de organizar captura e farm de Body Parts.','The map limits how many live creatures and corpses can coexist, changing how you organize capture and Body Parts farming.'),
  facts:[L('Há no máximo 1 criatura viva no mapa por vez, contando uma criatura em processo de captura.','There can be at most 1 live creature on the map at a time, including one being captured.'),L('Até 5 cadáveres podem ficar no mapa; ao criar outro, o mais antigo desaparece.','Up to 5 corpses can remain on the map; creating another removes the oldest one.')],
  steps:[L('Antes de matar mais criaturas, confira se há cadáver antigo que você ainda quer colher.','Before killing more creatures, check whether an old corpse still needs harvesting.'),L('Planeje captura e kill/farm para não bloquear o próximo spawn desejado.','Plan capture and kill/farm so you do not block the next desired spawn.')],
  mistakes:[L('Acumular cadáveres e perder o mais antigo ao passar do limite.','Stockpiling corpses and losing the oldest one after exceeding the limit.')],
  related:{resources:['body-parts','pheromones'],chambers:['creatures','body-parts'],creatures:[]},search:'FAQ creatures map limit'
});

if(!MECHANIC_TIMERS.some(item=>item.id==='acorn-reset'))MECHANIC_TIMERS.push({id:'acorn-reset',icon:'🌰',title:L('Acorns','Acorns'),value:L('10/dia · 00:00 UTC','10/day · 00:00 UTC'),note:L('Um por vez no mapa; contador fica nas Daily Quests.','One at a time on the map; counter is in Daily Quests.'),mechanic:'acorns'});
if(!MECHANIC_TIMERS.some(item=>item.id==='offline-start'))MECHANIC_TIMERS.push({id:'offline-start',icon:'🌙',title:L('Offline Gathering','Offline Gathering'),value:L('Após 10 min','After 10 min'),note:L('Exige a chamber do recurso no Lv.2+; Resin fica de fora.','Requires the resource chamber at Lv.2+; Resin is excluded.'),mechanic:'offline-gathering'});
if(!MECHANIC_TIMERS.some(item=>item.id==='clan-week'))MECHANIC_TIMERS.push({id:'clan-week',icon:'🏳️',title:L('Clan War','Clan War'),value:L('Sex → Seg (UTC)','Fri → Mon (UTC)'),note:L('Registro, preparação, guerra e resultados em dias separados.','Registration, preparation, war and results on separate days.'),mechanic:'clan-wars'});

if(!MECHANIC_FLOW.some(edge=>edge.from==='frog-pond'))MECHANIC_FLOW.push({from:'frog-pond',to:'honeydew',label:L('gera 250','yields 250')});
if(!MECHANIC_FLOW.some(edge=>edge.from==='vinegaroon'))MECHANIC_FLOW.push({from:'vinegaroon',to:'body-parts',label:L('gera partes','yields parts')});
if(!MECHANIC_FLOW.some(edge=>edge.from==='acorns'))MECHANIC_FLOW.push({from:'acorns',to:'leaves',label:L('pode render','can yield')});

if(MECHANIC_PATHS.daily&&!MECHANIC_PATHS.daily.ids.includes('acorns'))MECHANIC_PATHS.daily.ids.splice(1,0,'acorns');
if(MECHANIC_PATHS.honeydew&&!MECHANIC_PATHS.honeydew.ids.includes('frog-pond'))MECHANIC_PATHS.honeydew.ids.splice(3,0,'frog-pond');

export const MECHANIC_ACTIVITY_COMPARISON=[
  {id:'termite-nest',icon:'🪵',name:L('Termite Nest','Termite Nest'),cost:L('3 tokens + 500 folhas + 500 sementes','3 tokens + 500 leaves + 500 seeds'),reward:L('2.000 Resin + 30 min sem termites','2,000 Resin + 30 min no termites'),best:L('Resin','Resin')},
  {id:'fire-ant-nest',icon:'🔥',name:L('Fire Ant Nest','Fire Ant Nest'),cost:L('3 tokens + 500 folhas + 500 sementes','3 tokens + 500 leaves + 500 seeds'),reward:L('Até 150 Honeydew','Up to 150 Honeydew'),best:L('Honeydew + desafio solo','Honeydew + solo challenge')},
  {id:'crab-beach',icon:'🦀',name:L('Crab Beach','Crab Beach'),cost:L('3 tokens + 500 folhas + 500 sementes','3 tokens + 500 leaves + 500 seeds'),reward:L('100 Body Parts + progresso do Crab','100 Body Parts + Crab progress'),best:L('Body Parts','Body Parts')},
  {id:'frog-pond',icon:'🐸',name:L('Frog Pond','Frog Pond'),cost:L('Co-op público','Public co-op'),reward:L('250 Honeydew + Red Sage + progresso do Frog','250 Honeydew + Red Sage + Frog progress'),best:L('Honeydew + Garden/Frog','Honeydew + Garden/Frog')}
];

export const CLAN_WAR_TIMELINE=[
  {day:L('Sexta','Friday'),time:'00:00–22:00 UTC',title:L('Registro','Registration'),text:L('A queen registra o clã e escolhe 12v12, 25v25 ou 50v50.','The queen registers the clan and chooses 12v12, 25v25 or 50v50.')},
  {day:L('Sexta','Friday'),time:'22:00–23:59 UTC',title:L('Matchmaking','Matchmaking'),text:L('O jogo procura um clã adversário por tier e poder geral.','The game searches for an opponent by tier and overall power.')},
  {day:L('Sábado','Saturday'),time:L('Dia inteiro','All day'),title:L('Preparação','Preparation'),text:L('Organize defesa, alvos e estratégia.','Organize defense, targets and strategy.')},
  {day:L('Domingo','Sunday'),time:L('Dia inteiro','All day'),title:L('Guerra','War'),text:L('Cada participante faz 3 ataques: 2 nests + 1 base/Superqueen.','Each participant makes 3 attacks: 2 nests + 1 base/Superqueen.')},
  {day:L('Segunda','Monday'),time:L('Após a guerra','After war'),title:L('Resultados','Results'),text:L('Silk e recompensas precisam ser coletadas antes do próximo registro.','Silk and rewards must be claimed before the next registration.')}
];
