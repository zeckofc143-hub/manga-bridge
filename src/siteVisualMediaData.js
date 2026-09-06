const B=(pt,en)=>({pt,en});
const fandom='https://pocketants.fandom.com/wiki/';
const file=name=>`${fandom}Special:Redirect/file/${encodeURIComponent(name).replace(/%2F/g,'/')}`;
const fandomCandidates=base=>[file(`${base}.png`),file(`${base}.jpg`),file(`${base}.jpeg`),file(`${base}.gif`)];

// Stable, real Pocket Ants screenshots indexed on public review/game pages.
// They are used before Fandom redirects when the subject in the screenshot is unambiguous.
export const VISUAL_URLS={
  leaf:'https://minireview.io/common/uploads/review/015a49e59d1e8596378aee1e94ca1808.jpg',
  seeds:'https://minireview.io/common/uploads/review/076dd0532c46b42d66df7b0600324244.jpg',
  army:'https://minireview.io/common/uploads/review/cb9c8b264fa0141af1ccb9bba0c3987a.jpg',
  fungus:'https://img.itch.zone/aW1hZ2UvNjgyOTQ5LzM3NTU5MDYuanBn/794x1000/F3wpEo.jpg',
  colony:'https://stat.ameba.jp/user_images/20201013/17/torinometorio/a9/9c/p/o1080067514834288352.png?caw=800',
  gameplay:'https://img.apponic.com/46/254/dcce2267f89c2833b7b2b996d4572e2b.jpg',
  capture:'https://img.apponic.com/95/134/108df0d400fd74ecc3bf425988a2750f.jpg',
  workers:'https://img.apponic.com/244/103/514d5d494a10b2fa8f85d89d70ac6de3.jpg',
  battle:'https://imag.malavida.com/mvimgbig/download-fs/pocket-ants-28514-6.jpg',
  quests:'https://thegdwc.com/images/games/2100/2197-5.jpg'
};

const sources={
  official:'https://play.google.com/store/apps/details?id=com.ariel.zanyants&hl=pt_BR',
  mini:'https://minireview.io/strategy/pocket-ants-colony-simulator',
  apponic:'https://pocket-ants.apponic.com/android/',
  malavida:'https://www.malavida.com/br/soft/pocket-ants/android/',
  screenshots:`${fandom}Screenshots_Guide`
};

const item=(candidates,alt,caption,source=sources.screenshots,label=B('Captura real do jogo','Real game screenshot'))=>({candidates:[...new Set(candidates.filter(Boolean))],alt,caption,source,label});
const entry=(title,items,note=null)=>({title,items,note});
const f=(base)=>fandomCandidates(base);

const colonyItem=(captionPt,captionEn)=>item(
  [...f('Colony_Dialog'),VISUAL_URLS.colony,VISUAL_URLS.gameplay],
  B('Tela da colônia de Pocket Ants.','Pocket Ants colony screen.'),B(captionPt,captionEn),sources.screenshots
);
const armyItem=(captionPt,captionEn)=>item([VISUAL_URLS.army,...f('Army_Page_Pocket_Ants')],B('Tela de Army e criaturas de Pocket Ants.','Pocket Ants Army and creature screen.'),B(captionPt,captionEn),sources.mini,B('MiniReview · gameplay real','MiniReview · real gameplay'));
const battleItem=(captionPt,captionEn)=>item([VISUAL_URLS.battle,...f('Battle_Attack_Dialog'),...f('Battle_Defense_Dialog_2')],B('Tela de batalha PvP de Pocket Ants.','Pocket Ants PvP battle screen.'),B(captionPt,captionEn),sources.malavida,B('Malavida · gameplay real','Malavida · real gameplay'));

export const SITE_VISUAL_MEDIA={
  resources:{
    leaves:entry(B('Folhas no mapa','Leaves on the map'),[item([VISUAL_URLS.leaf],B('Fonte de folhas com os botões Gather e Source.','Leaf source with Gather and Source buttons.'),B('A tela mostra uma fonte real de Leaves e como ela é marcada para coleta.','The screen shows a real Leaves source and how it is selected for gathering.'),sources.mini,B('MiniReview · gameplay real','MiniReview · real gameplay'))]),
    seeds:entry(B('Sementes no mapa','Seeds on the map'),[item([VISUAL_URLS.seeds],B('Coleta de Seeds em Pocket Ants.','Seeds gathering in Pocket Ants.'),B('Referência visual de uma fonte de Seeds durante a coleta.','Visual reference for a Seeds source during gathering.'),sources.mini,B('MiniReview · gameplay real','MiniReview · real gameplay'))]),
    fungus:entry(B('Fungus e colônia','Fungus & colony'),[item([VISUAL_URLS.fungus,VISUAL_URLS.colony],B('Interface da colônia mostrando Fungus.','Colony interface showing Fungus.'),B('Fungus aparece na economia básica da colônia e alimenta criação de ants.','Fungus appears in the basic colony economy and feeds ant breeding.'),'https://arielgames.itch.io/pocket-ants',B('Ariel Games / gameplay','Ariel Games / gameplay'))]),
    'body-parts':entry(B('Criaturas e Body Parts','Creatures & Body Parts'),[item([VISUAL_URLS.capture,VISUAL_URLS.army],B('Combate contra criatura em Pocket Ants.','Creature combat in Pocket Ants.'),B('Body Parts vêm diretamente do loop de derrotar criaturas; a captura usa a mesma progressão de Creatures.','Body Parts are tied directly to defeating creatures; capture uses the same Creature progression.'),sources.apponic,B('Apponic · gameplay real','Apponic · real gameplay'))]),
    resin:entry(B('Tree e coleta de Resin','Tree & Resin gathering'),[item([...f('resin_source'),...f('Tree_Map_Pocket_Ants')],B('Resin Source na Tree.','Resin Source at the Tree.'),B('A Resin Source fica na Tree e é uma das principais referências visuais desse recurso.','The Resin Source sits at the Tree and is a key visual reference for this resource.'),`${fandom}Tree`)]),
    honeydew:entry(B('Aphid Farm e Honeydew','Aphid Farm & Honeydew'),[item([...f('An_aphid_farm_guarded_by_fire_ants'),...f('A_single_aphid')],B('Aphid Farm no mapa.','Aphid Farm on the map.'),B('Honeydew nasce do loop visual de Aphid Farm e convoy.','Honeydew comes from the visual Aphid Farm and convoy loop.'),`${fandom}Aphid_Farm`)]),
    water:entry(B('Água e Garden','Water & Garden'),[item([...f('Full_view_of_the_garden'),...f('A_digging_patch')],B('Garden de Pocket Ants.','Pocket Ants Garden.'),B('Water é o recurso de cultivo do Garden; a imagem ajuda a reconhecer onde ele é usado.','Water is the Garden growing resource; this image helps identify where it is used.'),`${fandom}Garden`)]),
    pheromones:entry(B('Pheromones e batalha','Pheromones & battle'),[battleItem('A tela de batalha mostra o contexto em que Pheromones, troféus e ligas se conectam.','The battle screen shows how Pheromones, trophies and leagues connect.')]),
    gems:entry(B('Gems na interface','Gems in the interface'),[item([VISUAL_URLS.gameplay,...f('Gem_Shop_Dialog_Pocket_Ants')],B('Interface de Pocket Ants com Gems e Shop.','Pocket Ants interface with Gems and Shop.'),B('Gems aparecem como moeda premium na interface e alimentam vários sistemas de conveniência e upgrade.','Gems appear as the premium currency and feed several convenience and upgrade systems.'),sources.apponic,B('Apponic · gameplay real','Apponic · real gameplay'))]),
    'battle-tokens':entry(B('Battle Tokens e batalhas','Battle Tokens & battles'),[battleItem('Battle Tokens são gastos principalmente em batalhas/co-ops; esta é a interface de combate onde parte desse loop acontece.','Battle Tokens are mainly spent on battles/co-ops; this is the battle interface where part of that loop happens.')])
  },

  chambers:{
    'food-processing':entry(B('Colônia e processamento','Colony & processing'),[colonyItem('Visão da colônia para contextualizar onde Food Processing participa da economia básica.','Colony view showing where Food Processing fits into the basic economy.')]),
    'leaf-storage':entry(B('Colônia e armazenamento','Colony & storage'),[colonyItem('A Colony screen é a referência visual para os armazenamentos básicos da colônia.','The Colony screen is the visual reference for basic colony storage.')]),
    'seed-storage':entry(B('Colônia e armazenamento','Colony & storage'),[colonyItem('A Colony screen reúne os upgrades de armazenamento usados no early game.','The Colony screen groups the storage upgrades used in early game.')]),
    queen:entry(B('Queen e núcleo da colônia','Queen & colony core'),[colonyItem('A Queen fica no centro da progressão da colônia, ligada a soldiers e upgrades.','The Queen sits at the core of colony progression, tied to soldiers and upgrades.')]),
    nursery:entry(B('Nursery na colônia','Nursery in the colony'),[colonyItem('Nursery faz parte da mesma visão de gerenciamento de população e ovos.','Nursery belongs to the same population and egg-management view.')]),
    'body-parts':entry(B('Body Parts e criaturas','Body Parts & creatures'),[armyItem('A evolução de criaturas e fusão compete pelo mesmo recurso guardado nesta câmara.','Creature progression and fusion compete for the same resource stored by this chamber.')]),
    creatures:entry(B('Creatures Chamber na prática','Creatures Chamber in practice'),[armyItem('A tela Army mostra Attract, Fuse, Collection e os slots que dependem da progressão de criaturas.','The Army screen shows Attract, Fuse, Collection and the slots tied to creature progression.')]),
    honeydew:entry(B('Honeydew e Aphid Farm','Honeydew & Aphid Farm'),[item([...f('An_aphid_farm_guarded_by_fire_ants')],B('Aphid Farm no mapa.','Aphid Farm on the map.'),B('Construir a Honeydew Chamber ativa justamente esse loop de Aphid Farms.','Building the Honeydew Chamber enables this Aphid Farm loop.'),`${fandom}Aphid_Farm`)]),
    resin:entry(B('Resin Chamber e Tree','Resin Chamber & Tree'),[item([...f('resin_source'),...f('Tree_Map_Pocket_Ants')],B('Resin Source na Tree.','Resin Source at the Tree.'),B('Subir a Resin Chamber aumenta a capacidade e também a fonte visual de Resin.','Upgrading the Resin Chamber raises capacity and the visible Resin source.'),`${fandom}Resin`)]),
    water:entry(B('Water Storage e Garden','Water Storage & Garden'),[item([...f('Full_view_of_the_garden')],B('Garden de Pocket Ants.','Pocket Ants Garden.'),B('Water Storage é a progressão de água/sementes que alimenta o Garden.','Water Storage is the water/seed progression that feeds the Garden.'),`${fandom}Garden`)])
  },

  mechanics:{
    capture:entry(B('Captura de criaturas','Creature capture'),[item([VISUAL_URLS.capture,VISUAL_URLS.army],B('Criatura em combate/captura.','Creature in combat/capture.'),B('Captura começa depois de derrotar a criatura e depende da Creatures Chamber.','Capture starts after defeating a creature and depends on the Creatures Chamber.'),sources.apponic)]),
    attraction:entry(B('Attract e Pheromones','Attract & Pheromones'),[armyItem('O botão Attract e o contador de Pheromones aparecem diretamente na tela Army.','The Attract button and Pheromone counter appear directly on the Army screen.')]),
    fusion:entry(B('Fusão de criaturas','Creature fusion'),[armyItem('O botão Fuse aparece junto ao exército de criaturas; esta é a referência visual do sistema.','The Fuse button sits beside the creature army; this is the visual reference for the system.')]),
    'creature-lab':entry(B('Progressão de criaturas','Creature progression'),[armyItem('Creature Lab e Creatures Chamber fazem parte da progressão do mesmo exército mostrado aqui.','Creature Lab and Creatures Chamber belong to the progression of the army shown here.')]),
    pvp:entry(B('PvP e invasões','PvP & raids'),[battleItem('Tela real do loop de ataque PvP, onde entram troféus, Pheromones e saque.','Real PvP attack loop screen, where trophies, Pheromones and loot connect.')]),
    defending:entry(B('Defesa PvP','PvP defense'),[battleItem('A defesa usa o mesmo sistema de Battle e posicionamento da colônia.','Defense uses the same Battle and colony-placement system.')]),
    leagues:entry(B('Ligas e Battle','Leagues & Battle'),[battleItem('Rank/League e Pheromones aparecem ligados à interface de batalha.','Rank/League and Pheromones connect directly to the battle interface.')]),
    'battle-tokens':entry(B('Battle Tokens','Battle Tokens'),[battleItem('Tokens alimentam o loop de batalha/co-op; esta captura ajuda a reconhecer a interface de Battle.','Tokens feed the battle/co-op loop; this screenshot helps recognize the Battle interface.')]),
    'offline-gathering':entry(B('Workers e coleta','Workers & gathering'),[item([VISUAL_URLS.workers,VISUAL_URLS.leaf],B('Tela de comportamento dos Workers.','Workers behavior screen.'),B('Coleta offline depende dos Workers atribuídos e das fontes relacionadas.','Offline gathering depends on assigned Workers and the related sources.'),sources.apponic)]),
    'daily-quests':entry(B('Quests diárias','Daily quests'),[item([VISUAL_URLS.quests,VISUAL_URLS.colony],B('Painel de quests de Pocket Ants.','Pocket Ants quest panel.'),B('A interface de Quests é onde o loop diário e suas recompensas são acompanhados.','The Quests interface is where the daily loop and rewards are tracked.'),'https://thegdwc.com/games/pocket-ants')]),
    'aphid-farm':entry(B('Aphid Farm','Aphid Farm'),[item([...f('An_aphid_farm_guarded_by_fire_ants'),...f('A_single_aphid')],B('Aphid Farm e aphid.','Aphid Farm and aphid.'),B('A imagem mostra o objetivo do convoy que gera Honeydew.','The image shows the convoy objective that generates Honeydew.'),`${fandom}Aphid_Farm`)]),
    garden:entry(B('Garden','Garden'),[item([...f('Full_view_of_the_garden'),...f('Three_phases_of_a_flower_growth')],B('Garden de Pocket Ants.','Pocket Ants Garden.'),B('Visual do sistema de plots e cultivo.','Visual of the plot and growing system.'),`${fandom}Garden`)]),
    'clan-wars':entry(B('Clan Wars','Clan Wars'),[item([...f('Clan_War'),...f('Clan_Wars')],B('Tela de Clan Wars.','Clan Wars screen.'),B('Referência visual do sistema de guerra de clãs, quando a mídia da wiki estiver disponível.','Visual reference for Clan Wars when the wiki media is available.'),`${fandom}Clan_Wars`)])
  },

  guides:{
    'starter-roadmap':entry(B('Começando no jogo','Starting the game'),[colonyItem('Visão real da colônia no começo, com Queen, Quests, Army e Battle acessíveis.','Real early-colony view with Queen, Quests, Army and Battle visible.')]),
    'early-economy':entry(B('Economia inicial','Early economy'),[item([VISUAL_URLS.leaf,VISUAL_URLS.seeds],B('Fonte de recurso no mapa.','Map resource source.'),B('Leaves e Seeds são os dois loops que o guia manda manter ativos no começo.','Leaves and Seeds are the two loops this guide keeps active early on.'),sources.mini)]),
    'queen-resin-roadmap':entry(B('Queen e progressão','Queen & progression'),[colonyItem('Use a Colony screen para reconhecer o eixo de upgrades em torno da Queen.','Use the Colony screen to recognize the upgrade path around the Queen.')]),
    'first-creatures':entry(B('Primeiro exército','First creature army'),[armyItem('A tela Army mostra exatamente os slots, estrelas, Attract e Fuse usados neste guia.','The Army screen shows the slots, stars, Attract and Fuse used in this guide.')]),
    'body-parts-roadmap':entry(B('Body Parts e criaturas','Body Parts & creatures'),[armyItem('Este guia decide quando usar Body Parts em criaturas versus progressão da colônia.','This guide decides when to spend Body Parts on creatures versus colony progression.')]),
    'resin-routine':entry(B('Tree e Resin','Tree & Resin'),[item([...f('resin_source'),...f('Tree_Map_Pocket_Ants')],B('Tree e Resin Source.','Tree and Resin Source.'),B('A rota de Resin gira principalmente ao redor dessa área do mapa.','The Resin route mainly revolves around this map area.'),`${fandom}Tree`)]),
    'honeydew-routine':entry(B('Aphid Farm','Aphid Farm'),[item([...f('An_aphid_farm_guarded_by_fire_ants')],B('Aphid Farm no mapa.','Aphid Farm on the map.'),B('A imagem mostra o começo do principal farm recorrente de Honeydew.','The image shows the start of the main recurring Honeydew farm.'),`${fandom}Aphid_Farm`)]),
    'pvp-defense':entry(B('PvP e defesa','PvP & defense'),[battleItem('Referência visual do menu de Battle usado nos ataques e defesas.','Visual reference for the Battle menu used by attacks and defenses.')])
  },

  tools:{
    farm:entry(B('Planejamento de farm','Farm planning'),[item([VISUAL_URLS.leaf,VISUAL_URLS.seeds],B('Fonte de recurso no mapa.','Resource source on the map.'),B('A ferramenta trabalha com a sua média real por run; esta é a classe de atividade que ela mede.','The tool uses your real per-run average; this is the kind of activity it measures.'),sources.mini)]),
    fusion:entry(B('Fusão','Fusion'),[armyItem('Use a imagem para reconhecer o botão Fuse e o contexto do cálculo.','Use the image to recognize the Fuse button and the context for the calculation.')]),
    'queen-resin':entry(B('Queen + Resin','Queen + Resin'),[colonyItem('O planner calcula o caminho da Queen e capacidade necessária entre upgrades.','The planner calculates the Queen path and required capacity between upgrades.')]),
    'battle-tokens':entry(B('Battle Tokens','Battle Tokens'),[battleItem('O planner serve justamente para decidir quantas entradas de Battle/co-op cabem no seu saldo.','The planner decides how many Battle/co-op entries fit your balance.')]),
    daily:entry(B('Rotina diária','Daily routine'),[item([VISUAL_URLS.quests],B('Painel de Quests.','Quests panel.'),B('A calculadora diária resume recompensas de atividades acompanhadas por este tipo de menu.','The daily calculator summarizes rewards from activities tracked through this kind of menu.'),'https://thegdwc.com/games/pocket-ants')]),
    collection:entry(B('Coleção de criaturas','Creature collection'),[armyItem('A tela Army possui o acesso à Collection e mostra estrelas/slots das criaturas.','The Army screen links to Collection and shows creature stars/slots.')]),
    'aphid-yield':entry(B('Aphid Farm','Aphid Farm'),[item([...f('An_aphid_farm_guarded_by_fire_ants'),...f('A_single_aphid')],B('Aphid Farm e convoy.','Aphid Farm and convoy.'),B('A calculadora mede exatamente o Honeydew produzido por esse loop.','The calculator measures Honeydew produced by this loop.'),`${fandom}Aphid_Farm`)]),
    'gem-budget':entry(B('Gems','Gems'),[item([VISUAL_URLS.gameplay,...f('Gem_Shop_Dialog_Pocket_Ants')],B('Interface com Gems e Shop.','Interface with Gems and Shop.'),B('O orçamento serve para comparar os vários usos dessa moeda premium.','The budget compares the many uses of this premium currency.'),sources.apponic)])
  },

  farms:{
    resin:entry(B('Farm de Resin','Resin farm'),[item([...f('resin_source'),...f('Tree_Map_Pocket_Ants')],B('Resin Source na Tree.','Resin Source at the Tree.'),B('Referência visual do ponto principal da rota de Resin.','Visual reference for the main Resin route location.'),`${fandom}Tree`)]),
    honeydew:entry(B('Farm de Honeydew','Honeydew farm'),[item([...f('An_aphid_farm_guarded_by_fire_ants'),...f('A_single_aphid')],B('Aphid Farm.','Aphid Farm.'),B('Referência visual do farm e do aphid carregado no convoy.','Visual reference for the farm and aphid carried in the convoy.'),`${fandom}Aphid_Farm`)]),
    'body-parts':entry(B('Farm de Body Parts','Body Parts farm'),[item([VISUAL_URLS.capture,VISUAL_URLS.army],B('Combate contra criatura.','Creature combat.'),B('Derrotar criaturas é uma das fontes centrais de Body Parts.','Defeating creatures is a central Body Parts source.'),sources.apponic)]),
    gems:entry(B('Farm e uso de Gems','Gem farming & use'),[item([VISUAL_URLS.gameplay],B('Interface mostrando Gems.','Interface showing Gems.'),B('A moeda aparece permanentemente na interface e conecta vários gastos do jogo.','The currency is permanently visible in the interface and connects many game expenses.'),sources.apponic)]),
    pheromones:entry(B('Pheromones','Pheromones'),[battleItem('PvP é a fonte principal de Pheromones de liga, então a tela de Battle é a referência visual correta.','PvP is the main source of league Pheromones, so the Battle screen is the right visual reference.')]),
    water:entry(B('Água e Garden','Water & Garden'),[item([...f('Full_view_of_the_garden')],B('Garden.','Garden.'),B('Water entra diretamente no cultivo do Garden.','Water feeds directly into Garden growing.'),`${fandom}Garden`)])
  },

  strategies:{
    'colony-first':entry(B('Colônia primeiro','Colony first'),[colonyItem('A recomendação prioriza justamente os sistemas básicos visíveis na tela da colônia.','The recommendation prioritizes the basic systems visible in the colony screen.')]),
    'resin-window':entry(B('Janela de Resin','Resin window'),[item([...f('resin_source'),...f('Tree_Map_Pocket_Ants')],B('Tree e Resin Source.','Tree and Resin Source.'),B('A estratégia usa a janela sem Termites para explorar essa Resin Source.','The strategy uses the Termite-free window to exploit this Resin Source.'),`${fandom}Tree`)]),
    'gem-priority':entry(B('Prioridade de Gems','Gem priority'),[item([VISUAL_URLS.gameplay,...f('Gem_Shop_Dialog_Pocket_Ants')],B('Interface com Gems.','Interface with Gems.'),B('A estratégia existe porque Gems participam de muitos sistemas ao mesmo tempo.','The strategy exists because Gems feed many systems at once.'),sources.apponic)]),
    'pvp-defense':entry(B('Defesa PvP','PvP defense'),[battleItem('Defesa e ataque compartilham a interface/estrutura de Battle da colônia.','Defense and attack share the colony Battle interface/structure.')])
  }
};

export function siteVisualMedia(kind,id){return SITE_VISUAL_MEDIA[kind]?.[id]||null;}
