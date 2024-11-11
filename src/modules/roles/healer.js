const roleHealer = function(creep) {
    // 检查是否有目标房间
    if(creep.memory.targetRoom) {
        // 如果自身受伤，先回到homeRoom再回血
        if(creep.hits < creep.hitsMax) {
            if(creep.room.name != creep.memory.homeRoom) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.homeRoom), { 
                    visualizePathStyle: { stroke: '#ffffff' }
                });
            }
            // 如果在房间边缘，向房间中心移动
            if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
                creep.moveTo(new RoomPosition(25, 25, creep.room.name), { 
                    visualizePathStyle: { stroke: '#ffffff' }
                });
            }
            creep.heal(creep);
        } else {
            // 如果不在目标房间，移动到目标房间中央
            if(creep.room.name != creep.memory.targetRoom) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom), { 
                    visualizePathStyle: { stroke: '#ffffff' }
                });
            } else {
                // 如果在房间边缘，向房间中心移动
                if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
                    creep.moveTo(new RoomPosition(25, 25, creep.room.name), { 
                        visualizePathStyle: { stroke: '#ffffff' }
                    });
                }
                // 在目标房间内寻找受伤的己方单位
                var injuredCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: (c) => c.hits < c.hitsMax && c.id !== creep.id
                });

                // 如果有受伤单位并且在治疗范围内，进行治疗
                if(injuredCreep) {
                    if (creep.pos.isNearTo(injuredCreep)) {
                        creep.heal(injuredCreep);
                    }
                    else {
                        // 如果不在范围内，移动到目标单位
                        creep.moveTo(injuredCreep, { visualizePathStyle: { stroke: '#00ff00' } });
                        creep.rangedHeal(injuredCreep);
                    }
                } else {
                    // 如果没有受伤单位，可以在这里添加其他行为
                }
            }
        }
    }
}

export default roleHealer;
