/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-05 14:11:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-30 17:53:56
 */
import { pushTarget, popTarget } from './dep.js'
import {queueWathcer} from './schedular'
let id = 0
export default class Watcher {
    constructor(vm, expOrfn, callback, optoins) {
        this.vm = vm
        this.expOrfn = expOrfn
        this.callback = callback
        this.optoins = optoins
        this.id=id++
        this.deps = []
        this.depsId = new Set()
        this.getter = expOrfn//将内部传过来的回调函数 放到getter 属性

        this.get() //调用get方法 会让渲染watcher执行
    }
    addDep(dep) {
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.depsId.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
    get() {
        pushTarget(this)//把watcher存起来
        this.getter() //渲染watcher的执行
        popTarget() //移除watcher
    }
    update() {
        queueWathcer(this)
        // console.log(this.id)
        //等待着 一起更新
        // this.get()
    }
    run(){
        this.get()
    }
}
