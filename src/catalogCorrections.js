export function applyCatalogCorrections(creature){
  if(creature.id !== 'christmas-crab') return creature;
  return {
    ...creature,
    rarity:'Lendária',
    captureStatus:'direct',
    capturable:false,
    obtainable:true,
    goldenAvailable:false,
    captureTime:'Instantâneo',
    attraction:'Não usa atração comum. É adicionado diretamente ao exército após completar a barra do Christmas Crab e possuir o Crab Token exigido pelo evento.',
    researchWarning:undefined,
    verification:'high',
    battleNotes:[
      ...(creature.battleNotes||[]),
      'Christmas Crab é uma variante lendária de evento e não deve ser classificada como criatura capturada após uma luta comum.'
    ]
  };
}
