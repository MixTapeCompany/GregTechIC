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

