export const assignPrototype = function(obj1: any, obj2: any) {
    Object.getOwnPropertyNames(obj2.prototype).forEach(key => {
        obj1.prototype[key] = obj2.prototype[key];
    });
};