import base from './base';
import room from './room';
import layout from './function/layout';
import market from './function/market';
import terminal from './structure/terminal';
import lab from './structure/lab';
import factory from './structure/factory';
import powerspawn from './structure/powerspawn';
import nuker from './structure/nuker';
import outmine from './function/outmine';


const plugins = [
    base,
    room,
    layout,
    market,
    terminal,
    lab,
    factory,
    powerspawn,
    nuker,
    outmine,
]

export default () => plugins.forEach(plugin => _.assign(global, plugin));
