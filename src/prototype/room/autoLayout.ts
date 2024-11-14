import ros from "@/layout/static/ros"

export default class AutoLayout extends Room {
    // 自动建筑
    autoLayout() {
        if(Game.time % 100) return;
        const memory = Memory[global.BOT_NAME]['rooms'][this.name];
        if(!memory) return;
        if(!memory.autolayout) return;
        if(memory.layout == 'ros') {
            rosLayout(this)
        }
    }
}

const rosLayout = (room: Room) => {
    const allSite = room.find(FIND_MY_CONSTRUCTION_SITES);
    if(allSite.length >= 100) return;
    
    const memory = Memory[global.BOT_NAME]['rooms'][room.name];
    if(!memory) return;

    for(const s in [
        'road', 'container', 'extension', 'spawn', 'link', 'tower', 'storage',
        'terminal', 'factory', 'lab', 'observer', 'nuker', 'powerSpawn',
    ]) {
        const max = Math.min(CONTROLLER_STRUCTURES[s][room.level], ros[s].length);
        if(!max) continue;
        const sites = allSite.filter(o => o.structureType == s);
        let count = (room[s]??[]).length + (sites??[]).length;
        if(count >= max) continue;
        for(const pos of ros[s]) {
            const x = pos.x + memory.center.x;
            const y = pos.y + memory.center.y;
            const target = new RoomPosition(x, y, room.name);
            const L = target.lookFor(LOOK_STRUCTURES);
            const C = target.lookFor(LOOK_CONSTRUCTION_SITES);
            if(L.filter(o => o.structureType == s).length) {
                if(['road', 'container', 'extension'].includes(s)) continue;
                if(L.filter(o => o.structureType == STRUCTURE_RAMPART).length) continue;
                if(C.length) continue;
                room.createConstructionSite(x, y, STRUCTURE_RAMPART);
                continue;
            };
            if(C.length) continue;
            const result = room.createConstructionSite(x, y, s as BuildableStructureConstant);
            if(result == OK) count++;
            if(count >= max) break;
        }
    }

    // 自动建造extractor
    if(room.level >= 6 && !room.extractor) {
        const mineral = room.mineral;
        if(mineral.pos.lookFor(LOOK_CONSTRUCTION_SITES).length == 0) {
            room.createConstructionSite(mineral.pos.x, mineral.pos.y, STRUCTURE_EXTRACTOR);
        }
    }
}