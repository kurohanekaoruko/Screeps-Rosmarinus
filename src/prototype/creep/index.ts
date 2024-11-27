import { assignPrototype } from "@/prototype/base"
import CreepRun from "./run"
import BaseFunction from "./base/baseFunction"
import MoveFunction from "./base/moveFuntion"

const plugins = [
    BaseFunction,
    MoveFunction,
    CreepRun
]

export default () => plugins.forEach(plugin => assignPrototype(Creep, plugin))
