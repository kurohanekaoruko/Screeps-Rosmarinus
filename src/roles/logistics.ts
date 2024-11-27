function withdraw(creep: Creep) {
    if (creep.room.name != creep.memory.targetRoom) {
        creep.moveToRoom(creep.memory.targetRoom);
        return;
    }

    const room = creep.room;

    if (room.storage && room.storage.store.getUsedCapacity() > 0) {
        const target = room.storage;
        creep.withdrawOrMoveTo(target);
        return;
    }

    if (room.terminal && room.terminal.store.getUsedCapacity() > 0) {
        const target = room.terminal;
        creep.withdrawOrMoveTo(target);
        return;
    }
}

function transfer(creep: Creep) {
    if (creep.room.name != creep.memory.homeRoom) {
        creep.moveToRoom(creep.memory.homeRoom);
        return;
    }

    const room = creep.room;

    if (room.storage && room.storage.store.getFreeCapacity() > 0) {
        const target = room.storage;
        const resoureType = Object.keys(creep.store)[0] as ResourceConstant;
        creep.transferOrMoveTo(target, resoureType);
        return;
    }

    if (room.terminal && room.terminal.store.getFreeCapacity() > 0) {
        const target = room.terminal;
        const resoureType = Object.keys(creep.store)[0] as ResourceConstant;
        creep.transferOrMoveTo(target, resoureType);
        return;
    }
}




const LogisticsFunction = {
    prepare: function (creep: Creep) {
        const boosts = ['XKH2O', 'KH2O', 'KH', 'XZHO2', 'ZHO2', 'ZO'];
        creep.memory.boosted = creep.boost(boosts);
        if(creep.memory.boosted) return true;
        return false;
    },
    source: function (creep: Creep) {
        withdraw(creep);
        return creep.store.getFreeCapacity() === 0;
    },
    target: function (creep: Creep) {
        transfer(creep);
        return creep.store.getUsedCapacity() === 0;
    }
};

export default LogisticsFunction;