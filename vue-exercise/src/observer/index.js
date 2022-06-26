/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-02 10:21:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-30 16:55:20
 */
import {arrayMethods} from './array'
import {def} from '../util/index'
import Dep from './dep'
function defineReactive(data, key, value) {
    let dep = new Dep()
    //这里这个value 可能是数组 也可能是对象，返回的结果是observer的实例
    //当前这个value对应的observer
    //数组的observer实例
    let childOb = observe(value)
    Object.defineProperty(data, key, {
        configurable:true,
        enumerable:true,
        get() {
            //每个属性都对应者自己的watcher

            //如果当前有watcher 
            if(Dep.target){
                dep.depend() //将wathcer存起来
                //数组的依赖收集
                if(childOb){
                    //收集数组的依赖
                    childOb.dep.depend()
                    //如果数组中还有数组
                    if(Array.isArray(value)){
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set(newVal) {
            if (newVal === value) return
            value = newVal
            observe(newVal) //继续劫持，因为有可能是一个对象
            //通知依赖的watcher进行更新
            dep.notify()
        }
    })
}

class Observer {
    constructor(props) {
        this.dep = new Dep()
        // vue如果数据的层次过多 需要递归解析对象中的属性，依次增加set和get
        // vue3 增加了proxy 优化了
        
        def(props,'__ob__',this)
        if (Array.isArray(props)) {
            //如果是数组的不会对索引进行观测，会导致性能问题
            //前端常用 push shift unshift
            props.__proto__ = arrayMethods
            this.observeArray(props)
        } else {
            this.walk(props)
        }
    }
    observeArray(arr){
        arr.forEach(item=>observe(item))
    }
    walk(data) {
        Object.keys(data).forEach(function (key) {
            defineReactive(data, key, data[key])
        })
    }
}
export function observe(data) {
    //使用 Object.defineProperty  es5 无法兼容IE8及以下
    if (typeof data !== 'object'
        || data === null) {
        return;
    }
    return new Observer(data)
}
function dependArray(value){
    for(let i=0;i<value.length;i++){
        let current = value[i]
        //递归 收集数组的依赖
        current.__ob__ && current.__ob__.dep.depend()
        if(Array.isArray(current)){
            dependArray(current)
        }
    }
}