const FANDOM='https://pocketants.fandom.com/wiki/';
const page=slug=>`${FANDOM}${slug}`;
const bi=(pt,en)=>({pt,en});

export const REFERENCE_META={
  checkedAt:'2026-09-06',
  gameVersion:'0.1153',
  officialVersion:'https://apps.apple.com/us/app/pocket-ants-colony-simulator/id1532712160',
  note:bi('Dados cruzados com App Store/Google Play, PocketAnts Wiki indexada e páginas comunitárias recentes. Lacunas e conflitos ficam visíveis em vez de serem preenchidos no chute.','Data cross-checked with App Store/Google Play, indexed PocketAnts Wiki pages and recent community pages. Gaps and conflicts stay visible instead of being guessed.')
};

const rec=(id,icon,title,summary,category,stage,facts,details,sources,confidence='high',warning=null,related=[])=>({id,icon,title,summary,category,stage,facts,details,sources,confidence,warning,related});

export const WORLD_RECORDS=[
rec('environment','🗺️',bi('Mapa e ambiente','Map & environment'),bi('Visão geral do mundo principal e dos sistemas que vivem nele.','Overview of the main world and the systems that live in it.'),'map','all',[
 bi('O mapa principal reúne sua colônia, Red Ant Nest, Fire Ant Nest, Garden, Tree, Aphid Farms e spawns de criaturas.','The main map contains your colony, Red Ant Nest, Fire Ant Nest, Garden, Tree, Aphid Farms and creature spawns.'),
 bi('Criaturas podem surgir naturalmente ou ser atraídas com feromônios, dependendo da raridade e condição.','Creatures can spawn naturally or be attracted with pheromones, depending on rarity and conditions.')
],[bi('Use o mapa como “hub” dos sistemas: vários timers e atividades acontecem em paralelo, então vale pensar em rota e não em uma atividade isolada.','Treat the map as a hub: several timers and activities run in parallel, so think in routes rather than isolated activities.')],[page('Environment')]),
rec('weather','🌦️',bi('Clima e ciclo do dia','Weather & day cycle'),bi('Dia, noite, chuva e neve afetam atração, Garden e velocidade das formigas.','Day, night, rain and snow affect attraction, Garden and ant speed.'),'map','all',[
 bi('O ciclo completo dura cerca de 5 minutos: amanhecer e entardecer ~10 s; dia e noite ~2 min 20 s cada.','A full cycle lasts about 5 minutes: dawn and dusk ~10 s; day and night ~2 min 20 s each.'),
 bi('Chuva dura cerca de 2 minutos e rega sementes do Garden sem gastar Water.','Rain lasts about 2 minutes and waters Garden seeds without spending Water.'),
 bi('Chuva reduz a velocidade de workers/soldiers, mas não desacelera Fire Ants, Termites, Vinegaroon ou criaturas.','Rain slows workers/soldiers, but not Fire Ants, Termites, Vinegaroon or creatures.')
],[bi('Blue Columbine e Silver Dollar podem ignorar condições normais de atração quando ativas.','Blue Columbine and Silver Dollar can bypass normal attraction conditions while active.')],[page('Weather'),page('Conditions_to_Attract')]),
rec('garden','🌱',bi('Garden','Garden'),bi('Cultivo de flores, slots, sementes e efeitos temporários.','Flower growing, plots, seeds and temporary effects.'),'garden','mid',[
 bi('Há 6 plots: 2 gratuitos e 4 desbloqueáveis por 400 Gems cada.','There are 6 plots: 2 free and 4 unlockable for 400 Gems each.'),
 bi('Só 2 flores temporárias diferentes podem ficar ativas ao mesmo tempo.','Only 2 different temporary flowers can be active at the same time.'),
 bi('O Garden começa cedo, mas ganha função real quando a Water Storage Chamber libera sementes.','The Garden is available early, but becomes useful when Water Storage unlocks seeds.')
],[bi('Digging patches aparecem um por vez e podem ser vistos no mapa completo pelo ícone de pá.','Digging patches appear one at a time and are visible on the full map via the shovel icon.')],[page('Garden')]),
rec('garden-flowers','🌺',bi('Flores do Garden','Garden flowers'),bi('Catálogo dos efeitos florais e dos 28 nomes conhecidos atualmente.','Catalog of flower effects and the 28 currently known names.'),'garden','mid',[
 bi('A wiki atual lista 28 flores conhecidas.','The current wiki lists 28 known flowers.'),
 bi('Nomes catalogados: Marigold, Black Hollyhock, Green Zinnia, Blue Columbine, Scarlet Sage, Myrrh, Rainflower, Bat Flower, Water Lily, Sunflower, Shrub Oak, Four-leaf Clover, Purple Coneflower, White Snakeroot, Tickseed, Silver Dollar, Eucalyptus, Bird’s Nest Orchid, Hare’s Ear, Goldenrod, Bluebells, Guaraná, Fire Lily, Fuchsia, Wood Sorrel, Hairy Bittercress, Jewelweed e Firecracker.','Cataloged names: Marigold, Black Hollyhock, Green Zinnia, Blue Columbine, Scarlet Sage, Myrrh, Rainflower, Bat Flower, Water Lily, Sunflower, Shrub Oak, Four-leaf Clover, Purple Coneflower, White Snakeroot, Tickseed, Silver Dollar, Eucalyptus, Bird’s Nest Orchid, Hare’s Ear, Goldenrod, Bluebells, Guaraná, Fire Lily, Fuchsia, Wood Sorrel, Hairy Bittercress, Jewelweed and Firecracker.')
],[bi('Algumas tabelas antigas de “quantas sementes por nível” ficaram desatualizadas depois das expansões do Garden; aqui o conflito permanece sinalizado.','Some older “seed count by level” tables became outdated after Garden expansions; the conflict remains flagged here.')],[page('Garden_Flower'),page('Water_Storage_Chamber')],'medium',bi('A lista de flores é atual, mas páginas antigas de desbloqueio ainda divergem em contagens.','The flower list is current, but older unlock pages still disagree on counts.')),
rec('pet-aphids','🐛',bi('Pet Aphids','Pet Aphids'),bi('Pets do Garden com bônus aleatórios e personalização.','Garden pets with random bonuses and customization.'),'garden','mid',[
 bi('Cada pet recebe 2 bônus aleatórios entre 12 possíveis.','Each pet gets 2 random bonuses out of 12 possible bonuses.'),
 bi('Máximo conhecido: 24 Pet Aphids armazenados.','Known maximum: 24 stored Pet Aphids.'),
 bi('Reroll de stats custa 350 Gems; reroll de cor 100 Gems; nomear custa 200 Gems.','Stat reroll costs 350 Gems; color reroll 100 Gems; naming costs 200 Gems.'),
 bi('A chance de obter pet ao colher flores é baixa; a FAQ comunitária estima ~5%, aumentável com Four-leaf Clover.','The chance to get a pet when harvesting is low; the community FAQ estimates ~5%, improvable with Four-leaf Clover.')
],[bi('Descartar pets de nível alto costuma ser ineficiente porque o retorno em tokens é menor que o investimento de upgrade.','Discarding high-level pets is usually inefficient because token return is lower than the upgrade investment.')],[page('Pet_Aphid'),page('FAQ')],'medium',bi('A chance de ~5% é estimativa comunitária, não taxa oficial publicada.','The ~5% chance is a community estimate, not an officially published rate.')),
rec('aphid-farm','🍯',bi('Aphid Farms','Aphid Farms'),bi('Principal fonte recorrente de Honeydew e um dos loops centrais do mapa.','Main recurring Honeydew source and one of the map’s core loops.'),'farm','mid',[
 bi('Uma nova farm aparece 6 horas após a anterior ser derrotada.','A new farm appears 6 hours after the previous one is defeated.'),
 bi('Há 4 posições possíveis; a do canto superior direito tem o trajeto de convoy mais longo.','There are 4 possible locations; the top-right one has the longest convoy route.'),
 bi('Cada aphid entregue rende de 1 até 15 Honeydew conforme upgrades.','Each delivered aphid yields 1 to 15 Honeydew depending on upgrades.')
],[bi('Worker morto durante o convoy leva o aphid junto e aquele Honeydew deixa de contar.','A worker killed during the convoy loses its aphid and that Honeydew does not count.')],[page('Aphid_Farm'),page('Honeydew')]),
rec('tree','🌳',bi('Tree e Resin Source','Tree & Resin Source'),bi('Área da Resin, Termites e acesso à Beehive.','Resin, Termites and Beehive access area.'),'map','mid',[
 bi('Existe uma Resin Source por vez na Tree.','There is one Resin Source at a time in the Tree.'),
 bi('Vencer Termite Nest co-op remove os Termites por 30 minutos.','Winning Termite Nest co-op removes Termites for 30 minutes.'),
 bi('A Beehive fica em um galho à direita da árvore.','The Beehive sits on a branch on the right side of the tree.')
],[bi('Quando o timer sem Termites termina, uma grande onda pode aparecer perto do nest.','When the no-Termite timer ends, a large wave may appear near the nest.')],[page('Tree'),page('Resin')]),
rec('beehive','🐝',bi('Beehive','Beehive'),bi('Labirinto com Bee Essence e escolha entre Resin, Honeydew ou Honeycomb.','Maze using Bee Essence with a choice of Resin, Honeydew or Honeycomb.'),'map','mid',[
 bi('Bee Essence custa 300 Resin ou 150 Gems; Resin é normalmente a compra mais econômica.','Bee Essence costs 300 Resin or 150 Gems; Resin is usually the more economical purchase.'),
 bi('Recompensas registradas: 2.000 Resin, 75 Honeydew ou 1 Honeycomb.','Recorded rewards: 2,000 Resin, 75 Honeydew or 1 Honeycomb.'),
 bi('A Resin page registra até 5 conclusões/recompensas da Beehive por dia.','The Resin page records up to 5 Beehive completions/rewards per day.'),
 bi('Tocar paredes/obstáculos específicos reduz o timer de Bee Essence em 10 s.','Touching certain walls/obstacles reduces the Bee Essence timer by 10 s.')
],[bi('Pegue a recompensa apenas quando a Queen Bee estiver com o indicador de sono; caso contrário as abelhas de ataque podem aparecer.','Claim a reward only when the Queen Bee shows the sleeping indicator; otherwise attack bees may appear.')],[page('Beehive'),page('Tree'),page('Resin')]),
rec('red-ant-nest','🔴',bi('Red Ant Nest','Red Ant Nest'),bi('Colônia hostil recorrente, fonte de Gems e Pink Pheromone.','Recurring hostile colony and source of Gems and Pink Pheromone.'),'hostile','early',[
 bi('Respawn normal: 12 horas após derrotar a Red Queen.','Normal respawn: 12 hours after defeating the Red Queen.'),
 bi('Recompensa da Queen: 1 Pink Pheromone + 5–10 Gems.','Queen reward: 1 Pink Pheromone + 5–10 Gems.'),
 bi('Eventos podem reduzir o timer.','Events may reduce the timer.')
],[bi('Derrotar a Queen elimina os Red Ants restantes e esvazia os recursos guardados no ninho.','Defeating the Queen removes remaining Red Ants and clears the nest’s stored resources.')],[page('Red_Ant_Nest')]),
rec('fire-ant-nest','🔥',bi('Fire Ant Nest','Fire Ant Nest'),bi('Dungeon de 15 câmaras ligado a Honeydew.','15-room dungeon tied to Honeydew.'),'hostile','mid',[
 bi('É necessário construir a Honeydew Chamber para liberar o nest.','You must build the Honeydew Chamber to unlock the nest.'),
 bi('Entrada registrada: 3 Battle Tokens + 500 Leaves + 500 Seeds.','Recorded entry: 3 Battle Tokens + 500 Leaves + 500 Seeds.'),
 bi('O dungeon possui 15 câmaras progressivamente mais difíceis.','The dungeon has 15 progressively harder rooms.')
],[bi('Subir a Queen Chamber fortalece Fire Ants, mas seus soldiers continuam com pequena vantagem relativa.','Upgrading Queen Chamber strengthens Fire Ants, but your soldiers retain a slight relative advantage.')],[page('Fire_Ant_Nest'),page('Fire_Ants')]),
rec('garrison','🚩',bi('Garrison','Garrison'),bi('Patrulha automática de soldiers para proteger fontes e rotas.','Automatic soldier patrol used to protect sources and routes.'),'army','early',[
 bi('Capacidade padrão: 10 soldiers; upgrades de Resin podem levar a 40.','Default capacity: 10 soldiers; Resin upgrades can raise it to 40.'),
 bi('Cooldown aproximado para reposicionar: 10 segundos.','Approximate redeploy cooldown: 10 seconds.'),
 bi('Apenas 1 Garrison pode ficar ativo de cada vez.','Only 1 Garrison can be active at a time.')
],[bi('É especialmente útil na Tree, Aphid convoys e para segurar Red Ants em fontes.','It is especially useful in the Tree, Aphid convoys and for holding Red Ants around sources.')],[page('Garrison'),page('Soldier_Ants')]),
rec('acorns','🌰',bi('Acorns','Acorns'),bi('Spawns rápidos que dão recursos e pontos de evento.','Quick spawns that grant resources and event points.'),'map','early',[
 bi('Limite: 10 por dia, reset às 00:00 UTC.','Limit: 10 per day, reset at 00:00 UTC.'),
 bi('Só 1 Acorn existe no mapa por vez.','Only 1 Acorn exists on the map at a time.'),
 bi('Recompensa normal é cerca de 7% da capacidade da chamber de Fungus/Leaves/Seeds escolhida pelo drop.','Normal reward is about 7% of the relevant Fungus/Leaves/Seeds chamber capacity.'),
 bi('Em eventos regulares, costuma render pontos de Activity Bar.','During regular events, it commonly grants Activity Bar points.')
],[bi('Se a chamber estiver cheia, a recompensa pode ser perdida.','If the chamber is full, the reward can be lost.')],[page('Acorns')]),
rec('vinegaroon','🦂',bi('Vinegaroon','Vinegaroon'),bi('Mini-boss de fim de semana para Body Parts.','Weekend mini-boss for Body Parts.'),'hostile','mid',[
 bi('Disponível do sábado 00:00 UTC até segunda 00:00 UTC.','Available from Saturday 00:00 UTC until Monday 00:00 UTC.'),
 bi('Respawn natural: 4 horas após ser derrotado.','Natural respawn: 4 hours after defeat.'),
 bi('A recompensa é ~4% da capacidade da Body Parts Chamber; em Lv.12, 360–439 Parts foram registradas.','Reward is ~4% of Body Parts Chamber capacity; at Lv.12, 360–439 Parts have been recorded.'),
 bi('Comprar spawn custa 50 Gems e dobra a cada compra no mesmo dia, resetando diariamente.','Buying a spawn costs 50 Gems and doubles each same-day purchase, resetting daily.')
],[bi('Não é capturável e não ocupa o “slot” de criatura atraível do mapa.','It cannot be captured and does not occupy the map’s attractable-creature slot.')],[page('Vinegaroon')]),
rec('corpses','🦴',bi('Corpses e Body Parts','Corpses & Body Parts'),bi('Carcaças de criaturas como fonte de Body Parts e limites do mapa.','Creature corpses as Body Parts sources and map limits.'),'map','early',[
 bi('Máximo de 5 corpses de criaturas no mapa; matar outra substitui a mais antiga.','Maximum of 5 creature corpses on the map; killing another replaces the oldest.'),
 bi('A quantidade de Body Parts depende da criatura.','Body Parts amount depends on the creature.'),
 bi('Crab não vira corpse coletável; sua progressão já concede Parts ao longo do co-op.','Crab does not become a harvestable corpse; its progression grants Parts through co-op clears.')
],[bi('Butterfly/Centipede podem exigir selecionar perto da cabeça para definir como source.','Butterfly/Centipede may require selecting near the head to set them as a source.')],[page('Corpse')]),
rec('strawberry','🍓',bi('Strawberry','Strawberry'),bi('Fonte ilimitada de Fungus/Leaves por 24 horas.','Unlimited Fungus/Leaves source for 24 hours.'),'map','all',[
 bi('Custa 250 Gems na Gem Shop.','Costs 250 Gems in the Gem Shop.'),
 bi('Dura 24 horas a partir da compra.','Lasts 24 hours from purchase.'),
 bi('Não esgota durante o período ativo.','Does not deplete during the active period.')
],[bi('Como o timer começa imediatamente, vale comprar apenas quando houver tempo real para aproveitar.','Because the timer starts immediately, buy it only when you have time to use it.')],[page('Strawberry'),page('Gem_Shop')]),
rec('rock','🪨',bi('Rock e conteúdo especulativo','Rock & speculative content'),bi('Easter egg com uma parte comprovada e muita especulação comunitária.','Easter egg with a small proven portion and lots of community speculation.'),'map','all',[
 bi('A página atual marca explicitamente grande parte do conteúdo como especulação.','The current page explicitly marks much of its content as speculation.'),
 bi('O efeito comprovado inclui o brilho ao amanhecer e relação com uma skin/secret shrine.','Proven behavior includes sparkling at dawn and a connection to a skin/secret shrine.')
],[bi('A wiki desta página nunca deve apresentar teorias do Rock como mecânicas confirmadas.','This wiki should never present Rock theories as confirmed mechanics.')],[page('Rock')],'review',bi('Página-fonte contém especulação; apenas fatos identificados como comprovados são tratados como dados.','Source page contains speculation; only facts identified as proven are treated as data.'))
];

export const UPGRADE_RECORDS=[
rec('shops','🛒',bi('Visão geral das lojas','Shops overview'),bi('Onde cada moeda é gasta e que tipo de bônus ela compra.','Where each currency is spent and what kind of bonuses it buys.'),'shop','all',[
 bi('Resin Shop: army/player/Garrison/Bee Essence/Venus Flytrap.','Resin Shop: army/player/Garrison/Bee Essence/Venus Flytrap.'),
 bi('Honeydew Shop: economia, velocidade, hatch, resilience, fusion e army size.','Honeydew Shop: economy, speed, hatch, resilience, fusion and army size.'),
 bi('Gem Shop: itens, skins, fontes, spawns e conveniência.','Gem Shop: items, skins, sources, spawns and convenience.'),
 bi('Pheromone Shop: atração/conversão de pheromones e informações de League.','Pheromone Shop: attraction/conversion of pheromones and League info.')
],[bi('Bônus permanentes do mesmo tipo normalmente substituem o anterior; não se somam nível por nível.','Permanent bonuses of the same type generally replace the previous one; they do not stack level by level.')],[page('Shops'),page('Resin_Shop'),page('Honeydew_Shop')]),
rec('resin-shop','🟠',bi('Resin Shop','Resin Shop'),bi('Upgrades permanentes de exército, player, Garrison e Flytrap.','Permanent army, player, Garrison and Flytrap upgrades.'),'shop','mid',[
 bi('Max Soldiers chega a 80; Garrison chega a 40.','Max Soldiers reaches 80; Garrison reaches 40.'),
 bi('Player Speed chega a +60%; Player Attack chega a 95%.','Player Speed reaches +60%; Player Attack reaches 95%.'),
 bi('Bee Essence base dura 6:30; upgrade máximo conhecido leva a 8:10.','Bee Essence base lasts 6:30; known max duration reaches 8:10.'),
 bi('Venus Flytrap possui Health, Attack Speed e Attack Range; a própria wiki ainda não publica valores finais exatos para todos.','Venus Flytrap has Health, Attack Speed and Attack Range; the wiki still lacks exact final values for some of them.')
],[bi('Como os bônus substituem o nível anterior, trate o número mostrado como bônus total atual, não bônus adicional acumulado.','Because upgrades replace the prior level, treat the shown value as the current total bonus, not an added cumulative bonus.')],[page('Resin_Shop'),page('Resin')]),
rec('honeydew-shop','🍯',bi('Honeydew Shop','Honeydew Shop'),bi('Upgrades permanentes que aceleram economia, soldados, ovos e fusão.','Permanent upgrades for economy, soldiers, eggs and fusion.'),'shop','mid',[
 bi('Categorias registradas: Honeydew bonus, Worker Speed, Egg Hatching Time, Soldier Speed, Soldier Resilience, Fusion Success, Chrysanthemum, Lavender e Army Size.','Recorded categories: Honeydew bonus, Worker Speed, Egg Hatching Time, Soldier Speed, Soldier Resilience, Fusion Success, Chrysanthemum, Lavender and Army Size.'),
 bi('Os níveis do mesmo bônus substituem o anterior, em vez de somar cada compra.','Levels of the same bonus replace the previous one instead of stacking every purchase.')
],[bi('Honeydew é uma moeda lenta; upgrades com efeito recorrente costumam ter mais valor que conveniências temporárias.','Honeydew is a slow currency; recurring-effect upgrades usually have more value than temporary convenience.')],[page('Honeydew_Shop'),page('Honeydew')]),
rec('gem-shop','💎',bi('Gem Shop','Gem Shop'),bi('Compras, conveniências e custos em Gems.','Gem purchases, conveniences and costs.'),'shop','all',[
 bi('300 Fungus: 100 Gems; Strawberry 24h: 250 Gems.','300 Fungus: 100 Gems; 24h Strawberry: 250 Gems.'),
 bi('Troca de nome: 650 Gems; skins variam aproximadamente 200–500 Gems.','Name change: 650 Gems; skins range roughly 200–500 Gems.'),
 bi('Attract Aphid Farm: 200 Gems. Vinegaroon: 50 Gems inicial, dobrando em compras consecutivas no dia.','Attract Aphid Farm: 200 Gems. Vinegaroon: 50 Gems initially, doubling on consecutive same-day purchases.'),
 bi('Battle Token também pode ser obtido por anúncio, sem gastar Gems.','Battle Tokens can also be obtained from ads without spending Gems.')
],[bi('Gems são usadas em muitos sistemas; custo de oportunidade é alto. Priorize storage/lab/fusion conforme seu estágio.','Gems are used by many systems; opportunity cost is high. Prioritize storage/lab/fusion depending on your stage.')],[page('Gem_Shop'),page('Gems')]),
rec('pheromone-shop','🧪',bi('Pheromone Shop','Pheromone Shop'),bi('Atração, conversão de pheromones, Golden summons e informações de League.','Attraction, pheromone conversion, Golden summons and League information.'),'shop','mid',[
 bi('Tipos principais: Pink, Gold, Platinum e Diamond.','Main types: Pink, Gold, Platinum and Diamond.'),
 bi('Golden creature pode ser invocada com 150 Gold, 50 Platinum ou 30 Diamond pheromones.','A Golden creature can be summoned with 150 Gold, 50 Platinum or 30 Diamond pheromones.'),
 bi('A tela também mostra League, trophies, shield e bônus de recursos.','The screen also shows League, trophies, shield and resource bonus.')
],[bi('Pheromone color e League estão relacionados à progressão PvP, mas a escolha da criatura ainda depende de condições de atração.','Pheromone color and League are tied to PvP progression, but creature choice still depends on attraction conditions.')],[page('Pheromones'),page('Leagues'),page('Shops')]),
rec('creature-lab','🧬',bi('Creature Lab','Creature Lab'),bi('Upgrades de Health, Speed e Attack Rate das criaturas.','Health, Speed and Attack Rate upgrades for creatures.'),'lab','mid',[
 bi('Três stats podem ser melhorados: Health, Speed e Attack Rate.','Three stats can be upgraded: Health, Speed and Attack Rate.'),
 bi('Upgrades usam Body Parts; níveis acima do 5 também passam a consumir Gems.','Upgrades use Body Parts; levels above 5 also consume Gems.'),
 bi('A progressão disponível depende da Creatures Chamber.','Available progression depends on the Creatures Chamber.')
],[bi('O custo alto de Body Parts compete diretamente com Resin/Creatures progression; planeje antes de maximizar várias criaturas.','High Body Parts cost directly competes with Resin/Creatures progression; plan before maxing many creatures.')],[page('Shops'),page('Creatures_Chamber')]),
rec('ant-skins','🎨',bi('Ant Skins','Ant Skins'),bi('Cosméticos gratuitos, de Gem Shop, comunidade e eventos.','Free, Gem Shop, community and event cosmetics.'),'cosmetic','all',[
 bi('Categorias registradas incluem skins free, flat, design, community e event.','Recorded categories include free, flat, design, community and event skins.'),
 bi('Flat skins custam 200 Gems; design/community geralmente 250; event skins registradas custam 500.','Flat skins cost 200 Gems; design/community generally 250; recorded event skins cost 500.'),
 bi('Skins de evento antigas podem desaparecer da loja se não foram compradas durante o evento.','Old event skins may disappear from the shop if not purchased during the event.')
],[bi('A contagem total muda com concursos e eventos; o catálogo deve ser tratado como histórico em evolução.','Total count changes with contests and events; treat the catalog as evolving history.')],[page('Ant_Skins'),page('Gem_Shop')],'medium'),
rec('legion-upgrades','🛡️',bi('Legions: unlock e upgrade','Legions: unlock & upgrade'),bi('Sistema late-game de unidades extras, Resin e Silk.','Late-game extra-unit system using Resin and Silk.'),'late','late',[
 bi('Há 4 slots normais: primeiro por 50.000 Resin; slots 2–4 por 5.000 Silk cada.','There are 4 normal slots: first for 50,000 Resin; slots 2–4 for 5,000 Silk each.'),
 bi('Rock Blessing pode abrir um quinto legion slot.','Rock Blessing can unlock a fifth legion slot.'),
 bi('Cada nível aumenta a quantidade de ants dentro da Legion.','Each level increases the number of ants in the Legion.')
],[bi('Carpenter Ant usa 50.000 Resin; Bullet e Exploding Ant usam 5.000 Silk cada para unlock.','Carpenter Ant uses 50,000 Resin; Bullet and Exploding Ant use 5,000 Silk each to unlock.')],[page('Legions')])
];

export const EVENT_RECORDS=[
rec('event-calendar','📅',bi('Calendário anual de eventos','Annual event calendar'),bi('Famílias recorrentes de Major Events e datas aproximadas.','Recurring Major Event families and approximate dates.'),'calendar','all',[
 bi('Valentine’s: por volta de 14/02; Easter: março/abril; Anniversary: fim de junho; Summer: agosto; Halloween: fim de outubro; Christmas: dezembro.','Valentine’s: around Feb 14; Easter: March/April; Anniversary: late June; Summer: August; Halloween: late October; Christmas: December.'),
 bi('Eventos começam e terminam em UTC; páginas históricas normalmente usam 00:00/23:59 UTC.','Events start/end in UTC; historical pages typically use 00:00/23:59 UTC.')
],[bi('Datas exatas mudam por edição; use o histórico como referência, não como calendário futuro garantido.','Exact dates change by edition; use history as reference, not a guaranteed future calendar.')],[page('Events')]),
rec('activity-bar','🎯',bi('Activity Bar','Activity Bar'),bi('Sistema de pontos usado para atrair especiais em Major/Creature Events.','Point system used to attract specials during Major/Creature Events.'),'mechanic','all',[
 bi('Muitos eventos modernos usam meta de 1.000 pontos para atração.','Many modern events use a 1,000-point attraction target.'),
 bi('Atividades recorrentes incluem Red Ant Queen, Honeydew de Aphids, Pheromones de PvP, Acorns/itens do evento e anúncios.','Recurring activities include Red Ant Queen, Aphid Honeydew, PvP Pheromones, Acorns/event items and ads.'),
 bi('Major Events normalmente limitam a atração especial a 2 por dia; Creature Events frequentemente removem o limite.','Major Events commonly limit special attraction to 2 per day; Creature Events often remove the limit.')
],[bi('Pontuação exata muda por edição. A calculadora de evento do site deve sempre mostrar qual edição/tabela está sendo usada.','Exact scoring changes by edition. The site event calculator must always show which edition/table is being used.')],[page('Events'),page('Style_Guide')],'medium'),
rec('events-2024','🎉',bi('Eventos de 2024','2024 events'),bi('Ano com Red Scorpion, Jeweled Flower Mantis, Cyanide Millipede, Firefly, Halloween Hisser e December Moth.','Year featuring Red Scorpion, Jeweled Flower Mantis, Cyanide Millipede, Firefly, Halloween Hisser and December Moth.'),'history','all',[
 bi('Valentine 2024: Red Scorpion. Easter 2024: Jeweled Flower Mantis. 4th Anniversary: Cyanide Millipede.','Valentine 2024: Red Scorpion. Easter 2024: Jeweled Flower Mantis. 4th Anniversary: Cyanide Millipede.'),
 bi('Summer 2024: Common Eastern Firefly. Halloween 2024: Halloween Hisser. Christmas 2024: December Moth + retorno do Christmas Crab.','Summer 2024: Common Eastern Firefly. Halloween 2024: Halloween Hisser. Christmas 2024: December Moth + Christmas Crab return.')
],[bi('A página geral de Events ficou atrasada em alguns pontos; fichas individuais/Conditions to Attract são usadas para completar o histórico.','The general Events page lagged behind in places; individual pages/Conditions to Attract are used to complete history.')],[page('Events'),page('Conditions_to_Attract')],'medium'),
rec('events-2025','🗓️',bi('Eventos de 2025','2025 events'),bi('Red Paper Wasp, Ladybug, Black Widow, Beach Tiger Beetle, Hawkmoth e White-faced Meadowhawk.','Red Paper Wasp, Ladybug, Black Widow, Beach Tiger Beetle, Hawkmoth and White-faced Meadowhawk.'),'history','all',[
 bi('Valentine: Red Paper Wasp; Easter: Ladybug; 5th Anniversary: Black Widow.','Valentine: Red Paper Wasp; Easter: Ladybug; 5th Anniversary: Black Widow.'),
 bi('Summer: Beach Tiger Beetle; Halloween: African Death’s-Head Hawkmoth; Christmas: White-faced Meadowhawk.','Summer: Beach Tiger Beetle; Halloween: African Death’s-Head Hawkmoth; Christmas: White-faced Meadowhawk.'),
 bi('Summer 2025 foi de 15/08 a 12/09 UTC; Christmas 2025 foi de 12/12 a 06/01/2026.','Summer 2025 ran Aug 15–Sep 12 UTC; Christmas 2025 ran Dec 12–Jan 6, 2026.')
],[bi('Algumas páginas de 2025 são stubs; stats e datas incompletos ficam marcados como revisão em vez de inventados.','Some 2025 pages are stubs; incomplete stats/dates remain marked for review instead of guessed.')],[page('Summer_Event_2025'),page('Halloween_Event_2025'),page('Christmas_Event_2025'),page('5th_Anniversary_Event')],'medium'),
rec('events-2026','🆕',bi('Eventos de 2026','2026 events'),bi('Fire Millipede, Peacock Spider e Asian Giant Hornet especial já documentados em 2026.','Fire Millipede, Peacock Spider and special Asian Giant Hornet are already documented in 2026.'),'history','all',[
 bi('Valentine 2026: Fire Millipede. Easter/Spring 2026: Peacock Spider.','Valentine 2026: Fire Millipede. Easter/Spring 2026: Peacock Spider.'),
 bi('6th Anniversary 2026: Asian Giant Hornet especial; parte dos stats ainda aparece como placeholder na wiki comunitária.','6th Anniversary 2026: special Asian Giant Hornet; some stats still appear as placeholders on the community wiki.'),
 bi('Peacock Spider: 1.000 pontos, 100% de chance ao completar a barra, limite 2/dia na edição principal.','Peacock Spider: 1,000 points, 100% chance when filling the bar, 2/day limit in the main edition.')
],[bi('Qualquer evento posterior a setembro de 2026 é futuro em relação a esta revisão e não deve ser tratado como confirmado.','Any event after September 2026 is future relative to this review and must not be treated as confirmed.')],[page('Fire_Millipede'),page('Peacock_spider'),page('Conditions_to_Attract')],'medium'),
rec('creature-events','🪲',bi('Creature Events','Creature Events'),bi('Mini-eventos que trazem de volta especiais antigas com regras próprias.','Mini-events that bring older specials back with their own rules.'),'calendar','all',[
 bi('Duração histórica comum: 4 dias (alguns 4–5).','Common historical duration: 4 days (some 4–5).'),
 bi('Muitos Creature Events usam 1.000 pontos e removem o limite diário de atração.','Many Creature Events use 1,000 points and remove the daily attraction limit.'),
 bi('Ex.: Monarch Butterfly teve edições anuais até 2026; Flower Chafer também teve edição em 2026.','Example: Monarch Butterfly had yearly editions through 2026; Flower Chafer also had a 2026 edition.')
],[bi('Sempre confira a edição atual: retorno de especial não garante exatamente a mesma tabela de pontos.','Always check the current edition: a returning special does not guarantee the exact same scoring table.')],[page('Events'),page('Creature_Event%3A_Monarch_Butterfly'),page('Creature_Event%3A_Flower_Chafer_Beetle')]),
rec('battle-seasons','🏆',bi('Battle Seasons','Battle Seasons'),bi('Temporadas PvP contínuas com Battle Points e rewards.','Continuous PvP seasons using Battle Points and rewards.'),'season','late',[
 bi('A página comunitária registra seasons de 3–4 meses.','The community page records seasons lasting 3–4 months.'),
 bi('Battle Points exigem pelo menos 1 pheromone/50% de conclusão e escalam com rank.','Battle Points require at least 1 pheromone/50% completion and scale with rank.'),
 bi('Premium Ticket custa 1.600 Gems, ou 1.280 na primeira semana segundo a página atual, e duplica Season Points.','Premium Ticket costs 1,600 Gems, or 1,280 in the first week according to the current page, and doubles Season Points.')
],[bi('A própria página avisa que está incompleta e pode conter números desatualizados; mantenha esses valores como comunitários, não oficiais.','The page itself warns it is incomplete and may contain outdated numbers; keep these values as community data, not official.')],[page('Battle_Seasons')],'review',bi('Página comunitária marcada como incompleta.','Community page is marked incomplete.')),
rec('update-history','🧾',bi('Versão atual e histórico recente','Current version & recent history'),bi('Linha do tempo oficial das builds recentes do jogo.','Official timeline of recent game builds.'),'version','all',[
 bi('Versão pública atual verificada: v0.1153 em 26/08/2026.','Verified current public version: v0.1153 on Aug 26, 2026.'),
 bi('v0.1146 (20/07/2026) adicionou Clan Wars, Silk, Legions, 3 novas espécies de formiga e perk de 28 dias.','v0.1146 (Jul 20, 2026) added Clan Wars, Silk, Legions, 3 new ant species and a 28-day perk.'),
 bi('v0.1147–0.1153 foram principalmente pequenas mudanças e correções, segundo App Store/Play Store.','v0.1147–0.1153 were mainly small changes and bug fixes according to App Store/Play Store.')
],[bi('Notas completas ficam no Discord oficial; lojas públicas exibem apenas resumo.','Full notes are on the official Discord; public stores show only summaries.')],['https://apps.apple.com/us/app/pocket-ants-colony-simulator/id1532712160','https://play.google.com/store/apps/details?id=com.ariel.zanyants']),
rec('event-skins','🎭',bi('Skins de evento','Event skins'),bi('Cosméticos limitados que acompanham Major Events.','Limited cosmetics tied to Major Events.'),'cosmetic','all',[
 bi('Major Events historicamente trazem skins temáticas, mudanças visuais e às vezes música/terreno especial.','Major Events historically bring themed skins, visual changes and sometimes special music/terrain.'),
 bi('Event skins registradas custam 500 Gems quando aparecem na loja.','Recorded event skins cost 500 Gems when available in the shop.')
],[bi('Se uma skin antiga não aparece, geralmente é porque era exclusiva de uma edição/evento anterior.','If an old skin is missing, it is usually because it was exclusive to a previous event edition.')],[page('Events'),page('Ant_Skins')])
];

export const QUEST_RECORDS=[
rec('game-quests','📜',bi('Game Quests','Game Quests'),bi('Linha de quests que ensina o jogo e acompanha a progressão da colônia.','Quest line that teaches the game and follows colony progression.'),'quest','early',[
 bi('Quests começam no Starter Tutorial e introduzem câmaras, workers, soldiers, criaturas e outros sistemas.','Quests begin in the Starter Tutorial and introduce chambers, workers, soldiers, creatures and other systems.'),
 bi('Ao concluir, o botão recebe indicador vermelho e a recompensa é adicionada diretamente à chamber correspondente.','When completed, the button gets a red indicator and the reward is added directly to the relevant chamber.')
],[bi('Se a chamber estiver cheia ao reclamar, a recompensa pode ser perdida; reclamar só quando houver espaço pode ser melhor.','If the chamber is full when claiming, the reward may be lost; claiming only when there is room can be better.')],[page('Quests')]),
rec('daily-quests','✅',bi('Daily Quests','Daily Quests'),bi('4 tarefas por dia e um dos melhores loops fixos de recompensa.','4 tasks per day and one of the strongest fixed reward loops.'),'daily','all',[
 bi('Você recebe 4 Daily Quests por dia.','You receive 4 Daily Quests per day.'),
 bi('Tipos incluem battles, criaturas do mapa, Red Queen, Fire Ants/Termites, Aphid convoy e anúncios.','Types include battles, map creatures, Red Queen, Fire Ants/Termites, Aphid convoy and ads.'),
 bi('Completar as 4 libera o reward maior: 1.500 Resin + 150 Honeydew + 10 Gems.','Completing all 4 unlocks the major reward: 1,500 Resin + 150 Honeydew + 10 Gems.')
],[bi('Reset diário: 00:00 UTC.','Daily reset: 00:00 UTC.')],[page('Daily_Quests'),page('Honeydew'),page('Resin')]),
rec('daily-rewards','🎁',bi('Daily Rewards','Daily Rewards'),bi('Sequência de login de 7 dias com recursos escalados por workers.','7-day login sequence with resources scaled by workers.'),'daily','all',[
 bi('A janela aparece no primeiro login após 00:00 UTC e precisa ser coletada.','The window appears on first login after 00:00 UTC and must be collected.'),
 bi('Fungus/Leaves/Seeds usam multiplicador do número de workers: Dia 1 = ×0,5; D2 ×1; D3 ×1,5; D4 ×2; D5 ×2,5; D6 ×3; D7 ×3,5.','Fungus/Leaves/Seeds use a worker-count multiplier: Day 1 ×0.5; D2 ×1; D3 ×1.5; D4 ×2; D5 ×2.5; D6 ×3; D7 ×3.5.'),
 bi('D3 também dá 30 Body Parts; D7 dá 50 Body Parts + 10 Pink Pheromones + 10 Gems.','D3 also gives 30 Body Parts; D7 gives 50 Body Parts + 10 Pink Pheromones + 10 Gems.')
],[bi('O valor dos três recursos básicos cresce com o número de workers, não é um número fixo.','The value of the three basic resources scales with worker count; it is not fixed.')],[page('Daily_Rewards')]),
rec('daily-reset','🕛',bi('Reset de 00:00 UTC','00:00 UTC reset'),bi('Vários sistemas diários usam o mesmo relógio UTC.','Several daily systems use the same UTC clock.'),'daily','all',[
 bi('Daily Quests, Acorn limit e muitos limites de evento resetam às 00:00 UTC.','Daily Quests, Acorn limit and many event limits reset at 00:00 UTC.'),
 bi('Battle Token tem regra própria de retorno a 3 quando o saldo está em 0–2 no reset.','Battle Tokens have their own reset-to-3 rule when balance is 0–2 at reset.')
],[bi('Para Brasil, o horário local varia conforme fuso; a wiki deve sempre mostrar “UTC” nos timers oficiais.','For Brazil, local time varies by timezone; the wiki should always show “UTC” on official timers.')],[page('Daily_Quests'),page('Acorns'),page('FAQ')]),
rec('reward-overflow','📦',bi('Recompensa e chamber cheia','Rewards & full chambers'),bi('Regra importante que pode fazer recursos de quest desaparecerem.','Important rule that can make quest resources disappear.'),'warning','early',[
 bi('Recompensas de Game Quests entram diretamente na chamber.','Game Quest rewards go directly into the chamber.'),
 bi('Se a chamber estiver cheia, a parte excedente pode ser perdida.','If the chamber is full, the excess may be lost.')
],[bi('Antes de reclamar recompensa grande, confira capacidade — especialmente Resin, Seeds e Body Parts.','Before claiming a large reward, check capacity — especially Resin, Seeds and Body Parts.')],[page('Quests')]),
rec('acorn-counter','🌰',bi('Contador diário de Acorns','Daily Acorn counter'),bi('O Daily Quests menu também acompanha as 10 coletas diárias de Acorn.','The Daily Quests menu also tracks the 10 daily Acorn collections.'),'daily','all',[
 bi('Limite diário: 10.','Daily limit: 10.'),
 bi('O contador fica junto das Daily Quests.','The counter sits with Daily Quests.'),
 bi('Durante certos eventos, o visual/objeto pode mudar (ex.: Easter Eggs).','During some events, the visual/object may change (e.g. Easter Eggs).')
],[bi('Event variants podem dar pontos/recompensas diferentes da versão normal.','Event variants may grant different points/rewards than the normal version.')],[page('Acorns'),page('Daily_Quests')]),
rec('battle-season-points','⚔️',bi('Battle Season Points','Battle Season Points'),bi('Pontos de temporada obtidos por performance PvP.','Season points earned from PvP performance.'),'season','late',[
 bi('É necessário chegar a pelo menos 1 pheromone/50% para receber points.','You need at least 1 pheromone/50% to receive points.'),
 bi('Rank maior aumenta points por pheromone; Premium Ticket duplica points.','Higher rank increases points per pheromone; Premium Ticket doubles points.')
],[bi('A página comunitária está incompleta; use o calculator como estimativa documentada, não como promessa oficial.','The community page is incomplete; use the calculator as a documented estimate, not an official guarantee.')],[page('Battle_Seasons')],'review'),
rec('coop-daily','🤝',bi('Limites diários de Co-op','Daily Co-op limits'),bi('Public e Clan co-op criam oportunidades separadas de recompensa.','Public and Clan co-op create separate reward opportunities.'),'daily','mid',[
 bi('Clan co-op pode dar uma segunda oportunidade diária de Crab e Termite sem gastar Gems extras.','Clan co-op can give a second daily Crab and Termite opportunity without extra Gems.'),
 bi('Termite Nest oferece 2.000 Resin e 30 min sem Termites; Frog oferece 250 Honeydew; Crab oferece 100 Body Parts por clear conforme referências atuais usadas no site.','Termite Nest offers 2,000 Resin and 30 min without Termites; Frog offers 250 Honeydew; Crab offers 100 Body Parts per clear according to current references used by the site.')
],[bi('Entradas só são consumidas quando a partida realmente começa, segundo a página de Co-op.','Entries are only consumed once the match actually starts, according to the Co-op page.')],[page('Co-op_Mode'),page('FAQ')])
];

export const REFERENCE_SECTIONS={
  world:{title:bi('Mundo & Ambiente','World & Environment'),subtitle:bi('Mapa, Garden, inimigos, spawns, timers e objetos do mundo.','Map, Garden, enemies, spawns, timers and world objects.'),icon:'🗺️',records:WORLD_RECORDS},
  upgrades:{title:bi('Lojas & Upgrades','Shops & Upgrades'),subtitle:bi('Onde gastar cada moeda, custos conhecidos e bônus permanentes.','Where to spend each currency, known costs and permanent bonuses.'),icon:'🛒',records:UPGRADE_RECORDS},
  events:{title:bi('Eventos & Histórico','Events & History'),subtitle:bi('Major Events, Creature Events, seasons e versões recentes.','Major Events, Creature Events, seasons and recent versions.'),icon:'🎉',records:EVENT_RECORDS},
  quests:{title:bi('Quests & Recompensas','Quests & Rewards'),subtitle:bi('Game Quests, Daily Quests, login, resets e limites diários.','Game Quests, Daily Quests, login, resets and daily limits.'),icon:'📜',records:QUEST_RECORDS}
};

export function referenceRecord(kind,id){return REFERENCE_SECTIONS[kind]?.records.find(item=>item.id===id)||null;}
