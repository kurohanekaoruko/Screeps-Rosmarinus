import { RoleData } from '@/constant/CreepConfig';

export default class CreepRun extends Creep {
    run() {
        const role = this.memory.role;
        if(!this.memory.cache) { this.memory.cache = {} };
        const roledata = RoleData[role]
        if(!roledata) return;

        // 根据固定优先级行动
        if(roledata.work) {
            const func = roledata.work;
            if (func.prepare && !this.memory.ready){
                this.memory.ready = func.prepare(this);
            }

            let stateChange = false;
            if (this.memory.working) stateChange = func.target(this);
            else stateChange = func.source(this);

            if(stateChange) {
                this.memory.working = !this.memory.working;
                this.memory.cache = {}; // 清空临时缓存
            }
            return true;
        }

        // 根据接取任务内容行动
        else if(roledata.mission) {
            return roledata.mission(this);
        }

        // 根据接收命令行动
        else if(roledata.action) {
            return roledata.action(this);
        }

        return false;
    }

}