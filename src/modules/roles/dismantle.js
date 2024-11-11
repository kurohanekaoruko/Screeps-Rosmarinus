const roleDismantle = function(creep) {
    // 检查是否有目标房间
    if(creep.memory.targetRoom) {
        // 如果不在目标房间，移动到目标房间
        if(creep.room.name != creep.memory.targetRoom) {
            const exitDir = creep.room.findExitTo(creep.memory.targetRoom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, {
                visualizePathStyle: {stroke: '#ffaa00'}
            });
            return; // 结束本次执行
        }
    }
    
    // 首先寻找敌方的spawn
    let targetStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
        filter: (structure) => structure.structureType === STRUCTURE_SPAWN
    });

    // 如果没有找到spawn，则寻找其他敌方建筑
    if (!targetStructure) {
        targetStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_TOWER ||
                        structure.structureType === STRUCTURE_STORAGE ||
                        structure.structureType === STRUCTURE_TERMINAL;
            }
        });
    }

    if (targetStructure) {
        // 如果找到目标建筑，移动并拆除
        if (creep.dismantle(targetStructure) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetStructure, {visualizePathStyle: {stroke: '#ff0000'}});
        }
    } else {
        // 如果没有找到任何敌方建筑，随机移动
        creep.moveTo(25, 25, {random: true});
    }

    // 如果creep满载，将资源丢到地上
    if (creep.store.getFreeCapacity() === 0) {
        // 遍历creep携带的所有资源类型
        for (const resourceType in creep.store) {
            // 将该类型的资源全部丢到地上
            creep.drop(resourceType);
        }
    }
};

export default roleDismantle;
