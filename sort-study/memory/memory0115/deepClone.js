const getType = (x) => Object.prototype.toString.call(x);
const stack = [];
const createNewObject = (origin) => {
    return ({
        '[object Array]': [],
        '[object Object]': Object.create(origin.__proto__)
    })[getType(origin)];
}
const cloneApi = {
    [getType([])]: (origin, target) => {
        let cloneFun, clonedValue
        origin.forEach((item, index) => {
            cloneFun = cloneApi[getType(item)]
            if (cloneFun) {
                clonedValue = createNewObject(item);
                stack.push({
                    value: item,
                    cloneValue: clonedValue
                })
            }
            target[index] = item;
        })
    },
    [getType({})]: (origin, target) => {
        let key, value, cloneFun
        for (key in origin) {
            value = origin[key];
            cloneFun = cloneApi[getType(value)];
            if (cloneFun) {
                clonedValue = createNewObject(value);
                stack.push({
                    value: value,
                    cloneValue: clonedValue
                })
            }
            target[key] = value;
        }
    }
}
const deepClone = (obj) => {
    let cloneFun = cloneApi[getType(obj)];
    if (cloneFun) {
        const clonedValue = createNewObject(obj);
        stack.push({
            value: obj,
            cloneValue: clonedValue
        })
        while (stack.length > 0) {
            const { value, cloneValue } = stack.pop();
            console.log(stack.length, value, cloneValue)
            cloneApi[getType(value)](value, cloneValue);
        }
        return clonedValue;
    } else {
        return obj;
    }
}
let a = { b: { b: { b: { b: { b: { b: { b: { b: { b: { b: { b: { b: { b: { b: 1 } } } } } } } } } } } } } };
console.log(a);
console.log(deepClone(a))
a.a = a;
console.log(a);
console.log(deepClone(a));