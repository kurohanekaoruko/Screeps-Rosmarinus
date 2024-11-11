import { assignPrototype } from "@/prototype/base"
import BaseFunction from "./baseFunction"
import PowerCreepRun from "./powerRun"
import PowerCreepUsePower from "./usePower"


const plugins = [
    BaseFunction,
    PowerCreepUsePower,
    PowerCreepRun
]


export default () => plugins.forEach(plugin => assignPrototype(PowerCreep, plugin))