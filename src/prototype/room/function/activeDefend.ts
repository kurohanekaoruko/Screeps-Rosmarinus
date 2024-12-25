export default class ActiveDefend extends Room {
    activeDefend() {
        // 关于主动防御的检查
        if (Game.time % 5) return;
        const defend_mode = Memory['RoomControlData'][this.name]['defend_mode']
        if (this.level < 7) return;
        if (!Memory['whitelist']) Memory['whitelist'] = [];
        let hostiles = this.find(FIND_HOSTILE_CREEPS, {
            filter: hostile => 
                !Memory['whitelist'].includes(hostile.owner.username) &&
                hostile.owner.username != 'Source Keeper' &&
                hostile.owner.username != 'Invader' &&
                (hostile.getActiveBodyparts(ATTACK) > 0 || 
                hostile.getActiveBodyparts(RANGED_ATTACK) > 0 ||
                hostile.getActiveBodyparts(HEAL) > 0 ||
                hostile.getActiveBodyparts(WORK) > 0)
        }) as any;
        let power_hostiles = this.find(FIND_HOSTILE_POWER_CREEPS,{
            filter: hostile => !Memory['whitelist'].includes(hostile.owner.username)
        }) as any;
        hostiles = hostiles.concat(power_hostiles);

        if (hostiles.length > 0) {
            if(!global.Hostiles) global.Hostiles = {};
            global.Hostiles[this.name] = hostiles.map((hostile: Creep) => hostile.id);
            this.memory.defend = true;    // 进入防御状态
            // 防御模式0: 40A红球
            if (!defend_mode || defend_mode == 0) {
                const attackDefender = Object.values(Game.creeps)
                    .filter(creep => creep.room.name == this.name &&
                        creep.memory.role == 'defend-attack') as any;
                const rangedDefender = Object.values(Game.creeps)
                    .filter(creep => creep.room.name == this.name &&
                        creep.memory.role == 'defend-ranged') as any;
                global.SpawnMissionNum[this.name] = this.getSpawnMissionAmount() || {};
                let attackQueueNum = global.SpawnMissionNum[this.name]['defend-attack'] || 0;
                let rangedQueueNum = global.SpawnMissionNum[this.name]['defend-ranged'] || 0;
                if (hostiles.some((c: Creep) => c.body.some(part => part.type == ATTACK) ||
                    hostiles.some((c: Creep) => c.body.some(part => part.type == WORK))) &&
                    (attackDefender.length + attackQueueNum) < 1) {
                    this.SpawnMissionAdd('', [], -1, 'defend-attack', {home: this.name} as any)
                    this.AssignBoostTask('XUH2O', 1200);
                    this.AssignBoostTask('XZHO2', 300);
                }
                if (hostiles.some((c: Creep) => c.body.some(part => part.type == RANGED_ATTACK)) &&
                    (rangedDefender.length + rangedQueueNum < 1)) {
                    this.SpawnMissionAdd('', [], -1, 'defend-ranged', {home: this.name} as any);
                    // this.AssignBoostTask('XKHO2', 1200);
                    this.AssignBoostTask('XZHO2', 300);
                }
            }
            // 防御模式1: 双人小队
            // if (defend_mode == 1) {
            //     const doubleDefender = Object.values(Game.creeps)
            //             .filter((creep) => creep.memory.role == 'defend-2Attack' && creep.memory.targetRoom == this.name);
            //     const doubleHeal = Object.values(Game.creeps)
            //             .filter((creep) => creep.memory.role == 'defend-2Heal' && creep.memory.targetRoom == this.name);
            //     global.SpawnMissionNum[this.name] = this.getSpawnMissionAmount() || {};
            //     const queuenum = global.SpawnMissionNum[this.name];
            //     if(doubleDefender.length + (queuenum?.['defend-2Attack']||0) < 1) {
            //         this.SpawnMissionAdd('', [], -1, 'defend-2Attack', {squad: 'defender', targetRoom: this.name} as any)
            //     }
            //     if(doubleHeal.length + (queuenum?.['defend-2Heal']||0) < 1) {
            //         this.SpawnMissionAdd('', [], -1, 'defend-2Heal', {squad: 'defender', targetRoom: this.name} as any)
            //     }
            // }
        }
        else {
            if(!global.Hostiles) global.Hostiles = {};
            global.Hostiles[this.name] = [];
            this.memory.defend = false;   // 离开防御模式
        }
    }
}