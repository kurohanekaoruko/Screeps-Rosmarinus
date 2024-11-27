const roleAttacker = {
    run: function(creep) {
        if(creep.memory.targetRoom) {
            if(creep.room.name != creep.memory.targetRoom) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), { visualizePathStyle: { stroke: '#ffffff' } });
            } else {
                //creep.moveTo(creep.room.controller);
                var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
                if(hostiles.length == 0) {
                    hostiles = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                        filter: { structureType: STRUCTURE_INVADER_CORE }
                    });
                }
                if(hostiles.length > 0) {
                    var target = creep.pos.findClosestByRange(hostiles);
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
                    creep.attack(target);
                    creep.rangedAttack(target);
                } else {
                    if (creep.room.my) return;
                    if (creep.room.level < 1) return;
                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                    creep.attack(creep.room.controller);
                    creep.rangedAttack(creep.room.controller);
                }
            }
        }
        else {
            
        }
    }
}


export default roleAttacker;