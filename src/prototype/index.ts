import mountCreep from './creep'
import mountRoom from './room'
import mountPower from './power'
import mountControl from './control'
import mountPosition from './position'
import mountHelp from './help'

/** 原型拓展 */
export const PrototypeExtension = function () {
    // 挂载全部拓展
    mountCreep();
    mountRoom();
    mountPower();
    mountControl();
    mountPosition();
    mountHelp();
}

