const roleRangeAttacker = {
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
                    if (creep.pos.inRangeTo(target, 3)) {
                        if (creep.pos.inRangeTo(target, 1)) {
                            creep.attack(target);
                            creep.rangedAttack(target);
                        }
                        else {
                            if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
                            }
                        }
                    }
                    else {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
                    }
                } else {
                    if (creep.room.my) return;
                    if (creep.room.level < 1) return;
                    if (creep.pos.inRangeTo(creep.room.controller, 3)) {
                        if (creep.pos.inRangeTo(creep.room.controller, 1)) {
                            creep.attack(creep.room.controller);
                            creep.rangedAttack(creep.room.controller);
                        }
                        else {
                            if (creep.rangedAttack(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                            }
                        }
                    }
                    else {
                        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        }
        else {
            
        }
    }
}


export default roleRangeAttacker;