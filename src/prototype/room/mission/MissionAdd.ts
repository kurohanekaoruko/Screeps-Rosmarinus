/**
 * 任务添加模块
 */
export default class MissionAdd extends Room {
    ManageMissionAdd(source: string, target: string, resourceType: any, amount: number) {
        // 将缩写转换为全名
        const structures = {
            s: 'storage',
            t: 'terminal',
            l: 'link',
            f: 'factory',
        }
        if(source in structures) source = structures[source];
        if(target in structures) target = structures[target];

        // 检查是否有相同任务
        let existingTaskId = this.checkSameMissionInPool('manage', {source, target, resourceType} as ManageTask);
        return existingTaskId === null ?
                this.addMissionToPool('manage', null, 0, {source, target, resourceType, amount} as ManageTask) : // 如果不存在相同任务，添加新任务
                this.updateMissionPool(existingTaskId, 'manage', {data:{source, target, resourceType, amount} as ManageTask}); // 如果存在相同任务，更新任务数据
    }

    // 添加建造维修任务
    BuildRepairMissionAdd(type: 'build' | 'repair' | 'walls', pos: string, level: number, data: BuildRepairTask) {
        // 检查是否有相同任务
        let existingTaskId = this.checkSameMissionInPool(type, { target: data.target });
        return existingTaskId === null ?
                this.addMissionToPool(type, pos, level, data) : // 如果不存在相同任务，添加新任务
                this.updateMissionPool(existingTaskId, type, {level, data}); // 如果存在相同任务，更新任务数据
    }

    // 添加运输任务
    TransportMissionAdd(pos: string, level: number, data: TransportTask) {
        // 检查是否有相同任务
        let existingTaskId = this.checkSameMissionInPool('transport', {source:data.source, target:data.target, resourceType:data.resourceType});
        return existingTaskId === null ? 
                this.addMissionToPool('transport', pos, level, data) : // 如果不存在相同任务，添加新任务
                this.updateMissionPool(existingTaskId, 'transport', {level, data}); // 如果存在相同任务，更新任务数据
    }

}
