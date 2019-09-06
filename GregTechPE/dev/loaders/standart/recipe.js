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
             
         /* Shape */ 
         GTRecipe.addRecipe({id: ItemID.shapeAnvil, count: 1, data: 0}, ["  a","   "," x "], ['x', hammer, -1, 'a', ItemID.shapeEmpty, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0]);
         GTRecipe.addRecipe({id: ItemID.shapePlate, count: 1, data: 0}, [" x "," a ","   "], ['x', hammer, -1, 'a', ItemID.shapeEmpty, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0]); 
             
         for (var key_1 in GTTool.tools["file"]){
              var file = GTTool.tools["file"][key_1];
              /* Shape */
              GTRecipe.addRecipe({id: ItemID.shapeEmpty, count: 1, data: 0}, ["xf","aa","aa"], ['x', hammer, -1, 'a', ItemID.plateSteel, 0, 'f', file, -1], [1, 1, 0, 0, 0, 0, 0, 0, 0]);
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