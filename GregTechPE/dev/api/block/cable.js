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