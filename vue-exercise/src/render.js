/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-08 11:23:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-02 11:06:49
 */
import {createElement,createTextNode} from './vdom/create-element'

export function renderMixin(Vue) {
    Vue.prototype._c = function () {
        return createElement(this,...arguments)
    }

    Vue.prototype._v = function (text) {
        return createTextNode(this,text)
    }

    Vue.prototype._s = function (val) {
        return val === null
            ? ''
            : (typeof val === 'object')
                ? JSON.stringify(val)
                : val
    }

    Vue.prototype._render = function () {
        const vm = this;

        const { render } = vm.$options;
        let vnode = render.call(vm)
        return vnode
    }

}