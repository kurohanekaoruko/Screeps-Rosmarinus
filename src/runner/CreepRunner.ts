/**
 * creep 工作模块，具体工作由原型拓展定义
 */
export const creepRunner = function (creep: any) {
    if (!creep || creep.ticksToLive <= 0 || creep.spawning) return;
    const BOT_NAME = global.BOT_NAME;
    if (creep.memory.home && !Memory[BOT_NAME]['rooms'][creep.memory.home]) return;
    if (creep.run) creep.run();
}