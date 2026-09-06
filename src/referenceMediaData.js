const bi=(pt,en)=>({pt,en});
const fandom='https://pocketants.fandom.com/wiki/';
const page=slug=>`${fandom}${slug}`;
const screenshots=page('Screenshots_Guide');
const redirect=name=>`${fandom}Special:Redirect/file/${encodeURIComponent(name).replace(/%2F/g,'/')}`;
const candidates=base=>[
  redirect(`${base}.png`),
  redirect(`${base}.jpg`),
  redirect(`${base}.jpeg`),
  redirect(`${base}.gif`)
];
const shot=(base,alt,caption,source,sourceLabel,extra={})=>({
  candidates:candidates(base),
  image:candidates(base)[0],
  alt,caption,source,sourceLabel,...extra
});
const known=(url,alt,caption,source,sourceLabel,extra={})=>({candidates:[url],image:url,alt,caption,source,sourceLabel,...extra});
const group=(title,items,note=null)=>({title,items,note});

/**
 * Real/documented Pocket Ants visuals only — never generated artwork.
 * Most images resolve through Fandom Special:Redirect so the source wiki keeps ownership/hosting.
 * Each item carries several extension candidates because older PocketAnts Wiki uploads are not
 * consistent about PNG/JPG/GIF. The UI rotates candidates before showing a graceful fallback.
 */
export const REFERENCE_MEDIA={
  world:{
    environment:{
      featured:true,
      groups:[group(bi('Mapa principal','Main map'),[
        shot('Sandbox_Map_3',bi('Mapa normal completo do mundo principal de Pocket Ants.','Full normal map of the main Pocket Ants world.'),bi('Mapa normal / Sandbox. Use para reconhecer a posição dos principais pontos do mundo.','Normal / Sandbox map. Use it to recognize the main world landmarks.'),screenshots,bi('Screenshots Guide — Sandbox Map 3','Screenshots Guide — Sandbox Map 3'),{
          candidates:[redirect('Sandbox_Map_3.png'),redirect('Sandbox_Map_3.jpg'),'https://imag.malavida.com/mvimgbig/download-fs/pocket-ants-28514-3.jpg']
        })
      ])]
    },
    weather:{
      featured:true,
      groups:[
        group(bi('Os 4 momentos do ciclo','The 4 day-cycle phases'),[
          shot('Dawn',bi('Amanhecer no mapa de Pocket Ants.','Dawn on the Pocket Ants map.'),bi('Amanhecer — fase curta do ciclo.','Dawn — short phase of the cycle.'),page('Weather'),bi('Weather — Dawn','Weather — Dawn')),
          shot('Daytime',bi('Dia no mapa de Pocket Ants.','Daytime on the Pocket Ants map.'),bi('Dia — iluminação normal do mapa.','Daytime — normal map lighting.'),page('Weather'),bi('Weather — Daytime','Weather — Daytime')),
          shot('Dusk',bi('Entardecer no mapa de Pocket Ants.','Dusk on the Pocket Ants map.'),bi('Entardecer — transição curta para a noite.','Dusk — short transition into night.'),page('Weather'),bi('Weather — Dusk','Weather — Dusk')),
          shot('Night_time',bi('Noite no mapa de Pocket Ants.','Night on the Pocket Ants map.'),bi('Noite — aparência escura do mapa.','Night — dark appearance of the map.'),page('Weather'),bi('Weather — Night time','Weather — Night time'))
        ],bi('A própria página Weather documenta Dawn, Daytime, Dusk e Night time como as quatro fases visuais do ciclo.','The Weather page documents Dawn, Daytime, Dusk and Night time as the four visual phases.')),
        group(bi('Chuva e neve por horário','Rain & snow by phase'),[
          shot('Dawn_rain',bi('Amanhecer com chuva.','Dawn with rain.'),bi('Amanhecer + chuva.','Dawn + rain.'),page('Weather'),bi('Weather gallery','Weather gallery')),
          shot('Dawn_snow',bi('Amanhecer com neve.','Dawn with snow.'),bi('Amanhecer + neve de evento.','Dawn + event snow.'),page('Weather'),bi('Weather gallery','Weather gallery')),
          shot('Day_rain',bi('Dia com chuva.','Day with rain.'),bi('Dia + chuva.','Day + rain.'),page('Weather'),bi('Weather gallery','Weather gallery')),
          shot('Day_snow',bi('Dia com neve.','Day with snow.'),bi('Dia + neve de evento.','Day + event snow.'),page('Weather'),bi('Weather gallery','Weather gallery')),
          shot('Dusk_rain',bi('Entardecer com chuva.','Dusk with rain.'),bi('Entardecer + chuva.','Dusk + rain.'),page('Weather'),bi('Weather gallery','Weather gallery')),
          shot('Dusk_snow',bi('Entardecer com neve.','Dusk with snow.'),bi('Entardecer + neve de evento.','Dusk + event snow.'),page('Weather'),bi('Weather gallery','Weather gallery')),
          shot('Night_rain',bi('Noite com chuva.','Night with rain.'),bi('Noite + chuva.','Night + rain.'),page('Weather'),bi('Weather gallery','Weather gallery')),
          shot('Night_snow',bi('Noite com neve.','Night with snow.'),bi('Noite + neve de evento.','Night + event snow.'),page('Weather'),bi('Weather gallery','Weather gallery'))
        ],bi('Neve é sazonal de Christmas Events; chuva pode ocorrer normalmente e afeta Garden e velocidade de workers/soldiers.','Snow is seasonal to Christmas Events; rain can occur normally and affects the Garden and worker/soldier speed.'))
      ]
    },
    garden:{
      groups:[
        group(bi('Garden e cultivo','Garden & growing'),[
          shot('Full_view_of_the_garden',bi('Visão completa do Garden.','Full view of the Garden.'),bi('Os seis plots do Garden vistos pela interface do jogo.','The Garden’s six plots as seen in the game interface.'),page('Garden'),bi('Garden — full view','Garden — full view')),
          shot('A_digging_patch',bi('Digging patch usado para obter sementes.','Digging patch used to obtain seeds.'),bi('Digging patch encontrado no mapa.','Digging patch found on the map.'),page('Garden'),bi('Garden — digging patch','Garden — digging patch')),
          shot('Three_phases_of_a_flower_growth',bi('Três fases de crescimento de uma flor.','Three phases of flower growth.'),bi('Semente, broto e flor durante o cultivo.','Seed, sprout and flower during growth.'),page('Garden'),bi('Garden — flower growth','Garden — flower growth')),
          shot('Two_active_flowers_in_the_Inventory_tab',bi('Duas flores ativas no inventário.','Two active flowers in the inventory.'),bi('Exemplo do limite visual de duas flores temporárias ativas.','Example of the two-active-temporary-flower limit.'),page('Garden'),bi('Garden — active flowers','Garden — active flowers'))
        ])
      ]
    },
    'garden-flowers':{
      groups:[group(bi('Referências do Garden','Garden references'),[
        shot('A_seed_in_the_garden_inventory',bi('Semente no inventário do Garden.','Seed in the Garden inventory.'),bi('Como uma seed aparece no inventário.','How a seed appears in the inventory.'),page('Garden'),bi('Garden inventory','Garden inventory')),
        shot('A_flower_in_the_inventory',bi('Flor pronta no inventário do Garden.','Finished flower in the Garden inventory.'),bi('Como uma flor colhida aparece no inventário.','How a harvested flower appears in the inventory.'),page('Garden'),bi('Garden inventory','Garden inventory')),
        shot('Two_active_flowers_in_the_Inventory_tab',bi('Duas flores temporárias ativas.','Two active temporary flowers.'),bi('Exemplo real de flores ativas.','Real example of active flowers.'),page('Garden'),bi('Garden — active flowers','Garden — active flowers'))
      ])]
    },
    'pet-aphids':{
      groups:[group(bi('Pet Aphids','Pet Aphids'),[
        shot('Pet_aphid_idle_animation',bi('Pet Aphid em animação idle.','Pet Aphid idle animation.'),bi('Aparência de um Pet Aphid seguindo/aguardando o player.','Appearance of a Pet Aphid while idle/following the player.'),page('Pet_Aphid'),bi('Pet Aphid — idle animation','Pet Aphid — idle animation')),
        shot('Obtained_a_new_pet_aphid',bi('Mensagem de obtenção de Pet Aphid.','Pet Aphid obtained message.'),bi('Tela exibida quando um Pet Aphid é obtido ao colher.','Screen shown when a Pet Aphid is obtained from harvesting.'),page('Pet_Aphid'),bi('Pet Aphid — obtaining','Pet Aphid — obtaining'))
      ])]
    },
    'aphid-farm':{
      groups:[group(bi('Farm e convoy','Farm & convoy'),[
        shot('An_aphid_farm_guarded_by_fire_ants',bi('Aphid Farm guardada por Fire Ants.','Aphid Farm guarded by Fire Ants.'),bi('Como a Aphid Farm aparece no mapa antes do convoy.','How an Aphid Farm appears on the map before the convoy.'),page('Aphid_Farm'),bi('Aphid Farm','Aphid Farm')),
        shot('A_single_aphid',bi('Um aphid individual.','A single aphid.'),bi('O aphid que os workers carregam durante o convoy.','The aphid workers carry during the convoy.'),page('Aphid_Farm'),bi('Aphid Farm — aphid','Aphid Farm — aphid'))
      ])]
    },
    tree:{
      groups:[group(bi('Tree e Resin','Tree & Resin'),[
        shot('Tree_Map_Pocket_Ants',bi('Mapa da área da Tree.','Map of the Tree area.'),bi('Mapa da Tree, usado para localizar Resin Source e Termites.','Tree map used to locate the Resin Source and Termites.'),screenshots,bi('Screenshots Guide — Tree Map Pocket Ants','Screenshots Guide — Tree Map Pocket Ants')),
        shot('resin_source',bi('Resin Source dentro da Tree.','Resin Source inside the Tree.'),bi('Fonte de Resin que os workers coletam.','Resin source gathered by workers.'),page('Tree'),bi('Tree — resin source','Tree — resin source')),
        shot('tree_on_the_minimap',bi('Tree mostrada no minimapa.','Tree shown on the minimap.'),bi('Ícone/posição da Tree no minimapa.','Tree icon/location on the minimap.'),page('Tree'),bi('Tree — minimap','Tree — minimap'))
      ])]
    },
    beehive:{
      groups:[group(bi('Entrada e labirinto','Entrance & maze'),[
        shot('Player_ant_with_bee_essence_entering_the_bee_nest',bi('Player com Bee Essence entrando na Beehive.','Player with Bee Essence entering the Beehive.'),bi('Entrada na Beehive usando Bee Essence.','Entering the Beehive using Bee Essence.'),page('Beehive'),bi('Beehive — entrance','Beehive — entrance')),
        shot('Beehive_guide',bi('Guia visual do labirinto da Beehive.','Visual Beehive maze guide.'),bi('Referência visual do labirinto e da rota até a Queen Bee.','Visual reference for the maze and route to the Queen Bee.'),page('Beehive'),bi('Beehive guide','Beehive guide'))
      ])]
    },
    'red-ant-nest':{
      groups:[group(bi('Ninho vermelho','Red nest'),[
        shot('Full_red_ant_nest',bi('Interior completo do Red Ant Nest.','Full Red Ant Nest interior.'),bi('Estrutura interna do Red Ant Nest e suas câmaras.','Interior layout of the Red Ant Nest and its chambers.'),page('Red_Ant_Nest'),bi('Red Ant Nest — full nest','Red Ant Nest — full nest'))
      ])]
    },
    'fire-ant-nest':{
      groups:[group(bi('Fire Ant Nest','Fire Ant Nest'),[
        shot('A_close-up_of_the_nest',bi('Close-up do Fire Ant Nest no mapa.','Close-up of the Fire Ant Nest on the map.'),bi('A entrada do dungeon de Fire Ants.','The Fire Ant dungeon entrance.'),page('Fire_Ant_Nest'),bi('Fire Ant Nest — close-up','Fire Ant Nest — close-up'))
      ])]
    },
    garrison:{
      groups:[group(bi('Garrison','Garrison'),[
        shot('Garrison',bi('Garrison posicionada no mapa.','Garrison positioned on the map.'),bi('Exemplo visual de soldiers em patrulha de Garrison.','Visual example of soldiers on Garrison patrol.'),page('Garrison'),bi('Garrison','Garrison'))
      ])]
    },
    acorns:{
      groups:[group(bi('Acorn no mapa','Acorn on the map'),[
        shot('An_acorn_on_the_Mini-map',bi('Acorn visível no minimapa.','Acorn visible on the minimap.'),bi('O Acorn não aparece no mapa grande, mas pode ser rastreado pelo minimapa.','The Acorn does not appear on the full map, but can be tracked on the minimap.'),page('Acorns'),bi('Acorns — minimap','Acorns — minimap'))
      ])]
    },
    vinegaroon:{
      groups:[group(bi('Vinegaroon e alcance','Vinegaroon & range'),[
        shot('Vinegaroon',bi('Vinegaroon no mapa.','Vinegaroon on the map.'),bi('Mini-boss de fim de semana.','Weekend mini-boss.'),page('Vinegaroon'),bi('Vinegaroon','Vinegaroon')),
        shot('Range_of_Vinegaroon_s_spit_attack_represented_on_the_Minimap_by_a_red_circle',bi('Alcance do ataque do Vinegaroon no minimapa.','Vinegaroon attack range on the minimap.'),bi('O círculo vermelho ajuda a visualizar a área perigosa do spit attack.','The red circle helps visualize the dangerous spit-attack area.'),page('Vinegaroon'),bi('Vinegaroon — attack range','Vinegaroon — attack range'))
      ])]
    },
    corpses:{
      groups:[group(bi('Corpse como source','Corpse as a source'),[
        shot('Message_when_selecting_a_source',bi('Mensagem ao selecionar corpse como source.','Message when selecting a corpse as a source.'),bi('Feedback do jogo ao marcar uma carcaça para Body Parts.','Game feedback when marking a corpse for Body Parts.'),page('Body_Parts'),bi('Body Parts — selecting source','Body Parts — selecting source'))
      ])]
    },
    strawberry:{
      groups:[group(bi('Strawberry','Strawberry'),[
        shot('Strawberry_icon',bi('Ícone da Strawberry.','Strawberry icon.'),bi('Ícone da fonte ilimitada de 24 horas vendida por Gems.','Icon for the 24-hour unlimited source sold for Gems.'),page('Gem_Shop'),bi('Gem Shop — Strawberry','Gem Shop — Strawberry'))
      ])]
    },
    rock:{
      groups:[group(bi('Rock e Shrine','Rock & Shrine'),[
        shot('Rock',bi('A Rock no mapa.','The Rock on the map.'),bi('O easter egg Rock no mundo principal.','The Rock easter egg in the main world.'),page('Rock'),bi('Rock','Rock')),
        shot('The_path_leading_to_the_rock_shrine',bi('Caminho para o Rock Shrine.','Path leading to the Rock Shrine.'),bi('Passagem secreta revelada pelo puzzle da Rock.','Secret passage revealed by the Rock puzzle.'),page('Rock'),bi('Rock Shrine — path','Rock Shrine — path')),
        shot('Rock_Shrine_day_4_non_unique_message',bi('Interior do Rock Shrine.','Rock Shrine interior.'),bi('Exemplo do Shrine após o puzzle.','Example of the Shrine after the puzzle.'),page('Rock'),bi('Rock Shrine','Rock Shrine'))
      ])]
    }
  },
  upgrades:{
    shops:{
      featured:true,
      groups:[group(bi('As lojas principais','Main shops'),[
        shot('Shop_Honeydew_Pocket_Ants',bi('Tela da Honeydew Shop.','Honeydew Shop screen.'),bi('Interface real da Honeydew Shop.','Real Honeydew Shop interface.'),screenshots,bi('Screenshots Guide — Honeydew Shop','Screenshots Guide — Honeydew Shop')),
        shot('Shop_Pheromones_Pocket_Ants',bi('Tela da Pheromone Shop.','Pheromone Shop screen.'),bi('Interface real da Pheromone Shop.','Real Pheromone Shop interface.'),screenshots,bi('Screenshots Guide — Pheromone Shop','Screenshots Guide — Pheromone Shop')),
        shot('Shop_Resin_Pocket_Ants',bi('Tela da Resin Shop.','Resin Shop screen.'),bi('Interface real da Resin Shop.','Real Resin Shop interface.'),screenshots,bi('Screenshots Guide — Resin Shop','Screenshots Guide — Resin Shop')),
        shot('Gem_Shop_Dialog_Pocket_Ants',bi('Tela da Gem Shop.','Gem Shop screen.'),bi('Interface real da Gem Shop.','Real Gem Shop interface.'),screenshots,bi('Screenshots Guide — Gem Shop','Screenshots Guide — Gem Shop'))
      ])]
    },
    'resin-shop':{groups:[group(bi('Resin Shop','Resin Shop'),[
      shot('Shop_Resin_Pocket_Ants',bi('Tela da Resin Shop.','Resin Shop screen.'),bi('Interface real dos upgrades de Resin.','Real Resin upgrade interface.'),screenshots,bi('Screenshots Guide — Shop Resin Pocket Ants','Screenshots Guide — Shop Resin Pocket Ants'))
    ])]},
    'honeydew-shop':{groups:[group(bi('Honeydew Shop','Honeydew Shop'),[
      shot('Shop_Honeydew_Pocket_Ants',bi('Tela da Honeydew Shop.','Honeydew Shop screen.'),bi('Interface real dos upgrades de Honeydew.','Real Honeydew upgrade interface.'),screenshots,bi('Screenshots Guide — Shop Honeydew Pocket Ants','Screenshots Guide — Shop Honeydew Pocket Ants'))
    ])]},
    'pheromone-shop':{groups:[group(bi('Pheromone Shop','Pheromone Shop'),[
      shot('Shop_Pheromones_Pocket_Ants',bi('Tela da Pheromone Shop.','Pheromone Shop screen.'),bi('Interface de atração/conversão de pheromones.','Pheromone attraction/conversion interface.'),screenshots,bi('Screenshots Guide — Shop Pheromones Pocket Ants','Screenshots Guide — Shop Pheromones Pocket Ants'))
    ])]},
    'gem-shop':{groups:[group(bi('Gem Shop','Gem Shop'),[
      shot('Gem_Shop_Dialog_Pocket_Ants',bi('Tela da Gem Shop.','Gem Shop screen.'),bi('Interface real de itens, Gems e conveniências.','Real interface for items, Gems and conveniences.'),screenshots,bi('Screenshots Guide — Gem Shop Dialog Pocket Ants','Screenshots Guide — Gem Shop Dialog Pocket Ants'))
    ])]},
    'creature-lab':{groups:[group(bi('Creature Lab','Creature Lab'),[
      shot('Creature_Lab_menu_inside_the_Army_Tab',bi('Creature Lab dentro da aba Army.','Creature Lab inside the Army tab.'),bi('Tela usada para melhorar Health, Speed e Attack Rate.','Screen used to upgrade Health, Speed and Attack Rate.'),page('Creature_Lab'),bi('Creature Lab menu','Creature Lab menu'))
    ])]},
    'ant-skins':{groups:[group(bi('Skins e catálogo','Skins & catalog'),[
      shot('Ant_Skins_Shop_menu',bi('Menu da loja de Ant Skins.','Ant Skins shop menu.'),bi('Tela real de seleção de skins.','Real skin selection screen.'),page('Ant_Skins'),bi('Ant Skins — shop menu','Ant Skins — shop menu')),
      shot('Expanded_Ant_skins_menu_with_all_the_skins_ever_available',bi('Catálogo expandido de Ant Skins.','Expanded Ant Skins catalog.'),bi('Visão ampla das skins documentadas pela comunidade.','Wide view of skins documented by the community.'),page('Ant_Skins'),bi('Ant Skins — expanded catalog','Ant Skins — expanded catalog'))
    ])]},
    'legion-upgrades':{groups:[group(bi('Legions','Legions'),[
      shot('Legions',bi('Interface/sistema de Legions.','Legions interface/system.'),bi('Referência visual do sistema late-game de Legions.','Visual reference for the late-game Legions system.'),page('Legions'),bi('Legions','Legions'))
    ])]}
  },
  events:{
    'activity-bar':{groups:[group(bi('Activity Bar','Activity Bar'),[
      shot('Activity_Bar',bi('Activity Bar de evento.','Event Activity Bar.'),bi('Barra usada para acumular pontos de eventos e liberar atrações especiais.','Bar used to accumulate event points and unlock special attractions.'),page('Events'),bi('Events — Activity Bar','Events — Activity Bar'))
    ])]},
    'events-2024':{groups:[group(bi('Especiais de 2024','2024 specials'),[
      shot('Red_Scorpion',bi('Red Scorpion.','Red Scorpion.'),bi('Valentine 2024.','Valentine 2024.'),page('Red_Scorpion'),bi('Red Scorpion','Red Scorpion')),
      shot('Jeweled_Flower_Mantis',bi('Jeweled Flower Mantis.','Jeweled Flower Mantis.'),bi('Easter 2024.','Easter 2024.'),page('Jeweled_Flower_Mantis'),bi('Jeweled Flower Mantis','Jeweled Flower Mantis')),
      shot('Cyanide_Millipede',bi('Cyanide Millipede.','Cyanide Millipede.'),bi('4th Anniversary 2024.','4th Anniversary 2024.'),page('Cyanide_Millipede'),bi('Cyanide Millipede','Cyanide Millipede')),
      shot('Common_Eastern_Firefly',bi('Common Eastern Firefly.','Common Eastern Firefly.'),bi('Summer 2024.','Summer 2024.'),page('Common_Eastern_Firefly'),bi('Common Eastern Firefly','Common Eastern Firefly')),
      shot('Halloween_Hisser',bi('Halloween Hisser.','Halloween Hisser.'),bi('Halloween 2024.','Halloween 2024.'),page('Halloween_Hisser'),bi('Halloween Hisser','Halloween Hisser')),
      shot('December_Moth',bi('December Moth.','December Moth.'),bi('Christmas 2024.','Christmas 2024.'),page('December_Moth'),bi('December Moth','December Moth'))
    ])]},
    'events-2025':{groups:[group(bi('Especiais de 2025','2025 specials'),[
      shot('Red_Paper_Wasp',bi('Red Paper Wasp.','Red Paper Wasp.'),bi('Valentine 2025.','Valentine 2025.'),page('Red_Paper_Wasp'),bi('Red Paper Wasp','Red Paper Wasp')),
      shot('Ladybug',bi('Ladybug.','Ladybug.'),bi('Easter 2025.','Easter 2025.'),page('Ladybug'),bi('Ladybug','Ladybug')),
      shot('Black_Widow',bi('Black Widow.','Black Widow.'),bi('5th Anniversary 2025.','5th Anniversary 2025.'),page('Black_Widow'),bi('Black Widow','Black Widow')),
      shot('Beach_Tiger_Beetle',bi('Beach Tiger Beetle.','Beach Tiger Beetle.'),bi('Summer 2025.','Summer 2025.'),page('Beach_Tiger_Beetle'),bi('Beach Tiger Beetle','Beach Tiger Beetle')),
      shot('African_Deaths-Head_Hawkmoth',bi('African Death’s-Head Hawkmoth.','African Death’s-Head Hawkmoth.'),bi('Halloween 2025.','Halloween 2025.'),page('African_Death%27s-Head_Hawkmoth'),bi('African Death’s-Head Hawkmoth','African Death’s-Head Hawkmoth')),
      shot('White-faced_Meadowhawk',bi('White-faced Meadowhawk.','White-faced Meadowhawk.'),bi('Christmas 2025.','Christmas 2025.'),page('White-faced_Meadowhawk'),bi('White-faced Meadowhawk','White-faced Meadowhawk'))
    ])]},
    'events-2026':{featured:true,groups:[group(bi('Especiais documentadas de 2026','Documented 2026 specials'),[
      shot('Fire_Millipede',bi('Fire Millipede.','Fire Millipede.'),bi('Valentine 2026.','Valentine 2026.'),page('Fire_Millipede'),bi('Fire Millipede','Fire Millipede')),
      shot('Peacock_Spider',bi('Peacock Spider.','Peacock Spider.'),bi('Easter/Spring 2026.','Easter/Spring 2026.'),page('Peacock_spider'),bi('Peacock Spider','Peacock Spider')),
      shot('Asian_Giant_Hornet',bi('Asian Giant Hornet especial.','Special Asian Giant Hornet.'),bi('6th Anniversary 2026.','6th Anniversary 2026.'),page('Asian_Giant_Hornet'),bi('Asian Giant Hornet','Asian Giant Hornet'))
    ])]},
    'event-skins':{groups:[group(bi('Skins de evento','Event skins'),[
      shot('Event_skins',bi('Conjunto de skins de evento.','Set of event skins.'),bi('Skins limitadas documentadas na página de Ant Skins.','Limited skins documented on the Ant Skins page.'),page('Ant_Skins'),bi('Ant Skins — event skins','Ant Skins — event skins'))
    ])]}
  },
  quests:{
    'game-quests':{groups:[group(bi('Quests','Quests'),[
      shot('Quests_menu',bi('Menu de Game Quests.','Game Quests menu.'),bi('Tela usada para acompanhar a progressão das quests principais.','Screen used to track main quest progression.'),page('Quests'),bi('Quests menu','Quests menu'))
    ])]},
    'daily-quests':{featured:true,groups:[group(bi('Daily Quests','Daily Quests'),[
      shot('Daily_quests_menu',bi('Menu de Daily Quests.','Daily Quests menu.'),bi('As quatro tarefas diárias e o contador de Acorns aparecem nesta área.','The four daily tasks and Acorn counter appear in this area.'),page('Daily_Quests'),bi('Daily Quests menu','Daily Quests menu'))
    ])]},
    'daily-rewards':{groups:[group(bi('Daily Rewards','Daily Rewards'),[
      shot('Daily_Rewards',bi('Tela de Daily Rewards.','Daily Rewards screen.'),bi('Janela de login que aparece após o reset diário.','Login reward window shown after the daily reset.'),page('Daily_Rewards'),bi('Daily Rewards','Daily Rewards'))
    ])]},
    'acorn-counter':{groups:[group(bi('Acorn counter','Acorn counter'),[
      shot('An_acorn_on_the_Mini-map',bi('Acorn no minimapa.','Acorn on the minimap.'),bi('Referência visual do objeto contado diariamente.','Visual reference for the object counted daily.'),page('Acorns'),bi('Acorns — minimap','Acorns — minimap')),
      shot('Daily_quests_menu',bi('Menu de Daily Quests com contador diário.','Daily Quests menu with daily counter.'),bi('O contador fica junto das Daily Quests.','The counter sits alongside Daily Quests.'),page('Daily_Quests'),bi('Daily Quests menu','Daily Quests menu'))
    ])]},
    'battle-season-points':{groups:[group(bi('Battle Seasons','Battle Seasons'),[
      shot('Battle_Seasons',bi('Tela de Battle Seasons.','Battle Seasons screen.'),bi('Referência visual da progressão de temporada PvP.','Visual reference for PvP season progression.'),page('Battle_Seasons'),bi('Battle Seasons','Battle Seasons'))
    ])]},
    'coop-daily':{groups:[group(bi('Co-op','Co-op'),[
      shot('Co-op_Mode',bi('Tela de Co-op Mode.','Co-op Mode screen.'),bi('Área usada para escolher/entrar em atividades de Co-op.','Area used to select/join Co-op activities.'),page('Co-op_Mode'),bi('Co-op Mode','Co-op Mode'))
    ])]}
  }
};

export function referenceMedia(kind,id){return REFERENCE_MEDIA[kind]?.[id]||null;}
