export const gameMeta = {
  title: 'Pocket Ants Wiki BR',
  subtitle: 'Guia, banco de dados e ferramentas para Pocket Ants: Colony Simulator',
  storeUpdatedAt: '25/08/2026',
  dataCheckedAt: '05/09/2026',
  officialGameUrl: 'https://play.google.com/store/apps/details?id=com.ariel.zanyants&hl=pt_BR',
  communityWikiUrl: 'https://pocketants.fandom.com/wiki/PocketAnts_Wiki',
  redditUrl: 'https://www.reddit.com/r/PocketAnts/'
};

export const sources = {
  official: { label: 'Oficial', tone: 'official', detail: 'Google Play / Ariel Games' },
  community: { label: 'Wiki comunitária', tone: 'community', detail: 'PocketAnts Wiki, revisada em 2026' },
  consensus: { label: 'Consenso da comunidade', tone: 'consensus', detail: 'Dicas recorrentes de jogadores; pode variar com o meta' },
  review: { label: 'A revisar', tone: 'review', detail: 'Dado com conflito ou ainda sem confirmação suficiente' }
};

export const resources = [
  { id:'leaves', name:'Folhas', icon:'🍃', category:'Básico', source:'community', summary:'Recurso central de progressão. Trabalhadoras coletam folhas no mapa e levam ao ninho.', uses:['Upgrades de câmaras','Produção de fungo'], obtain:['Folhas gigantes no mapa'], tip:'Mantenha trabalhadoras coletando sempre que seu estoque não estiver cheio.' },
  { id:'fungus', name:'Fungo', icon:'🍄', category:'Básico', source:'community', summary:'Alimento produzido a partir de folhas na Food Processing Chamber.', uses:['Alimentar a rainha','Criar trabalhadoras e soldados','Upgrades'], obtain:['Processamento de folhas'], tip:'A Food Processing Chamber também aumenta seu limite de trabalhadoras.' },
  { id:'seeds', name:'Sementes', icon:'🌰', category:'Básico', source:'community', summary:'Recurso usado em upgrades, especialmente conforme a colônia avança.', uses:['Upgrades de câmaras'], obtain:['Fontes de sementes no mapa'], tip:'A Seed Storage Chamber aumenta capacidade e coleta.' },
  { id:'resin', name:'Resina', icon:'🟠', category:'Avançado', source:'community', summary:'Um dos gargalos principais da progressão. É usada em sistemas ligados a soldados, Queen Chamber e outras melhorias.', uses:['Upgrades importantes','Sistemas de soldados','Beehive / progressão'], obtain:['Árvore com cupins','Co-op de cupins','Beehive','Missões diárias'], tip:'A comunidade recomenda priorizar a Resin Chamber antes de investir pesado no Creature Lab.' },
  { id:'honeydew', name:'Honeydew', icon:'🍯', category:'Avançado', source:'community', summary:'Recurso de progressão obtido principalmente em conteúdo ligado a pulgões e outras atividades.', uses:['Honeydew Shop','Melhorias de efetividade'], obtain:['Aphid Farm','Missões diárias','Beehive','Outras recompensas'], tip:'Aphid Farms começam a aparecer após construir a Honeydew Chamber.' },
  { id:'body-parts', name:'Partes de criatura', icon:'🧩', category:'Criaturas', source:'community', summary:'Material ligado a criaturas, laboratório e progressão de câmaras avançadas.', uses:['Creature Lab','Alguns upgrades avançados'], obtain:['Criaturas derrotadas','Batalhas','Vinegaroon','Co-op do Crab'], tip:'Nem sempre matar uma criatura é a melhor escolha; capturar pode ser mais valioso para fusões.' },
  { id:'water', name:'Água', icon:'💧', category:'Jardim', source:'community', summary:'Armazenada na Water Storage Chamber e ligada ao sistema de sementes de flores.', uses:['Jardim','Desbloqueio de sementes de flores'], obtain:['Fontes de água no mapa'], tip:'Níveis maiores da Water Storage Chamber desbloqueiam diferentes sementes.' },
  { id:'gems', name:'Gemas', icon:'💎', category:'Premium', source:'community', summary:'Moeda usada em várias melhorias e opções de conveniência.', uses:['Creature Lab em upgrades avançados','Lojas e bônus'], obtain:['Recompensas e sistemas do jogo'], tip:'Evite gastar sem saber se a melhoria é permanente ou temporária.' },
  { id:'pheromones', name:'Feromônios', icon:'🧪', category:'Criaturas', source:'community', summary:'Usados para atrair criaturas e, dependendo do tipo, acessar variantes melhores.', uses:['Atrair criaturas'], obtain:['Red Ant Queen','PvP / ligas, dependendo do tipo'], tip:'Algumas criaturas exigem condições extras de horário, clima ou item.' },
  { id:'battle-tokens', name:'Fichas de batalha', icon:'🎟️', category:'Combate', source:'community', summary:'Consumíveis ligados a entradas em certos conteúdos de batalha.', uses:['Atividades e entradas específicas'], obtain:['Recompensas do jogo'], tip:'Guarde algumas para conteúdo que tenha recompensa importante para sua fase.' }
];

export const chambers = [
  { id:'food-processing', name:'Food Processing Chamber', pt:'Câmara de processamento', icon:'🍄', maxLevel:12, source:'community', priority:'Alta', summary:'Transforma folhas em fungo, aumenta armazenamento e também o número máximo de trabalhadoras.', facts:['Até 9.999 de fungo','Até 150 trabalhadoras no nível máximo'], why:'É barata no começo e acelera praticamente toda a economia da colônia.' },
  { id:'leaf-storage', name:'Leaf Storage Chamber', pt:'Armazém de folhas', icon:'🍃', maxLevel:12, source:'community', priority:'Alta', summary:'Armazena folhas coletadas pelas trabalhadoras.', facts:['Até 9.999 folhas no nível máximo'], why:'Evita desperdício de coleta e sustenta upgrades e produção de fungo.' },
  { id:'seed-storage', name:'Seed Storage Chamber', pt:'Armazém de sementes', icon:'🌰', maxLevel:12, source:'community', priority:'Alta', summary:'Armazena sementes e aumenta a capacidade de coleta da fonte de sementes.', facts:['Até 9.999 sementes no nível máximo'], why:'Barata relativamente cedo e necessária para vários upgrades.' },
  { id:'queen', name:"Queen's Chamber", pt:'Câmara da rainha', icon:'👑', maxLevel:12, source:'community', priority:'Crítica', summary:'Onde fica a rainha. O nível da câmara determina a força dos soldados e influencia fortemente a progressão.', facts:['Soldados chegam ao nível 11','A rainha ganha vida conforme a câmara sobe'], why:'Soldados mais fortes ajudam em criaturas, Red Ants, Fire Ant Nest, co-op e batalhas.' },
  { id:'nursery', name:'Nursery Chamber', pt:'Berçário', icon:'🥚', maxLevel:12, source:'community', priority:'Média', summary:'Armazena ovos produzidos pela rainha.', facts:['Até 13 ovos no nível máximo'], why:'Ajuda o fluxo de reposição de formigas sem ser o primeiro gargalo de progressão.' },
  { id:'body-parts', name:'Body Parts Chamber', pt:'Câmara de partes', icon:'🧩', maxLevel:12, source:'community', priority:'Alta', summary:'Armazena partes de criaturas obtidas em carcaças, batalhas e co-ops.', facts:['Até 9.999 partes','Influencia recompensa do Vinegaroon segundo a wiki comunitária'], why:'É necessária para progressão avançada e para subir a Resin Chamber nos níveis finais.' },
  { id:'creatures', name:'Creatures Chamber', pt:'Câmara de criaturas', icon:'🪲', maxLevel:12, source:'community', priority:'Situacional', summary:'Permite capturar criaturas; níveis iniciais melhoram fusão e níveis superiores liberam upgrades do Creature Lab.', facts:['Fusão melhora até o nível 4','Níveis 5–12 liberam níveis maiores no Creature Lab'], why:'Muito útil, mas a comunidade recomenda não acelerar além do nível 4 antes de resolver o gargalo de resina.' },
  { id:'honeydew', name:'Honeydew Chamber', pt:'Câmara de honeydew', icon:'🍯', maxLevel:12, source:'community', priority:'Média', summary:'Armazena honeydew e libera o aparecimento de Aphid Farms.', facts:['Até 9.999 honeydew na referência comunitária'], why:'Abre uma fonte importante de honeydew e sistemas da Honeydew Shop.' },
  { id:'resin', name:'Resin Chamber', pt:'Câmara de resina', icon:'🟠', maxLevel:12, source:'review', priority:'Crítica', summary:'Armazena resina e é um dos principais limites para o avanço da Queen Chamber.', facts:['A página dedicada informa capacidade máxima de 99.999','Uma página-resumo antiga mostra valor diferente; a wiki marca o conflito'], why:'É um dos maiores gargalos do mid/late game e deve receber prioridade de partes de criatura.' },
  { id:'water', name:'Water Storage Chamber', pt:'Câmara de água', icon:'💧', maxLevel:12, source:'community', priority:'Média', summary:'Armazena água e desbloqueia diferentes sementes do sistema de flores.', facts:['Níveis maiores mudam o conjunto de sementes disponíveis'], why:'Importante quando o jardim e flores passam a fazer parte da sua progressão.' }
];

export const creatures = [
  { id:'tarantula', name:'Tarantula', rarity:'Comum', roles:['Corpo a corpo'], hp:3, atk:5, speed:3.5, bodyParts:20, capture:'30 s', attraction:'Qualquer condição', source:'community', phase:'Início', note:'Primeira linha razoável para quem ainda está montando o exército.' },
  { id:'praying-mantis', name:'Praying Mantis', rarity:'Comum', roles:['Dano'], hp:2, atk:6, speed:4.25, bodyParts:20, capture:'30 s', attraction:'Qualquer condição', source:'community', phase:'Início', note:'Ataque melhor que a Tarantula, porém mais frágil.' },
  { id:'tiger-beetle', name:'Tiger Beetle', rarity:'Incomum', roles:['Dano','Sniper'], hp:2, atk:7.5, speed:10, bodyParts:20, capture:'1 min', attraction:'Qualquer condição', source:'community', phase:'Início / meio', note:'Muito rápida e orientada a dano; pode alcançar alvos com facilidade.' },
  { id:'scorpion', name:'Scorpion', rarity:'Incomum', roles:['Dano','Sniper'], hp:3, atk:9, speed:4.25, bodyParts:20, capture:'1 min', attraction:'Crepúsculo ou noite', source:'community', phase:'Início / meio', note:'Frequentemente recomendado por jogadores como uma das melhores criaturas não especiais do early game.' },
  { id:'butterfly', name:'Butterfly', rarity:'Incomum', roles:['Curandeiro'], hp:2, atk:3.5, speed:3.5, bodyParts:20, capture:'2 min', attraction:'Amanhecer ou dia', source:'community', phase:'Situacional', note:'Função de suporte; útil por cura em vez de dano bruto.' },
  { id:'bombardier-beetle', name:'Bombardier Beetle', rarity:'Rara', roles:['Tanque','Controle de grupo'], hp:7, atk:4, speed:1, bodyParts:60, capture:'2 min', attraction:'Qualquer condição', source:'community', phase:'Meio', note:'Boa vida e ataque em área; aparece com frequência em recomendações de defesa.' },
  { id:'rhinoceros-beetle', name:'Rhinoceros Beetle', rarity:'Rara', roles:['Tanque','Controle de grupo'], hp:9.5, atk:4.5, speed:1, bodyParts:80, capture:'2 min', attraction:'Crepúsculo ou noite', source:'community', phase:'Meio', note:'Extremamente resistente, mas lento.' },
  { id:'dragonfly', name:'Dragonfly', rarity:'Rara', roles:['Corpo a corpo','Dano','Sniper'], hp:3.25, atk:9.5, speed:7, bodyParts:20, capture:'2 min', attraction:'Durante chuva', source:'community', phase:'Meio', note:'Alto dano e boa velocidade; depende de condição climática para atração.' },
  { id:'hornet', name:'Asian Giant Hornet', rarity:'Rara', roles:['Corpo a corpo','Dano'], hp:7, atk:7.5, speed:6, bodyParts:60, capture:'1 min', attraction:'Segurar honeycomb ao atrair', source:'community', phase:'Início / meio', note:'Boa opção intermediária; jogadores alertam que perde valor contra certos counters mais tarde.' },
  { id:'centipede', name:'Centipede', rarity:'Rara', roles:['Corpo a corpo','Dano'], hp:7, atk:9, speed:2.5, bodyParts:60, capture:'2 min', attraction:'Crepúsculo ou noite', source:'community', phase:'Meio', note:'Combinação forte de vida e ataque, com velocidade baixa.' },
  { id:'crab', name:'Crab', rarity:'Lendária', roles:['Tanque','Controle de grupo'], hp:9.5, atk:4, speed:2.5, bodyParts:0, capture:'Instantâneo', attraction:'Recompensa ligada ao Crab Beach co-op', source:'community', phase:'Avançado', note:'Não é atraído como criatura comum; entra no exército por progressão específica.' },
  { id:'frog', name:'Frog', rarity:'Lendária', roles:['Especial'], hp:null, atk:null, speed:null, bodyParts:0, capture:'Instantâneo', attraction:'Obtido por progressão específica', source:'community', phase:'Avançado', note:'Criatura de progressão avançada; stats numéricos ainda estão marcados para verificação nesta base.' }
];

export const specialCreatures = [
  'Ghost Mantis','Christmas Spider','Paussinae Beetle','Monarch Butterfly','Festive Tiger Beetle','Halloween Pennant','Christmas Beetle','Shocking Pink Dragon Millipede','Orchid Mantis','Emperor Scorpion','Emerald Cockroach Wasp','Skull Spider','Red Costate Tiger Moth','Roseate Skimmer Dragonfly','Flower Chafer Beetle','Manticora Tiger Beetle','Trilobite Beetle','Lugubrious Bombardier Beetle','Antlered Wasp','Christmas Crab','Red Scorpion','Jeweled Flower Mantis','Cyanide Millipede','Common Eastern Firefly','Halloween Hisser'
].map((name, index)=>({ id:`special-${index+1}`, name, rarity:'Especial', source:'community' }));

export const mechanics = [
  { id:'capture', name:'Captura de criaturas', icon:'🪤', source:'official', summary:'Derrote criaturas e leve-as para a Creatures Chamber para adicioná-las ao seu exército. A wiki comunitária também documenta fusão e Creature Lab.' },
  { id:'pvp', name:'PvP / invasões', icon:'⚔️', source:'official', summary:'É possível invadir colônias de outros jogadores por recursos e itens bônus.' },
  { id:'red-ants', name:'Red Ant Colony', icon:'🐜', source:'official', summary:'A descrição oficial destaca derrotar a colônia de formigas vermelhas diariamente para itens extras.' },
  { id:'aphid-farm', name:'Aphid Farm', icon:'🍯', source:'community', summary:'Uma das principais fontes de honeydew. Uma nova fazenda aparece 6 horas após a anterior ser derrotada.' },
  { id:'fire-ant-nest', name:'Fire Ant Nest', icon:'🔥', source:'community', summary:'Conteúdo com 15 câmaras progressivamente mais difíceis. É melhor encarar quando a colônia já estiver mais desenvolvida.' },
  { id:'beehive', name:'Beehive', icon:'🐝', source:'community', summary:'Conteúdo da árvore ligado a honeycomb, resin e honeydew; exige mecânicas próprias de acesso.' },
  { id:'co-op', name:'Co-op', icon:'🤝', source:'community', summary:'Atividades cooperativas ligadas a bosses e recursos; comunidades organizadas costumam facilitar grupos consistentes.' },
  { id:'garrison', name:'Garrison', icon:'🚩', source:'community', summary:'Permite posicionar uma bandeira para concentrar soldados em uma área do mapa; útil para defesa de rotas e recursos.' }
];

export const beginnerSteps = [
  { step:1, title:'Economia antes de luxo', text:'Suba Food Processing, Leaf Storage e Seed Storage com frequência para não travar coleta e produção.' },
  { step:2, title:'Rainha + resina', text:'Queen Chamber melhora soldados; Resin Chamber limita parte dessa progressão. Trate as duas como núcleo do avanço.' },
  { step:3, title:'Monte um exército funcional', text:'No começo, criaturas comuns e incomuns já ajudam. Scorpion, Bombardier e Centipede aparecem repetidamente em recomendações da comunidade.' },
  { step:4, title:'Não corra para o late game', text:'Fire Ant Nest, flores avançadas, Creature Lab alto e outros sistemas podem esperar até sua base estar preparada.' },
  { step:5, title:'Use atividades recorrentes', text:'Red Ants diárias, Aphid Farm, missões e co-op ajudam a obter recursos que o mapa normal não entrega rápido.' }
];

export const guides = [
  { id:'beginner', title:'Guia de início: o que priorizar', level:'Iniciante', source:'consensus', summary:'Ordem prática para evitar gastar recursos raros cedo demais.', bullets:['Food Processing + armazenamentos básicos','Queen Chamber e Resin Chamber como eixo de progressão','Criaturas suficientes para lutar sem perseguir perfeição cedo','Entrar em clã/comunidade para co-ops quando possível'] },
  { id:'resin', title:'Como organizar seu farm de resina', level:'Iniciante / intermediário', source:'community', summary:'Fontes, prioridades e por que resina vira gargalo.', bullets:['Árvore com cupins','Termite co-op','Beehive','Missões diárias','Evitar drenar partes de criatura no Creature Lab cedo demais'] },
  { id:'honeydew', title:'Honeydew: fontes e rotina', level:'Iniciante / intermediário', source:'community', summary:'Aphid Farm, missões e outras fontes em uma única rotina.', bullets:['Construir Honeydew Chamber','Aphid Farm reaparece após 6h','Missões diárias ajudam','Beehive pode complementar'] },
  { id:'creatures', title:'Captura, fusão e Creature Lab', level:'Todos', source:'community', summary:'Quando capturar, quando fundir e quando começar a investir em stats.', bullets:['Capturar costuma ser melhor que matar no começo','Fusão usa criaturas duplicadas','Creature Chamber melhora fusão até o nível 4','Creature Lab aplica melhorias permanentes por espécie'] },
  { id:'defense', title:'Defesa da colônia', level:'Intermediário', source:'consensus', summary:'Princípios de posicionamento e composição observados pela comunidade.', bullets:['Evite concentrar tudo em um ponto vulnerável','Use Garrison para proteger áreas úteis','Misture dano, resistência e controle','Meta muda: marque estratégias por data/versão'] },
  { id:'progression', title:'Early → mid → late game', level:'Todos', source:'consensus', summary:'Mapa de prioridades por fase sem fingir que tudo deve ser feito ao mesmo tempo.', bullets:['Early: economia + soldados + primeiras criaturas','Mid: resina, honeydew, co-op, criaturas raras','Late: Creature Lab alto, flores, bosses e otimização PvP'] }
];

export const glossary = [
  ['QC','Queen Chamber; abreviação usada por jogadores.'],
  ['BP','Body Parts / partes de criatura.'],
  ['Fusion','Combinação de criaturas para tentar obter uma criatura com mais estrelas.'],
  ['Creature Lab','Sistema de upgrades permanentes de stats por espécie.'],
  ['Garrison','Bandeira que reúne soldados em uma área definida.'],
  ['Co-op','Conteúdo cooperativo com outros jogadores.'],
  ['Early game','Fase inicial da progressão.'],
  ['Mid game','Fase intermediária, quando resina, honeydew e co-op pesam mais.'],
  ['Late game','Fase avançada com upgrades longos, bosses, PvP e otimização de criaturas.']
];

export const dailyTasks = [
  { id:'red-ants', label:'Red Ant Colony / recompensa diária' },
  { id:'daily-quests', label:'Missões diárias' },
  { id:'aphid', label:'Checar Aphid Farm / honeydew' },
  { id:'resin', label:'Enviar trabalhadoras para resina quando fizer sentido' },
  { id:'creature', label:'Checar criatura disponível / captura' },
  { id:'coop', label:'Ver co-op / clã / grupo disponível' }
];

export const sourceNotes = [
  'Mecânicas amplas do jogo são confirmadas pela página oficial da Google Play, atualizada em 25/08/2026.',
  'Stats, tempos, papéis e detalhes de câmaras vêm de uma wiki comunitária; a wiki BR mostra o tipo de fonte em cada card.',
  'Estratégias vindas de Reddit/comunidade são marcadas como consenso, não como regra oficial.',
  'Quando duas páginas comunitárias discordam, o dado recebe selo “A revisar” em vez de esconder o conflito.'
];
