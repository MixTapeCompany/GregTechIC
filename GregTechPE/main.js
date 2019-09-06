/*
NIDE BUILD INFO:
  dir: dev
  target: main.js
  files: 17
*/



// file: header.js

IMPORT("EnergyNet");
IMPORT("ToolLib");

var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);

var transferByTier = {
    1: 32,
    2: 256,
    3: 2048,
    4: 8192
}



// file: translation.js

//machines
Translation.addTranslation("Basic Electric Furnace", {ru: "Базовая электрическая печь"});
Translation.addTranslation("Basic Macerator", {ru: "Базовый дробитель"});
Translation.addTranslation("Basic Alloy Smelter", {ru: "Базовая плавильня"});

//blocks
Translation.addTranslation("Machine Hull (LV)", {ru: "Корпус машины (LV)"});

//crafting tools
Translation.addTranslation("Hammer", {ru: "Молот"});
Translation.addTranslation("Wrench", {ru: "Гаечный ключ"});
Translation.addTranslation("Cutter", {ru: "Кусачки"});
Translation.addTranslation("File", {ru: "Напильник"});
Translation.addTranslation("Saw", {ru: "Пила"});
Translation.addTranslation("Screwdriver", {ru: "Отвертка"});

//wires & cables
Translation.addTranslation("Tin wire 1x", {ru: "Олово 1х провод"});
Translation.addTranslation("Tin wire 2x", {ru: "Олово 2х провод"});
Translation.addTranslation("Tin wire 4x", {ru: "Олово 4х провод"});

Translation.addTranslation("Tin cable 1x", {ru: "Олово 1х кабель"});
Translation.addTranslation("Tin cable 2x", {ru: "Олово 2х кабель"});
Translation.addTranslation("Tin cable 4x", {ru: "Олово 4х кабель"});

Translation.addTranslation("Copper wire 1x", {ru: "Медь 1х провод"});
Translation.addTranslation("Copper wire 2x", {ru: "Медь 2х провод"});
Translation.addTranslation("Copper wire 4x", {ru: "Медь 4х провод"});

//components
Translation.addTranslation("Electric Motor (LV)", {ru: "Электрический двигатель (LV)"});
Translation.addTranslation("Electric Piston (LV)", {ru: "Электрический поршень (LV)"});

/* rods */
Translation.addTranslation("Iron Rod", {ru: "Железный стержень"});
Translation.addTranslation("Steel Rod", {ru: "Стальной стержень"});

/* bolts */
Translation.addTranslation("Iron Bolt", {ru: "Железный болт"});

/* screws */
Translation.addTranslation("Iron Screw", {ru: "Железная ручка"});

/* magnetic rod */
Translation.addTranslation("Magnetic Iron Rod", {ru: "Магнитное железо (Прут)"});

/* small gear */
Translation.addTranslation("Small Steel Gear", {ru: "Сталь (Маленькая шестерня)"});



// file: api/util/recipe.js

var GTRecipe = {
    addShapelessRecipe: function(result, data, tool){
        data.push({id: tool, data: -1});
        Recipes.addShapeless(result, data, function(api, field, result){
            for (var i in field){
                if (field[i].id == tool){
                    field[i].data++;
                    if (field[i].data >= Item.getMaxDamage(tool)){
                        field[i].id = field[i].count = field[i].data = 0;
                    }
                }
                else {
                    api.decreaseFieldSlot(i);
                }
            }
        });
    },
    addRecipe: function(result, data, keys, tools){
        Recipes.addShaped(result, data, keys, function(api, field, result){
            for (var i in field){
                if (tools[i] == 1){
                    field[i].data++;
                    if (field[i].data >= Item.getMaxDamage(field[i].id)){
                        field[i].id = field[i].count = field[i].data = 0;
                    }
                }
                else {
                    api.decreaseFieldSlot(i);
                }
            }
        });
    }
};



// file: api/util/nameoverride.js

var GTNameOverride = {
    addMachine: function(id, voltage, vn, storage){
        Item.registerNameOverrideFunction(id, function(item, name){
            var tooltip = "Voltage: " + "§2" + voltage + "§7" + "(" + "§2" + vn + "§7" + ")" + "\n" + "Max energy storage: " + "§1" + storage;
            return name + "§7" + ICore.ItemName.getTooltip(name, tooltip);
        });
    },
    addCraftingTool: function(id, material, damage){
        Item.registerNameOverrideFunction(id, function(item, name){
            var tooltip = "Durability: " + (damage - item.data) + "/" + damage + "\n" + "Material: " + material;
            return name + "§7" + ICore.ItemName.getTooltip(name, tooltip);
        });
    },
    addCable: function(id, voltage, vn){
        Item.registerNameOverrideFunction(id, function(item, name){
            var tooltip = "Voltage: " + "§2" + voltage + "§7" + "(" + "§2" + vn + "§7" + ")";
            return name + "§7" + ICore.ItemName.getTooltip(name, tooltip);
        });
    },
};



// file: api/block/cable.js

var wireBurnoutFunc = function(){};
    wireBurnoutFunc = function(voltage){
        for(var key in this.wireMap){
            var coords = key.split(':');
            var x = Math.floor(coords[0]), y = Math.floor(coords[1]), z = Math.floor(coords[2]);
            World.setBlock(x, y, z, 0);
            addBurnParticles(x, y, z);
        }
        EnergyNetBuilder.removeNet(this);
    }

function addBurnParticles(x, y, z){
    for(var i = 0; i < 32; i++){
        var px = x + Math.random();
        var pz = z + Math.random();
        var py = y + Math.random();
        Particles.addFarParticle(Native.ParticleType.smoke, px, py, pz, 0, 0.01, 0);
    }
}

var GT_WIRES = {};
function setupBlockAsWire(id, maxVoltage, insulationLevels){
    EU.registerWire(id, maxVoltage, wireBurnoutFunc);
    GT_WIRES[id] = insulationLevels || 0;
}



// file: api/item/material.js

var GTMaterial = {
    setName: function(material, type){
        var name = {
            rod: material + " Rod",
            bolt: material + " Bolt",
            screw: material + " Screw",
            magnetic_rod: "Magnetic " + material + " Rod",
            gearSmall: "Small " + material + " Gear"
        };
        return name[type];
    },
    add: function(material, data){
        for(var key in data){
            var type = data[key];
            var id = IDRegistry.genItemID(type + material);
            Item.createItem(type + material, this.setName(material, type), {name: material + "_" + type, data: 0});
        }  
    }
};  



// file: api/item/tool.js

var GTTool = {
    tools: {
        hammer: [],
        wrench: [],
        cutter: [],
        file: [],
        saw: [],
        screwdriver: []
    },
    
    toolName: {
        hammer: "Hammer",
        wrench: "Wrench",
        cutter: "Cutter",
        file: "File",
        saw: "Saw",
        screwdriver: "Screwdriver"
    },
    
    addCraftingTool: function(type, material, damage){
        var id = IDRegistry.genItemID(type + material);
        Item.createItem(type + material, this.toolName[type], {name: material + "_" + type}, {stack: 1});
        Item.setMaxDamage(id, damage);
        
        GTNameOverride.addCraftingTool(id, material, damage);
        
        this.tools[type].push(id);
    }
};



// file: common/machine/LV/electric_furnace.js

IDRegistry.genBlockID("LVelectricFurnace");
Block.createBlock("LVelectricFurnace", [
    {name: "Basic Electric Furnace", texture: [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["lv_electric_furnace", 0], ["LVMachineHull", 0], ["LVMachineHull", 0]], inCreative: true}
], "opaque");
ICore.Render.setStandartModel(BlockID.LVelectricFurnace, [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["lv_electric_furnace", 0], ["LVMachineHull", 0], ["LVMachineHull", 0]]);
ICore.Render.registerRotationModel(BlockID.LVelectricFurnace, 0, [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["lv_electric_furnace", 0], ["LVMachineHull", 0], ["LVMachineHull", 0]]);
ICore.Render.registerRotationModel(BlockID.LVelectricFurnace, 4, [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["lv_electric_furnace", 1], ["LVMachineHull", 0], ["LVMachineHull", 0]]);


GTNameOverride.addMachine(BlockID.LVelectricFurnace, 32, "LV", 1024);

var guiBasicElectricFurnace = new UI.StandartWindow({
    standart: {header: {text: {text: Translation.translate("Basic Electric Furnace")}}, inventory: {standart: true}, background: {bitmap: "machine.background"}},
    params: {slot: "machine.slot", invSlot: "machine.slot"},
    drawing: [
            {type: "bitmap", x: 900, y: 380, bitmap: "machine.logo", scale: 4},
            {type: "bitmap", x: 530, y: 146, bitmap: "machine.furnace_bar_background", scale: 3.2},         
    ],
    elements: {
        "progressScale": {type: "scale", x: 530, y: 146, direction: 0, value: 0.5, bitmap: "machine.furnace_bar_scale", scale: 3.2},
        "slotSource": {type: "slot", x: 441, y: 142, bitmap:"machine.slot_fire"},
        "slotResult": {type: "slot", x: 625, y: 142},
        "slotEnergy": {type: "slot", x: 530, y: 280, bitmap:"machine.slot_energy"},
        "energyIndicator": {type: "image", x: 535, y: 210, bitmap: "machine.background", scale: 3.2}
    }
});

Callback.addCallback("LevelLoaded", function(){
    ICore.Machine.updateGuiHeader(guiBasicElectricFurnace, "Basic Electric Furnace");
});

ICore.Machine.registerElectricMachine(BlockID.LVelectricFurnace, {
    defaultValues: {
        power_tier: 1,
        energy_storage: 1024,
        energy_consumption: 3,
        work_time: 130,
        meta: 0,
        progress: 0,
        isActive: false
    },
    
    getGuiScreen: function(){
        return guiBasicElectricFurnace;
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
        var result = Recipes.getFurnaceRecipeResult(sourceSlot.id, "iron");
        if(result && (resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0)){
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
                resultSlot.count++;
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

ICore.Render.setRotationPlaceFunction(BlockID.LVelectricFurnace);



// file: common/machine/LV/macerator.js

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



// file: common/machine/LV/alloysmelter.js

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
        work_time: 300,
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
        var result = ICore.Recipe.getRecipeResult("alloy", sourceSlot.id, sourceSlot.data);
        if(result && (resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= 64 - result.count || resultSlot.id == 0)){
            if (sourceSlot.count >= result.param.count && sourceSlot_2.id == result.param.slot.id && sourceSlot_2.count >= result.param.slot.count && sourceSlot_2.data == result.param.slot.data){
                if(this.data.energy >= this.data.energy_consumption){
                    this.data.energy -= this.data.energy_consumption;
                    this.data.progress += 1/this.data.work_time;
                    this.activate();
                }
                else{
                    this.deactivate();
                }
                if(this.data.progress.toFixed(3) >= 1){
                    sourceSlot.count -= result.param.count;
                    if (!result.param.isShape){
                        sourceSlot_2.count -= result.param.slot.count;
                    }
                    resultSlot.id = result.id;
                    resultSlot.data = result.data;
                    resultSlot.count += result.count;
                    this.container.validateAll();
                    this.data.progress = 0;
                }
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

ICore.Render.setRotationPlaceFunction(BlockID.LVelectricFurnace);



// file: common/blocks/cable.js

Block.createSpecialType({
    destroytime: 0.5,
    explosionres: 0.5,
    opaque: false,
    lightopacity: 0,
    renderlayer: 3,
}, "part");

/* TIN */
IDRegistry.genBlockID("tin_wire_single");
Block.createBlock("tin_wire_single", [
    {name: "Tin wire 1x", texture: [["TIN_WIRE", 0]], inCreative: true},
    {name: "Tin cable 1x", texture: [["TIN_CABLE", 0]], inCreative: true}
], "part");
ToolAPI.registerBlockMaterial(BlockID.tin_wire_single, "stone");
Block.setDestroyTime(BlockID.tin_wire_single, 0.05);
setupBlockAsWire(BlockID.tin_wire_single, 32, 1);
ICore.Render.setupWireModel(BlockID.tin_wire_single, 0, 2/16, "ic-wire");
ICore.Render.setupWireModel(BlockID.tin_wire_single, 1, 3/16, "ic-wire");
GTNameOverride.addCable(BlockID.tin_wire_single, 32, "LV");

IDRegistry.genBlockID("tin_wire_double");
Block.createBlock("tin_wire_double", [
    {name: "Tin wire 2x", texture: [["TIN_WIRE", 0]], inCreative: true},
    {name: "Tin cable 2x", texture: [["TIN_CABLE", 0]], inCreative: true}
], "part");
ToolAPI.registerBlockMaterial(BlockID.tin_wire_double, "stone");
Block.setDestroyTime(BlockID.tin_wire_double, 0.05);
setupBlockAsWire(BlockID.tin_wire_double, 32, 1);
ICore.Render.setupWireModel(BlockID.tin_wire_double, 0, 4/16, "ic-wire");
ICore.Render.setupWireModel(BlockID.tin_wire_double, 1, 5/16, "ic-wire");
GTNameOverride.addCable(BlockID.tin_wire_double, 32, "LV");

IDRegistry.genBlockID("tin_wire_four");
Block.createBlock("tin_wire_four", [
    {name: "Tin wire 4x", texture: [["TIN_WIRE", 0]], inCreative: true},
    {name: "Tin cable 4x", texture: [["TIN_CABLE", 0]], inCreative: true}
], "part");
ToolAPI.registerBlockMaterial(BlockID.tin_wire_four, "stone");
Block.setDestroyTime(BlockID.tin_wire_four, 0.05);
setupBlockAsWire(BlockID.tin_wire_four, 32, 1);
ICore.Render.setupWireModel(BlockID.tin_wire_four, 0, 8/16, "ic-wire");
ICore.Render.setupWireModel(BlockID.tin_wire_four, 1, 9/16, "ic-wire");
GTNameOverride.addCable(BlockID.tin_wire_four, 32, "LV");

/* COPPER */
IDRegistry.genBlockID("copper_wire_single");
Block.createBlock("copper_wire_single", [
    {name: "Copper wire 1x", texture: [["COPPER_WIRE", 0]], inCreative: true}
], "part");
ToolAPI.registerBlockMaterial(BlockID.copper_wire_single, "stone");
Block.setDestroyTime(BlockID.copper_wire_single, 0.05);
setupBlockAsWire(BlockID.copper_wire_single, 128, 1);
ICore.Render.setupWireModel(BlockID.copper_wire_single, 0, 2/16, "ic-wire");
GTNameOverride.addCable(BlockID.copper_wire_single, 128, "MV");

IDRegistry.genBlockID("copper_wire_double");
Block.createBlock("copper_wire_double", [
    {name: "Copper wire 2x", texture: [["COPPER_WIRE", 0]], inCreative: true}
], "part");
ToolAPI.registerBlockMaterial(BlockID.copper_wire_double, "stone");
Block.setDestroyTime(BlockID.copper_wire_double, 0.05);
setupBlockAsWire(BlockID.copper_wire_double, 128, 1);
ICore.Render.setupWireModel(BlockID.copper_wire_double, 0, 4/16, "ic-wire");
GTNameOverride.addCable(BlockID.copper_wire_double, 128, "MV");

IDRegistry.genBlockID("copper_wire_four");
Block.createBlock("copper_wire_four", [
    {name: "Copper wire 4x", texture: [["COPPER_WIRE", 0]], inCreative: true}
], "part");
ToolAPI.registerBlockMaterial(BlockID.copper_wire_four, "stone");
Block.setDestroyTime(BlockID.copper_wire_four, 0.05);
setupBlockAsWire(BlockID.copper_wire_four, 128, 1);
ICore.Render.setupWireModel(BlockID.copper_wire_four, 0, 8/16, "ic-wire");
GTNameOverride.addCable(BlockID.copper_wire_four, 128, "MV");





// file: common/blocks/main.js

IDRegistry.genBlockID("LVMachineHull");
Block.createBlock("LVMachineHull", [
    {name: "Machine Hull (LV)", texture: [["LVMachineHull", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.LVMachineHull, "stone", 1);
Block.setDestroyLevel("LVMachineHull", 1);
Block.setDestroyTime(BlockID.LVMachineHull, 3);


IDRegistry.genBlockID("LVMachineBlockHull");
Block.createBlock("LVMachineBlockHull", [
    {name: "Machine Hull (LV)", texture: [["LVMachineHull", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.LVMachineBlockHull, "stone", 1);
Block.setDestroyLevel("LVMachineBlockHull", 1);
Block.setDestroyTime(BlockID.LVMachineBlockHull, 3);

GTNameOverride.addMachine(BlockID.LVMachineBlockHull, 32, "LV", 1024);



// file: common/items/materials.js

GTMaterial.add("Iron", ["bolt", "rod", "screw", "magnetic_rod"]);
GTMaterial.add("Steel", ["rod", "gearSmall"]);



// file: common/items/components.js

/* LV */
IDRegistry.genItemID("LVelectricmotor");
Item.createItem("LVelectricmotor", "Electric Motor (LV)", {name: "electricmotor_lv", data: 0});

IDRegistry.genItemID("LVelectricpiston");
Item.createItem("LVelectricpiston", "Electric Piston (LV)", {name: "electricpiston_lv", data: 0});



// file: common/items/crafting_tools.js

GTTool.addCraftingTool("hammer", "Iron", 128);
GTTool.addCraftingTool("wrench", "Iron", 128);
GTTool.addCraftingTool("cutter", "Iron", 128);
GTTool.addCraftingTool("file", "Iron", 128);
GTTool.addCraftingTool("saw", "Iron", 128);
GTTool.addCraftingTool("screwdriver", "Iron", 128);



// file: loaders/standart/recipe.js

Callback.addCallback("PreLoaded", function(){
    /* HAMMER */
    for (var key in GTTool.tools["hammer"]){
         var hammer = GTTool.tools["hammer"][key];
         
         //IC2 - plates
         GTRecipe.addRecipe({id: ItemID.plateSteel, count: 1, data: 0}, ["x","a","a"], ['x', hammer, -1, 'a', ItemID.ingotSteel, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0]);
         GTRecipe.addRecipe({id: ItemID.plateCopper, count: 1, data: 0}, ["x","a","a"], ['x', hammer, -1, 'a', ItemID.ingotCopper, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0]); 
         GTRecipe.addRecipe({id: ItemID.plateTin, count: 1, data: 0}, ["x","a","a"], ['x', hammer, -1, 'a', ItemID.ingotTin, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0]);
         GTRecipe.addRecipe({id: ItemID.plateBronze, count: 1, data: 0}, ["x","a","a"], ['x', hammer, -1, 'a', ItemID.ingotBronze, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0]);
         GTRecipe.addRecipe({id: ItemID.plateIron, count: 1, data: 0}, ["x","a","a"], ['x', hammer, -1, 'a', 265, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0]);   
         GTRecipe.addRecipe({id: ItemID.plateGold, count: 1, data: 0}, ["x","a","a"], ['x', hammer, -1, 'a', 266, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0]);
         GTRecipe.addRecipe({id: ItemID.plateLead, count: 1, data: 0}, ["x","a","a"], ['x', hammer, -1, 'a', ItemID.ingotLead, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0]);  
             
         //IC2 - casing
         GTRecipe.addShapelessRecipe({id: ItemID.casingCopper, count: 2, data: 0}, [{id: ItemID.plateCopper, data: 0}], hammer);
         GTRecipe.addShapelessRecipe({id: ItemID.casingTin, count: 2, data: 0}, [{id: ItemID.plateTin, data: 0}], hammer);
         GTRecipe.addShapelessRecipe({id: ItemID.casingBronze, count: 2, data: 0}, [{id: ItemID.plateBronze, data: 0}], hammer); 
         GTRecipe.addShapelessRecipe({id: ItemID.casingIron, count: 2, data: 0}, [{id: ItemID.plateIron, data: 0}], hammer);
         GTRecipe.addShapelessRecipe({id: ItemID.casingGold, count: 2, data: 0}, [{id: ItemID.plateGold, data: 0}], hammer);
         GTRecipe.addShapelessRecipe({id: ItemID.casingLead, count: 2, data: 0}, [{id: ItemID.plateLead, data: 0}], hammer);
         
         //Items - crafting tools
         GTRecipe.addRecipe({id: ItemID.wrenchIron, count: 1, data: 0}, ["axa","aaa"," a "], ['x', hammer, -1, 'a', 265, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0]);
             
         /* SMALL GEARS */
         GTRecipe.addRecipe({id: ItemID.wrenchIron, count: 1, data: 0}, ["x  "," a ", ""], ['x', hammer, -1, 'a', ItemID.plateSteel, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0]); 
             
         for (var key_1 in GTTool.tools["file"]){
              var file = GTTool.tools["file"][key_1];
              
              /* Screwdrive */
              GTRecipe.addRecipe({id: ItemID.screwdriverIron, count: 1, data: 0}, [" fa"," ax","s  "], ['x', hammer, -1, 'a', ItemID.rodIron, 0, 'f', file, -1, 's', 280, 0], [0, 1, 0, 0, 0, 1, 0, 0, 0]);
                  
              for (var key_2 in GTTool.tools["screwdriver"]){
                   var screwdriver = GTTool.tools["screwdriver"][key_2];
                   
                   /* Cutter */
                   GTRecipe.addRecipe({id: ItemID.cutterIron, count: 1, data: 0}, ["afa","has","rbr"], ['a', ItemID.plateIron, 0, 'f', file, -1, 'h', hammer, -1, 's', screwdriver, -1, 'r', ItemID.rodIron, 0, 'b', ItemID.screwIron, 0], [0, 1, 0, 1, 0, 1, 0, 0, 0]);
              } 
         } 
    }
    /* WRENCH */
    for (var key in GTTool.tools["wrench"]){
         var wrench = GTTool.tools["wrench"][key];
         
         //Block - main
         GTRecipe.addRecipe({id: BlockID.LVMachineHull, count: 1, data: 0}, ["aaa","axa","aaa"], ['x', wrench, -1, 'a', ItemID.plateSteel, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0]);
    }
    /* CUTTER */  
    for (var key in GTTool.tools["cutter"]){
         var cutter = GTTool.tools["cutter"][key];   
         
         //Block - cable
         GTRecipe.addShapelessRecipe({id: BlockID.tin_wire_single, count: 1, data: 0}, [{id: ItemID.plateTin, data: 0}], cutter);          
         GTRecipe.addShapelessRecipe({id: BlockID.copper_wire_single, count: 1, data: 0}, [{id: ItemID.plateCopper, data: 0}], cutter);  
         
    }
    /* FILE */
    for (var key in GTTool.tools["file"]){
         var file = GTTool.tools["file"][key];
         
         /* RODS */
         GTRecipe.addRecipe({id: ItemID.rodIron, count: 1, data: 0}, ["x  "," a ","   "], ['x', file, -1, 'a', 265, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0]);
             
         /* SCREWS */ 
         GTRecipe.addRecipe({id: ItemID.rodIron, count: 1, data: 0}, ["xa ","a  ","   "], ['x', file, -1, 'a', ItemID.boltIron, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0]);
             
         /* BOLTS */ 
         GTRecipe.addRecipe({id: ItemID.boltIron, count: 1, data: 0}, ["xa ","a  ","   "], ['x', file, -1, 'a', ItemID.screwIron, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0]);
    } 
         
    /* SAWS */
    for (var key in GTTool.tools["saw"]){
         var saw = GTTool.tools["saw"][key];
         
         /* BOLTS */
         GTRecipe.addRecipe({id: ItemID.boltIron, count: 2, data: 0}, ["x  "," a ","   "], ['x', saw, -1, 'a', ItemID.rodIron, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0]);
    }  
     
    /* STANDART */ 

    //Block - main 
    Recipes.addShaped({id: BlockID.LVMachineBlockHull, count: 1, data: 0}, ["","xax",""], ['x', BlockID.tin_wire_single, 1, 'a', BlockID.LVMachineHull, 0]);      
        
    //Items - crafting tools
    Recipes.addShaped({id: ItemID.hammerIron, count: 1, data: 0}, ["xx","xaa","xx"], ['x', 265, 0, 'a', 280, 0]);
    Recipes.addShaped({id: ItemID.fileIron, count: 1, data: 0}, ["a","a","x"], ['x', 280, 1, 'a', ItemID.plateIron, 0]);  
        
    //Block - cable
    Recipes.addShapeless({id: BlockID.tin_wire_single, count: 2, data: 0}, [{id: BlockID.tin_wire_double, data: 0}]);
    Recipes.addShapeless({id: BlockID.tin_wire_double, count: 1, data: 0}, [{id: BlockID.tin_wire_single, data: 0}, {id: BlockID.tin_wire_single, data: 0}]);
    Recipes.addShapeless({id: BlockID.tin_wire_double, count: 2, data: 0}, [{id: BlockID.tin_wire_four, data: 0}]); 
    Recipes.addShapeless({id: BlockID.tin_wire_four, count: 1, data: 0}, [{id: BlockID.tin_wire_double, data: 0}, {id: BlockID.tin_wire_double, data: 0}]);
    Recipes.addShapeless({id: BlockID.tin_wire_single, count: 1, data: 1}, [{id: BlockID.tin_wire_single, data: 0}, {id: 287, data: 0}, {id: 171, data: 15}]);
    Recipes.addShapeless({id: BlockID.tin_wire_single, count: 2, data: 1}, [{id: BlockID.tin_wire_double, data: 1}]);
    Recipes.addShapeless({id: BlockID.tin_wire_double, count: 1, data: 1}, [{id: BlockID.tin_wire_double, data: 0}, {id: 287, data: 0}, {id: 171, data: 15}, {id: 171, data: 15}]);
    Recipes.addShapeless({id: BlockID.tin_wire_double, count: 2, data: 1}, [{id: BlockID.tin_wire_four, data: 1}]);
    Recipes.addShapeless({id: BlockID.tin_wire_four, count: 1, data: 1}, [{id: BlockID.tin_wire_four, data: 0}, {id: 287, data: 0}, {id: 171, data: 15}, {id: 171, data: 15}, {id: 171, data: 15}, {id: 171, data: 15}]);  
    
    Recipes.addShapeless({id: BlockID.copper_wire_single, count: 2, data: 0}, [{id: BlockID.copper_wire_double, data: 0}]);
    Recipes.addShapeless({id: BlockID.copper_wire_double, count: 1, data: 0}, [{id: BlockID.copper_wire_single, data: 0}, {id: BlockID.copper_wire_single, data: 0}]);
    Recipes.addShapeless({id: BlockID.copper_wire_double, count: 2, data: 0}, [{id: BlockID.copper_wire_four, data: 0}]); 
    Recipes.addShapeless({id: BlockID.copper_wire_four, count: 1, data: 0}, [{id: BlockID.copper_wire_double, data: 0}, {id: BlockID.copper_wire_double, data: 0}]);
    
    /* MACHINES */
    Recipes.addShaped({id: BlockID.LVelectricFurnace, count: 1, data: 0}, ["aca","c#c", "tct"], ['#', BlockID.LVMachineBlockHull, 0, 'c', BlockID.copper_wire_double, 0, 'a', ItemID.circuitBasic, 0, 't', BlockID.tin_wire_single, 1]);
    Recipes.addShaped({id: BlockID.LVmacerator, count: 1, data: 0}, ["pmd","cc#", "ttc"], ['#', BlockID.LVMachineBlockHull, 0, 'c', BlockID.tin_wire_single, 1, 't', ItemID.circuitBasic, 0, 'p', ItemID.LVelectricpiston, 0, 'm', ItemID.LVelectricmotor, 0, 'd', 264, 0]);
    Recipes.addShaped({id: BlockID.LValloysmelter, count: 1, data: 0}, ["aca","c#c", "tct"], ['#', BlockID.LVMachineBlockHull, 0, 'c', BlockID.copper_wire_four, 0, 'a', ItemID.circuitBasic, 0, 't', BlockID.tin_wire_single, 1]); 
    
    /* MAGNETIC RODS */ 
    Recipes.addShapeless({id: ItemID.magnetic_rodIron, count: 1, data: 0}, [{id: ItemID.rodIron, data: 0}, {id: 331, data: 0}, {id: 331, data: 0}, {id: 331, data: 0}, {id: 331, data: 0}]);
    
    /* COMPONENTS */
    Recipes.addShaped({id: ItemID.LVelectricmotor, count: 1, data: 0}, ["tcr","cmc","rct"], ['t', BlockID.tin_wire_single, 1, 'c', BlockID.copper_wire_single, 0, 'r', ItemID.rodIron, 0, 'm', ItemID.magnetic_rodIron, 0]);
    Recipes.addShaped({id: ItemID.LVelectricpiston, count: 1, data: 0}, ["ppp","crr","cmg"], ['p', ItemID.plateSteel, 0, 'c', BlockID.tin_wire_single, 1, 'r', ItemID.rodSteel, 0, 'm', ItemID.LVelectricmotor, 0, 'g', ItemID.gearSmallSteel, 0]);
});



// file: loaders/machine/alloyrecipe.js

Callback.addCallback("PreLoaded", function(){
    /* Alloy Smelter */
    ICore.Recipe.registerRecipesFor("alloy", {
            "ItemID.ingotCopper": {id: ItemID.ingotBronze, count: 4, data: 0, params: {slot: {id: ItemID.ingotTin, count: 1, data: 0}, count: 3, isShape: false}},
            "ItemID.ingotCopper": {id: ItemID.ingotBronze, count: 4, data: 0, params: {slot: {id: ItemID.dustTin, count: 1, data: 0}, count: 3, isShape: false}},
            "ItemID.dustCopper": {id: ItemID.ingotBronze, count: 4, data: 0, params: {slot: {id: ItemID.ingotTin, count: 1, data: 0}, count: 3, isShape: false}},
            "ItemID.dustCopper": {id: ItemID.ingotBronze, count: 4, data: 0, params: {slot: {id: ItemID.dustTin, count: 1, data: 0}, count: 3, isShape: false}},
    }, true);
});