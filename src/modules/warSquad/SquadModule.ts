import { checkSquadIsLine } from "./baseFunc";
import { LineToQuad, LineMoveTo, QuadMoveTo } from "./action";

// A C
// B D
const SquadActionFunc = function (squadData: SquadMemory) {
    // line队形切换为quad
    if(squadData['formation'] == 'line') {
        const formationQuad = Game.flags['quad-'+squadData['name']+'-toQuad'] || Game.flags['quad-toQuad'];
        if (formationQuad) {
            if(!LineToQuad(squadData)) return;
            squadData['formation'] = 'quad';
            formationQuad.remove();
            return;
        }
    }
    // quad队形切换为line
    if(squadData['formation'] == 'quad') {
        const formationLine = Game.flags['quad-'+squadData['name']+'-toLine'] || Game.flags['quad-toLine'];
        if (formationLine) {
            squadData['formation'] = 'line';
            formationLine.remove();
        }
    }

    // 移动
    const moveflag = Game.flags['quad-'+squadData['name']+'-move'] || Game.flags['quad-move'];
    if(moveflag) {
        if(squadData['formation'] === 'line') LineMoveTo(squadData, moveflag.pos);
        if(squadData['formation'] === 'quad') QuadMoveTo(squadData, moveflag.pos);
        return;
    }


}

/** 四人小队模块 */
const SquadModule = {
    tick: function () {
        if(!Memory['SquadData']) {
            Memory['SquadData'] = {};
        }

        const squadList = Object.keys(Memory['SquadData'])
        for(let squadName of squadList) {
            let squadData = Memory['SquadData'][squadName] as SquadMemory;

            // 检查小队是否超时
            if(Game.time - squadData['time'] > 3000) {
                delete Memory['SquadData'][squadName];
                console.log(`四人小队${squadName}已解散.`);
                continue;
            }

            // 获取成员
            const creepA = Game.getObjectById(squadData['members']['A']) as Creep;
            const creepB = Game.getObjectById(squadData['members']['B']) as Creep;
            const creepC = Game.getObjectById(squadData['members']['C']) as Creep;
            const creepD = Game.getObjectById(squadData['members']['D']) as Creep;

            // 待机状态
            if(squadData['state'] == 'idle') {
                // 检查成员是否全部就位
                if (!creepA || !creepB || !creepC || !creepD) continue;
                if (checkSquadIsLine([creepA, creepB, creepC, creepD])) {
                    squadData['state'] = 'active';
                    console.log(`四人小队${squadName}成员已全部就位.`);
                } else {
                    // 聚集成员
                    const quadFlag = Game.flags['squad-'+squadName] || Game.flags['squad'];
                    if (quadFlag) creepA.moveTo(quadFlag.pos);
                    creepB.moveTo(creepA);
                    creepC.moveTo(creepB);
                    creepD.moveTo(creepC);
                }
                continue;
            }

            if (!creepA && !creepB && !creepC && !creepD) {
                // 删除小队数据
                delete Memory['SquadData'][squadName];
                console.log(`Quad小队${squadName}已解散.`);
                continue;
            }

            // 激活状态
            if(squadData['state'] == 'active') {
                // 执行小队行为
                SquadActionFunc(squadData);
            }
        }
    }
}

export default SquadModule;
