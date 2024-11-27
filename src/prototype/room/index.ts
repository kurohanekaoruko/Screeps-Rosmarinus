import { assignPrototype } from "@/prototype/base"
import BaseFunction from "./function/baseFunction"
import StructureWork from "./function/structureWork"
import OutMine from "./function/outMine"
import ActiveDefend from "./function/activeDefend"
import RoomRun from "./run"

import AutoMarket from "./auto/autoMarket"
import AutoLayout from "./auto/autoLayout"

import Mission from "./mission"
import MissionPools from "./mission/pool/MissionPools"
import MissionAdd from "./mission/pool/MissionAdd"
import MissionGet from "./mission/pool/MissionGet"
import MissionSubmit from "./mission/pool/MissionSubmit"


const plugins = [
    BaseFunction,   // 基础函数
    StructureWork,  // 建筑物工作
    OutMine,        // 外矿采集
    
    AutoMarket,     // 自动市场交易
    AutoLayout,     // 自动布局
    
    MissionPools,   // 任务池
    MissionAdd,     // 添加任务
    MissionGet,     // 获取任务
    MissionSubmit,  // 提交任务
    Mission,        // 任务模块

    ActiveDefend,   // 房间防御
    RoomRun,        // 房间运行
]

export default () => plugins.forEach(plugin => assignPrototype(Room, plugin))


