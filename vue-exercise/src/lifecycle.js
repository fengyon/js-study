/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-05 14:02:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-03 14:44:34
 */
import Watcher from './observer/watcher'
import { patch } from './vdom/patch'
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this
        //为了实现比对 保存上一次的虚拟节点
        const preVnode = vm._vnode
        vm._vnode = vnode
        if (!preVnode) {//没有说明第一次渲染
        //通过虚拟节点 渲染出真实的dom 替换掉原来的$el
            vm.$el = patch(vm.$el, vnode)
        } else {
            vm.$el = patch(preVnode,vnode)
        }
    }
}
export function mountComponent(vm, el) {
    const options = vm.$options //render
    vm.$el = el //真实dom元素

    //Watcher 用来渲染的
    callHook(vm, 'beforeMount')
    //vm._render 通过解析的render方法 渲染出虚拟dom
    // vm._update 通过虚拟dom 创建真实dom
    //无论渲染函数更新都会调用此方法
    let updateComponent = () => {
        vm._update(vm._render())
    }
    //渲染watcher 每个组件都有一个watcher
    new Watcher(vm, updateComponent, () => { }, true) //true表示一个渲染warcher
    callHook(vm, 'mounted')
}

export function callHook(vm, hook) {
    const handlers = vm.$options[hook]
    if (handlers) {
        for (let i = 0; i < handlers.length; i++) {
            handlers[i].call(vm)
        }
    }
}