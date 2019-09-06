IDRegistry.genBlockID("LValloysmelter");
Block.createBlock("LValloysmelter", [
    {name: "Basic Alloy Smelter", texture: [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["lv_alloysmelter", 0], ["LVMachineHull", 0], ["LVMachineHull", 0]], inCreative: true}
], "opaque");
ICore.Render.setStandartModel(BlockID.LValloysmelter, [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["lv_alloysmelter", 0], ["LVMachineHull", 0], ["LVMachineHull", 0]]);
ICore.Render.registerRotationModel(BlockID.LValloysmelter, 0, [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["lv_alloysmelter", 0], ["LVMachineHull", 0], ["LVMachineHull", 0]]);
ICore.Render.registerRotationModel(BlockID.LValloysmelter, 4, [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["lv_alloysmelter", 1], ["LVMachineHull", 0], ["LVMachineHull", 0]]);


GTNameOverride.addMachine(BlockID.LValloysmelter, 32, "LV", 1024);

var guiBasicAlloySmelter = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Alloy Smelter"}}, inventory: {standart: true}, background: {bitmap: "machine.background"}},
    params: {slot: "machine.slot", invSlot: "machine.slot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "machine.furnace_bar_background", scale: 3.2},
            {type: "bitmap", x: 900, y: 380, bitmap: "machine.logo", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 381, y: 150, bitmap: "machine.slot_fire"},
        "slotSource2": {type: "slot", x: 441, y: 150, bitmap: "machine.slot_fire"},
        "slotResult": {type: "slot", x: 625, y: 150},       
        "progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "machine.furnace_bar_scale", scale: 3.2},
        "slotEnergy": {type: "slot", x: 530, y: 280, bitmap: "machine.slot_energy"},
        "energyIndicator": {type: "image", x: 535, y: 210, bitmap: "machine.background", scale: 3.2}
    }
});

Callback.addCallback("LevelLoaded", function(){
    ICore.Machine.updateGuiHeader(guiBasicAlloySmelter, "Basic Alloy Smelter");
});

ICore.Machine.registerElectricMachine(BlockID.LValloysmelter, {
    defaultValues: {
        power_tier: 1,
        energy_storage: 1024,
        energy_consumption: 3,
        work_time: 30,
        meta: 0,
        progress: 0,
        isActive: false
    },
    
    getGuiScreen: function(){
        return guiBasicAlloySmelter;
    },
    
    getTransportSlots: function(){
        return {input: ["slotSource", "slotSource2"], output: ["slotResult"]};
    },
    
    getTier: function(){
        return this.data.power_tier;
    },
    
    setDefaultValues: function(){
        this.data.power_tier = this.defaultValues.power_tier;
        this.data.energy_storage = this.defaultValues.energy_storage;
        this.data.energy_consumption = this.defaultValues.energy_consumption;
        this.data.work_time = this.defaultValues.work_time;
    },
    
    tick: function(){
        this.setDefaultValues();
        
        var sourceSlot = this.container.getSlot("slotSource");
        var sourceSlot_2 = this.container.getSlot("slotSource2");
        var resultSlot = this.container.getSlot("slotResult");
        
        var content = this.container.getGuiContent();
        var recipe = GTRecipe.getMachineRecipe("alloy", {slot1: {id: sourceSlot.id, count: sourceSlot.count, data: sourceSlot.data}, slot2: {id: sourceSlot_2.id, count: sourceSlot_2.count, data: sourceSlot_2.data}});
        if(recipe && (resultSlot.id == recipe.result.id && resultSlot.data == recipe.result.data && resultSlot.count <= 64 - recipe.result.count || resultSlot.id == 0)){  
           if(this.data.energy >= this.data.energy_consumption){
              this.data.energy -= this.data.energy_consumption;
              this.data.progress += 1/(this.data.work_time * recipe.params.time);
              this.activate();
           }
           else{
              this.deactivate();
           }
           if(this.data.progress.toFixed(3) >= 1){
               sourceSlot.count -= recipe.source.slot1.count;
               if (!recipe.params.isShape){
                   sourceSlot_2.count -= recipe.source.slot2.count;
               }
               resultSlot.id = recipe.result.id;
               resultSlot.data = recipe.result.data;
               resultSlot.count += recipe.result.count;
               this.container.validateAll();
               this.data.progress = 0;
           }
        }   
        else {
            this.data.progress = 0;
            this.deactivate();
        }
       
        if(content){
           if(this.data.progress > 0 && this.data.energy < this.data.energy_consumption){
               content.elements["energyIndicator"].bitmap = "machine.icon_energynull";                  
           }else{
               content.elements["energyIndicator"].bitmap = "machine.background";
           }
        }
        
        var tier = this.getTier();
        var energyStorage = this.getEnergyStorage();
        this.data.energy = Math.min(this.data.energy, energyStorage);
        this.data.energy += ICore.ChargeRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), "Eu", energyStorage - this.data.energy, transferByTier[tier], tier);
        
        this.container.setScale("progressScale", this.data.progress);
    },
    
    getEnergyStorage: function(){
        return this.data.energy_storage;
    },
    
    init: ICore.Machine.updateMachine,
    energyReceive: ICore.Machine.basicEnergyReceiveFunc
});

ICore.Render.setRotationPlaceFunction(BlockID.LValloysmelter);