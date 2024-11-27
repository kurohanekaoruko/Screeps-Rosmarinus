const claimRoom = function(roomName) {
    // 获取所有四级及以上的自己的房间
    let availableRooms = _.filter(Game.rooms, (r) => r.my && r.level >= 4);

    if (availableRooms.length === 0) {
        return; // 如果没有可用的房间，则直接返回
    }

    // 查找距离目标房间最近的房间
    let nearestRoom = null;
    let minDistance = Infinity;

    for (let availableRoom of availableRooms) {
        let distance = Game.map.getRoomLinearDistance(availableRoom.name, roomName);
        if (distance < minDistance) {
            minDistance = distance;
            nearestRoom = availableRoom;
        }
    }

    if (!nearestRoom) {
        return; // 如果没有找到合适的房间，返回
    }

    if (global.SpawnMissionNum[nearestRoom.name]['claimer'] > 0) return;

    nearestRoom.SpawnMissionAdd('CL', [], 0, 'claimer', { home: roomName, target: roomName });
}

const createSpawn = function(flag, roomName) {
    // 每 10 tick 检查一次
    if (Game.time % 10 != 0) {return;}

    let room = Game.rooms[roomName];
    if(room){
        // 旗帜所在房间是否有 spawn
        if (room.find(FIND_MY_SPAWNS).length > 0) {return;}

        // 如果旗帜所在房间没有 spawn 的建筑工地，则设置一个新的 spawn 工地
        if (Game.time % 10 == 0) {
            let constructionSites = room.find(FIND_CONSTRUCTION_SITES, {filter: (site) => site.structureType === STRUCTURE_SPAWN});
            if (constructionSites.length === 0) {room.createConstructionSite(flag.pos, STRUCTURE_SPAWN, 'Spawn_' + roomName);}
        }
    }

    

    // 如果builder数量满足，则不生产
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.home == roomName);
    if (builders.length >= 4) {return;}

    // 获取所有四级及以上的自己的房间
    let availableRooms = _.filter(Game.rooms, (r) => r.my && r.level >= 4);

    if (availableRooms.length === 0) {
        return; // 如果没有可用的房间，则直接返回
    }

    // 查找距离目标房间最近的房间
    let nearestRoom = null;
    let minDistance = Infinity;

    for (let availableRoom of availableRooms) {
        let distance = Game.map.getRoomLinearDistance(availableRoom.name, roomName);
        if (distance < minDistance) {
            minDistance = distance;
            nearestRoom = availableRoom;
        }
    }

    if (!nearestRoom) {
        return; // 如果没有找到合适的房间，返回
    }

    if(builders.length + (global.SpawnMissionNum[roomName]?.['builder'] || 0) >= 4) {return;}


    nearestRoom.SpawnMissionAdd('B', [],10, 'builder', { home: roomName, target: roomName });
    nearestRoom.SpawnMissionAdd('B', [],10, 'builder', { home: roomName, target: roomName });
    nearestRoom.SpawnMissionAdd('B', [],10, 'builder', { home: roomName, target: roomName });
}


const Claim = {
    tick: function() {
        // 每 10 tick 检查一次
        if (Game.time % 10 != 0) {return;}

        let flag = Game.flags['claim'];
        if (!flag) return;

        let targetName = flag.pos.roomName;
        const room = Game.rooms[targetName];

        if(!room || !room.controller || !room.controller.my) {
            let claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.target == targetName);
            if (claimers.length === 0) {
                claimRoom(targetName);
            }
        }

        createSpawn(flag, targetName);

        if (room && room.controller && room.controller.my) {
            flag.remove();
        }
    }
}

export { Claim }
