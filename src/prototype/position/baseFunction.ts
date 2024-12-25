export default class BaseFunction extends RoomPosition {
    // 切比雪夫距离
    getDistance(pos: RoomPosition): number {
        const { x: x1, y: y1, roomName: roomName1} = this;
        const { x: x2, y: y2, roomName: roomName2 } = pos;
        if (roomName1 !== roomName2) return Infinity;
        return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
    }
    // 是否位置相同
    isEqual(pos: RoomPosition): boolean {
        const { x: x1, y: y1, roomName: roomName1 } = this;
        const { x: x2, y: y2, roomName: roomName2 } = pos;
        return x1 === x2 && y1 === y2 && roomName1 === roomName2;
    }
    // 是否相邻
    isNear(pos: RoomPosition): boolean {
        const { x: x1, y: y1, roomName: roomName1} = this;
        const { x: x2, y: y2, roomName: roomName2 } = pos;
        if (roomName1 !== roomName2) return false;
        return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1;
    }
    // 是否在指定距离内
    inRange(target: any, range: number): boolean {
        let pos = target.pos || target;
        if (!pos) return false;
        return this.getDistance(pos) <= range;
    }
    // 是否位于房间边界
    isRoomEdge(): boolean {
        const { x, y } = this;
        return x === 0 || x === 49 || y === 0 || y === 49;
    }
}