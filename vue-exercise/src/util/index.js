/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-05 12:00:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-02 11:16:52
 */
export let proxy = function (vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })
}
export function def(value, key, observer) {
    Object.defineProperty(value, key, {
        enumerable: false,
        configurable: false,
        value: observer
    })
}
export function isObject(data) {
    return typeof data === 'object' && data !== null
}

const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
]
let strats = LIFECYCLE_HOOKS.reduce((preObj, key) => {
    preObj[key] = mergeHook
    return preObj
}, {})
function mergeHook(parentVal, childVal) {
    if (childVal) {
        if (parentVal) {
            return parentVal.concat(childVal)
        } else {
            return [childVal]
        }
    } else {
        return parentVal
    }
}
function mergeAssets(parentVal, childVal) {
    // res.__proto__ = parentVal
    const res = Object.create(parentVal)
    if (childVal) {
        for (let key in childVal) {
            res[key] = childVal[key]
        }
    }
    return res
}
strats.components = mergeAssets
export function mergeOptions(parent, child) {
    if (options?.components['my-component2']) {
        console.log(options)
    }
    const options = {}
    for (let key in parent) {
        mergeField(key)
    }
    for (let key in child) {
        if (!parent.hasOwnProperty(key)) {
            mergeField(key)
        }
    }
    //默认合并策略 但是有些属性 需要特殊的合并策略 如生命周期的合并
    function mergeField(key) {
        if (strats[key]) {
            return options[key] = strats[key](parent[key], child[key])
        }
        if (isObject(parent[key])
            && isObject(child[key])) {
            options[key] = {
                ...parent[key],
                ...child[key]
            }
        } else if (child[key] == null) {
            options[key] = parent[key]
        } else {
            options[key] = child[key]
        }
    }
    return options
}
export const isReservedTag = (tagName) => {
    let str = 'p,div,span,input,button'
    let obj = str.split(',').reduce((preObj, key) => {
        preObj[key] = true
        return preObj
    }, {})
    return obj[tagName] || false
}