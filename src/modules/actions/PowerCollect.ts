
const PowerCollect = {
    tick: function () {
        if (Game.time % 10 != 0) return;
        const flags = Game.flags;
        for (const flagName in flags) {
            const match = flagName.match(/^powercollect[-_#/ ]([EW]\d+[NS]\d+)$/);
            if(!match) continue;
            const [__, room] = match;

            const flag = flags[flagName];
            const homeRoom = Game.rooms[room];
            const targetRoomName = flag.pos.roomName;

            const targetRoom = Game.rooms[targetRoomName];
            if(targetRoom){
                const target = targetRoom.find(FIND_STRUCTURES,{filter: (s) => s.structureType == STRUCTURE_POWER_BANK});
                if(target.length == 0) {
                    flag.remove();
                    continue;
                }
            }

            PowerCollectSpawn(homeRoom, targetRoomName);
        }

    }
}

const PowerCollectSpawn = function (homeRoom: Room, targetRoomName: string) {
    if (global.SpawnQueue[homeRoom.name].length > 0) return; // 孵化队列有任务不生成

    const powerAttack = _.filter(Game.creeps, (creep) => creep.memory.role == 'power-attack' &&
                            creep.memory.targetRoom == targetRoomName &&
                            (creep.spawning || creep.ticksToLive > 50));
    if (powerAttack.length < 2) {
        const memory = { role: 'power-attack', homeRoom: homeRoom.name, targetRoom: targetRoomName };
        homeRoom.SpawnQueueAdd('PA', [], memory);
    }

    const powerHeal = _.filter(Game.creeps, (creep) => creep.memory.role == 'power-heal' &&
                            creep.memory.targetRoom == targetRoomName &&
                            (creep.spawning || creep.ticksToLive > 50));
    if (powerHeal.length < 2) {
        const memory = { role: 'power-heal', homeRoom: homeRoom.name, targetRoom: targetRoomName };
        homeRoom.SpawnQueueAdd('PH', [], memory);
    }

    const targetRoom = Game.rooms[targetRoomName];
    if(!targetRoom) return;
    const powerBanks = targetRoom.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_POWER_BANK });
    if(!powerBanks || powerBanks.length == 0) return;
    const powerBank = powerBanks[0];
    if (powerBank.hits < powerBank.hitsMax / 2) {
        const powerCarry = _.filter(Game.creeps, (creep) => creep.memory.role == 'power-carry' &&
                            creep.memory.targetRoom == targetRoomName &&
                            (creep.spawning || creep.ticksToLive > 50));
        if (powerAttack.length >= 2 && powerHeal.length >= 2 && powerCarry.length < 3) {
            const memory = { role: 'power-carry', homeRoom: homeRoom.name, targetRoom: targetRoomName };
            homeRoom.SpawnQueueAdd('PC', [], memory);
        }
    }
}

export { PowerCollect };