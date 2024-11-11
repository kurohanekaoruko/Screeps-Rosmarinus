/**
 * PowerCreep 工作模块
 */
export const powerRunner = function (pc: any) {
    if (!pc || !pc.ticksToLive || pc.ticksToLive <= 0) return;
    if (pc.run) return pc.run()
}