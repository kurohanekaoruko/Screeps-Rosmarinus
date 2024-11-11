export default class PowerCreepRun extends PowerCreep {
    run() {
        if(!this.room) return;
        const name = this.name;

        const flag = Game.flags[`${name}-move`];
        if(flag && !this.pos.inRangeTo(flag, 0)) {
            this.Generate_OPS();
            this.moveTo(Game.flags[`${name}-move`], {visualizePathStyle: {stroke: '#ff0000'}});
            return;
        }

        if(this.Generate_OPS())  return;

        if(this.ToRenew()) return;

        if(name.match(/O#(\d+)/)) {
            PowerCreepAction['O'](this);
        }
    }
}

const PowerCreepAction = {
    'O': function(pc: PowerCreep) {
        const shield = Game.flags[`${pc.name}-shield`];
        if(shield && pc.Shield(shield.pos)) return;
        
        if(pc.PowerEnabled()) return;   // 房间开启power
        if(pc.transferOPS())  return;    // 转移ops
        if(pc.withdrawOPS())  return;      // 取出ops
        if(pc.Operate_Factory())  return;    // 操作工厂
        if(pc.Regen_Source())  return;  // 生成能量
        if(pc.Operate_Power())  return;  // 提高Power处理速率
        if(pc.Operate_Extension())  return;  // 填充扩展
    }
}
