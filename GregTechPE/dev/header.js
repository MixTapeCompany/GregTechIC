IMPORT("EnergyNet");
IMPORT("ToolLib");

var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);

var transferByTier = {
    1: 32,
    2: 256,
    3: 2048,
    4: 8192
}