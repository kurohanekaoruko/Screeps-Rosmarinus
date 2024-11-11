/**
 * creep 工作模块，具体工作由原型拓展定义
 */
export const creepRunner = function (creep: any) {
    if (!creep || creep.ticksToLive <= 0 || creep.spawning) return;
    let cpu = Game.cpu.getUsed();
    if (creep.run) creep.run();
    cpu = Game.cpu.getUsed() - cpu;

    if(!global.creepCpuInfo) global.creepCpuInfo = {};
    if(!global.creepCpuInfo[creep.room.role]) global.creepCpuInfo[creep.room.role] = 0;
    global.creepCpuInfo[creep.memory.role] += cpu;

    if(!global.roomCreepCpuInfo) global.roomCreepCpuInfo = {};
    if(!global.roomCreepCpuInfo[creep.room.name]) global.roomCreepCpuInfo[creep.room.name] = 0;
    global.roomCreepCpuInfo[creep.room.name] += cpu;
}