import { BaseFlag } from './flags/BaseFlag';
import { AutoMissionFlag } from './flags/AutoMissionFlag';


/**
 * 使用旗帜触发的功能
 */
export const FlagsModule = {
    tickEnd: function() {
        for(const flagName in Game.flags) {
            if(BaseFlag(flagName)) continue;    // 基础功能
            if(AutoMissionFlag(flagName)) continue;    // 连续自动任务
        }
    },
}


