const roleDefender = {
    target: function(creep) {
        if (creep.memory.defend == undefined) {
            creep.memory.defend = false;
        }
        if (creep.memory.defend == false) {
            if (creep.room.name == creep.memory.home) {
                var hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
                if (hostileCreeps.length > 0) {
                    creep.memory.defend = true;
                }
            }
            else {
                creep.moveTo(creep.memory.home);
            }
        }
        if (creep.memory.defend == true) {
            if (creep.room.name == creep.memory.home) {
                var hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
                if (hostileCreeps.length > 0) {
                    var target = creep.pos.findClosestByRange(hostileCreeps);
                    if (creep.pos.inRangeTo(target, 3)) {
                        if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                    else {
                        creep.moveTo(target);
                    }
                    if (creep.hits < creep.hitsMax) {
                        creep.heal(creep);
                    }
                }
                else {
                    creep.memory.defend = false;
                }
            }
            else {
                creep.moveTo(Game.flags[creep.memory.home]);
            }
        }
        return false;
    },
    source: function(creep) {
        return true;
    }
}


export default roleDefender;