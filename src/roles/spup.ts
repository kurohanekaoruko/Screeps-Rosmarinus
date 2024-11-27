
const upgrade = function (creep: Creep) {
    const link = creep.room.link.find(l => l.pos.inRangeTo(creep.room.controller, 2))
    if (link && !creep.pos.inRangeTo(link, 1)) {
        creep.moveTo(link, { 
            visualizePathStyle: { stroke: '#ffffff' },
            range: 1,
            maxRooms: 1,
         });
    }
    if (!link && !creep.pos.inRangeTo(creep.room.controller, 3)) {
        creep.moveTo(creep.room.controller.pos, {
            visualizePathStyle: { stroke: '#ffffff' },
            range: 3,
            maxRooms: 1,
        });
    }
    if (creep.pos.inRangeTo(creep.room.controller, 3)) {
        creep.upgradeController(creep.room.controller)
        const botMem = global.BotMem('rooms', creep.room.name);
        const sign = botMem.sign ?? '';
        if(Game.time % 10 && creep.room.controller && (creep.room.controller.sign?.text ?? '') != sign) {
            if (creep.pos.inRangeTo(creep.room.controller, 1)) {
                creep.signController(creep.room.controller, sign);
            }
        }
    }
    if(creep.store[RESOURCE_ENERGY] < 50) {
        const target = [link, creep.room.storage, creep.room.terminal]
            .find(l => l && l.store[RESOURCE_ENERGY] > 0 && creep.pos.inRangeTo(l, 1));
        if(target) {
            creep.withdrawOrMoveTo(target, RESOURCE_ENERGY);
        }
    }

    if (Game.time % 50 == 0 &&
        !creep.pos.inRangeTo(creep.room.controller, 1) &&
        creep.pos.inRangeTo(creep.room.controller, 3)){
        nearController(creep);
    }
    return;
}

const nearController = function(creep: Creep) {
    const controller = creep.room.controller;
    const terminal = creep.room.terminal;
    const terrain = new Room.Terrain(creep.room.name);
    const pos1 = terminal.pos;
    const pos2 = creep.pos;
    
    if (!global.spup_terminal_noCreep_area) global.spup_terminal_noCreep_area = {};
    if (!global.spup_terminal_noCreep_area[creep.room.name] ||
        global.spup_terminal_noCreep_area[creep.room.name].time != Game.time
    ) {
        const noCreep = [
            [pos1.x - 1, pos1.y],[pos1.x + 1, pos1.y],[pos1.x, pos1.y - 1],[pos1.x, pos1.y + 1],
            [pos1.x - 1, pos1.y - 1],[pos1.x - 1, pos1.y + 1],[pos1.x + 1, pos1.y - 1],[pos1.x + 1, pos1.y + 1],
        ].filter((p) => {
            return terrain.get(p[0], p[1]) !== TERRAIN_MASK_WALL &&
            (new RoomPosition(p[0], p[1], creep.room.name)).lookFor(LOOK_CREEPS).length === 0;
        }).map((p) => p[0] * 100 + p[1]);
        global.spup_terminal_noCreep_area[creep.room.name] = {
            time: Game.time,
            noCreep: noCreep,
        }
    }

    const noCreep = global.spup_terminal_noCreep_area[creep.room.name].noCreep;

    for (const p of noCreep) {
        const pos = new RoomPosition(Math.floor(p / 100), p % 100, creep.room.name);
        if (creep.pos.inRangeTo(pos, 1) &&
            getDistance(pos, controller.pos) < getDistance(pos2, controller.pos)) {
            creep.moveTo(pos);
            return;
        }
    }
}

const getDistance = function(pos1: RoomPosition, pos2: RoomPosition) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}

const SpeedUpgrader = {
    prepare: function (creep: Creep) {
        if(creep.room.level == 8) return true;
        return creep.boost(['XGH2O', 'GH2O', 'GH']);
    },

    target: function (creep: Creep) {   // 升级控制器
        if(!creep.memory.ready) return false;
        if(!creep.moveHomeRoom()) return;
        if(creep.ticksToLive < 10 && creep.body.some(part => part.boost)) {
            if(creep.unboost()) creep.suicide();
            return false;
        }
        upgrade(creep);
        if (creep.store.getUsedCapacity() === 0) {
            creep.say('🔄');
            return true;
        } else { return false; }
    },
    
    source: function (creep: Creep) {   // 获取能量
        if(!creep.memory.ready) return false;
        if(!creep.moveHomeRoom()) return;
        if(creep.ticksToLive < 10 && creep.body.some(part => part.boost)) {
            if(creep.unboost()) creep.suicide();
            return false;
        }
        const link = creep.room.link.find(l => l.pos.inRangeTo(creep.room.controller, 2)) || null;
        const container = creep.room.container.find(l => l.pos.inRangeTo(creep.room.controller, 2)) ?? null;
        const terminal = [creep.room.terminal].find(l => l && l.pos.inRangeTo(creep.room.controller, 3)) ?? null;
        if (link && link.store[RESOURCE_ENERGY] > 0) {
            creep.withdrawOrMoveTo(link, RESOURCE_ENERGY);
        }
        else if(container && container.store[RESOURCE_ENERGY] > 0) {
            creep.withdrawOrMoveTo(container, RESOURCE_ENERGY);
        }
        else if(terminal && terminal.store[RESOURCE_ENERGY] > 0) {
            creep.withdrawOrMoveTo(terminal, RESOURCE_ENERGY);
        }

        if (creep.store.getFreeCapacity() === 0) {
            creep.say('⚡');
            return true;
        } else { return false; }
    },
}

export default SpeedUpgrader;

