import {MECHANIC_PATHS,MECHANIC_RECORDS,MECHANIC_RESEARCH_META} from './mechanicResearchData';

const L=(pt,en)=>({pt,en});

MECHANIC_RESEARCH_META.note=L(
  'Pesquisa web revisada em 06/09/2026: dados atuais foram cruzados com App Store e PocketAnts Wiki; informações comunitárias continuam rotuladas separadamente.',
  'Web research reviewed on 2026-09-06: current data was cross-checked with the App Store and PocketAnts Wiki; community information remains separately labeled.'
);

if(!MECHANIC_RECORDS.some(item=>item.id==='dungeon-choice')){
  MECHANIC_RECORDS.push({
    id:'dungeon-choice',icon:'🧭',name:L('Onde gastar Battle Tokens?','Where should I spend Battle Tokens?'),category:'coop',stage:'mid-late',source:'reviewed',kind:'system',
    summary:L('Uma comparação direta das principais atividades para transformar Battle Tokens em Resin, Honeydew ou Body Parts sem ficar entrando no conteúdo errado por hábito.','A direct comparison of the main activities that convert Battle Tokens into Resin, Honeydew or Body Parts so you do not enter the wrong content by habit.'),
    facts:[
      L('Termite Nest: 3 tokens + 500 Folhas + 500 Sementes → 2.000 Resin + 30 minutos sem termites.','Termite Nest: 3 tokens + 500 Leaves + 500 Seeds → 2,000 Resin + 30 minutes with no termites.'),
      L('Fire Ant Nest: 3 tokens + 500 Folhas + 500 Sementes → Honeydew por chamber, até 150 numa conclusão completa.','Fire Ant Nest: 3 tokens + 500 Leaves + 500 Seeds → Honeydew per chamber, up to 150 on a full clear.'),
      L('Crab Beach: 3 tokens + 500 Folhas + 500 Sementes → 100 Body Parts + progresso da barra do Crab.','Crab Beach: 3 tokens + 500 Leaves + 500 Seeds → 100 Body Parts + Crab bar progress.'),
      L('Frog Pond é um co-op público diferente: rende 250 Honeydew, Red Sage seed e progresso do Frog.','Frog Pond is a different public co-op: it yields 250 Honeydew, a Red Sage seed and Frog progress.')
    ],
    steps:[
      L('Se Resin está travando Queen/Legions, priorize a rota do Termite Nest.','If Resin is blocking Queen/Legions, prioritize the Termite Nest route.'),
      L('Se Honeydew é o gargalo, compare Fire Ant Nest com Frog Pond, Aphid Farm e Beehive.','If Honeydew is the bottleneck, compare Fire Ant Nest with Frog Pond, Aphid Farm and Beehive.'),
      L('Se faltam Body Parts para Resin/Creatures, Crab Beach converte tokens diretamente nesse estoque.','If you need Body Parts for Resin/Creatures, Crab Beach converts tokens directly into that stock.')
    ],
    mistakes:[L('Escolher sempre o mesmo dungeon sem olhar qual recurso está realmente bloqueando sua progressão.','Always choosing the same dungeon without checking which resource is actually blocking your progression.')],
    related:{resources:['battle-tokens','resin','honeydew','body-parts','leaves','seeds'],chambers:['resin','honeydew','body-parts','queen','creatures'],creatures:['crab','frog']},search:'Battle Tokens Co-op Mode'
  });
}

if(MECHANIC_PATHS.daily&&!MECHANIC_PATHS.daily.ids.includes('dungeon-choice'))MECHANIC_PATHS.daily.ids.push('dungeon-choice');
