/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-07-02 09:31:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-03 14:37:39
 */
import { initMixin } from './init'
import { renderMixin } from './render'
import { lifecycleMixin } from './lifecycle'

import { initGolabalAPI } from './initGlobalAPI/index'
function Vue(options) {
    //vue初始化操作
    this._init(options)
}
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)


initGolabalAPI(Vue)

import { createElm, patch } from './vdom/patch'
import { compileToFunction } from './compiler/index'
// setTimeout(() => {
//     let vm1 = new Vue({
//         data() {
//             return {
//                 name: 'hello'
//             }
//         },
//     })
//     let render1 = compileToFunction(`<div id="app" a="1" >
// <div style="background:red" key="a" >AAA</div>
// <div style="background:yellow" key="b" >BBB</div>
// <div style="background:blue" key="c" >CCC</div>
// </div>`)
//     let vnode = render1.call(vm1)

//     let el = createElm(vnode)
    
//     document.body.appendChild(el)
//     let vm2 = new Vue({
//         data() {
//             return {
//                 name: 'hello'
//             }
//         },
//     })
//     let render2 = compileToFunction(`<div id="aaa" b="1" >
//     <div style="background:yellow" key="b" >BBB</div>
//     <div style="background:black" key="d" >DDD</div>
//     <div style="background:blue" key="c" >CCC</div>
//     <div style="background:yellow" key="f" >FFF</div>
// <div style="background:red" key="a" >AAA</div>
// <div style="background:yellow" key="g" >GGG</div>
//     <div style="background:red" key="a" >AAA</div>
//     </div>`)
//     let vnode2 = render2.call(vm2)
//     let el2 = createElm(vnode2)
//     document.body.appendChild(el2)
//     setTimeout(() => {
//         patch(vnode2,vnode)
//     }, 1000);

// }, 10)

export default Vue