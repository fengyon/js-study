import { observe } from './observer/index'
import { proxy } from './util/index'
let initProps = function (vm) {
    // console.log('初始化', vm.$options.props)
}
let initMethods = function (vm) {
    // console.log('初始化', vm.$options.methods)
}
let initData = function (vm) {
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function'
        ? data.call(vm)
        : data
    
    //对象劫持  Object.definProperty() 给属性增加get、set
    observe(data)
    //为了更好的使用 vm.name => vm._data.name 作一个代理
    for (let key in data) {
        proxy(vm, '_data', key)
    }

}
let initComputed = function (vm) {
    // console.log('初始化', vm.$options.computed)
}
let initWatch = function (vm) {
    // console.log('初始化', vm.$options.watch)
}
export function initState(vm) {
    const opts = vm.$options
    const initArrs = [
        {
            key: 'props',
            initFun: initProps
        }, {
            key: 'methods',
            initFun: initMethods
        }, {
            key: 'data',
            initFun: initData
        }, {
            key: 'computed',
            initFun: initComputed
        }, {
            key: 'watch',
            initFun: initWatch
        }
    ]
    initArrs.forEach(item => {
        if (opts[item.key]) {
            item.initFun(vm)
        }
    })
}