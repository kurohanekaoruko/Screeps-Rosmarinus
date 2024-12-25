// 线型队形移动到指定位置
export const LineMoveTo = function (squadData: SquadMemory, target: any) {
    const creepA = Game.getObjectById(squadData['members']['A']) as Creep;
    const creepB = Game.getObjectById(squadData['members']['B']) as Creep;
    const creepC = Game.getObjectById(squadData['members']['C']) as Creep;
    const creepD = Game.getObjectById(squadData['members']['D']) as Creep;

    if(!creepA || !creepB || !creepC || !creepD) return false;
    const creeps = [creepA, creepB, creepC, creepD];

    // 到达目标或有creep疲劳则停止
    if (creeps.some(c => c.pos.isEqualTo(target)) || creeps.some(c => c.fatigue > 0)) {
        return;
    }

    // 队长移动
    if (creeps[0].pos.isRoomEdge() || creeps[0].pos.isNearTo(creeps[1])) {
        creeps[0].moveTo(target);
    }
    // 跟随移动
    for(let i = 1; i < creeps.length; i++) {
        if (i != 3 && creeps[i].pos.isRoomEdge() &&
           !creeps[i].pos.isNearTo(creeps[i+1])) {
            continue;
        }
        creeps[i-1].pull(creeps[i]);
        if(creeps[i].pos.isNear(creeps[i-1].pos)) {
            creeps[i].move(creeps[i-1]);
        } else {
            creeps[i].moveTo(creeps[i-1]);
        }
    }
    
    return;
}

// 由线性队形转为方阵队形
export const LineToQuad = function (squadData: SquadMemory) {
    const creepA = Game.getObjectById(squadData['members']['A']) as Creep;
    const creepB = Game.getObjectById(squadData['members']['B']) as Creep;
    const creepC = Game.getObjectById(squadData['members']['C']) as Creep;
    const creepD = Game.getObjectById(squadData['members']['D']) as Creep;

    if(!creepA || !creepB || !creepC || !creepD) return false;

    if ((creepB.pos.x == creepA.pos.x && creepB.pos.y == creepA.pos.y+1) &&
        (creepC.pos.x == creepA.pos.x+1 && creepC.pos.y == creepA.pos.y) &&
        (creepD.pos.x == creepA.pos.x+1 && creepD.pos.y == creepA.pos.y+1)
    ) {
        return true;
    }

    creepB.moveTo(new RoomPosition(creepA.pos.x, creepA.pos.y+1, creepA.pos.roomName));
    creepC.moveTo(new RoomPosition(creepA.pos.x+1, creepA.pos.y, creepA.pos.roomName));
    creepD.moveTo(new RoomPosition(creepA.pos.x+1, creepA.pos.y+1, creepA.pos.roomName));
    return false;
}

// 方阵移动
export const QuadMove = function (squadData: SquadMemory, direction: DirectionConstant) {
    const creepA = Game.getObjectById(squadData['members']['A']) as Creep;
    const creepB = Game.getObjectById(squadData['members']['B']) as Creep;
    const creepC = Game.getObjectById(squadData['members']['C']) as Creep;
    const creepD = Game.getObjectById(squadData['members']['D']) as Creep;

    const creeps = [creepA, creepB, creepC, creepD].filter(c => c);
    // 存在疲劳的creep则停止
    if (creeps.some(c => c.fatigue > 0)) return false;
    creeps.forEach(creep => creep.move(direction))
    return true;
}


// 方阵移动到指定位置
export const QuadMoveTo = function (squadData: SquadMemory, target: any) {
    const creepA = Game.getObjectById(squadData['members']['A']) as Creep;
    const creepB = Game.getObjectById(squadData['members']['B']) as Creep;
    const creepC = Game.getObjectById(squadData['members']['C']) as Creep;
    const creepD = Game.getObjectById(squadData['members']['D']) as Creep;
    if(!creepA || !creepB || !creepC || !creepD) return false;
    const creeps = [creepA, creepB, creepC, creepD];

    // 到达目标或有creep疲劳则停止
    if(creeps.some(c => c.fatigue > 0 || c.pos.isEqualTo(target))) return false;
    


    
}