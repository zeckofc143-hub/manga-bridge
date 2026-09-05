export const upgradeTables = {
  food: {
    id: 'food',
    name: 'Food Processing Chamber',
    sourceUrl: 'https://pocketants.fandom.com/wiki/Food_Processing_Chamber',
    source: 'community',
    verifiedAt: '2026-09-05',
    currentMin: 1,
    levels: [
      { level: 1, minutes: 0.25, storage: 50, workers: 5 },
      { level: 2, minutes: 1, storage: 100, workers: 10 },
      { level: 3, minutes: 3, storage: 200, workers: 15 },
      { level: 4, minutes: 5, storage: 300, workers: 20 },
      { level: 5, minutes: 10, storage: 500, workers: 25 },
      { level: 6, minutes: 30, storage: 1000, workers: 40 },
      { level: 7, minutes: 60, storage: 1500, workers: 55 },
      { level: 8, minutes: 120, storage: 2000, workers: 70 },
      { level: 9, minutes: 180, storage: 3000, workers: 90 },
      { level: 10, minutes: 360, storage: 4000, workers: 110 },
      { level: 11, minutes: 720, storage: 5000, workers: 130 },
      { level: 12, minutes: 1440, storage: 9999, workers: 150 }
    ]
  },
  leaf: {
    id: 'leaf',
    name: 'Armazém de Folhas',
    sourceUrl: 'https://pocketants.fandom.com/wiki/Leaf_Storage_Chamber',
    source: 'community',
    verifiedAt: '2026-09-05',
    currentMin: 1,
    levels: [
      { level: 1, minutes: 0.5, storage: 50 },
      { level: 2, minutes: 3, storage: 100 },
      { level: 3, minutes: 5, storage: 200 },
      { level: 4, minutes: 10, storage: 300 },
      { level: 5, minutes: 30, storage: 500 },
      { level: 6, minutes: 60, storage: 1000 },
      { level: 7, minutes: 120, storage: 1500 },
      { level: 8, minutes: 180, storage: 2000 },
      { level: 9, minutes: 360, storage: 3000 },
      { level: 10, minutes: 720, storage: 4000 },
      { level: 11, minutes: 1440, storage: 5000 },
      { level: 12, minutes: 4320, storage: 9999 }
    ]
  },
  seed: {
    id: 'seed',
    name: 'Armazém de Sementes',
    sourceUrl: 'https://pocketants.fandom.com/wiki/Seed_Storage_Chamber',
    source: 'community',
    verifiedAt: '2026-09-05',
    currentMin: 0,
    levels: [
      { level: 1, minutes: 1, storage: 50 },
      { level: 2, minutes: 5, storage: 100 },
      { level: 3, minutes: 10, storage: 200 },
      { level: 4, minutes: 30, storage: 300 },
      { level: 5, minutes: 60, storage: 500 },
      { level: 6, minutes: 120, storage: 1000 },
      { level: 7, minutes: 180, storage: 1500 },
      { level: 8, minutes: 360, storage: 2000 },
      { level: 9, minutes: 720, storage: 3000 },
      { level: 10, minutes: 1440, storage: 4000 },
      { level: 11, minutes: 4320, storage: 5000 },
      { level: 12, minutes: 10080, storage: 9999 }
    ]
  },
  queen: {
    id: 'queen',
    name: 'Câmara da Rainha',
    sourceUrl: 'https://pocketants.fandom.com/wiki/Queen%27s_Chamber',
    source: 'community',
    verifiedAt: '2026-09-05',
    currentMin: 1,
    levels: [
      { level: 2, minutes: 3, soldierLevel: 1 },
      { level: 3, minutes: 60, soldierLevel: 2 },
      { level: 4, minutes: 180, soldierLevel: 3 },
      { level: 5, minutes: 360, soldierLevel: 4 },
      { level: 6, minutes: 720, soldierLevel: 5 },
      { level: 7, minutes: 1440, soldierLevel: 6 },
      { level: 8, minutes: 2880, soldierLevel: 7 },
      { level: 9, minutes: 4320, soldierLevel: 8 },
      { level: 10, minutes: 10080, soldierLevel: 9 },
      { level: 11, minutes: 20160, soldierLevel: 10 },
      { level: 12, minutes: 40320, soldierLevel: 11 }
    ]
  },
  nursery: {
    id: 'nursery',
    name: 'Berçário',
    sourceUrl: 'https://pocketants.fandom.com/wiki/Nursery_Chamber',
    source: 'community',
    verifiedAt: '2026-09-05',
    currentMin: 0,
    levels: [
      { level: 1, minutes: 1, storage: 2 },
      { level: 2, minutes: 5, storage: 3 },
      { level: 3, minutes: 10, storage: 4 },
      { level: 4, minutes: 30, storage: 5 },
      { level: 5, minutes: 60, storage: 6 },
      { level: 6, minutes: 180, storage: 7 },
      { level: 7, minutes: 360, storage: 8 },
      { level: 8, minutes: 720, storage: 9 },
      { level: 9, minutes: 1440, storage: 10 },
      { level: 10, minutes: 4320, storage: 11 },
      { level: 11, minutes: 10080, storage: 12 },
      { level: 12, minutes: 20160, storage: 13 }
    ]
  },
  bodyParts: {
    id: 'bodyParts',
    name: 'Câmara de Partes',
    sourceUrl: 'https://pocketants.fandom.com/wiki/Body_Parts_Chamber',
    source: 'community',
    verifiedAt: '2026-09-05',
    currentMin: 0,
    levels: [
      { level: 1, minutes: 1, storage: 50 },
      { level: 2, minutes: 10, storage: 100 },
      { level: 3, minutes: 60, storage: 200 },
      { level: 4, minutes: 120, storage: 300 },
      { level: 5, minutes: 180, storage: 500 },
      { level: 6, minutes: 360, storage: 1000 },
      { level: 7, minutes: 720, storage: 1500 },
      { level: 8, minutes: 1440, storage: 2000 },
      { level: 9, minutes: 2880, storage: 3000 },
      { level: 10, minutes: 4320, storage: 4000 },
      { level: 11, minutes: 10080, storage: 5000 },
      { level: 12, minutes: 20160, storage: 9999 }
    ]
  },
  creatures: {
    id: 'creatures',
    name: 'Creatures Chamber',
    sourceUrl: 'https://pocketants.fandom.com/wiki/Creatures_Chamber',
    source: 'community',
    verifiedAt: '2026-09-05',
    currentMin: 0,
    levels: [
      { level: 1, minutes: 5, labLevel: 1 },
      { level: 2, minutes: 360, labLevel: 1 },
      { level: 3, minutes: 720, labLevel: 1 },
      { level: 4, minutes: 1440, labLevel: 2 },
      { level: 5, minutes: 2880, labLevel: 3 },
      { level: 6, minutes: 4320, labLevel: 4 },
      { level: 7, minutes: 7200, labLevel: 5 },
      { level: 8, minutes: 10080, labLevel: 6 },
      { level: 9, minutes: 14400, labLevel: 7 },
      { level: 10, minutes: 20160, labLevel: 8 },
      { level: 11, minutes: 28800, labLevel: 9 },
      { level: 12, minutes: 40320, labLevel: 10 }
    ]
  },
  honeydew: {
    id: 'honeydew',
    name: 'Câmara de Honeydew',
    sourceUrl: 'https://pocketants.fandom.com/wiki/Honeydew_Chamber',
    source: 'community',
    verifiedAt: '2026-09-05',
    currentMin: 0,
    levels: [
      { level: 1, minutes: 1, storage: 50 },
      { level: 2, minutes: 30, storage: 100 },
      { level: 3, minutes: 60, storage: 200 },
      { level: 4, minutes: 120, storage: 300 },
      { level: 5, minutes: 180, storage: 500 },
      { level: 6, minutes: 360, storage: 1000 },
      { level: 7, minutes: 720, storage: 1500 },
      { level: 8, minutes: 1440, storage: 2000 },
      { level: 9, minutes: 2880, storage: 3000 },
      { level: 10, minutes: 4320, storage: 4000 },
      { level: 11, minutes: 10080, storage: 5000 },
      { level: 12, minutes: 20160, storage: 9999 }
    ]
  },
  resin: {
    id: 'resin',
    name: 'Câmara de Resina',
    sourceUrl: 'https://pocketants.fandom.com/wiki/Resin_Chamber',
    source: 'community',
    verifiedAt: '2026-09-05',
    currentMin: 0,
    levels: [
      { level: 1, minutes: 1, storage: 3000 },
      { level: 2, minutes: 30, storage: 6000 },
      { level: 3, minutes: 60, storage: 9000 },
      { level: 4, minutes: 120, storage: 12000 },
      { level: 5, minutes: 180, storage: 20000 },
      { level: 6, minutes: 360, storage: 25000 },
      { level: 7, minutes: 720, storage: 40000 },
      { level: 8, minutes: 1440, storage: 50000 },
      { level: 9, minutes: 2880, storage: 60000 },
      { level: 10, minutes: 4320, storage: 70000 },
      { level: 11, minutes: 10080, storage: 80000 },
      { level: 12, minutes: 20160, storage: 99999 }
    ]
  },
  water: {
    id: 'water',
    name: 'Câmara de Água',
    sourceUrl: 'https://pocketants.fandom.com/wiki/Water_Storage_Chamber',
    source: 'community',
    verifiedAt: '2026-09-05',
    currentMin: 0,
    levels: [
      { level: 1, minutes: 5, storage: 50, unlock: 'Sementes iniciais' },
      { level: 2, minutes: 360, storage: 100 },
      { level: 3, minutes: 720, storage: 200 },
      { level: 4, minutes: 1440, storage: 300 },
      { level: 5, minutes: 2880, storage: 500 },
      { level: 6, minutes: 4320, storage: 1000, unlock: 'Novo grupo de sementes' },
      { level: 7, minutes: 7200, storage: 1500 },
      { level: 8, minutes: 10080, storage: 2000 },
      { level: 9, minutes: 14400, storage: 3000 },
      { level: 10, minutes: 20160, storage: 4000, unlock: 'Bluebells e sementes avançadas' },
      { level: 11, minutes: 28800, storage: 5000 },
      { level: 12, minutes: 40320, storage: 9999 }
    ]
  }
};

export const fusionBaseChance = {
  1: { 2: 75, 3: 35, 4: 1 },
  2: { 2: 80, 3: 40, 4: 5 },
  3: { 2: 85, 3: 45, 4: 10 },
  4: { 2: 90, 3: 50, 4: 15 },
  5: { 2: 90, 3: 50, 4: 15 },
  6: { 2: 90, 3: 50, 4: 15 },
  7: { 2: 90, 3: 50, 4: 15 },
  8: { 2: 90, 3: 50, 4: 15 },
  9: { 2: 90, 3: 50, 4: 15 },
  10: { 2: 90, 3: 50, 4: 15 },
  11: { 2: 90, 3: 50, 4: 15 },
  12: { 2: 90, 3: 50, 4: 15 }
};

export const fusionBodyPartCost = { 2: 15, 3: 30, 4: 50 };
export const fusionHoneydewBonuses = [0, 2, 3, 5, 7, 10];
export const fusionClanBonuses = [0, 2, 3, 5];
export const fusionTemporaryBonuses = {
  bluebells: 5,
  rockSkin: 1,
  gems: [0, 25, 50]
};

export const creatureLabFacts = {
  maxStatLevel: 10,
  highIncreaseMaxPercentPerStat: 60,
  chamberUnlocks: [
    { chamberLevel: 4, labLevel: 2 },
    { chamberLevel: 5, labLevel: 3 },
    { chamberLevel: 6, labLevel: 4 },
    { chamberLevel: 7, labLevel: 5 },
    { chamberLevel: 8, labLevel: 6 },
    { chamberLevel: 9, labLevel: 7 },
    { chamberLevel: 10, labLevel: 8 },
    { chamberLevel: 11, labLevel: 9 },
    { chamberLevel: 12, labLevel: 10 }
  ],
  note: 'Upgrades são permanentes por espécie. A variante dourada recebe os upgrades da criatura normal; variantes especiais são melhoradas separadamente.'
};
