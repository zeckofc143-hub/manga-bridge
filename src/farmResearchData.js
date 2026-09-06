const L=(pt,en)=>({pt,en});

export const FARM_META={
  version:'0.1153',
  checkedAt:'2026-09-06',
  note:L('Farms combinam dados atuais da wiki comunitária, descrição oficial e estratégias recentes de jogadores. Números fixos ficam separados de dicas e estimativas.','Farms combine current community-wiki data, the official description and recent player strategies. Fixed numbers stay separate from tips and estimates.')
};

export const FARM_SOURCES={
  resin:'https://pocketants.fandom.com/wiki/Resin',
  faq:'https://pocketants.fandom.com/wiki/FAQ',
  aphid:'https://pocketants.fandom.com/wiki/Aphid_Farm',
  coop:'https://pocketants.fandom.com/wiki/Co-op_Mode',
  gems:'https://pocketants.fandom.com/wiki/Gems',
  clans:'https://pocketants.fandom.com/wiki/Clans',
  wars:'https://pocketants.fandom.com/wiki/Clan_Wars',
  legions:'https://pocketants.fandom.com/wiki/Legions',
  redditBeginner:'https://www.reddit.com/r/PocketAnts/comments/1q0o9tt/tips_for_newbies/',
  redditFire:'https://www.reddit.com/r/PocketAnts/comments/1tsvd1j/fire_ants/',
  redditGems:'https://www.reddit.com/r/PocketAnts/comments/1uxxqp7/help/'
};

export const FARM_RECORDS=[
  {
    id:'resin',icon:'🟠',name:L('Farm de Resin','Resin farming'),category:'economy',stage:'early-late',confidence:'high',
    summary:L('O melhor ciclo conhecido junta Daily Quests, Termite Nest, a janela de 30 minutos sem termites, árvore e Beehive quando Resin for seu gargalo.','The strongest known loop combines Daily Quests, Termite Nest, the 30-minute termite-free window, the tree and Beehive when Resin is your bottleneck.'),
    facts:[
      L('Completar as 4 Daily Quests rende 1.500 Resin.','Completing all 4 Daily Quests awards 1,500 Resin.'),
      L('Termite Nest rende 2.000 Resin e 30 minutos sem termites na árvore; o timer não acumula, ele reinicia.','Termite Nest awards 2,000 Resin and 30 minutes with no termites in the tree; the timer does not stack, it resets.'),
      L('Escolher Resin na Beehive rende 2.000 Resin; até 5 recompensas da Beehive podem ser coletadas por dia.','Choosing Resin at the Beehive awards 2,000 Resin; up to 5 Beehive rewards can be claimed per day.'),
      L('A Resin da árvore não é coletada offline.','Tree Resin is not gathered offline.')
    ],
    route:[
      L('Faça as Daily Quests se estiverem disponíveis.','Complete Daily Quests when available.'),
      L('Conclua Termite Nest e entre na árvore logo depois para aproveitar os 30 minutos inteiros.','Finish Termite Nest and enter the tree right after to use the full 30-minute window.'),
      L('Use Beehive como complemento quando Resin estiver bloqueando Queen/Resin Shop.','Use Beehive as a supplement when Resin is blocking Queen/Resin Shop progression.'),
      L('Se estiver em clã ativo, aproveite a oportunidade adicional de co-op do clã.','If you are in an active clan, use the additional clan co-op opportunity.')
    ],
    communityTips:[
      L('Jogadores recomendam não “gastar” a janela de 30 min fazendo outras coisas: termine o Termite e vá direto à árvore.','Players recommend not wasting the 30-minute window on other tasks: finish Termite and go straight to the tree.'),
      L('Se você farma a árvore com frequência, a FAQ recomenda Garrison de pelo menos 15 formigas.','If you farm the tree often, the FAQ recommends a Garrison of at least 15 ants.')
    ],
    avoid:[L('Fechar o jogo esperando coleta offline de Resin.','Closing the game expecting offline Resin gathering.')],
    links:[['resin','Wiki: Resin'],['faq','Wiki: FAQ'],['redditFire','Reddit: resin/Termite']]
  },
  {
    id:'honeydew',icon:'🍯',name:L('Farm de Honeydew','Honeydew farming'),category:'economy',stage:'early-late',confidence:'high',
    summary:L('Honeydew é lenta: o caminho estável usa Daily Quests, Aphid Farms e Frog Pond; Beehive e Fire Ant Nest entram como fontes extras.','Honeydew is slow: the stable route uses Daily Quests, Aphid Farms and Frog Pond; Beehive and Fire Ant Nest are extra sources.'),
    facts:[
      L('As 4 Daily Quests rendem 150 Honeydew.','All 4 Daily Quests award 150 Honeydew.'),
      L('Aphid Farm reaparece 6 horas após a anterior ser derrotada.','Aphid Farm respawns 6 hours after the previous one is defeated.'),
      L('Cada convoy tem 10 aphids; o multiplicador pode chegar a 15 Honeydew por aphid, totalizando até 150.','Each convoy has 10 aphids; the multiplier can reach 15 Honeydew per aphid, totaling up to 150.'),
      L('Frog Pond rende 250 Honeydew.','Frog Pond awards 250 Honeydew.')
    ],
    route:[
      L('Faça Daily Quests todos os dias.','Do Daily Quests every day.'),
      L('Construa Honeydew Chamber para começar a gerar Aphid Farms.','Build the Honeydew Chamber to start spawning Aphid Farms.'),
      L('Proteja o máximo possível dos 10 carriers; cada perda reduz a recompensa.','Protect as many of the 10 carriers as possible; each loss reduces the reward.'),
      L('Quando seu estágio permitir, use Frog Pond como pico de 250 Honeydew.','When your progression allows it, use Frog Pond for a 250-Honeydew spike.')
    ],
    communityTips:[
      L('A wiki registra como conselho comum comprar upgrades baratos de Honeydew primeiro e depois acelerar o Honeydew Multiplier; nível 5 chega a x10.','The wiki records common advice to buy cheap Honeydew upgrades first and then push the Honeydew Multiplier; level 5 reaches x10.'),
      L('Na defesa do convoy, separar os Fire Ants antes de derrubar todos reduz perdas; Garrison pode acompanhar o caminho.','For convoy defense, pulling Fire Ants in small groups before finishing them reduces losses; Garrison can support the route.')
    ],
    avoid:[L('Gastar Gems para spawnar Aphid Farm por rotina; a comunidade costuma considerar pouco eficiente.','Spending Gems to spawn Aphid Farms routinely; the community usually considers it poor value.')],
    links:[['aphid','Wiki: Aphid Farm'],['faq','Wiki: FAQ'],['redditGems','Reddit: Gem value']]
  },
  {
    id:'body-parts',icon:'🧩',name:L('Farm de Body Parts','Body Parts farming'),category:'economy',stage:'early-late',confidence:'high',
    summary:L('Body Parts vêm de criaturas derrotadas, Crab Beach e Vinegaroon; no começo, capturar criaturas faltantes pode valer mais do que transformar tudo em partes.','Body Parts come from defeated creatures, Crab Beach and Vinegaroon; early on, capturing missing creatures can be more valuable than turning everything into parts.'),
    facts:[
      L('Crab Beach rende 100 Body Parts e 1 ponto da barra do Crab.','Crab Beach awards 100 Body Parts and 1 Crab bar point.'),
      L('Vinegaroon é um mini-boss de fim de semana e concede Body Parts automaticamente ao morrer.','Vinegaroon is a weekend miniboss and automatically grants Body Parts when defeated.'),
      L('A recompensa do Vinegaroon depende do nível da Body Parts Chamber.','Vinegaroon reward depends on Body Parts Chamber level.')
    ],
    route:[
      L('Capture primeiro criaturas que ainda fortalecem sua coleção/army.','Capture creatures that still strengthen your collection/army first.'),
      L('Converta cadáveres excedentes em Body Parts.','Convert surplus corpses into Body Parts.'),
      L('Use Crab Beach quando já puder completar o co-op com consistência.','Use Crab Beach once you can clear the co-op consistently.'),
      L('Nos fins de semana, inclua Vinegaroon na rotina se conseguir derrotá-lo com perdas aceitáveis.','On weekends, include Vinegaroon if you can defeat it with acceptable losses.')
    ],
    communityTips:[L('Para contas muito novas e com poucos slots/creatures, jogadores recentes recomendam priorizar capturas antes de farmar partes agressivamente.','For very new accounts with few slots/creatures, recent players recommend prioritizing captures before aggressively farming parts.')],
    avoid:[L('Queimar Body Parts cedo em progressões secundárias e depois travar Resin/Creature progression.','Burning Body Parts early on secondary progression and later stalling Resin/Creature progression.')],
    links:[['coop','Wiki: Co-op'],['redditBeginner','Reddit: beginner priorities']]
  },
  {
    id:'gems',icon:'💎',name:L('Farm e economia de Gems','Gem farming & economy'),category:'currency',stage:'all',confidence:'high',
    summary:L('Gems são escassas; a parte importante não é só farmar, mas evitar usos que atrasam slots, fusões importantes e Creature Lab.','Gems are scarce; the key is not only earning them but avoiding spending that delays slots, important fusions and Creature Lab.'),
    facts:[
      L('Completar as 4 Daily Quests rende 10 Gems.','Completing all 4 Daily Quests awards 10 Gems.'),
      L('O 7º dia consecutivo de login rende 10 Gems.','The 7th consecutive login day awards 10 Gems.'),
      L('Os primeiros 9 creature storage slots custam 200 Gems cada; os slots posteriores custam 400.','The first 9 creature storage slots cost 200 Gems each; later slots cost 400.'),
      L('Boosts de fusão custam 300 Gems (+25%) ou 500 Gems (+50%).','Fusion boosts cost 300 Gems (+25%) or 500 Gems (+50%).')
    ],
    route:[
      L('Pegue o pacote diário de Gems sempre que possível.','Collect the daily Gem package whenever possible.'),
      L('Mantenha uma reserva para slots e fusões raras/especiais antes de comprar conveniência.','Keep a reserve for slots and rare/special fusions before convenience purchases.'),
      L('Use o planner de Gems para visualizar o custo de longo prazo.','Use the Gem planner to see the long-term cost.')
    ],
    communityTips:[L('Wiki e jogadores recentes convergem em priorizar storage slots e boosts de fusão de alto valor.','Wiki and recent players converge on prioritizing storage slots and high-value fusion boosts.')],
    avoid:[L('Comprar comida, Battle Tokens, Aphid Farm ou outros atalhos com Gems sem um motivo específico.','Buying food, Battle Tokens, Aphid Farm or other shortcuts with Gems without a specific reason.')],
    links:[['gems','Wiki: Gems'],['redditGems','Reddit: spending advice']]
  },
  {
    id:'water',icon:'💧',name:L('Farm de Water','Water farming'),category:'garden',stage:'mid-late',confidence:'reviewed',
    summary:L('Water alimenta Garden e rare seeds. O Frog Pond também pode remover o Frog até o próximo reset, deixando a coleta da lagoa mais segura.','Water feeds Garden and rare seeds. Frog Pond can also remove the Frog until the next reset, making pond gathering safer.'),
    facts:[
      L('Water Storage aumenta a capacidade e afeta a chance de rare seeds.','Water Storage increases capacity and affects rare-seed chance.'),
      L('A recompensa do Frog Pond inclui “no frog” até o próximo reset diário.','Frog Pond reward includes “no frog” until the next daily reset.')
    ],
    route:[L('Quando Garden virar objetivo, mantenha workers em Water e aproveite o no-frog após Frog Pond.','When Garden becomes a goal, keep workers on Water and use the no-frog window after Frog Pond.')],
    communityTips:[L('Não force Garden cedo se Queen/Resin ainda forem gargalos maiores.','Do not force Garden early if Queen/Resin are still larger bottlenecks.')],
    avoid:[L('Tratar Water como prioridade universal de early game.','Treating Water as a universal early-game priority.')],
    links:[['coop','Wiki: Frog Pond / Co-op'],['redditBeginner','Reddit: progression priorities']]
  },
  {
    id:'silk',icon:'🧵',name:L('Farm de Silk','Silk farming'),category:'clan',stage:'late',confidence:'high',
    summary:L('Silk vem da participação em Clan Wars e é a moeda central dos Legions depois do primeiro slot de Resin.','Silk comes from Clan War participation and is the core Legion currency after the first Resin slot.'),
    facts:[
      L('Cada membro pode participar de uma Clan War por semana.','Each member can participate in one Clan War per week.'),
      L('Recompensa pessoal de Silk escala com contribuição, tier da guerra e resultado.','Personal Silk rewards scale with contribution, war tier and outcome.'),
      L('Recompensas precisam ser coletadas entre segunda-feira e o próximo registro; as não coletadas são perdidas.','Rewards must be claimed from Monday until the next registration; unclaimed rewards are lost.'),
      L('Slots 2–4 de Legions custam 5.000 Silk cada; Bullet e Exploding Ants também custam 5.000 Silk para desbloquear.','Legion slots 2–4 cost 5,000 Silk each; Bullet and Exploding Ants also cost 5,000 Silk to unlock.')
    ],
    route:[L('Entre em clã que realmente registra guerras e participe dos ataques semanais.','Join a clan that actually registers wars and participate in weekly attacks.'),L('Na segunda-feira, abra a tela da guerra e reivindique a recompensa antes do próximo registro.','On Monday, open the war screen and claim rewards before the next registration.')],
    communityTips:[L('Para Silk, constância semanal e coordenação do clã importam mais que tentar “farmar” em sessões longas.','For Silk, weekly consistency and clan coordination matter more than long grinding sessions.')],
    avoid:[L('Esquecer de reivindicar a recompensa semanal.','Forgetting to claim the weekly reward.')],
    links:[['wars','Wiki: Clan Wars'],['legions','Wiki: Legions'],['clans','Wiki: Clans']]
  },
  {
    id:'event-points',icon:'🎉',name:L('Farm de pontos de evento','Event point farming'),category:'event',stage:'all',confidence:'pattern',
    summary:L('Eventos grandes repetem vários padrões de pontos, mas cada edição pode mudar. A wiki separa o template recorrente da regra do evento atual.','Major events repeat several point patterns, but each edition can change. The wiki separates the recurring template from the current event rules.'),
    facts:[
      L('Em vários Major Events: Red Ant Queen = 200 pontos, Acorn = 20, Pheromone = 1, anúncio de Battle Token = 1.','In several Major Events: Red Ant Queen = 200 points, Acorn = 20, Pheromone = 1, Battle Token ad = 1.'),
      L('Honeydew obtido de Aphid Farms costuma valer 1 ponto por Honeydew em eventos que usam essa regra.','Honeydew obtained from Aphid Farms often gives 1 point per Honeydew in events that use that rule.'),
      L('Fontes infinitas de evento costumam gerar 1 ponto por item processado, mas isso precisa ser conferido na edição atual.','Event unlimited sources often give 1 point per processed item, but this must be checked for the current edition.')
    ],
    route:[L('Antes de farmar, confira a tabela de pontos do evento atual.','Before farming, check the current event point table.'),L('Faça primeiro atividades com timer/reset diário e só depois grinde fontes repetíveis.','Do timer/reset activities first, then grind repeatable sources.')],
    communityTips:[L('Em eventos com fonte de 24h, há histórico de jogadores ativarem 1–2h após o reset para fazer a mesma fonte atravessar dois dias de atividade. Isso depende da regra da edição.','For 24h event sources, there is historical strategy of activating 1–2h after reset so the same source spans two activity days. This depends on the edition rules.')],
    avoid:[L('Assumir que o evento atual usa exatamente os pontos de uma edição antiga.','Assuming the current event uses exactly the same points as an older edition.')],
    links:[['faq','Wiki: FAQ']]
  },
  {
    id:'pheromones',icon:'🧪',name:L('Farm de Pheromones','Pheromone farming'),category:'combat',stage:'mid-late',confidence:'reviewed',
    summary:L('Pheromones ligam PvP, liga, atração de criaturas e eventos. O valor real depende mais da criatura-alvo do que de acumular por acumular.','Pheromones connect PvP, league, creature attraction and events. Their value depends more on your target creature than on hoarding them blindly.'),
    facts:[L('PvP/Dr. Zany são rotas de obtenção documentadas e eventos frequentemente contam Pheromones como activity points.','PvP/Dr. Zany are documented acquisition routes and events often count Pheromones as activity points.')],
    route:[L('Escolha primeiro a criatura-alvo e as condições de atração; depois decida se vale gastar tokens/tempo em PvP.','Choose the target creature and attraction conditions first; then decide whether PvP is worth the tokens/time.')],
    communityTips:[L('No early game, jogadores recentes recomendam não transformar PvP em prioridade enquanto a colônia e o número de criaturas ainda estão fracos.','In early game, recent players recommend not making PvP a priority while colony progression and creature count are still weak.')],
    avoid:[L('Gastar Pheromone sem checar horário, clima ou item especial da criatura.','Spending Pheromones without checking time, weather or special item conditions.')],
    links:[['redditBeginner','Reddit: beginner priorities']]
  }
];

export const FARM_CATEGORIES=['all','economy','currency','garden','clan','event','combat'];
