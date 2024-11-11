/**
 * 房间工作模块，具体工作由原型拓展定义
 */
export const roomRunner = function (room: any) {
    if (!room || !room.controller?.my) return;
    const BOT_NAME = global.BaseConfig.BOT_NAME;
    if (!Memory[BOT_NAME]['rooms'][room.name]) return;
    
    let cpu = Game.cpu.getUsed();
    if (room.run) room.run();
    cpu = Game.cpu.getUsed() - cpu;

    if(!global.roomCpuInfo) global.roomCpuInfo = {};
    if(!global.roomCpuInfo[room.name]) global.roomCpuInfo[room.name] = 0;
    global.roomCpuInfo[room.name] += cpu;
}