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