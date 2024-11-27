import { RoleLevelData, RoleData } from '@/constant/CreepConstant';

// 资源采集集群
const CollectClusters = {
    tick: function () {
        if (Game.time % 10 != 0) return;
        const flags = Game.flags;

        for (const flagName in flags) {
            // 匹配flag: collect-房间名-数量
            const match = flagName.match(/^collect[-_#/ ]([EW]\d+[NS]\d+)[-_#/ ](\d+)(?:[-_#/ ].*)?$/);
            if (!match) continue;
            const [_, room, num] = match;

            const flag = flags[flagName];

            const homeRoomName = room;
            const carrierNum = num;
            const targetRoom = flag.pos.roomName;

            if(!global.BotMem('rooms', homeRoomName)) {
                flag.remove();
                continue;
            };

            const isCenterRoom = /^[EW]\d*[456][NS]\d*[456]$/.test(targetRoom); // 中间房间
            const isNotHighway = /^[EW]\d*[1-9][NS]\d*[1-9]$/.test(targetRoom); // 非公路房间
            if (isCenterRoom) {    // 中间房间
                CenterRoomCollect(homeRoomName, targetRoom, carrierNum);
            }
            else if (!isNotHighway) {    // 公路房间
                OuterDepositCollect(homeRoomName, targetRoom);   // 采集资源
            }
        }
    }
}

const CenterRoomCollect = function (homeRoomName, targetRoomName, num) {
    const homeRoom = Game.rooms[homeRoomName];
    const lv = homeRoom.getEffectiveRoomLevel();

    if(lv < 6) return;

    if (homeRoom.checkMissionInPool('spawn')) return; // 孵化队列有任务不生成

    const out_attack = Object.values(Game.creeps).filter((creep) => creep.memory.role == 'out-attack' && creep.memory.targetRoom == targetRoomName && 
                                (creep.spawning || creep.ticksToLive > 100));
    if(out_attack.length < 1) {
        const bodys = DynamicBodys('out-attack', lv);
        const memory = { homeRoom: homeRoomName, targetRoom: targetRoomName };
        homeRoom.SpawnMissionAdd('OA', bodys, 9, 'out-attack', memory);
        return;
    }

    const out_miner = Object.values(Game.creeps).filter((creep) => creep.memory.role == 'out-miner' && creep.memory.targetRoom == targetRoomName);
    if(out_miner.length < 1) {
        const bodys = DynamicBodys('out-miner', lv);
        const memory = { homeRoom: homeRoomName, targetRoom: targetRoomName };
        homeRoom.SpawnMissionAdd('OM', bodys, 12, 'out-miner', memory);
        return;
    }

    const out_carry = Object.values(Game.creeps).filter((creep) => creep.memory.role == 'out-carry' && creep.memory.targetRoom == targetRoomName);
    if(out_carry.length < num) {
        const bodys = DynamicBodys('out-carry', lv);
        const memory = { homeRoom: homeRoomName, targetRoom: targetRoomName };
        homeRoom.SpawnMissionAdd('OC', bodys, 13, 'out-carry', memory);
        return;
    }
}

const OuterDepositCollect = function (homeRoomName, targetRoomName) {
    const targetRoom = Game.rooms[targetRoomName];
    const homeRoom = Game.rooms[homeRoomName];
    const lv = homeRoom.getEffectiveRoomLevel();

    if(lv < 6) return;

    if (homeRoom.checkMissionInPool('spawn')) return; // 孵化队列有任务不生成

    const deposit_harvest = _.filter(Game.creeps, (creep) => creep.memory.role == 'deposit-harvest' &&
                                                            creep.memory.targetRoom == targetRoomName &&
                                                            (creep.spawning || creep.ticksToLive > 200));
    const deposit_transport = _.filter(Game.creeps, (creep) => creep.memory.role == 'deposit-transport' && 
                                                            creep.memory.targetRoom == targetRoomName &&
                                                            (creep.spawning || creep.ticksToLive > 200));

    if(deposit_harvest.length < 3) {
        const bodys = DynamicBodys('deposit-harvest', lv);
        const memory = { homeRoom: homeRoomName, targetRoom: targetRoomName };
        homeRoom.SpawnMissionAdd('DH', bodys, 11, 'deposit-harvest', memory);
    }

    if(deposit_transport.length < 2) {
        const bodys = DynamicBodys('deposit-transport', lv);
        const memory = { homeRoom: homeRoomName, targetRoom: targetRoomName };
        homeRoom.SpawnMissionAdd('DT', bodys, 11, 'deposit-transport', memory);
    }
}

const DynamicBodys = function (role, lv) {
    const bodypart = RoleData[role].adaption ? RoleLevelData[role][lv].bodypart : RoleData[role].ability;
    return bodypart;
}

export { CollectClusters }