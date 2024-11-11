import { assignPrototype } from "../base"
import RoomRun from "./run"
import CreepSpawn from "./creepSpawn"
import StructureWork from "./structure/structureWork"
import AutoMarket from "./autoMarket"
import BaseFunction from "./baseFunction"
import Mission from "./mission"
import MissionPools from "./mission/MissionPools"
import MissionAdd from "./mission/MissionAdd"
import MissionGet from "./mission/MissionGet"


const plugins = [
    BaseFunction,   // 基础函数
    CreepSpawn,     // 处理Creep的孵化
    StructureWork,  // 建筑物工作
    AutoMarket,     // 自动市场交易
    MissionPools,   // 任务池
    MissionAdd,     // 添加任务
    MissionGet,     // 获取任务
    Mission,        // 任务模块

    RoomRun,        // 房间运行
]

export default () => plugins.forEach(plugin => assignPrototype(Room, plugin))

