// 检查队伍是否形成四方阵
export function checkSquadIsQuad(creeps: Creep[]) {
    if (creeps.length < 4) {
        return false;
    }
    for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
            if (!creeps[i].pos.isNearTo(creeps[j])) {
                return false;
            }
        }
    }
    return true;
}

// 检查队伍是否线性相连
export function checkSquadIsLine(creeps: Creep[]) {
    if (creeps.length < 2) {
        return false;
    }
    for (let i = 1; i < creeps.length; i++) {
        if (!creeps[i].pos.isNearTo(creeps[i - 1])) {
            return false;
        }
    }
    return true;
}

// 检查队伍是否均在同一房间
export function checkSquadInSameRoom(creeps: Creep[]) {
    if (creeps.length < 1) {
        return false;
    }
    for (let i = 1; i < creeps.length; i++) {
        if (creeps[i].room.name !== creeps[0].room.name) {
            return false;
        }
    }
    return true;
}

// 队伍是否处于边界
export function checkSquadInEdge(creeps: Creep[]) {
    if (creeps.length < 1) {
        return false;
    }
    return creeps.some((c) => c.pos.x === 0 || c.pos.x === 49 || c.pos.y === 0 || c.pos.y === 49);
}

// 获取队伍坐标范围
export function getSquadXY(creeps: Creep[]) {
    const minX = Math.min(...creeps.map((c) => c.pos.x));
    const maxX = Math.max(...creeps.map((c) => c.pos.x));
    const minY = Math.min(...creeps.map((c) => c.pos.y));
    const maxY = Math.max(...creeps.map((c) => c.pos.y));
    return { minX, maxX, minY, maxY };
}

// 检查队伍是否符合设定的朝向
export function checkSquadDirection(creeps: Creep[], toward: '↑' | '←' | '→' | '↓') {
    if (creeps.length < 4 ||
        !checkSquadIsQuad(creeps)) {
        return false;
    }

    const { minX, maxX, minY, maxY } = getSquadXY(creeps);

    switch (toward) {
        case '↑':
            return creeps[0].pos.x === minX && creeps[0].pos.y === minY &&
                   creeps[3].pos.x === maxX && creeps[3].pos.y === maxY;
        case '↓':
            return creeps[0].pos.x === maxX && creeps[0].pos.y === maxY &&
                   creeps[3].pos.x === minX && creeps[3].pos.y === minY;
        case '←':
            return creeps[0].pos.x === minX && creeps[0].pos.y === maxY &&
                   creeps[3].pos.x === maxX && creeps[3].pos.y === minY;
        case '→':
            return creeps[0].pos.x === maxX && creeps[0].pos.y === minY &&
                   creeps[3].pos.x === minX && creeps[3].pos.y === maxY;
        default:
            return false;
    }
}