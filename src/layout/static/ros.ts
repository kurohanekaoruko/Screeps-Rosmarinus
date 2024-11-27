const ros = {
    'storage': [{ 'x': -1, 'y': 0 }],
    'link': [{ 'x': 0, 'y': -1 }],
    'terminal': [{ 'x': 1, 'y': 0 }],
    'factory': [{ 'x': 0, 'y': 1 }],
    'spawn': [{ 'x': -4, 'y': 0 }, { 'x': 0, 'y': -4 }, { 'x': 4, 'y': 0 }],
    'powerSpawn': [{ 'x': 0, 'y': 4 }],
    'tower': [{ 'x': -2, 'y': -2 }, { 'x': 2, 'y': -2 }, { 'x': 2, 'y': 2 }, { 'x': -2, 'y': 2 }, { 'x': -5, 'y': 5 }, { 'x': 5, 'y': 5 }],
    'observer': [{ 'x': 1, 'y': 6 }],
    'nuker': [{ 'x': -1, 'y': 6 }],
    'container': [{ 'x': -4, 'y': -2 }, { 'x': -2, 'y': -4 }],
    'lab': [
        { 'x': -4, 'y': -4 }, { 'x': -5, 'y': -3 }, { 'x': -3, 'y': -5 },
        { 'x': -5, 'y': -5 }, { 'x': -5, 'y': -4 }, { 'x': -4, 'y': -5 },
        { 'x': -5, 'y': -2 }, { 'x': -4, 'y': -3 }, { 'x': -3, 'y': -4 }, { 'x': -2, 'y': -5 }
    ],
    'extension': [
        { 'x': -3, 'y': 0 }, { 'x': -4, 'y': -1 }, { 'x': -5, 'y': 0 }, { 'x': -4, 'y': 1 },
        { 'x': -2, 'y': -1 }, { 'x': -3, 'y': -2 }, { 'x': -2, 'y': -3 }, { 'x': -1, 'y': -2 },
        { 'x': 0, 'y': -3 }, { 'x': -1, 'y': -4 }, { 'x': 0, 'y': -5 }, { 'x': 1, 'y': -4 },
        { 'x': 1, 'y': -2 }, { 'x': 2, 'y': -3 }, { 'x': 3, 'y': -2 }, { 'x': 2, 'y': -1 },
        { 'x': 3, 'y': 0 }, { 'x': 4, 'y': -1 }, { 'x': 5, 'y': 0 }, { 'x': 4, 'y': 1 },
        { 'x': 2, 'y': 1 }, { 'x': 3, 'y': 2 }, { 'x': 2, 'y': 3 }, { 'x': 1, 'y': 2 },
        { 'x': 0, 'y': 3 }, { 'x': -1, 'y': 4 }, { 'x': 0, 'y': 5 }, { 'x': 1, 'y': 4 },
        { 'x': -1, 'y': 2 }, { 'x': -2, 'y': 1 }, { 'x': -3, 'y': 2 }, { 'x': -2, 'y': 3 },

        { 'x': 2, 'y': -5 }, { 'x': 3, 'y': -4 }, { 'x': 4, 'y': -3 }, { 'x': 5, 'y': -2 },
        { 'x': 3, 'y': -5 }, { 'x': 4, 'y': -4 }, { 'x': 5, 'y': -3 },
        { 'x': 4, 'y': -5 }, { 'x': 5, 'y': -4 }, { 'x': 5, 'y': -5 },

        { 'x': -5, 'y': 2 }, { 'x': -4, 'y': 3 }, { 'x': -3, 'y': 4 },
        { 'x': -2, 'y': 5 }, { 'x': -5, 'y': 3 }, { 'x': -4, 'y': 4 },
        { 'x': -3, 'y': 5 }, { 'x': -5, 'y': 4 }, { 'x': -4, 'y': 5 },

        { 'x': 2, 'y': 5 }, { 'x': 3, 'y': 4 }, { 'x': 4, 'y': 3 },
        { 'x': 5, 'y': 2 }, { 'x': 3, 'y': 5 }, { 'x': 4, 'y': 4 },
        { 'x': 5, 'y': 3 }, { 'x': 4, 'y': 5 }, { 'x': 5, 'y': 4 },
    ],
    'road': [
        { "x": -1, "y": -3 }, { "x": -2, "y": -4 }, { "x": 0, "y": -2 }, { "x": -1, "y": -1 }, { "x": -3, "y": -3 }, { "x": -2, "y": 0 },
        { "x": -3, "y": -1 }, { "x": -4, "y": -2 }, { "x": -3, "y": 1 }, { "x": -4, "y": 2 }, { "x": -5, "y": -1 }, { "x": -5, "y": 1 },
        { "x": -6, "y": 0 }, { "x": 2, "y": -4 }, { "x": 1, "y": -3 }, { "x": 1, "y": -5 }, { "x": 3, "y": -3 }, { "x": 0, "y": -6 },
        { "x": 1, "y": -1 }, { "x": 4, "y": -2 }, { "x": 3, "y": -1 }, { "x": -1, "y": -5 }, { "x": 2, "y": 0 }, { "x": 5, "y": -1 },
        { "x": -1, "y": 1 }, { "x": 6, "y": 0 }, { "x": 3, "y": 1 }, { "x": 1, "y": 1 }, { "x": 5, "y": 1 }, { "x": 0, "y": 2 },
        { "x": 4, "y": 2 }, { "x": -3, "y": 3 }, { "x": -1, "y": 3 }, { "x": 1, "y": 3 }, { "x": -2, "y": 4 }, { "x": 2, "y": 4 },
        { "x": -1, "y": 5 }, { "x": 1, "y": 5 }, { "x": 0, "y": 6 }, { "x": 3, "y": 3 }, { "x": 0, "y": 0 }, { "x": -6, "y": -2 },
        { "x": -6, "y": 2 }, { "x": -6, "y": -3 }, { "x": -2, "y": -6 }, { "x": -6, "y": -4 }, { "x": -6, "y": -5 }, { "x": -3, "y": -6 },
        { "x": -4, "y": -6 }, { "x": -6, "y": 3 }, { "x": -6, "y": 4 }, { "x": 2, "y": -6 }, { "x": -6, "y": 5 }, { "x": -2, "y": 6 },
        { "x": 6, "y": 2 }, { "x": 6, "y": -2 }, { "x": 6, "y": 3 }, { "x": -5, "y": -6 }, { "x": -3, "y": 6 }, { "x": -4, "y": 6 },
        { "x": 2, "y": 6 }, { "x": -5, "y": 6 }, { "x": 3, "y": 6 }, { "x": 4, "y": 6 }, { "x": 6, "y": 4 }, { "x": 5, "y": 6 },
        { "x": 6, "y": 5 }, { "x": 6, "y": -3 }, { "x": 6, "y": -4 }, { "x": 6, "y": -5 }, { "x": 3, "y": -6 }, { "x": 4, "y": -6 },
        { "x": 5, "y": -6 }
    ],
    'rampart': [
        { "x": 0, "y": 0 }, { "x": -1, "y": 0 }, { "x": 0, "y": -1 }, { "x": 1, "y": 0 }, { "x": 0, "y": 1 }, { 'x': -4, 'y': 0 },
        { 'x': 0, 'y': -4 }, { 'x': 4, 'y': 0 }, { 'x': 0, 'y': 4 }, { 'x': -2, 'y': -2 }, { 'x': 2, 'y': -2 }, { 'x': 2, 'y': 2 },
        { 'x': -2, 'y': 2 }, { 'x': -5, 'y': 5 }, { 'x': 5, 'y': 5 }, { 'x': 1, 'y': 6 }, { 'x': -1, 'y': 6 }, { 'x': -3, 'y': -5 },
        { 'x': -4, 'y': -4 }, { 'x': -5, 'y': -3 }, { 'x': -3, 'y': -4 }, { 'x': -4, 'y': -3 }, { 'x': -5, 'y': -5 }, { 'x': -2, 'y': -5 },
        { 'x': -4, 'y': -5 }, { 'x': -5, 'y': -2 }, { 'x': -5, 'y': -4 },

        { 'x': -9, 'y': -9}, { 'x': -8, 'y': -9}, { 'x': -7, 'y': -9}, { 'x': -6, 'y': -9}, { 'x': -5, 'y': -9}, { 'x': -4, 'y': -9},
        { 'x': -3, 'y': -9}, { 'x': -2, 'y': -9}, { 'x': -1, 'y': -9}, { 'x': 0, 'y': -9}, { 'x': 1, 'y': -9}, { 'x': 2, 'y': -9},
        { 'x': 3, 'y': -9}, { 'x': 4, 'y': -9}, { 'x': 5, 'y': -9}, { 'x': 6, 'y': -9}, { 'x': 7, 'y': -9}, { 'x': 8, 'y': -9},
        { 'x': 9, 'y': -9}, { 'x': 9, 'y': -8}, { 'x': 9, 'y': -7}, { 'x': 9, 'y': -6}, { 'x': 9, 'y': -5}, { 'x': 9, 'y': -4},
        { 'x': 9, 'y': -3}, { 'x': 9, 'y': -2}, { 'x': 9, 'y': -1}, { 'x': 9, 'y': 0}, { 'x': 9, 'y': 1}, { 'x': 9, 'y': 2},
        { 'x': 9, 'y': 3}, { 'x': 9, 'y': 4}, { 'x': 9, 'y': 5}, { 'x': 9, 'y': 6}, { 'x': 9, 'y': 7}, { 'x': 9, 'y': 8},
        { 'x': 9, 'y': 9}, { 'x': 8, 'y': 9}, { 'x': 7, 'y': 9}, { 'x': 6, 'y': 9}, { 'x': 5, 'y': 9}, { 'x': 4, 'y': 9},
        { 'x': 3, 'y': 9}, { 'x': 2, 'y': 9}, { 'x': 1, 'y': 9}, { 'x': 0, 'y': 9}, { 'x': -1, 'y': 9}, { 'x': -2, 'y': 9},
        { 'x': -3, 'y': 9}, { 'x': -4, 'y': 9}, { 'x': -5, 'y': 9}, { 'x': -6, 'y': 9}, { 'x': -7, 'y': 9}, { 'x': -8, 'y': 9},
        { 'x': -9, 'y': 9}, { 'x': -9, 'y': 8}, { 'x': -9, 'y': 7}, { 'x': -9, 'y': 6}, { 'x': -9, 'y': 5}, { 'x': -9, 'y': 4},
        { 'x': -9, 'y': 3}, { 'x': -9, 'y': 2}, { 'x': -9, 'y': 1}, { 'x': -9, 'y': 0}, { 'x': -9, 'y': -1}, { 'x': -9, 'y': -2},
        { 'x': -9, 'y': -3}, { 'x': -9, 'y': -4}, { 'x': -9, 'y': -5}, { 'x': -9, 'y': -6}, { 'x': -9, 'y': -7}, { 'x': -9, 'y': -8}
    ]
}

const ros2 = {
    'spawn': [{ 'x': -2, 'y': -2 }, { 'x': 2, 'y': -2 }, { 'x': 2, 'y': 2 }],
    'powerSpawn': [{ 'x': -2, 'y': 2 }],
    'tower': [
        { 'x': -4, 'y': 0 }, { 'x': 0, 'y': -4 }, { 'x': 4, 'y': 0 },
        { 'x': 0, 'y': 4 }, { 'x': -5, 'y': 5 }, { 'x': 5, 'y': 5 }
    ],
    'storage': ros['storage'],
    'link': ros['link'],
    'terminal': ros['terminal'],
    'factory': ros['factory'],
    'observer': ros['observer'],
    'nuker': ros['nuker'],
    'container': ros['container'],
    'lab': ros['lab'],
    'extension': ros['extension'],
    'road': ros['road'],
    'rampart': ros['rampart']
}

/** Rosmarinus（ros）布局 */
const rosLayout = (room: Room, center: { x: number, y: number }, type = 'ros') => {
    const layout = type == 'ros' ? ros :
        type == 'ros2' ? ros2 :
            null;
    if (!layout) return;
    // 布局中心
    if (!center) { console.log(`[Rosmarinus布局] ${room.name} 未设置布局中心`); return; }

    const terrain = new Room.Terrain(room.name);
    const centralPos = new RoomPosition(center.x, center.y, room.name);
    const layoutMemory = global.BotMem('layout');
    if (!layoutMemory[room.name]) layoutMemory[room.name] = {};

    for (const s of ['road', 'extension', 'spawn', 'link', 'tower', 'storage', 'container',
        'rampart', 'terminal', 'factory', 'lab', 'observer', 'nuker', 'powerSpawn']) {
        for (const pos of layout[s]) {
            const x = pos.x + centralPos.x;
            const y = pos.y + centralPos.y;
            if (terrain.get(x, y) == TERRAIN_MASK_WALL) continue;
            if (!layoutMemory[room.name][s]) layoutMemory[room.name][s] = [];
            layoutMemory[room.name][s].push(x * 100 + y);
        }
    }

    const mineral = room.mineral;
    if (mineral) {
        if (!layoutMemory[room.name]['extractor']) layoutMemory[room.name]['extractor'] = [];
        const x = mineral.pos.x, y = mineral.pos.y;
        layoutMemory[room.name]['extractor'].push(x * 100 + y);
    }
}

const rosBuild = (room: Room, center: { x: number, y: number }, log: boolean = false) => {
    const layoutMemory = global.BotMem('layout', room.name);
    // 现有工地到达上限时不处理
    const allSite = room.find(FIND_CONSTRUCTION_SITES);
    if (allSite.length >= 100) return;
    const centralPos = new RoomPosition(center.x, center.y, room.name);
    for (const s in layoutMemory) {
        const max = Math.min(CONTROLLER_STRUCTURES[s][room.level], layoutMemory[s].length);
        if (!max) continue;
        let structures = room[s] ?? [];
        if (structures.length >= CONTROLLER_STRUCTURES[s][room.level]) continue;
        if (['link', 'road', 'container', 'rampart'].includes(s)) {
            structures = structures.filter((o: any) => o.pos.inRange(centralPos, 6));
        }
        let count = structures.length
        if (count >= max) continue;
        const sites = allSite.filter(o => o.structureType == s);
        count += (sites ?? []).length;
        if (count >= max) continue;
        let text = ''
        for (const pos of layoutMemory[s]) {
            const x = Math.floor(pos / 100);
            const y = Math.floor(pos % 100);
            const target = new RoomPosition(x, y, room.name);
            const C = target.lookFor(LOOK_CONSTRUCTION_SITES);
            if (C.length) continue;
            const L = target.lookFor(LOOK_STRUCTURES);
            switch (s) {
                case 'rampart':
                    if (L.filter(o => o.structureType == STRUCTURE_RAMPART).length) continue;
                    if (Math.max(Math.abs(x - center.x), Math.abs(y - center.y)) <= 6 && !L.length) continue;
                    if (Math.max(Math.abs(x - center.x), Math.abs(y - center.y)) > 6 && room.level < 5) continue;
                    break;
                case 'road':
                    if (Math.abs(x - center.x) + Math.abs(y - center.y) <= 6 && L.length) continue;
                    if (Math.abs(x - center.x) + Math.abs(y - center.y) > 6 && (room.level < 6 || L.length)) continue;
                    break;
                case 'container':
                    if (room.level < 8) continue;
                    if (L.filter(o => o.structureType != 'road').length) continue;
                    break;
                default:
                    if (L.filter(o => o.structureType != 'rampart').length) continue;
                    break;
            }
            const result = room.createConstructionSite(x, y, s as BuildableStructureConstant);
            if (result == OK) {
                if (log) text += `(${x},${y}) `;
                count++;
            }
            if (count >= max) break;
        }
        if (log && text) console.log(`[Rosmarinus布局] ${room.name} 建造 ${s} 位于 ${text}`);
    }
}

export { rosLayout, rosBuild };
