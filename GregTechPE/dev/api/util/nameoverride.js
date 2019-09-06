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