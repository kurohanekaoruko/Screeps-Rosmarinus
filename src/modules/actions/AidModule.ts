const AidModule = {
    tickEnd: function () {
        if (Game.time % 50) return;
        for (const flagName in Game.flags) {


            // 增援升级
            const upgradeFlag = flagName.match(/^r([EW][1-9]+[NS][1-9]+)[-_#/]upgrade(?:[-_#/].*)?$/);
            if (Game.time % 400 == 0 && upgradeFlag) {
                const room = Game.rooms[upgradeFlag[1]];
                if (!room.controller || !room.controller.my) continue;
                room.SpawnMissionAdd('', [], 12, 'speedup-upgrade', {
                    home: Game.flags[flagName].pos.roomName
                } as any);
                const targetRoom = Game.flags[flagName].room;
                if (targetRoom && targetRoom.level >= 6) {
                    room.SpawnMissionAdd('', [], 12, 'speedup-upgrade', {
                        home: Game.flags[flagName].pos.roomName
                    } as any);
                }
            }

            // 增援能量
            const carryEnergyFlag = flagName.match(/^r([EW][1-9]+[NS][1-9]+)[-_#/]carryEnergy(?:[-_#/].*)?$/);
            if (Game.time % 500 == 0 && carryEnergyFlag) {
                const room = Game.rooms[carryEnergyFlag[1]];
                if (!room.controller || !room.controller.my) continue;
                room.SpawnMissionAdd('', [], -1, 'big-carry', {
                    sourceRoom: carryEnergyFlag[1],
                    targetRoom: Game.flags[flagName].pos.roomName
                } as any);
                continue;
            }
        }
    }
}