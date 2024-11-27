const deposit_harvest = {
    source: function(creep) {
        if (creep.room.name != creep.memory.targetRoom || creep.pos.isRoomEdge()) {
            let opt = {};
            if (creep.room.name != creep.memory.homeRoom) opt = { ignoreCreeps: false };
            creep.moveToRoom(creep.memory.targetRoom, opt);
            return;
        }
        
        const deposit = creep.room.deposit?.[0] ?? creep.room.find(FIND_DEPOSITS)[0];

        if(!deposit) {
            creep.suicide();
            if (Memory.rooms[creep.memory.homeRoom]?.['depositMine']?.[creep.memory.targetRoom])
                delete Memory.rooms[creep.memory.homeRoom]['depositMine'][creep.memory.targetRoom];
        }

        if(creep.pos.inRangeTo(deposit, 1)) {
            if(deposit.cooldown == 0) creep.harvest(deposit)
        }
        else{
            creep.moveTo(deposit, { visualizePathStyle: { stroke: '#ffaa00' } });
        }

        if (deposit.cooldown > 0 && creep.store.getUsedCapacity() > 0) {
            const nearbyTransport = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
                filter: c => c.memory.role === 'deposit-transport' && c.store.getFreeCapacity() > 0
            })[0];
            if(nearbyTransport){
                const resourceType = Object.keys(creep.store)[0];
                if (creep.pos.inRangeTo(nearbyTransport, 1)) {
                    creep.transfer(nearbyTransport, resourceType);
                }
                return false;
            }
        }

        return creep.store.getFreeCapacity() == 0;
    },
    target: function(creep) {
        const transport = creep.pos.find(FIND_MY_CREEPS, 1, {
            filter: c => c.memory.role === 'deposit-transport' && c.store.getFreeCapacity() > 0
        });
        if (!transport) return creep.store.getUsedCapacity() == 0;

        const resourceType = Object.keys(creep.store)[0];
        creep.transfer(transport, resourceType);
        return creep.store.getUsedCapacity() == 0;
    }
}

export default deposit_harvest;