IDRegistry.genBlockID("LVmacerator");
Block.createBlock("LVmacerator", [
    {name: "Basic Macerator", texture: [["LVMachineHull", 0], ["lv_macerator_top", 1], ["LVMachineHull", 0], ["lv_macerator_front", 0], ["LVMachineHull", 0], ["LVMachineHull", 0]], inCreative: true}
], "opaque");
ICore.Render.setStandartModel(BlockID.LVmacerator, [["LVMachineHull", 0], ["lv_macerator_top", 1], ["LVMachineHull", 0], ["lv_macerator_front", 0], ["LVMachineHull", 0], ["LVMachineHull", 0]]);
ICore.Render.registerRotationModel(BlockID.LVmacerator, 0, [["LVMachineHull", 0], ["lv_macerator_top", 1], ["LVMachineHull", 0], ["lv_macerator_front", 0], ["LVMachineHull", 0], ["LVMachineHull", 0]]);
ICore.Render.registerRotationModel(BlockID.LVmacerator, 4, [["LVMachineHull", 0], ["lv_macerator_top", 0], ["LVMachineHull", 0], ["lv_macerator_front", 1], ["LVMachineHull", 0], ["LVMachineHull", 0]]);


GTNameOverride.addMachine(BlockID.LVmacerator, 32, "LV", 1024);

var guiBasicMacerator = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Macerator"}}, inventory: {standart: true}, background: {bitmap: "machine.background"}},
    params: {slot: "machine.slot", invSlot: "machine.slot"},
    drawing: [
            {type: "bitmap", x: 530, y: 146, bitmap: "machine.macerator_bar_background", scale: 3.2},
            {type: "bitmap", x: 900, y: 380, bitmap: "machine.logo", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 142, bitmap: "machine.slot_macerator"},
        "slotResult": {type: "slot", x: 625, y: 142},       
        "progressScale": {type: "scale", x: 530, y: 146, direction: 0, value: 0, bitmap: "machine.macerator_bar_scale", scale: 3.2},
        "slotEnergy": {type: "slot", x: 530, y: 280, bitmap:"machine.slot_energy"},
        "energyIndicator": {type: "image", x: 535, y: 210, bitmap: "machine.background", scale: 3.2}
    }
});

Callback.addCallback("LevelLoaded", function(){
    ICore.Machine.updateGuiHeader(guiBasicMacerator, "Basic Macerator");
});

ICore.Machine.registerElectricMachine(BlockID.LVmacerator, {
    defaultValues: {
        power_tier: 1,
        energy_storage: 1024,
        energy_consumption: 2,
        work_time: 300,
        meta: 0,
        progress: 0,
        isActive: false
    },

    getGuiScreen: function(){
        return guiBasicMacerator;
    },

    getTransportSlots: function(){
        return {input: ["slotSource"], output: ["slotResult"]};
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
        var resultSlot = this.container.getSlot("slotResult");
        
        var content = this.container.getGuiContent();
        var result = ICore.Recipe.getRecipeResult("macerator", sourceSlot.id, sourceSlot.data);
        if(result && (resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= 64 - result.count || resultSlot.id == 0)){
            if(this.data.energy >= this.data.energy_consumption){
                this.data.energy -= this.data.energy_consumption;
                this.data.progress += 1/this.data.work_time;
                this.activate();
            }
            else{
                this.deactivate();
            }
            if(this.data.progress.toFixed(3) >= 1){
                sourceSlot.count--;
                resultSlot.id = result.id;
                resultSlot.data = result.data;
                resultSlot.count += result.count;
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

ICore.Render.setRotationPlaceFunction(BlockID.LVmacerator);