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