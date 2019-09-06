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
    },
    
    machine: {
        alloy: []
    },
    
    addMachineRecipe: function(type, result, source, params){
        switch (type){
            case "alloy":
                this.machine[type].push({result: result, source: source, params: params});
            break;
        }
    },
    
    getMachineRecipe: function(type, source){
        for(var key in this.machine[type]){
            if (source.slot1.id == this.machine[type][key].source.slot1.id && source.slot1.count >= this.machine[type][key].source.slot1.count && source.slot1.data == this.machine[type][key].source.slot1.data){
                if (source.slot2.id == this.machine[type][key].source.slot2.id && source.slot2.count >= this.machine[type][key].source.slot2.count && source.slot2.data == this.machine[type][key].source.slot2.data){
                    return this.machine[type][key];
                }
            }
        }
    }
};