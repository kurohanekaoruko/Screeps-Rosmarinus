
export default {
    room: {
        // 添加房间
        add(roomName: string, mode: string, layout: string, center: {x: number, y: number}) {
            const BOT_NAME = global.BaseConfig.BOT_NAME;
            if(!Memory[BOT_NAME]['rooms'][roomName])
                Memory[BOT_NAME]['rooms'][roomName] = {
                    mode: mode ?? 'main',
                    layout: layout ?? '',
                };
            if(center) Memory[BOT_NAME]['rooms'][roomName].center = center;
            console.log(`已添加房间${roomName}。`);
            return;
        },
        // 删除房间
        remove(roomName: string) {
            delete Memory[global.BOT_NAME]['rooms'][roomName];
            console.log(`已删除房间${roomName}。`);
            return;
        },
        // 查看房间列表
        list() {
            console.log(`房间列表：${Object.keys(Memory[global.BOT_NAME]['rooms']).join('、')}`);
            return;
        },
        // 设置房间布局
        setlayout(roomName: string, layout: string='ros') {
            Memory[global.BOT_NAME]['rooms'][roomName].layout = layout;
            console.log(`已设置${roomName}的房间布局为${layout}。`);
            return;
        },
        // 设置房间模式
        setmode(roomName: string, mode: string='main') {
            Memory[global.BOT_NAME]['rooms'][roomName].mode = mode;
            console.log(`已设置${roomName}的运行模式为${mode}。`);
            return;
        },
        // 设置布局中心
        setcenter(roomName: string, x: number, y: number) {
            Memory[global.BOT_NAME]['rooms'][roomName].center = { x, y };
            console.log(`已设置${roomName}的布局中心为${x},${y}。`);
            return;
        },
        // 开启lab
        labopen(roomName: string) {
            const room = Game.rooms[roomName];
            room.memory.lab = true;
            console.log(`已开启${roomName}的lab合成。`);
            return;
        },
        // 关闭lab
        labstop(roomName: string) {
            const room = Game.rooms[roomName];
            room.memory.lab = false;
            console.log(`已关闭${roomName}的lab合成。`);
            return;
        },
        // 设置lab合成底物
        setLab(roomName: string, A: string, B: string) {
            const RESOURCE_ABBREVIATIONS = global.BaseConfig.RESOURCE_ABBREVIATIONS;
            const room = Game.rooms[roomName];
            room.memory.labAtype = RESOURCE_ABBREVIATIONS[A] || A;
            room.memory.labBtype = RESOURCE_ABBREVIATIONS[B] || B;
        },
        // 开启factory
        factoryopen(roomName: string) {
            const room = Game.rooms[roomName];
            room.memory.factory = true;
            console.log(`已开启${roomName}的factory。`);
            return;
        },
        // 关闭factory
        factorystop(roomName: string) {
            const room = Game.rooms[roomName];
            room.memory.factory = false;
            console.log(`已关闭${roomName}的factory。`);
        },
        // 设置factory生产任务
        setFactory(roomName: string, res: string) {
            const RESOURCE_ABBREVIATIONS = global.BaseConfig.RESOURCE_ABBREVIATIONS;
            const room = Game.rooms[roomName];
            room.memory.factoryTask = RESOURCE_ABBREVIATIONS[res] || res;
            console.log(`已设置${roomName}的factory生产任务为${res}。`);
        },
        // 设置factory等级
        setFactoryLevel(roomName: string, level: number) {
            const room = Game.rooms[roomName];
            room.memory.factoryLevel = level;
            console.log(`已设置${roomName}的factory等级为${level}。`);
        },
        // 开启powerSpawn
        psopen(roomName: string) {
            const room = Game.rooms[roomName];
            room.memory.powerSpawn = true;
            console.log(`已开启${roomName}的powerSpawn。`);
            return;
        },
        // 关闭powerSpawn
        psstop(roomName: string) {
            const room = Game.rooms[roomName];
            room.memory.powerSpawn = false;
            console.log(`已关闭${roomName}的powerSpawn。`);
            return;
        },
        // 孵化powerCreep
        pcspawn(roomName: string, pcname: string) {
            const room = Game.rooms[roomName];
            const result = Game.powerCreeps[pcname].spawn(room.powerSpawn);
            if(result === OK) {
                console.log(`${roomName} 的 powerSpawn 孵化了 powerCreep ${pcname} `);
            }
            else {
                console.log(`${roomName} 的 powerSpawn 孵化 powerCreep ${pcname} 失败，错误码 ${result}`);
            }
            return;
        },
        // 添加中央搬运任务
        addManageTask(roomName: string, source: 's'|'t'|'f'|'l', target: 's'|'t'|'f'|'l', type: string, amount: number) {
            const RESOURCE_ABBREVIATIONS = global.BaseConfig.RESOURCE_ABBREVIATIONS;
            type = RESOURCE_ABBREVIATIONS[type] || type;
            const room = Game.rooms[roomName];
            room.ManageMissionAdd(source, target, type, amount);
            console.log(`在房间 ${room.name} 添加了中央搬运任务: 从 ${source} 到 ${target}, 资源类型 ${type}, 数量 ${amount}`);
        }

    }
}