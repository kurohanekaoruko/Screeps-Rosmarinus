interface SquadMemory {
    name: string,
    time: number, // 创建时间
    state: 'idle' | 'active', // 状态
    toward: '↑' | '←' | '→' | '↓',    // 朝向
    formation: 'line' | 'quad' | string,  // 队形
    members: { A: Id<Creep>, B: Id<Creep>, C: Id<Creep>, D: Id<Creep> },  // 成员
    targetRoom: string,    // 目标房间
    cache: {
        lastDirect: DirectionConstant, // 上次移动方向
        lastMoveTarget: Id<Creep> | Id<Structure> | Id<Flag>, // 上次移动目标
        lastTargetPos: string, // 上次移动目标位置  x/y/roomName
    }
}