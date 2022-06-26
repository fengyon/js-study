/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-30 15:46:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-30 16:21:42
 */
let id = 0
class Dep{
    constructor(){
        this.id = id++
        this.subs = []
    }
    depend(){
        this.subs.push(Dep.target) //观察者模式
    }
    notify(){
        this.subs.forEach(watcher=>watcher.update())
        // this.subs.forEach(watcher=>(watcher.vm)._update((watcher.vm)._render()))
        
    }
}
let stack = []
// 目前可以做到 将watcher保存起来
export function pushTarget(watcher){
    Dep.target = watcher
    stack.push(watcher)
}

export function popTarget(){
    stack.pop()
    Dep.target = stack[stack.length-1]
}
export default Dep