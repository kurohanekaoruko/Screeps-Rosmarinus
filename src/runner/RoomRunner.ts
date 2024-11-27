/**
 * 房间工作模块，具体工作由原型拓展定义
 */
export const roomRunner = function (room: any) {
    // 定期更新建筑缓存
    if (Game.time % 100 == 0) room.update();

    // 运行自己的房间
    if (!room || !room.controller?.my) return;
    if (!global.BotMem('rooms', room.name)) return;

    // 初始化
    if (!Memory.MissionPools[room.name])
        room.init();
    // 房间运行
    if (room.run) room.run();
}