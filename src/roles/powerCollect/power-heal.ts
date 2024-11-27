const power_heal = {
    source: function(creep: Creep) {
        if (creep.room.name != creep.memory.targetRoom || creep.pos.isRoomEdge()) {
            creep.moveToRoom(creep.memory.targetRoom);
            return;
        }
        
        if(creep.hits < creep.hitsMax) {
            creep.heal(creep);
            if(creep.room.find(FIND_HOSTILE_CREEPS, {
                filter: (c) => c.getActiveBodyparts(ATTACK) > 0 || c.getActiveBodyparts(RANGED_ATTACK) > 0})) {
                if (Memory.rooms[creep.memory.homeRoom]?.['powerMine']?.[creep.memory.targetRoom])
                    delete Memory.rooms[creep.memory.homeRoom]['powerMine'][creep.memory.targetRoom];
            }
            return false;
        }

        if(!creep.memory.bind) {
            const attackCreep = creep.room.find(FIND_MY_CREEPS,
                {filter: (c) => c.memory.role == 'power-attack' && !c.memory.bind});
            if (attackCreep.length === 0) return;
            creep.memory.bind = attackCreep[0].id;
            attackCreep[0].memory.bind = creep.id;
        }

        const target = Game.getObjectById(creep.memory.bind) as Creep;
        if (target) {
            if (creep.pos.isNearTo(target)) {
                creep.heal(target);
            } else {
                creep.moveTo(target);
            }
        }
        else{
            delete creep.memory.bind;
        }

        return false;
    },
    target: function(creep: Creep) {
        return true;
    }
}

export default power_heal;