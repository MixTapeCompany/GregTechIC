Callback.addCallback("PreLoaded", function(){
    /* Alloy Smelter */
    GTRecipe.addMachineRecipe("alloy", {id: ItemID.ingotBronze, count: 4, data: 0}, {slot1: {id: ItemID.ingotCopper, count: 3, data: 0}, slot2: {id: ItemID.ingotTin, count: 1, data: 0}}, {isShape: false, time: 10});
    GTRecipe.addMachineRecipe("alloy", {id: ItemID.ingotBronze, count: 4, data: 0}, {slot1: {id: ItemID.dustCopper, count: 3, data: 0}, slot2: {id: ItemID.ingotTin, count: 1, data: 0}}, {isShape: false, time: 10});
    GTRecipe.addMachineRecipe("alloy", {id: ItemID.ingotBronze, count: 4, data: 0}, {slot1: {id: ItemID.ingotCopper, count: 3, data: 0}, slot2: {id: ItemID.dustTin, count: 1, data: 0}}, {isShape: false, time: 10});
    GTRecipe.addMachineRecipe("alloy", {id: ItemID.ingotBronze, count: 4, data: 0}, {slot1: {id: ItemID.dustCopper, count: 3, data: 0}, slot2: {id: ItemID.dustTin, count: 1, data: 0}}, {isShape: false, time: 10});

    GTRecipe.addMachineRecipe("alloy", {id: 145, count: 1, data: 0}, {slot1: {id: 265, count: 31, data: 0}, slot2: {id: ItemID.shapeAnvil, count: 1, data: 0}}, {isShape: true, time: 750});

    GTRecipe.addMachineRecipe("alloy", {id: ItemID.plateCopper, count: 1, data: 0}, {slot1: {id: ItemID.ingotCopper, count: 2, data: 0}, slot2: {id: ItemID.shapePlate, count: 1, data: 0}}, {isShape: true, time: 5});
    GTRecipe.addMachineRecipe("alloy", {id: ItemID.plateTin, count: 1, data: 0}, {slot1: {id: ItemID.ingotTin, count: 2, data: 0}, slot2: {id: ItemID.shapePlate, count: 1, data: 0}}, {isShape: true, time: 5});
    GTRecipe.addMachineRecipe("alloy", {id: ItemID.plateBronze, count: 1, data: 0}, {slot1: {id: ItemID.ingotBronze, count: 2, data: 0}, slot2: {id: ItemID.shapePlate, count: 1, data: 0}}, {isShape: true, time: 5});
    GTRecipe.addMachineRecipe("alloy", {id: ItemID.plateLead, count: 1, data: 0}, {slot1: {id: ItemID.ingotLead, count: 2, data: 0}, slot2: {id: ItemID.shapePlate, count: 1, data: 0}}, {isShape: true, time: 5});
    GTRecipe.addMachineRecipe("alloy", {id: ItemID.plateIron, count: 1, data: 0}, {slot1: {id: 265, count: 2, data: 0}, slot2: {id: ItemID.shapePlate, count: 1, data: 0}}, {isShape: true, time: 5});
    GTRecipe.addMachineRecipe("alloy", {id: ItemID.plateGold, count: 1, data: 0}, {slot1: {id: 266, count: 2, data: 0}, slot2: {id: ItemID.shapePlate, count: 1, data: 0}}, {isShape: true, time: 5});
    GTRecipe.addMachineRecipe("alloy", {id: ItemID.plateSteel, count: 1, data: 0}, {slot1: {id: ItemID.ingotSteel, count: 2, data: 0}, slot2: {id: ItemID.shapePlate, count: 1, data: 0}}, {isShape: true, time: 10});

    GTRecipe.addMachineRecipe("alloy", {id: BlockID.blockCopper, count: 1, data: 0}, {slot1: {id: ItemID.ingotCopper, count: 9, data: 0}, slot2: {id: ItemID.shapeBlock, count: 1, data: 0}}, {isShape: true, time: 2});
    GTRecipe.addMachineRecipe("alloy", {id: BlockID.blockTin, count: 1, data: 0}, {slot1: {id: ItemID.ingotTin, count: 9, data: 0}, slot2: {id: ItemID.shapeBlock, count: 1, data: 0}}, {isShape: true, time: 2});
    GTRecipe.addMachineRecipe("alloy", {id: BlockID.blockBronze, count: 1, data: 0}, {slot1: {id: ItemID.ingotBronze, count: 9, data: 0}, slot2: {id: ItemID.shapeBlock, count: 1, data: 0}}, {isShape: true, time: 2});
    GTRecipe.addMachineRecipe("alloy", {id: BlockID.blockLead, count: 1, data: 0}, {slot1: {id: ItemID.ingotLead, count: 9, data: 0}, slot2: {id: ItemID.shapeBlock, count: 1, data: 0}}, {isShape: true, time: 2});
    GTRecipe.addMachineRecipe("alloy", {id: 42, count: 1, data: 0}, {slot1: {id: 265, count: 9, data: 0}, slot2: {id: ItemID.shapeBlock, count: 1, data: 0}}, {isShape: true, time: 2});
    GTRecipe.addMachineRecipe("alloy", {id: 41, count: 1, data: 0}, {slot1: {id: 266, count: 9, data: 0}, slot2: {id: ItemID.shapeBlock, count: 1, data: 0}}, {isShape: true, time: 2});
    GTRecipe.addMachineRecipe("alloy", {id: BlockID.blockSteel, count: 1, data: 0}, {slot1: {id: ItemID.ingotSteel, count: 9, data: 0}, slot2: {id: ItemID.shapeBlock, count: 1, data: 0}}, {isShape: true, time: 5});
});