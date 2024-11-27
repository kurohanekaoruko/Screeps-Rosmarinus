export default {
    layout: {
        // 开关自动布局
        auto(roomName: string) {
            const room = Game.rooms[roomName];
            const BotMemRooms =  global.BotMem('rooms');
            if(!room || !room.my || !BotMemRooms[roomName]) {
                return Error(`房间 ${roomName} 不存在、未拥有或未添加。`);
            }
            const layout = BotMemRooms[roomName]['layout'];
            if(!layout) {
                return Error(`房间 ${roomName} 未设置布局。`);
            }
            const center = BotMemRooms[roomName]['center'];
            if(layout && !center) {
                return Error(`房间  ${roomName} 未设置布局中心。`);
            }
            const memory = BotMemRooms[roomName];
            memory.autolayout = !memory.autolayout;
            global.log(`已${memory.autolayout ? '开启' : '关闭'} ${roomName} 的自动布局.`);
            return OK;
        },
        // 设置房间布局
        set(roomName: string, layout: string, x?: number, y?: number) {
            const room = Game.rooms[roomName];
            const BotMemRooms =  global.BotMem('rooms');
            if(!room || !room.my || !BotMemRooms[roomName]) {
                return Error(`房间 ${roomName} 不存在、未拥有或未添加。`);
            }
            if(!layout) {
                BotMemRooms[roomName]['layout'] = '';
                global.removeBotMem('rooms', roomName, 'center')
                global.log(`已清除 ${roomName} 的布局设置。`);
                return OK;
            }
            BotMemRooms[roomName]['layout'] = layout;
            BotMemRooms[roomName]['center'] = { x, y };
            if(x && y) Memory['rooms'][roomName].centralPos = { x, y };
            const pos = Memory['rooms'][roomName].centralPos;
            global.log(`已设置 ${roomName} 的布局为 ${layout}, 布局中心为 (${pos.x},${pos.y})`);
            return OK;
        },
        // 清除房间布局memory
        remove(roomName: string) {
            global.removeBotMem('layout', roomName);
            global.log(`已清除 ${roomName} 的布局memory。`);
            return OK;
        },
        // 添加所选rampart到布局memory
        rampart(roomName: string, operate=1) {
            const flag = Game.flags['layout-rampart'];
            if (!flag) {
                console.log('未找到`layout-rampart`旗帜标记');
            }
            const rampart = []
            if (flag.pos.lookFor(LOOK_STRUCTURES).filter((s) => s.structureType === STRUCTURE_RAMPART).length > 0) {
                rampart.push(flag.pos.x * 100 + flag.pos.y);
                const queue = [[flag.pos.x, flag.pos.y]];
                const done = {}
                while (queue.length > 0) {
                    const pos = queue.shift();
                    const x = pos[0];
                    const y = pos[1];
                    if (x < 0 || x > 49 || y < 0 || y > 49) continue;
                    const xy = [[x-1, y], [x+1, y], [x, y-1], [x, y+1]];
                    for (const p of xy) {
                        const px = p[0];
                        const py = p[1];
                        if (px < 0 || px > 49 || py < 0 || py > 49) continue;
                        const pos1 = new RoomPosition(px, py, flag.pos.roomName);
                        if (!done[px * 100 + py] && 
                            pos1.lookFor(LOOK_STRUCTURES)
                            .filter((s) => s.structureType === STRUCTURE_RAMPART).length > 0) {
                            rampart.push(pos1.x * 100 + pos1.y);
                            queue.push([px, py]);
                        }
                    }
                    done[x * 100 + y] = true;
                }
            } else {
                console.log('`layout-rampart`旗帜没有放置到rampart上');
            }
            flag.remove();
            let count = 0;
            if(operate === 1) {
                const memory = global.BotMem('layout', roomName);
                for(const ram of rampart) {
                    if(!memory.rampart.includes(ram)) {
                        memory.rampart.push(ram);
                        count++;
                    }
                }
                console.log(`已添加${count}个rampart到布局memory`);
                return OK;
            }
            else {
                const memory = global.BotMem('layout', roomName);
                for(const ram of rampart) {
                    if (memory.rampart.includes(ram)) {
                        memory.rampart.splice(memory.rampart.indexOf(ram), 1);
                        count++;
                    }
                }
                console.log(`已删除${count}个rampart到布局memory`);
                return OK;
            }
            
        }
    }
}