/**
 * 任务获取模块
 */
export default class MissionGet extends Room {
    getTransportMission(creep: Creep) {
        const posInfo = `${creep.pos.x}/${creep.pos.y}/${creep.pos.roomName}`

        const task = this.getMissionFromPool('transport', posInfo);
        if(!task) return null;
        if(!(creep.id in task.bind)) {
            task.bind.push(creep.id);   // 记录任务绑定creep
        }

        // 当任务被完全接取，那么锁定任务
        if(task.bind.map(id => Game.getObjectById(id)?.store.getCapacity() || 0)
            .reduce((a, b) => a + b, 0)
            >= (task.data as TransportTask).amount) {
            task.lock = true;
        }

        return task;
    }

    getBuildMission(creep: Creep) {
        const posInfo = `${creep.pos.x}/${creep.pos.y}/${creep.pos.roomName}`

        if(this.checkMissionInPool('build')){
            const checkFunc = (task: task) => {
                const target = Game.getObjectById(task.data.target as Id<ConstructionSite>)
                return target && target.progress < target.progressTotal
            };
            const task = this.getMissionFromPool('build', posInfo, checkFunc);
            if(!task) return null;

            return task;
        }
        if(this.checkMissionInPool('repair')){
            const checkFunc = (task: task) => {
                const target = Game.getObjectById(task.data.target as Id<Structure>)
                return target && target.hits < target.hitsMax
            }
            const task = this.getMissionFromPool('repair', posInfo, checkFunc);
            if(!task) return null;

            return task;
        }
        
        return null;
    }

    getRepairMission(creep: Creep) {
        const posInfo = `${creep.pos.x}/${creep.pos.y}/${creep.pos.roomName}`

        if(this.checkMissionInPool('repair')){
            const task = this.getMissionFromPool('repair', posInfo);
            if(!task) return null;

            return task;
        }

        if(this.checkMissionInPool('walls')){
            const task = this.getMissionFromPool('walls', posInfo);
            if(!task) return null;

            return task;
        }

        return null;
    }
}