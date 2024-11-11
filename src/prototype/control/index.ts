import helpExtension from './help';
import terminalExtension from './terminal';
import roomExtension from './room';


const plugins = [
    helpExtension,
    terminalExtension,
    roomExtension,
]

export default () => plugins.forEach(plugin => _.assign(global, plugin));
