import { assignPrototype } from "@/prototype/base"
import CreepRun from "./creepRun"
import BaseFunction from "./baseFunction"
import MoveFunction from "./move/moveFuntion"

const plugins = [
    BaseFunction,
    MoveFunction,
    CreepRun
]

export default () => plugins.forEach(plugin => assignPrototype(Creep, plugin))
