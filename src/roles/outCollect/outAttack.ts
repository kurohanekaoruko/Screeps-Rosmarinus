const outAttack = {
    source: function(creep) {
        if(creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }

        if (creep.room.name != creep.memory.targetRoom || creep.pos.isRoomEdge()) {
            creep.moveToRoom(creep.memory.targetRoom);
            return;
        }

        // 闲置
        if(creep.memory.idle && creep.memory.idle > Game.time) {
            // 治疗己方单位
            const nearestHarvester = creep.pos.findInRange(FIND_MY_CREEPS, 8, {
                filter: c => c.memory.role === 'out-harvest' || c.memory.role === 'out-carry' ||
                             c.memory.role === 'out-car' || c.memory.role === 'out-miner'
            })[0];
            if(nearestHarvester && nearestHarvester.hits < nearestHarvester.hitsMax) {
                if (creep.pos.inRangeTo(nearestHarvester, 1)) {
                    creep.heal(nearestHarvester);
                } else if (creep.pos.inRangeTo(nearestHarvester, 3)) {
                    creep.rangedHeal(nearestHarvester);
                } else {
                    creep.moveTo(nearestHarvester, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
                return false;
            }
            return false;
        }

        // 如果没有缓存绑定的Lair，则查找并绑定
        if (!creep.memory.bindLairId) {
            const unbindLairs = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_KEEPER_LAIR &&
                        !_.some(Game.creeps, (c) => c.memory.role === 'out-attack' && c.memory['bindLairId'] === structure.id);
                }
            });

            if (unbindLairs.length > 0) {
                const nearestLair = creep.pos.findClosestByPath(unbindLairs);
                if (nearestLair) {
                    creep.memory.bindLairId = nearestLair.id;
                }
            }
        }

        // 如果已绑定Lair，则移动到其附近
        if (creep.memory.bindLairId) {
            const bindLair = Game.getObjectById(creep.memory.bindLairId) as StructureKeeperLair | null;
            if (!bindLair) {
                // 如果绑定的Lair不存在，清除绑定
                delete creep.memory.bindLairId;
                return false;
            }
            
            if(creep.pos.inRangeTo(bindLair, 1)) {
                if (!bindLair.ticksToSpawn || bindLair.ticksToSpawn <= 5) {
                    return true;
                }
                creep.memory.idle = Game.time + bindLair.ticksToSpawn;
                return false;
            }
            else {
                creep.moveTo(bindLair, { visualizePathStyle: { stroke: '#ffaa00' } });
                return false;
            }
        }

        return true;
    },
    target: function(creep) {
        if(creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }

        if (creep.room.name != creep.memory.targetRoom || creep.pos.isRoomEdge()) {
            creep.moveToRoom(creep.memory.targetRoom);
            return;
        }

        // 检查自身附近是否有敌人
        const nearbyEnemies = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 8);
        if (nearbyEnemies.length > 0) {
            if(creep.attack(nearbyEnemies[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(nearbyEnemies[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
            return false;
        }

        // 查找最近的out-harvest
        const nearestHarvester = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: c => c.memory.role === 'out-harvest'
        });

        if (nearestHarvester) {
            // 检查out-harvest附近是否有敌人
            const enemiesNearHarvester = nearestHarvester.pos.findInRange(FIND_HOSTILE_CREEPS, 5);
            if (enemiesNearHarvester.length > 0) {
                if(creep.attack(enemiesNearHarvester[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemiesNearHarvester[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
                return false;
            }
        }

        // 如果没有敌人，返回true
        return true;
    }
}

export default outAttack;