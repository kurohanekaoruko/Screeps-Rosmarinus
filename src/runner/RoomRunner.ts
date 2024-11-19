/**
 * 房间工作模块，具体工作由原型拓展定义
 */
export const roomRunner = function (room: any) {
    if (!room || !room.controller?.my) return;
    const BotMemory = global.BotMem();
    if (!BotMemory['rooms'][this.name]) return;

    // 初始化
    if (!Memory.MissionPools[this.name])
        this.init();
    // 任务更新
    if (room.MissionUpdate)
        room.MissionUpdate();
    // 房间运行
    if (room.run)
        room.run();

}