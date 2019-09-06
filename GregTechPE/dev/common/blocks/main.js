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