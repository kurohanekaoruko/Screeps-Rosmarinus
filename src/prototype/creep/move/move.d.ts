interface Creep {
    transferOrMoveTo(target: any, ...args: any[]): boolean;
    withdrawOrMoveTo(target: any, ...args: any[]): boolean;
    pickupOrMoveTo(target: any, ...args: any[]): boolean;
    repairOrMoveTo(target: any, ...args: any[]): boolean;
    buildOrMoveTo(target: any, ...args: any[]): boolean;
    moveHomeRoom(): boolean;
    moveToRoom(roomName: string, options?:{[key: string]: any}): any;
    double_move(target: any, color: string): void;
}