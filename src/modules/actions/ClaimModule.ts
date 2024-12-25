const ClaimModule = {
    tickEnd: function () {
        if (Game.time % 10) return;
        for (const flagName in Game.flags) {
            // 占领
            const claimFlag = flagName.match(/^r-([EW][1-9]+[NS][1-9]+)[-_]claim(?:[-_].*)?$/);
            if (Game.time % 500 == 0 && claimFlag) {
                const room = Game.rooms[claimFlag[1]];
                if (!room.controller || !room.controller.my) continue;
                const targetRoom = Game.flags[flagName].room;
                if (!targetRoom || (targetRoom.controller && !targetRoom.controller.my)) {
                    room.SpawnMissionAdd('', [], -1, 'claimer',{
                        homeRoom: claimFlag[1],
                        targetRoom: Game.flags[flagName].pos.roomName
                    } as any);
                }
            }
            // 援建
            if (Game.time % 800 == 0 && claimFlag) {
                const room = Game.rooms[claimFlag[1]];
                if (!room.controller || !room.controller.my) continue;
                room.SpawnMissionAdd('', [], 12, 'builder', {
                    home: Game.flags[flagName].pos.roomName
                } as any);
            }
            
            // 搜刮资源
            const despoilFlag = flagName.match(/^r-([EW][1-9]+[NS][1-9]+)[-_]despoil(?:[-_].*)?$/);
            const despoilFlagMemory = Game.flags[flagName].memory;
            if (despoilFlag && (!despoilFlagMemory['time'] || Game.time - despoilFlagMemory['time'] >= 500)) {
                const room = Game.rooms[despoilFlag[1]];
                if (!room.controller || !room.controller.my) continue;
                room.SpawnMissionAdd('', [], -1, 'logistic', { 
                    targetRoom: despoilFlag[1],
                    sourceRoom: Game.flags[flagName].pos.roomName
                } as any);
                continue;
            }

            // 攻击控制器
            const aclaimFlag = flagName.match(/^r-([EW][1-9]+[NS][1-9]+)[-_]aclaim$/);
            const aclaimFlagMemory = Game.flags[flagName].memory;
            if (aclaimFlag && (!aclaimFlagMemory['time'] || Game.time - aclaimFlagMemory['time'] >= 1000)) {
                const room = Game.rooms[aclaimFlag[1]];
                if (!room.controller || !room.controller.my) continue;
                room.SpawnMissionAdd('', [], -1, 'aclaimer', { 
                    homeRoom: aclaimFlag[1],
                    targetRoom: Game.flags[flagName].pos.roomName,
                    claimNum: 1,
                } as any);
                continue;
            }
        }
    }
}

export {ClaimModule};

