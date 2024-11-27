import funcAlias from './help'
import extension from './help'


export default function () {
    funcAlias.map(item => {
        Object.defineProperty(global, item.alias, { get: item.exec })
    })
    _.assign(global, extension)
};
