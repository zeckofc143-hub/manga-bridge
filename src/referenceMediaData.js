const bi=(pt,en)=>({pt,en});
const fandom='https://pocketants.fandom.com/wiki/';
const screenshots=`${fandom}Screenshots_Guide`;
const file=name=>`${fandom}Special:Redirect/file/${name}`;

/**
 * Real Pocket Ants screenshots only. No generated artwork.
 * File names below are the screenshot names catalogued by the PocketAnts Wiki Screenshots Guide.
 * Media stays intentionally sparse: an image is attached only when it directly helps orientation or explains a visual UI.
 */
export const REFERENCE_MEDIA={
  world:{
    environment:{
      featured:true,
      image:file('Sandbox_Map_3.png'),
      fallback:'https://imag.malavida.com/mvimgbig/download-fs/pocket-ants-28514-3.jpg',
      alt:bi('Mapa normal completo do mundo principal de Pocket Ants.','Full normal map of the main Pocket Ants world.'),
      caption:bi('Mapa normal / Sandbox do jogo. Use a imagem para reconhecer a posição dos principais pontos do mundo.','Normal / Sandbox game map. Use it to recognize the position of the main world landmarks.'),
      source:screenshots,
      sourceLabel:bi('Screenshots Guide — Sandbox Map 3','Screenshots Guide — Sandbox Map 3')
    },
    tree:{
      image:file('Tree_Map_Pocket_Ants.png'),
      alt:bi('Mapa da área da árvore em Pocket Ants.','Map of the Tree area in Pocket Ants.'),
      caption:bi('Referência visual da Tree, onde ficam Resin, Termites e o acesso à Beehive.','Visual reference for the Tree, home to Resin, Termites and Beehive access.'),
      source:screenshots,
      sourceLabel:bi('Screenshots Guide — Tree Map Pocket Ants','Screenshots Guide — Tree Map Pocket Ants')
    }
  },
  upgrades:{
    shops:{
      image:file('Shop_Resin_Pocket_Ants.png'),
      alt:bi('Tela real da Resin Shop de Pocket Ants.','Real Pocket Ants Resin Shop screen.'),
      caption:bi('Exemplo real da interface usada por uma das lojas permanentes.','Real example of the interface used by one of the permanent shops.'),
      source:screenshots,
      sourceLabel:bi('Screenshots Guide — Shop','Screenshots Guide — Shop')
    },
    'resin-shop':{
      image:file('Shop_Resin_Pocket_Ants.png'),
      alt:bi('Tela da Resin Shop de Pocket Ants.','Pocket Ants Resin Shop screen.'),
      caption:bi('Resin Shop — referência visual real da interface.','Resin Shop — real visual reference of the interface.'),
      source:screenshots,
      sourceLabel:bi('Screenshots Guide — Shop Resin Pocket Ants','Screenshots Guide — Shop Resin Pocket Ants')
    },
    'honeydew-shop':{
      image:file('Shop_Honeydew_Pocket_Ants.png'),
      alt:bi('Tela da Honeydew Shop de Pocket Ants.','Pocket Ants Honeydew Shop screen.'),
      caption:bi('Honeydew Shop — referência visual real da interface.','Honeydew Shop — real visual reference of the interface.'),
      source:screenshots,
      sourceLabel:bi('Screenshots Guide — Shop Honeydew Pocket Ants','Screenshots Guide — Shop Honeydew Pocket Ants')
    },
    'pheromone-shop':{
      image:file('Shop_Pheromones_Pocket_Ants.png'),
      alt:bi('Tela da Pheromone Shop de Pocket Ants.','Pocket Ants Pheromone Shop screen.'),
      caption:bi('Pheromone Shop — referência visual real da interface.','Pheromone Shop — real visual reference of the interface.'),
      source:screenshots,
      sourceLabel:bi('Screenshots Guide — Shop Pheromones Pocket Ants','Screenshots Guide — Shop Pheromones Pocket Ants')
    },
    'gem-shop':{
      image:file('Gem_Shop_Dialog_Pocket_Ants.png'),
      alt:bi('Tela da Gem Shop de Pocket Ants.','Pocket Ants Gem Shop screen.'),
      caption:bi('Gem Shop — referência visual real do diálogo de compras.','Gem Shop — real visual reference of the purchase dialog.'),
      source:screenshots,
      sourceLabel:bi('Screenshots Guide — Gem Shop Dialog Pocket Ants','Screenshots Guide — Gem Shop Dialog Pocket Ants')
    }
  }
};

export function referenceMedia(kind,id){return REFERENCE_MEDIA[kind]?.[id]||null;}
