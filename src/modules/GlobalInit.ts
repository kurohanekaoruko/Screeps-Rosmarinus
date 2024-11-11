import { BaseConfig } from '../constant/config';

/**
 * 全局初始化，管理global中的半持久数据
 */
export const GlobalInit = {
    init() {
        // 基本配置信息
        global.BaseConfig = BaseConfig;
        global.BOT_NAME = BaseConfig.BOT_NAME;

        // 房间基础工作所需的全局变量
        global.SpawnQueue = {};  // 孵化队列
        global.CreepNum = {};  // Creep数量
        global.QueueCreepNum = {};    // 孵化队列中Creep数量
        
    }
}
