/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-02 09:47:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-02 15:16:02
 */
import { initState } from './state'
import { compileToFunction } from './compiler/index'
import { mountComponent, callHook } from './lifecycle'

import { mergeOptions } from './util/index'
import { nextTick } from './util/next-tick'
export function initMixin(Vue) {
    /**
     * @name: 
     * @test: test font
     * @msg: 
     * @param {*} options
     * @return {*}
     */    
    Vue.prototype._init = function (options) {
        const vm = this; //vue中this.$options 指代的就是用户传递的属性
        //将用户传递的 和全局的进行合并
        vm.$options = mergeOptions(vm.constructor.options, options);

        callHook(vm, 'beforeCreate')

        initState(vm)
        callHook(vm, 'created')
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        const vm = this
        const { $options } = vm
        //默认查找render -> template -> el
        el = document.querySelector(el)
        if (!$options.render) {
            let template = $options.template;
            if (!template && el) {
                template = el.outerHTML;
            }
            const render = compileToFunction(template)
            $options.render = render
        }

        // 渲染当前组件 挂载这个组件
        mountComponent(vm, el)
    }
    //用户放入的nextTick
    Vue.prototype.$nextTick = nextTick
}